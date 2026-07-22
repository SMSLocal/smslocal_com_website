import './ConsultingJourneyHero.css'

// Bespoke NON-CONTAINER hero visual: a guided engagement "journey".
// A gradient path draws itself from a proof-of-concept origin up to a
// pulsing "in production" summit, with four milestone nodes and floating
// labels. Rendered as a transparent inline SVG — no card/panel frame.
const PATH = 'M44 236 C 96 214 108 200 150 178 S 210 140 240 120 S 296 78 322 52'

const NODES = [
  { x: 44, y: 236, t: 'Proof of concept', c: 'where you start', anchor: 'start', lx: 58, ly: 231, cy: 243, live: false },
  { x: 150, y: 178, t: 'Scope & build', c: 'use cases → first agent', anchor: 'end', lx: 138, ly: 170, cy: 182, live: false },
  { x: 240, y: 120, t: 'Enable & train', c: 'your team takes the wheel', anchor: 'end', lx: 228, ly: 112, cy: 124, live: false },
  { x: 322, y: 52, t: 'In production', c: 'live, measured, scaling', anchor: 'end', lx: 310, ly: 45, cy: 57, live: true },
]

function ConsultingJourneyHero() {
  return (
    <div
      className="cjh"
      role="img"
      aria-label="A guided engagement journey: a path drawing upward from a proof of concept through scoping and build, team enablement, and finally a live production deployment."
    >
      <svg className="cjh-svg" viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cjhLine" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="cjhNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        <path className="cjh-base" d={PATH} />
        <path className="cjh-progress" d={PATH} pathLength="1" />

        {NODES.map((n, i) => (
          <g key={n.t}>
            <text className={`cjh-title cjh-fade cjh-fade--${i}`} x={n.lx} y={n.ly} textAnchor={n.anchor}>{n.t}</text>
            <text className={`cjh-cap cjh-fade cjh-fade--${i}`} x={n.lx} y={n.cy} textAnchor={n.anchor}>{n.c}</text>
            <g className="cjh-node" transform={`translate(${n.x} ${n.y})`}>
              <g className={`cjh-pop cjh-pop--${i}`}>
                {n.live && <circle className="cjh-halo" r="13" />}
                <circle className={n.live ? 'cjh-dot cjh-dot--live' : 'cjh-dot'} r={n.live ? 8 : 7} />
                {n.live ? (
                  <path className="cjh-up" d="M-3.2 2.4 L0 -2.8 L3.2 2.4" />
                ) : (
                  <path className="cjh-check" d="M-3 0.2 L-0.6 2.6 L3 -1.6" />
                )}
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default ConsultingJourneyHero
