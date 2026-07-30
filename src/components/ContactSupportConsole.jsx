import { useEffect, useState } from 'react'
import './ContactSupportConsole.css'

const STATUS_ROWS = [
  { value: '99.9%', label: 'Uptime SLA', desc: 'Carrier-grade infrastructure, monitored continuously.' },
  { value: '24/7', label: 'Worldwide availability', desc: 'Reach us any time, from anywhere — the team is always on.' },
  { value: '190+', label: 'Countries reached', desc: 'Direct carrier routes for reliable global delivery.' },
]

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ContactSupportConsole() {
  const [phase, setPhase] = useState(prefersReducedMotion() ? 2 : 0)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const t1 = setTimeout(() => setPhase(1), 900)
    const t2 = setTimeout(() => setPhase(2), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="section csc-section">
      <div className="container">
        <span className="section-kicker">Contact</span>
        <h2 className="section-title">Support you can plan around</h2>
        <p className="section-subtitle">Fast replies, always-on coverage, and infrastructure built to keep the conversation running.</p>

        <div className="csc-panel">
          <div className="csc-chrome">
            <span className="csc-dot csc-dot--r" />
            <span className="csc-dot csc-dot--y" />
            <span className="csc-dot csc-dot--g" />
            <span className="csc-chrome-title">support.smslocal.com/inbox</span>
            <span className="csc-chrome-live"><i /> Live</span>
          </div>

          <div className="csc-body">
            <div className="csc-thread">
              <div className="csc-msg csc-msg--in">
                <span className="csc-avatar">P</span>
                <div className="csc-bubble">
                  <p>Hi — do you deliver to Germany, and can someone help me finish my API setup today?</p>
                  <span className="csc-meta">Priya N. · WhatsApp · 2:14 PM</span>
                </div>
              </div>

              <div className={`csc-msg csc-msg--out${phase >= 1 ? ' is-in' : ''}`}>
                <div className="csc-bubble csc-bubble--out">
                  {phase === 1 ? (
                    <span className="csc-typing" aria-hidden="true"><i /><i /><i /></span>
                  ) : (
                    <p>Hey Priya — yes, we route to 190+ countries including Germany. I'll also loop in a setup specialist for the API today.</p>
                  )}
                  {phase >= 2 && <span className="csc-meta csc-meta--out">Sales team · 2:53 PM</span>}
                </div>
                <span className="csc-avatar csc-avatar--agent">S</span>
              </div>

              {phase >= 2 && (
                <div className="csc-reply-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12.5 10 17.5 19 7" /></svg>
                  Replied in 39 min · average is under 1hr
                </div>
              )}
            </div>

            <div className="csc-status">
              <span className="csc-status-head">System status</span>
              <div className="csc-status-spine">
                {STATUS_ROWS.map((row) => (
                  <div className="csc-status-row" key={row.label}>
                    <span className="csc-status-node" aria-hidden="true" />
                    <div className="csc-status-txt">
                      <span className="csc-status-value">{row.value}</span>
                      <span className="csc-status-label">{row.label}</span>
                      <span className="csc-status-desc">{row.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSupportConsole
