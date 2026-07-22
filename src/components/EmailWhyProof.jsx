import './EmailWhyProof.css'

/**
 * Bespoke "why us" for /email-api.
 * Each reason is anchored by a small concrete proof visual (a placement bar, a
 * bounce->SMS recovery, a dual email+SMS chart, a scale span) rather than a
 * generic icon — so the form comes from what the claim proves. De-boxed, light.
 */
function DeliverabilityProof() {
  return (
    <div className="ewp-proof">
      <div className="ewp-track"><span className="ewp-fill" style={{ width: '96%' }} /></div>
      <div className="ewp-track ewp-track--faint"><span className="ewp-fill ewp-fill--faint" style={{ width: '71%' }} /></div>
      <div className="ewp-legend"><b>Inbox</b><i>Spam / lost</i></div>
    </div>
  )
}

function FallbackProof() {
  return (
    <div className="ewp-proof ewp-proof--row">
      <span className="ewp-chip ewp-chip--dead">Email ✕</span>
      <span className="ewp-to">retries</span>
      <span className="ewp-chip ewp-chip--live">SMS ✓</span>
    </div>
  )
}

function ReportProof() {
  return (
    <div className="ewp-proof ewp-proof--bars">
      {[62, 44, 71, 38, 80].map((h, i) => (
        <span className="ewp-bar" key={i}>
          <span className="ewp-bar-em" style={{ height: `${h}%` }} />
          <span className="ewp-bar-sms" style={{ height: `${h * 0.55}%` }} />
        </span>
      ))}
      <span className="ewp-bars-key"><em className="em" />email <em className="sms" />sms</span>
    </div>
  )
}

function ScaleProof() {
  return (
    <div className="ewp-proof ewp-proof--row">
      <span className="ewp-scale">1</span>
      <span className="ewp-span" />
      <span className="ewp-scale ewp-scale--big">1M+</span>
      <span className="ewp-to">same API</span>
    </div>
  )
}

const PROOFS = [<DeliverabilityProof />, <FallbackProof />, <ReportProof />, <ScaleProof />]

function EmailWhyProof({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section section-alt ewp-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ewp">
          {items.slice(0, 4).map((r, i) => (
            <div className="ewp-item" key={r.title}>
              <div className="ewp-visual">{PROOFS[i]}</div>
              <h3 className="ewp-title">{r.title}</h3>
              <p className="ewp-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailWhyProof
