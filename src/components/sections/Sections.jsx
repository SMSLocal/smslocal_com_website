import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './sections.css'
import { IconPlug, IconGear, IconRocket, IconCheck } from '../icons.jsx'
import { hl } from '../../utils/hl.jsx'

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
            {title && <h2>{hl(title)}</h2>}
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
        {title && <h2 className="section-title">{hl(title)}</h2>}
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
        {title && <h2 className="section-title">{hl(title)}</h2>}
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

export function NarrativeCompare({ eyebrow, heading, paragraphs, leftLabel, leftItems, rightLabel, rightItems, alt, variant, stat, className }) {
  if (variant === 'convert') {
    return (
      <section className={alt ? 'section section-alt' : 'section'}>
        <div className="container nconv-inner">
          <div className="nconv-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{hl(heading)}</h2>
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

  if (variant === 'resolve') {
    return (
      <section className={alt ? 'section section-alt nstm-section' : 'section nstm-section'}>
        <div className="container nstm-inner">
          <div className="nstm-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2 className="nstm-heading">{hl(heading)}</h2>
            {paragraphs.map((p, i) => (
              <p className="nstm-paragraph" key={i}>{p}</p>
            ))}
          </div>

          <div className="nstm-row">
            <div className="nstm-card nstm-card--bad">
              <span className="nstm-card-label">{leftLabel}</span>
              <ul className="nstm-list">
                {leftItems.map((item, i) => (
                  <li key={item} style={{ '--nstm-i': i }}>
                    <span className="nstm-ic nstm-ic--x" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <span className="nstm-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>

            <div className="nstm-card nstm-card--good">
              <span className="nstm-card-label accent">{rightLabel}</span>
              <ul className="nstm-list">
                {rightItems.map((item, i) => (
                  <li key={item} style={{ '--nstm-i': i }}>
                    <span className="nstm-ic nstm-ic--check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5.5 5.5L20 6" /></svg>
                    </span>
                    {item}
                  </li>
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
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
    const sectionClass = ['section', alt ? 'section-alt' : '', className || ''].filter(Boolean).join(' ')
    return (
      <section className={sectionClass}>
        <div className="container ncols-inner">
          <div className="ncols-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
            <h2>{hl(heading)}</h2>
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
          <h2>{hl(heading)}</h2>
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
        {title && <h2 className="section-title">{hl(title)}</h2>}
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
          {title && <h2 className="section-title">{hl(title)}</h2>}
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
        {title && <h2 className="section-title">{hl(title)}</h2>}
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
          {title && <h2>{hl(title)}</h2>}
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
          {title && <h2 className="section-title">{hl(title)}</h2>}
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

export function Testimonials({ title, subtitle, items, alt, eyebrow = 'Experience Their Journey' }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(1)
  const [paused, setPaused] = useState(false)
  const last = Math.max(0, items.length - perView)
  const pages = last + 1

  // One card in view on mobile, two on desktop — read the same breakpoint the CSS uses.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 720px)')
    const apply = () => setPerView(mq.matches ? 2 : 1)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    setIndex((i) => Math.min(i, last))
  }, [last])

  const metrics = () => {
    const el = trackRef.current
    if (!el || el.children.length === 0) return null
    const first = el.children[0].getBoundingClientRect()
    const second = el.children[1]?.getBoundingClientRect()
    const pitch = second ? second.left - first.left : first.width
    if (pitch <= 0) return null
    return { pitch }
  }

  const go = (to) => {
    const el = trackRef.current
    const m = metrics()
    if (!el || !m) return
    const clamped = Math.max(0, Math.min(last, to))
    el.scrollTo({ left: clamped * m.pitch, behavior: 'smooth' })
    setIndex(clamped)
  }

  const sync = () => {
    const el = trackRef.current
    const m = metrics()
    if (!el || !m) return
    setIndex(Math.min(last, Math.round(el.scrollLeft / m.pitch)))
  }

  // Autoplay — restarts on any manual nav, pauses on hover/focus.
  useEffect(() => {
    if (paused || last === 0) return
    const id = setTimeout(() => go(index >= last ? 0 : index + 1), 4000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, last, paused])

  return (
    <section className={alt ? 'section section-alt testimonials-section' : 'section testimonials-section'}>
      <div className="container testi-layout">
        <div className="testi-head">
          {eyebrow && <span className="section-kicker section-kicker--left">{eyebrow}</span>}
          {title && <h2 className="section-title section-title--left">{hl(title)}</h2>}
          {subtitle && <p className="testi-sub">{subtitle}</p>}

          <div className="testi-controls">
            <button
              type="button"
              className="testi-arrow"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <span className="testi-rail">
              <span className="testi-rail-fill" style={{ width: `${((index + 1) / pages) * 100}%` }} />
            </span>
            <button
              type="button"
              className="testi-arrow"
              onClick={() => go(index + 1)}
              disabled={index >= pages - 1}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="testi-viewport">
          <span className="testi-glyph" aria-hidden="true">&rdquo;</span>
          <div
            ref={trackRef}
            className="testi-track"
            onScroll={sync}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {items.map((t, idx) => (
              <figure className="testi-card" key={`${t.name}-${idx}`}>
                <div className="testi-card-body">
                  <blockquote className="testi-quote">{t.quote}</blockquote>
                  <div className="testi-stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" /></svg>
                    ))}
                  </div>
                  <span className="testi-tail" aria-hidden="true" />
                </div>
                <figcaption className="testi-author">
                  <span className={`testi-avatar ${AVATAR_TINTS[idx % AVATAR_TINTS.length]}`}>
                    {initialsOf(t.name)}
                  </span>
                  <span className="testi-author-meta">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQ({ title, subtitle, items, alt, eyebrow = 'Answers To Your Questions' }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="faq-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{hl(title)}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="faq-layout">
          <aside className="faq-aside">
            <span className="faq-aside-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 8.5a4.5 4.5 0 0 1 9 0c0 3-4.5 3-4.5 6" />
                <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
                <path d="M20 12a8 8 0 1 1-3.2-6.4" opacity="0.35" />
              </svg>
            </span>
            <div className="faq-aside-body">
              <p className="faq-aside-title">Still have questions about SMSLocal?</p>
              <p className="faq-aside-sub">Our support team responds within minutes — every day of the week.</p>
              <Link to="/contact-us/" className="faq-aside-btn">Contact Us</Link>
            </div>
          </aside>

          <div className="faq-list">
            {items.map((item, idx) => {
              const open = openIndex === idx
              return (
                <div className={open ? 'faq-item open' : 'faq-item'} key={item.q}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenIndex(open ? -1 : idx)}
                  >
                    {item.q}
                    <span className="faq-caret" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer-wrap">
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CTABanner({ title, subtitle, cta, secondaryCta, eyebrow = 'Get Started' }) {
  return (
    <section className="cta-night">
      <span className="cta-night-glow" aria-hidden="true" />
      <div className="container cta-night-inner">
        {eyebrow && (
          <span className="cta-night-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 5.8L20 9l-4.9 3.6L16.8 19 12 15.4 7.2 19l1.7-6.4L4 9l6.1-1.2z" /></svg>
            {eyebrow}
          </span>
        )}
        <h2 className="cta-night-title">{title}</h2>
        {subtitle && <p className="cta-night-sub">{subtitle}</p>}
        <div className="cta-night-actions">
          <Link to={cta.href} className="cta-night-primary">
            {cta.label}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          {secondaryCta && (
            <Link to={secondaryCta.href} className="cta-night-ghost">{secondaryCta.label}</Link>
          )}
        </div>
      </div>
    </section>
  )
}

export function PricingTable({ title, subtitle, plans }) {
  return (
    <section className="section">
      <div className="container">
        {title && <h2 className="section-title">{hl(title)}</h2>}
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
              <Link to={plan.href || '/contact-us'} className="btn btn-primary full-width">{plan.cta || 'Choose Plan'}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
