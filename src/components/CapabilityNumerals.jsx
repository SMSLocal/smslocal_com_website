import './CapabilityNumerals.css'

function CapabilityNumerals({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="cn-stack">
          {items.map((item, i) => (
            <div className="cn-row" key={item.title}>
              <span className="cn-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="cn-body">
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

export default CapabilityNumerals
