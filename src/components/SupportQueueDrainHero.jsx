import { useCallback, useEffect, useRef, useState } from 'react'
import './SupportQueueDrainHero.css'

/* Every ticket below is a real tier-one question with a real help-centre
   article behind it — the point of the visual is that the answer is already
   written down somewhere, and the agent is the thing that goes and gets it.
   The fourth one deliberately can't be answered: it escalates with context,
   which is the other half of the claim in the headline. */
const TICKETS = [
  {
    id: 't1',
    who: 'Ana R.',
    channel: 'WhatsApp',
    tone: 'wa',
    ask: 'Where is my order #48219?',
    source: 'Tracking your delivery',
    answer: "It's out for delivery — arriving today before 6 PM. Here's your live tracking link.",
    ms: '3.1s',
  },
  {
    id: 't2',
    who: 'Devon M.',
    channel: 'Web chat',
    tone: 'web',
    ask: 'How do I change my plan?',
    source: 'Upgrading & downgrading',
    answer: 'Billing → Plan lets you switch anytime. The change applies instantly and we pro-rate the difference.',
    ms: '2.6s',
  },
  {
    id: 't3',
    who: 'Lukas B.',
    channel: 'SMS',
    tone: 'sms',
    ask: 'Do you ship to Germany?',
    source: 'International shipping',
    answer: 'Yes — Germany arrives in 3–5 days for €4.90, and shipping is free over €60.',
    ms: '2.2s',
  },
  {
    id: 't4',
    who: 'Priya N.',
    channel: 'Email',
    tone: 'mail',
    ask: 'I was charged twice this month.',
    source: 'Duplicate charges · needs a person',
    answer: 'Handed to Marcus in Billing — full thread, invoice and card trace attached.',
    ms: '1.4s',
    escalate: true,
  },
  {
    id: 't5',
    who: 'Sofia G.',
    channel: 'Instagram',
    tone: 'ig',
    ask: 'Can I return a gift without the receipt?',
    source: 'Gift returns',
    answer: 'You can — use the gift code on the packing slip, any time within 30 days of delivery.',
    ms: '2.9s',
  },
]

const TYPE_SPEED = 24
/* reading the article, drafting, sent/escalated */
const STEP_AT = [1250, 2050, 3500]
const RUN_MS = 5200
const QUEUE_BASE = 47
const RESOLVED_BASE = 1284

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function SupportQueueDrainHero() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [queue, setQueue] = useState(QUEUE_BASE)
  const [resolved, setResolved] = useState(RESOLVED_BASE)
  const [arrival, setArrival] = useState(false)
  const holdRef = useRef(false)
  const reduced = prefersReducedMotion()

  const active = TICKETS[index]
  const waiting = [1, 2, 3].map((n) => TICKETS[(index + n) % TICKETS.length])

  useEffect(() => {
    setStep(0)
    setTyped(reduced ? active.ask : '')
    const stop = []

    if (!reduced) {
      let i = 0
      const typer = setInterval(() => {
        i += 1
        setTyped(active.ask.slice(0, i))
        if (i >= active.ask.length) clearInterval(typer)
      }, TYPE_SPEED)
      stop.push(() => clearInterval(typer))
    }

    STEP_AT.forEach((at, i) => {
      const t = setTimeout(() => {
        setStep(i + 1)
        if (i === STEP_AT.length - 1) {
          // the ticket leaves the queue; a fresh one lands a beat later
          setQueue((n) => n - 1)
          if (!active.escalate) setResolved((n) => n + 1)
          const land = setTimeout(() => {
            setArrival(true)
            setQueue((n) => n + 1)
            const off = setTimeout(() => setArrival(false), 900)
            stop.push(() => clearTimeout(off))
          }, 700)
          stop.push(() => clearTimeout(land))
        }
      }, reduced ? 0 : at)
      stop.push(() => clearTimeout(t))
    })

    // Hovering or focusing the stack holds the current ticket open so the
    // visitor can actually finish reading it.
    let queued
    const advance = (delay) => {
      queued = setTimeout(() => {
        if (holdRef.current) return advance(1100)
        setIndex((n) => (n + 1) % TICKETS.length)
      }, delay)
    }
    advance(RUN_MS)
    stop.push(() => clearTimeout(queued))

    return () => stop.forEach((clear) => clear())
  }, [index, reduced, active.ask, active.escalate])

  const jumpTo = useCallback((ticket) => {
    setIndex(TICKETS.findIndex((t) => t.id === ticket.id))
  }, [])

  const hold = () => { holdRef.current = true }
  const release = () => { holdRef.current = false }

  const deflectPct = Math.round((resolved / (resolved + 108)) * 100)

  return (
    <div
      className={`sqd${active.escalate ? ' is-escalating' : ''}`}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
    >
      {/* live queue read-out — the number the visitor actually cares about */}
      <div className="sqd-meter">
        <div className="sqd-meter-main">
          <span className="sqd-meter-num" key={queue}>{queue}</span>
          <span className="sqd-meter-label">
            open tickets
            <em className={`sqd-meter-new${arrival ? ' is-on' : ''}`}>+1 just landed</em>
          </span>
        </div>
        <div className="sqd-meter-side">
          <span className="sqd-meter-resolved" key={resolved}>{resolved.toLocaleString()}</span>
          <span className="sqd-meter-sub">deflected today · {deflectPct}%</span>
        </div>
        <div className="sqd-drain" aria-hidden="true">
          <span className="sqd-drain-fill" style={{ width: `${deflectPct}%` }} />
        </div>
      </div>

      {/* the ticket the agent is working right now */}
      <div className="sqd-live" aria-live="polite">
        <div className={`sqd-card sqd-card--live${step >= 3 ? ' is-clearing' : ''}`} key={active.id}>
          <div className="sqd-head">
            <span className={`sqd-avatar sqd-avatar--${active.tone}`}>{active.who.charAt(0)}</span>
            <div className="sqd-head-txt">
              <strong>{active.who}</strong>
              <span className="sqd-channel">{active.channel}</span>
            </div>
            <span className="sqd-live-tag">live</span>
          </div>

          <p className="sqd-ask">
            {typed}
            {typed.length < active.ask.length && <i className="sqd-caret" />}
          </p>

          <div className={`sqd-read${step >= 1 ? ' is-on' : ''}`}>
            <span className="sqd-read-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h4.5A1.5 1.5 0 0 1 20 5.5v12a1.5 1.5 0 0 1-1.5 1.5H14a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H5.5A1.5 1.5 0 0 1 4 17.5Z" />
                <path d="M12 5v14" />
              </svg>
            </span>
            <span className="sqd-read-txt">
              {active.escalate ? 'No article covers this' : 'Reading help centre'}
            </span>
            <span className="sqd-source">{active.source}</span>
          </div>

          <div className={`sqd-reply${step >= 2 ? ' is-on' : ''}`}>
            {step === 1 && (
              <span className="sqd-dots" aria-hidden="true"><i /><i /><i /></span>
            )}
            <p>{active.answer}</p>
          </div>

          <div className={`sqd-done${step >= 3 ? ' is-on' : ''}`}>
            <span className="sqd-done-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                {active.escalate
                  ? <path d="M5 12h14M13 6l6 6-6 6" />
                  : <path d="M5 12.5 10 17.5 19 7" />}
              </svg>
            </span>
            {active.escalate
              ? <span><strong>Escalated to Marcus</strong> · context attached</span>
              : <span><strong>Resolved without a person</strong> · {active.ms}</span>}
          </div>
        </div>
      </div>

      {/* everything still waiting — clickable, so the visitor drives it */}
      <div className="sqd-queue" role="list">
        {waiting.map((t, i) => (
          <button
            type="button"
            role="listitem"
            key={t.id}
            className={`sqd-card sqd-card--wait sqd-wait-${i}`}
            onClick={() => jumpTo(t)}
            title="Answer this one next"
          >
            <span className={`sqd-avatar sqd-avatar--sm sqd-avatar--${t.tone}`}>{t.who.charAt(0)}</span>
            <span className="sqd-wait-ask">{t.ask}</span>
            <span className="sqd-wait-ch">{t.channel}</span>
            <span className="sqd-wait-go" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h13M12 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        ))}
        <span className="sqd-queue-more">+{queue - 3} more waiting — the agent never stops</span>
      </div>
    </div>
  )
}

export default SupportQueueDrainHero
