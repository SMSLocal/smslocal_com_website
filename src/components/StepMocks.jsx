import './StepMocks.css'
import { IconUsers, IconLink, IconChart } from './icons.jsx'

function MockHeader({ icon, label, badge }) {
  return (
    <div className="smock-header">
      <span className="smock-header-icon">{icon}</span>
      <span className="smock-header-label">{label}</span>
      <span className="smock-header-badge">{badge}</span>
    </div>
  )
}

export function UploadContactsMock() {
  return (
    <div className="smock-window">
      <MockHeader icon={<IconUsers />} label="Contact list" badge="ready" />
      <div className="smock-body">
        <div className="smock-check-row">
          <span className="smock-check-circle">✓</span>
          <span className="smock-check-text">1,500 contacts uploaded</span>
        </div>
        <div className="smock-check-row">
          <span className="smock-check-circle">✓</span>
          <span className="smock-check-text">42 duplicates removed</span>
        </div>
        <div className="smock-check-row">
          <span className="smock-live-dot" />
          <span className="smock-check-text">Opt-outs auto-suppressed</span>
          <span className="smock-live-label">live</span>
        </div>
      </div>
    </div>
  )
}

export function ComposeMessageMock() {
  return (
    <div className="smock-window">
      <MockHeader icon={<IconLink />} label="Merge + track" badge="click tracking" />
      <div className="smock-body">
        <p className="smock-message">
          Hi <span className="smock-tag">{'{{first_name}}'}</span>, your order
          <span className="smock-tag">{'{{order_id}}'}</span> has shipped.
        </p>
        <div className="smock-stats-pills">
          <div className="smock-pill blue">
            <strong>18.6%</strong>
            <span>click rate</span>
          </div>
          <div className="smock-pill green">
            <strong>3,940</strong>
            <span>clicks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SendTrackMock() {
  const heights = [58, 78, 46, 88, 64, 96]
  return (
    <div className="smock-window">
      <MockHeader icon={<IconChart />} label="Delivery insight" badge="per campaign" />
      <div className="smock-body">
        <div className="smock-bars-row">
          {heights.map((h, i) => (
            <span className="smock-bar" style={{ height: `${h}%` }} key={i} />
          ))}
        </div>
        <div className="smock-footer-row">
          <span className="smock-char-count">Delivery receipts</span>
          <span className="smock-landed">96.4% landed</span>
        </div>
      </div>
    </div>
  )
}
