import { useEffect, useState } from 'react'
import './ActionPipelineVisual.css'
import { IconChat, IconGear, IconCart, IconMail, IconCalendar, IconDollar, IconCheck } from './icons.jsx'

const TOOLS = [
  { icon: <IconCart />, label: 'Shopify' },
  { icon: <IconMail />, label: 'Email' },
  { icon: <IconCalendar />, label: 'Calendar' },
  { icon: <IconDollar />, label: 'Billing' },
]

const TURNS = [
  { msg: 'Can I get a refund?', tool: 0, action: 'Refunded order #48219', resolved: 2940 },
  { msg: 'This still isn\'t working', tool: 1, action: 'Escalated to support', resolved: 3020 },
  { msg: 'Book me a demo tomorrow', tool: 2, action: 'Booked demo for 3:00 PM', resolved: 3110 },
  { msg: 'Where\'s my invoice?', tool: 3, action: 'Sent invoice #INV-1042', resolved: 3180 },
]

function ActionPipelineVisual() {
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTurn((t) => (t + 1) % TURNS.length), 3400)
    return () => clearInterval(id)
  }, [])

  const { msg, tool, action, resolved } = TURNS[turn]

  return (
    <div className="apv" role="img" aria-label="A customer message reaching an AI agent, which picks the right connected tool and confirms the action taken">
      <div className="apv-row">
        <div className="apv-bubble">
          <span className="apv-bubble-ic"><IconChat /></span>
          <span className="apv-bubble-msg" key={turn}>{msg}</span>
        </div>

        <span className="apv-link" />

        <div className="apv-agent">
          <span className="apv-agent-ring" />
          <span className="apv-agent-ic"><IconGear /></span>
        </div>

        <div className="apv-trunk" />

        <div className="apv-tools">
          {TOOLS.map((t, i) => (
            <div className={`apv-tool${i === tool ? ' apv-tool--active' : ''}`} key={t.label}>
              <span className="apv-tool-branch" />
              <span className="apv-tool-ic">{t.icon}</span>
              <span className="apv-tool-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="apv-footer">
        <div className="apv-action" key={`action-${turn}`}>
          <span className="apv-action-ic"><IconCheck /></span>
          {action}
        </div>
        <div className="apv-stat">
          <strong key={resolved}>{resolved.toLocaleString()}</strong>
          <span>actions resolved</span>
        </div>
      </div>
    </div>
  )
}

export default ActionPipelineVisual
