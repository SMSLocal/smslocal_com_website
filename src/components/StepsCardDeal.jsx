import './StepsCardDeal.css'

/**
 * Steps section for the RCS broadcasting page.
 * The four steps are shown as a dealt hand of rich-card layers, fanned outward
 * from a stack. When motion is allowed each card "deals" in one after another
 * (staggered rise + fade) and loops; the reduced-motion base is the settled,
 * readable fan. Hovering a card lifts and straightens it. Distinct from the
 * chevron / ribbon / equalizer / concentric-circle step layouts in the set.
 */
function StepsCardDeal({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="scd-deck">
          {steps.map((step, i) => (
            <div className={`scd-card scd-card--${i % 4}`} key={step.title}>
              <div className="scd-card-inner">
                <div className="scd-card-top">
                  <span className="scd-chip">Step {String(i + 1).padStart(2, '0')}</span>
                  <span className="scd-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <div className="scd-media" aria-hidden="true" />
                <div className="scd-card-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsCardDeal
