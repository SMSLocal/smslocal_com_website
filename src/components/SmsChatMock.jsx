import { useEffect, useRef, useState } from 'react'
import './SmsChatMock.css'

const SCRIPT = [
  { from: 'in', text: 'Hi, has my order shipped yet?' },
  { from: 'out', text: 'Yes! Order #4821 shipped this morning — arriving Thursday.' },
  { from: 'in', text: 'Can I change the delivery address?' },
  { from: 'out', text: 'Done — updated and confirmed with the courier. Anything else?' },
]

function SmsChatMock() {
  // Start with the first message shown so the thread is never fully empty
  const [visible, setVisible] = useState(1)
  const [typing, setTyping] = useState(false)
  const threadRef = useRef(null)

  useEffect(() => {
    let t
    if (visible >= SCRIPT.length) {
      t = setTimeout(() => {
        setTyping(false)
        setVisible(1)
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
      t = setTimeout(() => setVisible((v) => v + 1), 900)
    }
    return () => clearTimeout(t)
  }, [visible])

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [visible, typing])

  return (
    <div className="sms-phone">
      <div className="sms-notch" />

      <div className="sms-statusbar">
        <span className="sms-time">9:41</span>
        <span className="sms-status-icons">
          <span className="sms-signal">
            <i style={{ height: '4px' }} />
            <i style={{ height: '6px' }} />
            <i style={{ height: '8px' }} />
            <i style={{ height: '10px' }} />
          </span>
          <span className="sms-battery" />
        </span>
      </div>

      <div className="sms-screen">
        <div className="sms-header">
          <span className="sms-back" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <div className="sms-header-text">
            <strong>SMSLocal Support</strong>
            <span>+1 415 555 0123</span>
          </div>
        </div>

        <div className="sms-thread" ref={threadRef}>
          {SCRIPT.slice(0, visible).map((m, i) => (
            <div className={`sms-row ${m.from}`} key={i}>
              {m.from === 'in' && <span className="sms-avatar">JD</span>}
              <span className={`sms-bubble ${m.from}`}>{m.text}</span>
            </div>
          ))}
          {typing && (
            <div className="sms-row out">
              <span className="sms-bubble out sms-typing"><span /><span /><span /></span>
            </div>
          )}
        </div>

        <div className="sms-input">
          <span className="sms-input-box">Type your message</span>
          <span className="sms-send" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15"><path d="M4 12l16-7-7 16-2-7-7-2z" fill="currentColor" /></svg>
          </span>
        </div>
      </div>

      <div className="sms-home-indicator" />
    </div>
  )
}

export default SmsChatMock
