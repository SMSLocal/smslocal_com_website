import { useEffect, useState } from 'react'
import './ChannelHandoffTimeline.css'
import { IconChat, IconPhone, IconBell, IconMail } from './icons.jsx'

/* One customer, one day, four channels — and the same agent memory throughout.
   The rail is the artifact; the panel underneath swaps with the active stop. */
const STOPS = [
  {
    time: '09:14',
    channel: 'WhatsApp',
    icon: <IconChat />,
    customer: '"Where\'s my order?"',
    agent: 'Pulls the live status from Shopify and replies with the tracking link.',
  },
  {
    time: '11:02',
    channel: 'Voice',
    icon: <IconPhone />,
    customer: 'Calls the support line',
    agent: 'Picks up already knowing it is order #48219 — nothing is asked twice.',
  },
  {
    time: '14:30',
    channel: 'SMS',
    icon: <IconBell />,
    customer: 'Carrier reports a delay',
    agent: 'Texts the new ETA before the customer notices, with a $5 credit applied.',
  },
  {
    time: '18:45',
    channel: 'Email',
    icon: <IconMail />,
    customer: 'Asks for the invoice',
    agent: 'Sends the PDF and closes the thread — one case, not four tickets.',
  },
]

function ChannelHandoffTimeline() {
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (held) return undefined
    const id = setInterval(() => setActive((n) => (n + 1) % STOPS.length), 3600)
    return () => clearInterval(id)
  }, [held])

  const stop = STOPS[active]
  const progress = (active / (STOPS.length - 1)) * 100

  return (
    <section className="cht">
      <div className="container">
        <div className="cht-head">
          <span className="cht-kicker">One agent, every channel</span>
          <h2 className="cht-h2">The conversation moves. The memory doesn&apos;t reset.</h2>
          <p className="cht-lede">
            A single customer, a single day. Chat, phone, SMS and email are all the same
            agent with the same context — so nobody has to start over.
          </p>
        </div>

        <div
          className="cht-rail-wrap"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
        >
          <div className="cht-rail" role="tablist" aria-label="Channel timeline">
            <span className="cht-track" />
            <span className="cht-track-fill" style={{ width: `${progress}%` }} />

            {STOPS.map((s, i) => (
              <button
                type="button"
                key={s.channel}
                role="tab"
                aria-selected={i === active}
                className={`cht-stop${i === active ? ' is-active' : ''}${i < active ? ' is-past' : ''}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="cht-stop-ic">{s.icon}</span>
                <span className="cht-stop-time">{s.time}</span>
                <span className="cht-stop-ch">{s.channel}</span>
              </button>
            ))}
          </div>

          <div className="cht-panel" key={active}>
            <p className="cht-customer">{stop.customer}</p>
            <p className="cht-agent">{stop.agent}</p>
            <span className="cht-context">
              <span className="cht-context-dot" />
              Order #48219 · context carried since 09:14
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChannelHandoffTimeline
