import './StepsNumberedRows.css'

function StepsNumberedRows({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt snr-section' : 'section snr-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="snr-list">
          {steps.map((step, i) => (
            <div className={`snr-row snr-row--${i % 4}`} key={step.title}>
              <span className="snr-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="snr-icon">{step.icon}</span>
              <div className="snr-copy">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsNumberedRows
