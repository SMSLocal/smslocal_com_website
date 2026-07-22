import { useEffect, useRef, useState } from 'react'
import './ConsultingArcHero.css'
import { IconRocket } from './icons.jsx'

/**
 * Hero visual for /services/ai-consulting.
 * A semicircular "readiness gauge": a gradient arc fills from Proof of concept
 * (left) up and over to In production (right), four stage nodes light in
 * sequence as the fill sweeps past, and a centre readout counts up to 100%
 * production-ready. Nothing wraps the scene — the arc, nodes, labels and
 * readout float directly on the page. No card, no frame.
 * Base (reduced-motion / no-CSS) state is fully assembled: arc full, every node
 * lit, 100%. Motion only enhances.
 */

// arc geometry (matches the SVG viewBox 360 x 210)
const NODES = [
  { cx: 32, cy: 178, key: 'poc', t: 'Proof of concept', s: 'where you start', place: 'bl' },
  { cx: 106, cy: 50, key: 'scope', t: 'Scope & build', s: 'first agent', place: 'tl' },
  { cx: 254, cy: 50, key: 'enable', t: 'Enable & train', s: 'your team leads', place: 'tr' },
  { cx: 328, cy: 178, key: 'prod', t: 'In production', s: 'live & scaling', place: 'br' },
]

const CYCLE_DUR = 2400

function ConsultingArcHero() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const [pct, setPct] = useState(100)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const mq = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: no-preference)')
      : null
    if (!mq || !mq.matches) {
      setOn(true)
      setPct(100)
      return undefined
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setOn(true)
        const start = performance.now()
        let raf
        const tick = (now) => {
          const p = Math.min(1, (now - start) / CYCLE_DUR)
          const eased = 1 - Math.pow(1 - p, 3)
          setPct(Math.round(eased * 100))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        obs.disconnect()
        node._raf = raf
      },
      { threshold: 0.35 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={on ? 'cah is-on' : 'cah'} ref={ref} aria-hidden="true">
      <div className="cah-scene">
        <svg className="cah-svg" viewBox="0 0 360 232" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="cahGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="var(--blue)" />
              <stop offset="1" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>

          {/* base track + filling progress arc — upward dome through all 4 nodes */}
          <path className="cah-track" d="M32 178 A148 148 0 0 1 328 178" strokeWidth="6" strokeLinecap="round" />
          <path className="cah-fill" d="M32 178 A148 148 0 0 1 328 178" strokeWidth="6" strokeLinecap="round" pathLength="100" />

          {/* stage nodes */}
          {NODES.map((n, i) => (
            <g className="cah-node" style={{ '--i': i }} key={n.key}>
              <circle className="cah-node-ring" cx={n.cx} cy={n.cy} r="10" strokeWidth="2" />
              <circle className="cah-node-core" cx={n.cx} cy={n.cy} r="5.5" />
            </g>
          ))}
        </svg>

        {/* centre readout */}
        <div className="cah-readout">
          <span className="cah-spark" aria-hidden="true"><IconRocket /></span>
          <span className="cah-pct">{pct}<i>%</i></span>
          <span className="cah-pct-label">production-ready</span>
        </div>

        {/* stage labels */}
        {NODES.map((n, i) => (
          <div className={`cah-label cah-label--${n.place}`} style={{ '--i': i }} key={n.key}>
            <span className="cah-label-t">{n.t}</span>
            <span className="cah-label-s">{n.s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConsultingArcHero
