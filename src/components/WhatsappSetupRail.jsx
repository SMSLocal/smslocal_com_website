import './WhatsappSetupRail.css'

function WhatsappSetupRail({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wsr-rail">
          <span className="wsr-line" aria-hidden="true" />
          {steps.map((step, i) => (
            <div className="wsr-step" key={step.title}>
              <span className="wsr-node">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatsappSetupRail
