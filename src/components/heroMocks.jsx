import './heroMocks.css'

export function BulkSmsMock() {
  return (
    <div className="hmock-card">
      <div className="hmock-head">
        <span className="hmock-dot" />
        Festive Sale Blast
      </div>
      <div className="hmock-progress-track">
        <div className="hmock-progress-fill" style={{ width: '81%' }} />
      </div>
      <div className="hmock-row"><span>14,900 / 18,420 delivered</span><strong>81%</strong></div>
      <div className="hmock-row"><span>Clicked</span><strong style={{ color: "var(--success)" }}>2,318</strong></div>
    </div>
  )
}

export function SmsApiMock() {
  return (
    <div className="hmock-card hmock-code">
      <div className="hmock-code-head">
        <span className="hmock-code-dot red" />
        <span className="hmock-code-dot yellow" />
        <span className="hmock-code-dot green" />
      </div>
      <pre className="hmock-code-body">
{`POST /v1/messages
{
  "to": "+1555010199",
  "body": "Your code is 481920",
  "channel": "sms"
}

→ 200 OK  ·  12ms`}
      </pre>
    </div>
  )
}

export function OtpMock() {
  return (
    <div className="hmock-card hmock-phone">
      <div className="hmock-phone-notch" />
      <p className="hmock-phone-label">Enter verification code</p>
      <div className="hmock-otp-boxes">
        {['4', '8', '1', '9', '2', '0'].map((d, i) => (
          <span key={i} className="hmock-otp-box">{d}</span>
        ))}
      </div>
      <div className="hmock-verified">✓ Verified in 0.9s</div>
    </div>
  )
}

export function WhatsappMock() {
  return (
    <div className="hmock-card">
      <div className="hmock-head"><span className="hmock-dot green" />WhatsApp Business</div>
      <div className="hmock-chat">
        <div className="hmock-bubble user">Is my order shipped?</div>
        <div className="hmock-bubble bot">Yes! Shipped today, tracking sent via SMS 📦</div>
      </div>
    </div>
  )
}

export function ChatbotBuilderMock() {
  return (
    <div className="hmock-card hmock-flow">
      <div className="hmock-flow-node start">Trigger: New chat</div>
      <div className="hmock-flow-line" />
      <div className="hmock-flow-node">Ask: How can we help?</div>
      <div className="hmock-flow-line" />
      <div className="hmock-flow-node accent">Route to AI answer</div>
    </div>
  )
}

export function AiCustomerServiceMock() {
  return (
    <div className="hmock-card">
      <div className="hmock-head"><span className="hmock-dot" />Resolved autonomously</div>
      <div className="hmock-row"><span>💳 Refund issued</span><span className="hmock-check">✓</span></div>
      <div className="hmock-row"><span>📦 Order updated</span><span className="hmock-check">✓</span></div>
      <div className="hmock-row"><span>📧 Confirmation sent</span><span className="hmock-check">✓</span></div>
    </div>
  )
}

export function VoiceMock() {
  return (
    <div className="hmock-card hmock-dark">
      <div className="hmock-head light"><span className="hmock-dot" />Live call · 00:14</div>
      <div className="hmock-wave">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ height: `${10 + Math.abs(10 - i) * 3}px` }} />
        ))}
      </div>
      <p className="hmock-transcript">&ldquo;Sure — I can rebook that for Thursday at 3pm.&rdquo;</p>
    </div>
  )
}

export function AiSdrMock() {
  const steps = ['Lead researched', 'Email sent', 'Reply received', 'Meeting booked']
  return (
    <div className="hmock-card">
      <div className="hmock-head"><span className="hmock-dot" />Outreach sequence</div>
      {steps.map((s) => (
        <div className="hmock-row" key={s}><span>{s}</span><span className="hmock-check">✓</span></div>
      ))}
    </div>
  )
}
