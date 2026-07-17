import { useState, useEffect } from 'react'
import './VoiceAgentMock.css'

const TURNS = [
  { from: 'caller', text: 'Hi, I want to check my order status for #7734.' },
  { from: 'agent', text: 'Found it — order #7734 shipped this morning and arrives Thursday. Want the tracking link by SMS?' },
  { from: 'caller', text: 'Yes please — and can I also change the delivery address?' },
  { from: 'agent', type: 'route', text: "That needs a quick verification, so I'm routing you to Priya — with everything we just discussed attached." },
]

const HOLD = 2

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function VoiceAgentMock() {
  const [step, setStep] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TURNS.length - 1 + HOLD ? 0 : s + 1))
    }, 2300)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (step === 0) setSeconds(0)
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [step === 0])

  const turn = TURNS[Math.min(step, TURNS.length - 1)]
  const routed = step >= TURNS.length - 1

  return (
    <div className="vam" role="img" aria-label="Voice AI agent resolving an order query in a natural conversation, then routing a complex request to a human with full context attached">
      <div className="vam-status">
        <i className="vam-status-dot" data-routed={routed} />
        {routed ? 'Routing to human' : 'Live call · connected'}
        <span className="vam-status-sep">·</span>
        <span className="vam-timer">{fmt(seconds)}</span>
      </div>

      <div className="vam-orb">
        <span className="vam-orb-ring vam-orb-ring--1" />
        <span className="vam-orb-ring vam-orb-ring--2" />
        <span className="vam-orb-core">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
      </div>

      <div className="vam-wave" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </div>

      <div className="vam-caption" key={step}>
        {turn.type === 'route' ? (
          <span className="vam-caption-route">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8l4 4-4 4" /><path d="M3 12h18" />
            </svg>
            {turn.text}
          </span>
        ) : (
          <>
            <span className={`vam-caption-speaker vam-caption-speaker--${turn.from}`}>{turn.from === 'caller' ? 'Caller' : 'Agent'}</span>
            <p className="vam-caption-text">{turn.text}</p>
          </>
        )}
      </div>

      <div className="vam-tags">
        <span className="vam-tag vam-tag--a">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
          Positive
        </span>
        <span className="vam-tag vam-tag--b">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></svg>
          Hindi &amp; more
        </span>
        <span className="vam-tag vam-tag--c">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
          Transcribed live
        </span>
      </div>
    </div>
  )
}

export default VoiceAgentMock
