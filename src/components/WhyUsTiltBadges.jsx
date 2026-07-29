import './WhyUsTiltBadges.css'

function WhyUsTiltBadges({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wtb2-section' : 'section wtb2-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wtb2-grid">
          {items.map((item, i) => (
            <div className={`wtb2-item${i % 2 === 1 ? ' wtb2-item--alt' : ''}`} key={item.title}>
              <span className="wtb2-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsTiltBadges
