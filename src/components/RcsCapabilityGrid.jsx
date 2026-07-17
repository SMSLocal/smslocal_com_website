import './RcsCapabilityGrid.css'
import { IconShield, IconCursor, IconRefresh } from './icons.jsx'

function BrandMiniMock() {
  return (
    <div className="rcap-mock">
      <div className="rcap-sender-row">
        <span className="rcap-sender-avatar" />
        <strong>SMSLocal</strong>
        <span className="rcap-sender-tick">✓</span>
      </div>
      <div className="rcap-tag-row">
        <span className="rcap-tag">Logo</span>
        <span className="rcap-tag">Name</span>
        <span className="rcap-tag">Brand color</span>
      </div>
    </div>
  )
}

function ActionsMiniMock() {
  return (
    <div className="rcap-mock">
      <p className="rcap-bubble">Tap to reply — no typing needed</p>
      <div className="rcap-tag-row wrap">
        <span className="rcap-tag primary">Track order</span>
        <span className="rcap-tag">Book a slot</span>
        <span className="rcap-tag">See sizes</span>
        <span className="rcap-tag">Talk to us</span>
      </div>
    </div>
  )
}

function FallbackMiniMock() {
  return (
    <div className="rcap-mock">
      <div className="rcap-fallback-row">
        <span>RCS supported</span>
        <span className="rcap-pill rich">rich card</span>
      </div>
      <div className="rcap-fallback-row">
        <span>No RCS on device</span>
        <span className="rcap-pill sms">SMS sent</span>
      </div>
      <div className="rcap-fallback-footer">One send, every customer reached</div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconShield />, title: 'A branded look.', desc: "A verified sender shows your name, logo and brand color right inside the customer's messaging app — a text that reads like a mini landing page.", mock: <BrandMiniMock /> },
  { icon: <IconCursor />, title: 'Tappable replies & actions.', desc: 'Give customers chips and buttons so they can reply, track an order or book a slot in one tap — no typing, more people who actually act.', mock: <ActionsMiniMock /> },
  { icon: <IconRefresh />, title: 'Automatic SMS fallback.', desc: "When a device can't receive RCS, the same message still goes out as SMS. Compose once, reach everyone on whatever their phone supports.", mock: <FallbackMiniMock /> },
]

function RcsCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">More than a text — a real conversation</h2>
        <p className="section-subtitle">Three things RCS gives you with SMSLocal: a branded look, tappable actions, and a safety net that never drops a customer.</p>
        <div className="rcap-grid">
          {ITEMS.map((item) => (
            <div className="rcap-card" key={item.title}>
              <span className="rcap-icon">{item.icon}</span>
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

export default RcsCapabilityGrid
