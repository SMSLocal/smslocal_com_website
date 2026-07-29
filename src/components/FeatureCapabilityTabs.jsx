import { useEffect, useState } from 'react'
import './FeatureCapabilityTabs.css'

const CYCLE_MS = 3500

const PREVIEWS = [
  { request: 'Any slots Tuesday?', confirm: '3 open slots found' },
  { request: 'Book Tuesday 2pm', confirm: 'Confirmed — Tue, 2:00 PM' },
  { request: 'Appointment tomorrow', confirm: 'Reminder sent — Tue, 9:00 AM' },
  { request: 'Move to Wednesday?', confirm: 'Rescheduled — Wed, 2:00 PM' },
]

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 3v4h-4M7 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" aria-hidden="true">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureCapabilityTabs({ eyebrow, title, subtitle, items }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = items.length

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, n])

  const item = items[active]
  const preview = PREVIEWS[active % PREVIEWS.length]

  return (
    <section
      className="section fct-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fct-tabs">
          {items.map((it, i) => (
            <button
              type="button"
              key={it.title}
              className={`fct-tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="fct-tab-icon">{it.icon}</span>
              <span className="fct-tab-body">
                <span className="fct-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="fct-tab-title">{it.title}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="fct-panel">
          <div className="fct-preview">
            <span className="fct-preview-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <span className="fct-preview-label">Live preview</span>
            <div className="fct-preview-request">{preview.request}</div>
            <div className="fct-preview-confirm"><CheckIcon />{preview.confirm}</div>
          </div>

          <div className="fct-copy">
            <span className="fct-copy-badge"><RefreshIcon />Capability {String(active + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureCapabilityTabs
