import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MessengerSections.css'

/* =====================================================================
   Bespoke, box-free sections for the Facebook Messenger API page.
   Each export is a distinct layout motif — no shared card component,
   no boxed panels.
   ===================================================================== */

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const IconTick = () => (
  <svg className="mx-i mx-i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l4 4L19 6" />
  </svg>
)
const IconX = () => (
  <svg className="mx-i mx-i-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

/* Split a title into leading text + gradient last word. */
function gradTitle(title) {
  if (typeof title !== 'string') return title
  const words = title.trim().split(' ')
  const last = words.pop()
  return (
    <>
      {words.join(' ')} <span className="mx-grad">{last}</span>
    </>
  )
}

/* 1 · Inline metric row ------------------------------------------------ */
export function MetricRow({ items }) {
  return (
    <section className="mx-metrics">
      <div className="container">
        <ul className="mx-metrics-row">
          {items.map((m) => (
            <li className="mx-metric" key={m.word}>
              <span className="mx-metric-ic">{m.icon}</span>
              <span className="mx-metric-val">{m.word}</span>
              <span className="mx-metric-lbl">{m.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 2 · Problem split — copy + timestamped message log ------------------- */
export function ProblemSplit({ eyebrow, heading, paragraphs, logTitle, moments, outcome }) {
  return (
    <section className="section">
      <div className="container mx-prob">
        <div className="mx-prob-head">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2">{heading}</h2>
          {paragraphs.map((p, i) => (
            <p className="mx-lead" key={i}>{p}</p>
          ))}
        </div>

        {/* the questions that piled up overnight, straightening out as the AI
            answers each one in turn */}
        <div className="mx-pile" aria-label={logTitle}>
          <span className="mx-pile-sweep" aria-hidden="true" />

          {moments.map((m, i) => (
            <div className="mx-note" key={m.time} style={{ '--i': i }}>
              <q className="mx-note-q">{m.text}</q>
              <span className="mx-note-meta">
                <b>{m.time}</b>
                <span className="mx-note-state mx-note-state--miss">unanswered</span>
                <span className="mx-note-state mx-note-state--done">answered in 4s</span>
              </span>
            </div>
          ))}

          <p className="mx-pile-out">{outcome}</p>
        </div>
      </div>
    </section>
  )
}

/* 3 · Step flow — ghost numerals -------------------------------------- */
export function StepFlow({ eyebrow, title, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="mx-head">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2 mx-head-title">{title}</h2>
        </div>
        <ol className="mx-steps">
          {steps.map((s, i) => (
            <li className="mx-step" key={s.title}>
              <span className="mx-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mx-step-title">{s.title}</h3>
              <p className="mx-step-desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 4 · Compare ledger --------------------------------------------------- */
export function CompareLedger({ eyebrow, title, subtitle, leftLabel, rightLabel, rows, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="mx-head">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2 mx-head-title">{title}</h2>
          {subtitle && <p className="mx-head-sub">{subtitle}</p>}
        </div>
        <div className="mx-ledger">
          <div className="mx-ledger-head">
            <span className="mx-ledger-feat" />
            <span className="mx-ledger-col">{leftLabel}</span>
            <span className="mx-ledger-col mx-ledger-col--accent">{rightLabel}</span>
          </div>
          {rows.map((r) => (
            <div className="mx-ledger-row" key={r.feature}>
              <span className="mx-ledger-feat">{r.feature}</span>
              <span className="mx-ledger-cell"><IconX />{r.left}</span>
              <span className="mx-ledger-cell mx-ledger-cell--accent"><IconTick />{r.right}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5 · Why list — full-width rows -------------------------------------- */
export function WhyList({ eyebrow, title, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="mx-head">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2 mx-head-title">{title}</h2>
        </div>
        <ul className="mx-why">
          {items.map((it, i) => (
            <li className={`mx-why-row mx-tint-${i % 4}`} key={it.title}>
              <span className="mx-why-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="mx-why-ic mx-ic-tint">{it.icon}</span>
              <div className="mx-why-body">
                <h3 className="mx-why-title">{it.title}</h3>
                <p className="mx-why-desc">{it.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 6 · Ecosystem rail — linked rows ------------------------------------ */
export function EcosystemRail({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="mx-head">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2 mx-head-title">{title}</h2>
          {subtitle && <p className="mx-head-sub">{subtitle}</p>}
        </div>
        <ul className="mx-eco">
          {items.map((it, i) => (
            <li className={`mx-eco-row mx-tint-${i % 4}`} key={it.title}>
              <Link to={it.href} className="mx-eco-link">
                <span className="mx-eco-ic mx-ic-tint">{it.icon}</span>
                <span className="mx-eco-title">{it.title}</span>
                <span className="mx-eco-desc">{it.desc}</span>
                <span className="mx-eco-go"><IconArrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 7 · Quote wall — rotating pull-quote -------------------------------- */
export function QuoteWall({ eyebrow, title, items, alt }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 5200)
    return () => clearInterval(id)
  }, [items.length])

  const t = items[i]

  return (
    <section className={`mx-quote-sec ${alt ? 'section section-alt' : 'section'}`}>
      <div className="container mx-quote">
        {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
        {title && <h2 className="mx-quote-h2">{title}</h2>}
        <span className="mx-quote-mark" aria-hidden="true">&ldquo;</span>
        <blockquote className="mx-quote-text" key={i}>{t.quote}</blockquote>
        <figcaption className="mx-quote-author">
          <span className="mx-quote-avatar">{initials(t.name)}</span>
          <span className="mx-quote-meta">
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </span>
        </figcaption>
        <div className="mx-quote-dots">
          {items.map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={idx === i ? 'is-on' : ''}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* 8 · FAQ rail — sticky heading + hairline accordion ------------------ */
export function FaqRail({ eyebrow, title, items, alt }) {
  const [open, setOpen] = useState(0)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container mx-faq">
        <div className="mx-faq-aside">
          {eyebrow && <span className="mx-kicker">{eyebrow}</span>}
          <h2 className="mx-h2">{title}</h2>
        </div>
        <ul className="mx-faq-list">
          {items.map((it, idx) => (
            <li className={open === idx ? 'mx-faq-item is-open' : 'mx-faq-item'} key={it.q}>
              <button type="button" className="mx-faq-q" onClick={() => setOpen(open === idx ? -1 : idx)}>
                <span>{it.q}</span>
                <span className="mx-faq-sign" aria-hidden="true" />
              </button>
              <div className="mx-faq-a-wrap">
                <div className="mx-faq-a-inner">
                  <p>{it.a}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 9 · CTA — centred on a soft gradient band --------------------------- */
export function CtaCentered({ title, subtitle, cta, secondaryCta }) {
  return (
    <section className="mx-cta">
      <span className="mx-cta-glow" aria-hidden="true" />
      <div className="container mx-cta-inner">
        <h2 className="mx-cta-title">{gradTitle(title)}</h2>
        <p className="mx-cta-sub">{subtitle}</p>
        <div className="mx-cta-actions">
          <Link to={cta.href} className="btn btn-primary">{cta.label}</Link>
          {secondaryCta && (
            <Link to={secondaryCta.href} className="mx-cta-secondary">{secondaryCta.label} →</Link>
          )}
        </div>
      </div>
    </section>
  )
}
