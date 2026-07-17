import './InstagramCapabilityGrid.css'
import { IconBell, IconChat, IconMail } from './icons.jsx'

function NeverMissMock() {
  return (
    <div className="igcap-mock">
      <div className="igcap-row">
        <span>New DM received</span>
        <span className="igcap-status replied">auto-replied</span>
      </div>
      <div className="igcap-row">
        <span>Story reply received</span>
        <span className="igcap-status replied">auto-replied</span>
      </div>
    </div>
  )
}

function CommentToDmMock() {
  return (
    <div className="igcap-mock">
      <div className="igcap-comment">"Is this available in blue? 👀"</div>
      <div className="igcap-arrow">↓ moved to DM</div>
      <div className="igcap-dm">Hi! Yes, blue is in stock — want the link?</div>
    </div>
  )
}

function OneInboxMock() {
  return (
    <div className="igcap-mock">
      <div className="igcap-row">
        <span className="igcap-channel">Instagram</span>
        <span>Do you have this in size M?</span>
      </div>
      <div className="igcap-row">
        <span className="igcap-channel">WhatsApp</span>
        <span>Order #8821 update please</span>
      </div>
      <div className="igcap-row">
        <span className="igcap-channel">SMS</span>
        <span>Is my code still valid?</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconBell />, title: 'Never miss a DM.', desc: 'Auto-replies answer common questions the moment a message or story reply lands — day or night.', mock: <NeverMissMock /> },
  { icon: <IconChat />, title: 'Comments become conversations.', desc: 'A public comment on your post gets pulled into a private DM automatically, so interested buyers never fall through.', mock: <CommentToDmMock /> },
  { icon: <IconMail />, title: 'One inbox for every reply.', desc: 'Instagram sits beside WhatsApp and SMS in the same shared inbox, so your team never checks four apps.', mock: <OneInboxMock /> },
]

function InstagramCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What automation looks like on Instagram</h2>
        <p className="section-subtitle">Three things that change the moment DMs stop being manual.</p>
        <div className="igcap-grid">
          {ITEMS.map((item) => (
            <div className="igcap-card" key={item.title}>
              <span className="igcap-icon">{item.icon}</span>
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

export default InstagramCapabilityGrid
