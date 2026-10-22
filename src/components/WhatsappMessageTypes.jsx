import { WaPhone, WaDay, WaIn, WaBtn } from './WaPhone.jsx'

/**
 * The three message types shown on the WhatsApp Business API page, each on a
 * real-looking WhatsApp chat screen (see WaPhone) as the customer sees it.
 */

export function TemplateMessageMock() {
  return (
    <WaPhone name="SMSLocal" status="Business account" className="compact">
      <WaDay>Today</WaDay>
      <WaIn>
        <strong>Order shipped</strong>
        <p>Your order #8821 is on its way and lands by Thursday.</p>
      </WaIn>
      <WaBtn icon="link">Track order</WaBtn>
      <WaBtn>Contact support</WaBtn>
    </WaPhone>
  )
}

export function CatalogMessageMock() {
  return (
    <WaPhone name="SMSLocal Store" status="Business account" className="compact">
      <WaDay>Today</WaDay>
      <WaIn>
        <div className="wap-card">
          <div className="wap-card-img" aria-hidden="true">🎧</div>
          <div className="wap-card-info"><strong>Wireless Earbuds</strong><span>₹1,499</span></div>
        </div>
        <p>Fresh stock just landed. Tap to see the range.</p>
      </WaIn>
      <WaBtn icon="link" primary>View catalog</WaBtn>
    </WaPhone>
  )
}

export function QuickReplyMock() {
  return (
    <WaPhone name="SMSLocal" status="Business account" className="compact">
      <WaDay>Today</WaDay>
      <WaIn>How was your delivery experience?</WaIn>
      <WaBtn>🙂 Great</WaBtn>
      <WaBtn>😐 Okay</WaBtn>
      <WaBtn>🙁 Poor</WaBtn>
    </WaPhone>
  )
}
