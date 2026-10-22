import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChat, IconPhone, IconMic, IconCheck } from '../icons.jsx'
import './verify-api-hero.css'

/**
 * Hero for the Verify API page. Copy on the left; on the right a passcode
 * board. A row of split-flap tiles spins up a six-digit code, a channel chip
 * lights as it is delivered, the code is typed into the entry boxes and a
 * "Verified" stamp lands. The scene then restarts with the next use case
 * (sign-up, login, payment, password reset). All values are illustrative.
 * Reduced-motion visitors get the finished state of the first scene.
 */

const SESSIONS = [
  { purpose: 'Sign-up', channel: 0, code: '481920' },
  { purpose: 'Login', channel: 1, code: '735206' },
  { purpose: 'Payment', channel: 2, code: '208453' },
  { purpose: 'Password reset', channel: 0, code: '916374' },
]

const CHANNELS = [
  { key: 'SMS', icon: <IconChat /> },
  { key: 'WhatsApp', icon: <IconPhone /> },
  { key: 'Voice', icon: <IconMic /> },
]

const SETTLE = (i) => 9 + i * 5 // tick at which tile i stops spinning
const LAST_TICK = SETTLE(5) + 2

function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setR(mq.matches)
    const on = (e) => setR(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return r
}

function VerifyBoard() {
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  const [phase, setPhase] = useState('idle') // idle, flip, sent, typing, verified
  const [tick, setTick] = useState(0)
  const [typed, setTyped] = useState(0)
  const s = SESSIONS[n % SESSIONS.length]

  useEffect(() => {
    if (reduced) { setPhase('verified'); setTyped(6); setTick(LAST_TICK); return undefined }
    let id
    if (phase === 'idle') {
      setTick(0); setTyped(0)
      id = setTimeout(() => setPhase('flip'), 900)
    } else if (phase === 'flip') {
      id = setInterval(() => setTick((t) => t + 1), 60)
    } else if (phase === 'sent') {
      id = setTimeout(() => setPhase('typing'), 1100)
    } else if (phase === 'typing') {
      id = setInterval(() => setTyped((t) => t + 1), 300)
    } else if (phase === 'verified') {
      id = setTimeout(() => { setN((v) => v + 1); setPhase('idle') }, 2800)
    }
    return () => { clearTimeout(id); clearInterval(id) }
  }, [phase, reduced])

  useEffect(() => { if (phase === 'flip' && tick >= LAST_TICK) setPhase('sent') }, [tick, phase])
  useEffect(() => { if (phase === 'typing' && typed >= 6) setPhase('verified') }, [typed, phase])

  const shown = (i) => {
    if (phase === 'idle') return '·'
    if (phase === 'flip' && tick < SETTLE(i)) return String((tick * 7 + i * 3) % 10)
    return s.code[i]
  }
  const settled = (i) => phase !== 'idle' && (phase !== 'flip' || tick >= SETTLE(i))
  const delivered = phase === 'sent' || phase === 'typing' || phase === 'verified'

  return (
    <figure className="vh" aria-label="A one-time passcode being generated, delivered, typed in and verified (illustrative)">
      <span className="vh-ring r1" aria-hidden="true" />
      <span className="vh-ring r2" aria-hidden="true" />

      <div className="vh-card">
        <div className="vh-top">
          <span key={s.purpose} className="vh-purpose"><b>Verify</b> · {s.purpose}</span>
          <em>Illustrative</em>
        </div>

        <div className="vh-board" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`vh-tile${settled(i) ? ' set' : ''}`}>
              <i key={`${phase === 'flip' ? tick : 'x'}-${i}`}>{shown(i)}</i>
            </span>
          ))}
        </div>

        <div className="vh-chans" aria-hidden="true">
          {CHANNELS.map((c, i) => (
            <span key={c.key} className={delivered && i === s.channel ? 'on' : ''}>{c.icon}{c.key}</span>
          ))}
          <small className={delivered ? 'on' : ''}>{delivered ? `Delivered on ${CHANNELS[s.channel].key} · 0.9 s` : 'Waiting for a code'}</small>
        </div>

        <div className="vh-expiry" aria-hidden="true">
          <span>Code expires in 5:00</span>
          <div><i key={`${n}-${delivered}`} className={delivered ? 'run' : ''} /></div>
        </div>

        <div className="vh-enter" aria-hidden="true">
          <label>Enter the code</label>
          <div className="vh-boxes">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={i < typed ? 'on' : i === typed && phase === 'typing' ? 'cur' : ''}>{i < typed ? s.code[i] : ''}</span>
            ))}
          </div>
        </div>

        <div className={`vh-stamp${phase === 'verified' ? ' on' : ''}`} aria-hidden="true">
          <IconCheck /> Verified
        </div>
      </div>

      <div className={`vh-sms${phase === 'sent' || phase === 'typing' ? ' on' : ''}`} aria-hidden="true">
        <span className="vh-sms-ico">{CHANNELS[s.channel].icon}</span>
        <div>
          <b>{['SMSLOCAL', 'WHATSAPP · SMSLOCAL', 'VOICE CALL · SMSLOCAL'][s.channel]}</b>
          <p>{s.channel === 2 ? `“Your code is ${s.code.split('').join(' ')}”` : `Your code is ${s.code.slice(0, 3)} ${s.code.slice(3)}.`}</p>
        </div>
      </div>
    </figure>
  )
}

function VerifyApiHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="vhh">
      <div className="container vhh-inner">
        <div className="vhh-copy">
          <span className="vhh-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="vhh-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>
        <VerifyBoard />
      </div>
    </section>
  )
}

export default VerifyApiHero
