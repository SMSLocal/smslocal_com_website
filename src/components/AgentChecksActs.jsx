import { useEffect, useState } from 'react'
import './AgentChecksActs.css'
import { IconCart, IconDollar, IconCalendar, IconReceipt, IconSearch, IconBolt, IconCheck } from './icons.jsx'

/* Four everyday requests. Pick one on the left, see what the agent checked and
   what it actually did on the right. Two short lines each — nothing more. */
const ITEMS = [
  {
    icon: <IconCart />,
    label: 'Where is my order?',
    checks: 'Reads the live order from Shopify',
    checkOut: 'Delivered 24 Jul · $82.40',
    acts: 'Replies with the real status and tracking link',
    actOut: 'Answered in 1.2s',
  },
  {
    icon: <IconDollar />,
    label: 'I want a refund',
    checks: 'Checks the return window and payment in Stripe',
    checkOut: 'Day 3 of 30 · eligible',
    acts: 'Issues the refund inside the same chat',
    actOut: 'Refunded $82.40',
  },
  {
    icon: <IconCalendar />,
    label: 'Move my appointment',
    checks: 'Reads real availability from your calendar',
    checkOut: 'Fri 10:30 and 14:00 open',
    acts: 'Rebooks and sends the confirmation',
    actOut: 'Moved to Fri 10:30',
  },
  {
    icon: <IconReceipt />,
    label: 'Resend my invoice',
    checks: 'Finds the invoice on the account',
    checkOut: 'INV-1042 · March · paid',
    acts: 'Emails the PDF to the address on file',
    actOut: 'Sent to priya@northwind.co',
  },
]

function AgentChecksActs() {
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (held) return undefined
    const id = setInterval(() => setActive((n) => (n + 1) % ITEMS.length), 4200)
    return () => clearInterval(id)
  }, [held])

  const item = ITEMS[active]

  return (
    <section className="aca section-alt">
      <div className="container">
        <div className="aca-head">
          <span className="aca-kicker">Real data, real actions</span>
          <h2 className="aca-h2">It doesn&apos;t guess — it checks, then acts</h2>
          <p className="aca-lede">
            The agent looks up the live record in your connected tools, then completes the
            task from inside the conversation. Pick a request to see both halves.
          </p>
        </div>

        <div
          className="aca-body"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
        >
          <div className="aca-list" role="tablist" aria-label="Common customer requests">
            {ITEMS.map((it, i) => (
              <button
                type="button"
                key={it.label}
                role="tab"
                aria-selected={i === active}
                className={`aca-item${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="aca-item-ic">{it.icon}</span>
                <span className="aca-item-label">{it.label}</span>
              </button>
            ))}
          </div>

          <div className="aca-panel" key={active}>
            <div className="aca-step">
              <span className="aca-step-tag"><IconSearch />It checks</span>
              <p className="aca-step-text">{item.checks}</p>
              <span className="aca-step-out">{item.checkOut}</span>
            </div>

            <span className="aca-arrow" aria-hidden="true" />

            <div className="aca-step aca-step--act">
              <span className="aca-step-tag aca-step-tag--act"><IconBolt />It acts</span>
              <p className="aca-step-text">{item.acts}</p>
              <span className="aca-step-out aca-step-out--act">
                <IconCheck />
                {item.actOut}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentChecksActs
