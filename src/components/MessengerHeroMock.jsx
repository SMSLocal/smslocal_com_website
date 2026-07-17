import { useEffect, useState } from 'react'
import './MessengerHeroMock.css'
import { IconPackage, IconUsers, IconChat } from './icons.jsx'

const MENU_ITEMS = [
  { icon: <IconPackage />, label: 'Track order' },
  { icon: <IconUsers />, label: 'Talk to human' },
  { icon: <IconChat />, label: 'FAQs' },
]

const TURNS = [
  { from: 'in', text: 'Hi! Does the starter plan include the API, or is that a separate add-on?', time: '2:14 PM' },
  { from: 'out', text: "It's included — the starter plan covers full API access, no add-on needed 🙂" },
]

const HOLD = 3

function MessengerHeroMock() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TURNS.length + HOLD ? 1 : s + 1))
    }, 1700)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, TURNS.length)
  const nextIsOut = step < TURNS.length && TURNS[step]?.from === 'out'
  const done = shown >= TURNS.length

  return (
    <div className="msgmock" role="img" aria-label="A Messenger conversation with quick menu options, resolved by the AI within the reply window">
      <div className="msgmock-tag">
        <span className="msgmock-avatar">A</span>
        <div className="msgmock-tag-text">
          <strong>Aditi K.</strong>
          <span><span className="msgmock-online-dot" />Active now on Messenger</span>
        </div>
        <span className="msgmock-ai-badge">✦ AI answering</span>
      </div>

      <div className="msgmock-menu-row">
        {MENU_ITEMS.map((item) => (
          <div className="msgmock-menu-item" key={item.label}>
            <span className="msgmock-menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="msgmock-thread">
        <span className="msgmock-system-pill">🔒 Within the 24-hour reply window</span>

        {TURNS.slice(0, shown).map((t, i) => (
          <div className={`msgmock-bubble ${t.from} msgmock-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            {t.text}
            {t.time && <span className="msgmock-time">{t.time}</span>}
          </div>
        ))}

        {nextIsOut && (
          <div className="msgmock-bubble out msgmock-typing"><i /><i /><i /></div>
        )}

        {done && (
          <div className="msgmock-quick-replies">
            <span className="msgmock-quick-chip">See pricing</span>
            <span className="msgmock-quick-chip">Talk to sales</span>
          </div>
        )}
      </div>

      <div className="msgmock-inputbar">
        <span>Message Aditi K…</span>
        <span className="msgmock-send-btn">➤</span>
      </div>
    </div>
  )
}

export default MessengerHeroMock
