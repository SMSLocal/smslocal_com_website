import './ViberHeroMock.css'
import { IconMic, IconPhone } from './icons.jsx'

function ViberHeroMock() {
  return (
    <div className="vbmock" role="img" aria-label="A Viber call ringing in, with prior chat history and order context already attached">
      <span className="vbmock-tag">
        <i className="vbmock-tag-dot" />
        Same inbox as chat · Live
      </span>

      <div className="vbmock-contact">
        <span className="vbmock-avatar">M</span>
        <div className="vbmock-contact-text">
          <strong>Meera Anand</strong>
          <span>Order #VB-2201</span>
        </div>
        <div className="vbmock-tag-row">
          <span className="vbmock-tag-pill">LTV $1,860</span>
          <span className="vbmock-tag-pill accent">Loyal · since '23</span>
        </div>
      </div>

      <div className="vbmock-thread">
        <span className="vbmock-thread-head">Prior conversation</span>
        <div className="vbmock-mini-bubble in">Hi! Is my Diwali order still on track?</div>
        <div className="vbmock-mini-bubble out">Yes — dispatched today, tracking below 📦</div>
      </div>

      <div className="vbmock-call">
        <div className="vbmock-call-label">
          <IconPhone /> Viber call <span className="vbmock-ringing">Ringing…</span>
        </div>

        <span className="vbmock-call-avatar-wrap">
          <span className="vbmock-call-ring" />
          <span className="vbmock-call-avatar">M</span>
        </span>
        <strong className="vbmock-call-name">Meera Anand</strong>
        <span className="vbmock-call-number">+91 98XXX XXX01</span>

        <div className="vbmock-call-actions">
          <span className="vbmock-call-btn"><IconMic /></span>
          <span className="vbmock-call-btn end"><IconPhone /></span>
          <span className="vbmock-call-btn">📝</span>
        </div>
      </div>

      <span className="vbmock-note-tag">📝 Notes tied to the record</span>
    </div>
  )
}

export default ViberHeroMock
