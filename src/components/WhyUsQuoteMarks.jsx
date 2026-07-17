import './WhyUsQuoteMarks.css'

function WhyUsQuoteMarks({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wqm-grid">
          {items.map((item) => (
            <div className="wqm-item" key={item.title}>
              <span className="wqm-mark" aria-hidden="true">&ldquo;</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsQuoteMarks
