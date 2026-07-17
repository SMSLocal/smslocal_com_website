import './CardCarousel.css'

function CardCarousel({ title, subtitle, eyebrow, items, alt }) {
  const looped = [...items, ...items, ...items]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ecosystem-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="ccar-marquee">
        <div className="ccar-marquee-track">
          {looped.map((item, idx) => (
            <div className="ccar-card" key={`${item.title}-${idx}`}>
              <span className="ccar-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardCarousel
