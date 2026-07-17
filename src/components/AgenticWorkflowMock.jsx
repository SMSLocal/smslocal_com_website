import './AgenticWorkflowMock.css'
import { IconChat, IconBolt, IconLink, IconCode, IconBrain } from './icons.jsx'

const ACTIONS = [
  'Fetched 24 leads from CRM',
  'Scored each lead by fit',
  'Drafted a personalized message',
  'Sent via WhatsApp',
  'Logged results back to CRM',
]

const TOOLS = [
  { icon: <IconChat />, label: 'WhatsApp' },
  { icon: <IconBolt />, label: 'SMS' },
  { icon: <IconLink />, label: 'CRM' },
  { icon: <IconCode />, label: 'REST API' },
  { icon: <IconBrain />, label: 'AI Engine' },
]

function AgenticWorkflowMock() {
  return (
    <div className="agwmock-card">
      <div className="agwmock-header">
        <span className="agwmock-goal-label">GOAL</span>
        <p className="agwmock-goal">Qualify and follow up with new leads</p>
      </div>

      <div className="agwmock-actions">
        {ACTIONS.map((a) => (
          <div className="agwmock-action-row" key={a}>
            <span className="agwmock-check">✓</span>
            <span>{a}</span>
          </div>
        ))}
      </div>

      <div className="agwmock-tools">
        {TOOLS.map((t) => (
          <span className="agwmock-tool" key={t.label}>
            {t.icon}
            {t.label}
          </span>
        ))}
      </div>

      <div className="agwmock-footer">
        <span className="agwmock-live-dot" />
        3 agents online
      </div>
    </div>
  )
}

export default AgenticWorkflowMock
