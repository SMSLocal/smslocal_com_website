import { useEffect, useState } from 'react'
import './NumberCapabilitiesGrid.css'

/**
 * Capabilities section for /numbers/did — a radial orbit scene docked to
 * the left, with the caption on the right (avoids the empty space a
 * centered orbit + centered caption would leave on both sides). Spokes
 * start outside a small center hub mark so they never cross the text.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SIZE = 380
const RADIUS = 155
const INNER_RADIUS = 44
const CENTER = SIZE / 2

function NumberCapabilitiesGrid({ eyebrow, title, subtitle, items }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 2000)
    return () => clearInterval(id)
  }, [items.length])

  const nodes = items.map((it, i) => {
    const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2
    return {
      ...it,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
      ix: CENTER + INNER_RADIUS * Math.cos(angle),
      iy: CENTER + INNER_RADIUS * Math.sin(angle),
    }
  })

  return (
    <section className="section section-alt">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="nor-stage">
          <div className="nor-orbit" style={{ width: SIZE, height: SIZE }}>
            <svg className="nor-spokes" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
              {nodes.map((n, i) => (
                <line
                  key={n.title}
                  x1={n.ix}
                  y1={n.iy}
                  x2={n.x}
                  y2={n.y}
                  className={i === active ? 'active' : ''}
                />
              ))}
            </svg>

            <span className="nor-hub" aria-hidden="true" />

            {nodes.map((n, i) => (
              <button
                type="button"
                key={n.title}
                className={i === active ? 'nor-node active' : 'nor-node'}
                style={{ left: n.x, top: n.y }}
                onClick={() => setActive(i)}
                aria-label={n.title}
              >
                {n.icon}
              </button>
            ))}
          </div>

          <div className="nor-caption" key={active}>
            <h3>{items[active].title}</h3>
            <p>{items[active].desc}</p>
            {items[active].specs && (
              <ul className="nor-specs">
                {items[active].specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NumberCapabilitiesGrid
