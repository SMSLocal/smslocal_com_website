import './PlatformOneRecord.css'
import { IconMegaphone, IconChat, IconMic, IconMail } from './icons.jsx'

const TOUCHPOINTS = [
  { icon: <IconMegaphone />, channel: 'SMS', snippet: 'Order shipped', time: '10:02' },
  { icon: <IconChat />, channel: 'WhatsApp', snippet: 'Where is it?', time: '12:15' },
  { icon: <IconMic />, channel: 'Voice', snippet: '2-min callback', time: '14:40' },
  { icon: <IconMail />, channel: 'Email', snippet: 'Invoice sent', time: '16:20' },
]

function PlatformOneRecord() {
  return (
    <section className="section section-alt por-section">
      <div className="container">
        <span className="section-kicker">Unified profile</span>
        <h2 className="section-title">One customer record, every touchpoint</h2>
        <p className="section-subtitle">
          A text, a chat, a call and an email — four channels, one person. Every touchpoint
          resolves to the same profile, so context never resets.
        </p>

        <div className="por" role="img" aria-label="A single customer, Priya Sharma, moves from SMS to WhatsApp to Voice to Email — all four touchpoints resolving to one unified customer record.">
          <div className="por-chip">
            <span className="por-avatar">PS</span>
            <div className="por-chip-id">
              <strong>Priya Sharma</strong>
              <span className="por-chip-tags">
                <span className="por-chip-tag">VIP</span>
                <span className="por-chip-tag">Mumbai</span>
              </span>
            </div>
            <span className="por-chip-ltv">
              <span className="por-chip-ltv-label">Lifetime value</span>
              <strong>&#8377;48,200</strong>
            </span>
          </div>

          <div className="por-field">
            <svg className="por-fan" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="12.5" y1="100" x2="50" y2="0" />
              <line x1="37.5" y1="100" x2="50" y2="0" />
              <line x1="62.5" y1="100" x2="50" y2="0" />
              <line x1="87.5" y1="100" x2="50" y2="0" />
            </svg>

            <span className="por-baseline" aria-hidden="true" />
            <span className="por-pulse" aria-hidden="true" />

            <div className="por-nodes">
              {TOUCHPOINTS.map((t, i) => (
                <div className="por-node" style={{ '--n': i }} key={t.channel}>
                  <span className="por-dot" />
                  <span className="por-node-ch">
                    <span className="por-node-ic">{t.icon}</span>
                    {t.channel}
                  </span>
                  <span className="por-node-snip">&ldquo;{t.snippet}&rdquo;</span>
                  <span className="por-node-time">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformOneRecord
