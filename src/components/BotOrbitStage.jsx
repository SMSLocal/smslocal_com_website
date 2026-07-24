import { useEffect, useRef, useState } from 'react'
import './BotOrbitStage.css'
import { IconBrain, IconRefresh, IconClock, IconGear, IconPlug, IconUsers } from './icons.jsx'

/**
 * Brand-new hero visual for /chatbot/builder: a phone-shaped "live preview"
 * stage orbited by capability nodes on a slowly rotating ring. Clicking (or,
 * on autoplay, cycling to) an orbit node fires a connecting pulse into the
 * phone and drops a matching reply into the conversation — a different
 * structural idea from the flow-canvas builder used elsewhere on the page.
 */

const NODES = [
  { id: 'ai', icon: <IconBrain />, label: 'AI reply', angle: -90, reply: 'Got it — here are three plans that fit your budget.' },
  { id: 'condition', icon: <IconRefresh />, label: 'Condition', angle: -30, reply: 'Since you picked "Support", routing you to that flow.' },
  { id: 'delay', icon: <IconClock />, label: 'Delay', angle: 30, reply: 'Following up in 1 hour if I don’t hear back ⏱' },
  { id: 'buttons', icon: <IconGear />, label: 'Buttons', angle: 90, reply: 'Choose one: [ Sales ]  [ Support ]  [ Billing ]' },
  { id: 'webhook', icon: <IconPlug />, label: 'Webhook', angle: 150, reply: 'Order #4821 status pulled live: Out for delivery.' },
  { id: 'crm', icon: <IconUsers />, label: 'CRM sync', angle: -150, reply: 'Saved your details — synced to CRM as a new lead.' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Elliptical placement (rx wider than ry would collide with the phone on
// the vertical axis, so ry is pushed out further than rx) keeps every node
// in open field clear of the phone mockup instead of tucking under it.
function polar(angleDeg, rx = 42, ry = 50) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: 50 + rx * Math.cos(rad), y: 50 + ry * Math.sin(rad) }
}

function BotOrbitStage() {
  const [activeId, setActiveId] = useState(null)
  const [thread, setThread] = useState([{ from: 'user', text: 'Hi, I need help with my order' }])
  const [typing, setTyping] = useState(false)
  const [paused, setPaused] = useState(false)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const fire = (node) => {
    setActiveId(node.id)
    setTyping(true)
    const t1 = setTimeout(() => {
      setTyping(false)
      setThread((prev) => {
        const next = [...prev, { from: 'bot', text: node.reply, tag: node.label }]
        return next.length > 3 ? next.slice(next.length - 3) : next
      })
    }, 420)
    timers.current.push(t1)
  }

  const handleNodeClick = (node) => {
    clearTimers()
    setPaused(true)
    fire(node)
    const resume = setTimeout(() => setPaused(false), 3200)
    timers.current.push(resume)
  }

  useEffect(() => {
    if (REDUCED) {
      setActiveId('ai')
      return undefined
    }
    if (paused) return undefined

    let i = 0
    const step = () => {
      const node = NODES[i % NODES.length]
      fire(node)
      i += 1
    }
    step()
    const interval = setInterval(step, 3200)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused])

  useEffect(() => () => clearTimers(), [])

  const active = NODES.find((n) => n.id === activeId)
  const beam = active ? polar(active.angle) : null

  return (
    <div className="bos" role="img" aria-label="An interactive preview of a chatbot flow: orbiting capability nodes feed live replies into a chat preview">
      <div className="bos-ring bos-ring--outer" />
      <div className="bos-ring bos-ring--inner" />

      <svg className="bos-beam-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {beam && (
          <line className="bos-beam" x1={beam.x} y1={beam.y} x2="50" y2="50" />
        )}
      </svg>

      {NODES.map((node) => {
        const pos = polar(node.angle)
        const isActive = node.id === activeId
        return (
          <button
            type="button"
            key={node.id}
            className={isActive ? 'bos-node is-active' : 'bos-node'}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => handleNodeClick(node)}
          >
            <span className="bos-node-ic">{node.icon}</span>
            <span className="bos-node-label">{node.label}</span>
          </button>
        )
      })}

      <div className="bos-phone-bezel">
        <span className="bos-phone-notch" />
        <div className="bos-phone-screen">
          <div className="bos-phone-head">
            <span className="bos-phone-avatar"><IconBrain /></span>
            <div>
              <strong>Aria</strong>
              <span className="bos-phone-status"><i /> Online</span>
            </div>
          </div>
          <div className="bos-phone-thread">
            {thread.map((m, i) => (
              <div className={m.from === 'bot' ? 'bos-bubble bos-bubble--bot' : 'bos-bubble bos-bubble--user'} key={`${m.text}-${i}`}>
                {m.tag && <span className="bos-bubble-tag">{m.tag}</span>}
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="bos-bubble bos-bubble--bot bos-bubble--typing">
                <span /><span /><span />
              </div>
            )}
          </div>
          <span className="bos-phone-home" />
        </div>
      </div>
    </div>
  )
}

export default BotOrbitStage
