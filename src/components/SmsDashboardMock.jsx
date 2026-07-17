import { useState, useEffect } from 'react'
import './SmsDashboardMock.css'
import { IconShield, IconCheck } from './icons.jsx'

const MESSAGES = [
  { from: 'user', text: "What's my checking account balance?" },
  { from: 'agent', text: 'Your checking account (••1234) balance is $4,215.60 as of today.' },
  { from: 'user', text: 'Can you send my last statement too?' },
  { from: 'agent', text: 'Sending your March statement to your registered email now.' },
]

const AUDIT_LOG = [
  { text: 'Read-only balance check', time: '9:41 AM' },
  { text: 'Statement sent to verified email', time: '9:42 AM' },
]

const HOLD = 3

function SmsDashboardMock() {
  const [step, setStep] = useState(1)
  const [logShown, setLogShown] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= MESSAGES.length + HOLD ? 1 : s + 1))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (step === 1) {
      setLogShown(0)
      return
    }
    if (step === 2) setLogShown(1)
    if (step >= 4) setLogShown(2)
  }, [step])

  const shown = Math.min(step, MESSAGES.length)
  const nextIsAgent = step < MESSAGES.length && MESSAGES[step]?.from === 'agent'

  return (
    <div className="smsd" role="img" aria-label="Compliant AI agent answering a banking balance and statement request, with every action logged for audit">
      <span className="smsd-tag">
        <IconShield />
        Role: Support Tier 1 · Scoped access
      </span>

      <div className="smsd-thread">
        {MESSAGES.slice(0, shown).map((m, i) => (
          <div className={`smsd-msg smsd-${m.from} smsd-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            <div className="smsd-bubble">{m.text}</div>
          </div>
        ))}
        {nextIsAgent && (
          <div className="smsd-msg smsd-agent">
            <div className="smsd-bubble smsd-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="smsd-audit">
        {AUDIT_LOG.map((entry, i) => (
          <span className={`smsd-audit-row${i < logShown ? ' smsd-audit-row--in' : ''}`} key={entry.text}>
            <span className="smsd-audit-ic"><IconCheck /></span>
            {entry.text}
            <span className="smsd-audit-time">{entry.time}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default SmsDashboardMock
