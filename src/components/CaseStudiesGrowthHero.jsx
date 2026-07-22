import { useEffect, useRef, useState } from 'react'
import './CaseStudiesGrowthHero.css'

/**
 * Hero visual for /resources/case-studies.
 * A "results climb": a run of gradient bars grows week over week up to a glowing
 * 94% summit, while the headline percentage counts up. Nothing wraps the scene —
 * the bars, the peak marker and the readout float directly on the page. No card,
 * no frame. Base (reduced-motion / no-CSS) state is fully assembled: every bar at
 * full height, 94%. Motion only enhances.
 */
const BARS = [30, 41, 50, 60, 72, 82, 94]
const TARGET = 94
const DUR = 2000

function CaseStudiesGrowthHero() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const [rate, setRate] = useState(TARGET)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const mq = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: no-preference)')
      : null
    if (!mq || !mq.matches) {
      setOn(true)
      setRate(TARGET)
      return undefined
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setOn(true)
        const start = performance.now()
        let raf
        const tick = (now) => {
          const p = Math.min(1, (now - start) / DUR)
          const eased = 1 - Math.pow(1 - p, 3)
          setRate(Math.round(eased * TARGET))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        obs.disconnect()
        node._raf = raf
      },
      { threshold: 0.4 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={on ? 'csgh is-on' : 'csgh'} ref={ref} aria-hidden="true">
      <span className="csgh-pill">
        <span className="csgh-live" />
        Live results
      </span>

      <div className="csgh-figure">
        <span className="csgh-num">{rate}%</span>
        <span className="csgh-cap">of chats resolved without an agent, 8 weeks after go-live</span>
      </div>

      <div className="csgh-bars">
        {BARS.map((h, i) => (
          <span className={`csgh-bar${i === BARS.length - 1 ? ' csgh-bar--peak' : ''}`} style={{ '--h': `${h}%`, '--i': i }} key={i}>
            {i === BARS.length - 1 && <span className="csgh-peak" />}
          </span>
        ))}
      </div>

      <div className="csgh-axis">
        <span>Wk 1</span>
        <span>Wk 8</span>
      </div>
    </div>
  )
}

export default CaseStudiesGrowthHero
