import { useEffect, useRef, useState } from 'react'
import './FintechAgentHeroMock.css'

// Cumulative reveal stages the loop steps through — each session verifies a
// customer, surfaces their balance, then writes three audit-trail rows one
// at a time, mirroring how the agent would actually narrate its own actions.
const STAGES = ['blank', 'customer', 'balance', 'audit1', 'audit2', 'audit3']
const HOLD_MS = { blank: 500, customer: 650, balance: 650, audit1: 750, audit2: 750, audit3: 2800 }

const SCENES = [
  {
    initials: 'JM',
    name: 'James Miller',
    account: 'Checking ···1234',
    balance: '$4,215.60',
    audit: [
      { text: 'Identity verified · KYC pass', time: '9:41 AM' },
      { text: 'Balance checked · read-only', time: '9:41 AM' },
      { text: 'Statement sent · verified email', time: '9:42 AM' },
    ],
  },
  {
    initials: 'PN',
    name: 'Priya Nair',
    account: 'Savings ···7782',
    balance: '$12,940.10',
    audit: [
      { text: 'Identity verified · KYC pass', time: '2:14 PM' },
      { text: 'Card frozen · fraud flag', time: '2:15 PM' },
      { text: 'Alert sent · SMS + WhatsApp', time: '2:15 PM' },
    ],
  },
  {
    initials: 'DO',
    name: 'Daniel Ortiz',
    account: 'Checking ···3390',
    balance: '$860.25',
    audit: [
      { text: 'Identity verified · KYC pass', time: '11:07 AM' },
      { text: 'Low balance flagged · auto alert', time: '11:07 AM' },
      { text: 'Transfer blocked · risk review', time: '11:08 AM' },
    ],
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M12 2.6l7.5 2.7v5.9c0 4.7-3.2 8.9-7.5 10.2-4.3-1.3-7.5-5.5-7.5-10.2V5.3L12 2.6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function FintechAgentHeroMock() {
  const [stageIndex, setStageIndex] = useState(REDUCED ? STAGES.length - 1 : 0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [seconds, setSeconds] = useState(191)
  const timer = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    const stage = STAGES[stageIndex]
    timer.current = setTimeout(() => {
      setStageIndex((i) => {
        const next = (i + 1) % STAGES.length
        if (next === 0) {
          setSceneIndex((s) => (s + 1) % SCENES.length)
          setSeconds((s) => s + 47)
        }
        return next
      })
    }, HOLD_MS[stage])
    return () => clearTimeout(timer.current)
  }, [stageIndex])

  useEffect(() => {
    if (REDUCED) return undefined
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  const at = (stage) => stageIndex >= STAGES.indexOf(stage)
  const scene = SCENES[sceneIndex]

  return (
    <div className="fahm-window" role="img" aria-label="Fintech support agent verifying a customer, checking their balance and writing an audit trail">
      <div className="fahm-topbar">
        <span className="fahm-pill">
          <span className="fahm-pill-ic"><ShieldIcon /></span>
          Support Tier 1 · Scoped access
        </span>
        <span className="fahm-live">
          <span className="fahm-live-dot" />
          Live · {formatTimer(seconds)}
        </span>
      </div>

      <div className={`fahm-card fahm-customer fahm-in${at('customer') ? ' is-visible' : ''}`}>
        <span className="fahm-avatar">{scene.initials}</span>
        <div className="fahm-customer-t">
          <strong>{scene.name}</strong>
          <span>{scene.account}</span>
        </div>
        <span className="fahm-verified"><CheckIcon /> Verified</span>
      </div>

      <div className={`fahm-card fahm-balance fahm-in${at('balance') ? ' is-visible' : ''}`}>
        <span className="fahm-balance-label">Available balance</span>
        <strong className="fahm-balance-value">{scene.balance}</strong>
      </div>

      <div className="fahm-audit">
        <span className="fahm-audit-label">Audit trail</span>
        <div className="fahm-audit-list">
          {scene.audit.map((row, i) => (
            <div className={`fahm-audit-row fahm-in${at(`audit${i + 1}`) ? ' is-visible' : ''}`} key={row.text}>
              <span className="fahm-audit-check"><CheckIcon /></span>
              <span className="fahm-audit-text">{row.text}</span>
              <span className="fahm-audit-time">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FintechAgentHeroMock
