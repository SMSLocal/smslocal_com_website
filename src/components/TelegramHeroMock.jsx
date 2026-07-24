import { useEffect, useState } from 'react'
import './TelegramHeroMock.css'

/**
 * Hero visual for the Telegram Business page.
 *
 * Made of the surfaces only Telegram has — a @bot identity, a /slash command,
 * an inline keyboard, and a post view count — but written WITHOUT boxes. An
 * earlier pass stacked five separate cards (bot chip, command bubble, reply
 * bubble, result bubble, channel row) which read as container soup; here the
 * only bordered thing in the composition is the keyboard itself, because a
 * button has to look pressable. Everything else is text sitting on the page.
 *
 * The sequence is the hook: the command types out, the bot answers, a button is
 * pressed, it returns a real order status, and that fires a channel post whose
 * view count climbs — bots, buttons and broadcasts, which is what the page
 * promises.
 */

const BUTTONS = [
  { label: 'Track order', tapped: true },
  { label: 'Browse catalog' },
  { label: 'Talk to support' },
  { label: 'Offers' },
]

const VIEWS = 12480

const PHASES = [
  { name: 'command', ms: 1100 },
  { name: 'reply', ms: 1300 },
  { name: 'tap', ms: 1000 },
  // pressing a button has to actually do something, or the keyboard is decor
  { name: 'result', ms: 1300 },
  { name: 'broadcast', ms: 1900 },
  { name: 'hold', ms: 1500 },
]

const TICK = 40

function TelegramHeroMock() {
  const [phase, setPhase] = useState('command')
  const [views, setViews] = useState(0)

  useEffect(() => {
    let i = 0
    let start = Date.now()

    const id = setInterval(() => {
      const cur = PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)

      if (cur.name === 'broadcast') {
        // ease-out so the view count surges then settles
        setViews(Math.round(VIEWS * (1 - Math.pow(1 - t, 3))))
      }

      if (t >= 1) {
        i = (i + 1) % PHASES.length
        start = Date.now()
        setPhase(PHASES[i].name)
        if (PHASES[i].name === 'command') setViews(0)
      }
    }, TICK)

    return () => clearInterval(id)
  }, [])

  const order = PHASES.findIndex((p) => p.name === phase)
  const at = (name) => order >= PHASES.findIndex((p) => p.name === name)

  return (
    <div
      className={`tmock is-${phase}`}
      role="img"
      aria-label="A Telegram bot receiving a slash command, replying with an inline keyboard, and a channel broadcast reaching 12,480 views"
    >
      {/* the bot — a line of text, not a chip */}
      <span className="tmock-bot">
        <span className="tmock-mark" />
        <b>@yourbrand_bot</b>
        <i className="tmock-online" />
        <em>online</em>
      </span>

      {/* a slash command, typed out */}
      <span className={`tmock-cmd${at('command') ? ' is-in' : ''}`}>
        /start
        <i className="tmock-caret" />
      </span>

      {/* the bot's answer */}
      <span className={`tmock-line${at('reply') ? ' is-in' : ''}`}>
        Welcome back — what can I help you with?
      </span>

      {/* The inline keyboard: the one thing here with an outline, because a
          button that looks like plain text does not read as pressable. */}
      <span className={`tmock-kb${at('reply') ? ' is-in' : ''}`}>
        {BUTTONS.map((b) => (
          <span
            key={b.label}
            className={`tmock-btn${b.tapped && at('tap') ? ' is-tapped' : ''}`}
          >
            {b.label}
          </span>
        ))}
      </span>

      {/* what the press returns */}
      <span className={`tmock-result${at('result') ? ' is-in' : ''}`}>
        <span className="tmock-result-text">
          Order <b>#4812</b> — out for delivery, arriving today
        </span>
        <span className="tmock-track">
          <span className="tmock-track-fill" />
        </span>
      </span>

      {/* the channel post, counted the way Telegram counts */}
      <span className={`tmock-channel${at('broadcast') ? ' is-in' : ''}`}>
        <svg className="tmock-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12z" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
        Channel post · <b>{views.toLocaleString()}</b> views
      </span>
    </div>
  )
}

export default TelegramHeroMock
