import './WhyUsNumberedList.css'

function WhyUsNumberedList({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wnl-grid">
          {items.map((item, i) => (
            <div className="wnl-item" key={item.title}>
              <div className="wnl-head">
                <span className="wnl-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsNumberedList
