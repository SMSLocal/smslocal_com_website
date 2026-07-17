import { useEffect, useState } from 'react'
import './FeatureSpotlight.css'

const CYCLE_MS = 4000

function FeatureSpotlight({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [items.length])

  const current = items[active]

  return (
    <section className={alt ? 'section section-alt fspot-section' : 'section fspot-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fspot">
          <div className="fspot-main" key={active}>
            <span className={`fspot-main-icon fspot-main-icon--${active % 4}`}>{current.icon}</span>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
          </div>

          <div className="fspot-tabs">
            {items.map((item, i) => (
              <button
                type="button"
                className={`fspot-tab${i === active ? ' fspot-tab--active' : ''}`}
                onClick={() => setActive(i)}
                key={item.title}
              >
                <span className={`fspot-tab-icon fspot-tab-icon--${i % 4}`}>{item.icon}</span>
                <span className="fspot-tab-label">{item.title}</span>
                {i === active && (
                  <span className="fspot-tab-progress">
                    <span className="fspot-tab-progress-fill" style={{ animationDuration: `${CYCLE_MS}ms` }} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSpotlight
