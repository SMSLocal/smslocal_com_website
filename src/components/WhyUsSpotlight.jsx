import { useCallback, useEffect, useRef, useState } from 'react'
import './WhyUsSpotlight.css'

// Bento grid: one featured tile plus three smaller ones in an asymmetric
// layout, not a uniform 2x2. Each stat counts up the first time its tile
// is hovered or scrolls into view.

const COUNT_MS = 900
const COUNT_STEPS = 30

function useCountUp(target, start) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return undefined
    let step = 0
    const id = window.setInterval(() => {
      step += 1
      setValue(Math.round((target * step) / COUNT_STEPS))
      if (step >= COUNT_STEPS) window.clearInterval(id)
    }, COUNT_MS / COUNT_STEPS)
    return () => window.clearInterval(id)
  }, [start, target])
  return value
}

function WhyUsTile({ item, i, revealed, onReveal }) {
  const ref = useRef(null)
  const value = useCountUp(item.stat.value, revealed)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReveal(i)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [i, onReveal])

  return (
    <div className={`wus-tile wus-tile--${i}`} ref={ref} onMouseEnter={() => onReveal(i)}>
      <span className="wus-tile-icon">{item.icon}</span>
      <strong className="wus-tile-value">{item.stat.prefix || ''}{value}{item.stat.suffix}</strong>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  )
}

function WhyUsSpotlight({ eyebrow, title, subtitle, items, alt }) {
  const [revealed, setRevealed] = useState(() => new Set())
  const reveal = useCallback((i) => setRevealed((s) => (s.has(i) ? s : new Set(s).add(i))), [])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="wus-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="wus-bento">
          <WhyUsTile item={items[0]} i={0} revealed={revealed.has(0)} onReveal={reveal} />
          <div className="wus-bento-side">
            <WhyUsTile item={items[1]} i={1} revealed={revealed.has(1)} onReveal={reveal} />
            <div className="wus-bento-row">
              <WhyUsTile item={items[2]} i={2} revealed={revealed.has(2)} onReveal={reveal} />
              <WhyUsTile item={items[3]} i={3} revealed={revealed.has(3)} onReveal={reveal} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSpotlight
