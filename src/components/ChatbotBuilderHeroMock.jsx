import './ChatbotBuilderHeroMock.css'
import { IconBolt, IconChat, IconRefresh, IconBrain, IconUsers } from './icons.jsx'

const PALETTE = [
  { icon: <IconChat />, label: 'Message' },
  { icon: <IconRefresh />, label: 'Condition' },
  { icon: <IconBrain />, label: 'AI answer' },
  { icon: <IconUsers />, label: 'Handoff' },
]

function FlowNode({ icon, kicker, title, tone }) {
  return (
    <div className={`cbmock-node ${tone || ''}`}>
      <span className="cbmock-node-icon">{icon}</span>
      <div className="cbmock-node-text">
        <span className="cbmock-node-kicker">{kicker}</span>
        <strong>{title}</strong>
      </div>
    </div>
  )
}

function ChatbotBuilderHeroMock() {
  return (
    <div className="cbmock-window">
      <div className="cbmock-titlebar">
        <span className="cbmock-dot red" />
        <span className="cbmock-dot yellow" />
        <span className="cbmock-dot green" />
        <span className="cbmock-title">Support Flow</span>
        <span className="cbmock-draft">Draft</span>
      </div>
      <div className="cbmock-body">
        <div className="cbmock-palette">
          {PALETTE.map((p) => (
            <span className="cbmock-palette-item" key={p.label} title={p.label}>{p.icon}</span>
          ))}
        </div>
        <div className="cbmock-canvas">
          <FlowNode icon={<IconBolt />} kicker="TRIGGER" title="New conversation starts" />
          <span className="cbmock-connector" />
          <FlowNode icon={<IconChat />} kicker="ASK" title="How can we help you today?" />
          <span className="cbmock-connector" />
          <FlowNode icon={<IconRefresh />} kicker="CONDITION" title="Mentions 'refund' or 'order'?" />
          <span className="cbmock-connector branch" />
          <FlowNode icon={<IconBrain />} kicker="AI ANSWER" title="Resolve automatically, or hand off" tone="accent" />
        </div>
      </div>
      <button className="cbmock-add">+ Add step</button>
    </div>
  )
}

export default ChatbotBuilderHeroMock
