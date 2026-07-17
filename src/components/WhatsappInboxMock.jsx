import { useEffect, useState } from 'react'
import './WhatsappInboxMock.css'
import { IconCheck } from './icons.jsx'

const SCRIPT = [
  { from: 'in', text: 'Hi, can you deliver by this Sunday?' },
  { from: 'out', text: 'Hi! What would you like to order, and for what time on Sunday?' },
  { from: 'in', text: "I'm planning catering for a small event — around 20 people." },
  { from: 'out', text: "Got it — I've drafted an order for 20 and sent over the menu." },
]

const ACTIONS = ['Order drafted', 'Menu sent']

function WhatsappInboxMock() {
  const [visible, setVisible] = useState(1)
  const [typing, setTyping] = useState(false)
  const [actionsShown, setActionsShown] = useState(0)

  useEffect(() => {
    let t
    if (visible >= SCRIPT.length) {
      if (actionsShown < ACTIONS.length) {
        t = setTimeout(() => setActionsShown((a) => a + 1), 650)
      } else {
        t = setTimeout(() => {
          setVisible(1)
          setActionsShown(0)
        }, 2800)
      }
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
  }, [visible, actionsShown])

  return (
    <div className="wam" role="img" aria-label="An autonomous WhatsApp AI agent replying to a catering request, then drafting an order and sending the menu">
      <span className="wam-tag"><i className="wam-tag-dot" />WhatsApp AI Agent</span>

      <div className="wam-thread">
        {SCRIPT.slice(0, visible).map((m, i) => (
          <div className={`wam-row wam-row--${m.from}`} key={i}>
            <div className={`wam-bubble wam-bubble--${m.from}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="wam-row wam-row--out">
            <div className="wam-bubble wam-bubble--out wam-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="wam-actions">
        {ACTIONS.map((a, i) => (
          <span className={`wam-action${i < actionsShown ? ' wam-action--in' : ''}`} key={a}>
            <span className="wam-action-ic"><IconCheck /></span>
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}

export default WhatsappInboxMock
