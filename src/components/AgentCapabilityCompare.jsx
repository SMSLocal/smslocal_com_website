import './AgentCapabilityCompare.css'
import {
  IconSearch, IconBolt, IconUsers, IconReceipt, IconCart, IconShield,
  IconMail, IconCode, IconLink, IconRefresh, IconPencil, IconChat,
} from './icons.jsx'

const LOOKUP_CHIPS = [
  { icon: <IconUsers />, label: 'Contacts & deals' },
  { icon: <IconReceipt />, label: 'Invoices & orders' },
  { icon: <IconCart />, label: 'Order status' },
  { icon: <IconShield />, label: 'Account records' },
  { icon: <IconMail />, label: 'Email threads' },
  { icon: <IconCode />, label: 'Database rows' },
]

const ACTION_CHIPS = [
  { icon: <IconLink />, label: 'Update payment link' },
  { icon: <IconReceipt />, label: 'Update invoice' },
  { icon: <IconCart />, label: 'Update order' },
  { icon: <IconRefresh />, label: 'Issue refund' },
  { icon: <IconPencil />, label: 'Create record' },
  { icon: <IconChat />, label: 'Open a ticket' },
]

function AgentCapabilityCompare() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="agcap-head">
          <span className="section-kicker">Real data, real actions</span>
          <h2>It doesn't guess — it checks, then acts</h2>
          <p>Our agent reads live data from your connected tools and runs real actions — all from inside the conversation, with no copy-paste.</p>
        </div>

        <div className="agcap-grid">
          {/* Look up */}
          <div className="agcap-card agcap-card--read">
            <div className="agcap-card-top">
              <span className="agcap-pill"><IconSearch />Look up</span>
              <span className="agcap-tag">Read access</span>
            </div>
            <h3>Answer with real data</h3>
            <p>It pulls the live record straight from the source — never a stale, out-of-date knowledge base.</p>
            <div className="agcap-chips">
              {LOOKUP_CHIPS.map((c) => (
                <span className="agcap-chip" key={c.label}>
                  <span className="agcap-chip-ic">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="agcap-foot">
              <span className="agcap-foot-note">"Where's my order?" answered instantly</span>
              <a href="#integrations" className="agcap-foot-link">See what it reads →</a>
            </div>
          </div>

          {/* Take action */}
          <div className="agcap-card agcap-card--write">
            <div className="agcap-card-top">
              <span className="agcap-pill agcap-pill--write"><IconBolt />Take action</span>
              <span className="agcap-tag">Write access</span>
            </div>
            <h3>Resolve with real actions</h3>
            <p>It runs the actual task — update, create, refund — and closes the loop inside the same thread.</p>
            <div className="agcap-chips">
              {ACTION_CHIPS.map((c) => (
                <span className="agcap-chip" key={c.label}>
                  <span className="agcap-chip-ic agcap-chip-ic--write">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="agcap-foot">
              <span className="agcap-foot-note">Dozens of actions across your connected stack</span>
              <a href="#integrations" className="agcap-foot-link">See what it does →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentCapabilityCompare
