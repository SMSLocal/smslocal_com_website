import { useEffect, useRef, useState } from 'react'
import './SdrProspectPipelineHeroMock.css'

const STAGES = ['blank', 'lead', 'research', 'message', 'reply', 'booked']
const HOLD_MS = { blank: 400, lead: 700, research: 900, message: 900, reply: 900, booked: 2600 }

const SCENES = [
  {
    initials: 'LA',
    name: 'Leslie Alexander',
    role: 'Sales Director · Ramp',
    research: 'Company raised Series C · hiring 12 reps',
    message: '"Saw Ramp is scaling the sales team — worth a 15 min chat?"',
    reply: '"Sure, next week works."',
    meeting: 'Meeting booked · Tue, 2:00 PM',
  },
  {
    initials: 'CW',
    name: 'Cameron Williamson',
    role: 'VP of Sales · Brex',
    research: 'Recently posted about outbound pain points',
    message: '"Noticed your post on outbound — got 15 min this week?"',
    reply: '"Yes, send an invite."',
    meeting: 'Meeting booked · Thu, 11:00 AM',
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SdrProspectPipelineHeroMock() {
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
    <div className="spp-window" role="img" aria-label="A new lead moving through an AI SDR pipeline: research, personalized outreach, reply and a booked meeting">
      <div className="spp-topbar">
        <span className="spp-pill">AI SDR · Live</span>
      </div>

      <div className={`spp-lead spp-in${at('lead') ? ' is-visible' : ''}`}>
        <span className="spp-avatar">{scene.initials}</span>
        <div className="spp-lead-t">
          <strong>{scene.name}</strong>
          <span>{scene.role}</span>
        </div>
        <span className="spp-lead-tag">New lead</span>
      </div>

      <div className={`spp-research spp-in${at('research') ? ' is-visible' : ''}`}>
        <span className="spp-research-icon"><SearchIcon /></span>
        {scene.research}
      </div>

      <div className={`spp-message spp-in${at('message') ? ' is-visible' : ''}`}>{scene.message}</div>

      {at('reply') && (
        <div className="spp-reply spp-in is-visible">{scene.reply}</div>
      )}

      <div className={`spp-booked spp-in${at('booked') ? ' is-visible' : ''}`}>
        <CheckIcon />
        {scene.meeting}
      </div>
    </div>
  )
}

export default SdrProspectPipelineHeroMock
