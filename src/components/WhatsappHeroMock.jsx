import { useEffect, useState } from 'react'
import './WhatsappHeroMock.css'
import { IconChat } from './icons.jsx'

const THREAD = [
  { from: 'in', text: 'Hi, I need help with my recent order' },
  { from: 'out', text: "Sure — share your order ID and I'll check right now." },
  { from: 'in', text: "It's #ORD-8821" },
  { from: 'out', text: 'Found it! Shipped today, arriving by Thursday. Want the tracking link?' },
  { from: 'in', text: 'Yes please' },
  { from: 'out', text: 'Here you go: smslocal.link/8821 — anything else?' },
]

const HOLD = 3

function WhatsappHeroMock() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= THREAD.length + HOLD ? 1 : s + 1))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, THREAD.length)
  const nextIsOut = step < THREAD.length && THREAD[step]?.from === 'out'

  return (
    <div className="wamock-phone">
      <span className="wamock-btn wamock-btn--mute" aria-hidden="true" />
      <span className="wamock-btn wamock-btn--vol-up" aria-hidden="true" />
      <span className="wamock-btn wamock-btn--vol-down" aria-hidden="true" />
      <span className="wamock-btn wamock-btn--power" aria-hidden="true" />

      <div className="wamock-screen">
        <div className="wamock-statusbar">
          <span className="wamock-time">9:41</span>
          <span className="wamock-island" aria-hidden="true" />
          <span className="wamock-status-icons">
            <span className="wamock-signal">
              <i style={{ height: '4px' }} />
              <i style={{ height: '6px' }} />
              <i style={{ height: '8px' }} />
              <i style={{ height: '10px' }} />
            </span>
            <span className="wamock-battery" />
          </span>
        </div>

        <div className="wamock-header">
          <span className="wamock-avatar"><IconChat /></span>
          <div className="wamock-header-text">
            <strong>SMSLocal Support</strong>
            <span><span className="wamock-online-dot" />Online via WhatsApp Business API</span>
          </div>
          <span className="wamock-verified">Verified ✓</span>
        </div>

        <div className="wamock-thread">
          {THREAD.slice(0, shown).map((msg, i) => (
            <div className={`wamock-bubble ${msg.from} wamock-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
              {msg.text}
            </div>
          ))}
          {nextIsOut && (
            <div className="wamock-bubble out wamock-typing">
              <i /><i /><i />
            </div>
          )}
        </div>

        <span className="wamock-home-indicator" />
      </div>
    </div>
  )
}

export default WhatsappHeroMock
