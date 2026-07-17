import { useEffect, useRef, useState } from 'react'
import './IndustryCarousel.css'

function IndustryCarousel({ eyebrow, title, subtitle, items }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const n = items.length

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, 5000)
  }

  useEffect(() => {
    restartTimer()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n])

  const go = (dir) => {
    setIndex((i) => (i + dir + n) % n)
    restartTimer()
  }

  const prevIdx = (index - 1 + n) % n
  const nextIdx = (index + 1) % n

  const renderCard = (item, i, role) => (
    <div className={`icar-card icar-card--${role} icar-card--${i % 4}`} key={`${role}-${item.title}`}>
      <span className="icar-icon">{item.icon}</span>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  )

  return (
    <section className="section icar-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="icar">
          <div className="icar-viewport">
            <div className="icar-track" key={index}>
              {renderCard(items[prevIdx], prevIdx, 'side')}
              {renderCard(items[index], index, 'main')}
              {renderCard(items[nextIdx], nextIdx, 'side')}
            </div>

            <button type="button" className="icar-arrow icar-arrow--prev" onClick={() => go(-1)} aria-label="Previous industry">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>

            <button type="button" className="icar-arrow icar-arrow--next" onClick={() => go(1)} aria-label="Next industry">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <div className="icar-dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={`icar-dot${i === index ? ' icar-dot--active' : ''}`}
              onClick={() => { setIndex(i); restartTimer() }}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryCarousel
