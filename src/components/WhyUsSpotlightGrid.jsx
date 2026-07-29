import './WhyUsSpotlightGrid.css'

function WhyUsSpotlightGrid({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wsgs-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wsgs-grid">
          {items.map((item) => (
            <div className="wsgs-card" key={item.title || item.desc}>
              <div className="wsgs-face">
                <span className="wsgs-icon">{item.icon}</span>
                <h3 className="wsgs-title">{item.title}</h3>
              </div>
              {item.desc && (
                <div className="wsgs-desc-wrap">
                  <p className="wsgs-desc">{item.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSpotlightGrid
