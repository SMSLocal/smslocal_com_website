import { useEffect, useState } from 'react'
import './DidNumberWhy.css'
import { IconChat, IconBolt, IconChart, IconLink } from './icons.jsx'

/**
 * "Why virtual numbers" visual for /numbers/did — one number on the left,
 * a connecting line carrying a travelling signal, and four destinations on
 * the right it routes to. Replaces the checklist card with a full-width
 * "one number, routed everywhere" strip.
 */

const DESTINATIONS = [
  { icon: <IconChat />, label: 'Team inbox' },
  { icon: <IconBolt />, label: 'Your app' },
  { icon: <IconChart />, label: 'CRM' },
  { icon: <IconLink />, label: 'Webhook' },
]

function DidNumberWhy() {
  const [live, setLive] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setLive(true), 500)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="dnw-strip" role="img" aria-label="One virtual number routing voice and SMS to a team inbox, an app, a CRM and a webhook">
      <div className="dnw-source">
        <span className="dnw-number">+1 (415) 555-0182</span>
        <span className={live ? 'dnw-live on' : 'dnw-live'}>
          <span className="dnw-live-dot" />
          {live ? 'Live' : 'Provisioning…'}
        </span>
      </div>

      <div className="dnw-line">
        <span className="dnw-signal" />
      </div>

      <div className="dnw-dests">
        {DESTINATIONS.map((d) => (
          <div className="dnw-dest" key={d.label}>
            <span className="dnw-dest-icon">{d.icon}</span>
            <span className="dnw-dest-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DidNumberWhy
