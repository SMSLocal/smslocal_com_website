import './CampaignStepsShowcase.css'

function CampaignStepsShowcase({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="css-grid">
          {steps.map((step, i) => (
            <div className="css-col" key={step.title}>
              <span className="css-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="css-caption">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="css-visual">{step.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CampaignStepsShowcase
