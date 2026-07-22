import './StepsDateFlow.css'

// Bespoke booking-themed "how it works": each step is a calendar date-tab
// sitting on a dashed rail. Floats on the page background — no unifying card.
function StepsDateFlow({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt sdf-section' : 'section sdf-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sdf-rail">
          <span className="sdf-rail-line" aria-hidden="true" />
          {steps.map((step, i) => (
            <div className={`sdf-step sdf-step--${i % 3}`} key={step.title}>
              <span className="sdf-tab" aria-hidden="true">
                <span className="sdf-tab-top" />
                <span className="sdf-tab-num">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsDateFlow
