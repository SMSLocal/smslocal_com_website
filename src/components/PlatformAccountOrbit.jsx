import { useEffect, useRef, useState } from 'react'
import './PlatformAccountOrbit.css'
import { IconChat, IconUsers, IconBrain, IconPlug, IconChart, IconShield } from './icons.jsx'

const LAYERS = [
  {
    icon: <IconChat />,
    name: 'Messaging channels',
    desc: 'Every inbound and outbound conversation, on the channels your customers already use.',
    caps: 'SMS · WhatsApp · RCS · Voice · Email',
  },
  {
    icon: <IconUsers />,
    name: 'Shared team inbox',
    desc: 'One queue where agents assign, reply, add private notes and hand off cleanly.',
    caps: 'Assignments · Notes · SLAs',
  },
  {
    icon: <IconBrain />,
    name: 'AI & automation',
    desc: 'No-code chatbots and autonomous AI agents that route, answer and resolve.',
    caps: 'Chatbots · AI agents · Routing',
  },
  {
    icon: <IconPlug />,
    name: 'Integrations',
    desc: 'Your CRM, helpdesk and store stay in sync through one-click connectors and webhooks.',
    caps: 'CRM · Helpdesk · Webhooks',
  },
  {
    icon: <IconChart />,
    name: 'Analytics & insights',
    desc: 'Delivery, replies and resolutions across every channel, in one reporting view.',
    caps: 'Delivery · Replies · Reports',
  },
  {
    icon: <IconShield />,
    name: 'Enterprise security',
    desc: 'Roles, encryption and a full audit trail wrap the whole stack, not just one layer.',
    caps: 'Roles · Audit log · Encryption',
  },
]

const R = 42
const CYCLE_MS = 3400

function nodePos(i, n) {
  const a = (-90 + (360 / n) * i) * (Math.PI / 180)
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
}

function PlatformAccountOrbit() {
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)
  const layer = LAYERS[active]

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % LAYERS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  return (
    <section className="section pao-section">
      <div className="container">
        <span className="section-kicker">The stack</span>
        <h2 className="section-title">The whole stack, one account</h2>
        <p className="section-subtitle">
          Six layers that snap together into a single customer-engagement platform &mdash; billed
          once, managed from one login.
        </p>

        <div
          className="pao"
          role="tablist"
          aria-label="Platform layers, all resolving to one account"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <div className="pao-ring">
            <span className="pao-orbit-path" aria-hidden="true" />
            <svg className="pao-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {LAYERS.map((l, i) => {
                const p = nodePos(i, LAYERS.length)
                return (
                  <line
                    key={l.name}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    className={i === active ? 'pao-spoke is-active' : 'pao-spoke'}
                  />
                )
              })}
            </svg>

            <span className="pao-hub">
              <span className="pao-hub-avatar">S</span>
              <span className="pao-hub-label">One account</span>
            </span>

            {LAYERS.map((l, i) => {
              const p = nodePos(i, LAYERS.length)
              return (
                <button
                  key={l.name}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={l.name}
                  className={active === i ? 'pao-node is-active' : 'pao-node'}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {l.icon}
                </button>
              )
            })}
          </div>

          <div className="pao-detail" role="tabpanel" key={layer.name}>
            <span className="pao-detail-icon">{layer.icon}</span>
            <h3 className="pao-detail-title">{layer.name}</h3>
            <p className="pao-detail-desc">{layer.desc}</p>
            <span className="pao-detail-caps">{layer.caps}</span>
            <span className="pao-detail-count">
              Layer {active + 1} of {LAYERS.length} &middot; billed on one account
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformAccountOrbit
