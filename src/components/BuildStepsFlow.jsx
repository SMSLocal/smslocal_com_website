import './BuildStepsFlow.css'

function BuildStepsFlow({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt bsf-section' : 'section bsf-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="bsf">
          {steps.map((step, i) => (
            <div className={`bsf-step bsf-step--${i % 4}`} key={step.title}>
              <span className="bsf-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="bsf-body">
                <span className="bsf-icon">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {step.chips && (
                  <div className="bsf-chips">
                    {step.chips.map((c) => (
                      <span className="bsf-chip" key={c}>{c}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="bsf-mark" aria-hidden="true">{step.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuildStepsFlow
