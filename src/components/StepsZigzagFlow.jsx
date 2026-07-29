import './StepsZigzagFlow.css'

function StepsZigzagFlow({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt szf-section' : 'section szf-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="szf-panel">
          <div className="szf-track" style={{ '--szf-rows': steps.length }}>
            <span className="szf-spine" aria-hidden="true" />
            {steps.map((step, i) => (
              <span
                className={`szf-dot${i === steps.length - 1 ? ' is-final' : ''}`}
                key={`dot-${step.title}`}
                style={{ '--szf-row': i + 1 }}
                aria-hidden="true"
              >
                <span className="szf-dot-core" />
              </span>
            ))}
            {steps.map((step, i) => (
              <div
                className={`szf-step ${i % 2 === 0 ? 'szf-step--left' : 'szf-step--right'}`}
                key={step.title}
                style={{ '--szf-row': i + 1, '--szf-i': i }}
              >
                <span className="szf-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsZigzagFlow
