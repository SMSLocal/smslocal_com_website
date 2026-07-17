import { useState, useEffect } from 'react'
import './EcomAgentMock.css'

const MESSAGES = [
  { from: 'user', text: "Hey — where's my order?" },
  {
    from: 'agent',
    type: 'order',
    order: {
      id: '#SL-10294',
      eta: 'Tomorrow, by 6 PM',
      steps: ['Ordered', 'Packed', 'Shipped', 'Out for delivery'],
      done: 3,
    },
  },
  { from: 'user', text: 'Nice! Got a matching case for it?' },
  {
    from: 'agent',
    type: 'product',
    text: 'This one pairs perfectly — in stock and ships with your order:',
    product: { name: 'Slim Leather Case', price: '$24', rating: '4.9' },
  },
]

const CHIPS = ['Track order', 'Returns', "Today's offers"]
const HOLD = 3 // extra ticks to hold the full conversation before looping

function StarRow() {
  return (
    <span className="ecm-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="9" height="9">
          <path d="M12 2l2.9 6.2 6.6.7-4.9 4.5 1.4 6.5L12 17.8 5.9 20.4l1.4-6.5L2.4 8.9l6.6-.7z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

function OrderCard({ order }) {
  return (
    <div className="ecm-order">
      <div className="ecm-order-head">
        <span className="ecm-order-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" />
          </svg>
        </span>
        <div>
          <strong>Order {order.id}</strong>
          <span className="ecm-order-eta">Arriving {order.eta}</span>
        </div>
      </div>

      <div className="ecm-track">
        <div className="ecm-track-line"><i className="ecm-track-fill" /></div>
        <div className="ecm-track-steps">
          {order.steps.map((s, i) => (
            <span
              className={`ecm-step${i < order.done ? ' is-done' : ''}${i === order.done ? ' is-now' : ''}`}
              style={{ '--sd': `${0.25 + i * 0.32}s` }}
              key={s}
            >
              <i className="ecm-step-dot" />
              <em>{s}</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="ecm-product">
      <span className="ecm-product-img" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2l1.5 3h9L18 2" /><path d="M4 5h16l-1.2 14.2A2 2 0 0 1 16.8 21H7.2a2 2 0 0 1-2-1.8L4 5z" />
        </svg>
      </span>
      <div className="ecm-product-body">
        <strong>{product.name}</strong>
        <div className="ecm-product-meta">
          <StarRow /><span className="ecm-product-rate">{product.rating}</span>
        </div>
      </div>
      <div className="ecm-product-side">
        <span className="ecm-product-price">{product.price}</span>
        <button className="ecm-product-btn" type="button" tabIndex={-1}>Add to cart</button>
      </div>
    </div>
  )
}

function EcomAgentMock() {
  // step = number of messages revealed (starts at 1 so the first bubble shows immediately)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= MESSAGES.length + HOLD ? 1 : s + 1))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, MESSAGES.length)
  const nextIsAgent = step < MESSAGES.length && MESSAGES[step]?.from === 'agent'

  return (
    <div className="ecm" role="img" aria-label="Ecommerce AI agent resolving a shopper's order and recommending a product">
      <span className="ecm-tag">
        <i className="ecm-tag-dot" />
        Store agent · replies instantly
      </span>

      <div className="ecm-thread">
        {MESSAGES.slice(0, shown).map((m, i) => (
          <div className={`ecm-msg ecm-${m.from} ecm-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            {m.type === 'order' ? (
              <div className="ecm-bubble ecm-bubble-card"><OrderCard order={m.order} /></div>
            ) : m.type === 'product' ? (
              <div className="ecm-bubble ecm-bubble-card">
                {m.text && <p className="ecm-bubble-lead">{m.text}</p>}
                <ProductCard product={m.product} />
              </div>
            ) : (
              <div className="ecm-bubble">{m.text}</div>
            )}
          </div>
        ))}

        {nextIsAgent && (
          <div className="ecm-msg ecm-agent">
            <div className="ecm-bubble ecm-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="ecm-chips">
        {CHIPS.map((c) => <span className="ecm-chip" key={c}>{c}</span>)}
      </div>

      <div className="ecm-input">
        <span className="ecm-input-ph">Message Store agent…</span>
        <span className="ecm-send" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default EcomAgentMock
