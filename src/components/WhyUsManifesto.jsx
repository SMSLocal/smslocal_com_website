import './WhyUsManifesto.css'

function WhyUsManifesto({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wum-section' : 'section wum-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wum-grid">
          {items.map((item, i) => (
            <div className={`wum-item wum-item--${i % 4}`} key={item.title}>
              <h3><span className="wum-icon">{item.icon}</span>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsManifesto
