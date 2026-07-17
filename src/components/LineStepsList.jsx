import './LineStepsList.css'

function LineStepsList({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="lsl-list">
          {steps.map((step, i) => (
            <div className="lsl-item" key={step.title}>
              <h3><span className="lsl-num">{i + 1}</span> {step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LineStepsList
