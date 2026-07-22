import './BulkSmsBroadcastScatter.css'

/**
 * Hero visual for the Bulk SMS page.
 *
 * A frameless, depth-scattered "delivery field": one small send node tucked in
 * the lower-left corner throws a few curved gradient trails up-and-out, and the
 * broadcast lands as delivery pings scattered across the open canvas at varied
 * size, depth and position — never aligned, never stacked, with no card, phone
 * frame or bounding box anywhere. A live tally floats free at the top.
 *
 * Deliberately unlike every other hero and section on the site: not a lock-screen
 * stack, not upright message bubbles, not a symmetric fan to named recipients,
 * not a waffle of dots, not a serpentine flight path, not a dashboard. The whole
 * point is the ABSENCE of a grid — a diagonal scatter, so nothing reads as boxed.
 *
 * Base / reduced-motion state is the fully-delivered scene; motion only sequences
 * the send (trails fade in, sparks travel, pings pop, tally pulses).
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Each ping: centre in stage % (x,y), size class, reveal delay, optional time tag
// (and which side the tag sits on so it never runs off the canvas).
const PINGS = [
  { x: 42, y: 29, size: 'l', d: 1.05, t: '0.7s', side: 'r' },
  { x: 69, y: 19, size: 'm', d: 1.5 },
  { x: 85, y: 40, size: 's', d: 1.85 },
  { x: 56, y: 49, size: 'l', d: 0.75, t: '1.1s', side: 'r' },
  { x: 29, y: 60, size: 'm', d: 0.5 },
  { x: 77, y: 63, size: 's', d: 2.1, t: '1.6s', side: 'l' },
  { x: 48, y: 76, size: 'xs', d: 1.3 },
  { x: 90, y: 14, size: 'xs', d: 2.3 },
]

// Faint "and thousands more" dust — tiny, low-opacity, scattered off the pings.
const DUST = [
  { x: 34, y: 40 }, { x: 62, y: 34 }, { x: 72, y: 51 },
  { x: 38, y: 68 }, { x: 66, y: 74 }, { x: 24, y: 46 }, { x: 83, y: 27 },
]

// Curved gradient send-trails from the origin (60,361) out to three pings.
// Asymmetric lengths and angles — a directional spray, not a fan or a rail.
const TRAILS = [
  { id: 'bbsA', d: 'M60 361 C 78 316, 118 300, 145 264', dur: '1.9s', begin: '0.15s' },
  { id: 'bbsB', d: 'M60 361 C 128 344, 196 300, 280 216', dur: '2.3s', begin: '0.35s' },
  { id: 'bbsC', d: 'M60 361 C 150 322, 252 196, 345 84', dur: '2.7s', begin: '0s' },
]

function PlaneGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  )
}

function TickGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6" />
    </svg>
  )
}

function BulkSmsBroadcastScatter() {
  // Reduced-motion visitors get the static, fully-delivered scene; everyone else
  // gets the send sequence from first paint (no flash, no assembled-then-hidden).
  const play = !REDUCED

  return (
    <div
      className={`bbs${play ? ' bbs--play' : ''}`}
      role="img"
      aria-label="One bulk SMS broadcast fanning out and landing as delivery confirmations scattered across many screens, worldwide, in seconds"
    >
      <svg className="bbs-canvas" viewBox="0 0 500 440" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="bbsGrad" x1="0" y1="440" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {TRAILS.map((tr) => (
          <path key={tr.id} id={tr.id} className="bbs-trail" d={tr.d} stroke="url(#bbsGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 8" />
        ))}

        {play && TRAILS.map((tr) => (
          <g key={`${tr.id}-spark`} className="bbs-spark">
            <circle r="6" fill="#ec4899" opacity="0.25" />
            <circle r="3" fill="url(#bbsGrad)" />
            <animateMotion dur={tr.dur} begin={tr.begin} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" rotate="auto">
              <mpath href={`#${tr.id}`} />
            </animateMotion>
          </g>
        ))}
      </svg>

      {DUST.map((p, i) => (
        <span key={`d${i}`} className="bbs-dust" style={{ left: `${p.x}%`, top: `${p.y}%`, '--d': `${1.2 + i * 0.12}s` }} />
      ))}

      {/* Origin — one send, tucked in the corner so it never reads as a hub */}
      <div className="bbs-origin">
        <span className="bbs-origin-halo" aria-hidden="true" />
        <span className="bbs-origin-disc"><PlaneGlyph /></span>
        <span className="bbs-origin-label">One send</span>
      </div>

      {/* Landings — scattered, varied in size and depth, none aligned */}
      {PINGS.map((p, i) => (
        <span
          key={i}
          className={`bbs-ping bbs-ping--${p.size}${p.side === 'l' ? ' bbs-ping--tagl' : ''}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, '--d': `${p.d}s` }}
        >
          <span className="bbs-ping-glow" aria-hidden="true" />
          <span className="bbs-ping-dot"><TickGlyph /></span>
          {p.t && <span className="bbs-t">{p.t}</span>}
        </span>
      ))}

      {/* Free-floating live tally — no card, no border */}
      <div className="bbs-tally">
        <span className="bbs-live" aria-hidden="true" />
        <span className="bbs-tally-main"><b>18,240</b> delivered</span>
        <span className="bbs-tally-sub">across 190+ countries · in seconds</span>
      </div>
    </div>
  )
}

export default BulkSmsBroadcastScatter
