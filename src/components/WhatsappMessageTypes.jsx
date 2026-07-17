import './WhatsappMessageTypes.css'

function PhoneFrame({ children }) {
  return (
    <div className="wamt-phone">
      <div className="wamt-phone-notch" />
      <div className="wamt-phone-screen">{children}</div>
    </div>
  )
}

export function TemplateMessageMock() {
  return (
    <PhoneFrame>
      <div className="wamt-bubble">
        <strong>Order shipped</strong>
        <p>Your order #8821 is on its way and lands by Thursday.</p>
      </div>
      <button className="wamt-chip">Track order</button>
      <button className="wamt-chip">Contact support</button>
    </PhoneFrame>
  )
}

export function CatalogMessageMock() {
  return (
    <PhoneFrame>
      <div className="wamt-bubble wamt-catalog">
        <span className="wamt-catalog-thumb" />
        <div className="wamt-catalog-info">
          <strong>Wireless Earbuds</strong>
          <span>₹1,499</span>
        </div>
      </div>
      <button className="wamt-chip primary">View catalog</button>
    </PhoneFrame>
  )
}

export function QuickReplyMock() {
  return (
    <PhoneFrame>
      <div className="wamt-bubble">
        <p>How was your delivery experience?</p>
      </div>
      <div className="wamt-chip-row">
        <button className="wamt-chip small">🙂 Great</button>
        <button className="wamt-chip small">😐 Okay</button>
        <button className="wamt-chip small">🙁 Poor</button>
      </div>
    </PhoneFrame>
  )
}
