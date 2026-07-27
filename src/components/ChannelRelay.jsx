import { useEffect, useState } from 'react'
import './ChannelRelay.css'

/* One customer, one thread — it just keeps moving channel.
   Each leg adds to what the agent knows and removes what it has to ask again. */
const LEGS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.9-.9L3 20.5l1.6-4.9A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" /></svg>
    ),
    gap: 'Monday, 09:14',
    customer: 'Hi — I need to change the delivery address on order #4821.',
    agent: 'Done, Amara. #4821 now ships to 14 Kingsway, Flat 3B. Nothing else changes.',
    gained: ['Amara Osei', 'Order #4821', 'New address saved'],
    saved: null,
  },
  {
    id: 'sms',
    name: 'SMS & RCS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" /></svg>
    ),
    gap: '2 hours later',
    customer: 'Actually — can it come Saturday instead? (replying to the shipping text)',
    agent: 'Moved to Saturday 9am–1pm. Same address you gave me this morning.',
    gained: ['Prefers weekend delivery'],
    saved: 'Never asked for the order number again',
  },
  {
    id: 'email',
    name: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    ),
    gap: 'Next morning',
    customer: 'Could you send a VAT invoice for this one? Our accounts team needs it.',
    agent: 'Attached — invoice for #4821, addressed to Kestrel Design Ltd, VAT included.',
    gained: ['Kestrel Design Ltd', 'Billing contact'],
    saved: 'Never asked which order she meant',
  },
  {
    id: 'voice',
    name: 'Voice',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" /></svg>
    ),
    gap: 'Saturday, 08:52',
    customer: '(calls in) Hi, it\'s Amara — just checking the driver has the new address.',
    agent: 'Morning Amara — yes, 14 Kingsway, Flat 3B, arriving between 9 and 1. Want a text when he\'s 10 minutes out?',
    gained: ['Prefers a heads-up text'],
    saved: 'Never re-verified who she was',
  },
]

const LEG_MS = 5200

function ChannelRelay({ eyebrow, title, subtitle, alt }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const t = setTimeout(() => setIdx((i) => (i + 1) % LEGS.length), LEG_MS)
    return () => clearTimeout(t)
  }, [idx, paused])

  const leg = LEGS[idx]
  const memory = LEGS.slice(0, idx + 1).flatMap((l) => l.gained)
  const stationPct = ((idx + 0.5) / LEGS.length) * 100
  const firstPct = (0.5 / LEGS.length) * 100
  const spanPct = ((LEGS.length - 1) / LEGS.length) * 100

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="crl-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className="crl-shell"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ---- relay track ---- */}
          <div className="crl-track">
            <span className="crl-rail" style={{ left: `${firstPct}%`, width: `${spanPct}%` }} />
            <span
              className="crl-rail-fill"
              style={{ left: `${firstPct}%`, width: `${(idx / (LEGS.length - 1)) * spanPct}%` }}
            />
            <span className="crl-token" style={{ left: `${stationPct}%` }}>
              <span className="crl-token-core" />
            </span>

            {LEGS.map((l, i) => (
              <button
                type="button"
                key={l.id}
                className={`crl-station ${i === idx ? 'is-active' : ''} ${i < idx ? 'is-done' : ''}`}
                onClick={() => setIdx(i)}
              >
                <span className="crl-station-dot">{l.icon}</span>
                <span className="crl-station-name">{l.name}</span>
              </button>
            ))}
          </div>

          {/* ---- the leg ---- */}
          <div className="crl-body">
            <div className="crl-thread" key={leg.id}>
              <div className="crl-leg-head">
                <span className="crl-badge">{leg.name}</span>
                <span className="crl-gap">{leg.gap}</span>
                <span className="crl-same">same thread · same number</span>
              </div>

              <div className="crl-msg crl-msg--in">
                <span className="crl-avatar">AO</span>
                <p>{leg.customer}</p>
              </div>

              <div className="crl-msg crl-msg--out">
                <p>{leg.agent}</p>
              </div>

              {leg.saved && (
                <span className="crl-saved">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  {leg.saved}
                </span>
              )}
            </div>

            {/* ---- carried context ---- */}
            <aside className="crl-memory">
              <div className="crl-memory-head">
                <span>What it already knows</span>
                <b>{memory.length}</b>
              </div>

              <div className="crl-chips">
                {memory.map((m, i) => (
                  <span
                    className={`crl-chip ${i >= memory.length - leg.gained.length ? 'is-new' : ''}`}
                    key={m}
                    style={{ animationDelay: `${(i % 6) * 60}ms` }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="crl-memory-foot">
                <span className="crl-stat"><b>1</b>thread</span>
                <span className="crl-stat"><b>1</b>wallet</span>
                <span className="crl-stat"><b>0</b>repeat questions</span>
              </div>
            </aside>
          </div>

          {/* ---- footer ---- */}
          <div className="crl-foot">
            <span className="crl-foot-note">
              She switched channel {LEGS.length - 1} times. The agent never started over.
            </span>
            <span className="crl-hint">{paused ? 'paused — click a channel' : 'playing'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChannelRelay
