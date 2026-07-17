import './WhyUsSpine.css'

function WhyUsSpine({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wus-spine">
          <span className="wus-spine-line" aria-hidden="true" />
          {items.map((item, i) => (
            <div className={`wus-spine-item wus-spine-item--${i % 2 === 0 ? 'left' : 'right'}`} key={item.title}>
              <span className="wus-spine-node">{item.icon}</span>
              <div className="wus-spine-text">
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

export default WhyUsSpine
