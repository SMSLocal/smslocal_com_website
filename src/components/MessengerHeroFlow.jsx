import './MessengerHeroFlow.css'

/**
 * Hero visual for the Facebook Messenger API page.
 *
 * A boxless routing diagram (not a chat mockup): three inbound conversation
 * streams — Support, Sales, Marketing — flow along curved connectors into one
 * central Messenger hub ("shared inbox"), encircled by a slowly rotating
 * "24-hour window" ring. Built entirely from circles, curves, icon glyphs and
 * free-floating text, so there is no boxed panel anywhere in the composition.
 *
 * Motion (flowing connectors, travelling dots, hub pulse, ring rotation) is
 * gated behind prefers-reduced-motion; the static state reads correctly on its
 * own.
 */

// Curved connector paths, source node → hub. Shared by the drawn stroke and
// the travelling dot so they stay perfectly aligned.
const P_SUPPORT = 'M 112 100 C 190 116, 214 150, 250 182'
const P_SALES = 'M 98 205 C 158 205, 200 202, 246 204'
const P_MARKETING = 'M 112 310 C 190 296, 214 262, 250 228'

const SOURCES = [
  {
    key: 'support',
    cx: 82,
    cy: 100,
    label: 'Support',
    cls: 'is-support',
    path: P_SUPPORT,
    // headset
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -9 2 A 9 9 0 0 1 9 2" />
        <path d="M -9 2 L -9 7" strokeWidth="4.4" />
        <path d="M 9 2 L 9 7" strokeWidth="4.4" />
        <path d="M 9 8 Q 9 12 3 12" />
      </g>
    ),
  },
  {
    key: 'sales',
    cx: 66,
    cy: 205,
    label: 'Sales',
    cls: 'is-sales',
    path: P_SALES,
    // upward trend arrow
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -9 6 L -2 -1 L 2 3 L 9 -6" />
        <path d="M 4 -6 L 9 -6 L 9 -1" />
      </g>
    ),
  },
  {
    key: 'marketing',
    cx: 82,
    cy: 310,
    label: 'Marketing',
    cls: 'is-marketing',
    path: P_MARKETING,
    // megaphone
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -9 -4 L 3 -9 L 3 9 L -9 4 Z" fill="currentColor" stroke="none" />
        <path d="M -6 4 L -6 9 L -2 9 L -3 5" fill="currentColor" stroke="none" />
        <path d="M 7 -5 Q 11 0 7 5" />
        <path d="M 10 -8 Q 15 0 10 8" />
      </g>
    ),
  },
]

function MessengerHeroFlow() {
  return (
    <div className="msgflow">
      <svg
        viewBox="0 0 440 410"
        role="img"
        aria-label="Support, sales and marketing conversations flowing from Messenger into one shared inbox, inside Meta's 24-hour reply window"
      >
        <defs>
          <linearGradient id="msgflow-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="msgflow-line-support" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f5bd5" stopOpacity="0.15" />
            <stop offset="1" stopColor="#4f5bd5" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="msgflow-line-sales" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ec4899" stopOpacity="0.15" />
            <stop offset="1" stopColor="#ec4899" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="msgflow-line-marketing" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#14b8a6" stopOpacity="0.15" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Connectors (drawn beneath the nodes) */}
        <g className="msgflow-links" fill="none" strokeLinecap="round">
          <path className="msgflow-link" d={P_SUPPORT} stroke="url(#msgflow-line-support)" strokeWidth="2.5" />
          <path className="msgflow-link" d={P_SALES} stroke="url(#msgflow-line-sales)" strokeWidth="2.5" />
          <path className="msgflow-link" d={P_MARKETING} stroke="url(#msgflow-line-marketing)" strokeWidth="2.5" />

          {/* Flowing highlight overlay */}
          <path className="msgflow-flow is-support" d={P_SUPPORT} stroke="#4f5bd5" strokeWidth="2.5" />
          <path className="msgflow-flow is-sales" d={P_SALES} stroke="#ec4899" strokeWidth="2.5" />
          <path className="msgflow-flow is-marketing" d={P_MARKETING} stroke="#14b8a6" strokeWidth="2.5" />
        </g>

        {/* Travelling dots — conversations being routed in */}
        <circle className="msgflow-dot is-support" r="4" fill="#4f5bd5">
          <animateMotion dur="2.6s" repeatCount="indefinite" path={P_SUPPORT} />
        </circle>
        <circle className="msgflow-dot is-sales" r="4" fill="#ec4899">
          <animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite" path={P_SALES} />
        </circle>
        <circle className="msgflow-dot is-marketing" r="4" fill="#14b8a6">
          <animateMotion dur="2.6s" begin="1.2s" repeatCount="indefinite" path={P_MARKETING} />
        </circle>

        {/* 24-hour window ring around the hub */}
        <g className="msgflow-ring">
          <circle cx="300" cy="205" r="84" fill="none" stroke="#4f5bd5" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="2 9" strokeLinecap="round" />
        </g>
        <g className="msgflow-window-label">
          <circle cx="256" cy="128" r="9" fill="#fff" stroke="#4f5bd5" strokeWidth="1.4" />
          <g stroke="#4f5bd5" strokeWidth="1.4" strokeLinecap="round">
            <path d="M 256 123 L 256 128 L 259 130" fill="none" />
          </g>
          <text x="272" y="132" className="msgflow-cap">24-hour window</text>
        </g>

        {/* Source nodes */}
        {SOURCES.map((s) => (
          <g className={`msgflow-node ${s.cls}`} key={s.key}>
            <circle className="msgflow-node-halo" cx={s.cx} cy={s.cy} r="27" />
            <circle className="msgflow-node-disc" cx={s.cx} cy={s.cy} r="26" />
            <g transform={`translate(${s.cx} ${s.cy})`} className="msgflow-node-glyph">
              {s.glyph}
            </g>
            <text x={s.cx} y={s.cy + 44} className="msgflow-node-label">{s.label}</text>
          </g>
        ))}

        {/* Central Messenger hub — the shared inbox */}
        <g className="msgflow-hub">
          <circle className="msgflow-hub-pulse" cx="300" cy="205" r="60" />
          <circle cx="300" cy="205" r="60" fill="url(#msgflow-hub)" />
          {/* Clean, symmetric speech-bubble glyph, centred on the hub */}
          <g transform="translate(300 205)">
            <path
              d="M -13 -15 H 13 Q 20 -15 20 -8 V 1 Q 20 8 13 8 H 5 L 0 16 L -5 8 H -13 Q -20 8 -20 1 V -8 Q -20 -15 -13 -15 Z"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <g fill="#fff">
              <circle cx="-7" cy="-3.5" r="2" />
              <circle cx="0" cy="-3.5" r="2" />
              <circle cx="7" cy="-3.5" r="2" />
            </g>
          </g>
          <text x="300" y="292" className="msgflow-hub-label">Shared inbox</text>
          <text x="300" y="310" className="msgflow-hub-sub">AI answers, then routes</text>
        </g>
      </svg>
    </div>
  )
}

export default MessengerHeroFlow
