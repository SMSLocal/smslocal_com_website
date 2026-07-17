import './FeatureChatQA.css'

function FeatureChatQA({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt fcq-section' : 'section fcq-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fcq-grid">
          {items.map((item) => (
            <div className="fcq-item" key={item.title}>
              <div className="fcq-row fcq-row--in">
                <span className="fcq-bubble fcq-bubble--in">{item.question}</span>
              </div>
              <div className="fcq-row fcq-row--out">
                <span className="fcq-bubble fcq-bubble--out">
                  <span className="fcq-bubble-ic">{item.icon}</span>
                  {item.title}
                </span>
              </div>
              <p className="fcq-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureChatQA
