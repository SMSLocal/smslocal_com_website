import { useState } from 'react'
import './PricingCompareAccordion.css'
import { IconCheck } from './icons.jsx'

/**
 * Plan-by-plan compare table for /pricing — structurally replicated from
 * acepeak.com/pricing's "side-by-side" table: a sticky blurred header row,
 * category groups opened by default (button + rotating chevron), zebra
 * striping on alternating rows, and colored circular checkmarks (the
 * highlighted plan's column gets this project's brand gradient, the rest
 * get teal) instead of a flat 3-column matrix.
 */
function renderCell(val, highlighted) {
  if (val === true) {
    return (
      <span className={highlighted ? 'pcmpa-yes pcmpa-yes--pop' : 'pcmpa-yes'} aria-label="Included">
        <IconCheck />
      </span>
    )
  }
  if (val === false) {
    return <span className="pcmpa-no" aria-label="Not included">—</span>
  }
  return <span className="pcmpa-val">{val}</span>
}

// col2 (the second plan column) is always the highlighted/"most popular"
// column, matching PricingTiers' highlighted plan.
function PricingCompareAccordion({ eyebrow, title, subtitle, colLabels, priceLabels, categories }) {
  const [open, setOpen] = useState(() => new Set(categories.map((c) => c.label)))

  const toggle = (label) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  return (
    <section className="section pcmpa-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="pcmpa">
          <div className="pcmpa-row pcmpa-head">
            <span className="pcmpa-feature" />
            {colLabels.map((label, i) => (
              <span className={i === 1 ? 'pcmpa-col pcmpa-col--pop' : 'pcmpa-col'} key={label}>
                <span className="pcmpa-col-name">{label}</span>
                {priceLabels && priceLabels[i] && <span className="pcmpa-col-price">{priceLabels[i]}</span>}
              </span>
            ))}
          </div>

          {categories.map((cat) => {
            const isOpen = open.has(cat.label)
            return (
              <div className="pcmpa-group" key={cat.label}>
                <button
                  type="button"
                  className={isOpen ? 'pcmpa-cat is-open' : 'pcmpa-cat'}
                  onClick={() => toggle(cat.label)}
                  aria-expanded={isOpen}
                >
                  {cat.label}
                  <span className="pcmpa-cat-chevron" aria-hidden="true" />
                </button>

                {isOpen && cat.rows.map((r, ri) => (
                  <div className={ri % 2 === 1 ? 'pcmpa-row pcmpa-row--alt' : 'pcmpa-row'} key={r.feature}>
                    <span className="pcmpa-feature">{r.feature}</span>
                    <span className="pcmpa-col">{renderCell(r.col1)}</span>
                    <span className="pcmpa-col pcmpa-col--pop">{renderCell(r.col2, true)}</span>
                    <span className="pcmpa-col">{renderCell(r.col3)}</span>
                    <span className="pcmpa-col">{renderCell(r.col4)}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingCompareAccordion
