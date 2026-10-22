import { useState } from 'react'
import './CpaasHubVisual.css'

/**
 * Hero visual for the CPaaS Platform page.
 *
 * One API request on the left fans out to the five channels on the right.
 * Each path carries a moving dot (a delivery on its way), and clicking a
 * channel focuses its path while the others dim. At rest the whole diagram is
 * fully readable, and the moving dots are hidden for reduced-motion visitors.
 * Glyphs are Feather icons (MIT). Classes are prefixed `cphub-`.
 */

const HUB = { x: 92, y: 210 }

const CHANNELS = [
  { key: 'sms', label: 'SMS', y: 48, color: '#4f5bd5', icon: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'] },
  { key: 'whatsapp', label: 'WhatsApp', y: 129, color: '#14b8a6', icon: ['M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.35z'] },
  { key: 'rcs', label: 'RCS', y: 210, color: '#8b5cf6', icon: ['M3 5h18v14H3z', 'M3 13h18', 'M7 17h6'] },
  { key: 'voice', label: 'Voice', y: 291, color: '#ec4899', icon: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'] },
  { key: 'email', label: 'Email', y: 372, color: '#f59e0b', icon: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'] },
]

const NODE_X = 318

const pathFor = (y) => `M ${HUB.x + 46} ${HUB.y} C ${HUB.x + 130} ${HUB.y}, ${NODE_X - 110} ${y}, ${NODE_X - 28} ${y}`

function CpaasHubVisual() {
  const [focus, setFocus] = useState(null)
  const toggle = (key) => setFocus((f) => (f === key ? null : key))

  return (
    <div className="cphub">
      <span className="cphub-cap">
        <span className="cphub-live" />
        One request, any channel
      </span>

      <svg viewBox="0 0 460 420" role="img" aria-label="One API request fanning out to SMS, WhatsApp, RCS, Voice and Email">
        <defs>
          <linearGradient id="cphub-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          {CHANNELS.map((c) => (
            <linearGradient id={`cphub-line-${c.key}`} key={c.key} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={c.color} stopOpacity="0.15" />
              <stop offset="1" stopColor={c.color} stopOpacity="0.95" />
            </linearGradient>
          ))}
          <filter id="cphub-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#10233f" floodOpacity="0.26" />
          </filter>
        </defs>

        {/* request chip above the hub */}
        <g>
          <rect x="30" y="118" width="124" height="30" rx="15" className="cphub-chip" />
          <text x="92" y="137.5" className="cphub-chip-text">POST /send</text>
          <path d={`M ${HUB.x} 150 L ${HUB.x} ${HUB.y - 52}`} className="cphub-stem" />
        </g>

        {/* connectors */}
        {CHANNELS.map((c) => {
          const dim = focus && focus !== c.key
          return (
            <g key={c.key} className={dim ? 'cphub-path is-dim' : 'cphub-path'}>
              <path d={pathFor(c.y)} fill="none" stroke={`url(#cphub-line-${c.key})`} strokeWidth={focus === c.key ? 3.5 : 2.5} strokeLinecap="round" />
              <circle r="4.5" fill={c.color} className="cphub-dot">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${CHANNELS.indexOf(c) * 0.35}s`} path={pathFor(c.y)} />
              </circle>
            </g>
          )
        })}

        {/* hub */}
        <circle cx={HUB.x} cy={HUB.y} r="46" fill="url(#cphub-hub)" filter="url(#cphub-shadow)" />
        <circle cx={HUB.x} cy={HUB.y} r="56" fill="none" stroke="#4f5bd5" strokeOpacity="0.18" strokeWidth="2" />
        <text x={HUB.x} y={HUB.y - 2} className="cphub-hub-label">One API</text>
        <text x={HUB.x} y={HUB.y + 15} className="cphub-hub-sub">one account</text>

        {/* channel nodes */}
        {CHANNELS.map((c) => {
          const dim = focus && focus !== c.key
          return (
            <g
              key={c.key}
              className={dim ? 'cphub-node is-dim' : 'cphub-node'}
              style={{ color: c.color }}
              role="button"
              tabIndex={0}
              aria-pressed={focus === c.key}
              aria-label={`${c.label} channel`}
              onClick={() => toggle(c.key)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(c.key) } }}
            >
              <circle cx={NODE_X} cy={c.y} r="34" className="cphub-halo" />
              <circle cx={NODE_X} cy={c.y} r="26" className="cphub-disc" filter="url(#cphub-shadow)" />
              <g transform={`translate(${NODE_X - 12} ${c.y - 12})`} className="cphub-glyph">
                {c.icon.map((d) => <path key={d} d={d} />)}
              </g>
              <text x={NODE_X + 42} y={c.y - 2} className="cphub-node-label">{c.label}</text>
              <text x={NODE_X + 42} y={c.y + 14} className="cphub-node-sub">delivered</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default CpaasHubVisual
