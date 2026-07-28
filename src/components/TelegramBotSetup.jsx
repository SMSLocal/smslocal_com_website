import { useEffect, useState } from 'react'
import './TelegramBotSetup.css'

/**
 * "How it works" section for /telegram-business — an auto-advancing full-width
 * slide, one step at a time, with that step's own BotFather chat snippet
 * playing out beside it. Crossfades to the next step instead of a persistent
 * split panel or a top rail.
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
  const stepMessages = MESSAGES.filter((m, i) => m.step === activeStep && i < shown)

  return (
    <section className="section tg-steps">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="tgb-slide">
          <div className="tgb-slide-frame" key={activeStep}>
            <div className="tgb-slide-copy">
              <span className="tgb-slide-ghost">{`0${activeStep + 1}`}</span>
              <h3>{steps[activeStep]?.title}</h3>
              <p>{steps[activeStep]?.desc}</p>
            </div>

            <div className="tgb-slide-chat">
              <div className="tgb-head">
                <span className="tgb-avatar">B</span>
                <span>
                  <strong>BotFather</strong>
                  <span className="tgb-verified">✓ verified bot</span>
                </span>
              </div>
              <div className="tgb-thread">
                {stepMessages.map((m, i) => (
                  <span key={i} className={`tgb-msg ${m.from}`}>{m.text}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="tgb-dots" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.title} className={`tgb-dot${i === activeStep ? ' tgb-dot--active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TelegramBotSetup
