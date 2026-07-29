import { useEffect, useRef, useState } from 'react'
import './BuildJourneyStepperIndustry.css'

/**
 * "From idea to live bot in three steps" on /chatbot, built from scratch:
 * a horizontal progress track (not three static stacked rows) drives a
 * floating content panel below it — click any step, or let it auto-advance
 * and watch the line draw itself between steps.
 */

function BuildJourneyStepperIndustry({ eyebrow, title, subtitle, steps = [], alt }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const n = steps.length

  useEffect(() => {
    if (paused || n < 2) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 3600)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const current = steps[active] || {}
  const fillPct = n > 1 ? (active / (n - 1)) * 100 : 0

  return (
    <section className={alt ? 'section section-alt bjsi-section' : 'section bjsi-section'}>
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
          <div className="bjsi-track">
            <span className="bjsi-rail" aria-hidden="true" />
            <span className="bjsi-fill" style={{ width: `${fillPct}%` }} aria-hidden="true" />
            {steps.map((s, i) => (
              <button
                type="button"
                key={s.title}
                className={i === active ? 'bjsi-node is-active' : i < active ? 'bjsi-node is-done' : 'bjsi-node'}
                onClick={() => setActive(i)}
              >
                <span className="bjsi-node-dot">{i < active ? '✓' : i + 1}</span>
                <span className="bjsi-node-label">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="bjsi-panel" key={active}>
            <span className="bjsi-icon">{current.icon}</span>
            <div className="bjsi-text">
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
              {current.chips && (
                <div className="bjsi-chips">
                  {current.chips.map((c, i) => (
                    <span className="bjsi-chip" key={c} style={{ '--d': `${i * 0.08}s` }}>{c}</span>
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

export default BuildJourneyStepperIndustry
