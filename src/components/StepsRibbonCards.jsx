import './StepsRibbonCards.css'

function StepsRibbonCards({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt src-section' : 'section src-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="src-grid">
          {steps.map((step, i) => (
            <div className="src-card" key={step.title} style={{ '--src-i': i }}>
              <span className="src-step-label">Step {String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>

              <span className="src-ribbon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="src-ribbon-num">{String(i + 1).padStart(2, '0')}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsRibbonCards
