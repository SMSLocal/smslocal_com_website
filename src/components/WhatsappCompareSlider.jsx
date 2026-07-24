import { useEffect, useRef, useState } from 'react'
import './WhatsappCompareSlider.css'

// A different shape from the static three-column before/after strip used
// elsewhere: one draggable comparison frame. The "before" panel is clipped
// over the "after" panel by a slider handle the visitor drags themselves —
// it auto-sweeps once to hint at the interaction, then hands over control.

function WhatsappCompareSlider({
  eyebrow,
  heading,
  paragraphs,
  leftLabel,
  leftItems,
  leftChat,
  rightLabel,
  rightItems,
  rightChat,
  alt,
}) {
  const [pct, setPct] = useState(50)
  const [manual, setManual] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (manual) return undefined

    const duration = 2600
    const run = (t) => {
      if (startRef.current === null) startRef.current = t
      const elapsed = (t - startRef.current) % (duration * 2)
      const phase = elapsed < duration ? elapsed / duration : 2 - elapsed / duration
      setPct(28 + phase * 44)
      rafRef.current = requestAnimationFrame(run)
    }
    rafRef.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(rafRef.current)
  }, [manual])

  const takeOver = (value) => {
    setManual(true)
    setPct(value)
  }

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="wnc-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {heading && <h2>{heading}</h2>}
          {paragraphs && paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="wnc-frame">
          <div className="wnc-layer wnc-layer--after">
            <WnCPanel label={rightLabel} items={rightItems} chat={rightChat} tone="good" />
          </div>

          <div className="wnc-layer wnc-layer--before" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
            <WnCPanel label={leftLabel} items={leftItems} chat={leftChat} tone="bad" />
          </div>

          <div className="wnc-divider" style={{ left: `${pct}%` }} aria-hidden="true">
            <span className="wnc-grip">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </span>
          </div>

          <input
            type="range"
            className="wnc-range"
            min="4"
            max="96"
            value={pct}
            onChange={(e) => takeOver(Number(e.target.value))}
            onPointerDown={() => setManual(true)}
            aria-label="Drag to compare keyword auto-reply with a chatbot built to resolve"
          />

          {!manual && <span className="wnc-hint">Drag to compare ↔</span>}
        </div>
      </div>
    </section>
  )
}

function WnCPanel({ label, items, chat, tone }) {
  return (
    <div className={`wnc-panel wnc-panel--${tone}`}>
      <span className="wnc-panel-label">{label}</span>

      {chat && (
        <div className="wnc-chat">
          <div className="wnc-chat-row wnc-chat-row--in">
            <div className="wnc-chat-bubble wnc-chat-bubble--in">{chat.in}</div>
          </div>
          <div className="wnc-chat-row wnc-chat-row--out">
            <div className={`wnc-chat-bubble wnc-chat-bubble--out wnc-chat-bubble--${tone}`}>{chat.out}</div>
          </div>
        </div>
      )}

      <ul className="wnc-list">
        {items.map((item) => (
          <li key={item}>
            <span className={`wnc-mark wnc-mark--${tone}`}>{tone === 'good' ? '✓' : '✕'}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WhatsappCompareSlider
