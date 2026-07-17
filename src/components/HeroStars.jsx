import './HeroStars.css'
import {
  IconChat, IconMegaphone, IconBell, IconRobot, IconMail,
  IconBrain, IconPhone, IconGlobe, IconMic, IconBolt,
} from './icons.jsx'

const PALETTE = [
  'rgba(109, 92, 231, 0.95)',
  'rgba(236, 72, 153, 0.95)',
  'rgba(20, 184, 166, 0.9)',
  'rgba(251, 113, 133, 0.9)',
  'rgba(255, 255, 255, 1)',
]

// [ topPct, leftPct, sizePx, colorIndex, durationSec, delaySec ]
const STARS = [
  [12, 6, 8, 0, 7, 0],
  [22, 14, 6, 1, 9, 1.5],
  [16, 30, 5, 4, 6, 0.8],
  [34, 9, 10, 2, 10, 2.2],
  [44, 20, 6, 0, 8, 0.4],
  [20, 46, 5, 3, 7, 3],
  [12, 60, 8, 1, 9, 1.1],
  [28, 72, 6, 4, 6.5, 2.6],
  [18, 86, 10, 0, 11, 0.6],
  [38, 90, 6, 2, 8, 1.8],
  [50, 78, 5, 1, 7, 3.2],
  [60, 12, 8, 3, 9, 0.9],
  [66, 30, 6, 0, 6, 2.1],
  [58, 52, 5, 4, 8, 1.3],
  [70, 66, 8, 1, 10, 0.3],
  [64, 88, 6, 2, 7, 2.8],
  [8, 40, 6, 0, 8, 1.6],
  [46, 40, 5, 1, 6.5, 3.4],
  [54, 94, 8, 4, 9, 1],
  [72, 46, 6, 3, 7.5, 2.4],
]

// [ IconComponent, topPct, leftPct, sizePx, colorIndex, durationSec, delaySec ]
const ICONS = [
  [IconChat, 20, 6, 36, 0, 9, 0],
  [IconMegaphone, 60, 10, 32, 3, 11, 1.5],
  [IconBell, 38, 16, 28, 2, 8, 0.8],
  [IconRobot, 72, 22, 34, 0, 10, 2],
  [IconMail, 16, 82, 32, 1, 9, 1],
  [IconBrain, 32, 90, 36, 0, 11, 0.4],
  [IconPhone, 62, 86, 30, 2, 8.5, 2.4],
  [IconGlobe, 78, 72, 32, 3, 10, 1.2],
  [IconMic, 12, 70, 28, 1, 9, 3],
  [IconBolt, 68, 58, 28, 0, 8, 1.8],
]

function HeroStars() {
  return (
    <div className="hero-stars" aria-hidden="true">
      {ICONS.map(([Icon, top, left, size, colorIdx, dur, delay], i) => (
        <span
          key={`i-${i}`}
          className="hero-float-icon"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            color: PALETTE[colorIdx],
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon />
        </span>
      ))}

      {STARS.map(([top, left, size, colorIdx, dur, delay], i) => {
        const color = PALETTE[colorIdx]
        return (
          <span
            key={`s-${i}`}
            className="hero-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              boxShadow: `0 0 ${size * 1.6}px ${color}`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export default HeroStars
