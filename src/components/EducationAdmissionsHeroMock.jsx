import { useEffect, useRef, useState } from 'react'
import './EducationAdmissionsHeroMock.css'

// Mirrors the reveal-then-hold pattern used by the other industry hero mocks:
// step through an applicant's journey one beat at a time, then cycle to the
// next applicant. The funnel dots track cumulative progress across the beats
// so the visual reads as "this applicant is moving through admissions", not
// just a list of facts appearing.
const STAGES = ['blank', 'applicant', 'deadline', 'step1', 'step2', 'step3']
const HOLD_MS = { blank: 450, applicant: 600, deadline: 600, step1: 700, step2: 700, step3: 2600 }

const FUNNEL = ['Enquiry', 'Documents', 'Interview', 'Enrolled']

const SCENES = [
  {
    initials: 'MC',
    name: 'Maya Chen',
    programme: 'MSc Data Science',
    deadline: '3 days left to apply',
    funnelStage: 1,
    steps: [
      { text: 'Enquiry logged · programme matched', time: '9:12 AM' },
      { text: 'Documents verified · auto-check passed', time: '9:14 AM' },
      { text: 'Deadline reminder sent · WhatsApp', time: '9:14 AM' },
    ],
  },
  {
    initials: 'LD',
    name: 'Lucas Duarte',
    programme: 'BA International Business',
    deadline: 'Interview requested',
    funnelStage: 2,
    steps: [
      { text: 'Application fee received · confirmed', time: '1:47 PM' },
      { text: 'Interview slot offered · auto-booked', time: '1:48 PM' },
      { text: 'Confirmation sent · SMS + email', time: '1:48 PM' },
    ],
  },
  {
    initials: 'AO',
    name: 'Amara Okafor',
    programme: 'MBA Global Management',
    deadline: 'Enrolled for Fall intake',
    funnelStage: 4,
    steps: [
      { text: 'Offer accepted · deposit received', time: '4:20 PM' },
      { text: 'Orientation invite sent · auto-scheduled', time: '4:21 PM' },
      { text: 'Enrolment complete · welcome packet sent', time: '4:22 PM' },
    ],
  },
]

const GREETINGS = ['Hello', 'Hola', 'Bonjour', '你好', 'नमस्ते', 'مرحبا']

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M12 4 2 9l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 11.5V17c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5a2.5 2.5 0 0 1 2.5 2.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.6" />
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

function EducationAdmissionsHeroMock() {
  const [stageIndex, setStageIndex] = useState(REDUCED ? STAGES.length - 1 : 0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [seconds, setSeconds] = useState(214)
  const [greetIndex, setGreetIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    const stage = STAGES[stageIndex]
    timer.current = setTimeout(() => {
      setStageIndex((i) => {
        const next = (i + 1) % STAGES.length
        if (next === 0) {
          setSceneIndex((s) => (s + 1) % SCENES.length)
          setSeconds((s) => s + 38)
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

  useEffect(() => {
    if (REDUCED) return undefined
    const cycle = setInterval(() => setGreetIndex((g) => (g + 1) % GREETINGS.length), 1700)
    return () => clearInterval(cycle)
  }, [])

  const at = (stage) => stageIndex >= STAGES.indexOf(stage)
  const scene = SCENES[sceneIndex]
  const activeFunnelStage = at('step3') ? scene.funnelStage : Math.min(scene.funnelStage, 1)

  return (
    <div className="eahm-window" role="img" aria-label="Admissions AI agent guiding an applicant from enquiry through to enrolment, with deadline reminders and multilingual support">
      <span className="eahm-float eahm-float--cap" aria-hidden="true"><CapIcon /></span>
      <span className="eahm-float eahm-float--book" aria-hidden="true"><BookIcon /></span>
      <span className="eahm-float eahm-float--globe" aria-hidden="true"><GlobeIcon /></span>

      <div className="eahm-topbar">
        <span className="eahm-pill">
          <span className="eahm-pill-ic"><CapIcon /></span>
          Admissions AI · Live
        </span>
        <span className="eahm-lang" key={greetIndex}>{GREETINGS[greetIndex]}</span>
      </div>

      <div className={`eahm-card eahm-applicant eahm-in${at('applicant') ? ' is-visible' : ''}`}>
        <span className="eahm-avatar">{scene.initials}</span>
        <div className="eahm-applicant-t">
          <strong>{scene.name}</strong>
          <span>{scene.programme}</span>
        </div>
        <span className="eahm-live">
          <span className="eahm-live-dot" />
          {formatTimer(seconds)}
        </span>
      </div>

      <div className={`eahm-card eahm-deadline eahm-in${at('deadline') ? ' is-visible' : ''}`}>
        <span className="eahm-deadline-label">Status</span>
        <strong className="eahm-deadline-value">{scene.deadline}</strong>
      </div>

      <div className="eahm-funnel">
        {FUNNEL.map((label, i) => (
          <div className={`eahm-funnel-stop${i < activeFunnelStage ? ' is-done' : ''}`} key={label}>
            <span className="eahm-funnel-dot" />
            <span className="eahm-funnel-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="eahm-journey">
        <span className="eahm-journey-label">Journey</span>
        <div className="eahm-journey-list">
          {scene.steps.map((row, i) => (
            <div className={`eahm-journey-row eahm-in${at(`step${i + 1}`) ? ' is-visible' : ''}`} key={row.text}>
              <span className="eahm-journey-check"><CheckIcon /></span>
              <span className="eahm-journey-text">{row.text}</span>
              <span className="eahm-journey-time">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationAdmissionsHeroMock
