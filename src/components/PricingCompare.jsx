import './PricingCompare.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke plan-by-plan compare table for /pricing.
 * A clean, de-boxed matrix: feature rows with three value columns, the middle
 * (Scale) column subtly highlighted with a gradient wash to steer the eye.
 * Gradient checks for included, a quiet dash for not. Light throughout.
 */
function renderCell(val) {
  if (val === true) {
    return <span className="pcmp-yes" aria-label="Included"><IconCheck /></span>
  }
  if (val === false) {
    return <span className="pcmp-no" aria-label="Not included">—</span>
  }
  return <span className="pcmp-val">{val}</span>
}

function PricingCompare({ eyebrow, title, subtitle, colLabels, rows }) {
  return (
    <section className="section pcmp-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="pcmp">
          <div className="pcmp-row pcmp-head">
            <span className="pcmp-feature" />
            <span className="pcmp-col">{colLabels[0]}</span>
            <span className="pcmp-col pcmp-col--mid">{colLabels[1]}</span>
            <span className="pcmp-col">{colLabels[2]}</span>
          </div>

          {rows.map((r) => (
            <div className="pcmp-row" key={r.feature}>
              <span className="pcmp-feature">{r.feature}</span>
              <span className="pcmp-col">{renderCell(r.col1)}</span>
              <span className="pcmp-col pcmp-col--mid">{renderCell(r.col2)}</span>
              <span className="pcmp-col">{renderCell(r.col3)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingCompare
