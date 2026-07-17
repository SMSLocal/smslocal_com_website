import './WhyUsSplitGrid.css'

function WhyUsSplitGrid({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wsg-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wsg-grid">
          {items.map((item, i) => (
            <div className={`wsg-item wsg-item--${i % 4}`} key={item.title}>
              <span className="wsg-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="wsg-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSplitGrid
