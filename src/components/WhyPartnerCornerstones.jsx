import './WhyPartnerCornerstones.css'

// Bespoke NON-CONTAINER why-partner section: four open "cornerstones",
// each a ghosted gradient index numeral behind a rule + icon + copy.
function WhyPartnerCornerstones({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wpc-section' : 'section wpc-section'}>
      <div className="container">
        <div className="wpc-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="wpc-grid">
          {items.map((it, i) => (
            <div className="wpc-item" key={it.title}>
              <span className="wpc-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="wpc-rule" aria-hidden="true" />
              <span className="wpc-icon">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyPartnerCornerstones
