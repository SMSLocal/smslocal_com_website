import { useEffect, useState } from 'react'
import './BuilderJourneyPath.css'

// A different shape from the plain 3-card grid this replaces: a single
// connected path with a progress line that fills as it advances, a set of
// clickable stations, and one detail panel that updates in place. Autoplay
// drives it; hovering pauses so a reader can take over.

const CYCLE_MS = 3200

function BuilderJourneyPath({ title, subtitle, eyebrow, steps, alt }) {
  const total = steps.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % total)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, total])

  const fraction = total > 1 ? active / (total - 1) : 0
  const current = steps[active]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="bjp-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className="bjp-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="bjp-track" role="tablist" aria-label="Build journey steps">
            <span className="bjp-line" aria-hidden="true">
              <span className="bjp-line-fill" style={{ width: `${fraction * 100}%` }} />
            </span>

            {steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`bjp-stop${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="bjp-stop-marker">
                  {i < active ? '✓' : String(i + 1).padStart(2, '0')}
                </span>
                <span className="bjp-stop-label">{step.title}</span>
              </button>
            ))}
          </div>

          <div className="bjp-detail" key={active}>
            <span className="bjp-detail-icon">{current.icon}</span>
            <div className="bjp-detail-text">
              <span className="bjp-detail-step">Step {String(active + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}</span>
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuilderJourneyPath
