import './FeatureRows.css'

function FeatureRows({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt frw-section' : 'section frw-section'}>
      <div className="container frw-container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="frw-list">
          {items.map((item, i) => (
            <div className={`frw-row frw-row--${i % 4}`} key={item.title}>
              <span className="frw-icon">{item.icon}</span>
              <div className="frw-copy">
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

export default FeatureRows
