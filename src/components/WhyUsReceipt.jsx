import './WhyUsReceipt.css'

function WhyUsReceipt({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wre-list">
          {items.map((item) => (
            <div className="wre-row" key={item.title}>
              <div className="wre-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="wre-check">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsReceipt
