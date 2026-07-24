import { useEffect, useRef, useState } from 'react'
import './ProblemFlipDeck.css'
import { IconCheck } from './icons.jsx'

/**
 * Brand-new "problem -> solution" section, built from scratch: a row of
 * 3D flip-cards driven by a single Old way / New way toggle switch. Autoplay
 * flips the whole deck on a timer; the toggle (or a single card click) takes
 * it over. Structurally distinct from the static before/arrow/after strip
 * used elsewhere on the site.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Per-card mini UI: a real-looking compact panel mockup (header, rows,
// status pills / mini chart) — a plain, disconnected "old" version on the
// front, a unified, modernised version of the same panel on the back.
const CHANNELS = [
  { label: 'SMS', color: 'var(--blue)' },
  { label: 'WhatsApp', color: 'var(--teal)' },
  { label: 'Web chat', color: 'var(--coral)' },
]

const OLD_MINI = [
  () => (
    <span className="pfd-panel">
      <span className="pfd-panel-head">Channels</span>
      {CHANNELS.map((c, i) => (
        <span className="pfd-panel-row" key={c.label}>
          <i className="pfd-row-dot" style={{ background: c.color, opacity: i === 0 ? 1 : 0.35 }} />
          <span className="pfd-row-label">{c.label}</span>
          <span className={i === 0 ? 'pfd-pill pfd-pill--on' : 'pfd-pill pfd-pill--off'}>
            {i === 0 ? 'Active' : 'Not built'}
          </span>
        </span>
      ))}
    </span>
  ),
  () => (
    <span className="pfd-panel pfd-panel--stack">
      {[3, 2, 1].map((n) => (
        <span className="pfd-panel-ghost" key={n} style={{ '--n': n }}>
          <span className="pfd-panel-ghost-head">
            <i className="pfd-row-dot" style={{ background: 'var(--border)' }} />
            Flow copy {n}
          </span>
          <span className="pfd-panel-ghost-line" />
          <span className="pfd-panel-ghost-line" style={{ width: '70%' }} />
        </span>
      ))}
    </span>
  ),
  () => (
    <span className="pfd-panel">
      <span className="pfd-panel-head">Analytics</span>
      {CHANNELS.map((c) => (
        <span className="pfd-panel-row" key={c.label}>
          <i className="pfd-row-dot" style={{ background: c.color, opacity: 0.35 }} />
          <span className="pfd-row-label">{c.label}</span>
          <span className="pfd-row-metric pfd-row-metric--off">— —</span>
        </span>
      ))}
    </span>
  ),
]

const NEW_MINI = [
  () => (
    <span className="pfd-panel pfd-panel--accent">
      <span className="pfd-panel-head">
        Channels
        <span className="pfd-pill pfd-pill--live">1 flow</span>
      </span>
      {CHANNELS.map((c) => (
        <span className="pfd-panel-row" key={c.label}>
          <i className="pfd-row-dot" style={{ background: c.color }} />
          <span className="pfd-row-label">{c.label}</span>
          <span className="pfd-pill pfd-pill--on">Synced</span>
        </span>
      ))}
    </span>
  ),
  () => (
    <span className="pfd-panel pfd-panel--accent pfd-flowmap">
      <span className="pfd-panel-head">
        Shared flow
        <span className="pfd-pill pfd-pill--live">Auto-synced</span>
      </span>
      <span className="pfd-flowmap-row">
        <span className="pfd-flow-node">Start</span>
        <span className="pfd-flow-link" />
        <span className="pfd-flow-node pfd-flow-node--accent">Branch</span>
        <span className="pfd-flow-link" />
        <span className="pfd-flow-node">Reply</span>
      </span>
      <span className="pfd-flowmap-caption">Used by every channel above</span>
    </span>
  ),
  () => (
    <span className="pfd-panel pfd-panel--accent">
      <span className="pfd-panel-head">
        Analytics
        <span className="pfd-pill pfd-pill--live">All channels</span>
      </span>
      <span className="pfd-chart">
        {CHANNELS.map((c, i) => (
          <span className="pfd-chart-col" key={c.label}>
            <span className="pfd-chart-bar" style={{ height: `${[46, 78, 34][i]}%`, background: c.color }} />
            <span className="pfd-chart-label">{c.label.split(' ')[0]}</span>
          </span>
        ))}
      </span>
    </span>
  ),
]

function ProblemFlipDeck({ eyebrow, heading, paragraph, pairs, alt }) {
  const [flipped, setFlipped] = useState(REDUCED)
  const [paused, setPaused] = useState(REDUCED)
  const resumeTimer = useRef(null)

  useEffect(() => {
    if (paused) return undefined
    const interval = setInterval(() => setFlipped((f) => !f), 3200)
    return () => clearInterval(interval)
  }, [paused])

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const takeOver = (next) => {
    clearTimeout(resumeTimer.current)
    setPaused(true)
    setFlipped(next)
    resumeTimer.current = setTimeout(() => setPaused(false), 5000)
  }

  return (
    <section className={alt ? 'section section-alt pfd-section' : 'section pfd-section'}>
      <div className="container pfd-inner">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraph && <p className="section-subtitle">{paragraph}</p>}

        <div className="pfd-switch-wrap">
          <button
            type="button"
            className={flipped ? 'pfd-switch is-on' : 'pfd-switch'}
            role="switch"
            aria-checked={flipped}
            onClick={() => takeOver(!flipped)}
          >
            <span className="pfd-switch-label pfd-switch-label--off">Old way</span>
            <span className="pfd-switch-track"><span className="pfd-switch-knob" /></span>
            <span className="pfd-switch-label pfd-switch-label--on">New way</span>
          </button>
        </div>

        <div className="pfd-row">
          {pairs.map((pair, i) => {
            const OldMini = OLD_MINI[i % OLD_MINI.length]
            const NewMini = NEW_MINI[i % NEW_MINI.length]
            return (
              <button
                type="button"
                key={pair.before}
                className={flipped ? 'pfd-card is-flipped' : 'pfd-card'}
                style={{ '--pfd-delay': `${i * 0.12}s` }}
                onClick={() => takeOver(!flipped)}
              >
                <span className="pfd-card-inner">
                  <span className="pfd-face pfd-face--front">
                    <OldMini />
                    <span className="pfd-face-text">
                      <span className="pfd-face-ic pfd-face-ic--off">✕</span>
                      {pair.before}
                    </span>
                  </span>
                  <span className="pfd-face pfd-face--back">
                    <NewMini />
                    <span className="pfd-face-text">
                      <span className="pfd-face-ic pfd-face-ic--on"><IconCheck /></span>
                      {pair.after}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProblemFlipDeck
