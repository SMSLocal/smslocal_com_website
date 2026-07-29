import { useEffect, useRef, useState } from 'react'
import './FeatureStackPicker.css'
import { IconDollar, IconShield, IconReceipt, IconUsers } from './icons.jsx'

const LAYERS = [
  {
    icon: <IconDollar />,
    title: 'Account self-service',
    tag: 'Self-service',
    desc: 'Customers check balances, transactions and card status without waiting for a human.',
    chips: ['Balance lookups', 'Card status'],
  },
  {
    icon: <IconShield />,
    title: 'Secure by design',
    tag: 'Access control',
    desc: 'Every action runs inside scoped, role-based permissions set by your team, not the agent.',
    chips: ['Role-based access', 'Scoped permissions'],
  },
  {
    icon: <IconReceipt />,
    title: 'Full audit trail',
    tag: 'Compliance',
    desc: 'Every automated action is logged and reviewable, built for regulated environments.',
    chips: ['Action logging', 'Reviewable trail'],
  },
  {
    icon: <IconUsers />,
    title: 'Clean escalation',
    tag: 'Escalation',
    desc: 'Sensitive or complex cases hand off to a human with the full context already gathered.',
    chips: ['Full context', 'Human handoff'],
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureStackPicker({ eyebrow, title }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const n = LAYERS.length

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 3600)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const current = LAYERS[active]

  return (
    <section className="section fsp-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div
          className="fsp-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="fsp-list">
            {LAYERS.map((layer, i) => (
              <button
                type="button"
                key={layer.title}
                className={i === active ? 'fsp-row is-active' : 'fsp-row'}
                onClick={() => setActive(i)}
              >
                <span className="fsp-row-num">{i + 1}</span>
                <span className="fsp-row-ic">{layer.icon}</span>
                <span className="fsp-row-t">
                  <strong>{layer.title}</strong>
                  <span>{layer.tag}</span>
                </span>
                {i === active && <span className="fsp-row-arrow"><ArrowIcon /></span>}
              </button>
            ))}
          </div>

          <div className="fsp-detail" key={active}>
            <span className="fsp-detail-eyebrow">Layer {active + 1} of {n}</span>
            <div className="fsp-detail-head">
              <span className="fsp-detail-ic">{current.icon}</span>
              <h3>{current.title}</h3>
            </div>
            <p>{current.desc}</p>

            <div className="fsp-chips">
              {current.chips.map((chip) => (
                <span className="fsp-chip" key={chip}><CheckIcon /> {chip}</span>
              ))}
            </div>

            <div className="fsp-track-head">
              <span>Feature stack</span>
              <span className="fsp-auto"><span className="fsp-auto-dot" />Auto · {active + 1}/{n}</span>
            </div>
            <div className="fsp-track">
              {LAYERS.map((layer, i) => (
                <span className={`fsp-seg${i <= active ? ' is-done' : ''}${i === active ? ' is-active' : ''}`} key={layer.title} />
              ))}
            </div>
            <div className="fsp-track-labels">
              {LAYERS.map((layer, i) => (
                <span className={i === active ? 'is-active' : ''} key={layer.title}>{i + 1} · {layer.tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureStackPicker
