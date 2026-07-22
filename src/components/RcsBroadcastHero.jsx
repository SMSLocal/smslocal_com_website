import { useEffect, useState } from 'react'
import './RcsBroadcastHero.css'
import { IconCheck, IconRefresh } from './icons.jsx'

const TARGET = 12900
const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const READ_RATE = 0.82
const R = 26
const CIRC = 2 * Math.PI * R

function RcsBroadcastHero() {
  const [live, setLive] = useState(13214)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setLive(13000 + Math.floor(Math.random() * 500)), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rcbh" aria-hidden="true">
      <span className="rcbh-glow" />
      <span className="rcbh-ring-pulse rcbh-ring-pulse--1" />
      <span className="rcbh-ring-pulse rcbh-ring-pulse--2" />

      <div className="rcbh-card">
        <div className="rcbh-card-head">
          <span className="rcbh-av">SL</span>
          <div className="rcbh-card-id">
            <strong>SMSLocal<span className="rcbh-verified"><IconCheck /></span></strong>
            <span>Verified business · RCS</span>
          </div>
        </div>
        <div className="rcbh-card-media">
          <span className="rcbh-media-badge">Rich card</span>
          <span className="rcbh-media-tag">
            <b>30%</b>
            OFF
          </span>
          <span className="rcbh-media-spark rcbh-media-spark--1" />
          <span className="rcbh-media-spark rcbh-media-spark--2" />
          <span className="rcbh-media-spark rcbh-media-spark--3" />
        </div>
        <div className="rcbh-card-body">
          <strong>Flash sale — 30% off, ends tonight</strong>
          <p>Sent to your whole list at once, branded and verified.</p>
        </div>
        <div className="rcbh-card-actions">
          <span className="rcbh-btn rcbh-btn--solid">Shop now</span>
          <span className="rcbh-btn">Remind me later</span>
        </div>
      </div>

      <span className="rcbh-badge rcbh-badge--reach">
        <span className="rcbh-avatars">
          <i>P</i><i>S</i><i>M</i>
        </span>
        <span className="rcbh-badge-text">
          <b>12,900</b>
          contacts reached
        </span>
      </span>

      <span className="rcbh-badge rcbh-badge--live">
        <span className="rcbh-live-dot" />
        <span className="rcbh-badge-text">
          <b>{live.toLocaleString('en-US')}</b>
          delivered / min
        </span>
      </span>

      <span className="rcbh-badge rcbh-badge--ring">
        <svg className="rcbh-ring-svg" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={R} className="rcbh-ring-track" />
          <circle
            cx="32" cy="32" r={R}
            className="rcbh-ring-fill"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - READ_RATE)}
          />
        </svg>
        <span className="rcbh-badge-text">
          <b>82%</b>
          read rate
        </span>
      </span>

      <span className="rcbh-badge rcbh-badge--fallback">
        <span className="rcbh-fallback-icon"><IconRefresh /></span>
        <span className="rcbh-badge-text">
          <b>9%</b>
          auto SMS fallback
        </span>
      </span>
    </div>
  )
}

export default RcsBroadcastHero
