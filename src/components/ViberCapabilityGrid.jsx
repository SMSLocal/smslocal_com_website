import './ViberCapabilityGrid.css'
import { IconShield, IconRefresh, IconMail } from './icons.jsx'

function VerifiedMiniMock() {
  return (
    <div className="vbcap-mock">
      <div className="vbcap-sender-row">
        <span className="vbcap-sender-avatar" />
        <strong>SMSLocal</strong>
        <span className="vbcap-sender-tick">✓</span>
      </div>
      <div className="vbcap-tag-row">
        <span className="vbcap-tag">Logo</span>
        <span className="vbcap-tag">Business name</span>
        <span className="vbcap-tag">Verified badge</span>
      </div>
    </div>
  )
}

function ConversionMiniMock() {
  return (
    <div className="vbcap-mock">
      <div className="vbcap-row">
        <span>Broadcast sent</span>
        <span className="vbcap-pill sent">4,812</span>
      </div>
      <div className="vbcap-row">
        <span>Replies received</span>
        <span className="vbcap-pill replied">842</span>
      </div>
      <div className="vbcap-footer">Every reply opens as a real conversation</div>
    </div>
  )
}

function OneRecordMiniMock() {
  return (
    <div className="vbcap-mock">
      <div className="vbcap-row">
        <span className="vbcap-channel">Viber</span>
        <span>Does this work on the annual plan?</span>
      </div>
      <div className="vbcap-row">
        <span className="vbcap-channel">WhatsApp</span>
        <span>Order #8821 update please</span>
      </div>
      <div className="vbcap-row">
        <span className="vbcap-channel">SMS</span>
        <span>Is my code still valid?</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconShield />, title: 'Verified broadcasts.', desc: 'Send under a verified business sender — logo, name and badge — to your full opted-in Viber list.', mock: <VerifiedMiniMock /> },
  { icon: <IconRefresh />, title: 'Replies, not dead ends.', desc: 'Every reply to a broadcast opens as a real two-way conversation instead of disappearing into Viber.', mock: <ConversionMiniMock /> },
  { icon: <IconMail />, title: 'One inbox, one record.', desc: 'Viber sits beside WhatsApp, SMS and web chat, so no reply ever starts from zero.', mock: <OneRecordMiniMock /> },
]

function ViberCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <span className="vbcap-eyebrow">/02 What you get</span>
        <h2 className="section-title">Everything a broadcast should carry with it</h2>
        <p className="section-subtitle">Three things that change the moment Viber stops living on its own.</p>
        <div className="vbcap-grid">
          {ITEMS.map((item) => (
            <div className="vbcap-card" key={item.title}>
              <span className="vbcap-icon">{item.icon}</span>
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

export default ViberCapabilityGrid
