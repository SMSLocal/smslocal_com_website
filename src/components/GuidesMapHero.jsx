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

const NODES = [
  { icon: <IconPlug />, title: 'Connect a channel', x: 9, y: 82 },
  { icon: <IconBolt />, title: 'Configure a sender', x: 34, y: 54 },
  { icon: <IconRobot />, title: 'Build a flow', x: 63, y: 60 },
  { icon: <IconRocket />, title: 'Go live', x: 90, y: 14 },
]

const PATH_D = 'M 41 328 C 90 328, 110 250, 156 216 S 250 190, 290 240 S 370 130, 414 56'
// Approximate arc-length fractions where the path passes each node's (x%,y%)
const NODE_T = [0, 0.34, 0.63, 1]

const LOOP_MS = 7000

function GuidesMapHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf
    const start = Date.now()
    const tick = () => {
      const t = ((Date.now() - start) % LOOP_MS) / LOOP_MS
      let i = 0
      for (let n = 0; n < NODE_T.length; n++) if (t >= NODE_T[n]) i = n
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
        <path d={PATH_D} fill="none" stroke="var(--border)" strokeWidth="3" strokeDasharray="1 10" strokeLinecap="round" />
        <path
          d={PATH_D}
          fill="none"
          stroke="url(#gmap-line)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="600"
          style={{ strokeDashoffset: 600 - 600 * (NODE_T[active] ?? 0) - 40, transition: 'stroke-dashoffset 0.5s ease' }}
        />
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
