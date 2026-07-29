import { useEffect, useRef, useState } from 'react'
import './ResolutionWorkflowHeroMock.css'

// Not a chat thread — the page's whole point is that a real agent takes
// action instead of just replying, so the hero visualizes a pipeline of
// actions completing in sequence, not message bubbles.
const STAGES = ['blank', 'request', 'step0', 'step1', 'step2', 'step3', 'resolved']
const HOLD_MS = { blank: 400, request: 700, step0: 650, step1: 650, step2: 650, step3: 650, resolved: 2600 }

const SCENES = [
  {
    request: '"Where\'s my order #4821? It\'s three days late."',
    channel: 'WhatsApp',
    steps: ['Order #4821 looked up', 'Carrier delay confirmed', 'Refund issued · $42.00', 'Record updated · ticket closed'],
    time: '8s',
  },
  {
    request: '"I was double-charged for my subscription this month."',
    channel: 'Email',
    steps: ['Account & billing checked', 'Duplicate charge confirmed', 'Refund issued · $29.00', 'Record updated · ticket closed'],
    time: '6s',
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function ResolutionWorkflowHeroMock() {
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
  const stepsReached = ['step0', 'step1', 'step2', 'step3'].filter((s) => at(s)).length

  return (
    <div className="rwm-window" role="img" aria-label="An AI agent taking a sequence of real actions to resolve a customer request, ending in a closed ticket">
      <div className="rwm-topbar">
        <span className="rwm-pill"><BoltIcon />Resolution Agent · Live</span>
      </div>

      <div className={`rwm-request rwm-in${at('request') ? ' is-visible' : ''}`}>
        <span className="rwm-request-channel">{scene.channel}</span>
        <strong>{scene.request}</strong>
      </div>

      <div className="rwm-pipeline">
        <span className="rwm-pipeline-line" aria-hidden="true">
          <span className="rwm-pipeline-fill" style={{ '--rwm-steps': stepsReached }} />
        </span>
        <div className="rwm-pipeline-list">
          {scene.steps.map((step, i) => (
            <div className={`rwm-step rwm-in${stepsReached > i ? ' is-visible' : ''}`} key={step}>
              <span className="rwm-step-dot"><CheckIcon /></span>
              <span className="rwm-step-text">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rwm-resolved rwm-in${at('resolved') ? ' is-visible' : ''}`}>
        <CheckIcon />
        Resolved in {scene.time} · no human needed
      </div>
    </div>
  )
}

export default ResolutionWorkflowHeroMock
