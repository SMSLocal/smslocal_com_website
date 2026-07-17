import './StepsGrowCircles.css'

const SIZES = [54, 68, 84]

function StepsGrowCircles({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt sgc-section' : 'section sgc-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sgc-row">
          <span className="sgc-line" />
          {steps.map((step, i) => (
            <div className={`sgc-step sgc-step--${i % 4}`} key={step.title}>
              <div className="sgc-visual">
                <span className="sgc-circle" style={{ width: SIZES[i % SIZES.length], height: SIZES[i % SIZES.length] }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsGrowCircles
