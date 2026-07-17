import { useEffect, useState } from 'react'
import './RcsHeroMock.css'
import { IconCheck } from './icons.jsx'

const CHIPS = ['Track order', 'Reschedule', 'Talk to us']

function RcsHeroMock() {
  const [active, setActive] = useState(-1)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let start = Date.now()
    let phase = 'idle'

    const id = setInterval(() => {
      const elapsed = Date.now() - start

      if (phase === 'idle' && elapsed >= 1400) {
        setActive(0)
        phase = 'chosen'
        start = Date.now()
      } else if (phase === 'chosen' && elapsed >= 600) {
        setSent(true)
        phase = 'sent'
        start = Date.now()
      } else if (phase === 'sent' && elapsed >= 3400) {
        setActive(-1)
        setSent(false)
        phase = 'idle'
        start = Date.now()
      }
    }, 100)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="rcsmock-phone">
      <span className="rcsmock-camera" aria-hidden="true" />

      <div className="rcsmock-statusbar">
        <span>9:41</span>
        <span className="rcsmock-statusbar-right">
          <span className="rcsmock-signal" />
          RCS
        </span>
      </div>

      <div className="rcsmock-header">
        <span className="rcsmock-avatar">SL</span>
        <div className="rcsmock-header-text">
          <strong>SMSLocal <IconCheck /></strong>
          <span>Verified business · RCS</span>
        </div>
        <span className="rcsmock-call-icon">📞</span>
      </div>

      <div className="rcsmock-scroll">
        <div className="rcsmock-richcard">
          <div className="rcsmock-richcard-media">
            <span className="rcsmock-richcard-badge">Rich card</span>
          </div>
          <div className="rcsmock-richcard-body">
            <strong>Your order is out for delivery</strong>
            <p>Track it live, reschedule the slot, or chat with our team — right from this message.</p>
            <a className="rcsmock-richcard-link">Track shipment ↗</a>
          </div>
        </div>

        <div className="rcsmock-chip-row">
          {CHIPS.map((c, i) => (
            <span className={`rcsmock-chip${i === active ? ' is-active' : ''}`} key={c}>{c}</span>
          ))}
        </div>

        {sent && (
          <div className="rcsmock-sent-row">
            <div className="rcsmock-sent-bubble">
              {CHIPS[active] ?? CHIPS[0]}
              <span>9:42 ✓✓</span>
            </div>
          </div>
        )}
      </div>

      <div className="rcsmock-inputbar">
        <span>RCS message</span>
        <span className="rcsmock-send-btn">➤</span>
      </div>
    </div>
  )
}

export default RcsHeroMock
