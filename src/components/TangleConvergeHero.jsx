import './TangleConvergeHero.css'
import { IconCode, IconRobot, IconMegaphone, IconUsers, IconPhone } from './icons.jsx'

// Bespoke hero visual: five separate tools float around the page, loosely
// tangled by faint crossing wires, all converging into one SMSLocal core.
// Floats directly on the page background - no unifying card or frame.
const TOOLS = [
  { key: 'api', icon: <IconCode />, label: 'API', pos: 'tch-tool--api' },
  { key: 'bot', icon: <IconRobot />, label: 'Chatbot', pos: 'tch-tool--bot' },
  { key: 'camp', icon: <IconMegaphone />, label: 'Campaigns', pos: 'tch-tool--camp' },
  { key: 'inbox', icon: <IconUsers />, label: 'Inbox', pos: 'tch-tool--inbox' },
  { key: 'num', icon: <IconPhone />, label: 'Numbers', pos: 'tch-tool--num' },
]

function TangleConvergeHero() {
  return (
    <div
      className="tch"
      role="img"
      aria-label="Five separate tools - a CPaaS API, a chatbot, a campaign tool, a shared inbox and phone numbers - loosely tangled together by wires, all converging into one SMSLocal platform core."
    >
      <div className="tch-scene">
        <svg className="tch-wires" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="tchGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4f5bd5" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* the tangle: faint crossing wires between the scattered tools */}
          <g className="tch-tangle">
            <path d="M60 70 L312 190" />
            <path d="M300 70 L48 190" />
            <path d="M48 190 L180 312" />
            <path d="M312 190 L60 70" />
          </g>

          {/* base convergence wires into the core */}
          <g className="tch-base">
            <line x1="60" y1="70" x2="180" y2="180" />
            <line x1="300" y1="70" x2="180" y2="180" />
            <line x1="48" y1="190" x2="180" y2="180" />
            <line x1="312" y1="190" x2="180" y2="180" />
            <line x1="180" y1="312" x2="180" y2="180" />
          </g>

          {/* animated pulses flowing inward toward the core */}
          <g className="tch-flow">
            <line x1="60" y1="70" x2="180" y2="180" pathLength="100" style={{ '--d': '0s' }} />
            <line x1="300" y1="70" x2="180" y2="180" pathLength="100" style={{ '--d': '.45s' }} />
            <line x1="48" y1="190" x2="180" y2="180" pathLength="100" style={{ '--d': '.9s' }} />
            <line x1="312" y1="190" x2="180" y2="180" pathLength="100" style={{ '--d': '1.35s' }} />
            <line x1="180" y1="312" x2="180" y2="180" pathLength="100" style={{ '--d': '1.8s' }} />
          </g>
        </svg>

        {TOOLS.map((t) => (
          <span className={`tch-tool ${t.pos}`} key={t.key}>
            <span className="tch-tool-ic">{t.icon}</span>
            <span className="tch-tool-label">{t.label}</span>
          </span>
        ))}

        <span className="tch-core">
          <span className="tch-core-glow" aria-hidden="true" />
          <strong>SMSLocal</strong>
          <span>one platform</span>
        </span>
      </div>

      <span className="tch-caption">five tools, one account</span>
    </div>
  )
}

export default TangleConvergeHero
