import './LineHeroLoyalty.css'

/**
 * Hero visual for the LINE Business Messaging page.
 *
 * A loyalty-ring gauge (LINE's signature in-chat rewards) at the centre, with
 * four free-floating capability satellites — Flex message, Rich menu, Coupon,
 * Two-way chat — orbiting it WITHOUT connecting lines. Deliberately a different
 * geometry from the Messenger page's convergence-hub diagram, and teal-forward
 * so the LINE page reads as its own thing. Box-free; motion gated behind
 * prefers-reduced-motion.
 */

const SATELLITES = [
  {
    key: 'flex', x: 84, y: 96, label: 'Flex message', cls: 'is-teal',
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-10" y="-8" width="20" height="16" rx="3" />
        <rect x="-6" y="-5" width="7" height="4.5" rx="1.2" fill="currentColor" stroke="none" />
        <line x1="4" y1="-3" x2="7" y2="-3" />
        <line x1="-6" y1="3" x2="6" y2="3" />
      </g>
    ),
  },
  {
    key: 'menu', x: 356, y: 96, label: 'Rich menu', cls: 'is-blue',
    glyph: (
      <g fill="currentColor">
        {[-7, 0, 7].map((cx) => [-4.5, 4.5].map((cy) => (
          <rect key={`${cx}-${cy}`} x={cx - 2.5} y={cy - 2.5} width="5" height="5" rx="1.4" />
        )))}
      </g>
    ),
  },
  {
    key: 'coupon', x: 84, y: 344, label: 'Coupon', cls: 'is-coral',
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M -11 -6 h22 v3 a2.4 2.4 0 0 0 0 4.8 v3 h-22 v-3 a2.4 2.4 0 0 0 0 -4.8 z" />
        <line x1="3" y1="-6" x2="3" y2="8" strokeDasharray="2 2.4" />
      </g>
    ),
  },
  {
    key: 'chat', x: 356, y: 344, label: 'Two-way chat', cls: 'is-purple',
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M -11 -8 h13 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -3 3 h-7 l-4 3 v-3 a3 3 0 0 1 -2 -3 v-4 a3 3 0 0 1 1 -3 z" />
        <path d="M 3 0 h6 a2.5 2.5 0 0 1 2.5 2.5 v3 a2.5 2.5 0 0 1 -2.5 2.5 v2.5 l-3 -2.5 h-2" fill="#fff" />
      </g>
    ),
  },
]

// r=78 progress ring; circumference ≈ 490; ~68% filled.
const R = 78
const CIRC = 2 * Math.PI * R
const FILLED = CIRC * 0.68

function LineHeroLoyalty() {
  return (
    <div className="lnl" aria-hidden="true">
      <svg viewBox="0 0 440 420" role="img" aria-label="A LINE loyalty rewards gauge surrounded by flex message, rich menu, coupon and two-way chat capabilities">
        <defs>
          <linearGradient id="lnl-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#14b8a6" />
            <stop offset="1" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>

        {/* rotating dotted accent ring */}
        <circle className="lnl-orbit" cx="220" cy="220" r="118" fill="none" stroke="#14b8a6" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="2 12" strokeLinecap="round" />

        {/* verified official-account marker */}
        <g className="lnl-oa">
          <circle cx="182" cy="30" r="13" fill="url(#lnl-ring)" />
          <text x="182" y="34.5" className="lnl-oa-mono">SL</text>
          <text x="203" y="27" className="lnl-oa-name">SMSLocal Official</text>
          <text x="203" y="40" className="lnl-oa-sub">LINE Official Account</text>
        </g>

        {/* loyalty gauge */}
        <g className="lnl-gauge">
          <circle cx="220" cy="220" r={R} fill="none" stroke="#e9eaee" strokeWidth="14" />
          <circle
            cx="220" cy="220" r={R}
            fill="none"
            stroke="url(#lnl-ring)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${FILLED} ${CIRC}`}
            transform="rotate(-90 220 220)"
          />
          <g className="lnl-gauge-gift" transform="translate(220 176)" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M -9 -2 h18 v4 h-18 z" />
            <path d="M -7 2 h14 v9 h-14 z" />
            <line x1="0" y1="-2" x2="0" y2="11" />
            <path d="M 0 -2 c -4 -6 -10 -4 -6 0 M 0 -2 c 4 -6 10 -4 6 0" />
          </g>
          <text x="220" y="228" className="lnl-gauge-num">1,240</text>
          <text x="220" y="248" className="lnl-gauge-lbl">reward points</text>
        </g>

        {/* floating capability satellites (no connectors) */}
        {SATELLITES.map((s, i) => (
          <g className={`lnl-sat ${s.cls}`} key={s.key} style={{ '--d': `${i * 0.4}s` }}>
            <circle className="lnl-sat-disc" cx={s.x} cy={s.y} r="26" />
            <g transform={`translate(${s.x} ${s.y})`} className="lnl-sat-glyph">{s.glyph}</g>
            <text x={s.x} y={s.y + 44} className="lnl-sat-label">{s.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default LineHeroLoyalty
