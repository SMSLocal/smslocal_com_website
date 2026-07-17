import './IndustryPillars.css'

const TINTS = ['a', 'b', 'c', 'd']

function IndustryPillars({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ipl-grid">
          {items.map((item, i) => (
            <div className={`ipl-item ipl-tint--${TINTS[i % TINTS.length]}`} key={item.title}>
              <span className="ipl-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="ipl-bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryPillars
