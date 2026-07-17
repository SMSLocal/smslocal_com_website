import './MessengerStepsUnderline.css'

function MessengerStepsUnderline({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="msu-grid">
          {steps.map((step, i) => (
            <div className="msu-col" key={step.title}>
              <h3><span className="msu-num">{i + 1}.</span> {step.title}</h3>
              <p>{step.desc}</p>
              <span className="msu-bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MessengerStepsUnderline
