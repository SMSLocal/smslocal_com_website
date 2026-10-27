import map from '../data/sms-broadcast-map.generated.json'
import './SmsBroadcastHero.css'

/**
 * Hero visual for the SMS Broadcasting page — a global routing map.
 * One send hub fires routes out across a geographically-accurate dot-matrix
 * world map (real coastline data via `dotted-map`); each route draws itself
 * and lands an SMS bubble that ticks over to delivered. Depicts the thing the
 * page actually sells: one broadcast, reaching every country at once.
 *
 * Timing is pure CSS (staggered animation-delay on normalised pathLength="1"
 * strokes) rather than JS — requestAnimationFrame does not tick reliably in
 * the in-app preview browser, and CSS keeps the whole loop GPU-side.
 *
 * prefers-reduced-motion renders every route drawn and every bubble delivered.
 */

// send hub + the countries it fans out to
const ORIGIN = { code: 'HUB', label: 'SMSLocal', lat: 51.5074, lng: -0.1278 }

// Kept deliberately far apart around the globe: clustering destinations (e.g.
// several European capitals) makes their bubbles and the hub label collide.
const DESTS = [
  { code: 'US', label: 'United States', lat: 40.7128, lng: -74.006, d: 0 },
  { code: 'BR', label: 'Brazil', lat: -23.5505, lng: -46.6333, d: 0.55 },
  { code: 'NG', label: 'Nigeria', lat: 6.5244, lng: 3.3792, d: 1.1 },
  { code: 'IN', label: 'India', lat: 19.076, lng: 72.8777, d: 1.65 },
  { code: 'SG', label: 'Singapore', lat: 1.3521, lng: 103.8198, d: 2.2 },
  { code: 'AU', label: 'Australia', lat: -33.8688, lng: 151.2093, d: 2.75 },
]

// The dot-matrix map itself is a static file, drawn ahead of time by
// scripts/gen-broadcast-map.mjs from the same pins as ORIGIN and DESTS, so the
// map library never reaches the browser.
const { width, height } = map
const at = (code) => map.points[code] ?? { x: 0, y: 0 }
const hub = { ...ORIGIN, ...at(ORIGIN.code) }
const points = DESTS.map((m) => ({ ...m, ...at(m.code) }))

function SmsBroadcastHero() {
  // quadratic arc from hub -> destination, lifted perpendicular to the chord
  const arc = (p) => {
    const dx = p.x - hub.x
    const dy = p.y - hub.y
    const len = Math.hypot(dx, dy) || 1
    const lift = Math.min(len * 0.36, height * 0.55)
    const cx = (hub.x + p.x) / 2
    const cy = (hub.y + p.y) / 2 - lift
    return `M ${hub.x} ${hub.y} Q ${cx} ${cy} ${p.x} ${p.y}`
  }

  const pos = (p) => ({ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` })

  return (
    <div
      className="sbh"
      role="img"
      aria-label="A single SMS broadcast routes from one hub out across a world map to the United States, Brazil, Nigeria, India, Singapore and Australia, each confirming delivery."
    >
      <div className="sbh-map" style={{ aspectRatio: `${width} / ${height}` }}>
        {/* geographically accurate dot matrix */}
        <img
          className="sbh-dots"
          src="/sms-broadcast-map.svg"
          alt=""
          draggable={false}
        />

        {/* routes */}
        <svg className="sbh-routes" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sbhRoute" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4f5bd5" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {/* base: every route always drawn — the assembled state */}
          {points.map((p) => (
            <path key={p.code} className="sbh-route" d={arc(p)} pathLength="1" />
          ))}
          {/* motion: a short pulse travelling along each route on top */}
          {points.map((p) => (
            <path
              key={`f-${p.code}`}
              className="sbh-flow"
              d={arc(p)}
              pathLength="1"
              style={{ '--d': `${p.d}s` }}
            />
          ))}
        </svg>

        {/* the send hub */}
        <span className="sbh-hub" style={pos(hub)}>
          <span className="sbh-hub-ping" aria-hidden="true" />
          <span className="sbh-hub-core" aria-hidden="true" />
          <span className="sbh-hub-tag">{hub.label}</span>
        </span>

        {/* delivered SMS bubbles */}
        {points.map((p) => (
          <span key={p.code} className="sbh-drop" style={{ ...pos(p), '--d': `${p.d}s` }}>
            <span className="sbh-bubble">
              <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
              {p.code}
            </span>
            <span className="sbh-pin" aria-hidden="true" />
          </span>
        ))}
      </div>

      {/* naked readout */}
      <p className="sbh-readout">
        <strong>12,480</strong>
        <span className="sbh-of">recipients reached</span>
        <span className="sbh-sep" aria-hidden="true" />
        <span>190+ countries</span>
        <span className="sbh-sep" aria-hidden="true" />
        <span>98.4% delivered</span>
      </p>
    </div>
  )
}

export default SmsBroadcastHero
