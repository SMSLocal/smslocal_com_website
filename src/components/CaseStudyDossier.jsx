import { useState, useEffect, useRef } from 'react'
import './CaseStudyDossier.css'

const ROTATE_MS = 8000

/**
 * Customer records for /resources/case-studies.
 *
 * Hierarchy is deliberate: the customer's own sentence is the single focal
 * point of the record, attribution sits directly under it, and the full
 * challenge / solution / results account stays folded away until asked for.
 *
 * The rail auto-advances through the customers so the section is alive on
 * arrival, with a progress fill showing when the next one is due. Rotation
 * stops for good the moment the visitor takes over (clicks a name or opens a
 * story) and pauses while the pointer is over the section.
 */
function CaseStudyDossier({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [auto, setAuto] = useState(true)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!auto || paused) return undefined
    timer.current = setTimeout(
      () => setActive((i) => (i + 1) % items.length),
      ROTATE_MS,
    )
    return () => clearTimeout(timer.current)
  }, [active, auto, paused, items.length])

  const pick = (i) => {
    setActive(i)
    setOpen(false)
    setAuto(false)
  }

  const toggleStory = () => {
    setOpen((o) => !o)
    setAuto(false)
  }

  const rec = items[active]
  const live = auto && !paused

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="csd"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* rail — quiet names, with a progress fill on the active one */}
          <div className="csd-rail" role="tablist" aria-label="Customers">
            {items.map((it, i) => (
              <button
                key={it.company}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`csd-row${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                <span className="csd-row-track" aria-hidden="true">
                  <span
                    className={`csd-row-fill${live && i === active ? ' is-running' : ''}`}
                    key={`${i}-${active}-${live}`}
                    style={{ animationDuration: `${ROTATE_MS}ms` }}
                  />
                </span>
                <span className="csd-row-name">{it.company}</span>
                <span className="csd-row-ind">{it.industry}</span>
              </button>
            ))}
          </div>

          {/* record — one focal point */}
          <div className="csd-record" key={rec.company}>
            <div className="csd-lockup">
              <img
                className="csd-logo"
                src={rec.logo}
                alt={`${rec.company} logo`}
                /* eager: the mark swaps on every rotation, lazy would flash */
                loading="eager"
                width="215"
                height="66"
              />
              <span className="csd-verified">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 1.6l2.1 1.5 2.6-.1.8 2.5 2.1 1.5-1 2.4 1 2.4-2.1 1.5-.8 2.5-2.6-.1L10 18.4l-2.1-1.5-2.6.1-.8-2.5L2.4 13l1-2.4-1-2.4 2.1-1.5.8-2.5 2.6.1L10 1.6z" />
                  <path className="csd-tick" d="M6.7 10.2l2.1 2.1 4.5-4.6" />
                </svg>
                Verified customer
              </span>
            </div>

            <blockquote className="csd-quote">
              &ldquo;{rec.quote.text}&rdquo;
            </blockquote>

            <div className="csd-by">
              {/* Photo sits over the initials; if the file is missing the img
                  hides itself and the gradient monogram shows through. */}
              <span className="csd-by-mono" aria-hidden="true">
                <span className="csd-by-init">{rec.mono}</span>
                {rec.avatar && (
                  <img
                    className="csd-by-photo"
                    src={rec.avatar}
                    alt=""
                    loading="eager"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
              </span>
              <span className="csd-by-who">
                <strong>{rec.quote.author}</strong>
                <span>{rec.company} &middot; {rec.industry}</span>
              </span>
            </div>

            {rec.headline && (
              <p className="csd-headline">
                <strong>{rec.headline.value}</strong> {rec.headline.text}
              </p>
            )}

            <button
              type="button"
              className={`csd-more${open ? ' is-open' : ''}`}
              onClick={toggleStory}
              aria-expanded={open}
            >
              {open ? 'Hide the full story' : 'Read the full story'}
              <span className="csd-more-ico" aria-hidden="true" />
            </button>

            {open && (
              <div className="csd-story">
                <div className="csd-story-grid">
                  <div className="csd-block">
                    <span className="csd-block-cap">The challenge</span>
                    <p>{rec.challenge}</p>
                  </div>
                  <div className="csd-block">
                    <span className="csd-block-cap">What they put in place</span>
                    <p>{rec.solution}</p>
                  </div>
                </div>

                <div className="csd-block">
                  <span className="csd-block-cap">What they reported afterwards</span>
                  <ul className="csd-results">
                    {rec.results.map((r) => (
                      <li key={r.text} className={r.value ? 'has-val' : ''}>
                        {r.value && <strong>{r.value}</strong>}
                        <span>{r.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="csd-src">
                  Published with {rec.company}&rsquo;s permission &middot; using {rec.products}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudyDossier
