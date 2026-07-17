import './AgentWorkflowMock.css'
import { IconBook, IconSearch, IconReceipt, IconBrain } from './icons.jsx'

function Spark({ up }) {
  return (
    <svg className="awf-spark" viewBox="0 0 60 20" width="60" height="20" aria-hidden="true">
      <polyline
        points="0,15 10,12 20,14 30,8 40,10 50,5 60,3"
        fill="none"
        stroke={up ? 'var(--success)' : 'var(--blue)'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AgentWorkflowMock() {
  return (
    <div className="awf-card">
      <div className="awf-header">
        <span className="awf-logo" aria-hidden="true"><IconBrain /></span>
        <div className="awf-header-text">
          <strong>Workflow Dashboard</strong>
          <span>Agents accelerating operations</span>
        </div>
        <span className="awf-live"><i />Live</span>
      </div>

      <div className="awf-stats">
        <div className="awf-stat">
          <span className="awf-stat-label">Automation rate</span>
          <div className="awf-stat-row"><strong>71%</strong><Spark up /></div>
        </div>
        <div className="awf-stat">
          <span className="awf-stat-label">Avg. completion</span>
          <div className="awf-stat-row"><strong>08m 24s</strong><Spark /></div>
        </div>
        <div className="awf-stat">
          <span className="awf-stat-label">Pending</span>
          <div className="awf-stat-row"><strong>8</strong><Spark up /></div>
        </div>
      </div>

      <div className="awf-flow-wrap">
        <span className="awf-flow-title">Workflow Builder</span>
        <div className="awf-flow">
          <div className="awf-flow-track"><span className="awf-pulse" /></div>
          <div className="awf-node" style={{ '--i': 0 }}>New request</div>
          <div className="awf-node accent" style={{ '--i': 1 }}>AI Triage Agent</div>
          <div className="awf-node" style={{ '--i': 2 }}>Approve</div>
          <div className="awf-node" style={{ '--i': 3 }}>Notify</div>
        </div>
      </div>

      <div className="awf-agent">
        <div className="awf-agent-head">
          <span className="awf-agent-name"><IconBrain />AI Triage Agent</span>
          <span className="awf-conf-label">Confidence <b>High</b></span>
        </div>

        <div className="awf-tools">
          <div className="awf-tool" style={{ '--t': 0 }}>
            <span className="awf-tool-icon"><IconBook /></span>
            <span className="awf-tool-label">Read policy doc</span>
            <span className="awf-toggle"><i /></span>
          </div>
          <div className="awf-tool" style={{ '--t': 1 }}>
            <span className="awf-tool-icon"><IconSearch /></span>
            <span className="awf-tool-label">Check directory</span>
            <span className="awf-toggle"><i /></span>
          </div>
          <div className="awf-tool" style={{ '--t': 2 }}>
            <span className="awf-tool-icon"><IconReceipt /></span>
            <span className="awf-tool-label">Create ticket</span>
            <span className="awf-toggle"><i /></span>
          </div>
        </div>

        <div className="awf-conf-bar"><span /></div>
      </div>
    </div>
  )
}

export default AgentWorkflowMock
