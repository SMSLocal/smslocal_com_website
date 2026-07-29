import './FeatureExpandRow.css'

const TINTS = ['lavender', 'mint', 'coral', 'pink']

function FeatureExpandRow({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section fer-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fer-row">
          {items.map((item, i) => (
            <div className={`fer-card fer-card--${TINTS[i % TINTS.length]}`} key={item.title} style={{ '--fer-i': i }}>
              <span className="fer-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <div className="fer-desc-wrap">
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureExpandRow
