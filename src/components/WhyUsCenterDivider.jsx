import './WhyUsCenterDivider.css'

function WhyUsCenterDivider({ eyebrow, title, subtitle, items, alt }) {
  const left = items.slice(0, Math.ceil(items.length / 2))
  const right = items.slice(Math.ceil(items.length / 2))

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wcd-row">
          <div className="wcd-col">
            {left.map((item) => (
              <div className="wcd-item" key={item.title}>
                <span className="wcd-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <span className="wcd-divider" aria-hidden="true" />

          <div className="wcd-col">
            {right.map((item) => (
              <div className="wcd-item" key={item.title}>
                <span className="wcd-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsCenterDivider
