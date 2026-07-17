import { useEffect, useState } from 'react'
import './AppleMessagesHeroMock.css'

const SLOTS = ['Today, 4:30 PM', 'Tomorrow, 11:00 AM', 'Tomorrow, 2:15 PM']
const TOTAL_STEPS = 5
const HOLD = 3

function AppleMessagesHeroMock() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TOTAL_STEPS + HOLD ? 1 : s + 1))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, TOTAL_STEPS)

  return (
    <div className="amock" role="img" aria-label="An iMessage business chat rescheduling an appointment with a time picker and Apple Pay deposit">
      <span className="amock-tag">
        <span className="amock-avatar">SL</span>
        SMSLocal · Business Chat
      </span>

      <div className="amock-thread">
        {shown >= 1 && (
          <div className="amock-bubble in amock-pop">Hi, can I reschedule my fitting appointment?</div>
        )}

        {shown >= 2 && (
          <div className="amock-bubble out amock-pop">
            Sure! Pick a new time below.
            <span className="amock-tapback">❤️</span>
          </div>
        )}

        {shown >= 3 && (
          <div className="amock-list-picker amock-pop">
            <span className="amock-list-title">📅 Choose a time</span>
            {SLOTS.map((s) => (
              <span className="amock-list-row" key={s}>{s}</span>
            ))}
          </div>
        )}

        {shown >= 4 && (
          <div className="amock-bubble in amock-pop">Tomorrow at 11 works great</div>
        )}

        {shown >= 5 && (
          <div className="amock-paypill amock-pop"> Pay $0 deposit with Apple Pay</div>
        )}
      </div>
    </div>
  )
}

export default AppleMessagesHeroMock
