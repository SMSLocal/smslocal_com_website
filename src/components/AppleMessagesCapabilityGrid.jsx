import './AppleMessagesCapabilityGrid.css'
import { IconCalendar, IconDollar, IconShield } from './icons.jsx'

function ListPickerMiniMock() {
  return (
    <div className="amcap-mock">
      <span className="amcap-list-title">📅 Pick a time</span>
      <span className="amcap-list-row">Today, 4:30 PM</span>
      <span className="amcap-list-row">Tomorrow, 11:00 AM</span>
    </div>
  )
}

function ApplePayMiniMock() {
  return (
    <div className="amcap-mock">
      <div className="amcap-row">
        <span>Order total</span>
        <strong>$48.00</strong>
      </div>
      <span className="amcap-pay-btn"> Pay with Apple Pay</span>
    </div>
  )
}

function AuthMiniMock() {
  return (
    <div className="amcap-mock">
      <div className="amcap-row">
        <span>Business verified by Apple</span>
        <span className="amcap-status">✓ approved</span>
      </div>
      <div className="amcap-row">
        <span>Messages Service Provider</span>
        <span className="amcap-status">✓ active</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconCalendar />, title: 'Interactive list pickers.', desc: 'Let customers pick an appointment slot or product option right inside the message — no app switch.', mock: <ListPickerMiniMock /> },
  { icon: <IconDollar />, title: 'Checkout with Apple Pay.', desc: 'Take payment or a deposit without ever leaving the conversation.', mock: <ApplePayMiniMock /> },
  { icon: <IconShield />, title: 'Approved through an MSP.', desc: "Apple requires a Messages Service Provider to send Business Chat — we're that approved path.", mock: <AuthMiniMock /> },
]

function AppleMessagesCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What a conversation looks like on iPhone</h2>
        <p className="section-subtitle">Rich formats built into Messages — not a workaround bolted onto SMS.</p>
        <div className="amcap-grid">
          {ITEMS.map((item) => (
            <div className="amcap-card" key={item.title}>
              <span className="amcap-icon">{item.icon}</span>
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

export default AppleMessagesCapabilityGrid
