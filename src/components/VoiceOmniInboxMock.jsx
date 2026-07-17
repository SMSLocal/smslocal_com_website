import './VoiceOmniInboxMock.css'
import { IconMic, IconChat, IconMail } from './icons.jsx'

const ROWS = [
  { channel: 'Voice', text: 'Called about order #7734', tag: 'Transcribed', icon: <IconMic />, tint: 'voice' },
  { channel: 'WhatsApp', text: 'Do you deliver to Pune?', tag: 'Resolved', icon: <IconChat />, tint: 'wa' },
  { channel: 'SMS', text: 'Is my code still valid?', tag: 'Resolved', icon: <IconChat />, tint: 'sms' },
  { channel: 'Email', text: 'Invoice for last order?', tag: 'Resolved', icon: <IconMail />, tint: 'email' },
]

function VoiceOmniInboxMock() {
  return (
    <div className="voim" role="img" aria-label="Voice, WhatsApp, SMS and email conversations merging into one customer record">
      <div className="voim-row">
        {ROWS.map((r) => (
          <div className="voim-item" key={r.channel}>
            <span className={`voim-ic voim-ic--${r.tint}`}>{r.icon}</span>
            <div className="voim-item-head">
              <strong>{r.channel}</strong>
              <span className="voim-tag">
                <svg viewBox="0 0 24 24" width="9" height="9" aria-hidden="true">
                  <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {r.tag}
              </span>
            </div>
            <p className="voim-text">{r.text}</p>
            <span className="voim-drop" aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="voim-merge">
        <span className="voim-merge-dot" />
        Same customer record, every channel
      </div>
    </div>
  )
}

export default VoiceOmniInboxMock
