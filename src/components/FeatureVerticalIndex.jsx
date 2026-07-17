import './FeatureVerticalIndex.css'

function FeatureVerticalIndex({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section fvi-section">
      <div className="container fvi-container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fvi-list">
          {items.map((item, i) => (
            <div className={`fvi-row fvi-row--${i % 4}`} key={item.title}>
              <span className="fvi-index">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              <span className="fvi-icon">{item.icon}</span>
              <div className="fvi-copy">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureVerticalIndex
