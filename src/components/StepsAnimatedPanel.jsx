import './StepsAnimatedPanel.css'

function Dots() {
  return (
    <span className="sap-dots" aria-hidden="true">
      <span /><span /><span />
    </span>
  )
}

function SyncIcon() {
  return (
    <svg className="sap-sync-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 3v4h-4M7 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="sap-pill-check" viewBox="0 0 24 24" width="11" height="11" fill="none" aria-hidden="true">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg className="sap-bell" viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function StepOneVisual() {
  return (
    <div className="sap-visual sap-visual--intake">
      <div className="sap-visual--intake-head">
        <SyncIcon />
        <span className="sap-cursor-line">Syncing<span className="sap-cursor" /></span>
      </div>
      <div className="sap-pill-list">
        <span className="sap-pill"><CheckIcon />Billing platform</span>
        <span className="sap-pill"><CheckIcon />OSS / BSS</span>
        <span className="sap-pill"><CheckIcon />Every channel</span>
      </div>
    </div>
  )
}

function StepTwoVisual() {
  return (
    <div className="sap-visual sap-visual--guardrail">
      <span className="sap-ring" aria-hidden="true"><span className="sap-ring-core" /></span>
      <span className="sap-agent-pill">Your agent</span>
      <div className="sap-tags">
        <span className="sap-tag">Plans</span>
        <span className="sap-tag">Billing logic</span>
        <span className="sap-tag">Outage data</span>
      </div>
    </div>
  )
}

function StepThreeVisual() {
  return (
    <div className="sap-visual sap-visual--channels">
      <div className="sap-pill-list sap-pill-list--row">
        <span className="sap-pill sap-pill--on"><span className="sap-pill-dot" />SMS</span>
        <span className="sap-pill sap-pill--on"><span className="sap-pill-dot" />RCS</span>
        <span className="sap-pill sap-pill--on"><span className="sap-pill-dot" />WhatsApp</span>
        <span className="sap-pill sap-pill--on"><span className="sap-pill-dot" />Voice</span>
      </div>
      <Dots />
    </div>
  )
}

function StepFourVisual() {
  return (
    <div className="sap-visual sap-visual--live">
      <span className="sap-resolved"><BellIcon />Outage alert sent · Zone 4B</span>
      <span className="sap-resolved sap-resolved--muted">342 customers notified</span>
      <Dots />
    </div>
  )
}

const VISUALS = [StepOneVisual, StepTwoVisual, StepThreeVisual, StepFourVisual]

function StepsAnimatedPanel({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt sap-section' : 'section sap-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sap-panel">
          <span className="sap-spine" aria-hidden="true" />
          <div className="sap-row">
            {steps.map((step, i) => {
              const Visual = VISUALS[i % VISUALS.length]
              return (
                <div className={`sap-step sap-step--${i % 4}`} key={step.title} style={{ '--sap-i': i }}>
                  <span className="sap-num">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <Visual />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsAnimatedPanel
