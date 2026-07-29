import './WhyUsPulseGrid.css'

function WhyUsPulseGrid({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wpg-section' : 'section wpg-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wpg-grid">
          {items.map((item, i) => (
            <div className="wpg-card" key={item.title} style={{ '--wpg-i': i }}>
              <span className="wpg-icon-wrap">
                <span className="wpg-icon-ring" aria-hidden="true" />
                <span className="wpg-icon">{item.icon}</span>
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="wpg-underline" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsPulseGrid
