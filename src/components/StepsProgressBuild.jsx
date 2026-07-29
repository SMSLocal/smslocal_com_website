import { useEffect, useState } from 'react'
import './StepsProgressBuild.css'

const HOLD_MS = 1500
const READY_VALUES = ['25% synced', '50% trained', '75% live', '100% booked']

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function StepsProgressBuild({ eyebrow, title, subtitle, steps, alt }) {
  const [current, setCurrent] = useState(REDUCED ? steps.length - 1 : 0)

  useEffect(() => {
    if (REDUCED) return undefined
    const id = setInterval(() => {
      setCurrent((c) => (c >= steps.length - 1 ? 0 : c + 1))
    }, HOLD_MS)
    return () => clearInterval(id)
  }, [steps.length])

  return (
    <section className={alt ? 'section section-alt spb-section' : 'section spb-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="spb-row">
          {steps.map((step, i) => {
            const reached = i <= current
            return (
              <div className={`spb-col spb-col--${i}${reached ? ' is-reached' : ''}`} key={step.title} style={{ '--spb-i': i }}>
                <span className="spb-value">{reached ? READY_VALUES[i] : ' '}</span>
                <div className="spb-bar">
                  <span className="spb-bar-fill" />
                </div>
                <span className="spb-step-label">Step {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StepsProgressBuild
