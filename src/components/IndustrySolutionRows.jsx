import { Link } from 'react-router-dom'
import './IndustrySolutionRows.css'

// Bespoke 'Solutions by industry' section: hairline-ruled rows, each industry
// pairing its real Chatbot route with its real AI-agent route as tagged link
// pills. Floats on the page background - no card/panel frame.
function IndustrySolutionRows({ eyebrow = 'By industry', title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="isr-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="isr-list">
          {items.map((it) => (
            <div className="isr-row" key={it.title}>
              <div className="isr-lead">
                <span className="isr-medallion">{it.icon}</span>
                <div className="isr-copy">
                  <h3>{it.title}</h3>
                  <p>{it.blurb}</p>
                </div>
              </div>

              <div className="isr-links">
                {it.links.map((l) => (
                  <Link to={l.href} className="isr-chip" key={l.href}>
                    <span className={`isr-chip-kind isr-chip-kind--${l.tone}`}>{l.kind}</span>
                    <span className="isr-chip-name">{l.label}</span>
                    <span className="isr-chip-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustrySolutionRows
