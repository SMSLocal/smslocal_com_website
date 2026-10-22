import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from './cpaas/useMotion.js'
import { WaPhone, WaDay, WaIn, WaOut, WaSys, WaBtn } from './WaPhone.jsx'
import './WhatsappWindowHero.css'

/**
 * Hero for the WhatsApp Business API page. Copy on the left; on the right the
 * 24-hour customer window as a dial, beside a real-looking WhatsApp chat. A
 * customer writes in and the window opens (a green ring), the business replies
 * freely while a hand sweeps round and the ring runs down. When it closes only
 * an approved template can start the next conversation, and when the customer
 * answers it opens again. This is the rule the page's own FAQ describes.
 * Messages and times are illustrative. Reduced-motion visitors get one still
 * frame mid-window.
 */

const R = 150
const C = 2 * Math.PI * R
const COUNT_MS = 5600

const POINTS = [
  { label: '24h', x: 200, y: 14 },
  { label: '18h', x: 392, y: 205 },
  { label: '12h', x: 200, y: 398 },
  { label: '6h', x: 8, y: 205 },
]

function Scene() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState('closed') // closed, open, count, closing, template, reply
  const [p, setP] = useState(0)
  const [loop, setLoop] = useState(0)

  useEffect(() => {
    if (reduced) { setPhase('count'); setP(0.35); return undefined }
    let id
    const next = (ph, ms) => { id = setTimeout(() => setPhase(ph), ms) }
    if (phase === 'closed') next('open', 1500)
    else if (phase === 'open') next('count', 2300)
    else if (phase === 'count') {
      setP(0)
      const t0 = performance.now()
      id = setInterval(() => {
        const v = Math.min(1, (performance.now() - t0) / COUNT_MS)
        setP(v)
        if (v >= 1) { clearInterval(id); setPhase('closing') }
      }, 60)
    } else if (phase === 'closing') next('template', 1500)
    else if (phase === 'template') next('reply', 2800)
    else if (phase === 'reply') id = setTimeout(() => { setLoop((l) => l + 1); setPhase('open') }, 2000)
    return () => { clearTimeout(id); clearInterval(id) }
  }, [phase, reduced])

  const isOpen = phase === 'open' || phase === 'count'
  const frac = phase === 'open' ? 1 : phase === 'count' ? 1 - p : 0
  const left = Math.max(0, Math.ceil(24 * (phase === 'count' ? 1 - p : isOpen ? 1 : 0)))
  const angle = phase === 'count' ? p * 360 : 0
  const trans = phase === 'count' ? 'stroke-dasharray .06s linear, stroke-dashoffset .06s linear' : 'stroke-dasharray .9s ease, stroke-dashoffset .9s ease'
  const talking = phase !== 'closed'
  const after = (...ph) => ph.includes(phase)

  return (
    <figure className="wd" aria-label="The 24-hour WhatsApp window: a customer message opens it, replies are free-form until it closes, then an approved template is needed (illustrative)">
      <div className="wd-in">
        <div className="wd-dial">
          <svg viewBox="0 0 400 412" aria-hidden="true" focusable="false">
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i / 24) * Math.PI * 2
              const long = i % 6 === 0
              const r1 = 168; const r2 = long ? 182 : 176
              return <line key={i} className="wd-tick" x1={200 + r1 * Math.sin(a)} y1={206 - r1 * Math.cos(a)} x2={200 + r2 * Math.sin(a)} y2={206 - r2 * Math.cos(a)} />
            })}
            <circle className="wd-track" cx="200" cy="206" r={R} />
            <circle
              className={`wd-arc${isOpen ? ' live' : ''}`}
              cx="200" cy="206" r={R}
              strokeDasharray={`${C * frac} ${C}`}
              strokeDashoffset={-C * (1 - frac)}
              style={{ transition: trans, opacity: frac <= 0.001 ? 0 : 1 }}
            />
            <g className="wd-hand" style={{ opacity: phase === 'count' ? 1 : 0 }} transform={`rotate(${angle} 200 206)`}>
              <circle className="knob" cx="200" cy={206 - R} r="13" />
              <circle className="core" cx="200" cy={206 - R} r="4.5" />
            </g>
            {POINTS.map((pt) => <text key={pt.label} className="wd-lbl" x={pt.x} y={pt.y + 4} textAnchor={pt.x < 100 ? 'start' : pt.x > 300 ? 'end' : 'middle'}>{pt.label}</text>)}
          </svg>

          <div className={`wd-center${isOpen ? ' open' : ''}`}>
            <b>{isOpen ? left : '0'}<small>h</small></b>
            <span>{isOpen ? 'Window open' : 'Window closed'}</span>
            <em>{isOpen ? 'Reply freely' : 'Template needed'}</em>
          </div>
        </div>

        <div className="wd-phone" aria-hidden="true" key={loop}>
          <WaPhone name="SMSLocal" status={after('open') ? 'typing…' : 'Business account'}>
            <WaDay>Today</WaDay>
            {!talking && <WaSys>The 24-hour window is closed. Only an approved template can start a chat.</WaSys>}
            {talking && <WaOut>Hi, where is my order?</WaOut>}
            {talking && <WaIn style={{ animationDelay: '1s' }}>Sure, checking now.</WaIn>}
            {after('closing', 'template', 'reply') && <WaSys>The 24-hour window has closed.</WaSys>}
            {after('template', 'reply') && (
              <>
                <WaIn><strong>Order shipped</strong><p>Your order #4821 is on its way.</p></WaIn>
                <WaBtn icon="link">Track order</WaBtn>
              </>
            )}
            {after('reply') && <WaOut>Thanks!</WaOut>}
          </WaPhone>
        </div>
      </div>
    </figure>
  )
}

function WhatsappWindowHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="wah">
      <div className="container wah-inner">
        <div className="wah-copy">
          <span className="wah-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="wah-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>
        <Scene />
      </div>
    </section>
  )
}

export default WhatsappWindowHero
