import { useEffect, useRef, useState } from 'react'
import './RealEstateLeadScoreHeroMock.css'

// Reveal-then-hold cadence shared with the other hero mocks, themed around
// the thing that matters most for a real-estate lead: is it actually
// qualified, on what criteria, and who does it get routed to.
const STAGES = ['blank', 'ring', 'criteria', 'qualified', 'routed']
const HOLD_MS = { blank: 400, ring: 1300, criteria: 900, qualified: 600, routed: 2600 }

const RADIUS = 78
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const SCENES = [
  {
    score: 91,
    criteria: [
      { key: 'B', label: 'Budget', value: '$650K approved' },
      { key: 'L', label: 'Location', value: 'Downtown loop' },
      { key: 'N', label: 'Need', value: 'Move by fall' },
      { key: 'T', label: 'Timeline', value: '30 days' },
    ],
    agent: 'Priya',
  },
  {
    score: 84,
    criteria: [
      { key: 'B', label: 'Budget', value: '$2,400/mo' },
      { key: 'L', label: 'Location', value: 'Transit line' },
      { key: 'N', label: 'Need', value: 'Pet-friendly' },
      { key: 'T', label: 'Timeline', value: 'This week' },
    ],
    agent: 'Marcus',
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="9" height="9" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RealEstateLeadScoreHeroMock() {
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
  const ringFilled = at('ring')
  const offset = ringFilled ? CIRCUMFERENCE * (1 - scene.score / 100) : CIRCUMFERENCE

  return (
    <div className="rls-window" role="img" aria-label="A real-estate lead scored and qualified against budget, location, need and timeline, then routed to an agent">
      <div className="rls-topbar">
        <span className="rls-pill">🏠 Property Lead Agent <span className="rls-live-dot" /></span>
      </div>

      <div className="rls-stage">
        <svg className={`rls-connectors${at('criteria') ? ' is-visible' : ''}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="rlsArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#4f5bd5" />
            </marker>
          </defs>
          <line className="rls-connector-line" x1="26" y1="15" x2="41" y2="37" markerEnd="url(#rlsArrow)" />
          <line className="rls-connector-line" x1="74" y1="15" x2="59" y2="37" markerEnd="url(#rlsArrow)" />
          <line className="rls-connector-line" x1="26" y1="85" x2="41" y2="63" markerEnd="url(#rlsArrow)" />
          <line className="rls-connector-line" x1="74" y1="85" x2="59" y2="63" markerEnd="url(#rlsArrow)" />
        </svg>

        {scene.criteria.map((c, i) => (
          <div className={`rls-node rls-node--${i} rls-in${at('criteria') ? ' is-visible' : ''}`} key={c.key}>
            <span className="rls-node-avatar">{c.key}{at('qualified') && <span className="rls-node-check"><CheckIcon /></span>}</span>
            <div className="rls-node-t">
              <strong>{c.label}</strong>
              <span>{c.value}</span>
            </div>
          </div>
        ))}

        <div className="rls-ring">
          <svg viewBox="0 0 180 180" width="164" height="164">
            <defs>
              <linearGradient id="rlsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f5bd5" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="10" />
            <circle
              cx="90" cy="90" r={RADIUS} fill="none" stroke="url(#rlsGrad)" strokeWidth="10"
              strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
              transform="rotate(-90 90 90)" className="rls-ring-progress"
            />
          </svg>
          <div className="rls-ring-center">
            <span className="rls-ring-label">Lead score</span>
            <strong className="rls-ring-score">{ringFilled ? scene.score : 0}</strong>
            <span className={`rls-qualified${at('qualified') ? ' is-visible' : ''}`}>Qualified</span>
          </div>
        </div>
      </div>

      <div className={`rls-routed rls-in${at('routed') ? ' is-visible' : ''}`}>
        <ArrowIcon />
        Routed to Sales · {scene.agent}
      </div>
    </div>
  )
}

export default RealEstateLeadScoreHeroMock
