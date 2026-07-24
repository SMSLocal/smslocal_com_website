import { useEffect, useRef, useState } from 'react'
import './BuilderFlowLive.css'
import { IconBolt, IconChat, IconRefresh, IconClock, IconBrain, IconGear } from './icons.jsx'

/**
 * Hero visual for /chatbot/builder, built from scratch: a live, clickable
 * mini flow-builder on a proper canvas — click a block in the palette to
 * snap it into an open branch and watch the connector draw itself in.
 * Auto-plays as an idle demo when untouched, so it's never sitting empty.
 */

const PALETTE = [
  { id: 'condition', icon: <IconRefresh />, label: 'Condition' },
  { id: 'delay', icon: <IconClock />, label: 'Delay' },
  { id: 'ai', icon: <IconBrain />, label: 'AI reply' },
  { id: 'buttons', icon: <IconGear />, label: 'Buttons' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BuilderFlowLive() {
  const [slots, setSlots] = useState([null, null]) // the two branch slots off "Welcome"
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const fillNext = (id) => {
    setSlots((prev) => {
      const openIndex = prev.findIndex((s) => s === null)
      if (openIndex === -1 || prev.includes(id)) return prev
      const next = [...prev]
      next[openIndex] = id
      return next
    })
  }

  const handleClick = (id) => {
    setPaused(true)
    fillNext(id)
  }

  useEffect(() => {
    if (REDUCED) {
      setSlots(['condition', 'ai'])
      return undefined
    }
    if (paused) return undefined

    const filled = slots.filter(Boolean).length

    if (filled >= 2) {
      timer.current = setTimeout(() => setSlots([null, null]), 2400)
      return () => clearTimeout(timer.current)
    }

    const nextId = PALETTE.find((p) => !slots.includes(p.id))?.id
    timer.current = setTimeout(() => { if (nextId) fillNext(nextId) }, filled === 0 ? 1200 : 1000)
    return () => clearTimeout(timer.current)
  }, [slots, paused])

  useEffect(() => {
    if (!paused) return undefined
    const t = setTimeout(() => setPaused(false), 3400)
    return () => clearTimeout(t)
  }, [paused])

  const filledCount = slots.filter(Boolean).length
  const nodeFor = (id) => PALETTE.find((p) => p.id === id)

  return (
    <div
      className="bfl"
      role="img"
      aria-label="An interactive chatbot flow builder canvas: click a block to branch it off the Welcome step"
    >
      <div className="bfl-topbar">
        <span className="bfl-dot bfl-dot--r" /><span className="bfl-dot bfl-dot--y" /><span className="bfl-dot bfl-dot--g" />
        <span className="bfl-topbar-title">Untitled flow</span>
        {filledCount >= 2 && (
          <span className="bfl-live-badge">
            <span className="bfl-live-dot" /> Live
          </span>
        )}
      </div>

      <div className="bfl-palette">
        {PALETTE.map((p) => {
          const used = slots.includes(p.id)
          return (
            <button
              type="button"
              key={p.id}
              className={used ? 'bfl-palette-item is-used' : 'bfl-palette-item'}
              onClick={() => handleClick(p.id)}
              disabled={used}
            >
              <span className="bfl-palette-ic">{used ? '✓' : p.icon}</span>
              {p.label}
            </button>
          )
        })}
      </div>

      <div className="bfl-canvas">
        <svg className="bfl-canvas-grid" aria-hidden="true">
          <pattern id="bfl-dotgrid" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#bfl-dotgrid)" />
        </svg>

        <svg className="bfl-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="bfl-link is-on" d="M18 46 H 40" />
          <path className={`bfl-link${filledCount >= 1 ? ' is-on' : ''}`} d="M58 46 C 68 46, 68 22, 78 22" />
          <path className={`bfl-link${filledCount >= 2 ? ' is-on' : ''}`} d="M58 46 C 68 46, 68 74, 78 74" />
        </svg>

        <div className="bfl-node bfl-node--start">
          <span className="bfl-node-ic bfl-node-ic--start"><IconBolt /></span>
          <strong>Start</strong>
        </div>

        <div className="bfl-node bfl-node--msg">
          <span className="bfl-node-ic"><IconChat /></span>
          <strong>Welcome</strong>
        </div>

        {[0, 1].map((i) => {
          const id = slots[i]
          const node = id && nodeFor(id)
          return (
            <div className={`bfl-slot bfl-slot--${i}${node ? ' is-filled' : ''}`} key={i}>
              {node ? (
                <div className="bfl-node bfl-node--pop">
                  <span className="bfl-node-ic bfl-node-ic--fill">{node.icon}</span>
                  <strong>{node.label}</strong>
                </div>
              ) : (
                <span className="bfl-slot-hint">+</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BuilderFlowLive
