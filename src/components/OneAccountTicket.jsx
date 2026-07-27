import './OneAccountTicket.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke, from-scratch replacement for the lead+list section on
 * /why-smslocal. ONE concrete artifact - a boarding-pass-shaped "account
 * ticket": a torn-off stub of five old vendor line items on the left,
 * perforated into one live SMSLocal account ticket on the right, printed
 * with real fields and a barcode. Not a bordered list, not icon tiles.
 */
const OLD_STACK = [
  { name: 'Messaging API', vendor: 'Vendor A' },
  { name: 'Chatbot builder', vendor: 'Vendor B' },
  { name: 'Campaign tool', vendor: 'Vendor C' },
  { name: 'Shared inbox', vendor: 'Vendor D' },
  { name: 'Number provider', vendor: 'Vendor E' },
]

const FIELDS = [
  { label: 'Login', value: '1 workspace' },
  { label: 'Contacts', value: 'Shared' },
  { label: 'Billing', value: '1 invoice' },
  { label: 'Launch', value: 'Days' },
]

const INCLUDED = [
  'Messaging API', 'Chatbots & AI agents', 'Campaigns & broadcasts',
  'Shared team inbox', 'Numbers & sender IDs', 'Analytics & billing',
]

function OneAccountTicket() {
  return (
    <section className="section section-alt oat-section">
      <div className="container">
        <span className="section-kicker">One account</span>
        <h2 className="section-title">Everything the old stack did, in one place</h2>
        <p className="section-subtitle">
          The capabilities you would buy from five vendors — reissued as a single account.
        </p>

        <div
          className="oat-ticket"
          role="img"
          aria-label="A torn boarding-pass style ticket. The left stub lists five old vendors — messaging API, chatbot builder, campaign tool, shared inbox and number provider — each voided. The right ticket is one live SMSLocal account covering all six capabilities, with one login, shared contacts, one invoice and a launch time of days."
        >
          <div className="oat-stub">
            <span className="oat-stub-label">Old stack · voided</span>
            <ul className="oat-stub-list">
              {OLD_STACK.map((s) => (
                <li key={s.name}>
                  <span className="oat-stub-name">{s.name}</span>
                  <span className="oat-stub-vendor">{s.vendor}</span>
                </li>
              ))}
            </ul>
            <span className="oat-void" aria-hidden="true">VOID</span>
          </div>

          <div className="oat-perf" aria-hidden="true" />

          <div className="oat-main">
            <div className="oat-main-head">
              <span className="oat-main-kicker">SMSLocal account</span>
              <span className="oat-main-status">Active</span>
            </div>

            <div className="oat-fields">
              {FIELDS.map((f) => (
                <div className="oat-field" key={f.label}>
                  <span className="oat-field-label">{f.label}</span>
                  <span className="oat-field-value">{f.value}</span>
                </div>
              ))}
            </div>

            <ul className="oat-included">
              {INCLUDED.map((it) => (
                <li key={it}><IconCheck />{it}</li>
              ))}
            </ul>

            <div className="oat-barcode" aria-hidden="true">
              {Array.from({ length: 38 }).map((_, i) => (
                <span key={i} style={{ '--w': (i % 5 === 0) ? 3 : (i % 3 === 0 ? 1 : 2) }} />
              ))}
            </div>
            <span className="oat-serial">ACCOUNT · SMSLOCAL-000001</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OneAccountTicket
