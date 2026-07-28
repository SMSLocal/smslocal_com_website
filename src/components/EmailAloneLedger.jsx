import { useState } from 'react'
import './EmailAloneLedger.css'

/**
 * Bespoke "email is run alone" section for /email-api.
 * A stack ledger: the messaging platform is one line, email shows up as a
 * SEPARATE vendor line (own dashboard, own bill) — proving the isolation.
 * A "Merge it" toggle actually animates the two rows collapsing into one,
 * so the fix isn't just described — the user can trigger it and watch it
 * happen. De-boxed feel, ambient glow, fully responsive.
 */
function EmailAloneLedger({ eyebrow, heading, paragraphs = [] }) {
  const [merged, setMerged] = useState(false)

  return (
    <section className="section section-alt eal-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => <p className="section-subtitle eal-lead" key={i}>{p}</p>)}

        <div className="eal">
          <span className="eal-glow" aria-hidden="true" />

          <div className={`eal-ledger${merged ? ' is-merged' : ''}`}>
            <span className="eal-ledger-head">Your stack · this month</span>

            <div className="eal-row" style={{ '--d': '0.05s' }}>
              <span className="eal-dot" />
              <div className="eal-line">
                <strong>Messaging platform</strong>
                <span>{merged ? 'SMS · WhatsApp · web chat · Email' : 'SMS · WhatsApp · web chat'}</span>
              </div>
              <span className="eal-badge">1 login</span>
            </div>

            <div className={`eal-row eal-row--alone${merged ? ' is-collapsing' : ''}`} style={{ '--d': '0.35s' }}>
              <span className="eal-dot eal-dot--alone" />
              <div className="eal-line">
                <strong>+ Email vendor <em>(run alone)</em></strong>
                <span>separate dashboard · separate bill</span>
              </div>
              <span className="eal-badge eal-badge--extra">+1 login</span>
            </div>

            <div className="eal-sep" aria-hidden="true" />

            <div className="eal-total" style={{ '--d': '0.7s' }}>
              {merged ? (
                <span className="eal-total-merged">✓ 1 vendor · 1 dashboard · 1 bill</span>
              ) : (
                <>= <s>2 vendors · 2 dashboards · 2 bills</s></>
              )}
            </div>

            <button type="button" className="eal-merge-btn" onClick={() => setMerged((m) => !m)}>
              {merged ? '↺ Show it run alone' : '✨ Merge it into one account'}
            </button>
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
