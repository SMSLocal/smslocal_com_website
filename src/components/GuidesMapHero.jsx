import { useEffect, useState } from 'react'
import './GuidesMapHero.css'
import { IconPlug, IconBolt, IconRobot, IconRocket } from './icons.jsx'

/**
 * Hero visual for /resources/guides — a winding learning-path map, not a
 * checklist card. An SVG route climbs from "Connect a channel" to "Go
 * live", a marker travels it on a loop, and whichever node the marker has
 * reached gets a floating callout naming the guide and a live step count.
 * Distinct construction from every other hero on the site: this is the
 * only one built from an SVG path with HTML nodes overlaid by percentage,
 * not a card, not a chat thread, not a hub-and-spoke diagram.
 */

// Coordinates are in the 460x400 viewBox; each node's %-position (used for
// its HTML overlay) is derived from the SAME numbers so the route and the
// icons always line up exactly. Control points sit at the horizontal
// midpoint of each segment at each endpoint's own height — a "sigmoid"
// bezier that climbs monotonically left-to-right with no reflected (S)
// curves, so the line can't loop back on itself.
const PTS = [
  { x: 40, y: 330 },
  { x: 160, y: 250 },
  { x: 300, y: 180 },
  { x: 420, y: 60 },
]
const NODES = PTS.map(({ x, y }, i) => ({
  icon: [<IconPlug />, <IconBolt />, <IconRobot />, <IconRocket />][i],
  title: ['Connect a channel', 'Configure a sender', 'Build a flow', 'Go live'][i],
  x: (x / 460) * 100,
  y: (y / 400) * 100,
}))
const PATH_D = PTS.slice(1).reduce((d, p, i) => {
  const prev = PTS[i]
  const midX = (prev.x + p.x) / 2
  return `${d} C ${midX} ${prev.y}, ${midX} ${p.y}, ${p.x} ${p.y}`
}, `M ${PTS[0].x} ${PTS[0].y}`)

const LOOP_MS = 7000

function GuidesMapHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf
    const start = Date.now()
    const tick = () => {
      // t is always < 1 (it's a modulo), so bucket by equal shares of the
      // loop rather than checking t >= 1 — that comparison can never be
      // true, which is exactly why the last node never lit up before.
      const t = ((Date.now() - start) % LOOP_MS) / LOOP_MS
      const i = Math.min(NODES.length - 1, Math.floor(t * NODES.length))
      setActive(i)
      raf = setTimeout(tick, 120)
    }
    tick()
    return () => clearTimeout(raf)
  }, [])

  return (
    <div
      className="gmap"
      role="img"
      aria-label="A winding learning path from connecting a channel to going live, with a marker travelling it and each step named as it's reached"
    >
      <span className="gmap-stat"><strong>40+</strong> guides · <strong>5</strong> tracks</span>

      <svg className="gmap-svg" viewBox="0 0 460 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="gmap-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--blue)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        {/* the full route is always drawn — no guessed arc-length reveal that
            could stop short of the last node */}
        <path d={PATH_D} fill="none" stroke="url(#gmap-line)" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <circle r="6" fill="var(--blue)">
          <animateMotion dur={`${LOOP_MS / 1000}s`} repeatCount="indefinite" path={PATH_D} />
        </circle>
      </svg>

      {NODES.map((n, i) => (
        <div
          className={`gmap-node${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          key={n.title}
        >
          <span className="gmap-node-dot">{n.icon}</span>
          <span className="gmap-node-label">{n.title}</span>
        </div>
      ))}

      <span className="gmap-progress">Step {active + 1} of {NODES.length} · {NODES[active].title}</span>
    </div>
  )
}

export default GuidesMapHero
