import { useEffect, useState } from 'react'
import './EmailHeroMock.css'

const FUNNEL = [
  { label: 'Sent', value: '10,000', pct: 100 },
  { label: 'Delivered', value: '9,840', pct: 98 },
  { label: 'Opened', value: '6,120', pct: 61 },
  { label: 'Clicked', value: '1,480', pct: 15 },
]

function EmailHeroMock() {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    let start = Date.now()
    let phase = 'in'

    const id = setInterval(() => {
      const elapsed = Date.now() - start
      if (phase === 'in' && elapsed >= 500) {
        setFilled(true)
        phase = 'hold'
        start = Date.now()
      } else if (phase === 'hold' && elapsed >= 4000) {
        setFilled(false)
        phase = 'in'
        start = Date.now()
      }
    }, 100)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="emock" role="img" aria-label="An email send with a delivery funnel from sent to clicked, and unreachable inboxes falling back to SMS">
      <span className="emock-tag">
        <i className="emock-tag-dot" />
        Sending
      </span>

      <div className="emock-preview">
        <div className="emock-preview-row"><span>To</span><strong>customer@example.com</strong></div>
        <div className="emock-preview-row"><span>Subject</span><strong>Your order has shipped 📦</strong></div>
        <p className="emock-preview-body">Hi there — good news, order #8821 is on its way and should arrive by Thursday…</p>
      </div>

      <div className="emock-funnel">
        {FUNNEL.map((f) => (
          <div className="emock-funnel-row" key={f.label}>
            <span className="emock-funnel-label">{f.label}</span>
            <div className="emock-funnel-track">
              <div className="emock-funnel-fill" style={{ width: filled ? `${f.pct}%` : '0%' }} />
            </div>
            <span className="emock-funnel-value">{f.value}</span>
          </div>
        ))}
      </div>

      <span className="emock-footer">
        <i className="emock-footer-dot" />
        214 unreachable inboxes fell back to SMS automatically
      </span>
    </div>
  )
}

export default EmailHeroMock
