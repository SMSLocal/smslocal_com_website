import './UnifiedInboxTimeline.css'
import { IconMic, IconChat, IconMail } from './icons.jsx'

const EVENTS = [
  { time: '9:14 AM', channel: 'Email', tag: 'Resolved', icon: <IconMail />, tint: 'email', text: 'Invoice for last order?' },
  { time: '11:02 AM', channel: 'SMS', tag: 'Resolved', icon: <IconChat />, tint: 'sms', text: 'Is my code still valid?' },
  { time: '2:30 PM', channel: 'WhatsApp', tag: 'Resolved', icon: <IconChat />, tint: 'wa', text: 'Do you deliver to Pune?' },
  { time: '4:45 PM', channel: 'Voice', tag: 'Transcribed', icon: <IconMic />, tint: 'voice', text: 'Called about order #7734' },
]

function UnifiedInboxTimeline() {
  return (
    <div className="uit" role="img" aria-label="One customer record showing an email, SMS, WhatsApp message and voice call from the same day, all on a single merged timeline">
      <div className="uit-head">
        <span className="uit-avatar">AK</span>
        <div>
          <strong>Aditi Kapoor</strong>
          <span>+91 98450 12210 · 4 channels, 1 customer record</span>
        </div>
      </div>

      <div className="uit-timeline">
        {EVENTS.map((e, i) => (
          <div className="uit-row" key={e.channel}>
            <span className="uit-time">{e.time}</span>
            <span className={`uit-ic uit-ic--${e.tint}`}>{e.icon}</span>
            {i < EVENTS.length - 1 && <span className="uit-line" aria-hidden="true" />}
            <div className="uit-body">
              <div className="uit-body-head">
                <strong>{e.channel}</strong>
                <span className="uit-tag">
                  <svg viewBox="0 0 24 24" width="9" height="9" aria-hidden="true">
                    <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {e.tag}
                </span>
              </div>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="uit-foot">
        <span className="uit-foot-dot" />
        Same customer record, every channel
      </div>
    </div>
  )
}

export default UnifiedInboxTimeline
