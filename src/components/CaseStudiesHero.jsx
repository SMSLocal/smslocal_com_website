import { useEffect, useRef, useState } from 'react'
import './CaseStudiesHero.css'

/**
 * Bespoke, non-container hero visual for /resources/case-studies.
 * One concrete animated story: the resolution rate climbing after go-live —
 * a sparkline that draws itself, a headline percentage that counts up, and
 * three floating "before -> after" outcome readouts on hairline dividers.
 * No card / frame / dashboard chrome (non-container rule). Brand gradient only.
 */

// resolution-rate points across the first 8 weeks after launch (0..100 scaled)
const POINTS = [34, 41, 52, 58, 67, 78, 86, 94]
const W = 400
const H = 118
const PAD = 6

function pathFrom(points) {
  const max = 100
  const stepX = (W - PAD * 2) / (points.length - 1)
  return points.map((p, i) => {
    const x = PAD + i * stepX
    const y = H - PAD - (p / max) * (H - PAD * 2)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  })
}

function useCountUp(target, run, duration = 1900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return val
}

function CaseStudiesHero() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  const rate = useCountUp(94, run)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  const d = pathFrom(POINTS)
  const linePath = d.join(' ')
  const areaPath = `${linePath} L${W - PAD} ${H - PAD} L${PAD} ${H - PAD} Z`
  const last = POINTS[POINTS.length - 1]
  const endX = W - PAD
  const endY = H - PAD - (last / 100) * (H - PAD * 2)

  const outs = [
    { color: 'var(--blue)', label: 'First-response time', from: '8 hrs', to: '30 sec' },
    { color: 'var(--cyan)', label: 'Appointment no-shows', from: '22%', to: '9%' },
    { color: 'var(--teal)', label: 'Tickets auto-resolved', from: '0', to: '71%' },
  ]

  return (
    <div className="cshero" ref={ref}>
      <span className="cshero-pill">
        <span className="cshero-livedot" aria-hidden="true" />
        Live results
      </span>

      <div className="cshero-headline">
        <span className="cshero-num">{rate}%</span>
        <span className="cshero-numcap">of chats resolved without an agent, 8 weeks after go-live</span>
      </div>

      <div className="cshero-chart" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H + 16}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="cshero-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--blue)" />
              <stop offset="100%" stopColor="var(--cyan)" />
            </linearGradient>
            <linearGradient id="cshero-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(79, 91, 213,0.16)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0)" />
            </linearGradient>
          </defs>
          <path className="cshero-area" d={areaPath} />
          <path className="cshero-line" d={linePath} />
          <circle className="cshero-endpulse" cx={endX} cy={endY} r="6" />
          <circle className="cshero-endpoint" cx={endX} cy={endY} r="4.5" />
          <text className="cshero-xtick" x={PAD} y={H + 12}>Wk 1</text>
          <text className="cshero-xtick" x={W - PAD} y={H + 12} textAnchor="end">Wk 8</text>
        </svg>
      </div>

      <div className="cshero-outs">
        {outs.map((o) => (
          <div className="cshero-out" key={o.label}>
            <span className="cshero-out-label">
              <span className="cshero-out-dot" style={{ background: o.color }} aria-hidden="true" />
              {o.label}
            </span>
            <span className="cshero-out-flow">
              <span className="cshero-out-from">{o.from}</span>
              <span className="cshero-out-arrow">→</span>
              <span className="cshero-out-to">{o.to}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaseStudiesHero
