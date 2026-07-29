import { useEffect, useRef, useState } from 'react'
import './WhyItWorksCarousel.css'

// Auto-advancing spotlight: one benefit fully in view at a time, driven by a
// circular countdown ring rather than a fixed interval, so clicking a dot or
// hovering to pause reads naturally against the ring's own progress instead
// of fighting a separate timer. Distinct from the plain reveal-grids used
// elsewhere on the site — this is the one section that stays in motion for
// as long as a visitor lingers on it.
const CYCLE_MS = 4200
const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function WhyItWorksCarousel({ eyebrow, title, subtitle, items, alt }) {
  const total = items.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    startRef.current = null

    const tick = (now) => {
      if (paused) {
        startRef.current = null
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / CYCLE_MS, 1)
      setProgress(p)
      if (p >= 1) {
        setActive((a) => (a + 1) % total)
        startRef.current = now
        setProgress(0)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, total])

  const jumpTo = (i) => {
    setActive(i)
    setProgress(0)
    startRef.current = null
  }

  const current = items[active]
  const dashoffset = CIRCUMFERENCE * (1 - progress)

  return (
    <section className={alt ? 'section section-alt wic-section' : 'section wic-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="wic-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="wic-spotlight" style={{ '--wic-active': active }}>
            <div className="wic-badge-wrap">
              <svg className="wic-badge-ring" viewBox="0 0 60 60" aria-hidden="true">
                <circle className="wic-badge-track" cx="30" cy="30" r={RADIUS} />
                <circle
                  className="wic-badge-fill"
                  cx="30"
                  cy="30"
                  r={RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={REDUCED ? 0 : dashoffset}
                />
              </svg>
              <span className="wic-badge" key={active}>{current.icon}</span>
            </div>

            <div className="wic-copy" key={`copy-${active}`}>
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
            </div>
          </div>

          <div className="wic-dots" role="tablist" aria-label="Why it works highlights">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`wic-dot${i === active ? ' is-active' : ''}`}
                onClick={() => jumpTo(i)}
              >
                <span className="wic-dot-ic">{item.icon}</span>
                <span className="wic-dot-label">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyItWorksCarousel
