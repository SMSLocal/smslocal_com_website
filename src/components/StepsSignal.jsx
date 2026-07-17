import './StepsSignal.css'

function StepsSignal({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt ssg-section' : 'section ssg-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ssg-grid">
          {steps.map((step, i) => (
            <div className={`ssg-step ssg-step--${i % 4}`} key={step.title}>
              <div className="ssg-meter" aria-hidden="true">
                {steps.map((_, barIdx) => (
                  <span
                    key={barIdx}
                    className={`ssg-bar${barIdx <= i ? ' ssg-bar--on' : ''}`}
                    style={{ height: `${14 + barIdx * 10}px` }}
                  />
                ))}
              </div>
              <span className="ssg-num">Step {i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsSignal
