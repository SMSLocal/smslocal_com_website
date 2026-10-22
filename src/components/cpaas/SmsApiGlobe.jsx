import { useEffect, useRef, useState } from 'react'
import landDots from '../../data/landDots.json'
import './sms-api-globe.css'

/**
 * Hero graphic for the SMS API page: a live globe of message routes.
 *
 * A sphere dotted with the world's land turns slowly in a dark panel. Messages leave one city as a
 * glowing comet, arc over the horizon and land in another, where a ripple and
 * a "delivered" tag pop up and the event drops into a small feed. Colours show
 * the message type (OTP, alert, reminder), the same three used elsewhere on
 * the page. Drag the globe to turn it.
 *
 * Drawn on a 2D canvas with a hand-rolled orthographic projection, so there is
 * no map library. The continents are a lattice of dots (src/data/landDots.json,
 * made from Natural Earth 1:110m land, public domain). Cities, routes and
 * timings are illustrative.
 * Reduced-motion visitors get one still frame. Drawing pauses off screen.
 */

const D2R = Math.PI / 180

const CITIES = [
  ['Mumbai', 19.08, 72.88], ['Delhi', 28.61, 77.21], ['Dubai', 25.2, 55.27], ['London', 51.5, -0.12],
  ['Lagos', 6.52, 3.38], ['Nairobi', -1.29, 36.82], ['Singapore', 1.35, 103.82], ['Sydney', -33.87, 151.21],
  ['Tokyo', 35.68, 139.69], ['New York', 40.71, -74.0], ['Los Angeles', 34.05, -118.24], ['São Paulo', -23.55, -46.63],
  ['Mexico City', 19.43, -99.13], ['Frankfurt', 50.11, 8.68], ['Jakarta', -6.2, 106.85], ['Manila', 14.6, 120.98],
  ['Johannesburg', -26.2, 28.05], ['Toronto', 43.65, -79.38], ['Cairo', 30.04, 31.24], ['Seoul', 37.57, 126.98],
].map(([name, lat, lon]) => ({ name, v: vec(lat, lon) }))

const TYPES = [
  { key: 'OTP', c: '#818cf8' },
  { key: 'Alert', c: '#2dd4bf' },
  { key: 'Reminder', c: '#f9a8d4' },
]

function vec(lat, lon) {
  const p = lat * D2R
  const l = lon * D2R
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)]
}

// Land as a lattice of dots, packed as [lat*10, lon*10, ...] and unpacked once.
const LAND = new Float32Array((landDots.length / 2) * 3)
for (let i = 0; i < landDots.length; i += 2) {
  const v = vec(landDots[i] / 10, landDots[i + 1] / 10)
  LAND.set(v, (i / 2) * 3)
}
const LAND_N = LAND.length / 3

// Graticule: parallels every 30 degrees and meridians every 30.
const LINES = []
for (let lat = -60; lat <= 60; lat += 30) {
  const pts = []
  for (let lon = -180; lon <= 180; lon += 4) pts.push(vec(lat, lon))
  LINES.push(pts)
}
for (let lon = -180; lon < 180; lon += 30) {
  const pts = []
  for (let lat = -90; lat <= 90; lat += 4) pts.push(vec(lat, lon))
  LINES.push(pts)
}

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

/** Point on the arc from a to b at t (0..1), lifted above the surface. */
function arcPoint(a, b, omega, lift, t) {
  const s = Math.sin(omega)
  const k1 = Math.sin((1 - t) * omega) / s
  const k2 = Math.sin(t * omega) / s
  const r = 1 + lift * Math.sin(Math.PI * t)
  return [(a[0] * k1 + b[0] * k2) * r, (a[1] * k1 + b[1] * k2) * r, (a[2] * k1 + b[2] * k2) * r]
}

function makeArc(now, rotate, forceVisible) {
  for (let tries = 0; tries < 30; tries += 1) {
    const a = CITIES[(Math.random() * CITIES.length) | 0]
    const b = CITIES[(Math.random() * CITIES.length) | 0]
    if (a === b) continue
    const omega = Math.acos(Math.max(-1, Math.min(1, dot(a.v, b.v))))
    if (omega < 0.5 || omega > 2.6) continue
    if (forceVisible && rotate(a.v)[2] < -0.1 && rotate(b.v)[2] < -0.1) continue
    return {
      a, b, omega,
      lift: 0.05 + 0.2 * (omega / Math.PI),
      type: TYPES[(Math.random() * TYPES.length) | 0],
      t0: now,
      dur: 1700 + omega * 650,
      landed: false,
    }
  }
  return null
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function SmsApiGlobe() {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const [feed, setFeed] = useState([])

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    const ctx = el.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const view = { yaw: -45 * D2R, tilt: 0.42 }
    const state = { w: 0, h: 0, dpr: 1, arcs: [], ripples: [], tags: [], nextSpawn: 0, running: true, drag: null, raf: 0, last: 0 }

    const rotate = (v) => {
      const ca = Math.cos(view.yaw)
      const sa = Math.sin(view.yaw)
      const x1 = v[0] * ca + v[2] * sa
      const z1 = -v[0] * sa + v[2] * ca
      const ct = Math.cos(view.tilt)
      const st = Math.sin(view.tilt)
      return [x1, v[1] * ct - z1 * st, v[1] * st + z1 * ct]
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.w = Math.max(1, Math.round(r.width * state.dpr))
      state.h = Math.max(1, Math.round(r.height * state.dpr))
      el.width = state.w
      el.height = state.h
    }

    const draw = (now, still) => {
      const { w, h, dpr } = state
      const R = w * 0.355
      const cx = w * 0.5
      const cy = h * 0.455
      ctx.clearRect(0, 0, w, h)

      const proj = (v) => {
        const p = rotate(v)
        return { x: cx + R * p[0], y: cy - R * p[1], z: p[2], front: p[2] > 0 || p[0] * p[0] + p[1] * p[1] > 1 }
      }

      // halo behind the globe
      let g = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.55)
      g.addColorStop(0, 'rgba(99,102,241,.38)')
      g.addColorStop(0.55, 'rgba(236,72,153,.10)')
      g.addColorStop(1, 'rgba(99,102,241,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // the sphere itself
      g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.42, R * 0.1, cx, cy, R)
      g.addColorStop(0, '#2a3a9c')
      g.addColorStop(0.55, '#111c66')
      g.addColorStop(1, '#070b22')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      // atmosphere rim
      g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.08)
      g.addColorStop(0, 'rgba(129,140,248,0)')
      g.addColorStop(0.55, 'rgba(129,140,248,.5)')
      g.addColorStop(1, 'rgba(244,114,182,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2)
      ctx.fill()

      // graticule, back side then front side
      ctx.lineWidth = dpr
      for (const side of [false, true]) {
        ctx.strokeStyle = side ? 'rgba(165,180,255,.11)' : 'rgba(165,180,255,.04)'
        ctx.beginPath()
        for (const line of LINES) {
          let prev = null
          for (const v of line) {
            const p = rotate(v)
            const cur = { x: cx + R * p[0], y: cy - R * p[1], on: (p[2] > 0) === side }
            if (prev && prev.on && cur.on) {
              ctx.moveTo(prev.x, prev.y)
              ctx.lineTo(cur.x, cur.y)
            }
            prev = cur
          }
        }
        ctx.stroke()
      }

      // land, front side: brighter and larger towards the middle of the disc
      ctx.fillStyle = '#c7d2fe'
      for (let i = 0; i < LAND_N; i += 1) {
        const p = rotate([LAND[i * 3], LAND[i * 3 + 1], LAND[i * 3 + 2]])
        if (p[2] <= 0.02) continue
        ctx.globalAlpha = 0.18 + 0.72 * p[2]
        ctx.beginPath()
        ctx.arc(cx + R * p[0], cy - R * p[1], (0.7 + 0.95 * p[2]) * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // cities
      for (const c of CITIES) {
        const p = proj(c.v)
        if (p.z <= 0.04) continue
        ctx.fillStyle = `rgba(224,231,255,${0.35 + 0.55 * p.z})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.1 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }

      // arcs: comet trail plus head
      for (const a of state.arcs) {
        const prog = still ? 0.72 : Math.min(1, (now - a.t0) / a.dur)
        const from = Math.max(0, prog - 0.5)
        const steps = 26
        let prev = null
        for (let i = 0; i <= steps; i += 1) {
          const t = from + ((prog - from) * i) / steps
          const p = proj(arcPoint(a.a.v, a.b.v, a.omega, a.lift, t))
          if (prev && prev.front && p.front) {
            ctx.strokeStyle = a.type.c
            ctx.globalAlpha = Math.pow(i / steps, 1.6) * 0.95
            ctx.lineWidth = (0.6 + 2.4 * (i / steps)) * dpr
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
          prev = p
        }
        ctx.globalAlpha = 1
        if (prev && prev.front && prog < 1) {
          ctx.fillStyle = a.type.c
          ctx.globalAlpha = 0.28
          ctx.beginPath()
          ctx.arc(prev.x, prev.y, 7 * dpr, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(prev.x, prev.y, 2.4 * dpr, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // landing ripples and tags
      for (const r of state.ripples) {
        const age = (now - r.t0) / 1500
        if (age > 1) continue
        const p = proj(r.v)
        if (p.z <= 0) continue
        ctx.strokeStyle = r.c
        ctx.globalAlpha = (1 - age) * 0.9
        ctx.lineWidth = 1.6 * dpr
        ctx.beginPath()
        ctx.arc(p.x, p.y, (3 + age * 22) * dpr, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
      ctx.font = `600 ${10.5 * dpr}px ui-monospace, Menlo, Consolas, monospace`
      ctx.textBaseline = 'middle'
      const placed = []
      for (const t of state.tags) {
        const age = (now - t.t0) / 2200
        if (age > 1) continue
        const p = proj(t.v)
        if (p.z <= 0.05) continue
        const a = age < 0.12 ? age / 0.12 : age > 0.8 ? (1 - age) / 0.2 : 1
        const label = `✓ ${t.city}`
        const tw = ctx.measureText(label).width
        const bw = tw + 14 * dpr
        const bh = 20 * dpr
        let bx = p.x + 9 * dpr
        let by = p.y - 26 * dpr - age * 6 * dpr
        if (bx + bw > w - 6 * dpr) bx = p.x - 9 * dpr - bw
        // keep neighbouring tags from landing on top of each other
        for (let k = 0; k < 3; k += 1) {
          const hit = placed.find((q) => bx < q.x + q.w && bx + bw > q.x && by < q.y + q.h + 3 * dpr && by + bh + 3 * dpr > q.y)
          if (!hit) break
          by = hit.y - bh - 4 * dpr
        }
        placed.push({ x: bx, y: by, w: bw, h: bh })
        ctx.globalAlpha = a
        roundRect(ctx, bx, by, bw, bh, bh / 2)
        ctx.fillStyle = 'rgba(8,12,34,.9)'
        ctx.fill()
        ctx.strokeStyle = t.c
        ctx.lineWidth = dpr
        ctx.stroke()
        ctx.fillStyle = '#fff'
        ctx.fillText(label, bx + 7 * dpr, by + bh / 2 + dpr * 0.5)
        ctx.globalAlpha = 1
      }
    }

    const land = (a, now) => {
      a.landed = true
      state.ripples.push({ v: a.b.v, c: a.type.c, t0: now })
      state.tags.push({ v: a.b.v, c: a.type.c, city: a.b.name, t0: now })
      if (state.tags.length > 3) state.tags.shift()
      const ms = (0.4 + Math.random() * 1.5).toFixed(1)
      setFeed((f) => [{ id: now + Math.random(), type: a.type, city: a.b.name, ms }, ...f].slice(0, 3))
    }

    const frame = (now) => {
      state.raf = requestAnimationFrame(frame)
      if (!state.running) { state.last = now; return }
      const dt = state.last ? Math.min(60, now - state.last) : 16
      state.last = now
      if (!state.drag) view.yaw += dt * 0.00009
      if (now > state.nextSpawn && state.arcs.length < 4) {
        const arc = makeArc(now, rotate, true)
        if (arc) state.arcs.push(arc)
        state.nextSpawn = now + 650 + Math.random() * 600
      }
      for (const a of state.arcs) if (!a.landed && now - a.t0 >= a.dur) land(a, now)
      state.arcs = state.arcs.filter((a) => now - a.t0 < a.dur + 250)
      state.ripples = state.ripples.filter((r) => now - r.t0 < 1500)
      draw(now, false)
    }

    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(performance.now(), true) })
    ro.observe(box)
    resize()

    let io
    if (reduced) {
      for (let i = 0; i < 3; i += 1) { const a = makeArc(0, rotate, true); if (a) state.arcs.push(a) }
      draw(performance.now(), true)
      setFeed([
        { id: 1, type: TYPES[0], city: 'London', ms: '0.9' },
        { id: 2, type: TYPES[1], city: 'Singapore', ms: '1.2' },
        { id: 3, type: TYPES[2], city: 'São Paulo', ms: '0.7' },
      ])
    } else {
      io = new IntersectionObserver(([e]) => { state.running = e.isIntersecting }, { threshold: 0.05 })
      io.observe(box)
      state.raf = requestAnimationFrame(frame)
    }

    // drag to turn
    const down = (e) => { state.drag = { x: e.clientX, y: e.clientY }; box.setPointerCapture(e.pointerId); box.classList.add('is-drag') }
    const move = (e) => {
      if (!state.drag) return
      view.yaw += (e.clientX - state.drag.x) * 0.006
      view.tilt = Math.max(-0.15, Math.min(0.95, view.tilt + (e.clientY - state.drag.y) * 0.004))
      state.drag = { x: e.clientX, y: e.clientY }
      if (reduced) draw(performance.now(), true)
    }
    const up = () => { state.drag = null; box.classList.remove('is-drag') }
    box.addEventListener('pointerdown', down)
    box.addEventListener('pointermove', move)
    box.addEventListener('pointerup', up)
    box.addEventListener('pointercancel', up)

    return () => {
      cancelAnimationFrame(state.raf)
      ro.disconnect()
      io?.disconnect()
      box.removeEventListener('pointerdown', down)
      box.removeEventListener('pointermove', move)
      box.removeEventListener('pointerup', up)
      box.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <figure ref={wrap} className="sg" aria-label="A globe with messages travelling between cities and landing as delivered, coloured by type: one-time passcodes, alerts and reminders (illustrative)">
      <span className="sg-blob b1" aria-hidden="true" />
      <span className="sg-blob b2" aria-hidden="true" />
      <canvas ref={canvas} className="sg-canvas" aria-hidden="true" />

      <div className="sg-top" aria-hidden="true">
        <span><i className="sg-live" />Live routes</span>
        <em>Illustrative</em>
      </div>

      <ul className="sg-feed" aria-hidden="true">
        {feed.map((f) => (
          <li key={f.id} style={{ '--c': f.type.c }}>
            <i>{f.type.key}</i>
            <b>{f.city}</b>
            <span>Delivered · {f.ms} s</span>
          </li>
        ))}
      </ul>

      <div className="sg-key" aria-hidden="true">
        {TYPES.map((t) => <span key={t.key} style={{ '--c': t.c }}><i />{t.key}</span>)}
      </div>
    </figure>
  )
}

export default SmsApiGlobe
