import { useEffect, useRef, useState } from 'react'
import './CopilotDraftDemo.css'

/**
 * Bespoke flagship section for /products/agent-copilot.
 * Story: a real customer message lands, the copilot reads the thread, pulls
 * from named knowledge sources (chips light up in sequence), then TYPES the
 * draft reply character-by-character into the reply box. The agent stays in
 * control — the Send button only arms once the draft finishes.
 * Interactive: click any question on the left to re-run that scenario.
 * Floats on the page background — no outer card frame.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SCENARIOS = [
  {
    id: 'refund',
    who: 'Emma Clarke',
    channel: 'WhatsApp',
    ask: 'I returned my order 9 days ago and still no refund. This is ridiculous.',
    mood: 'urgent',
    sources: ['Refund policy v4', 'Order #SL-48219', 'Past resolution #2871'],
    draft:
      'Hi Emma — I can see your return was received on the 14th. Refunds land 7–10 working days after that, so yours is due by Thursday. I\'ve flagged it to move today and you\'ll get a confirmation the moment it\'s issued.',
  },
  {
    id: 'billing',
    who: 'Daniel Osborne',
    channel: 'Email',
    ask: 'Why was I charged twice this month? I only have one subscription.',
    mood: 'confused',
    sources: ['Billing FAQ', 'Invoice INV-3390', 'Plan: Growth (annual)'],
    draft:
      'Hi Daniel — good catch. That second charge is a pro-rata line from your plan upgrade on the 3rd, not a duplicate. It covers the gap to your renewal date. I\'ve attached the itemised invoice so you can see the split.',
  },
  {
    id: 'setup',
    who: 'Claire Dubois',
    channel: 'Web chat',
    ask: 'Can I connect two WhatsApp numbers to one inbox?',
    mood: 'neutral',
    sources: ['Setup guide: numbers', 'Plan limits', 'Docs / channels'],
    draft:
      'Hi Claire — yes. You can connect as many WhatsApp numbers as your plan allows, and they all route into the same shared inbox with separate labels. Here\'s the two-minute setup walkthrough for adding the second one.',
  },
]

const TYPE_MS = 18
const SOURCE_STEP_MS = 420
const HOLD_MS = 2600

function CopilotDraftDemo({ eyebrow = 'See it work', title, subtitle }) {
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')
  const [litSources, setLitSources] = useState(0)
  const [phase, setPhase] = useState('reading') // reading -> drafting -> ready
  const [paused, setPaused] = useState(false)
  const timers = useRef([])

  const scenario = SCENARIOS[active]

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const later = (fn, ms) => {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
    return t
  }

  useEffect(() => () => clearTimers(), [])

  // Drive one full run: read -> light sources -> type draft -> ready -> next
  useEffect(() => {
    clearTimers()
    setTyped('')
    setLitSources(0)
    setPhase('reading')

    if (REDUCED) {
      setLitSources(scenario.sources.length)
      setTyped(scenario.draft)
      setPhase('ready')
      return undefined
    }

    // 1. light each knowledge source in turn
    scenario.sources.forEach((_, i) => {
      later(() => setLitSources(i + 1), 500 + i * SOURCE_STEP_MS)
    })

    // 2. type the draft out
    const typeStart = 500 + scenario.sources.length * SOURCE_STEP_MS + 220
    later(() => setPhase('drafting'), typeStart)
    for (let i = 1; i <= scenario.draft.length; i += 1) {
      later(() => setTyped(scenario.draft.slice(0, i)), typeStart + i * TYPE_MS)
    }

    // 3. arm the send button, then advance
    const doneAt = typeStart + scenario.draft.length * TYPE_MS
    later(() => setPhase('ready'), doneAt + 120)
    if (!paused) {
      later(() => setActive((a) => (a + 1) % SCENARIOS.length), doneAt + HOLD_MS)
    }
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  const pick = (i) => {
    if (i === active) return
    setPaused(true)
    setActive(i)
  }

  return (
    <section className="cdd-section">
      <div className="container cdd-inner">
        <div className="cdd-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div
          className="cdd-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT: incoming questions — clickable */}
          <div className="cdd-queue">
            <span className="cdd-queue-label">Incoming</span>
            {SCENARIOS.map((s, i) => (
              <button
                type="button"
                key={s.id}
                className={`cdd-q${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                aria-pressed={i === active}
              >
                <span className="cdd-q-top">
                  <span className={`cdd-avatar cdd-avatar--${i}`}>{s.who.charAt(0)}</span>
                  <span className="cdd-q-id">
                    <strong>{s.who}</strong>
                    <span>{s.channel}</span>
                  </span>
                  <span className={`cdd-mood cdd-mood--${s.mood}`}>{s.mood}</span>
                </span>
                <span className="cdd-q-text">{s.ask}</span>
                {i === active && <span className="cdd-q-bar" aria-hidden="true" />}
              </button>
            ))}
          </div>

          {/* RIGHT: the reply box the copilot writes into */}
          <div className="cdd-composer" key={scenario.id}>
            <div className="cdd-composer-bar">
              <span className="cdd-composer-title">
                Replying to <strong>{scenario.who}</strong>
              </span>
              <span className={`cdd-status cdd-status--${phase}`}>
                <span className="cdd-status-dot" aria-hidden="true" />
                {phase === 'reading' && 'Copilot reading thread…'}
                {phase === 'drafting' && 'Drafting reply…'}
                {phase === 'ready' && 'Draft ready — review & send'}
              </span>
            </div>

            <div className="cdd-sources">
              <span className="cdd-sources-label">Grounded in</span>
              {scenario.sources.map((src, i) => (
                <span
                  className={`cdd-chip${i < litSources ? ' is-lit' : ''}`}
                  key={src}
                  style={{ '--i': i }}
                >
                  <span className="cdd-chip-tick" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                  </span>
                  {src}
                </span>
              ))}
            </div>

            <div className="cdd-box">
              <p className="cdd-draft">
                {typed}
                {phase !== 'ready' && <span className="cdd-caret" aria-hidden="true" />}
              </p>
              {phase === 'ready' && (
                <span className="cdd-badge">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                  AI draft
                </span>
              )}
            </div>

            <div className="cdd-actions">
              <span className="cdd-hint">The agent always reviews before it sends</span>
              <span className="cdd-btns">
                <span className="cdd-btn cdd-btn--ghost">Edit</span>
                <span className={`cdd-btn cdd-btn--send${phase === 'ready' ? ' is-armed' : ''}`}>
                  Send
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CopilotDraftDemo
