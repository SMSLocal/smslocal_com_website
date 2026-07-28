import './KakaoTalkCapabilityGrid.css'
import { IconShield, IconRefresh, IconMail } from './icons.jsx'

/**
 * "What you get" for /channels/kakaotalk — a rotating deck of three concrete
 * mini-mocks (verified AlimTalk notice, broadcast-to-reply numbers, one
 * customer record across channels), copy swapping alongside whichever mock
 * is at the front. Mirrors ViberCapabilityGrid's shape with its own classes
 * and content — not a row of icon tiles.
 */

function VerifiedMiniMock() {
  return (
    <div className="ktcap-mock">
      <div className="ktcap-sender-row">
        <span className="ktcap-sender-avatar" />
        <strong>SMSLocal</strong>
        <span className="ktcap-sender-tick">✓</span>
      </div>
      <div className="ktcap-tag-row">
        <span className="ktcap-tag">Kakao Channel</span>
        <span className="ktcap-tag">AlimTalk template</span>
        <span className="ktcap-tag">Verified sender</span>
      </div>
      <div className="ktcap-preview">Order #7734 confirmed — arriving Thursday.</div>
      <div className="ktcap-footer">Delivered to 6,240 channel friends</div>
    </div>
  )
}

function ConversionMiniMock() {
  return (
    <div className="ktcap-mock">
      <div className="ktcap-row">
        <span>FriendTalk sent</span>
        <span className="ktcap-pill sent">6,240</span>
      </div>
      <div className="ktcap-row">
        <span>Replies received</span>
        <span className="ktcap-pill replied">918</span>
      </div>
      <div className="ktcap-footer">Every reply opens as a real conversation</div>
    </div>
  )
}

function OneRecordMiniMock() {
  return (
    <div className="ktcap-mock">
      <div className="ktcap-row">
        <span className="ktcap-channel">KakaoTalk</span>
        <span>Does this ship internationally?</span>
      </div>
      <div className="ktcap-row">
        <span className="ktcap-channel">WhatsApp</span>
        <span>Order #7734 update please</span>
      </div>
      <div className="ktcap-row">
        <span className="ktcap-channel">SMS</span>
        <span>Is my code still valid?</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { icon: <IconShield />, title: 'Verified notices.', desc: 'Every AlimTalk notice and FriendTalk broadcast goes out under a verified Kakao Channel — your logo, business name and sender approval — so customers see who is actually messaging them.', mock: <VerifiedMiniMock /> },
  { icon: <IconRefresh />, title: 'Replies, not dead ends.', desc: 'A reply to a notice or broadcast opens as a real two-way conversation your team can answer, instead of disappearing into an app nobody is watching after the send.', mock: <ConversionMiniMock /> },
  { icon: <IconMail />, title: 'One inbox, one record.', desc: 'KakaoTalk sits beside WhatsApp, SMS and web chat on one customer record, so whoever picks the thread up already has the full history — no reply ever starts from zero.', mock: <OneRecordMiniMock /> },
]

function KakaoTalkCapabilityGrid() {
  return (
    <section className="section ktcap-section">
      <div className="container ktcap-inner">
        <div className="ktcap-copyside">
          <span className="ktcap-eyebrow">Capabilities</span>
          <h2 className="ktcap-title">Everything a Kakao Channel can really do</h2>
          <p className="ktcap-sub">Three things that change the moment KakaoTalk stops living on its own.</p>

          <div className="ktcap-captions">
            {ITEMS.map((item, i) => (
              <div className="ktcap-caption" key={item.title} style={{ '--i': i }}>
                <span className="ktcap-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ktcap-deck" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <div className="ktcap-slot" key={item.title} style={{ '--i': i }}>
              {item.mock}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KakaoTalkCapabilityGrid
