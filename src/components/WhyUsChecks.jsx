import './WhyUsChecks.css'
import { IconCheck } from './icons.jsx'

function WhyUsChecks({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wuc-section' : 'section wuc-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wuc-grid">
          {items.map((item, i) => (
            <div className={`wuc-item wuc-item--${i % 4}`} key={item.title}>
              <div className="wuc-head">
                <span className="wuc-check"><IconCheck /></span>
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

export default WhyUsChecks
