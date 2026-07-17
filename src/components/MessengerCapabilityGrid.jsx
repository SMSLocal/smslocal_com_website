import './MessengerCapabilityGrid.css'
import { IconBell, IconClock, IconMail } from './icons.jsx'

function NeverMissMock() {
  return (
    <div className="msgcap-mock">
      <div className="msgcap-row">
        <span>New message received</span>
        <span className="msgcap-status replied">auto-replied</span>
      </div>
      <div className="msgcap-row">
        <span>Menu option tapped</span>
        <span className="msgcap-status replied">answered</span>
      </div>
    </div>
  )
}

function WindowMock() {
  return (
    <div className="msgcap-mock">
      <div className="msgcap-row">
        <span>Reply within 24h</span>
        <span className="msgcap-pill free">free-form</span>
      </div>
      <div className="msgcap-row">
        <span>After the window closes</span>
        <span className="msgcap-pill tag">tagged message</span>
      </div>
      <div className="msgcap-footer">Every send stays policy-safe, automatically</div>
    </div>
  )
}

function OneInboxMock() {
  return (
    <div className="msgcap-mock">
      <div className="msgcap-row">
        <span className="msgcap-channel">Messenger</span>
        <span>Is the starter plan enough for us?</span>
      </div>
      <div className="msgcap-row">
        <span className="msgcap-channel">Instagram</span>
        <span>Do you have this in size M?</span>
      </div>
      <div className="msgcap-row">
        <span className="msgcap-channel">WhatsApp</span>
        <span>Order #8821 update please</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconBell />, title: 'Never miss a message.', desc: 'Auto-replies and a persistent menu answer common questions the moment someone messages your Page — day or night.', mock: <NeverMissMock /> },
  { icon: <IconClock />, title: 'Stay inside the rules.', desc: "Meta's 24-hour messaging window and tag policy are tracked automatically, so every send stays compliant." , mock: <WindowMock /> },
  { icon: <IconMail />, title: 'One inbox for every channel.', desc: 'Messenger sits beside Instagram, WhatsApp and SMS in the same shared inbox, so your team checks one place.', mock: <OneInboxMock /> },
]

function MessengerCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What automation looks like on Messenger</h2>
        <p className="section-subtitle">Three things that change the moment replies stop being manual.</p>
        <div className="msgcap-grid">
          {ITEMS.map((item) => (
            <div className="msgcap-card" key={item.title}>
              <span className="msgcap-icon">{item.icon}</span>
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

export default MessengerCapabilityGrid
