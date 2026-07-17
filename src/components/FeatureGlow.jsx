import './FeatureGlow.css'

function FeatureGlow({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt fg-section' : 'section fg-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fg-grid">
          {items.map((item, i) => (
            <div className={`fg-item fg-item--${i % 4}`} key={item.title}>
              <span className="fg-glow" aria-hidden="true" />
              <span className="fg-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGlow
