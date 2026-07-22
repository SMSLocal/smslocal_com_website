import { useEffect, useRef, useState } from 'react'
import './WhyUsMetrics.css'

/**
 * "Why us" section for the WhatsApp Broadcasting page.
 * Four reasons, each fronted by a large brand-gradient metric that counts up
 * from zero the first time the row scrolls into view (IntersectionObserver).
 * Visitors who prefer reduced motion see the final figures immediately, and
 * the numbers are decorative — the heading and description carry the meaning.
 */
const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function WhyUsMetrics({ eyebrow, title, subtitle, items, alt }) {
  const ref = useRef(null)
  const started = useRef(false)
  const [vals, setVals] = useState(() => items.map((m) => (REDUCED ? m.value : 0)))

  useEffect(() => {
    if (REDUCED) return
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true
      const start = performance.now()
      const dur = 1600
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur)
        const e = 1 - Math.pow(1 - t, 3)
        setVals(items.map((m) => m.value * e))
        if (t < 1) requestAnimationFrame(step)
        else setVals(items.map((m) => m.value))
      }
      requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [items])

  return (
    <section className={alt ? 'section section-alt wmet-section' : 'section wmet-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wmet-row" ref={ref}>
          {items.map((m, i) => (
            <div className="wmet-cell" key={m.heading}>
              <span className="wmet-figure">
                {m.prefix || ''}
                {Math.round(vals[i]).toLocaleString()}
                {m.suffix || ''}
              </span>
              <h3>{m.heading}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsMetrics
