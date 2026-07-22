import './EmailOneApi.css'

/**
 * Bespoke capabilities section for /email-api.
 * Proves the headline literally: one /send call forks into an email render AND
 * an SMS — folding the three capabilities (templates render everywhere,
 * REST/SMTP, SMS fallback) into a single "one API, two channels" picture.
 */
function EmailOneApi() {
  return (
    <section className="section oapi-section">
      <div className="container">
        <h2 className="section-title">One API for email and SMS</h2>
        <p className="section-subtitle">Three things that change when email stops being a separate system.</p>

        <div className="oapi">
          <div className="oapi-call">
            <code className="oapi-endpoint">POST /v1/send</code>
            <span className="oapi-tag">REST&nbsp;·&nbsp;SMTP</span>
          </div>

          <div className="oapi-fork" aria-hidden="true" />

          <div className="oapi-outs">
            <div className="oapi-channel">
              <span className="oapi-badge">Email</span>
              <div className="oapi-email">
                <div className="oapi-email-head">
                  <span className="oapi-avatar">SL</span>
                  <strong>SMSLocal</strong>
                  <span className="oapi-tick">✓</span>
                </div>
                <span className="oapi-subject">Your order #4021 is confirmed</span>
                <span className="oapi-hero" />
                <span className="oapi-btn">Track order</span>
              </div>
              <span className="oapi-cap">Templates that render in every inbox</span>
            </div>

            <div className="oapi-channel">
              <span className="oapi-badge oapi-badge--sms">SMS fallback</span>
              <div className="oapi-sms">
                <span className="oapi-bubble">SMSLocal: Order #4021 confirmed — track: bit.ly/x8f2qa</span>
              </div>
              <span className="oapi-cap">The same send, delivered as text when email doesn&rsquo;t land</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailOneApi
