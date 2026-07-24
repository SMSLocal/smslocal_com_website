import { useEffect, useRef, useState } from 'react'
import './WhatsappLiveDemo.css'
import { IconCart, IconChat, IconBolt } from './icons.jsx'

// Real WhatsApp glyph (Simple Icons), inlined so it can take currentColor.
function WhatsappGlyph({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" role="img" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// A different hero visual from the static chat-bubble float used elsewhere:
// three switchable live scenarios (order / support / lead), the bot's reply
// types out character-by-character instead of just fading in, and small
// floating scenario bubbles drift behind the card. Auto-advances through
// scenarios; clicking a tab takes over and pauses autoplay.

const SCENARIOS = [
  {
    key: 'order',
    label: 'Order',
    icon: <IconCart />,
    stat: { value: '₹42,300', label: 'in orders this week' },
    script: [
      { type: 'in', text: "Hi! I'd like to buy wireless headphones." },
      { type: 'out', text: 'Found it — Acme Pro Headphones, ₹2,300, in stock. Add it to your cart?' },
      { type: 'in', text: 'Yes, add it please.' },
      { type: 'out', text: 'Added! Your cart total is ₹2,300 — checkout whenever ready.' },
    ],
  },
  {
    key: 'support',
    label: 'Support',
    icon: <IconChat />,
    stat: { value: '11s', label: 'average first reply' },
    script: [
      { type: 'in', text: 'My order #4821 still hasn\'t arrived.' },
      { type: 'out', text: 'Checking that now — order #4821 is out for delivery, expected today by 7pm.' },
      { type: 'in', text: 'Okay, thank you!' },
      { type: 'out', text: 'Anytime — I\'ll ping you the moment it\'s delivered.' },
    ],
  },
  {
    key: 'lead',
    label: 'Lead gen',
    icon: <IconBolt />,
    stat: { value: '412', label: 'leads captured this week' },
    script: [
      { type: 'in', text: 'Do you offer a plan for small teams?' },
      { type: 'out', text: 'We do! Can I grab your name and email to send the small-team pricing?' },
      { type: 'in', text: 'Sure — Aria, aria@studio.co' },
      { type: 'out', text: 'Got it, Aria — sending that over now and saving you as a new lead.' },
    ],
  },
]

const TYPE_MS = 22

function WhatsappLiveDemo() {
  const [scenario, setScenario] = useState(0)
  const [step, setStep] = useState(0)
  const [typedLen, setTypedLen] = useState(0)
  const [paused, setPaused] = useState(false)
  const timers = useRef([])

  const active = SCENARIOS[scenario]
  const script = active.script

  // Reset the thread whenever the scenario changes.
  useEffect(() => {
    setStep(0)
    setTypedLen(0)
  }, [scenario])

  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []

    if (step >= script.length) {
      const t = window.setTimeout(() => {
        if (!paused) setScenario((s) => (s + 1) % SCENARIOS.length)
      }, 2200)
      timers.current.push(t)
      return () => window.clearTimeout(t)
    }

    const msg = script[step]
    if (msg.type === 'in') {
      const t = window.setTimeout(() => setStep((s) => s + 1), 850)
      timers.current.push(t)
      return () => window.clearTimeout(t)
    }

    // Bot message: type it out character by character.
    if (typedLen < msg.text.length) {
      const t = window.setTimeout(() => setTypedLen((l) => l + 1), TYPE_MS)
      timers.current.push(t)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => setStep((s) => s + 1), 700)
    timers.current.push(t)
    return () => window.clearTimeout(t)
  }, [step, typedLen, script, paused])

  useEffect(() => {
    if (paused) timers.current.forEach((t) => window.clearTimeout(t))
  }, [paused])

  const selectScenario = (i) => {
    setPaused(true)
    setScenario(i)
  }

  return (
    <div
      className="wld"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="wld-float wld-float-1" aria-hidden="true"><IconCart /></span>
      <span className="wld-float wld-float-2" aria-hidden="true"><IconChat /></span>
      <span className="wld-float wld-float-3" aria-hidden="true"><IconBolt /></span>

      <span className="wld-brand">
        <span className="wld-brand-icon"><WhatsappGlyph size={15} /></span>
        WhatsApp Business API
      </span>

      <div className="wld-card" role="img" aria-label={`A live WhatsApp ${active.label.toLowerCase()} conversation`}>
        <div className="wld-tabs" role="tablist">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === scenario}
              className={`wld-tab${i === scenario ? ' is-active' : ''}`}
              onClick={() => selectScenario(i)}
            >
              <span className="wld-tab-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="wld-thread">
          {script.slice(0, step).map((m, i) => (
            <div className={`wld-row wld-row--${m.type}`} key={i}>
              <div className={`wld-bubble wld-bubble--${m.type}`}>{m.text}</div>
              {m.type === 'out' && <span className="wld-av"><WhatsappGlyph size={13} /></span>}
            </div>
          ))}

          {step < script.length && script[step].type === 'out' && (
            <div className="wld-row wld-row--out">
              <div className="wld-bubble wld-bubble--out">
                {script[step].text.slice(0, typedLen)}
                <span className="wld-caret" />
              </div>
              <span className="wld-av"><WhatsappGlyph size={13} /></span>
            </div>
          )}
        </div>

        <div className="wld-stat" key={active.key}>
          <strong>{active.stat.value}</strong>
          <span>{active.stat.label}</span>
        </div>
      </div>
    </div>
  )
}

export default WhatsappLiveDemo
