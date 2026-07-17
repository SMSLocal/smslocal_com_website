import { useState } from 'react'
import { Link } from 'react-router-dom'
import './sections.css'
import { IconPlug, IconGear, IconRocket, IconCheck } from '../icons.jsx'

const STEP_ICONS = [<IconPlug />, <IconGear />, <IconRocket />, <IconCheck />]

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta, stats, visual }) {
  if (visual) {
    return (
      <section className="hero hero-split">
        <div className="container hero-split-inner">
          <div className="hero-split-copy">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-actions">
              {primaryCta && <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>}
              {secondaryCta && <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>}
            </div>
            {stats && (
              <div className="hero-stats hero-stats-left">
                {stats.map((s) => (
                  <div className="hero-stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hero-split-visual">{visual}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero">
      <div className="container hero-inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-actions">
          {primaryCta && <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>}
          {secondaryCta && <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>}
        </div>
        {stats && (
          <div className="hero-stats">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function FeatureGrid({ title, subtitle, items, alt, variant, eyebrow = 'Features' }) {
  if (variant === 'panel') {
    return (
      <section className={alt ? 'section section-alt fpanel-section' : 'section fpanel-section'}>
        <div className="container fpanel-inner">
          <div className="fpanel-copy">
            {eyebrow && <span className="section-kicker fpanel-kicker">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="fpanel-grid">
            {items.map((item) => (
              <div className="fpanel-item" key={item.title}>
                <span className="fpanel-icon">{item.icon}</span>
                <p><strong>{item.title}.</strong> {item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`${alt ? 'section section-alt' : 'section'}${variant ? ` fsec--${variant}` : ''}`}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className={`feature-grid${variant ? ` feature-grid--${variant}` : ''}`}>
          {items.map((item) => (
            <div className="feature-card" key={item.title}>
              <span className="feature-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks({ title, steps, alt, variant, eyebrow = 'How it works' }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        <div className={`steps-row${variant ? ` steps-row--${variant}` : ''}`}>
          {steps.map((step, idx) => (
            <div className="step-card" key={step.title}>
              <span className="step-number">{String(idx + 1).padStart(2, '0')}</span>
              {step.visual || (
                <span className="step-icon">{step.icon || STEP_ICONS[idx % STEP_ICONS.length]}</span>
              )}
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NarrativeCompare({ eyebrow, heading, paragraphs, leftLabel, leftItems, rightLabel, rightItems, alt, variant, stat }) {
  if (variant === 'convert') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container nconv-inner">
          <div className="nconv-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="nconv-row">
            <div className="nconv-card muted">
              <span className="nconv-label">{leftLabel}</span>
              <ul className="nconv-list x">
                {leftItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="nconv-connector" aria-hidden="true">
              <span className="nconv-line" />
              <span className="nconv-arrow">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
            <div className="nconv-card accent">
              <span className="nconv-label accent">{rightLabel}</span>
              <ul className="nconv-list check">
                {rightItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'stat') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container nstat-inner">
          <div className="nstat-copy">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="nstat-card">
            <span className="nstat-card-kicker">{rightLabel}</span>
            <div className="nstat-value">{stat.value}</div>
            <p className="nstat-desc">{stat.desc}</p>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'flanked') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container narrative-inner narrative--flanked">
          <div className="narrative-card">
            <span className="narrative-card-label">{leftLabel}</span>
            <ul className="narrative-list muted">
              {leftItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="narrative-copy">
            {eyebrow && <span className="section-kicker narrative-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="narrative-card accent">
            <span className="narrative-card-label accent">{rightLabel}</span>
            <ul className="narrative-list check">
              {rightItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'collage') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container ncoll-inner">
          <div className="ncoll-copy">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="ncoll-bullets">
              {leftItems.map((item) => (
                <li key={item}><span className="ncoll-bullet-ic" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="ncoll-windows">
            {rightItems.map((w, i) => (
              <div className={`ncoll-window ncoll-window-${i % 4}`} key={w.label}>
                <div className="ncoll-window-bar"><span /><span /><span /></div>
                <div className="ncoll-window-body">
                  <span className="ncoll-window-icon">{w.icon}</span>
                  <span className="ncoll-window-label">{w.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'scatter') {
    return (
      <section className={`narrative--scatter-section${alt ? ' section-alt' : ''}`}>
        <div className="container nscat-inner">
          <div className="nscat-copy">
            {eyebrow && <span className="nscat-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            <div className="nscat-points">
              {leftItems.map((pt) => (
                <div className="nscat-point" key={pt.text}>
                  <span className="nscat-point-icon">{pt.icon}</span>
                  <p>{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="nscat-cards">
            {rightItems.map((c, i) => (
              <div className={`nscat-card nscat-card-${i % 4}`} key={c.name}>
                <div className="nscat-card-head">
                  <span className="nscat-avatar">{initialsOf(c.name)}</span>
                  <span className="nscat-card-id">
                    <strong>{c.name}</strong>
                    <span>{c.meta}</span>
                  </span>
                </div>
                <div className="nscat-card-fields">
                  <span>{c.field1}</span>
                  <span>{c.field2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'stacked') {
    return (
      <section className={`narrative--stacked-section${alt ? ' section-alt' : ''}`}>
        <div className="container nstack-inner">
          <div className="nstack-copy">
            {eyebrow && <span className="nstack-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="nstack-cards">
            {leftItems.map((item, i) => (
              <div className={`nstack-card nstack-card-${i % 4}`} key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'columns') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container ncols-inner">
          <div className="ncols-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="ncols-row">
            <div className="ncols-col">
              <span className="ncols-label">{leftLabel}</span>
              <ul className="ncols-list muted">
                {leftItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ncols-col accent">
              <span className="ncols-label accent">{rightLabel}</span>
              <ul className="ncols-list check">
                {rightItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'paths') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container npaths-inner">
          <div className="npaths-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="npaths-track npaths-track--bad">
            <span className="npaths-label">{leftLabel}</span>
            <div className="npaths-chain">
              {leftItems.map((item, i) => (
                <div className="npaths-link" key={item}>
                  <span className="npaths-node muted">{item}</span>
                  {i < leftItems.length - 1 && (
                    <span className="npaths-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="npaths-track npaths-track--good">
            <span className="npaths-label accent">{rightLabel}</span>
            <div className="npaths-chain">
              {rightItems.map((item, i) => (
                <div className="npaths-link" key={item}>
                  <span className={`npaths-node${i === rightItems.length - 1 ? ' accent' : ''}`}>{item}</span>
                  {i < rightItems.length - 1 && (
                    <span className="npaths-arrow accent" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'rows') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container narrative--rows">
          <div className="nrows-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="nrows-panel">
            <div className="nrows-colhead">
              <span className="nrows-collabel">{leftLabel}</span>
              <span className="nrows-spacer" aria-hidden="true" />
              <span className="nrows-collabel accent">{rightLabel}</span>
            </div>
            {leftItems.map((item, i) => (
              <div className="nrows-row" key={i}>
                <span className="nrows-cell muted">
                  <i className="nrows-x" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </i>
                  {item}
                </span>
                <span className="nrows-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <span className="nrows-cell done">
                  <i className="nrows-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                  </i>
                  {rightItems[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className={`container narrative-inner${variant ? ` narrative--${variant}` : ''}`}>
        <div className="narrative-copy">
          {eyebrow && (variant === 'ledger'
            ? <span className="section-kicker">{eyebrow}</span>
            : <span className="narrative-eyebrow">{eyebrow}</span>)}
          <h2>{heading}</h2>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {variant !== 'statement' && (
          <div className="narrative-cards">
            <div className="narrative-card">
              <span className="narrative-card-label">{leftLabel}</span>
              <ul className="narrative-list muted">
                {leftItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="narrative-card accent">
              <span className="narrative-card-label accent">{rightLabel}</span>
              <ul className="narrative-list check">
                {rightItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function CompareTable({ title, subtitle, leftLabel, rightLabel, rows, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="compare-table">
          <div className="compare-row compare-head">
            <span />
            <span>{leftLabel}</span>
            <span className="compare-highlight-col">{rightLabel}</span>
          </div>
          {rows.map((row) => (
            <div className="compare-row" key={row.feature}>
              <span className="compare-feature">{row.feature}</span>
              <span className="compare-cell">{row.left}</span>
              <span className="compare-cell compare-highlight-col">{row.right}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TripleCell({ value }) {
  if (value === true) return <span className="triple-check">✓</span>
  if (value === false) return <span className="triple-cross">—</span>
  return <span>{value}</span>
}

export function TripleCompareTable({ title, subtitle, col1Label, col2Label, col3Label, rows, alt, variant, eyebrow = 'Comparison' }) {
  if (variant === 'cards') {
    const cols = [
      { label: col1Label, key: 'col1' },
      { label: col2Label, key: 'col2' },
      { label: col3Label, key: 'col3', best: true },
    ]
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          <div className="triple-cards">
            {cols.map((c) => (
              <div className={`triple-card${c.best ? ' triple-card--best' : ''}`} key={c.label}>
                {c.best && <span className="triple-card-tag">Recommended</span>}
                <span className="triple-card-title">{c.label}</span>
                <ul className="triple-card-list">
                  {rows.map((r) => {
                    const v = r[c.key]
                    const state = v === true ? 'yes' : v === false ? 'no' : 'partial'
                    const glyph = v === true ? '✓' : v === false ? '–' : '~'
                    return (
                      <li className={`triple-ci triple-ci--${state}`} key={r.feature}>
                        <span className="triple-ci-mark" aria-hidden="true">{glyph}</span>
                        <span className="triple-ci-text">
                          {r.feature}
                          {state === 'partial' && <em> · {v}</em>}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="triple-table">
          <div className="triple-row triple-head">
            <span />
            <span>{col1Label}</span>
            <span>{col2Label}</span>
            <span className="triple-highlight-col">{col3Label}</span>
          </div>
          {rows.map((row) => (
            <div className="triple-row" key={row.feature}>
              <span className="triple-feature">{row.feature}</span>
              <span className="triple-cell"><TripleCell value={row.col1} /></span>
              <span className="triple-cell"><TripleCell value={row.col2} /></span>
              <span className="triple-cell triple-highlight-col"><TripleCell value={row.col3} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EcosystemGrid({ title, subtitle, items, alt, variant, eyebrow = 'Explore' }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ecosystem-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className={`ecosystem-grid${variant ? ` ecosystem-grid--${variant}` : ''}`}>
          {items.map((item) => (
            <div className="ecosystem-card" key={item.title}>
              <span className="ecosystem-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.href && (
                item.href.startsWith('mailto:') || item.href.startsWith('http') ? (
                  <a href={item.href} className="ecosystem-link">Learn more →</a>
                ) : (
                  <Link to={item.href} className="ecosystem-link">Learn more →</Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyUs({ title, subtitle, eyebrow, items, alt, variant }) {
  const kick = eyebrow !== undefined ? eyebrow : (variant === 'split' ? undefined : 'Why us')
  return (
    <section className={`${alt ? 'section section-alt' : 'section'}${variant ? ` whyus--${variant}` : ''}`}>
      <div className="container">
        <div className="whyus-head">
          {kick && <span className={variant === 'split' ? 'whyus-eyebrow' : 'section-kicker'}>{kick}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <div className={`whyus-grid${variant ? ` whyus-grid--${variant}` : ''}`}>
          {items.map((item) => (
            <div className="whyus-card" key={item.title}>
              <span className="whyus-icon">{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const AVATAR_TINTS = ['tint-a', 'tint-b', 'tint-c', 'tint-d']

export function Testimonials({ title, items, alt, eyebrow = 'Testimonials' }) {
  const looped = [...items, ...items, ...items]

  return (
    <section className={alt ? 'section section-alt testimonials-section' : 'section testimonials-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
      </div>
      <div className="testimonial-marquee">
        <div className="testimonial-marquee-track">
          {looped.map((t, idx) => (
            <figure className="testimonial-card" key={`${t.name}-${idx}`}>
              <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <figcaption className="testimonial-author">
                <span className={`testimonial-avatar ${AVATAR_TINTS[idx % AVATAR_TINTS.length]}`}>
                  {initialsOf(t.name)}
                </span>
                <span className="testimonial-author-meta">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ({ title, items, alt, eyebrow = 'FAQ' }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container faq-container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        <div className="faq-list">
          {items.map((item, idx) => (
            <div className={openIndex === idx ? 'faq-item open' : 'faq-item'} key={item.q}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                {item.q}
                <span className="faq-caret">+</span>
              </button>
              <div className="faq-answer-wrap">
                <div className="faq-answer-inner">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABanner({ title, subtitle, cta, secondaryCta, variant }) {
  let heading = title
  if (typeof title === 'string') {
    const words = title.trim().split(' ')
    const last = words.pop()
    heading = (
      <>
        {words.join(' ')} <span className="grad-word">{last}</span>
      </>
    )
  }

  if (variant === 'plain') {
    return (
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner">
            <h2>{heading}</h2>
            <p>{subtitle}</p>
            <Link to={cta.href} className="btn btn-primary">{cta.label}</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cta-banner cta-banner--spotlight">
      <div className="container">
        <div className="cta-spot">
          <span className="cta-spot-glow cta-spot-glow--a" aria-hidden="true" />
          <span className="cta-spot-glow cta-spot-glow--b" aria-hidden="true" />
          <div className="cta-spot-inner">
            <h2>{heading}</h2>
            <p>{subtitle}</p>
            <div className="cta-spot-actions">
              <Link to={cta.href} className="btn btn-primary">{cta.label}</Link>
              {secondaryCta && (
                <Link to={secondaryCta.href} className="cta-spot-secondary">{secondaryCta.label}</Link>
              )}
            </div>
          </div>
          <div className="cta-spot-visual" aria-hidden="true">
            <span className="cta-spot-chip cta-spot-chip-0"><IconPlug /></span>
            <span className="cta-spot-chip cta-spot-chip-1"><IconGear /></span>
            <span className="cta-spot-chip cta-spot-chip-2"><IconRocket /></span>
            <span className="cta-spot-chip cta-spot-chip-3"><IconCheck /></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PricingTable({ title, subtitle, plans }) {
  return (
    <section className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div className={plan.highlighted ? 'plan-card highlighted' : 'plan-card'} key={plan.name}>
              {plan.highlighted && <span className="badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}<span className="period">{plan.period}</span></p>
              <ul>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Link to="/contact" className="btn btn-primary full-width">{plan.cta || 'Choose Plan'}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
