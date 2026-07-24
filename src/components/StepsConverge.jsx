import './StepsConverge.css'

/**
 * "How it works" for the social inbox page.
 * An immersive dark stage: the four steps zig-zag around a central spine while
 * a comet of light runs the spine top-to-bottom, lighting each step as it
 * passes (12s loop, 3s per step, CSS only). Deliberately vertical — every
 * other section on this page reads horizontally.
 */

function StepsConverge({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt scv-section' : 'section scv-section'}>
      <div className="container">
        <div className="scv-stage">
          <div className="scv-grid" aria-hidden="true" />
          <div className="scv-glow" aria-hidden="true" />

          <div className="scv-head">
            {eyebrow && <span className="scv-kicker">{eyebrow}</span>}
            {title && <h2 className="scv-title">{title}</h2>}
            {subtitle && <p className="scv-subtitle">{subtitle}</p>}
          </div>

          <div className="scv-journey">
            <span className="scv-spine" aria-hidden="true">
              <span className="scv-comet" />
            </span>

            {steps.map((step, i) => (
              <div className="scv-step" key={step.title} style={{ '--i': i }}>
                <span className="scv-node" aria-hidden="true" />
                <div className="scv-card">
                  <span className="scv-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsConverge
