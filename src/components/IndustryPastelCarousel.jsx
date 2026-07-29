import { useEffect, useRef, useState } from 'react'
import './IndustryPastelCarousel.css'

const TINTS = ['mint', 'blush', 'lavender']

function ArrowIcon({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IndustryPastelCarousel({ eyebrow, title, subtitle, items }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollByCard = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0]
    const gap = parseFloat(getComputedStyle(track).gap || '0')
    const amount = (card.getBoundingClientRect().width + gap) * dir
    track.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0]
    const gap = parseFloat(getComputedStyle(track).gap || '0')
    track.scrollTo({ left: i * (card.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const onScroll = () => {
      const card = track.children[0]
      const gap = parseFloat(getComputedStyle(track).gap || '0')
      const step = card.getBoundingClientRect().width + gap
      setActive(Math.round(track.scrollLeft / step))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="section ipc-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ipc-carousel">
          <button type="button" className="ipc-nav ipc-nav--left" onClick={() => scrollByCard(-1)} aria-label="Previous industries">
            <ArrowIcon dir="left" />
          </button>

          <div className="ipc-track" ref={trackRef}>
            {items.map((item, i) => (
              <div className={`ipc-card ipc-card--${TINTS[i % TINTS.length]}`} key={item.title}>
                <span className="ipc-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <button type="button" className="ipc-nav ipc-nav--right" onClick={() => scrollByCard(1)} aria-label="Next industries">
            <ArrowIcon dir="right" />
          </button>
        </div>

        <div className="ipc-dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={`ipc-dot${i === active ? ' is-active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryPastelCarousel
