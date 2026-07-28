import './InboxChannelHop.css'
import { IconChat, IconMegaphone, IconMail, IconPhone, IconGlobe, IconCheck } from './icons.jsx'

const THREAD = [
  { key: 'wa', channel: 'WhatsApp', icon: <IconChat />, who: 'Emma Clarke', side: 'in', time: '9:02am', text: 'Hey, is my order #4821 shipped yet?' },
  { key: 'sms', channel: 'SMS', icon: <IconMegaphone />, who: 'SMSLocal', side: 'out', time: '9:03am', text: 'Yep! Tracking: 1Z999AA10123456784.' },
  { key: 'email', channel: 'Email', icon: <IconMail />, who: 'Emma Clarke', side: 'in', time: '11:40am', text: 'Can you add a gift note before it arrives?' },
]

const CHANNEL_TILES = [
  { key: 'wa', label: 'WhatsApp', icon: <IconChat />, note: 'Conversation starts here' },
  { key: 'sms', label: 'SMS', icon: <IconMegaphone />, note: 'Auto-synced, no re-ask' },
  { key: 'email', label: 'Email', icon: <IconMail />, note: 'Gift note attached' },
  { key: 'voice', label: 'Voice', icon: <IconPhone />, note: 'Call · 2:14 logged' },
  { key: 'ig', label: 'Instagram', icon: <IconGlobe />, note: 'Closed out here' },
]

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

        <div className="ichop-bento">
          <div className="ichop-cell ichop-cell-thread">
            <div className="ichop-thread-head">
              <span className="ichop-thread-avatar">EC</span>
              <div>
                <b>Emma Clarke</b>
                <span>Ticket #4821 · 3 of 5 channels shown</span>
              </div>
              <span className="ichop-thread-live">Live</span>
            </div>

            {THREAD.map((m, i) => (
              <div className="ichop-thread-msg" key={m.key}>
                {i > 0 && <span className="ichop-thread-hop">continued on {m.channel}</span>}
                <div className={`ichop-msg is-${m.side}`}>
                  <span className={`ichop-chip chip-${m.key}`}>{m.icon}</span>
                  <div className="ichop-msg-body">
                    <div className="ichop-msg-meta">
                      <b>{m.who}</b>
                      <span className="ichop-msg-channel">{m.channel}</span>
                      <i>{m.time}</i>
                    </div>
                    <p>{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <span className="ichop-thread-more">+ Voice and Instagram continue the same thread →</span>
          </div>

          {CHANNEL_TILES.map((t) => (
            <div className={`ichop-cell ichop-cell-channel chip-${t.key}`} key={t.key}>
              <span className="ichop-tile-icon">{t.icon}</span>
              <b>{t.label}</b>
              <span>{t.note}</span>
            </div>
          ))}

          <div className="ichop-cell ichop-cell-stat">
            <span className="ichop-stat-num">5</span>
            <span className="ichop-stat-label">channels, one open thread</span>
          </div>

          <div className="ichop-cell ichop-cell-note">
            <IconCheck />
            <p>
              <b>Context travels.</b> Order history, past replies and internal notes carry across
              every hop — no one on your team ever asks the customer to repeat themselves.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InboxChannelHop
