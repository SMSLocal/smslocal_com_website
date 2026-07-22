import { useEffect, useRef, useState } from 'react'
import './PartnerPillars.css'

/**
 * Bespoke, immersive "why partner with us" section for /services/ai-consulting.
 * Bold full-width reason bands: a glowing gradient medallion, a large title and
 * description, and an oversized ghost numeral — revealed in a staggered fade-up
 * as the section scrolls into view. De-boxed, light; premium via depth + motion.
 * Base (no-JS / reduced-motion) state is fully visible; the reveal only arms
 * when motion is allowed.
 */
function PartnerPillars({ eyebrow, title, subtitle, items = [] }) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const mq = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: no-preference)')
      : null
    if (!mq || !mq.matches) return undefined
    setArmed(true)
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(node)
    // safety fallback: never leave the bands hidden if the observer never fires
    const fallback = setTimeout(() => setOn(true), 1600)
    return () => {
      obs.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <section className="section ppil-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className={`ppil${armed ? ' ppil--armed' : ''}${on ? ' is-on' : ''}`} ref={ref}>
          {items.map((r, i) => (
            <div className="ppil-band" style={{ '--i': i }} key={r.title}>
              <span className="ppil-medal" aria-hidden="true">
                <span className="ppil-aura" />
                {r.icon}
              </span>
              <div className="ppil-body">
                <h3 className="ppil-title">{r.title}</h3>
                <p className="ppil-desc">{r.desc}</p>
              </div>
              <span className="ppil-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerPillars
