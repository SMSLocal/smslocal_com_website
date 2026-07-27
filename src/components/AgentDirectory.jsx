import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AgentDirectory.css'

const AUTOPLAY_MS = 5000

function AgentDirectory({ eyebrow, title, subtitle, items, alt }) {
  const total = items.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((next) => {
    setIndex(((next % total) + total) % total)
  }, [total])

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(timer.current)
  }, [index, paused, total])

  // relative position with wrap-around: 0 = main, -1 / +1 = ghosts
  const offsetOf = (i) => {
    const d = (i - index + total) % total
    return d > total / 2 ? d - total : d
  }

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="agd-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className="agd-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="agd-arrow agd-arrow--prev"
            onClick={() => go(index - 1)}
            aria-label="Previous agent"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="agd-stage">
            {items.map((item, i) => {
              const off = offsetOf(i)
              const isMain = off === 0
              const isGhost = Math.abs(off) === 1
              const state = isMain ? 'main' : isGhost ? 'ghost' : 'hidden'

              return (
                <Link
                  to={item.href}
                  key={item.title}
                  className={`agd-card agd-card--${state} agd-hue--${i % 7}`}
                  style={{ '--agd-off': off }}
                  tabIndex={isMain ? 0 : -1}
                  aria-hidden={!isMain}
                  onClick={(e) => {
                    if (!isMain) {
                      e.preventDefault()
                      go(i)
                    }
                  }}
                >
                  <span className="agd-card-head">
                    <span className="agd-card-icon">{item.icon}</span>
                    {item.group && <span className="agd-card-group">{item.group}</span>}
                  </span>

                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <span className="agd-card-tags">
                    {(item.channels || []).map((c) => <span key={c}>{c}</span>)}
                  </span>

                  <span className="agd-card-cta">
                    Explore this agent
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              )
            })}
          </div>

          <button
            type="button"
            className="agd-arrow agd-arrow--next"
            onClick={() => go(index + 1)}
            aria-label="Next agent"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className="agd-dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={i === index ? 'agd-dot is-active' : 'agd-dot'}
              onClick={() => go(i)}
              aria-label={`Show ${item.title}`}
            >
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className={paused ? 'agd-dot-fill is-paused' : 'agd-dot-fill'}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgentDirectory
