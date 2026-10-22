import { useEffect, useRef, useState } from 'react'
import { IconChat, IconPhone, IconBolt, IconMic, IconMail, IconCheck, IconPackage } from '../icons.jsx'
import './cpaas-hub-stage.css'

/**
 * Hero graphic for the CPaaS hub: one request, any channel.
 *
 * A tilted phone sits in the middle and its screen re-skins itself for every
 * channel: an SMS thread, a WhatsApp chat, an RCS rich card, a voice call and
 * an email. Beside it a dark code card shows the single word that changes in
 * the API call, and a receipt card confirms delivery. Channels orbit the phone
 * and a pill bar along the top lets a visitor jump to any of them.
 *
 * All content is illustrative. The scene tilts gently towards the pointer.
 * Reduced-motion visitors get a static first channel and no tilt.
 */

const TICK_MS = 4200

const CHANNELS = [
  { key: 'sms', label: 'SMS', color: '#4f5bd5', icon: <IconChat />, id: '9f2a7c10' },
  { key: 'whatsapp', label: 'WhatsApp', color: '#16a34a', icon: <IconPhone />, id: '4be81d37' },
  { key: 'rcs', label: 'RCS', color: '#ec4899', icon: <IconBolt />, id: 'c03d9a52' },
  { key: 'voice', label: 'Voice', color: '#f59e0b', icon: <IconMic />, id: '71a5e0b9' },
  { key: 'email', label: 'Email', color: '#0ea5e9', icon: <IconMail />, id: 'e8f26c14' },
]

const SCREENS = {
  sms: (
    <>
      <div className="cpx-bar"><b>SMSLocal</b><small>SMS · now</small></div>
      <div className="cpx-body">
        <div className="cpx-typing"><i /><i /><i /></div>
        <div className="cpx-bub in">Your order #4821 has shipped. Track it: sml.in/t4821</div>
        <div className="cpx-meta">Delivered</div>
      </div>
    </>
  ),
  whatsapp: (
    <>
      <div className="cpx-bar"><b>SMSLocal <IconCheck /></b><small>Business account</small></div>
      <div className="cpx-body cpx-wa">
        <div className="cpx-typing"><i /><i /><i /></div>
        <div className="cpx-bub in">Hi Aarav, your order #4821 is on its way. 📦</div>
        <div className="cpx-bub out">Great, thanks!<span><IconCheck /><IconCheck /></span></div>
      </div>
    </>
  ),
  rcs: (
    <>
      <div className="cpx-bar"><b>SMSLocal <IconCheck /></b><small>Verified sender</small></div>
      <div className="cpx-body">
        <div className="cpx-rich">
          <div className="cpx-rich-img"><IconPackage /></div>
          <strong>Order shipped</strong>
          <p>Arriving Thursday, 12 Oct.</p>
          <div className="cpx-btns"><span>Track</span><span>Support</span></div>
        </div>
      </div>
    </>
  ),
  voice: (
    <div className="cpx-call">
      <div className="cpx-avatar"><IconMic /></div>
      <strong>SMSLocal</strong>
      <small>Voice OTP</small>
      <div className="cpx-wave">{Array.from({ length: 13 }, (_, i) => <i key={i} style={{ '--k': i }} />)}</div>
      <div className="cpx-digits"><span>4</span><span>8</span><span>2</span><span>1</span></div>
    </div>
  ),
  email: (
    <>
      <div className="cpx-bar"><b>Inbox</b><small>1 new</small></div>
      <div className="cpx-body">
        <div className="cpx-mail">
          <div className="cpx-mail-head"><span>S</span><div><b>SMSLocal</b><small>now</small></div></div>
          <strong>Your order has shipped</strong>
          <p><i /><i /><i className="short" /></p>
          <div className="cpx-cta">Track order</div>
        </div>
      </div>
    </>
  ),
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function CpaasHubStage() {
  const [active, setActive] = useState(0)
  const [run, setRun] = useState(0)
  const reduced = usePrefersReducedMotion()
  const stage = useRef(null)

  const go = (i) => { setActive(i); setRun((r) => r + 1) }

  // Advance on a timer; picking a channel by hand restarts the clock.
  useEffect(() => {
    if (reduced) return undefined
    const t = setTimeout(() => go((active + 1) % CHANNELS.length), TICK_MS)
    return () => clearTimeout(t)
  }, [active, run, reduced])

  const tilt = (e) => {
    if (reduced || !stage.current) return
    const r = stage.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    stage.current.style.setProperty('--px', x.toFixed(3))
    stage.current.style.setProperty('--py', y.toFixed(3))
  }
  const level = () => {
    stage.current?.style.setProperty('--px', 0)
    stage.current?.style.setProperty('--py', 0)
  }

  const cur = CHANNELS[active]

  return (
    <figure
      ref={stage}
      className="cpx"
      style={{ '--c': cur.color }}
      onPointerMove={tilt}
      onPointerLeave={level}
      aria-label="One API request reaching a phone as SMS, WhatsApp, RCS, a voice call or email, with a delivery receipt (illustrative)"
    >
      <div className="cpx-bg" aria-hidden="true">
        <span className="b1" /><span className="b2" /><span className="b3" />
      </div>

      {/* channel switcher */}
      <div className="cpx-pills" role="tablist" aria-label="Channel">
        {CHANNELS.map((c, i) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? 'is-on' : ''}
            style={{ '--n': c.color }}
            onClick={() => go(i)}
          >
            {c.label}
            {i === active && !reduced && <u key={run} style={{ animationDuration: `${TICK_MS}ms` }} />}
          </button>
        ))}
      </div>

      {/* orbiting channel dots */}
      <div className="cpx-ring" aria-hidden="true">
        {CHANNELS.map((c, i) => (
          <span key={c.key} className={`cpx-dot${i === active ? ' is-on' : ''}`} style={{ '--a': `${i * 72 - 36}deg`, '--n': c.color }}>
            <span className="cpx-dot-in">{c.icon}</span>
          </span>
        ))}
      </div>

      {/* request travelling from the code card to the phone */}
      <svg className="cpx-wire" viewBox="0 0 100 104" aria-hidden="true" focusable="false">
        <path d="M36.5 55.5 C 39.5 52, 41 59, 44 55.5" className="cpx-wire-line" />
        <circle key={`w-${run}`} r="1.5" className="cpx-wire-dot" style={{ offsetPath: 'path("M36.5 55.5 C 39.5 52, 41 59, 44 55.5")' }} />
      </svg>

      {/* phone */}
      <div className="cpx-phone-wrap" aria-hidden="true">
        <div className="cpx-phone">
          <span className="cpx-island" />
          <div className="cpx-screen">
            {CHANNELS.map((c, i) => (
              <div key={c.key} className={`cpx-scr cpx-scr-${c.key}${i === active ? ' is-active' : ''}`} style={{ '--n': c.color }}>
                {SCREENS[c.key]}
              </div>
            ))}
            <span className="cpx-gloss" />
          </div>
        </div>
      </div>

      {/* code card */}
      <div className="cpx-code" aria-hidden="true">
        <span className="cpx-code-head"><b>POST</b> /send <em>Illustrative</em></span>
        <code><span className="p">{'{'}</span></code>
        <code className="ln"><span className="k">"to"</span>: <span className="s">"9198xxxxxx12"</span>,</code>
        <code className="ln hl"><span className="k">"channel"</span>: <span className="v" key={`ch-${run}`}>"{cur.key}"</span>,</code>
        <code className="ln"><span className="k">"content"</span>: <span className="s">"Order shipped"</span></code>
        <code><span className="p">{'}'}</span></code>
        <code className="ok" key={`ok-${run}`}><IconCheck /> 200 · msgid {cur.id}</code>
      </div>

      {/* receipt */}
      <div className="cpx-rcpt" aria-hidden="true">
        <span className="cpx-rcpt-top">
          <span className="cpx-tick" key={`t-${run}`}><IconCheck /></span>
          <span><b>Delivered</b><small>on {cur.label}</small></span>
        </span>
        <svg viewBox="0 0 120 34" focusable="false">
          <defs>
            <linearGradient id="cpx-spark" x1="0" x2="1"><stop offset="0" stopColor="#4f5bd5" /><stop offset="1" stopColor="#ec4899" /></linearGradient>
          </defs>
          <path key={`s-${run}`} d="M2 28 C 14 28, 16 12, 28 14 S 46 26, 58 18 S 78 4, 92 10 S 110 6, 118 4" />
        </svg>
      </div>

      <i className="cpx-spark s1" aria-hidden="true" /><i className="cpx-spark s2" aria-hidden="true" /><i className="cpx-spark s3" aria-hidden="true" />
    </figure>
  )
}

export default CpaasHubStage
