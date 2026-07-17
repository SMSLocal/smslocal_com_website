import './WhyUsBadges.css'

function WhyUsBadges({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wub-section' : 'section wub-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wub-grid">
          {items.map((item, i) => (
            <div className={`wub-item wub-item--${i % 4}`} key={item.title}>
              <span className="wub-badge">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsBadges
