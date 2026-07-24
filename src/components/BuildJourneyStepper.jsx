import { useEffect, useRef, useState } from 'react'
import './BuildJourneyStepper.css'

/**
 * "From idea to live bot in three steps" on /chatbot, built from scratch:
 * a horizontal progress track (not three static stacked rows) drives a
 * floating content panel below it — click any step, or let it auto-advance
 * and watch the line draw itself between steps.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BuildJourneyStepper({ eyebrow, title, subtitle, steps = [] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const n = steps.length

  useEffect(() => {
    if (paused || REDUCED || n < 2) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 3600)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const current = steps[active] || {}
  const fillPct = n > 1 ? (active / (n - 1)) * 100 : 0

  return (
    <section className="section bjs-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="bjs"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="bjs-track">
            <span className="bjs-rail" aria-hidden="true" />
            <span className="bjs-fill" style={{ width: `${fillPct}%` }} aria-hidden="true" />
            {steps.map((s, i) => (
              <button
                type="button"
                key={s.title}
                className={i === active ? 'bjs-node is-active' : i < active ? 'bjs-node is-done' : 'bjs-node'}
                onClick={() => setActive(i)}
              >
                <span className="bjs-node-dot">{i < active ? '✓' : i + 1}</span>
                <span className="bjs-node-label">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="bjs-panel" key={active}>
            <span className="bjs-icon">{current.icon}</span>
            <div className="bjs-text">
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
              {current.chips && (
                <div className="bjs-chips">
                  {current.chips.map((c, i) => (
                    <span className="bjs-chip" key={c} style={{ '--d': `${i * 0.08}s` }}>{c}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildJourneyStepper
