import './WhyUsBenefitRibbon.css'

const TINTS = ['blue', 'cyan', 'coral', 'teal']

function WhyUsBenefitRibbon({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wbr-section' : 'section wbr-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wbr-row">
          {items.map((item, i) => (
            <div className={`wbr-card wbr-card--${TINTS[i % TINTS.length]}`} key={item.title} style={{ '--wbr-i': i }}>
              <span className="wbr-bar" aria-hidden="true" />
              <span className="wbr-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsBenefitRibbon
