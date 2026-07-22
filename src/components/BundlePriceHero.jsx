import { useState, useEffect } from 'react'
import './BundlePriceHero.css'
import {
  IconRobot, IconChat, IconBolt, IconPhone, IconMic,
  IconMail, IconGlobe, IconUsers, IconMegaphone,
} from './icons.jsx'

// Each capability that is bundled into the single price. They light up in order.
const CHIPS = [
  { label: 'AI Agent', icon: <IconRobot /> },
  { label: 'WhatsApp', icon: <IconChat /> },
  { label: 'RCS', icon: <IconBolt /> },
  { label: 'SMS', icon: <IconPhone /> },
  { label: 'Voice', icon: <IconMic /> },
  { label: 'Email', icon: <IconMail /> },
  { label: 'Social', icon: <IconGlobe /> },
  { label: 'Shared inbox', icon: <IconUsers /> },
  { label: 'Broadcasting', icon: <IconMegaphone /> },
]

// Pricing hero visual: a frameless floating price with capability pills that
// switch on one-by-one to show everything is bundled into one number.
function BundlePriceHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setActive(CHIPS.length)
      return
    }
    const id = setInterval(() => {
      setActive((a) => (a >= CHIPS.length ? 0 : a + 1))
    }, 620)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="bph"
      role="img"
      aria-label="SMSLocal bundled pricing from $49 a month, one price that includes the AI agent and every channel: WhatsApp, RCS, SMS, voice, email, social, the shared inbox and broadcasting"
    >
      <div className="bph-price">
        <span className="bph-price-row">
          <span className="bph-price-lead">from</span>
          <span className="bph-price-amount">$49</span>
          <span className="bph-price-period">/mo</span>
        </span>
        <span className="bph-price-bar" aria-hidden="true" />
        <span className="bph-price-tag">one bundle &middot; billed in USD</span>
      </div>

      <div className="bph-tally">
        <strong>{active}</strong> of {CHIPS.length} capabilities included
      </div>

      <div className="bph-chips">
        {CHIPS.map((c, i) => (
          <span
            className={`bph-chip${i < active ? ' is-on' : ''}${i === active - 1 ? ' is-new' : ''}`}
            key={c.label}
          >
            <span className="bph-chip-ic" aria-hidden="true">{c.icon}</span>
            <span className="bph-chip-label">{c.label}</span>
            <span className="bph-chip-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default BundlePriceHero
