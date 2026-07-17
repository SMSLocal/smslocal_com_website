import './WhyUsTargetRing.css'

function WhyUsTargetRing({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wtr-grid">
          {items.map((item) => (
            <div className="wtr-item" key={item.title}>
              <span className="wtr-ring">
                <span className="wtr-icon">{item.icon}</span>
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

export default WhyUsTargetRing
