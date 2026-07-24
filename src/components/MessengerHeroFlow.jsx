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
          {/* The real Messenger mark, not a generic speech bubble.
              Drawn inline rather than referenced from /logos/messenger.svg
              because an <image> in another document cannot inherit the white
              fill it needs here — the same glyph is kept in public/logos for
              reuse elsewhere.
              Authored by hand: every Meta brand (and Telegram) has been
              removed from the Simple Icons dataset upstream, even though the
              CDN still serves stale copies, so pulling it from there would
              ship a withdrawn asset.
              The path is a 24x24 glyph, scaled 2.33x to ~56px and offset by
              half that so it centres on the hub at (300, 205). */}
          <g transform="translate(272 177) scale(2.3333)" fill="#fff">
            <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.13 3.259L19.752 8l-6.561 6.963z" />
          </g>
          <text x="300" y="292" className="msgflow-hub-label">Shared inbox</text>
          <text x="300" y="310" className="msgflow-hub-sub">AI answers, then routes</text>
        </g>
      </svg>
    </div>
  )
}

export default MessengerHeroFlow
