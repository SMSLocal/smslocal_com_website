import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './EmailEcosystemOrbit.css'
import { IconMail } from './icons.jsx'

/**
 * "Ecosystem" for /email-api, built from scratch as a radial orbit: Email
 * sits as the hub, the paired products float around it as satellites
 * connected by live spokes, no bordered cards involved. Clicking (or
 * focusing, or just waiting) a satellite lights its spoke and swaps the
 * floating detail text below.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const RADIUS = 38 // percent of the square orbit box

function EmailEcosystemOrbit({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = items.length
  const timer = useRef(null)

  useEffect(() => {
    if (paused || REDUCED || n < 2) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 4200)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const points = items.map((_, i) => {
    const angle = -90 + i * (360 / n)
    const rad = (angle * Math.PI) / 180
    return { x: 50 + RADIUS * Math.cos(rad), y: 50 + RADIUS * Math.sin(rad) }
  })

  const current = items[active] || {}

  return (
    <section className="section eco-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="eco"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="eco-orbit">
            <svg className="eco-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {points.map((p, i) => (
                <line
                  key={items[i].title}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  className={i === active ? 'eco-line is-active' : 'eco-line'}
                />
              ))}
            </svg>

            <div className="eco-hub">
              <span className="eco-hub-glow" aria-hidden="true" />
              <IconMail />
              <span>Email</span>
            </div>

            {items.map((it, i) => (
              <button
                type="button"
                key={it.title}
                className={i === active ? 'eco-sat is-active' : 'eco-sat'}
                style={{ left: `${points[i].x}%`, top: `${points[i].y}%`, '--d': `${i * 0.12}s` }}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={it.title}
              >
                <span className="eco-sat-ic">{it.icon}</span>
                <span className="eco-sat-label">{it.title}</span>
              </button>
            ))}
          </div>

          <div className="eco-content">
            <div className="eco-detail" key={active}>
              <span className="eco-detail-ic">{current.icon}</span>
              <div className="eco-detail-text">
                <h3>{current.title}</h3>
                <p>{current.desc}</p>
                {/* Dropped entirely when there's no href. The `|| '/'`
                    fallback this replaced offered "Explore →" and delivered
                    the homepage. */}
                {current.href && (
                  <Link to={current.href} className="eco-detail-link">
                    Explore <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="eco-dots">
              {items.map((it, i) => (
                <button
                  key={it.title}
                  type="button"
                  className={active === i ? 'eco-dot is-on' : 'eco-dot'}
                  aria-label={it.title}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            <ul className="eco-also">
              {items.map((it, i) => (
                <li key={it.title}>
                  <button
                    type="button"
                    className={active === i ? 'is-active' : ''}
                    onClick={() => setActive(i)}
                  >
                    {it.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailEcosystemOrbit
