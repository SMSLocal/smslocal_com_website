import './VoiceChannelHero.css'

/**
 * Hero visual for the Voice channel page.
 * Dramatizes a single live call being handled end to end: a "Connected 00:42"
 * status chip sits above a brand-gradient WAVEFORM pulsing to a speaking
 * rhythm, the caller picks an IVR option ("Press 2 · Support"), and a dot
 * travels along a routing line to the assigned agent ("Routing to Neha").
 * Elements float directly on the page background — no enclosing frame.
 * Pure-CSS animated loop; the base (no-motion) styles are the fully-assembled
 * correct state, so reduced-motion visitors see the finished call visual.
 */

// Waveform bar heights (px). The middle cluster is the "active" voice, styled
// with the brand gradient; the quiet ends stay muted, forming a natural envelope.
const BARS = [8, 14, 22, 30, 24, 36, 44, 32, 40, 28, 38, 26, 34, 20, 12, 8]

function VoiceChannelHero() {
  return (
    <div className="vch" aria-hidden="true">
      {/* Call status chip */}
      <div className="vch-status">
        <span className="vch-live-dot" />
        <span className="vch-status-text">Connected</span>
        <span className="vch-timer">00:42</span>
      </div>

      {/* Live waveform */}
      <div className="vch-wave">
        {BARS.map((h, i) => {
          const on = i >= 3 && i <= 12
          return (
            <span
              key={i}
              className={`vch-bar${on ? ' vch-bar--on' : ''}`}
              style={{ '--h': `${h}px`, '--d': `${(i % 8) * 0.09}s` }}
            />
          )
        })}
      </div>
      <span className="vch-wave-label">Live call · inbound</span>

      {/* IVR menu — plain rows, no frame */}
      <div className="vch-ivr">
        <span className="vch-ivr-title">IVR menu</span>
        <div className="vch-ivr-opt">
          <span className="vch-key">1</span>
          <span className="vch-ivr-text">Press 1 · Sales</span>
        </div>
        <div className="vch-ivr-opt vch-ivr-opt--sel">
          <span className="vch-key vch-key--on">2</span>
          <span className="vch-ivr-text">Press 2 · Support</span>
        </div>
      </div>

      {/* Routing line with travelling dot */}
      <div className="vch-route">
        <span className="vch-route-line">
          <span className="vch-route-dot" />
        </span>
      </div>

      {/* Assigned agent */}
      <div className="vch-agent">
        <span className="vch-agent-avatar">NH</span>
        <span className="vch-agent-meta">
          <strong>Routing to Neha</strong>
          <span>Support team</span>
        </span>
      </div>
    </div>
  )
}

export default VoiceChannelHero
