import { useEffect, useRef, useState } from 'react'
import './MediaBroadcastHeroMock.css'

// Deliberately not another "stack of white cards" hero — this is a dark
// on-air console: a live waveform standing in for audience traffic, channel
// tiles ticking up, and a news-ticker style strip of resolved requests
// scrolling underneath. Same premise as the other hero mocks (things
// happening in real time) in a shape none of them use.
const WAVE_BARS = 28

const EVENTS = ['Season Finale — Live', 'Ticket Drop — Live', 'Premiere Night — Live']

const TICKER_ITEMS = [
  'Ticket transferred for Riya K. · 0:02',
  'Billing question resolved for Deon M. · 0:03',
  'Recommendation sent to Sofia L. · 0:01',
  'Access code reissued for Marcus T. · 0:02',
  'Renewal reminder sent · 340 subscribers',
  'Refund processed for duplicate charge · 0:03',
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function MediaBroadcastHeroMock() {
  const [eventIndex, setEventIndex] = useState(0)
  const [channels, setChannels] = useState({ sms: 214, whatsapp: 386, app: 152 })
  const barsRef = useRef(Array.from({ length: WAVE_BARS }, () => Math.random()))

  useEffect(() => {
    if (REDUCED) return undefined
    const id = setInterval(() => setEventIndex((i) => (i + 1) % EVENTS.length), 4200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (REDUCED) return undefined
    const id = setInterval(() => {
      setChannels((c) => ({
        sms: c.sms + Math.floor(Math.random() * 3),
        whatsapp: c.whatsapp + Math.floor(Math.random() * 4),
        app: c.app + Math.floor(Math.random() * 2),
      }))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mbh-console" role="img" aria-label="Live broadcast console showing on-air traffic across SMS, WhatsApp and app channels, with a ticker of requests resolved in real time">
      <div className="mbh-topline">
        <span className="mbh-onair">
          <span className="mbh-onair-dot" />
          On Air
        </span>
        <span className="mbh-event" key={eventIndex}>{EVENTS[eventIndex]}</span>
      </div>

      <div className="mbh-wave" aria-hidden="true">
        {barsRef.current.map((seed, i) => (
          <span
            className="mbh-wave-bar"
            key={i}
            style={{ '--mbh-seed': seed, '--mbh-i': i }}
          />
        ))}
      </div>

      <div className="mbh-channels">
        <div className="mbh-channel">
          <span className="mbh-channel-label">SMS</span>
          <strong>{channels.sms}</strong>
        </div>
        <div className="mbh-channel">
          <span className="mbh-channel-label">WhatsApp</span>
          <strong>{channels.whatsapp}</strong>
        </div>
        <div className="mbh-channel">
          <span className="mbh-channel-label">App</span>
          <strong>{channels.app}</strong>
        </div>
      </div>

      <div className="mbh-ticker">
        <div className="mbh-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span className="mbh-ticker-item" key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaBroadcastHeroMock
