import { useEffect, useRef, useState } from 'react'
import './EmailOneApi.css'

/**
 * "One API for email and SMS" — rebuilt as a live send simulator instead of
 * a static fork diagram. A "Simulate a bounce" switch plus a "Send test
 * email" button actually change what happens: normally email delivers and
 * the SMS branch sits on standby; flip the switch and the email bounces
 * while SMS lights up and carries the message instead — the fallback
 * story, played out on demand rather than just described.
 */
function EmailOneApi() {
  const [phase, setPhase] = useState('idle') // idle | sending | done
  const [bounce, setBounce] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const send = () => {
    clearTimeout(timeoutRef.current)
    setPhase('sending')
    timeoutRef.current = setTimeout(() => setPhase('done'), 900)
  }

  const emailFailed = phase === 'done' && bounce
  const smsActive = phase === 'done' && bounce

  return (
    <section className="section oapi-section">
      <div className="container">
        <h2 className="section-title">One API for email and SMS</h2>
        <p className="section-subtitle">Try it — flip the switch, then send, and watch where the message actually lands.</p>

        <div className="oapi">
          <div className="oapi-controls">
            <label className="oapi-switch">
              <input type="checkbox" checked={bounce} onChange={(e) => setBounce(e.target.checked)} />
              <span className="oapi-switch-track"><span className="oapi-switch-thumb" /></span>
              Simulate a bounce
            </label>

            <button type="button" className="oapi-send-btn" onClick={send} disabled={phase === 'sending'}>
              {phase === 'sending' ? 'Sending…' : '▶ Send test email'}
            </button>
          </div>

          <div className="oapi-call">
            <code className="oapi-endpoint">POST /v1/send</code>
            <span className="oapi-tag">REST&nbsp;·&nbsp;SMTP</span>
          </div>

          <div className={`oapi-fork${phase === 'sending' ? ' is-sending' : ''}`} aria-hidden="true">
            <span className="oapi-fork-line oapi-fork-line--left" />
            <span className="oapi-fork-line oapi-fork-line--right" />
            <span className="oapi-pulse oapi-pulse--left" />
            <span className="oapi-pulse oapi-pulse--right" />
          </div>

          <div className="oapi-outs">
            <div className={`oapi-channel${emailFailed ? ' is-failed' : ''}`}>
              <span className="oapi-badge">Email</span>
              <div className="oapi-email">
                <div className="oapi-email-head">
                  <span className="oapi-avatar">SL</span>
                  <strong>SMSLocal</strong>
                  <span className={`oapi-tick${emailFailed ? ' oapi-tick--fail' : ''}`}>{emailFailed ? '✕' : '✓'}</span>
                </div>
                <span className="oapi-subject">Your order #4021 is confirmed</span>
                <span className="oapi-hero" />
                <span className="oapi-btn">Track order</span>
                {emailFailed && <span className="oapi-overlay">Bounced — inbox unreachable</span>}
              </div>
              <span className="oapi-cap">
                {emailFailed ? 'Delivery failed — falling back automatically' : 'Templates that render in every inbox'}
              </span>
            </div>

            <div className={`oapi-channel${smsActive ? ' is-active' : ''}${phase === 'done' && !bounce ? ' is-standby' : ''}`}>
              <span className="oapi-badge oapi-badge--sms">SMS fallback</span>
              <div className="oapi-sms">
                <span className="oapi-bubble">SMSLocal: Order #4021 confirmed — track: bit.ly/x8f2qa</span>
                {smsActive && <span className="oapi-sms-tick">✓ Delivered</span>}
              </div>
              <span className="oapi-cap">
                {phase !== 'done' ? 'Standing by — only sends if email doesn’t land' : smsActive ? 'Caught the bounce and delivered as text' : 'Not needed this time — email landed fine'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailOneApi
