import { useState, useEffect, useRef } from 'react'
import './CaseStudyReviews.css'

const ROTATE_MS = 6000

/**
 * Star-rated customer reviews carousel, as published on the live case-study
 * index. Shorter and more opinion-led than the full case-study records above,
 * so it reads as a review wall rather than a repeat of the same material —
 * one review at a time, auto-advancing, steerable by arrows or dots.
 */
function CaseStudyReviews({ eyebrow, title, subtitle, items, alt }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)
  const timer = useRef(null)
  const n = items.length

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => setI((v) => (v + 1) % n), ROTATE_MS)
    return () => clearTimeout(timer.current)
  }, [i, paused, tick, n])

  const go = (next) => {
    setI((next + n) % n)
    setTick((t) => t + 1)
  }

  const r = items[i]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="csrv"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="csrv-arrow"
            aria-label="Previous review"
            onClick={() => go(i - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>

          <figure className="csrv-slide" key={i}>
            <div className="csrv-stars" aria-label={`${r.stars} out of 5 stars`}>
              {Array.from({ length: r.stars }, (_, k) => (
                <svg key={k} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.4l2.9 6.1 6.6.9-4.8 4.7 1.2 6.7-5.9-3.2-5.9 3.2 1.2-6.7L2.5 9.4l6.6-.9z" />
                </svg>
              ))}
            </div>

            <blockquote className="csrv-quote">&ldquo;{r.quote}&rdquo;</blockquote>

            <figcaption className="csrv-by">
              <img
                className="csrv-logo"
                src={r.logo}
                alt={`${r.company} logo`}
                loading="lazy"
              />
              <span className="csrv-who">
                <strong>{r.author}</strong>
                <span>{r.company} &middot; {r.industry}</span>
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="csrv-arrow"
            aria-label="Next review"
            onClick={() => go(i + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="csrv-dots" role="tablist" aria-label="Reviews">
          {items.map((it, k) => (
            <button
              key={it.company + k}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Review from ${it.company}`}
              className={`csrv-dot${k === i ? ' is-active' : ''}`}
              onClick={() => go(k)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudyReviews
