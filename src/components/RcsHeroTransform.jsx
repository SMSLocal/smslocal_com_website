import './RcsHeroTransform.css'
import { IconCheck, IconShield, IconPackage, IconCursor } from './icons.jsx'

/**
 * Hero visual for the RCS Business Messaging page — a phone showing the
 * actual RCS rich-card thread, with three floating feature badges (verified
 * sender, rich cards, quick replies) drifting independently around it.
 * Rebuilt from scratch after the previous transform-sequence version had
 * elements silently clipped by an ancestor's overflow:hidden; this version
 * uses simple, independent animations per element instead of one fragile
 * multi-stage synchronized sequence.
 */
function RcsHeroTransform() {
  return (
    <div className="rcshero" aria-hidden="true">
      <span className="rcshero-glow" />

      <span className="rcshero-badge rcshero-badge--a">
        <IconShield />
        Verified sender
      </span>
      <span className="rcshero-badge rcshero-badge--b">
        <IconPackage />
        Rich cards
      </span>
      <span className="rcshero-badge rcshero-badge--c">
        <IconCursor />
        Quick replies
      </span>

      <div className="rcshero-phone">
        <span className="rcshero-btn rcshero-btn--mute" />
        <span className="rcshero-btn rcshero-btn--vol-up" />
        <span className="rcshero-btn rcshero-btn--vol-down" />
        <span className="rcshero-btn rcshero-btn--power" />

        <div className="rcshero-screen">
          <div className="rcshero-statusbar">
            <span>9:41</span>
            <span className="rcshero-island" />
          </div>

          <div className="rcshero-header">
            <span className="rcshero-avatar">SL</span>
            <div className="rcshero-header-text">
              <strong>
                SMSLocal
                <span className="rcshero-verified"><IconCheck /></span>
              </strong>
              <span>Verified business · RCS</span>
            </div>
          </div>

          <div className="rcshero-thread">
            <div className="rcshero-bubble rcshero-bubble--in">
              Hi, when will my order arrive?
            </div>

            <div className="rcshero-card">
              <div className="rcshero-card-media">
                <span className="rcshero-media-badge">Rich card</span>
              </div>
              <div className="rcshero-card-body">
                <strong>Your order is out for delivery</strong>
                <p>Track it live or reschedule the slot — right from this message.</p>
              </div>
              <div className="rcshero-card-actions">
                <span className="rcshero-card-btn rcshero-card-btn--solid">Track order</span>
                <span className="rcshero-card-btn">Reschedule</span>
              </div>
            </div>
          </div>

          <span className="rcshero-home-indicator" />
        </div>
      </div>
    </div>
  )
}

export default RcsHeroTransform
