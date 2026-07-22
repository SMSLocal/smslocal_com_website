import { useEffect, useState } from 'react'
import './LeadQualifyVisual.css'
import { IconRobot, IconCheck } from './icons.jsx'

const SIGNALS = [
  { key: 'B', label: 'Budget', value: '$40K/yr', pos: 'tl' },
  { key: 'A', label: 'Authority', value: 'Head of Ops', pos: 'tr' },
  { key: 'N', label: 'Need', value: 'Legacy swap', pos: 'bl' },
  { key: 'T', label: 'Timeline', value: 'This quarter', pos: 'br' },
]

const TARGET_SCORE = 86
const R = 50
const C = 2 * Math.PI * R

function LeadQualifyVisual() {
  const [lit, setLit] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const signalTimers = SIGNALS.map((_, i) =>
      setTimeout(() => setLit((n) => Math.max(n, i + 1)), 900 + i * 480),
    )
    let raf
    let t0
    const duration = 1700
    const tick = (now) => {
      if (t0 == null) t0 = now
      const p = Math.min(1, (now - t0) / duration)
      setScore(Math.round(TARGET_SCORE * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const startTimer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 700)
    // Fallback: guarantee the final state even if rAF is throttled (e.g. hidden tab).
    const settleTimer = setTimeout(() => setScore(TARGET_SCORE), 700 + duration + 200)
    return () => {
      signalTimers.forEach(clearTimeout)
      clearTimeout(startTimer)
      clearTimeout(settleTimer)
      cancelAnimationFrame(raf)
    }
  }, [])

  const dashoffset = C * (1 - score / 100)
  const qualified = score >= 70

  return (
    <div className="lqv" role="img" aria-label="A live lead-qualification score gauge reaching 86 out of 100 — qualified — scored on budget, authority, need and timeline, then routed to sales">
      <div className="lqv-stage">
        {/* connector lines from gauge to each signal node */}
        <svg className="lqv-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {SIGNALS.map((s, i) => {
            const x = s.pos.includes('l') ? 15 : 85
            const y = s.pos.startsWith('t') ? 27 : 73
            return (
              <line
                key={s.key}
                x1="50" y1="50" x2={x} y2={y}
                className={`lqv-link${i < lit ? ' lqv-link--on' : ''}`}
              />
            )
          })}
        </svg>

        {/* identity pill */}
        <div className="lqv-badge">
          <span className="lqv-badge-ic"><IconRobot /></span>
          Lead Qualification Agent
          <span className="lqv-badge-dot" />
        </div>

        {/* central score gauge */}
        <div className="lqv-gauge">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <linearGradient id="lqvArc" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="var(--blue)" />
                <stop offset="1" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <circle className="lqv-gauge-track" cx="60" cy="60" r={R} />
            <circle
              className="lqv-gauge-arc"
              cx="60" cy="60" r={R}
              strokeDasharray={C}
              strokeDashoffset={dashoffset}
            />
          </svg>
          <div className="lqv-gauge-center">
            <span className="lqv-gauge-cap">Lead score</span>
            <strong className="lqv-gauge-num">{score}</strong>
            <span className={`lqv-gauge-tag${qualified ? ' lqv-gauge-tag--ok' : ''}`}>
              {qualified ? 'Qualified' : 'Scoring…'}
            </span>
          </div>
        </div>

        {/* orbiting BANT signal nodes */}
        {SIGNALS.map((s, i) => (
          <div className={`lqv-node lqv-node--${s.pos}${i < lit ? ' lqv-node--on' : ''}`} key={s.key}>
            <span className="lqv-node-disc">
              <span className="lqv-node-key">{s.key}</span>
              <span className="lqv-node-check"><IconCheck /></span>
            </span>
            <span className="lqv-node-t">
              <strong>{s.label}</strong>
              <span>{s.value}</span>
            </span>
          </div>
        ))}

        {/* routing outcome */}
        <div className={`lqv-route${qualified ? ' lqv-route--show' : ''}`}>
          <span className="lqv-route-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
          Routed to <strong>Sales · Priya</strong>
        </div>
      </div>
    </div>
  )
}

export default LeadQualifyVisual
