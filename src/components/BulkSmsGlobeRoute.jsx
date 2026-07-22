import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import "./BulkSmsGlobeRoute.css"

/**
 * Hero visual for the Bulk SMS page — adapted from a cobe globe.
 *
 * A subtle, softly-lit globe that shows only its upper ~3/4 (the base dissolves
 * into the page, so it reads as part of something larger, never a boxed object).
 * A small, continuous stream of SMS travels along glowing routes: each message
 * launches from one city, arcs over the curve with a motion trail, and is
 * received (✓) at another — and because everything rotates with the globe, the
 * sends sweep around as it turns.
 *
 * Routes are native cobe v2 arcs (real 3D beziers projected on the sphere). The
 * travelling SMS are DOM chips positioned by replicating cobe's own projection
 * in JS, so they sit exactly on their arc, rotate with the globe, and fade
 * behind it — no CSS Anchor Positioning needed (works cross-browser).
 */

const DEG = Math.PI / 180
const EE = 0.8 // cobe's base sphere radius constant
const ARC_HEIGHT = 0.32 // must match the cobe arcHeight below
const MARKER_ELEV = 0
const R_END = EE + MARKER_ELEV
const R_CTRL = EE + ARC_HEIGHT + MARKER_ELEV

const REDUCED =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function locToVec([lat, lon]) {
  const r = lat * DEG
  const a = lon * DEG - Math.PI
  const o = Math.cos(r)
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)]
}

const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

// Three moderate hops spread ~120° apart in longitude, so as the globe turns at
// least one route is always front-facing — the stream never goes dead. Short
// gaps keep 2–3 messages in flight without overcrowding.
const ROUTES = [
  { from: [51.51, -0.13], to: [25.2, 55.27], dur: 2300, gap: 650, phase: 0 },     // London → Dubai
  { from: [40.71, -74.0], to: [-23.55, -46.63], dur: 2500, gap: 650, phase: 900 }, // New York → São Paulo
  { from: [1.35, 103.82], to: [35.68, 139.69], dur: 2400, gap: 650, phase: 1750 }, // Singapore → Tokyo
]

const ARCS = ROUTES.map((r) => {
  const f = locToVec(r.from)
  const t = locToVec(r.to)
  const mid = norm([f[0] + t[0], f[1] + t[1], f[2] + t[2]])
  return {
    ...r,
    d: [f[0] * R_END, f[1] * R_END, f[2] * R_END],
    e: [t[0] * R_END, t[1] * R_END, t[2] * R_END],
    o: [mid[0] * R_CTRL, mid[1] * R_CTRL, mid[2] * R_CTRL],
  }
})

function bezier(a, o, b, t) {
  const u = 1 - t
  const w0 = u * u
  const w1 = 2 * u * t
  const w2 = t * t
  return [
    w0 * a[0] + w1 * o[0] + w2 * b[0],
    w0 * a[1] + w1 * o[1] + w2 * b[1],
    w0 * a[2] + w1 * o[2] + w2 * b[2],
  ]
}

// 3D point → screen using cobe's exact projection (scale 1, offset 0, square).
function project(p, phi, theta) {
  const r = Math.cos(theta)
  const a = Math.cos(phi)
  const o = Math.sin(theta)
  const i = Math.sin(phi)
  const c = a * p[0] + i * p[2]
  const s = i * o * p[0] + r * p[1] - a * o * p[2]
  const zc = -i * r * p[0] + o * p[1] + a * r * p[2]
  return { x: (c + 1) / 2, y: (-s + 1) / 2, zc, out: c * c + s * s >= 0.64 }
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
function smooth(a, b, x) {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const MARKERS = ROUTES.flatMap((r) => [
  { location: r.from, size: 0.04 },
  { location: r.to, size: 0.04 },
])

const COBE_ARCS = ROUTES.map((r, i) => ({ from: r.from, to: r.to, id: `bsg${i}` }))

function ChatGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
    </svg>
  )
}

function TickGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6" />
    </svg>
  )
}

function BulkSmsGlobeRoute() {
  const canvasRef = useRef(null)
  const smsRefs = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let globe = null
    let raf = 0
    let disposed = false
    let phi = 0
    let startTs = 0
    let box = 0
    let chipHalf = 15
    const theta = 0.28
    const speed = 0.0038
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function ensureGlobe(w) {
      box = w
      const first = smsRefs.current[0]
      if (first && first.offsetWidth) chipHalf = first.offsetWidth / 2
      if (!globe) {
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: w,
          height: w,
          phi,
          theta,
          dark: 0.55,
          diffuse: 1.1,
          scale: 1,
          offset: [0, 0],
          mapSamples: 16000,
          mapBrightness: 5.4,
          mapBaseBrightness: 0.12,
          baseColor: [0.6, 0.58, 0.8],
          markerColor: [0.43, 0.36, 0.9],
          glowColor: [0.82, 0.8, 0.95],
          markerElevation: MARKER_ELEV,
          markers: MARKERS,
          arcs: COBE_ARCS,
          arcColor: [0.86, 0.46, 0.72],
          arcWidth: 0.5,
          arcHeight: ARC_HEIGHT,
          opacity: 0.92,
        })
        canvas.style.opacity = "1"
      } else {
        globe.update({ width: w, height: w })
      }
    }

    function frame(now) {
      if (disposed) return
      if (!startTs) startTs = now
      if (!REDUCED) phi += speed
      if (globe) globe.update({ phi, theta })

      const elapsed = now - startTs
      for (let i = 0; i < ARCS.length; i++) {
        const arc = ARCS[i]
        const el = smsRefs.current[i]
        if (!el) continue

        let tt
        if (REDUCED) {
          tt = 1
        } else {
          const cycle = arc.dur + arc.gap
          const local = (elapsed + arc.phase) % cycle
          if (local >= arc.dur) {
            el.style.opacity = "0"
            continue
          }
          tt = local / arc.dur
        }

        const t = easeInOut(tt)
        const p = bezier(arc.d, arc.o, arc.e, t)
        const pr = project(p, phi, theta)
        const back = bezier(arc.d, arc.o, arc.e, Math.max(0, t - 0.03))
        const pb = project(back, phi, theta)

        const px = pr.x * box
        const py = pr.y * box
        const ang = Math.atan2((pr.y - pb.y) * box, (pr.x - pb.x) * box) * (180 / Math.PI)

        const front = pr.out ? 1 : smooth(-0.05, 0.12, pr.zc)
        const fin = smooth(0, 0.09, tt)
        const fout = 1 - smooth(0.9, 1, tt)
        const opacity = REDUCED ? front : front * fin * fout
        const arrived = tt > 0.88

        el.style.transform = `translate3d(${px - chipHalf}px, ${py - chipHalf}px, 0)`
        el.style.opacity = `${opacity}`
        el.style.setProperty("--ang", `${ang}deg`)
        el.dataset.arrived = arrived ? "1" : "0"
      }

      raf = requestAnimationFrame(frame)
    }

    // Init synchronously when the size is already known (the proven path), and
    // also observe for late layout / resize — ensureGlobe creates once, then
    // just resizes the existing globe.
    if (canvas.offsetWidth > 0) {
      ensureGlobe(canvas.offsetWidth)
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0]?.contentRect.width || 0)
      if (w > 0 && !disposed) {
        ensureGlobe(w)
        if (!raf) raf = requestAnimationFrame(frame)
      }
    })
    ro.observe(canvas)

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      if (globe) globe.destroy()
    }
  }, [])

  return (
    <div className="bsg" role="img" aria-label="A rotating globe with SMS messages travelling between cities worldwide and being delivered">
      <div className="bsg-orb">
        <span className="bsg-glow" aria-hidden="true" />
        <canvas ref={canvasRef} className="bsg-canvas" />
        <div className="bsg-layer">
          {ROUTES.map((r, i) => (
            <span
              key={i}
              ref={(el) => (smsRefs.current[i] = el)}
              className="bsg-sms"
              data-arrived="0"
              style={{ opacity: 0 }}
            >
              <span className="bsg-sms-tail" aria-hidden="true" />
              <span className="bsg-sms-ring" aria-hidden="true" />
              <span className="bsg-sms-msg"><ChatGlyph /></span>
              <span className="bsg-sms-tick"><TickGlyph /></span>
            </span>
          ))}
        </div>
      </div>
      <span className="bsg-caption">
        <span className="bsg-live" aria-hidden="true" />
        Routing SMS worldwide · delivered in seconds
      </span>
    </div>
  )
}

export default BulkSmsGlobeRoute
