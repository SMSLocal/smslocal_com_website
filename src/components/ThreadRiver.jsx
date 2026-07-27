import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ThreadRiver.css'

/* One thread that never restarts. The channel changes down the left spine;
   the conversation above it just keeps going. */

const ICONS = {
  whatsapp: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.9-.9L3 20.5l1.6-4.9A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />,
  sms: <path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  voice: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" /></>,
}

const LEGS = [
  { ch: 'whatsapp', name: 'WhatsApp', when: 'Mon', ask: 'Change the address on #4821.', reply: 'Done — 14 Kingsway, Flat 3B.', knows: 'Amara · #4821' },
  { ch: 'sms', name: 'SMS', when: 'Mon', ask: 'Make it Saturday instead?', reply: 'Moved. Same address as this morning.', kept: 'no order number asked', knows: 'Saturday delivery' },
  { ch: 'email', name: 'Email', when: 'Tue', ask: 'Send a VAT invoice?', reply: 'Attached — #4821, Kestrel Design Ltd.', kept: 'no “which order?”', knows: 'Kestrel Design Ltd' },
  { ch: 'voice', name: 'Voice', when: 'Sat', ask: 'Has the driver got the address?', reply: 'Yes — arriving 9 to 1.', kept: 'no re-verifying who she is', knows: 'Prefers a call' },
]

const STEP_MS = 3200

function ThreadRiver({ eyebrow, title, subtitle, alt }) {
  const feedRef = useRef(null)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const t = setTimeout(() => setStep((s) => (s + 1) % LEGS.length), STEP_MS)
    return () => clearTimeout(t)
  }, [step, paused])

  useLayoutEffect(() => {
    const el = feedRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: step === 0 ? 'auto' : 'smooth' })
  }, [step])

  const legs = LEGS.slice(0, step + 1)
  const cur = LEGS[step]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="trv-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className={`trv-card ch-${cur.ch}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="trv-top">
            <span className="trv-avatar">AO</span>
            <b>Amara Osei</b>
            <span className="trv-live">one thread</span>
          </div>

          <div className="trv-body">
            {/* channel spine */}
            <div className="trv-spine">
              <span className="trv-spine-line" />
              <span className="trv-spine-fill" style={{ transform: `scaleY(${step / (LEGS.length - 1)})` }} />
              {LEGS.map((l, n) => (
                <button
                  type="button"
                  key={l.ch}
                  className={`trv-dot ch-${l.ch} ${n === step ? 'is-now' : ''} ${n < step ? 'is-past' : ''}`}
                  onClick={() => setStep(n)}
                  aria-label={l.name}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[l.ch]}</svg>
                </button>
              ))}
            </div>

            {/* the thread */}
            <div className="trv-feed" ref={feedRef}>
              {legs.map((l, n) => (
                <div className={`trv-leg ch-${l.ch} ${n === step ? 'is-now' : ''}`} key={l.ch}>
                  <span className="trv-switch">
                    {n === 0 ? 'started on' : 'switched to'} <b>{l.name}</b> · {l.when}
                  </span>
                  <p className="trv-ask">{l.ask}</p>
                  <p className="trv-reply">{l.reply}</p>
                  {l.kept && <span className="trv-kept">{l.kept}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="trv-foot">
            <span className="trv-knows">
              {legs.map((l) => <em key={l.ch}>{l.knows}</em>)}
            </span>
            <span className="trv-zero"><b>0</b> repeats</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThreadRiver
