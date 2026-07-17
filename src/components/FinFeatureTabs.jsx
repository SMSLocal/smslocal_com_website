import { useEffect, useState } from 'react'
import './FinFeatureTabs.css'

const DURATION = 4000

function FinFeatureTabs({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), DURATION)
    return () => clearTimeout(id)
  }, [active, items.length])

  const current = items[active]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fft">
          <div className="fft-tabs">
            {items.map((item, i) => (
              <button
                type="button"
                className={`fft-tab${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                key={item.title}
              >
                <span className="fft-tab-title">{item.title}</span>
                <span className="fft-tab-track">
                  {i === active && <span className="fft-tab-fill" key={active} />}
                </span>
              </button>
            ))}
          </div>

          <div className="fft-panel" key={active}>
            <span className="fft-panel-icon">{current.icon}</span>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinFeatureTabs
