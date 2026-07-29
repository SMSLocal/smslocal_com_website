import { useEffect, useState } from 'react'
import './StepsSdrSpine.css'

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function KebabIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="5" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="19" r="1.6" fill="currentColor" />
    </svg>
  )
}

function StepOnePreview() {
  return (
    <div className="sss-preview sss-preview--form">
      <h4>Define your ICP</h4>
      <div className="sss-field-row">
        <span>Target industry</span>
        <strong>SaaS &amp; B2B</strong>
      </div>
      <div className="sss-field-row">
        <span>Company size</span>
        <strong>50–500</strong>
      </div>
      <span className="sss-save-btn">Save criteria</span>
    </div>
  )
}

function StepTwoPreview() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setConnected(true), 500)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="sss-preview sss-preview--crm">
      <div className="sss-preview-head">
        <h4>HubSpot</h4>
        <KebabIcon />
      </div>
      <p>Two-way sync so the agent always works from live pipeline data.</p>
      <span className={`sss-connected${connected ? ' is-connected' : ''}`}><CheckIcon />Connected</span>
      <span className="sss-sync-pill">Syncing 1,204 leads</span>
    </div>
  )
}

const QUEUE = [
  { initials: 'JL', name: 'Jordan Lee', status: 'Queued' },
  { initials: 'PS', name: 'Priya Shah', status: 'Sent' },
  { initials: 'MW', name: 'Marcus Webb', status: 'Sent' },
]

function StepThreePreview() {
  return (
    <div className="sss-preview sss-preview--queue">
      <div className="sss-preview-head">
        <h4>Outreach queue</h4>
        <span className="sss-launch-btn">Launch</span>
      </div>
      <div className="sss-queue-list">
        {QUEUE.map((q, i) => (
          <div className="sss-queue-row" key={q.name} style={{ '--sss-qi': i }}>
            <span className={`sss-queue-avatar sss-queue-avatar--${i}`}>{q.initials}</span>
            <span className="sss-queue-name">{q.name}</span>
            <span className={`sss-queue-status${q.status === 'Sent' ? ' is-sent' : ''}`}>{q.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PREVIEWS = [StepOnePreview, StepTwoPreview, StepThreePreview]

function StepsSdrSpine({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt sss-section' : 'section sss-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sss-panel">
          <span className="sss-spine" aria-hidden="true" />
          <div className="sss-row" style={{ '--sss-cols': steps.length }}>
            {steps.map((step, i) => (
              <div className={`sss-step sss-step--${i % 4}`} key={step.title} style={{ '--sss-i': i }}>
                <span className="sss-num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="sss-preview-row" style={{ '--sss-cols': steps.length }}>
            {steps.map((step, i) => {
              const Preview = PREVIEWS[i % PREVIEWS.length]
              return (
                <div className="sss-preview-col" key={step.title} style={{ '--sss-i': i }}>
                  <Preview />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsSdrSpine
