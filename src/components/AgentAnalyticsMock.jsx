import { useEffect, useState } from 'react'
import './AgentAnalyticsMock.css'
import { IconCheck } from './icons.jsx'

const TIMELINE = [
  { day: 'Mon', label: 'Appointment reminder' },
  { day: 'Wed', label: 'Refill reminder' },
  { day: 'Fri', label: 'Lab result ready' },
]

const TURNS = [
  { from: 'patient', text: 'Can we move my Friday visit to Thursday?' },
  { from: 'agent', text: 'Done — rescheduled to Thursday, 10:00 AM. Confirmation sent.' },
]

const HOLD = 3

function AgentAnalyticsMock() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TURNS.length + HOLD ? 1 : s + 1))
    }, 1700)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, TURNS.length)
  const nextIsAgent = step < TURNS.length && TURNS[step]?.from === 'agent'

  return (
    <div className="aam" role="img" aria-label="Patient reminder schedule for the week, and the agent handling a reschedule request">
      <span className="aam-tag">
        <i className="aam-tag-dot" />
        3 agents online · resolving in real time
      </span>

      <div className="aam-timeline">
        <span className="aam-timeline-line" aria-hidden="true" />
        {TIMELINE.map((t) => (
          <div className="aam-point" key={t.day}>
            <span className="aam-point-dot" />
            <span className="aam-point-day">{t.day}</span>
            <span className="aam-point-label">{t.label}</span>
            <span className="aam-point-status"><IconCheck />Sent</span>
          </div>
        ))}
      </div>

      <div className="aam-thread">
        {TURNS.slice(0, shown).map((t, i) => (
          <div className={`aam-msg aam-${t.from} aam-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            <div className="aam-bubble">{t.text}</div>
          </div>
        ))}
        {nextIsAgent && (
          <div className="aam-msg aam-agent">
            <div className="aam-bubble aam-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentAnalyticsMock
