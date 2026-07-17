import { useEffect, useState } from 'react'
import './VoiceCallMock.css'
import { IconMic, IconCheck, IconGlobe } from './icons.jsx'

const TRANSCRIPT = [
  { who: 'caller', label: 'Caller', text: 'Hi, I want to check my order status for #7734.' },
  { who: 'agent', label: 'AI Agent', text: 'Found it — order #7734 shipped this morning and arrives Thursday. Want me to text you the tracking link?' },
  { who: 'caller', label: 'Caller', text: "Yes please, that'd be great." },
]

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function VoiceCallMock() {
  const [visible, setVisible] = useState(1)
  const [seconds, setSeconds] = useState(2)

  // Reveal transcript lines progressively, then loop
  useEffect(() => {
    let t
    if (visible >= TRANSCRIPT.length) {
      t = setTimeout(() => {
        setVisible(1)
        setSeconds(0)
      }, 3200)
      return () => clearTimeout(t)
    }
    t = setTimeout(() => setVisible((v) => v + 1), 1900)
    return () => clearTimeout(t)
  }, [visible])

  // Ticking call timer
  useEffect(() => {
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="vcmock-card">
      <div className="vcmock-header">
        <span className="vcmock-mic-icon"><IconMic /></span>
        <div className="vcmock-header-text">
          <strong>Live call</strong>
          <span>Speech transcribed in real time</span>
        </div>
        <span className="vcmock-wave" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
        <span className="vcmock-timer"><span className="vcmock-rec" />{fmt(seconds)}</span>
      </div>

      <div className="vcmock-transcript">
        {TRANSCRIPT.slice(0, visible).map((line, i) => (
          <div className={`vcmock-line ${line.who}`} key={i}>
            <span className="vcmock-speaker">{line.label}</span>
            <p>{line.text}</p>
          </div>
        ))}
      </div>

      <div className="vcmock-footer">
        <span className="vcmock-tag sentiment"><IconCheck />Positive</span>
        <span className="vcmock-tag lang"><IconGlobe />Hindi &amp; more</span>
        <span className="vcmock-tag live"><span className="vcmock-live-dot" />Live speech</span>
      </div>
    </div>
  )
}

export default VoiceCallMock
