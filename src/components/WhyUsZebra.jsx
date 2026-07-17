import './WhyUsZebra.css'

function WhyUsZebra({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wuz-list">
          {items.map((item, i) => (
            <div className={`wuz-row${i % 2 === 1 ? ' wuz-row--tint' : ''}`} key={item.title}>
              <span className="wuz-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsZebra
