import { useState } from 'react'
import './RcsWhyUsQuad.css'

/**
 * Bespoke "why us" for /rcs-business-messaging.
 * A horizontal accordion: four panels sit side by side; the active one expands
 * in place to reveal its detail while the others stay compact. Hover or click.
 * Novel interaction, de-boxed.
 */
function RcsWhyUsQuad({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)

  return (
    <section className="section section-alt rwq-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="rwq-acc">
          {items.map((r, i) => (
            <button
              key={r.title}
              type="button"
              className={active === i ? 'rwq-panel is-active' : 'rwq-panel'}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={active === i}
            >
              <span className="rwq-icon">{r.icon}</span>
              <span className="rwq-title">{r.title}</span>
              <span className="rwq-desc">{r.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RcsWhyUsQuad
