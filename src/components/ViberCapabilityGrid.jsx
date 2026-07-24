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
      <div className="vbcap-preview">Order #4821 has shipped — track it here.</div>
      <div className="vbcap-footer">Delivered to 4,812 opted-in contacts</div>
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
  { icon: <IconShield />, title: 'Verified broadcasts.', desc: 'Every broadcast goes out under a verified business sender — your logo, business name and the Viber badge — so your full opted-in list sees who is actually messaging them.', mock: <VerifiedMiniMock /> },
  { icon: <IconRefresh />, title: 'Replies, not dead ends.', desc: 'A reply to a broadcast opens as a real two-way conversation your team can answer, instead of disappearing into an app nobody is watching after the send.', mock: <ConversionMiniMock /> },
  { icon: <IconMail />, title: 'One inbox, one record.', desc: 'Viber sits beside WhatsApp, SMS and web chat on one customer record, so whoever picks the thread up already has the full history — no reply ever starts from zero.', mock: <OneRecordMiniMock /> },
]

function ViberCapabilityGrid() {
  return (
    <section className="section vbcap-section">
      <div className="container vbcap-inner">
        <div className="vbcap-copyside">
          <span className="vbcap-eyebrow">/02 What you get</span>
          <h2 className="vbcap-title">Everything a broadcast should carry with it</h2>
          <p className="vbcap-sub">Three things that change the moment Viber stops living on its own.</p>

          {/* the copy swaps with whichever mock is at the front of the deck */}
          <div className="vbcap-captions">
            {ITEMS.map((item, i) => (
              <div className="vbcap-caption" key={item.title} style={{ '--i': i }}>
                <span className="vbcap-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* three mocks stacked as a deck, cycling front to back */}
        <div className="vbcap-deck" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <div className="vbcap-slot" key={item.title} style={{ '--i': i }}>
              {item.mock}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ViberCapabilityGrid
