import './EmailStepsQuiet.css'

function EmailStepsQuiet({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="esq-grid">
          {steps.map((step, i) => (
            <div className="esq-col" key={step.title}>
              <span className="esq-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailStepsQuiet
