import { useEffect, useRef, useState } from 'react'
import './StoreAgentHeroMock.css'
import { IconPackage } from './icons.jsx'

const TRACK_STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for delivery']

// Cumulative reveal stages the loop steps through, each holding for its own
// beat before advancing — 'typing' and 'reco' are mutually exclusive so the
// dots read as the agent "composing" the recommendation before it lands.
const STAGES = ['blank', 'order', 'track', 'user', 'typing', 'reco', 'chips', 'input']
const HOLD_MS = { blank: 500, order: 500, track: 500, user: 550, typing: 950, reco: 2600, chips: 450, input: 2600 }

// Different conversations play in rotation each time the loop restarts, so
// the visual doesn't repeat the exact same order and product every cycle.
const SCENES = [
  {
    order: { id: '#SL-10294', eta: 'Arriving Tomorrow, by 6 PM' },
    user: 'Nice! Got a matching case for it?',
    product: { name: 'Slim Leather Case', rating: '4.9', price: '$24' },
  },
  {
    order: { id: '#SL-77213', eta: 'Arriving Today, by 8 PM' },
    user: 'Do you have this in a bigger size?',
    product: { name: 'Classic Fit — Size L', rating: '4.8', price: '$36' },
  },
  {
    order: { id: '#SL-40871', eta: 'Arriving Thursday, by noon' },
    user: 'Any accessories that go with this?',
    product: { name: 'Charging Dock', rating: '4.7', price: '$19' },
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Star() {
  return (
    <svg viewBox="0 0 20 20" width="10" height="10" fill="currentColor">
      <path d="M10 1.2l2.55 5.17 5.7.83-4.13 4.02.98 5.68L10 14.1l-5.1 2.8.98-5.68L1.75 7.2l5.7-.83L10 1.2z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M4 12l16-8-6 8 6 8-16-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function StoreAgentHeroMock() {
  const [stageIndex, setStageIndex] = useState(REDUCED ? STAGES.length - 1 : 0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    const stage = STAGES[stageIndex]
    timer.current = setTimeout(() => {
      setStageIndex((i) => {
        const next = (i + 1) % STAGES.length
        if (next === 0) setSceneIndex((s) => (s + 1) % SCENES.length)
        return next
      })
    }, HOLD_MS[stage])
    return () => clearTimeout(timer.current)
  }, [stageIndex])

  const at = (stage) => stageIndex >= STAGES.indexOf(stage)
  const showTyping = stageIndex === STAGES.indexOf('typing')
  const showReco = at('reco')
  const scene = SCENES[sceneIndex]

  return (
    <div className="sahm-window" role="img" aria-label="Store agent chat resolving an order status question and recommending a matching product">
      <div className="sahm-pill">
        <span className="sahm-pill-dot" />
        Store agent · replies instantly
      </div>

      <div className={`sahm-card sahm-order sahm-in${at('order') ? ' is-visible' : ''}`}>
        <span className="sahm-order-ic"><IconPackage /></span>
        <div className="sahm-order-t">
          <strong>Order {scene.order.id}</strong>
          <span>{scene.order.eta}</span>
        </div>
      </div>

      <div className={`sahm-track sahm-in${at('track') ? ' is-visible' : ''}`}>
        <div className="sahm-track-bar"><span style={{ width: '70%' }} /></div>
        <div className="sahm-track-steps">
          {TRACK_STEPS.map((step, i) => (
            <div className={`sahm-step${i < 3 ? ' is-done' : ''}`} key={step}>
              <span className="sahm-step-dot" />
              <span className="sahm-step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`sahm-bubble sahm-user sahm-in${at('user') ? ' is-visible' : ''}`}>
        {scene.user}
      </div>

      <div className={`sahm-typing sahm-in${showTyping ? ' is-visible' : ''}`} aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className={`sahm-card sahm-reco sahm-in${showReco ? ' is-visible' : ''}`}>
        <p className="sahm-reco-lead">This one pairs perfectly — in stock and ships with your order:</p>
        <div className="sahm-product">
          <span className="sahm-product-ic"><IconPackage /></span>
          <div className="sahm-product-t">
            <strong>{scene.product.name}</strong>
            <span className="sahm-product-rating"><Star /><Star /><Star /><Star /><Star /> {scene.product.rating}</span>
          </div>
          <div className="sahm-product-buy">
            <strong>{scene.product.price}</strong>
            <button type="button" className="sahm-add">Add to cart</button>
          </div>
        </div>
      </div>

      <div className={`sahm-chips sahm-in${at('chips') ? ' is-visible' : ''}`}>
        <span className="sahm-chip">Track order</span>
        <span className="sahm-chip">Returns</span>
        <span className="sahm-chip">Today's offers</span>
      </div>

      <div className={`sahm-input sahm-in${at('input') ? ' is-visible' : ''}`}>
        <span>Message Store agent…</span>
        <span className="sahm-send"><SendIcon /></span>
      </div>
    </div>
  )
}

export default StoreAgentHeroMock
