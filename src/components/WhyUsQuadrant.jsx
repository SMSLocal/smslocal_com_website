import './WhyUsQuadrant.css'

function WhyUsQuadrant({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wuq-section' : 'section wuq-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wuq">
          {items.map((item, i) => (
            <div className={`wuq-item wuq-item--${i % 4}`} key={item.title}>
              <span className="wuq-icon">{item.icon}</span>
              <div className="wuq-copy">
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

export default WhyUsQuadrant
