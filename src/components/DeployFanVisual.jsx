import { useEffect, useState } from 'react'
import './DeployFanVisual.css'
import { IconCursor, IconChat, IconGlobe, IconMegaphone, IconUsers, IconCheck } from './icons.jsx'

const CHANNELS = [
  { icon: <IconChat />, label: 'WhatsApp' },
  { icon: <IconGlobe />, label: 'Website' },
  { icon: <IconMegaphone />, label: 'SMS' },
  { icon: <IconUsers />, label: 'Social' },
]

function DeployFanVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CHANNELS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="dfv" role="img" aria-label="A single chatbot flow being published out to WhatsApp, website, SMS and social channels">
      <div className="dfv-row">
        <div className="dfv-source">
          <span className="dfv-source-ic"><IconCursor /></span>
          <span className="dfv-source-dots">
            <i /><i /><i />
          </span>
          <span className="dfv-source-label">Your flow</span>
        </div>

        <svg className="dfv-fan" viewBox="0 0 200 240" preserveAspectRatio="none" aria-hidden="true">
          {CHANNELS.map((_, i) => {
            const y = 20 + i * 66
            return (
              <path
                key={i}
                className={`dfv-branch${i === active ? ' dfv-branch--active' : ''}`}
                d={`M0 120 C 90 120, 110 ${y}, 200 ${y}`}
              />
            )
          })}
        </svg>

        <div className="dfv-channels">
          {CHANNELS.map((c, i) => (
            <div className={`dfv-channel${i === active ? ' dfv-channel--active' : ''}`} key={c.label}>
              <span className="dfv-channel-ic">{c.icon}</span>
              <span className="dfv-channel-label">{c.label}</span>
              {i === active && <span className="dfv-channel-badge"><IconCheck /></span>}
            </div>
          ))}
        </div>
      </div>

      <div className="dfv-footer">
        <span className="dfv-footer-caption" key={active}>Published to {CHANNELS[active].label}</span>
        <span className="dfv-footer-stat">1 flow · 4 channels</span>
      </div>
    </div>
  )
}

export default DeployFanVisual
