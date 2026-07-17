import { useEffect, useRef, useState } from 'react'
import './WhatsappAgentChat.css'
import { IconChat } from './icons.jsx'

const SCRIPT = [
  { from: 'in', text: 'Hi, where is my order #NW-4821?' },
  { from: 'out', text: 'Let me check that for you — one sec.' },
  { from: 'out', text: 'Shipped this morning via express, arriving Thursday. Want the tracking link?' },
  { from: 'in', text: 'Yes please' },
  { from: 'out', text: 'Here you go: smslocal.link/8821. Anything else I can help with?' },
  { from: 'in', text: 'Can I change the delivery address?' },
  { from: 'out', text: 'Done — updated to your new address and confirmed with the courier. ✓' },
]

function WhatsappAgentChat() {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)
  const threadRef = useRef(null)

  useEffect(() => {
    let t
    if (visible >= SCRIPT.length) {
      t = setTimeout(() => {
        setTyping(false)
        setVisible(0)
      }, 2800)
      return () => clearTimeout(t)
    }

    const next = SCRIPT[visible]
    if (next.from === 'out') {
      setTyping(true)
      t = setTimeout(() => {
        setTyping(false)
        setVisible((v) => v + 1)
      }, 1300)
    } else {
      t = setTimeout(() => setVisible((v) => v + 1), 850)
    }
    return () => clearTimeout(t)
  }, [visible])

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [visible, typing])

  return (
    <div className="wac-phone">
      <div className="wac-notch" />

      <div className="wac-statusbar">
        <span className="wac-time">9:41</span>
        <span className="wac-status-icons">
          <span className="wac-signal">
            <i style={{ height: '4px' }} />
            <i style={{ height: '6px' }} />
            <i style={{ height: '8px' }} />
            <i style={{ height: '10px' }} />
          </span>
          <span className="wac-battery" />
        </span>
      </div>

      <div className="wac-screen">
        <div className="wac-header">
          <span className="wac-avatar"><IconChat /></span>
          <div className="wac-header-text">
            <strong>SMSLocal AI Agent</strong>
            <span><span className="wac-online-dot" />online · replies in seconds</span>
          </div>
          <span className="wac-verified">Verified ✓</span>
        </div>

        <div className="wac-thread" ref={threadRef}>
          {SCRIPT.slice(0, visible).map((msg, i) => (
            <div className={`wac-bubble ${msg.from}`} key={i}>{msg.text}</div>
          ))}

          {typing && (
            <div className="wac-bubble out wac-typing">
              <span /><span /><span />
            </div>
          )}
        </div>
      </div>

      <div className="wac-home-indicator" />
    </div>
  )
}

export default WhatsappAgentChat
