import './ViberProblemShift.css'

/**
 * "The problem" section for /viber-business-messages — two literal mini
 * screens facing off: Viber answering blind and alone, vs. Viber sitting in
 * a shared inbox that already has the customer's full history. Not a
 * bulleted before/after list — this page already has a grid, a timeline
 * and an underline-grid elsewhere, so this stays a visual, not a list.
 */
function ViberProblemShift({ eyebrow, heading, subtitle }) {
  return (
    <section className="section section-alt vps-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="vps-stage">
          <div className="vps-side">
            <div className="vps-phone vps-phone--bad">
              <div className="vps-phone-head">
                <span className="vps-avatar vps-avatar--bad" />
                <span className="vps-name">Viber</span>
              </div>
              <div className="vps-bubble vps-bubble--in">Hi, following up on my order</div>
              <div className="vps-bubble vps-bubble--out muted">Can you send your order number again?</div>
            </div>
            <span className="vps-tag vps-tag--bad">✕ Starts from zero, every time</span>
          </div>

          <span className="vps-vs">VS</span>

          <div className="vps-side">
            <div className="vps-phone vps-phone--good">
              <div className="vps-phone-head">
                <span className="vps-avatar vps-avatar--good" />
                <span className="vps-name">Shared inbox</span>
                <span className="vps-context">WhatsApp: Order #4821 shipped Tue</span>
              </div>
              <div className="vps-bubble vps-bubble--in">Hi, following up on my order</div>
              <div className="vps-bubble vps-bubble--out">Shipped Tuesday — arriving by Friday! 📦</div>
            </div>
            <span className="vps-tag vps-tag--good">✓ Answers instantly, with full history</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViberProblemShift
