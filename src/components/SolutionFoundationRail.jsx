import './SolutionFoundationRail.css'

// Bespoke 'what every solution includes' section: four value pillars standing on
// one shared gradient rail (the common foundation). Floats on the page
// background - no card/panel frame.
function SolutionFoundationRail({ eyebrow = 'Included', title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="sfr-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="sfr-stage">
          <div className="sfr-pillars">
            {items.map((it) => (
              <div className="sfr-pillar" key={it.title}>
                <span className="sfr-pillar-ic">{it.icon}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <span className="sfr-pillar-stem" aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className="sfr-rail">
            <span className="sfr-rail-line" aria-hidden="true" />
            <span className="sfr-rail-label">One platform · one account · every channel</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionFoundationRail
