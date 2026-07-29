import './WhyPartnerRows.css'

function WhyPartnerRows({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wpw-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wpw-list">
          {items.map((item, i) => (
            <div className="wpw-row" key={item.title} style={{ '--wpw-i': i }}>
              <span className="wpw-num">
                <span className="wpw-num-text">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <div className="wpw-body">
                <span className="wpw-icon">{item.icon}</span>
                <div className="wpw-body-t">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyPartnerRows
