import './IndustryBubbles.css'

const TINTS = ['a', 'b', 'c', 'd', 'e', 'f']

function IndustryBubbles({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="inddir-grid">
          {items.map((item, i) => (
            <div className="inddir-item" key={item.title}>
              <span className={`inddir-avatar tint-${TINTS[i % TINTS.length]}`}>{item.icon}</span>
              <div className="inddir-text">
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

export default IndustryBubbles
