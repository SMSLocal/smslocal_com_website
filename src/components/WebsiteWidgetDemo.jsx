import { useState } from 'react'
import './WebsiteWidgetDemo.css'

// The widget floats over a mock website page, exactly like a real chat
// widget embedded on a site. All three messages are always in the markup
// (nothing waits on a JS timer to reveal them), so the panel never opens
// empty — only open/close is stateful, and that's a plain click toggle.

const SCRIPT = [
  { from: 'bot', text: "Hi! I'm the SMSLocal assistant. How can I help?" },
  { from: 'user', text: 'Do you offer a free trial?' },
  { from: 'bot', text: 'Yes — a free trial with credits, no card needed. Want me to set it up?' },
]

function WebsiteWidgetDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div className="wwd">
      <div className="wwd-page" aria-hidden="true">
        <span className="wwd-page-dot wwd-page-dot--1" />
        <span className="wwd-page-dot wwd-page-dot--2" />
        <span className="wwd-page-dot wwd-page-dot--3" />
        <span className="wwd-skel wwd-skel--title" />
        <span className="wwd-skel" />
        <span className="wwd-skel" />
        <span className="wwd-skel wwd-skel--short" />
      </div>

      <div className={`wwd-widget${open ? ' is-open' : ''}`}>
        <div className="wwd-panel">
          <div className="wwd-panel-header">
            <img className="wwd-avatar" src="/favicon.svg" alt="" />
            <span className="wwd-panel-heading">
              <strong>SMSLocal Assistant</strong>
              <span className="wwd-online"><i />Online now</span>
            </span>
            <button type="button" className="wwd-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="wwd-thread">
            {SCRIPT.map((m, i) => (
              <div className={`wwd-row wwd-row--${m.from === 'bot' ? 'in' : 'out'}`} style={{ animationDelay: `${i * 0.45}s` }} key={i}>
                <div className={`wwd-msg wwd-msg--${m.from === 'bot' ? 'in' : 'out'}`}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className="wwd-stat">
            <strong>3.2s</strong>
            <span>avg first reply</span>
          </div>
        </div>

        <button type="button" className="wwd-bubble" onClick={() => setOpen(true)} aria-label="Open chat">
          <img src="/favicon.svg" alt="" />
          <span className="wwd-bubble-badge">1</span>
        </button>
      </div>
    </div>
  )
}

export default WebsiteWidgetDemo
