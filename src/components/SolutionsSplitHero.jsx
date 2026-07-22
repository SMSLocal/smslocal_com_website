import './SolutionsSplitHero.css'
import { IconBolt, IconGear, IconCart, IconFlask, IconDollar, IconChat, IconMegaphone, IconCalendar } from './icons.jsx'

// Bespoke hero visual for the /solutions hub.
// Story: ONE platform beam enters a splitter/prism and fans OUTWARD into many
// labelled solution rays - grouped into "By industry" and "By use-case".
// The deliberate inverse of TangleConvergeHero (many tools -> one core).
// Everything floats directly on the page background: a left node, a diamond
// splitter, thin gradient rays and pill chips - no unifying card or frame.
const INDUSTRY = [
  { key: 'ecom', icon: <IconCart />, label: 'Ecommerce', pos: 'ssh-chip--e1' },
  { key: 'health', icon: <IconFlask />, label: 'Healthcare', pos: 'ssh-chip--e2' },
  { key: 'fin', icon: <IconDollar />, label: 'Finance', pos: 'ssh-chip--e3' },
]

const USECASE = [
  { key: 'support', icon: <IconChat />, label: 'Support', pos: 'ssh-chip--e4' },
  { key: 'sales', icon: <IconMegaphone />, label: 'Sales', pos: 'ssh-chip--e5' },
  { key: 'booking', icon: <IconCalendar />, label: 'Booking', pos: 'ssh-chip--e6' },
]

function SolutionsSplitHero() {
  return (
    <div
      className="ssh"
      role="img"
      aria-label="One SMSLocal platform feeds a splitter that fans out into many solutions, grouped by industry - ecommerce, healthcare, finance - and by use-case - support, sales, booking."
    >
      <div className="ssh-scene">
        <svg className="ssh-wires" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="sshGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4f5bd5" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* base rays: feed beam + splitter -> each solution endpoint.
              Endpoints share one x (300) and are evenly spaced in y so every
              chip is the same distance apart and connects the same way. */}
          <g className="ssh-base">
            <line x1="96" y1="170" x2="164" y2="170" />
            <line x1="188" y1="170" x2="300" y2="51" />
            <line x1="188" y1="170" x2="300" y2="99" />
            <line x1="188" y1="170" x2="300" y2="146" />
            <line x1="188" y1="170" x2="300" y2="194" />
            <line x1="188" y1="170" x2="300" y2="241" />
            <line x1="188" y1="170" x2="300" y2="289" />
          </g>

          {/* animated pulses: feed flows INTO the splitter, rays flow OUT */}
          <g className="ssh-flow">
            <line x1="96" y1="170" x2="164" y2="170" pathLength="100" style={{ '--d': '0s' }} />
            <line x1="188" y1="170" x2="300" y2="51" pathLength="100" style={{ '--d': '.5s' }} />
            <line x1="188" y1="170" x2="300" y2="99" pathLength="100" style={{ '--d': '.75s' }} />
            <line x1="188" y1="170" x2="300" y2="146" pathLength="100" style={{ '--d': '1s' }} />
            <line x1="188" y1="170" x2="300" y2="194" pathLength="100" style={{ '--d': '1.25s' }} />
            <line x1="188" y1="170" x2="300" y2="241" pathLength="100" style={{ '--d': '1.5s' }} />
            <line x1="188" y1="170" x2="300" y2="289" pathLength="100" style={{ '--d': '1.75s' }} />
          </g>
        </svg>

        {/* left: the single platform source */}
        <span className="ssh-source">
          <span className="ssh-source-ic"><IconBolt /></span>
          <span className="ssh-source-tx"><strong>SMSLocal</strong><span>one platform</span></span>
        </span>

        {/* centre: the splitter / prism */}
        <span className="ssh-prism">
          <span className="ssh-prism-glow" aria-hidden="true" />
          <IconGear />
        </span>

        {/* group labels for the two fans */}
        <span className="ssh-fan ssh-fan--top">By industry</span>
        <span className="ssh-fan ssh-fan--bottom">By use-case</span>

        {/* right: the many solution chips */}
        {INDUSTRY.concat(USECASE).map((c) => (
          <span className={`ssh-chip ${c.pos}`} key={c.key}>
            <span className="ssh-chip-ic">{c.icon}</span>
            {c.label}
          </span>
        ))}
      </div>

      <span className="ssh-caption">one platform, many solutions</span>
    </div>
  )
}

export default SolutionsSplitHero
