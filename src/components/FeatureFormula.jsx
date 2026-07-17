import './FeatureFormula.css'

function FeatureFormula({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section ffm-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ffm-equation">
          {items.map((item, i) => (
            <span className="ffm-term" key={item.title}>
              <span className={`ffm-icon ffm-icon--${i % 4}`}>{item.icon}</span>
              {i < items.length - 1 && <span className="ffm-op">+</span>}
            </span>
          ))}
          <span className="ffm-op ffm-op--eq">=</span>
          <span className="ffm-result">Your Agent</span>
        </div>

        <div className="ffm-labels">
          {items.map((item) => (
            <div className="ffm-label" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureFormula
