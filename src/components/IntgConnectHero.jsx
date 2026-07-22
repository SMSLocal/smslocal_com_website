import { useState, useEffect } from 'react'
import './IntgConnectHero.css'
import AppLogo, { colorFor } from './AppLogo.jsx'
import { IconPlug } from './icons.jsx'

const APPS = [
  'Shopify', 'Salesforce', 'HubSpot', 'Stripe', 'Slack',
  'Zapier', 'Notion', 'WooCommerce', 'Zendesk', 'Mailchimp',
]

// Position along the rail for each of the six visible slots.
// The slot at position 3 is the "dock" right in front of the socket.
const POS = {
  '-1': { left: '0%', op: 0, sc: 0.7 },
  '0': { left: '12%', op: 0.4, sc: 0.85 },
  '1': { left: '28%', op: 0.72, sc: 0.92 },
  '2': { left: '44%', op: 1, sc: 1 },
  '3': { left: '58%', op: 1, sc: 1 },
  '4': { left: '72%', op: 0, sc: 0.8 },
}

function IntgConnectHero() {
  const [start, setStart] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) return undefined
    const id = setInterval(() => setStart((s) => (s + 1) % APPS.length), 1900)
    return () => clearInterval(id)
  }, [])

  const queue = Array.from({ length: 6 }, (_, j) => {
    const appIndex = (start + j) % APPS.length
    return { name: APPS[appIndex], pos: 4 - j, color: colorFor(appIndex) }
  })
  const docked = APPS[(start + 1) % APPS.length]

  return (
    <div className={`intg-hero${reduced ? ' is-reduced' : ''}`} role="img" aria-label="Apps docking into SMSLocal one by one over one-click OAuth">
      <div className="intg-hero-rail">
        <span className="intg-hero-line" aria-hidden="true" />

        {queue.map(({ name, pos, color }) => {
          const p = POS[String(pos)]
          const isDock = pos === 3
          return (
            <span
              className={`intg-hero-tile${isDock ? ' is-dock' : ''}`}
              key={name}
              style={{ left: p.left, opacity: p.op, transform: `translateY(-50%) scale(${p.sc})` }}
            >
              <AppLogo name={name} color={color} size={26} />
              {isDock && (
                <span className="intg-hero-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="10" height="10"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              )}
            </span>
          )
        })}

        <span className="intg-hero-socket">
          <span className="intg-hero-socket-pulse" key={start} aria-hidden="true" />
          <span className="intg-hero-socket-core"><IconPlug /></span>
          <span className="intg-hero-socket-mark">SMSLocal</span>
        </span>
      </div>

      <div className="intg-hero-caption">
        <span className="intg-hero-caption-dot" aria-hidden="true" />
        <span><strong>{docked}</strong> connected &middot; one-click OAuth</span>
      </div>
    </div>
  )
}

export default IntgConnectHero
