import { useEffect, useState } from 'react'
import './TelegramHeroMock.css'
import { IconRobot, IconCheck } from './icons.jsx'

const KEYBOARD = ['📦 Track Order', '💬 Talk to Support', '🛍️ Browse Catalog', '❓ FAQ']

const TURNS = [
  { from: 'in', text: '/start' },
  { from: 'out', text: 'Welcome! Choose an option below 👇', keyboard: true },
  { from: 'in', text: '📦 Track Order' },
  { from: 'out', text: 'Order #TG-5521 is out for delivery 🚚' },
]

const HOLD = 3

function TelegramHeroMock() {
  const [step, setStep] = useState(1)
  const [tapped, setTapped] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TURNS.length + HOLD ? 1 : s + 1))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setTapped(step >= 3)
  }, [step])

  const shown = Math.min(step, TURNS.length)
  const nextIsOut = step < TURNS.length && TURNS[step]?.from === 'out'

  return (
    <div className="tgmock" role="img" aria-label="A Telegram bot conversation with an inline keyboard, resolving an order tracking request">
      <span className="tgmock-tag">
        <span className="tgmock-tag-icon"><IconRobot /></span>
        @yourbrand_bot <IconCheck /> · Telegram bot
      </span>

      <div className="tgmock-thread">
        {TURNS.slice(0, shown).map((t, i) => (
          <div className={`tgmock-msg tgmock-${t.from} tgmock-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            <div className="tgmock-bubble">{t.text}</div>
            {t.keyboard && (
              <div className="tgmock-keyboard">
                {KEYBOARD.map((k, ki) => (
                  <span className={`tgmock-key${ki === 0 && tapped ? ' is-tapped' : ''}`} key={k}>{k}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {nextIsOut && (
          <div className="tgmock-msg tgmock-out">
            <div className="tgmock-bubble tgmock-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="tgmock-footer">
        <span className="tgmock-input">Message</span>
        <span className="tgmock-commands">/start · /help · /track</span>
      </div>
    </div>
  )
}

export default TelegramHeroMock
