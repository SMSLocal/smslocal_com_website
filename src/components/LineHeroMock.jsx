import { useEffect, useState } from 'react'
import './LineHeroMock.css'
import { IconPackage, IconReceipt, IconUsers, IconChat, IconCalendar, IconGear } from './icons.jsx'

const MENU_TILES = [
  { icon: <IconPackage />, label: 'Shop' },
  { icon: <IconReceipt />, label: 'Orders' },
  { icon: <IconUsers />, label: 'Rewards' },
  { icon: <IconChat />, label: 'Support' },
  { icon: <IconCalendar />, label: 'Bookings' },
  { icon: <IconGear />, label: 'Account' },
]

const TURNS = [
  { from: 'in', text: 'Do I still have reward points?' },
  { from: 'out', text: 'You have 1,240 points — enough for a free gift 🎁' },
]

const HOLD = 3

function LineHeroMock() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s >= TURNS.length + HOLD ? 1 : s + 1))
    }, 1700)
    return () => clearInterval(id)
  }, [])

  const shown = Math.min(step, TURNS.length)
  const nextIsOut = step < TURNS.length && TURNS[step]?.from === 'out'

  return (
    <div className="lnmock" role="img" aria-label="A LINE Official Account chat with a flex message card, loyalty reply and rich menu">
      <div className="lnmock-tag">
        <span className="lnmock-avatar">SL</span>
        <div className="lnmock-tag-text">
          <strong>SMSLocal Official</strong>
          <span>LINE Official Account</span>
        </div>
        <span className="lnmock-friends">👥 12,480</span>
      </div>

      <div className="lnmock-flex-card">
        <div className="lnmock-flex-media" />
        <div className="lnmock-flex-body">
          <strong>New arrivals just dropped</strong>
          <p>Members get early access for 24 hours.</p>
          <span className="lnmock-flex-btn">Shop the drop</span>
        </div>
      </div>

      <div className="lnmock-thread">
        {TURNS.slice(0, shown).map((t, i) => (
          <div className={`lnmock-msg ${t.from} lnmock-pop`} key={i} style={{ '--md': `${(i % 2) * 0.05}s` }}>
            <div className="lnmock-bubble">{t.text}</div>
          </div>
        ))}
        {nextIsOut && (
          <div className="lnmock-msg out">
            <div className="lnmock-bubble lnmock-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      <div className="lnmock-richmenu">
        {MENU_TILES.map((t) => (
          <div className="lnmock-tile" key={t.label}>
            <span className="lnmock-tile-icon">{t.icon}</span>
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LineHeroMock
