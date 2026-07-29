import { useEffect, useRef, useState } from 'react'
import './TelecomNetworkHeroMock.css'

// Same reveal-then-hold cadence as the other hero mocks, themed around the
// two things that make telecom support different from generic chat: a
// live-signal indicator standing in for network health, and one agent
// answering identically no matter which of five channels the customer used.
const STAGES = ['blank', 'customer', 'issue', 'step1', 'step2', 'step3']
const HOLD_MS = { blank: 450, customer: 600, issue: 600, step1: 700, step2: 700, step3: 2600 }

const CHANNELS = ['SMS', 'RCS', 'WhatsApp', 'Voice', 'Web']

const SCENES = [
  {
    initials: 'DK',
    name: 'Dana K.',
    issueLabel: 'Billing question',
    issueValue: '"Why is my bill $12 higher this month?"',
    channel: 0,
    steps: [
      { text: 'Account looked up · plan verified', time: '4:02 PM' },
      { text: 'Overage charge identified · roaming', time: '4:02 PM' },
      { text: 'Explanation sent · closed, no ticket', time: '4:02 PM' },
    ],
  },
  {
    initials: 'RM',
    name: 'Rafael M.',
    issueLabel: 'Outage report',
    issueValue: '"Is the network down in zone 4B?"',
    channel: 1,
    steps: [
      { text: 'Network status checked · outage confirmed', time: '9:14 AM' },
      { text: 'ETA shared · 40 minutes', time: '9:14 AM' },
      { text: 'Follow-up alert scheduled · auto-sent on fix', time: '9:15 AM' },
    ],
  },
  {
    initials: 'PT',
    name: 'Priya T.',
    issueLabel: 'Plan change',
    issueValue: '"Can I switch to the unlimited plan?"',
    channel: 3,
    steps: [
      { text: 'Current plan checked · eligible for upgrade', time: '2:41 PM' },
      { text: 'Plan switched · effective next cycle', time: '2:41 PM' },
      { text: 'Confirmation sent · closed, no ticket', time: '2:42 PM' },
    ],
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SignalBars() {
  return (
    <span className="tnh-signal" aria-hidden="true">
      <span className="tnh-bar" style={{ '--tnh-h': '35%' }} />
      <span className="tnh-bar" style={{ '--tnh-h': '55%' }} />
      <span className="tnh-bar" style={{ '--tnh-h': '75%' }} />
      <span className="tnh-bar" style={{ '--tnh-h': '100%' }} />
    </span>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TelecomNetworkHeroMock() {
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
  const scene = SCENES[sceneIndex]

  return (
    <div className="tnh-window" role="img" aria-label="Telecom support agent resolving a billing, outage or plan request, with a consistent account view across every channel">
      <div className="tnh-topbar">
        <span className="tnh-pill">
          <SignalBars />
          Network AI · Live
        </span>
      </div>

      <div className="tnh-channels">
        {CHANNELS.map((c, i) => (
          <span className={`tnh-channel${i === scene.channel ? ' is-active' : ''}`} key={c}>{c}</span>
        ))}
      </div>

      <div className={`tnh-card tnh-customer tnh-in${at('customer') ? ' is-visible' : ''}`}>
        <span className="tnh-avatar">{scene.initials}</span>
        <div className="tnh-customer-t">
          <strong>{scene.name}</strong>
          <span>via {CHANNELS[scene.channel]}</span>
        </div>
      </div>

      <div className={`tnh-card tnh-issue tnh-in${at('issue') ? ' is-visible' : ''}`}>
        <span className="tnh-issue-label">{scene.issueLabel}</span>
        <strong className="tnh-issue-value">{scene.issueValue}</strong>
      </div>

      <div className="tnh-trail">
        <span className="tnh-trail-label">Resolved end to end</span>
        <div className="tnh-trail-list">
          {scene.steps.map((row, i) => (
            <div className={`tnh-trail-row tnh-in${at(`step${i + 1}`) ? ' is-visible' : ''}`} key={row.text}>
              <span className="tnh-trail-check"><CheckIcon /></span>
              <span className="tnh-trail-text">{row.text}</span>
              <span className="tnh-trail-time">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TelecomNetworkHeroMock
