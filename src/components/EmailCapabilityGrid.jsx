import './EmailCapabilityGrid.css'
import { IconMail, IconCode, IconRefresh } from './icons.jsx'

function TemplateMiniMock() {
  return (
    <div className="emcap-mock">
      <div className="emcap-template" />
      <div className="emcap-row">
        <span>Order confirmation</span>
        <span className="emcap-pill">tested ✓</span>
      </div>
    </div>
  )
}

function ApiMiniMock() {
  return (
    <div className="emcap-mock">
      <code className="emcap-code">POST /v1/email/send</code>
      <div className="emcap-row">
        <span>or via</span>
        <span className="emcap-pill alt">SMTP relay</span>
      </div>
    </div>
  )
}

function FallbackMiniMock() {
  return (
    <div className="emcap-mock">
      <div className="emcap-row">
        <span>Email bounced</span>
        <span className="emcap-pill">detected</span>
      </div>
      <div className="emcap-row">
        <span>Retried via SMS</span>
        <span className="emcap-pill success">delivered</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconMail />, title: 'Templates that render everywhere.', desc: 'Design once in a visual editor and send transactional or bulk email that looks right in every inbox.', mock: <TemplateMiniMock /> },
  { icon: <IconCode />, title: 'REST or SMTP, your choice.', desc: 'Integrate with a simple REST API, or just point your existing SMTP relay at us — no rewrite required.', mock: <ApiMiniMock /> },
  { icon: <IconRefresh />, title: 'SMS fallback, built in.', desc: 'When an email bounces or goes unopened, the same message can retry over SMS automatically.', mock: <FallbackMiniMock /> },
]

function EmailCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">One API for email and SMS</h2>
        <p className="section-subtitle">Three things that change when email stops being a separate system.</p>
        <div className="emcap-grid">
          {ITEMS.map((item) => (
            <div className="emcap-card" key={item.title}>
              <span className="emcap-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.mock}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailCapabilityGrid
