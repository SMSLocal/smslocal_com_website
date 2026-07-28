import { useState } from 'react'
import './FeatureMasonry.css'

function FeatureMasonry({ eyebrow, title, subtitle, items, alt }) {
  const lastIndex = items.length - 1
  const [active, setActive] = useState(lastIndex)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fmx-row" onMouseLeave={() => setActive(lastIndex)}>
          {items.map((item, i) => {
            const isOpen = i === active
            return (
              <div
                className={`fmx-strip${isOpen ? ' is-open' : ''}`}
                key={item.title}
                onMouseEnter={() => setActive(i)}
              >
                <span className="fmx-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="fmx-label">{item.title}</span>

                <div className="fmx-content">
                  <span
                    className="fmx-content-icon"
                    style={item.tint ? { '--fmx-tint': item.tint, '--fmx-tint-bg': item.tintBg } : undefined}
                  >
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureMasonry
