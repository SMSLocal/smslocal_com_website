import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from './icons.jsx'
import { useReducedMotion } from './cpaas/useMotion.js'
import './VoiceCallHero.css'

/**
 * Hero for the Voice page. Copy on the left; on the right a slim phone showing
 * a real-looking incoming call screen, with two cards beside it. The call rings,
 * the "call flow" card ticks off how it got there (number, menu choice, team,
 * answer), the agent taps Accept, a timer and waveform run, controls light up
 * (the record button blinks), a live transcript fills in, and the call ends
 * with "Recording and transcript saved". Three callers rotate. Names, numbers
 * and lines are invented for illustration. Reduced-motion visitors get one
 * finished frame.
 */

const CALLS = [
  { name: 'Aarav Mehta', team: 'Sales', digit: 1, lines: [['Caller', 'Hi, I would like a quote for 5,000 messages.'], ['You', 'Sure, let me pull that up.']] },
  { name: 'Priya Nair', team: 'Support', digit: 2, lines: [['Caller', 'My order has not arrived yet.'], ['You', 'Let me check that for you.']] },
  { name: 'Meera Shah', team: 'Billing', digit: 3, lines: [['Caller', 'Can I get last month’s invoice?'], ['You', 'Sending it to your email now.']] },
]

const NUMBER = '+1 415 555 0123'
const BARS = 26
const pad = (n) => String(n).padStart(2, '0')

const Svg = ({ children, ...p }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>

const CONTROLS = [
  { key: 'mute', label: 'Mute', icon: <Svg><path d="M12 4a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v3M4 4l16 16" /></Svg> },
  { key: 'keypad', label: 'Keypad', icon: <Svg><circle cx="6" cy="6" r=".6" /><circle cx="12" cy="6" r=".6" /><circle cx="18" cy="6" r=".6" /><circle cx="6" cy="12" r=".6" /><circle cx="12" cy="12" r=".6" /><circle cx="18" cy="12" r=".6" /><circle cx="6" cy="18" r=".6" /><circle cx="12" cy="18" r=".6" /><circle cx="18" cy="18" r=".6" /></Svg> },
  { key: 'speaker', label: 'Speaker', icon: <Svg><path d="M4 9v6h4l5 4V5L8 9zM16.500 8.500a5 5 0 0 1 0 7M19 6a8.500 8.500 0 0 1 0 12" /></Svg> },
  { key: 'add', label: 'Add call', icon: <Svg><path d="M12 5v14M5 12h14" /></Svg> },
  { key: 'rec', label: 'Record', icon: <Svg><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.200" fill="currentColor" /></Svg> },
  { key: 'hold', label: 'Hold', icon: <Svg><path d="M9 5v14M15 5v14" /></Svg> },
]

const HANDSET = <Svg><path d="M6.600 3.200c.500-.500 1.300-.500 1.800 0l2 2.300c.400.500.400 1.200 0 1.700L9.300 8.500a12 12 0 0 0 6.200 6.200l1.300-1.100c.500-.400 1.200-.400 1.700 0l2.300 2c.500.500.500 1.300 0 1.800l-1.100 1.200c-.900.900-2.300 1.300-3.600.9A17.500 17.500 0 0 1 3.900 8.700c-.400-1.300 0-2.700.900-3.600z" /></Svg>

function CallScene() {
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  const [phase, setPhase] = useState('in') // in, tap, live, end
  const [chk, setChk] = useState(0)
  const [sec, setSec] = useState(0)
  const call = CALLS[n % CALLS.length]

  useEffect(() => {
    if (reduced) { setPhase('end'); setChk(4); setSec(7); return undefined }
    const ids = []
    let iv
    if (phase === 'in') {
      setChk(0); setSec(0)
      ;[500, 1200, 1900].forEach((ms, i) => ids.push(setTimeout(() => setChk(i + 1), ms)))
      ids.push(setTimeout(() => setPhase('tap'), 3600))
    } else if (phase === 'tap') {
      setChk(4)
      ids.push(setTimeout(() => setPhase('live'), 800))
    } else if (phase === 'live') {
      iv = setInterval(() => setSec((s) => s + 1), 800)
    } else if (phase === 'end') {
      ids.push(setTimeout(() => { setN((v) => v + 1); setPhase('in') }, 2600))
    }
    return () => { ids.forEach(clearTimeout); clearInterval(iv) }
  }, [phase, reduced])

  useEffect(() => { if (phase === 'live' && sec >= 7) setPhase('end') }, [phase, sec])

  const live = phase === 'live'
  const done = phase === 'end'
  const talking = live || phase === 'tap'
  const showLines = done ? 2 : live ? (sec >= 4 ? 2 : sec >= 1 ? 1 : 0) : 0
  const steps = [
    ['Called', NUMBER],
    ['Menu', `Pressed ${call.digit} for ${call.team}`],
    ['Routed', `${call.team} team`],
    ['Answered', call.name.split(' ')[0]],
  ]

  return (
    <figure className="vk" aria-label="An incoming call on a phone, answered by an agent, with a call-flow card and a live transcript (illustrative)">
      <div className="vk-in">
        <div className="vk-phone">
          <div className="vk-body">
            <div className={`vk-screen ${phase}`}>
              <div className="vk-status"><span>9:41</span><i className="vk-cam" /><span className="vk-bat" /></div>

              <div className="vk-top">
                <small>SMSLocal Voice</small>
                <span>{phase === 'in' ? `Incoming call · ${call.team}` : done ? 'Call ended' : `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`}</span>
              </div>

              <div className="vk-who">
                <span className={`vk-av${phase === 'in' ? ' ring' : ''}`}>{call.name[0]}</span>
                <b>{call.name}</b>
                <small>{NUMBER}</small>
              </div>

              <div className={`vk-wave${live ? ' on' : ''}`} aria-hidden="true">
                {Array.from({ length: BARS }, (_, i) => <i key={i} style={{ '--k': i, '--h': `${30 + ((i * 41) % 66)}%` }} />)}
              </div>

              {phase === 'in' || phase === 'tap' ? (
                <div className="vk-answer">
                  <span className="vk-btn decline">{HANDSET}<em>Decline</em></span>
                  <span className={`vk-btn accept${phase === 'tap' ? ' pressed' : ''}`}>{HANDSET}<em>Accept</em></span>
                </div>
              ) : (
                <>
                  <div className="vk-ctl">
                    {CONTROLS.map((c) => (
                      <span key={c.key} className={`vk-c${c.key === 'rec' && live ? ' rec' : ''}`}>{c.icon}<em>{c.label}</em></span>
                    ))}
                  </div>
                  <div className="vk-end"><span className="vk-btn decline small">{HANDSET}</span></div>
                </>
              )}
              <span className="vk-home" />
            </div>
          </div>
        </div>

        <div className="vk-side">
          <div className="vk-card">
            <h4>Call flow</h4>
            <ol className="vk-steps">
              {steps.map(([k, v], i) => (
                <li key={k} className={i < chk ? 'on' : ''}>
                  <span className="vk-tick">{i < chk ? <IconCheck /> : null}</span>
                  <div><em>{k}</em><b>{v}</b></div>
                </li>
              ))}
            </ol>
          </div>

          <div className="vk-card">
            <h4>
              <span>Live transcript</span>
              <span className={`vk-rec${talking ? ' on' : ''}${done ? ' saved' : ''}`}>{done ? 'Saved' : <><i />REC</>}</span>
            </h4>
            <div className="vk-lines">
              {call.lines.slice(0, showLines).map(([who, text], i) => (
                <p key={`${n}-${i}`} className={who === 'Caller' ? 'in' : 'out'}><b>{who}</b>{text}</p>
              ))}
              {showLines === 0 && <p className="vk-idle">{phase === 'in' ? 'Starts when the agent answers.' : 'Listening…'}</p>}
            </div>
            {done && <div className="vk-saved"><IconCheck /> Recording and transcript saved</div>}
          </div>
        </div>
      </div>
      <figcaption>Illustrative</figcaption>
    </figure>
  )
}

function VoiceCallHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="vch">
      <div className="container vch-inner">
        <div className="vch-copy">
          <span className="vch-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="vch-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>
        <CallScene />
      </div>
    </section>
  )
}

export default VoiceCallHero
