import { useEffect, useRef, useState } from 'react'
import './FeatureBroadcastShowcase.css'

const CYCLE_MS = 3500

function FeatureBroadcastShowcase({ eyebrow, title, subtitle, typesLabel = 'Broadcast type', types, messagesLabel = 'Messages', messagesCountLabel = 'broadcasts', messages, statsLabel = 'What it drove', stats, caption }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = types.length

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused, n])

  const jumpTo = (i) => setActive(i)

  return (
    <section className="section fbs-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="fbs-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="fbs-types">
            <span className="fbs-col-label">{typesLabel}</span>
            {types.map((t, i) => (
              <button
                type="button"
                key={t.title}
                className={`fbs-type${i === active ? ' is-active' : ''}`}
                onClick={() => jumpTo(i)}
              >
                <span className="fbs-type-dot" style={{ '--fbs-i': i }} />
                <span className="fbs-type-copy">
                  <strong>{t.title}</strong>
                  <span>{t.desc}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="fbs-messages">
            <div className="fbs-messages-head">
              <strong>{messagesLabel}</strong>
              <span>{messages.length} {messagesCountLabel} · one list · today</span>
            </div>
            <div className="fbs-messages-list">
              {messages.map((m, i) => (
                <div
                  className={`fbs-message${i === active ? ' is-active' : ''}`}
                  key={m.sender + i}
                  onClick={() => jumpTo(i)}
                >
                  <span className={`fbs-avatar fbs-avatar--${i % 5}`}>{m.sender[0]}</span>
                  <div className="fbs-message-body">
                    <div className="fbs-message-head">
                      <strong>{m.sender}</strong>
                      <span>{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                  {i === active && <span className="fbs-message-live" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>

          <div className="fbs-stats">
            <span className="fbs-col-label">{statsLabel}</span>
            {stats.map((s, i) => (
              <div className={`fbs-stat${i === active ? ' is-active' : ''}`} key={s.label}>
                <span className="fbs-stat-bar" aria-hidden="true" />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {caption && <p className="fbs-caption">{caption}</p>}
      </div>
    </section>
  )
}

export default FeatureBroadcastShowcase
