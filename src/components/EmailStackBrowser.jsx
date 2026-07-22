import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './EmailStackBrowser.css'
import { IconMail } from './icons.jsx'

/**
 * Bespoke "ecosystem" for /email-api.
 * A literal channel stack: the paired products sit as a depth-stacked deck with
 * email pinned to the top ("you're here"). Side arrows and nav dots move through
 * it, and it auto-advances every 5s (paused on hover). One card in focus.
 */
function EmailStackBrowser({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = items.length

  const go = (dir) => setActive((a) => (a + dir + n) % n)

  useEffect(() => {
    if (paused || n < 2) return undefined
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 5000)
    return () => clearTimeout(t)
  }, [active, paused, n])

  return (
    <section className="section esb-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="esb" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <span className="esb-pin">
            <IconMail /> Email <i>· you&rsquo;re here</i>
          </span>

          <div className="esb-deck-row">
            <button type="button" className="esb-arrow" aria-label="Previous" onClick={() => go(-1)}>
              <span className="esb-chev esb-chev--left" aria-hidden="true" />
            </button>

            <div className="esb-stack">
              {items.map((it, i) => {
                const rank = (i - active + n) % n
                const style = {
                  zIndex: n - rank,
                  transform: `translate(-50%, ${rank * 16}px) scale(${1 - rank * 0.05})`,
                  opacity: rank === 0 ? 1 : 0.6 - rank * 0.08,
                }
                return (
                  <div
                    key={it.title}
                    className={rank === 0 ? 'esb-card is-front' : 'esb-card'}
                    style={style}
                    onClick={() => setActive(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActive(i) }}
                  >
                    <div className="esb-card-head">
                      <span className="esb-ic">{it.icon}</span>
                      <h3>{it.title}</h3>
                    </div>
                    <p className="esb-desc">{it.desc}</p>
                    <Link to={it.href || '/'} className="esb-link" onClick={(e) => e.stopPropagation()}>
                      Explore <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )
              })}
            </div>

            <button type="button" className="esb-arrow" aria-label="Next" onClick={() => go(1)}>
              <span className="esb-chev esb-chev--right" aria-hidden="true" />
            </button>
          </div>

          <div className="esb-dots">
            {items.map((it, i) => (
              <button
                key={it.title}
                type="button"
                className={active === i ? 'esb-dot is-on' : 'esb-dot'}
                aria-label={it.title}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailStackBrowser
