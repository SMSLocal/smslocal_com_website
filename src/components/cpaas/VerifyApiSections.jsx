import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck, IconInfo } from '../icons.jsx'
import { useInView, useReducedMotion } from './useMotion.js'
import './verify-api-sections.css'

/**
 * Sections for the Verify API page. Six sections, six layouts: panels that
 * open on hover, a stepper with a live mock, channel switches with a route
 * diagram, a rail of message tickets, a one-line India notice, and link cards.
 * Calm by design: the site's navy headings, white and pale-grey bands and the
 * blue/pink accent. Classes are prefixed `vx-`. All sample copy is illustrative.
 */

export function Head({ eyebrow, title, subtitle, align }) {
  return (
    <header className={`vx-head${align === 'center' ? ' center' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ═════ 1 · Panels that open on hover ═════ */

export function WhyPanels({ eyebrow, title, items }) {
  const [on, setOn] = useState(0)
  return (
    <section className="vx-why">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} />
        <div className="vx-panels">
          {items.map((it, i) => (
            <div
              key={it.title}
              tabIndex={0}
              className={`vx-panel${i === on ? ' on' : ''}`}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="vx-panel-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="vx-panel-ico">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════ 2 · Stepper with a live mock ═════ */

const STEP_MS = 4200

function MockScreen({ step }) {
  return (
    <div className="vx-mock">
      <div className="vx-mock-bar"><span><i /><i /><i /></span><em>yourapp.com</em></div>
      <div className="vx-mock-body">
        <div className={`vx-scr${step === 0 ? ' on' : ''}`}>
          <b>Create your account</b>
          <label>Mobile number</label>
          <div className="vx-field">+1 415 555 0123</div>
          <div className="vx-btn press">Send code</div>
        </div>
        <div className={`vx-scr${step === 1 ? ' on' : ''}`}>
          <b>Check your phone</b>
          <div className="vx-sms">
            <span className="vx-sms-ico"><IconCheck /></span>
            <div><small>SMSLOCAL · now</small><p>Your code is <strong>481 920</strong>. It expires in 5 minutes.</p></div>
          </div>
          <div className="vx-chips"><span className="on">SMS</span><span>WhatsApp</span><span>Voice</span></div>
        </div>
        <div className={`vx-scr${step === 2 ? ' on' : ''}`}>
          <b>Enter the code</b>
          <div className="vx-boxes">{'481920'.split('').map((d, i) => <span key={i} style={{ '--i': i }}>{d}</span>)}</div>
          <div className="vx-ok"><IconCheck /> Number verified</div>
        </div>
      </div>
    </div>
  )
}

export function FlowStepper({ eyebrow, title, steps }) {
  const ref = useRef(null)
  const seen = useInView(ref, false)
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!seen || reduced) return undefined
    const t = setTimeout(() => setI((v) => (v + 1) % steps.length), STEP_MS)
    return () => clearTimeout(t)
  }, [i, seen, reduced, steps.length])
  return (
    <section className="vx-flow" ref={ref}>
      <div className="container vx-flow-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} />
          <ol className="vx-steps">
            {steps.map((s, n) => (
              <li key={s.title}>
                <button type="button" className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-current={n === i ? 'step' : undefined}>
                  <span className="vx-step-n">{n + 1}</span>
                  <span className="vx-step-t"><strong>{s.title}</strong><span>{s.desc}</span></span>
                  {n === i && !reduced && seen && <u key={i} style={{ animationDuration: `${STEP_MS}ms` }} />}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <MockScreen step={i} />
      </div>
    </section>
  )
}

/* ═════ 3 · Channel switches and a route diagram ═════ */

const CH = [
  { key: 'sms', label: 'SMS', y: 60, note: 'The default for every passcode.' },
  { key: 'wa', label: 'WhatsApp', y: 150, note: 'For users who live in WhatsApp.' },
  { key: 'voice', label: 'Voice', y: 240, note: 'A spoken code for users who cannot get a text.' },
]

export function ChannelSwitch({ eyebrow, title, subtitle }) {
  const [on, setOn] = useState({ sms: true, wa: false, voice: false })
  const toggle = (k) => { if (k !== 'sms') setOn((s) => ({ ...s, [k]: !s[k] })) }
  const active = CH.filter((c) => on[c.key])
  const summary = active.length === 1
    ? 'Passcodes go out by SMS.'
    : `Passcodes go out by SMS, with ${active.slice(1).map((c) => c.label).join(' and ')} available for users who need another way in.`
  return (
    <section className="vx-chan">
      <div className="container vx-chan-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <ul className="vx-switches">
            {CH.map((c) => (
              <li key={c.key}>
                <button type="button" role="switch" aria-checked={on[c.key]} disabled={c.key === 'sms'} onClick={() => toggle(c.key)} className={on[c.key] ? 'on' : ''}>
                  <span className="vx-sw" aria-hidden="true"><i /></span>
                  <span className="vx-sw-t"><strong>{c.label}{c.key === 'sms' && <em>Default</em>}</strong><span>{c.note}</span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="vx-route">
          <svg viewBox="0 0 520 300" role="img" aria-label={summary}>
            <g className="vx-node app"><rect x="14" y="116" width="116" height="68" rx="14" /><text x="72" y="155">Your app</text></g>
            {CH.map((c) => (
              <g key={c.key} className={on[c.key] ? 'live' : 'idle'}>
                <path className="vx-line" d={`M130 150 C 230 150, 250 ${c.y}, 370 ${c.y}`} />
                <g className="vx-node ch"><rect x="370" y={c.y - 28} width="136" height="56" rx="14" /><text x="438" y={c.y + 5}>{c.label}</text></g>
              </g>
            ))}
          </svg>
          <p aria-live="polite">{summary}</p>
        </div>
      </div>
    </section>
  )
}

/* ═════ 4 · Rail of message tickets ═════ */

const CASES = [
  { t: 'Sign-up', msg: 'Your YourApp code is 481920. Do not share it with anyone.', note: 'Confirm that a real person controls the number before an account is created.' },
  { t: 'Login', msg: '481920 is your YourApp login code.', note: 'Add a second step to sign-in without asking users to install anything.' },
  { t: 'Password reset', msg: 'Use 481920 to reset your YourApp password.', note: 'Check that the owner is asking before a password changes.' },
  { t: 'Payment', msg: 'Confirm your payment of $25.00 with code 481920.', note: 'Make sure the account holder approves before money moves.' },
]

export function TicketRail({ eyebrow, title, subtitle }) {
  const rail = useRef(null)
  const by = (dir) => rail.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  return (
    <section className="vx-cases">
      <div className="container">
        <div className="vx-cases-top">
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="vx-arrows">
            <button type="button" onClick={() => by(-1)} aria-label="Previous">←</button>
            <button type="button" onClick={() => by(1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
      <div className="vx-rail" ref={rail} tabIndex={0} aria-label="Use cases">
        {CASES.map((c, i) => (
          <article key={c.t} className="vx-ticket">
            <div className="vx-stub"><b>{String(i + 1).padStart(2, '0')}</b><span>{c.t}</span></div>
            <div className="vx-ticket-body">
              <p className="vx-msg">{c.msg}</p>
              <p className="vx-note">{c.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ═════ 5 · One-line notice ═════ */

export function IndiaNotice({ title, text, cta }) {
  return (
    <section className="vx-india">
      <div className="container">
        <div className="vx-banner">
          <span className="vx-banner-ico"><IconInfo /></span>
          <div><strong>{title}</strong><p>{text}</p></div>
          <Link to={cta.href}>{cta.label} →</Link>
        </div>
      </div>
    </section>
  )
}

/* ═════ 6 · Link cards with an accent bar ═════ */

export function RelatedCards({ eyebrow, title, items }) {
  return (
    <section className="vx-rel">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} align="center" />
        <ul className="vx-rel-grid">
          {items.map((it, i) => (
            <li key={it.title} className={`a${i + 1}`}>
              <Link to={it.href}>
                <span className="vx-rel-ico">{it.icon}</span>
                <strong>{it.title}</strong>
                <span>{it.desc}</span>
                <em aria-hidden="true">Open →</em>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
