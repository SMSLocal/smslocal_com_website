import { useEffect, useState } from 'react'
import './WebsiteConversationFloat.css'
import { IconChat } from './icons.jsx'

const SCRIPT = [
  { from: 'bot', text: "Hi! I'm the SMSLocal assistant. How can I help?" },
  { from: 'user', text: 'Do you offer a free trial?' },
  { from: 'bot', text: 'Yes — a free trial with credits, no card needed. Want me to set it up?' },
]

function WebsiteConversationFloat() {
  const [visible, setVisible] = useState(1)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let t
    if (visible >= SCRIPT.length) {
      t = setTimeout(() => { setTyping(false); setVisible(1) }, 2600)
      return () => clearTimeout(t)
    }
    const next = SCRIPT[visible]
    if (next.from === 'bot') {
      setTyping(true)
      t = setTimeout(() => { setTyping(false); setVisible((v) => v + 1) }, 1300)
    } else {
      t = setTimeout(() => setVisible((v) => v + 1), 900)
    }
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div className="webcf" role="img" aria-label="A live website chat widget conversation: a visitor asks about a free trial and the bot replies instantly">
      <span className="webcf-tag"><i />Online now</span>

      <div className="webcf-thread">
        {SCRIPT.slice(0, visible).map((m, i) => (
          <div className={`webcf-row webcf-row--${m.from === 'bot' ? 'in' : 'out'}`} key={i}>
            <div className={`webcf-bubble webcf-bubble--${m.from === 'bot' ? 'in' : 'out'}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="webcf-row webcf-row--in">
            <div className="webcf-bubble webcf-bubble--in webcf-typing"><span /><span /><span /></div>
          </div>
        )}
      </div>

      <div className="webcf-stat">
        <strong>3.2s</strong>
        <span>avg first reply</span>
      </div>

      <div className="webcf-launcher">
        <IconChat />
        <span className="webcf-launcher-badge">1</span>
      </div>
    </div>
  )
}

export default WebsiteConversationFloat
