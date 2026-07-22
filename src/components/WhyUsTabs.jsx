import './WhyUsTabs.css'
import { useState, useRef } from 'react'

/**
 * Why-us section for the RCS broadcasting page.
 * The only interactive list-swap layout in the set: a vertical list of reason
 * tabs on the left drives a detail panel on the right. Clicking or hovering a
 * tab swaps the panel; arrow keys, Home/End and Enter/Space work via native
 * buttons with a roving tabindex, and the panel is a labelled tabpanel. The
 * panel fade-in runs only when motion is allowed.
 */
function WhyUsTabs({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)
  const btnRefs = useRef([])

  const onKeyDown = (e) => {
    const last = items.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      btnRefs.current[next]?.focus()
    }
  }

  const current = items[active]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wtab-layout">
          <div
            className="wtab-list"
            role="tablist"
            aria-label="Reasons to broadcast RCS with SMSLocal"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`wtab-tab-${i}`}
                aria-selected={active === i}
                aria-controls="wtab-panel"
                tabIndex={active === i ? 0 : -1}
                ref={(el) => (btnRefs.current[i] = el)}
                className={`wtab-tab${active === i ? ' wtab-tab--active' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="wtab-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="wtab-tab-ic">{item.icon}</span>
                <span className="wtab-tab-title">{item.title}</span>
                <span className="wtab-tab-chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </span>
              </button>
            ))}
          </div>

          <div
            className="wtab-panel"
            id="wtab-panel"
            role="tabpanel"
            aria-labelledby={`wtab-tab-${active}`}
            key={active}
          >
            <span className="wtab-panel-ic">{current.icon}</span>
            <h3>{current.title}</h3>
            <p className="wtab-panel-desc">{current.desc}</p>
            {current.points && (
              <ul className="wtab-points">
                {current.points.map((pt) => (
                  <li key={pt}>
                    <span className="wtab-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsTabs
