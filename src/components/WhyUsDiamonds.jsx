import './WhyUsDiamonds.css'

function WhyUsDiamonds({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wdi-grid">
          {items.map((item) => (
            <div className="wdi-item" key={item.title}>
              <span className="wdi-diamond">
                <span className="wdi-diamond-icon">{item.icon}</span>
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsDiamonds
