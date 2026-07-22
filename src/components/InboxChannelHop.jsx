import './InboxChannelHop.css'
import { IconChat, IconMegaphone, IconMail, IconPhone, IconGlobe } from './icons.jsx'

const NODES = [
  { key: 'wa', label: 'WhatsApp', icon: <IconChat />, x: 8, pos: 'top' },
  { key: 'sms', label: 'SMS', icon: <IconMegaphone />, x: 29, pos: 'bottom' },
  { key: 'email', label: 'Email', icon: <IconMail />, x: 50, pos: 'top' },
  { key: 'voice', label: 'Voice', icon: <IconPhone />, x: 71, pos: 'bottom' },
  { key: 'ig', label: 'Instagram', icon: <IconGlobe />, x: 92, pos: 'top' },
]

const POINTS = '80,46 290,174 500,46 710,174 920,46'

function InboxChannelHop() {
  return (
    <section className="section ichop">
      <div className="container">
        <span className="section-kicker">Every channel</span>
        <h2 className="section-title">One thread, every channel</h2>
        <p className="section-subtitle">
          A customer can start on WhatsApp, reply by SMS, and finish over voice — the conversation
          hops without ever splitting into a new ticket.
        </p>

        <div className="ichop-stage">
          <svg className="ichop-line" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ichopGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4f5bd5" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <polyline className="ichop-base" points={POINTS} />
            <polyline className="ichop-flow" points={POINTS} />
          </svg>

          <div className="ichop-nodes">
            {NODES.map((n) => (
              <div
                className={`ichop-node is-${n.pos}`}
                key={n.key}
                style={{ left: `${n.x}%`, top: n.pos === 'top' ? '20.9%' : '79.1%' }}
              >
                <span className={`ichop-dot dot-${n.key}`}>{n.icon}</span>
                <span className="ichop-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="ichop-caption">
          <span className="ichop-caption-tag">Context travels</span>
          Order history, past replies and internal notes carry across every hop — so no one on your
          team ever asks the customer to repeat themselves.
        </p>
      </div>
    </section>
  )
}

export default InboxChannelHop
