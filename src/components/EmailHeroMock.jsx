import { useState } from 'react'
import './EmailHeroMock.css'

/**
 * Hero visual for the Email API page.
 *
 * A boxless divergence diagram — one send hub forking into three real
 * outcomes: the inbox (delivered/opened/clicked), a reporting webhook
 * (every event, unified with SMS), and the SMS fallback for anything that
 * bounces. Pronounced S-curve connectors, a drop-shadow on every disc, and
 * hand-drawn glyphs that actually read as inbox / bar-chart / phone+bubble
 * rather than generic circles-with-a-mark.
 *
 * Clicking any destination focuses that path — its connector brightens,
 * its dot speeds up, the other two dim — while the whole diagram stays
 * fully readable at rest for reduced-motion / no-JS visitors.
 *
 * Classes/ids are prefixed `emhero-` (not the generic `emc`) — this page
 * already has an unrelated EmailCompare component using `.emc`, and a
 * shared class name silently pulled in its max-width/grid rules here.
 */

const P_EMAIL = 'M 168 186 C 210 128, 270 96, 344 84'
const P_REPORT = 'M 194 205 C 260 192, 320 196, 380 205'
const P_SMS = 'M 168 224 C 210 282, 270 314, 344 326'

const DESTS = [
  { key: 'email', cx: 366, cy: 78, path: P_EMAIL, dur: '2.8s', delay: '0s', color: '#4f5bd5', label: 'Delivered', sub: '9,840 · 1,480 clicked' },
  { key: 'report', cx: 400, cy: 205, path: P_REPORT, dur: '2.8s', delay: '0.4s', color: '#8b5cf6', label: 'Reported', sub: 'live in one dashboard' },
  { key: 'sms', cx: 366, cy: 332, path: P_SMS, dur: '2.8s', delay: '0.8s', color: '#14b8a6', label: 'SMS fallback', sub: '214 bounces caught' },
]

function EmailHeroMock() {
  const [focus, setFocus] = useState(null)
  const toggle = (key) => setFocus((f) => (f === key ? null : key))

  return (
    <div className="emhero">
      <span className="emhero-cap">
        <span className="emhero-live" />
        One send, three things happen
      </span>

      <svg viewBox="0 0 460 415" role="img" aria-label="One email send forking into a delivered inbox, a unified reporting webhook, and an SMS fallback path for anything that bounces">
        <defs>
          <linearGradient id="emhero-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          {DESTS.map((d) => (
            <linearGradient id={`emhero-line-${d.key}`} key={d.key} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={d.color} stopOpacity="0.12" />
              <stop offset="1" stopColor={d.color} stopOpacity="0.95" />
            </linearGradient>
          ))}
          <filter id="emhero-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#10233f" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* connectors */}
        <g fill="none" strokeLinecap="round">
          {DESTS.map((d) => (
            <path
              key={`link-${d.key}`}
              d={d.path}
              stroke={`url(#emhero-line-${d.key})`}
              strokeWidth="3"
              className={`emhero-link${focus && focus !== d.key ? ' is-dim' : ''}`}
            />
          ))}
          {DESTS.map((d) => (
            <path
              key={`flow-${d.key}`}
              d={d.path}
              stroke={d.color}
              strokeWidth="3"
              className={`emhero-flow${focus && focus !== d.key ? ' is-dim' : ''}${focus === d.key ? ' is-focused' : ''}`}
              style={{ animationDelay: d.delay }}
            />
          ))}
        </g>

        {/* travelling dots */}
        {DESTS.map((d) => (
          <circle key={`dot-${d.key}`} r="4.5" fill={d.color} className={`emhero-dot${focus && focus !== d.key ? ' is-dim' : ''}`}>
            <animateMotion dur={focus === d.key ? '1.2s' : d.dur} begin={d.delay} repeatCount="indefinite" path={d.path} />
          </circle>
        ))}

        {/* rotating "one API" ring around the hub */}
        <g className="emhero-ring">
          <circle cx="140" cy="205" r="72" fill="none" stroke="#4f5bd5" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 9" strokeLinecap="round" />
        </g>
        <g className="emhero-window-label">
          <circle cx="50" cy="40" r="9" fill="#fff" stroke="#4f5bd5" strokeWidth="1.4" />
          <path d="M 50 35 L 50 40 L 53 42" fill="none" stroke="#4f5bd5" strokeWidth="1.4" strokeLinecap="round" />
          <text x="66" y="44" className="emhero-tag-text">REST or SMTP</text>
        </g>

        {/* the send hub */}
        <g className="emhero-hub">
          <circle className="emhero-hub-pulse" cx="140" cy="205" r="54" />
          <circle cx="140" cy="205" r="54" fill="url(#emhero-hub)" filter="url(#emhero-shadow)" />
          {/* paper-plane "send" glyph */}
          <path d="M 128 191 L 156 205 L 128 219 L 133 205 Z" fill="#fff" />
          <text x="140" y="284" className="emhero-hub-label">One API call</text>
          <text x="140" y="301" className="emhero-hub-sub">POST /v1/send</text>
        </g>

        {/* destination nodes */}
        {DESTS.map((d) => (
          <g
            key={d.key}
            className={`emhero-node${focus && focus !== d.key ? ' is-dim' : ''}`}
            style={{ color: d.color }}
            onClick={() => toggle(d.key)}
          >
            <circle className="emhero-node-halo" cx={d.cx} cy={d.cy} r="28" />
            <circle className="emhero-node-disc" cx={d.cx} cy={d.cy} r="27" filter="url(#emhero-shadow)" />
            <g transform={`translate(${d.cx} ${d.cy})`}>
              {d.key === 'email' && (
                <g stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M -12 -3 L -12 9 A2 2 0 0 0 -10 11 L 10 11 A2 2 0 0 0 12 9 L 12 -3" />
                  <path d="M -12 -3 L -5 -3 L -3 1 L 3 1 L 5 -3 L 12 -3" />
                  <path d="M -12 -3 L -8 -11 L 8 -11 L 12 -3" />
                </g>
              )}
              {d.key === 'report' && (
                <g stroke="currentColor" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M -11 11 L -11 -9" />
                  <path d="M -11 11 L 11 11" />
                  <rect x="-7" y="1" width="4.5" height="10" rx="0.8" fill="currentColor" stroke="none" />
                  <rect x="0" y="-6" width="4.5" height="17" rx="0.8" fill="currentColor" stroke="none" />
                  <rect x="7" y="-2" width="4.5" height="13" rx="0.8" fill="currentColor" stroke="none" />
                </g>
              )}
              {d.key === 'sms' && (
                <g strokeLinecap="round" strokeLinejoin="round">
                  <g stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="-9" y="-11" width="15" height="23" rx="3.2" />
                    <line x1="-9" y1="7.5" x2="6" y2="7.5" />
                  </g>
                  <path d="M 1 -12 h11 a2.3 2.3 0 0 1 2.3 2.3 v5.4 a2.3 2.3 0 0 1 -2.3 2.3 h-7.6 l-3.4 3 v-3 h-0.3 a2.3 2.3 0 0 1 -2.3 -2.3 v-5.4 a2.3 2.3 0 0 1 2.3 -2.3 z" fill="currentColor" stroke="none" />
                </g>
              )}
            </g>
            <text x={d.cx} y={d.cy + 46} className="emhero-node-label">{d.label}</text>
            <text x={d.cx} y={d.cy + 62} className="emhero-node-sub">{d.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default EmailHeroMock
