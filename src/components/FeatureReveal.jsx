import './FeatureReveal.css'

function FeatureReveal({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section frv-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="frv-grid">
          {items.map((item, i) => (
            <div className={`frv-item frv-item--${i % 4}`} key={item.title}>
              <span className="frv-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p className="frv-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureReveal
