import './EmailAloneLedger.css'

/**
 * Bespoke "email is run alone" section for /email-api.
 * A stack ledger: the messaging platform is one line, email shows up as a
 * SEPARATE vendor line (own dashboard, own bill) — proving the isolation. The
 * footer tallies the duplication, then SMSLocal collapses it to one. De-boxed feel.
 */
function EmailAloneLedger({ eyebrow, heading, paragraphs = [] }) {
  return (
    <section className="section section-alt eal-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => <p className="section-subtitle eal-lead" key={i}>{p}</p>)}

        <div className="eal">
          <div className="eal-ledger">
            <span className="eal-ledger-head">Your stack · this month</span>

            <div className="eal-row" style={{ '--d': '0.05s' }}>
              <span className="eal-dot" />
              <div className="eal-line">
                <strong>Messaging platform</strong>
                <span>SMS · WhatsApp · web chat</span>
              </div>
              <span className="eal-badge">1 login</span>
            </div>

            <div className="eal-sep" aria-hidden="true" />

            <div className="eal-row eal-row--alone" style={{ '--d': '0.35s' }}>
              <span className="eal-dot eal-dot--alone" />
              <div className="eal-line">
                <strong>+ Email vendor <em>(run alone)</em></strong>
                <span>separate dashboard · separate bill</span>
              </div>
              <span className="eal-badge eal-badge--extra">+1 login</span>
            </div>

            <div className="eal-total" style={{ '--d': '0.7s' }}>
              = <s>2 vendors · 2 dashboards · 2 bills</s>
            </div>
          </div>

          <p className="eal-fix" style={{ '--d': '1s' }}>
            <span className="eal-fix-mark" aria-hidden="true">→</span>
            On SMSLocal, email is one more line on the <strong>same</strong> account — one vendor, one dashboard, one report.
          </p>
        </div>
      </div>
    </section>
  )
}

export default EmailAloneLedger
