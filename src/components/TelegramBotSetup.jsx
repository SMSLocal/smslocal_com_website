import { useEffect, useState } from 'react'
import './TelegramBotSetup.css'

/**
 * "How it works" section for /telegram-business — a live BotFather-style
 * setup transcript that plays out message by message, accumulating (not
 * swapping), with the matching step highlighted as it goes. This is
 * literally how a Telegram bot gets created, not a staggered card layout.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const MESSAGES = [
  { step: 0, from: 'user', text: '/newbot' },
  { step: 0, from: 'bot', text: 'Alright, send me a name for your bot.' },
  { step: 0, from: 'user', text: 'SMSLocal Support' },
  { step: 0, from: 'bot', text: 'Done! @smslocal_bot is ready ✓' },
  { step: 1, from: 'system', text: 'Commands & buttons added — Track Order · Talk to Sales · FAQ' },
  { step: 2, from: 'system', text: '✅ Live — replies now land in your shared inbox' },
]

function TelegramBotSetup({ eyebrow, title, steps }) {
  const [shown, setShown] = useState(1)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= MESSAGES.length) return 0
        return n + 1
      })
    }, 950)
    return () => clearInterval(id)
  }, [])

  const activeStep = MESSAGES[Math.max(0, shown - 1)]?.step ?? 0

  return (
    <section className="section tg-steps">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="tgb-stage">
          <div className="tgb-panel">
            <div className="tgb-head">
              <span className="tgb-avatar">B</span>
              <span>
                <strong>BotFather</strong>
                <span className="tgb-verified">✓ verified bot</span>
              </span>
            </div>
            <div className="tgb-thread">
              {MESSAGES.slice(0, shown).map((m, i) => (
                <span key={i} className={`tgb-msg ${m.from}`}>{m.text}</span>
              ))}
            </div>
          </div>

          <div className="tgb-steps">
            {steps.map((s, i) => (
              <div key={s.title} className={i === activeStep ? 'tgb-step active' : 'tgb-step'}>
                <span className="tgb-step-num">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TelegramBotSetup
