import { useEffect, useState } from 'react'
import './FeatureExpandStack.css'

// A different shape again: a tab list on the left drives a single large
// preview panel on the right, instead of expanding inline. Auto-cycles;
// clicking any tab jumps to it and pauses autoplay.

const CYCLE_MS = 3400

const TAGS = ['Sub-second', 'One conversation', 'Live availability', 'Zero repeats']

function FeatureExpandStack({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % items.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, items.length])

  const select = (i) => {
    setActive(i)
    setPaused(true)
  }

  const current = items[active]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="fes-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="fes-showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="fes-tabs" role="tablist">
            {items.map((item, i) => {
              const isActive = i === active
              return (
                <button
                  type="button"
                  key={item.title}
                  role="tab"
                  aria-selected={isActive}
                  className={`fes-tab${isActive ? ' is-active' : ''}`}
                  onClick={() => select(i)}
                >
                  <span className="fes-tab-icon">{item.icon}</span>
                  <span className="fes-tab-title">{item.title}</span>
                  {isActive && (
                    <span className="fes-tab-progress">
                      <span className="fes-tab-progress-fill" style={{ animationDuration: `${CYCLE_MS}ms` }} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="fes-preview" key={active}>
            <span className="fes-preview-icon">{current.icon}</span>
            <span className="fes-preview-tag">{TAGS[active % TAGS.length]}</span>
            <h3>{current.title}</h3>
            <p>{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureExpandStack
