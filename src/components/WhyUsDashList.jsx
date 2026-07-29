import './WhyUsDashList.css'

function WhyUsDashList({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wdl-section' : 'section wdl-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wdl-row">
          {items.map((item, i) => (
            <div className="wdl-item" key={item.title} style={{ '--wdl-i': i }}>
              <div className="wdl-head">
                <span className="wdl-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="wdl-dash" aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsDashList
