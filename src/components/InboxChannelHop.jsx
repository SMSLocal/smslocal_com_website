import './InboxChannelHop.css'
import { IconChat, IconMegaphone, IconMail, IconPhone, IconGlobe } from './icons.jsx'

const NODES = [
  {
    key: 'wa',
    label: 'WhatsApp',
    icon: <IconChat />,
    x: 8,
    pos: 'top',
    align: 'start',
    who: 'Emma Clarke',
    time: '9:02am',
    snippet: 'Hey, is my order #4821 shipped yet?',
  },
  {
    key: 'sms',
    label: 'SMS',
    icon: <IconMegaphone />,
    x: 29,
    pos: 'bottom',
    who: 'SMSLocal',
    time: '9:03am',
    snippet: 'Yep! Tracking: 1Z999AA10123456784',
  },
  {
    key: 'email',
    label: 'Email',
    icon: <IconMail />,
    x: 50,
    pos: 'top',
    who: 'Emma Clarke',
    time: '11:40am',
    snippet: 'Re: Order #4821 — can I add a gift note?',
  },
  {
    key: 'voice',
    label: 'Voice',
    icon: <IconPhone />,
    x: 71,
    pos: 'bottom',
    who: 'SMSLocal',
    time: '11:52am',
    snippet: 'Call · 2:14 — note added, confirmed by phone',
  },
  {
    key: 'ig',
    label: 'Instagram',
    icon: <IconGlobe />,
    x: 92,
    pos: 'top',
    align: 'end',
    who: 'Emma Clarke',
    time: '2:15pm',
    snippet: 'Got it today, thank you! 📦',
  },
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
          <div className="ichop-glow" aria-hidden="true" />

          <div className="ichop-ticket">
            <span className="ichop-ticket-dot" />
            Ticket #4821 · Emma Clarke — one thread, 5 hops, still open
          </div>

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
                <span className={`ichop-bubble is-${n.align || 'center'}`}>
                  <span className="ichop-bubble-head">
                    <b>{n.who}</b>
                    <i>{n.time}</i>
                  </span>
                  {n.snippet}
                </span>
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
