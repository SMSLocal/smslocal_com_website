import './WhyUsCompass.css'

function WhyUsCompass({ eyebrow, title, subtitle, items, alt }) {
  const [top, right, bottom, left] = items

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wcp">
          <div className="wcp-item wcp-item--top">
            <span className="wcp-ic">{top.icon}</span>
            <h3>{top.title}</h3>
            <p>{top.desc}</p>
          </div>

          <div className="wcp-item wcp-item--left">
            <span className="wcp-ic">{left.icon}</span>
            <h3>{left.title}</h3>
            <p>{left.desc}</p>
          </div>

          <div className="wcp-hub">
            <span className="wcp-hub-ring" />
            <span className="wcp-hub-label">One<br />Agent</span>
          </div>

          <div className="wcp-item wcp-item--right">
            <span className="wcp-ic">{right.icon}</span>
            <h3>{right.title}</h3>
            <p>{right.desc}</p>
          </div>

          <div className="wcp-item wcp-item--bottom">
            <span className="wcp-ic">{bottom.icon}</span>
            <h3>{bottom.title}</h3>
            <p>{bottom.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsCompass
