import { WaPhone, WaDay, WaIn, WaOut, WaSys, WaBtn } from './WaPhone.jsx'
import './WaCompare.css'

/**
 * "Official vs unofficial" section for the WhatsApp Business API page: two
 * real WhatsApp chat screens side by side with a VS badge. One is an unverified,
 * greyed-out account; the other is a verified business that answers. The
 * contrast is shown, not explained.
 */

function WhatsAppOfficialCompare({ eyebrow, title, subtitle }) {
  return (
    <section className="section section-alt">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wac-stage">
          <div className="wac-side bad">
            <WaPhone name="Unknown Business" unknown className="compact">
              <WaDay>Today</WaDay>
              <WaOut ticks="sent">Hi, where is my order?</WaOut>
              <WaIn>Sorry, I can&rsquo;t help with that.</WaIn>
              <WaSys>This account is not a verified business.</WaSys>
            </WaPhone>
            <ul>
              <li>✕ No verified badge</li>
              <li>✕ Flagged &amp; rate-limited</li>
            </ul>
          </div>

          <span className="wac-vs" aria-hidden="true">VS</span>

          <div className="wac-side good">
            <WaPhone name="SMSLocal Support" status="Business account" className="compact">
              <WaDay>Today</WaDay>
              <WaOut>Hi, where is my order?</WaOut>
              <WaIn>Found it — shipped today 📦</WaIn>
              <WaBtn icon="link">Track order</WaBtn>
            </WaPhone>
            <ul>
              <li>✓ Verified sender</li>
              <li>✓ AI resolves, then hands off</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatsAppOfficialCompare
