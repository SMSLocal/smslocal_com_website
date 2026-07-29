import './WhyUsSdrPulse.css'

function WhyUsSdrPulse({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wsp-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wsp-grid">
          {items.map((item, i) => (
            <div className="wsp-card" key={item.title} style={{ '--wsp-i': i }}>
              <span className="wsp-icon-wrap">
                <span className="wsp-icon-ring" aria-hidden="true" />
                <span className="wsp-icon">{item.icon}</span>
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="wsp-underline" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSdrPulse
