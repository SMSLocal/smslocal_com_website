import './StepsChevron.css'

function StepsChevron({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt schv-section' : 'section schv-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="schv-grid">
          {steps.map((step, i) => (
            <div className={`schv-step schv-step--${i % 4}`} key={step.title}>
              <span className="schv-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsChevron
