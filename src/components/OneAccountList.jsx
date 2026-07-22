import './OneAccountList.css'

/**
 * Bespoke section for /why-smslocal.
 * An asymmetric editorial list: a left-anchored lead beside a hairline-divided
 * "what's included" list, each capability marked with a brand "+". No icons, no
 * cards, no columns — deliberately different from the icon-medal pillars
 * (WhyConsolidateColumns), the number row (StatBand) and the seam compare.
 * Trimmed copy: one tight line per capability.
 */

const INCLUDED = [
  { name: 'Messaging API', desc: 'SMS, WhatsApp, RCS, Viber, email and voice on one key.' },
  { name: 'Chatbots & AI agents', desc: 'Automations built in — no separate bot vendor.' },
  { name: 'Campaigns & broadcasts', desc: 'Bulk sends from the same contacts your API uses.' },
  { name: 'Shared team inbox', desc: 'Every channel’s replies land in one place.' },
  { name: 'Numbers & sender IDs', desc: 'Provisioned in-platform — no carrier account.' },
  { name: 'Analytics & billing', desc: 'One dashboard for delivery, engagement and spend.' },
]

function OneAccountList() {
  return (
    <section className="section section-alt oal-section">
      <div className="container">
        <div className="oal-grid">
          <div className="oal-lead">
            <span className="section-kicker">One account</span>
            <h2 className="oal-title">Everything the old stack did, in one place</h2>
            <p className="oal-sub">The capabilities you would buy from five vendors — on a single account.</p>
          </div>

          <ul className="oal-list">
            {INCLUDED.map((it) => (
              <li className="oal-item" key={it.name}>
                <span className="oal-plus" aria-hidden="true">+</span>
                <span className="oal-text">
                  <span className="oal-name">{it.name}</span>
                  <span className="oal-desc">{it.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default OneAccountList
