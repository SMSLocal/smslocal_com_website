import './WhatsAppOfficialCompare.css'

/**
 * "Official vs unofficial" section for the WhatsApp Business API page —
 * not paragraphs + bullet lists. Two literal mini WhatsApp screens,
 * side by side with a VS badge between them: one greyed-out and flagged,
 * one verified and AI-handled. The contrast is shown, not explained.
 */

function WhatsAppOfficialCompare({ eyebrow, title, subtitle }) {
  return (
    <section className="section section-alt">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="waoc-stage">
          <div className="waoc-side">
            <div className="waoc-phone waoc-phone--bad">
              <div className="waoc-phone-head">
                <span className="waoc-avatar waoc-avatar--bad" />
                <span className="waoc-name">Unknown Business</span>
              </div>
              <div className="waoc-bubble waoc-bubble--bad">
                Sorry, I can&rsquo;t help with that.
                <span className="waoc-tick waoc-tick--bad">✓</span>
              </div>
            </div>
            <div className="waoc-tags waoc-tags--bad">
              <span>✕ No verified badge</span>
              <span>✕ Flagged &amp; rate-limited</span>
            </div>
          </div>

          <span className="waoc-vs">VS</span>

          <div className="waoc-side">
            <div className="waoc-phone waoc-phone--good">
              <div className="waoc-phone-head">
                <span className="waoc-avatar waoc-avatar--good" />
                <span className="waoc-name">SMSLocal Support</span>
                <span className="waoc-badge">Verified ✓</span>
              </div>
              <div className="waoc-bubble waoc-bubble--good">
                Found it — shipped today 📦
                <span className="waoc-tick waoc-tick--good">✓✓</span>
              </div>
              <button className="waoc-chip">Track order</button>
            </div>
            <div className="waoc-tags waoc-tags--good">
              <span>✓ Verified sender</span>
              <span>✓ AI resolves, then hands off</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatsAppOfficialCompare
