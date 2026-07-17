import './WhyUsDividers.css'

function WhyUsDividers({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wud-grid">
          {items.map((item) => (
            <div className="wud-item" key={item.title}>
              <span className="wud-watermark" aria-hidden="true">{item.icon}</span>
              <span className="wud-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsDividers
