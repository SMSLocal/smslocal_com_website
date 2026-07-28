import './WhyItWorksScorecard.css'

/**
 * Bespoke "why it works" artifact for /products/agent-copilot. Deliberately
 * a different composition from ProblemAnnotatedInbox (card + side leader
 * callouts): here it's one wide trend chart with an inline peak label,
 * plus a horizontal stat strip underneath — no side callouts, no tiles.
 */
const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6']
const TREND = [38, 44, 55, 63, 74, 88] // efficiency score, rises left to right

const STATS = [
  { value: '1m 42s', label: 'Avg. first response' },
  { value: '96%', label: 'Answer consistency' },
  { value: '58 / day', label: 'Conversations per agent' },
  { value: '3 days', label: 'New-hire ramp' },
]

function points(values, w, h, pad) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = w - pad * 2
  return values.map((v, i) => {
    const x = pad + (span * i) / (values.length - 1)
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2)
    return [x, y]
  })
}

function WhyItWorksScorecard({ eyebrow, title, subtitle }) {
  const W = 720
  const H = 220
  const PAD = 28
  const pts = points(TREND, W, H, PAD)
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0]},${H - PAD} L${pts[0][0]},${H - PAD} Z`
  const [lastX, lastY] = pts[pts.length - 1]

  return (
    <section className="section wis-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wis-chart-card">
          <div className="wis-chart-head">
            <span>Team efficiency score</span>
            <span className="wis-live"><span className="wis-live-dot" aria-hidden="true" />Last 6 weeks</span>
          </div>

          <svg className="wis-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="wisFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wisStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--blue)" />
                <stop offset="100%" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#wisFill)" />
            <path d={line} fill="none" stroke="url(#wisStroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map(([x, y], i) => (
              <circle key={WEEKS[i]} cx={x} cy={y} r={i === pts.length - 1 ? 5 : 3} fill="#fff" stroke="var(--blue)" strokeWidth="2" />
            ))}
          </svg>

          <div
            className="wis-peak"
            style={{ left: `${(lastX / W) * 100}%`, top: `${(lastY / H) * 100}%` }}
          >
            <strong>+21%</strong> vs week 1
          </div>

          <div className="wis-axis">
            {WEEKS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </div>

        <div className="wis-stats">
          {STATS.map((s) => (
            <div className="wis-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyItWorksScorecard
