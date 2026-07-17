import './EcomFeatureShowcase.css'

function EcomFeatureShowcase({ eyebrow, title, subtitle, items, alt }) {
  const [lead, ...rest] = items

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="efs-lead">
          <span className="efs-lead-icon">{lead.icon}</span>
          <h3>{lead.title}</h3>
          <p>{lead.desc}</p>
        </div>

        <div className="efs-rest">
          {rest.map((item) => (
            <div className="efs-item" key={item.title}>
              <span className="efs-icon">{item.icon}</span>
              <div className="efs-item-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcomFeatureShowcase
