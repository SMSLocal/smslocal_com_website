import './WhyUsBento.css'

function WhyUsBento({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wub-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wub-grid">
          {items.map((item, i) => (
            <div className={`wub-item wub-item--${i % 4}`} key={item.title}>
              <span className="wub-icon">{item.icon}</span>
              <div className="wub-copy">
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

export default WhyUsBento
