import './GovernanceControls.css'

function GovernanceControls({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="gc-list">
          {items.map((item) => (
            <div className="gc-row" key={item.title}>
              <span className="gc-toggle" aria-hidden="true">
                <span className="gc-toggle-knob" />
              </span>
              <div className="gc-body">
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

export default GovernanceControls
