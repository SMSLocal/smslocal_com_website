import './JourneyAscent.css'

function JourneyAscent({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt journey-section' : 'section journey-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="journey">
          {steps.map((step, i) => {
            const side = i % 2 === 0 ? 'right' : 'left'
            return (
              <div className={`journey-step journey-step--${side}`} key={step.title}>
                <span className="journey-node">{String(i + 1).padStart(2, '0')}</span>
                <div className="journey-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default JourneyAscent
