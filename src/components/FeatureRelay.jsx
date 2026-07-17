import './FeatureRelay.css'

function FeatureRelay({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section frl-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="frl-chain">
          {items.map((item, i) => (
            <div className="frl-link" key={item.title}>
              <div className={`frl-node frl-node--${i % 4}`}>
                <span className="frl-icon">{item.icon}</span>
              </div>
              {i < items.length - 1 && (
                <span className="frl-arrow">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="frl-labels">
          {items.map((item, i) => (
            <div className="frl-label" key={item.title}>
              <span className="frl-step">Step {i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureRelay
