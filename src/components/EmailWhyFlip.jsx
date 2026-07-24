import './EmailWhyFlip.css'

/**
 * "Why us" for /email-api, built from scratch as flip cards — hover (or
 * focus, for keyboard users) a card and it rotates in 3D to reveal a small
 * animated proof visual on the back; it flips back the moment the pointer
 * or focus leaves. A different interaction from the click-list-drives-a-
 * panel pattern used just above this section on the same page.
 */

function DeliverabilityProof() {
  return (
    <div className="ewf-proof">
      <div className="ewf-track"><span className="ewf-fill" style={{ width: '96%' }} /></div>
      <div className="ewf-track ewf-track--faint"><span className="ewf-fill ewf-fill--faint" style={{ width: '71%' }} /></div>
      <span className="ewf-proof-lbl">Inbox vs. spam / lost</span>
    </div>
  )
}
function FallbackProof() {
  return (
    <div className="ewf-proof ewf-proof--row">
      <span className="ewf-chip ewf-chip--dead">Email ✕</span>
      <span className="ewf-arrow">→</span>
      <span className="ewf-chip ewf-chip--live">SMS ✓</span>
    </div>
  )
}
function ReportProof() {
  return (
    <div className="ewf-proof ewf-proof--bars">
      {[62, 44, 71, 38, 80].map((h, i) => (
        <span className="ewf-bar" key={i}>
          <span className="ewf-bar-em" style={{ height: `${h}%` }} />
          <span className="ewf-bar-sms" style={{ height: `${h * 0.55}%` }} />
        </span>
      ))}
      <span className="ewf-proof-lbl">email + sms, one chart</span>
    </div>
  )
}
function ScaleProof() {
  return (
    <div className="ewf-proof ewf-proof--row">
      <span className="ewf-scale">1</span>
      <span className="ewf-span" />
      <span className="ewf-scale ewf-scale--big">1M+</span>
    </div>
  )
}
const PROOFS = [<DeliverabilityProof />, <FallbackProof />, <ReportProof />, <ScaleProof />]

function EmailWhyFlip({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section section-alt ewf-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ewf-grid">
          {items.slice(0, 4).map((r, i) => (
            <div className="ewf-card" key={r.title} style={{ '--d': `${i * 0.1}s` }} tabIndex={0}>
              <div className="ewf-card-inner">
                <div className="ewf-face ewf-face--front">
                  <span className="ewf-icon">{r.icon}</span>
                  <h3 className="ewf-title">{r.title}</h3>
                  <span className="ewf-hint">Hover for proof ↻</span>
                </div>
                <div className="ewf-face ewf-face--back">
                  {PROOFS[i]}
                  <p className="ewf-desc">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailWhyFlip
