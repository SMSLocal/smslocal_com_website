import './IndustryChips.css'

function IndustryChips({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="indchips">
          {items.map((item) => (
            <div className="indchip" key={item.title}>
              <span className="indchip-pill">
                <span className="indchip-icon">{item.icon}</span>
                {item.title}
              </span>
              <p className="indchip-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryChips
