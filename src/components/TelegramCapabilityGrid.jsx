import './TelegramCapabilityGrid.css'
import { IconCursor, IconMegaphone, IconUsers } from './icons.jsx'

function KeyboardMiniMock() {
  return (
    <div className="tgcap-mock">
      <div className="tgcap-bubble">Pick a size 👇</div>
      <div className="tgcap-key-grid">
        <span className="tgcap-key">S</span>
        <span className="tgcap-key">M</span>
        <span className="tgcap-key">L</span>
        <span className="tgcap-key">XL</span>
      </div>
    </div>
  )
}

function BroadcastMiniMock() {
  return (
    <div className="tgcap-mock">
      <div className="tgcap-row">
        <span>New drop announced</span>
        <span className="tgcap-pill">12,480 views</span>
      </div>
      <div className="tgcap-row">
        <span>Restock alert</span>
        <span className="tgcap-pill">9,102 views</span>
      </div>
    </div>
  )
}

function HandoffMiniMock() {
  return (
    <div className="tgcap-mock">
      <div className="tgcap-row">
        <span>Bot resolved</span>
        <span className="tgcap-status bot">auto</span>
      </div>
      <div className="tgcap-row">
        <span>Escalated to agent</span>
        <span className="tgcap-status human">Aisha</span>
      </div>
      <div className="tgcap-footer">Full history follows the handoff</div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconCursor />, title: 'Inline keyboards that convert.', desc: 'Buttons live right under the message, so customers tap instead of typing out an answer.', mock: <KeyboardMiniMock /> },
  { icon: <IconMegaphone />, title: 'Channels for broadcast.', desc: 'Publish one-way announcements to subscribers, separate from your two-way bot conversations.', mock: <BroadcastMiniMock /> },
  { icon: <IconUsers />, title: 'Bots that hand off cleanly.', desc: "When a bot can't help, the conversation and its full history move straight to a live agent.", mock: <HandoffMiniMock /> },
]

function TelegramCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What automation looks like on Telegram</h2>
        <p className="section-subtitle">Three things that change the moment a bot stops being just a command list.</p>
        <div className="tgcap-grid">
          {ITEMS.map((item) => (
            <div className="tgcap-card" key={item.title}>
              <span className="tgcap-icon">{item.icon}</span>
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

export default TelegramCapabilityGrid
