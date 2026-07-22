import './PlanIncludesShowcase.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke "every plan includes" showcase for /pricing.
 * A gradient ribbon headline over four capability columns, each led by a
 * gradient icon tile and a checklist. De-boxed (no card per group), light.
 * Sells the "even the free plan runs the whole stack" message.
 */
function PlanIncludesShowcase({ eyebrow, title, subtitle, ribbon, groups }) {
  return (
    <section className="section pinc-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        {ribbon && (
          <div className="pinc-ribbon">
            <span className="pinc-ribbon-dot" aria-hidden="true" />
            {ribbon}
          </div>
        )}

        <div className="pinc-groups">
          {groups.map((g) => (
            <div className="pinc-group" key={g.label}>
              <span className="pinc-icon">{g.icon}</span>
              <h3 className="pinc-group-label">{g.label}</h3>
              <ul className="pinc-list">
                {g.items.map((item) => (
                  <li className="pinc-li" key={item}>
                    <span className="pinc-check" aria-hidden="true"><IconCheck /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlanIncludesShowcase
