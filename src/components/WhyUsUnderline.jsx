import './WhyUsUnderline.css'

function WhyUsUnderline({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wul-grid">
          {items.map((item) => (
            <div className="wul-item" key={item.title}>
              <div className="wul-head">
                <span className="wul-icon">{item.icon}</span>
                <h3>{item.title}</h3>
              </div>
              <span className="wul-underline" aria-hidden="true" />
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsUnderline
