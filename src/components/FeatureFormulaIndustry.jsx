import './FeatureFormulaIndustry.css'

function FeatureFormulaIndustry({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section ffmi-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ffmi-icon-row">
          {items.map((item, i) => (
            <span className={`ffmi-term${i < items.length - 1 ? ' ffmi-term--op' : ''}`} key={item.title} style={{ '--ffmi-i': i }}>
              <span className={`ffmi-icon ffmi-icon--${i % 4}`}>{item.icon}</span>
            </span>
          ))}
        </div>

        <div className="ffmi-labels">
          {items.map((item, i) => (
            <div className={`ffmi-label ffmi-label--${i % 4}`} key={item.title} style={{ '--ffmi-i': i }}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureFormulaIndustry
