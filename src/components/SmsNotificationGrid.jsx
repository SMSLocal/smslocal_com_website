import './SmsNotificationGrid.css'

function SmsNotificationGrid({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sng-grid">
          {items.map((item) => (
            <div className="sng-row" key={item.title}>
              <span className="sng-icon">{item.icon}</span>
              <div className="sng-body">
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

export default SmsNotificationGrid
