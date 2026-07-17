import { useEffect, useState } from 'react'
import './AgentBuilderPrompt.css'
import { IconUsers, IconChart, IconGear, IconCursor } from './icons.jsx'

const AGENTS = [
  { icon: <IconUsers />, label: 'Support Agent', desc: 'Resolves tickets end to end' },
  { icon: <IconChart />, label: 'Sales Agent', desc: 'Qualifies leads and books meetings' },
  { icon: <IconGear />, label: 'Ops Agent', desc: 'Runs internal workflows' },
]

function AgentBuilderPrompt() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % AGENTS.length), 3000)
    return () => clearInterval(id)
  }, [])

  const current = AGENTS[active]

  return (
    <div className="abp" role="img" aria-label="Typing a description into an agent builder prompt, which builds a Support, Sales and Ops agent one by one">
      <div className="abp-prompt">
        <span className="abp-prompt-ic"><IconCursor /></span>
        <span className="abp-prompt-text" key={active}>{current.desc}<i className="abp-caret" /></span>
        <span className="abp-prompt-send">→</span>
      </div>

      <div className="abp-roster">
        {AGENTS.map((a, i) => (
          <div className={`abp-agent${i === active ? ' abp-agent--active' : ''}`} key={a.label}>
            <span className={`abp-agent-ic abp-agent-ic--${i % 4}`}>{a.icon}</span>
            <div className="abp-agent-t">
              <strong>{a.label}</strong>
              <span>{a.desc}</span>
            </div>
            <span className="abp-agent-check">✓</span>
          </div>
        ))}
      </div>

      <div className="abp-stat">
        <i />
        <strong>{AGENTS.length}</strong> agents live
      </div>
    </div>
  )
}

export default AgentBuilderPrompt
