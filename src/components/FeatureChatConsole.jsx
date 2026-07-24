import { useEffect, useRef, useState } from 'react'
import './FeatureChatConsole.css'

// A different shape from the static Q&A bubble grid this replaces: one
// live chat console. Suggested questions sit as chips below a transcript;
// clicking one sends it up and the bot's answer types in character by
// character, accumulating a real conversation instead of four fixed cards.

const TYPE_MS = 15

function FeatureChatConsole({ eyebrow, title, subtitle, description, items, alt }) {
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(null)
  const [asked, setAsked] = useState(() => new Set())
  const scrollRef = useRef(null)
  const timers = useRef([])

  const clearAllTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const startTyping = (item, idx) => {
    const full = item.desc
    let i = 0
    setTyping({ title: item.title, icon: item.icon, text: '' })
    const step = () => {
      i += 1
      setTyping((cur) => (cur ? { ...cur, text: full.slice(0, i) } : cur))
      if (i < full.length) {
        timers.current.push(window.setTimeout(step, TYPE_MS))
      } else {
        timers.current.push(
          window.setTimeout(() => {
            setLog((l) => [...l, { type: 'a', title: item.title, icon: item.icon, text: full, id: `a-${idx}-${l.length}` }])
            setTyping(null)
          }, 300)
        )
      }
    }
    step()
  }

  const ask = (item, idx) => {
    clearAllTimers()
    setTyping(null)
    setAsked((s) => new Set(s).add(idx))
    setLog((l) => [...l, { type: 'q', text: item.question, id: `q-${idx}-${l.length}` }])
    timers.current.push(window.setTimeout(() => startTyping(item, idx), 500))
  }

  useEffect(() => {
    const t = window.setTimeout(() => ask(items[0], 0), 900)
    timers.current.push(t)
    return () => {
      window.clearTimeout(t)
      timers.current = timers.current.filter((id) => id !== t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [log, typing])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="fcc-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="fcc-layout">
          <div className="fcc-tablet">
            <div className="fcc-tablet-frame">
              <span className="fcc-tablet-cam" aria-hidden="true" />

              <div className="fcc-console">
                <div className="fcc-browser-bar">
                  <span className="fcc-browser-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="fcc-browser-url">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    smslocal.com/chat
                  </span>
                </div>

                <div className="fcc-log" ref={scrollRef}>
                  {log.map((entry) =>
                    entry.type === 'q' ? (
                      <div className="fcc-row fcc-row--q" key={entry.id}>
                        <span className="fcc-bubble fcc-bubble--q">{entry.text}</span>
                      </div>
                    ) : (
                      <div className="fcc-row fcc-row--a" key={entry.id}>
                        <span className="fcc-av">{entry.icon}</span>
                        <span className="fcc-bubble fcc-bubble--a">
                          <strong>{entry.title}</strong>
                          <span>{entry.text}</span>
                        </span>
                      </div>
                    )
                  )}

                  {typing && (
                    <div className="fcc-row fcc-row--a">
                      <span className="fcc-av">{typing.icon}</span>
                      <span className="fcc-bubble fcc-bubble--a">
                        <strong>{typing.title}</strong>
                        <span>{typing.text}<span className="fcc-caret" /></span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="fcc-chips">
                  {items.map((item, i) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`fcc-chip${asked.has(i) ? ' is-asked' : ''}`}
                      onClick={() => ask(item, i)}
                    >
                      <span className="fcc-chip-icon">{item.icon}</span>
                      {item.question}
                      {asked.has(i) && <span className="fcc-chip-check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="fcc-copy">
            {description && <p>{description}</p>}
            <ul className="fcc-copy-list">
              {items.map((item) => (
                <li key={item.title}>
                  <span className="fcc-copy-list-icon">{item.icon}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureChatConsole
