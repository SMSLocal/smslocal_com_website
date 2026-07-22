import { useEffect, useState } from 'react'
import './MessageTypeShowcase.css'

/**
 * Message-type section for the WhatsApp Business API page — one live phone
 * that swaps content as you move through tabs, not three disconnected rows
 * scattered down the page with the phone floating alone on one side.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function MessageTypeShowcase({ title, subtitle, items }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 3200)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="mts-stage">
          <div className="mts-tabs">
            {items.map((item, i) => (
              <button
                type="button"
                className={i === active ? 'mts-tab active' : 'mts-tab'}
                onClick={() => setActive(i)}
                key={item.title}
              >
                <span className="mts-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mts-tab-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </span>
              </button>
            ))}
          </div>

          <div className="mts-visual" key={active}>
            {items[active].mock}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageTypeShowcase
