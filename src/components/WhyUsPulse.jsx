import { useEffect, useRef, useState } from 'react'
import './WhyUsPulse.css'
import { IconChat, IconGlobe, IconMegaphone, IconUsers } from './icons.jsx'

/**
 * "Why teams build with our platform" on /chatbot, built from scratch: four
 * pulsing icon nodes in a row — click (or wait) and one lifts, opening a
 * floating panel below with its own small animated proof, instead of a
 * static 2x2 grid of icon+text.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTimers() {
  const timers = useRef([])
  const set = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); return t }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return { set, clearAll: () => { timers.current.forEach(clearTimeout); timers.current = [] } }
}

/* ---- 0. Launch in a day: a progress ring counting up to 92% ---- */
function LaunchProof() {
  const [pct, setPct] = useState(REDUCED ? 92 : 0)
  const { set, clearAll } = useTimers()
  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setPct(0)
    let p = 0
    const tick = () => {
      p += 4
      setPct(Math.min(p, 92))
      if (p < 92) set(tick, 24)
    }
    set(tick, 200)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const r = 32
  const c = 2 * Math.PI * r
  return (
    <div className="wup-proof wup-proof--ring">
      <div className="wup-ring-wrap">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="7" />
          <circle
            cx="40" cy="40" r={r} fill="none" stroke="url(#wup-grad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} transform="rotate(-90 40 40)"
          />
          <defs>
            <linearGradient id="wup-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--blue)" />
              <stop offset="100%" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="wup-ring-pct">{pct}%</span>
      </div>
      <div className="wup-ring-stats">
        <span className="wup-ring-label">of teams go live in under 24 hours</span>
        <div className="wup-mini-stats">
          <span><strong>~4h</strong> support bots</span>
          <span><strong>~9h</strong> sales &amp; lead-gen bots</span>
        </div>
      </div>
    </div>
  )
}

/* ---- 1. Channel-agnostic: four channels converging into one flow ---- */
function ChannelProof() {
  const channels = [
    { icon: <IconChat />, label: 'WhatsApp' },
    { icon: <IconGlobe />, label: 'Website' },
    { icon: <IconMegaphone />, label: 'SMS' },
    { icon: <IconUsers />, label: 'Social' },
  ]
  return (
    <div className="wup-proof wup-proof--channels">
      <div className="wup-channel-list">
        {channels.map((c, i) => (
          <span className="wup-chip" key={c.label} style={{ '--d': `${i * 0.12}s` }}>
            {c.icon} {c.label}
          </span>
        ))}
      </div>
      <span className="wup-channel-arrow">→</span>
      <span className="wup-chip wup-chip--one">One flow</span>
      <p className="wup-caption">
        Build the conversation once in the visual editor — publish it to every channel your customers already use, with no extra setup per channel.
      </p>
    </div>
  )
}

/* ---- 2. Human handoff: bot fades to human with a handoff arrow ---- */
function HandoffProof() {
  const [handed, setHanded] = useState(REDUCED)
  const { set, clearAll } = useTimers()
  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setHanded(false)
    set(() => setHanded(true), 700)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="wup-proof wup-proof--handoff">
      <div className="wup-handoff-row">
        <div className="wup-handoff-actor">
          <span className={`wup-avatar wup-avatar--bot${handed ? ' is-out' : ''}`}>🤖</span>
          <span className="wup-handoff-actor-label">Bot</span>
        </div>
        <span className="wup-handoff-arrow">↝</span>
        <div className="wup-handoff-actor">
          <span className={`wup-avatar wup-avatar--human${handed ? ' is-in' : ''}`}>🧑‍💼</span>
          <span className="wup-handoff-actor-label">Agent</span>
        </div>
      </div>
      <div className={`wup-handoff-card${handed ? ' is-shown' : ''}`}>
        <span className="wup-handoff-tag">Order #482 · 6 messages</span>
        <span className="wup-handoff-tag">Refund requested</span>
      </div>
      <p className="wup-caption">
        The full conversation, order details and intent transfer with the handoff — your customer never has to repeat themselves.
      </p>
    </div>
  )
}

/* ---- 3. Flow analytics: bars growing to show drop-off vs completion ---- */
function AnalyticsProof() {
  const steps = [
    { label: 'Start', h: 100 },
    { label: 'Q1', h: 88 },
    { label: 'Q2', h: 79 },
    { label: 'Payment', h: 54 },
    { label: 'Confirm', h: 71 },
  ]
  return (
    <div className="wup-proof wup-proof--bars">
      <div className="wup-bars-headline">
        <strong>71%</strong> completion rate <span className="wup-bars-sub">· biggest drop-off at Payment</span>
      </div>
      <div className="wup-bar-chart">
        {steps.map((s, i) => (
          <div className="wup-bar-col" key={s.label}>
            <span className="wup-bar" style={{ '--h': `${s.h}%`, '--d': `${i * 0.08}s` }} />
            <span className="wup-bar-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="wup-caption">
        See exactly which step loses people, per flow — then fix that one step instead of guessing.
      </p>
    </div>
  )
}

const PROOFS = [LaunchProof, ChannelProof, HandoffProof, AnalyticsProof]

function WhyUsPulse({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const n = items.length

  useEffect(() => {
    if (paused || n < 2) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 4400)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const current = items[active] || {}
  const Proof = PROOFS[active % PROOFS.length]

  return (
    <section className="section wup-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="wup"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="wup-row">
            {items.slice(0, 4).map((it, i) => (
              <button
                type="button"
                key={it.title}
                className={i === active ? 'wup-node is-active' : 'wup-node'}
                onClick={() => setActive(i)}
              >
                <span className="wup-node-ic">
                  <span className="wup-node-pulse" aria-hidden="true" />
                  {it.icon}
                </span>
                <span className="wup-node-title">{it.title}</span>
              </button>
            ))}
          </div>

          <div className="wup-panel" key={active}>
            <span className="wup-pointer" style={{ '--x': `${(active + 0.5) * (100 / n)}%` }} aria-hidden="true" />
            <p className="wup-desc">{current.desc}</p>
            <Proof />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsPulse
