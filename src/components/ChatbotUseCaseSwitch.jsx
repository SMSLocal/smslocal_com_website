import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ChatbotUseCaseSwitch.css'
import { IconCursor, IconBrain, IconChat } from './icons.jsx'

/**
 * "Built for every use case" on /chatbot, built from scratch: a boxless tab
 * rail on the left switches between four *completely different* live
 * mini-demos on the right — a flowchart build-out, a WhatsApp read-receipt
 * thread, a website widget capturing a lead, and an SMS notification banner
 * — instead of one shared chat-bubble layout with only the copy swapped.
 */

const ROW_HEIGHT = 78 // px — must match .cus-tab min-height in the CSS

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTimers() {
  const timers = useRef([])
  const set = (fn, ms) => {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
    return t
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return { set, clearAll: () => { timers.current.forEach(clearTimeout); timers.current = [] } }
}

/* ---- 1. No-code builder: a flowchart building itself node by node ---- */
function FlowStage() {
  const [step, setStep] = useState(REDUCED ? 2 : -1)
  const { set, clearAll } = useTimers()
  const nodes = [
    { icon: <IconCursor />, label: 'Start' },
    { icon: <span className="fls-diamond" />, label: 'Bounced?' },
    { icon: <IconBrain />, label: 'AI fallback' },
  ]

  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setStep(-1)
    let i = 0
    const tick = () => {
      setStep(i)
      i += 1
      if (i < nodes.length) set(tick, 650)
    }
    set(tick, 300)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fls">
      {nodes.map((node, i) => (
        <div className="fls-item" key={node.label}>
          <div className={`fls-node${i <= step ? ' is-on' : ''}`}>{node.icon}</div>
          <span className="fls-label">{node.label}</span>
          {i < nodes.length - 1 && <span className={`fls-wire${i < step ? ' is-on' : ''}`} />}
        </div>
      ))}
    </div>
  )
}

/* ---- 2. WhatsApp chatbot: a thread with real read-receipt progression ---- */
function WhatsAppStage() {
  const [tick, setTick] = useState(REDUCED ? 2 : 0) // 0 sent, 1 delivered, 2 read
  const [replyShown, setReplyShown] = useState(REDUCED)
  const { set, clearAll } = useTimers()

  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setTick(0)
    setReplyShown(false)
    set(() => setTick(1), 500)
    set(() => setTick(2), 1100)
    set(() => setReplyShown(true), 1700)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wap">
      <div className="wap-bar">
        <span className="wap-dot" /> SMSLocal Bot <i>online</i>
      </div>
      <div className="wap-body">
        <div className="wap-msg wap-msg--in">Book me a table for two on Friday</div>
        <div className="wap-msg wap-msg--out">
          <span className={`wap-tick${tick >= 2 ? ' is-read' : ''}`}>{tick === 0 ? '✓' : '✓✓'}</span>
        </div>
        {replyShown && (
          <div className="wap-msg wap-msg--in wap-msg--pop">Done — Friday 7:30pm for two, confirmed ✅</div>
        )}
      </div>
    </div>
  )
}

/* ---- 3. Website chatbot: a launcher bubble opening into a lead-capture panel ---- */
function WebsiteStage() {
  const [phase, setPhase] = useState(REDUCED ? 'done' : 'closed') // closed -> open -> filling -> done
  const { set, clearAll } = useTimers()

  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setPhase('closed')
    set(() => setPhase('open'), 350)
    set(() => setPhase('filling'), 950)
    set(() => setPhase('done'), 2000)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wst">
      <div className="wst-browser">
        <span className="wst-chrome-dot" /><span className="wst-chrome-dot" /><span className="wst-chrome-dot" />
        <span className="wst-chrome-bar" />
      </div>
      <div className={`wst-launcher${phase !== 'closed' ? ' is-open' : ''}`}>
        <IconChat />
      </div>
      <div className={`wst-panel${phase === 'open' || phase === 'filling' || phase === 'done' ? ' is-shown' : ''}`}>
        <div className="wst-field">
          <span className="wst-field-label">Name</span>
          <span className={`wst-field-value${phase === 'filling' || phase === 'done' ? ' is-filled' : ''}`}>Amara Diallo</span>
        </div>
        <div className="wst-field">
          <span className="wst-field-label">Email</span>
          <span className={`wst-field-value${phase === 'done' ? ' is-filled' : ''}`}>amara@brand.com</span>
        </div>
        <div className={`wst-done${phase === 'done' ? ' is-shown' : ''}`}>Lead captured ✓</div>
      </div>
    </div>
  )
}

/* ---- 4. SMS chatbot: a native-style notification banner sliding in ---- */
function SmsStage() {
  const [shown, setShown] = useState(REDUCED)
  const { set, clearAll } = useTimers()

  useEffect(() => {
    if (REDUCED) return undefined
    clearAll()
    setShown(false)
    set(() => setShown(true), 350)
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="sms">
      <div className="sms-status">
        <span>9:41</span>
        <span className="sms-status-icons" aria-hidden="true">••• ▮▮▮ 100%</span>
      </div>
      <div className={`sms-banner${shown ? ' is-shown' : ''}`}>
        <span className="sms-banner-ic">💬</span>
        <div className="sms-banner-text">
          <strong>SMSLocal</strong>
          <span>Your appointment is confirmed for 3pm — reply CANCEL to change it.</span>
        </div>
      </div>
    </div>
  )
}

const STAGES = [FlowStage, WhatsAppStage, WebsiteStage, SmsStage]

function ChatbotUseCaseSwitch({ eyebrow, title, subtitle, items = [] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const autoTimer = useRef(null)
  const n = items.length

  useEffect(() => {
    if (paused || n < 2) return undefined
    autoTimer.current = setTimeout(() => setActive((a) => (a + 1) % n), 5200)
    return () => clearTimeout(autoTimer.current)
  }, [active, paused, n])

  const current = items[active] || {}
  const Stage = STAGES[active % STAGES.length]

  return (
    <section className="section section-alt cus-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="cus"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="cus-tabs" role="tablist">
            <span className="cus-indicator" style={{ transform: `translateY(${active * ROW_HEIGHT}px)` }} aria-hidden="true" />
            {items.slice(0, 4).map((it, i) => (
              <button
                type="button"
                key={it.title}
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'cus-tab is-active' : 'cus-tab'}
                onClick={() => setActive(i)}
              >
                <span className="cus-tab-ic">{it.icon}</span>
                <span className="cus-tab-title">{it.title}</span>
              </button>
            ))}
          </div>

          <div className="cus-stage">
            <div className="cus-demo" key={active}>
              <Stage />
            </div>

            <div className="cus-info" key={`info-${active}`}>
              <p className="cus-desc">{current.desc}</p>
              <Link to={current.href || '/'} className="cus-link">
                Explore <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatbotUseCaseSwitch
