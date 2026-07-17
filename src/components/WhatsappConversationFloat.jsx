import { useEffect, useState } from 'react'
import './WhatsappConversationFloat.css'
import { IconCart, IconRobot } from './icons.jsx'

const SCRIPT = [
  { type: 'in', text: "Hi! I'd like to buy wireless headphones." },
  { type: 'product', name: 'Acme Pro Headphones', price: '₹2,300', note: 'In stock — add it to your cart?' },
  { type: 'in', text: 'Yes, add it please.' },
  { type: 'out', text: 'Added! Your cart total is ₹2,300 — checkout whenever ready.' },
]

function WhatsappConversationFloat() {
  const [visible, setVisible] = useState(1)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let t
    if (visible >= SCRIPT.length) {
      t = setTimeout(() => {
        setTyping(false)
        setVisible(1)
      }, 2600)
      return () => clearTimeout(t)
    }
    const next = SCRIPT[visible]
    if (next.type === 'in') {
      t = setTimeout(() => setVisible((v) => v + 1), 900)
    } else {
      setTyping(true)
      t = setTimeout(() => {
        setTyping(false)
        setVisible((v) => v + 1)
      }, 1300)
    }
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div className="wcf" role="img" aria-label="A live WhatsApp conversation: a customer asks about headphones, the bot shows the product and adds it to the cart">
      <span className="wcf-tag"><i />AI handling this chat</span>

      <div className="wcf-thread">
        {SCRIPT.slice(0, visible).map((m, i) => {
          if (m.type === 'product') {
            return (
              <div className="wcf-row wcf-row--out" key={i}>
                <div className="wcf-bubble wcf-bubble--out wcf-product">
                  <div className="wcf-product-card">
                    <span className="wcf-product-ic"><IconCart /></span>
                    <div className="wcf-product-info">
                      <strong>{m.name}</strong>
                      <span>{m.price}</span>
                    </div>
                  </div>
                  <span className="wcf-product-note">{m.note}</span>
                </div>
              </div>
            )
          }
          const isOut = m.type === 'out'
          return (
            <div className={`wcf-row wcf-row--${m.type}`} key={i}>
              <div className={`wcf-bubble wcf-bubble--${m.type}`}>{m.text}</div>
              {isOut && <span className="wcf-av"><IconRobot /></span>}
            </div>
          )
        })}
        {typing && (
          <div className="wcf-row wcf-row--out">
            <div className="wcf-bubble wcf-bubble--out wcf-typing"><span /><span /><span /></div>
            <span className="wcf-av"><IconRobot /></span>
          </div>
        )}
      </div>

      <div className="wcf-stat">
        <strong>412</strong>
        <span>leads this week</span>
      </div>
    </div>
  )
}

export default WhatsappConversationFloat
