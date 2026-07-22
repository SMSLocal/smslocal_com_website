import { useEffect, useRef, useState } from 'react'
import './AnalyticsPulseHero.css'

const TARGET = 2847193
const FROM = 2840000

function useCountUp() {
  const [count, setCount] = useState(TARGET)

  useEffect(() => {
    const reduced = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setCount(TARGET)
      return undefined
    }

    let raf
    let liveId
    const dur = 2200
    const start = performance.now()
    setCount(FROM)

    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(FROM + (TARGET - FROM) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const liveTimeout = setTimeout(() => {
      liveId = setInterval(() => {
        setCount((c) => c + Math.floor(Math.random() * 5) + 1)
      }, 1400)
    }, dur + 300)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(liveTimeout)
      clearInterval(liveId)
    }
  }, [])

  return count
}

// Small self-drawing sparkline used inside the floating delta chips
function ChipSpark({ points, delay }) {
  return (
    <svg className="aph-chip-spark" viewBox="0 0 48 20" preserveAspectRatio="none" aria-hidden="true">
      <path
        d={points}
        pathLength="1"
        className="aph-chip-spark-line"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  )
}

function AnalyticsPulseHero() {
  const count = useCountUp()
  const gid = useRef(`aphgrad-${Math.random().toString(36).slice(2, 8)}`).current

  const line = 'M0 112 L46 96 L92 103 L138 80 L184 87 L230 61 L276 71 L322 43 L368 52 L414 27 L460 18'
  const area = `${line} L460 140 L0 140 Z`

  return (
    <div className="aph" role="img" aria-label="Live messaging analytics: 2,847,193 messages delivered today, delivery rate 98.6 percent, click-through 12.4 percent, both trending up">
      <span className="aph-live">
        <i className="aph-live-dot" aria-hidden="true" />
        Live analytics
      </span>

      <div className="aph-kpi">
        <span className="aph-kpi-num">{count.toLocaleString('en-US')}</span>
        <span className="aph-kpi-label">Messages delivered · today</span>
      </div>

      <div className="aph-chartwrap">
        <svg className="aph-chart" viewBox="0 0 460 140" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f5bd5" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(79, 91, 213,0.20)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0)" />
            </linearGradient>
          </defs>
          <path className="aph-chart-area" d={area} fill={`url(#${gid}-fill)`} />
          <path
            className="aph-chart-line"
            d={line}
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
          />
          <circle className="aph-chart-tip" cx="460" cy="18" r="4" fill="#ec4899" />
        </svg>
        <span className="aph-baseline" aria-hidden="true" />

        <div className="aph-chip aph-chip--a">
          <ChipSpark points="M0 16 L12 13 L24 14 L36 7 L48 3" delay={0.2} />
          <div className="aph-chip-meta">
            <span className="aph-chip-val">98.6%</span>
            <span className="aph-chip-label">Delivery</span>
          </div>
          <span className="aph-chip-delta up" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            1.2
          </span>
        </div>

        <div className="aph-chip aph-chip--b">
          <ChipSpark points="M0 17 L12 12 L24 13 L36 8 L48 4" delay={0.55} />
          <div className="aph-chip-meta">
            <span className="aph-chip-val">12.4%</span>
            <span className="aph-chip-label">Click-through</span>
          </div>
          <span className="aph-chip-delta up" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            0.9
          </span>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPulseHero
