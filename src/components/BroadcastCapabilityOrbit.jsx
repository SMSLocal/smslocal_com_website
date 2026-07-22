import { useState } from 'react'
import './BroadcastCapabilityOrbit.css'
import { IconChat } from './icons.jsx'

/**
 * Bespoke capabilities section for /channels/whatsapp-broadcasting.
 * Two columns: a compact orbit graphic (six capability nodes on a faint ring
 * around a broadcast hub) on the left, and the selected capability's detail on
 * the right. Hover or click a node to reveal it. NOT a grid, NOT a list — a
 * spatial orbit paired with a detail panel; light on text (one at a time).
 */
const R = 40 // orbit radius, % of the square graphic

function nodePos(i, n) {
  const a = (-90 + (360 / n) * i) * (Math.PI / 180)
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
}

function BroadcastCapabilityOrbit({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)
  const cap = items[active] || {}

  return (
    <section className="section bco-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="bco">
          <div className="bco-ring" role="tablist" aria-label="Broadcast capabilities">
            <span className="bco-orbit-path" aria-hidden="true" />
            <span className="bco-hub" aria-hidden="true"><IconChat /></span>
            {items.map((it, i) => {
              const p = nodePos(i, items.length)
              return (
                <button
                  key={it.title}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={it.title}
                  className={active === i ? 'bco-node is-active' : 'bco-node'}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {it.icon}
                </button>
              )
            })}
          </div>

          <div className="bco-detail" role="tabpanel" key={cap.title}>
            <span className="bco-detail-icon">{cap.icon}</span>
            <h3 className="bco-detail-title">{cap.title}</h3>
            <p className="bco-detail-desc">{cap.desc}</p>
            <span className="bco-detail-count">{active + 1} / {items.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BroadcastCapabilityOrbit
