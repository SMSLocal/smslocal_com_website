import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './LineSections.css'

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* =====================================================================
   Box-free sections for the LINE Business Messaging page. Distinct motif
   set from MessengerSections (no reused layout), teal-forward accent.
   ===================================================================== */

const IconTick = () => (
  <svg className="ln-i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l4 4L19 6" />
  </svg>
)
const IconX = () => (
  <svg className="ln-i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
const IconCaret = () => (
  <svg className="ln-faq-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}
function gradTitle(title) {
  if (typeof title !== 'string') return title
  const words = title.trim().split(' ')
  const last = words.pop()
  return (<>{words.join(' ')} <span className="ln-grad">{last}</span></>)
}

/* 1 · Opportunity — copy + capability usage meters -------------------- */
export function OpportunitySplit({ eyebrow, heading, paragraphs, metersCaption, meters }) {
  return (
    <section className="section">
      <div className="container ln-opp">
        <div className="ln-opp-copy">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2">{heading}</h2>
          {paragraphs.map((p, i) => (
            <p className="ln-lead" key={i}>{p}</p>
          ))}
        </div>
        <div className="ln-opp-meters">
          <span className="ln-meters-cap">{metersCaption}</span>
          {meters.map((m) => (
            <div className={`ln-meter${m.pct <= 20 ? ' ln-meter--low' : ''}`} key={m.name}>
              <div className="ln-meter-top">
                <span className="ln-meter-name">{m.name}</span>
                <span className="ln-meter-pct">{m.pct}%</span>
              </div>
              <span className="ln-meter-track">
                <span className="ln-meter-fill" style={{ width: `${m.pct}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 2 · Capabilities — one LINE chat screen that cycles through each
   capability live (flex card, rich menu, coupon, two-way reply), with a
   caption below. Not an alternating row list, a track, or a VS-split —
   this page already uses those for other sections. */

function FlexCardDemo() {
  return (
    <div className="ln-demo-bubble ln-demo-flex">
      <span className="ln-demo-flex-img" aria-hidden="true" />
      <strong>Weekend Flash Sale</strong>
      <span className="ln-demo-flex-btn">Shop now</span>
    </div>
  )
}

function RichMenuDemo() {
  const ITEMS = ['Shop', 'Orders', 'Rewards', 'Support']
  return (
    <div className="ln-demo-menu">
      {ITEMS.map((t) => (
        <span key={t} className="ln-demo-menu-item">{t}</span>
      ))}
    </div>
  )
}

function CouponDemo() {
  return (
    <div className="ln-demo-bubble ln-demo-coupon">
      🎟 20% OFF coupon added
      <span className="ln-demo-coupon-pts">+50 points</span>
    </div>
  )
}

function ChatDemo() {
  return (
    <div className="ln-demo-chat">
      <span className="ln-demo-msg user">Is this still in stock?</span>
      <span className="ln-demo-msg bot">Yes! 12 left — want me to hold one?</span>
    </div>
  )
}

const DEMOS = [FlexCardDemo, RichMenuDemo, CouponDemo, ChatDemo]

export function CapabilitySpotlight({ eyebrow, title, subtitle, items, alt }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 2400)
    return () => clearInterval(id)
  }, [items.length])

  const Demo = DEMOS[active % DEMOS.length]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
          {subtitle && <p className="ln-head-sub">{subtitle}</p>}
        </div>

        <div className="ln-demo-stage">
          <div className="ln-demo-phone">
            <span className="ln-demo-notch" aria-hidden="true" />
            <div className="ln-demo-screen">
              <div className="ln-demo-status">
                <span>9:41</span>
                <span className="ln-demo-status-icons">••• 📶 🔋</span>
              </div>
              <div className="ln-demo-header">
                <span className="ln-demo-avatar">N</span>
                <span className="ln-demo-header-text">
                  <strong>Northside Shop</strong>
                  <span className="ln-demo-online"><i /> Online</span>
                </span>
              </div>
              <div className="ln-demo-thread">
                <span className="ln-demo-msg bot lead">Hi! Thanks for messaging us 👋 How can we help today?</span>
                <div key={active} className="ln-demo-current">
                  <Demo />
                </div>
              </div>
            </div>
          </div>

          <div className="ln-demo-caption" key={`c-${active}`}>
            <div className="ln-demo-dots">
              {items.map((it, i) => (
                <button
                  type="button"
                  key={it.title}
                  className={i === active ? 'active' : ''}
                  onClick={() => setActive(i)}
                  aria-label={it.title}
                />
              ))}
            </div>
            <h3 className="ln-cap-title">{items[active].title}</h3>
            <p className="ln-cap-desc">{items[active].desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3 · Steps — horizontal progress tracker ----------------------------- */
export function StepTracker({ eyebrow, title, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
        </div>
        <div className="ln-track">
          {steps.map((s, i) => (
            <div className="ln-step" key={s.title}>
              <span className="ln-step-dot">{i + 1}</span>
              <h3 className="ln-step-title">{s.title}</h3>
              <p className="ln-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 4 · Compare — two lists split by a VS divider ----------------------- */
export function CompareVS({ eyebrow, title, subtitle, leftLabel, rightLabel, rows, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
          {subtitle && <p className="ln-head-sub">{subtitle}</p>}
        </div>
        <div className="ln-vs">
          <div className="ln-vs-col">
            <span className="ln-vs-label">{leftLabel}</span>
            <ul className="ln-vs-list">
              {rows.map((r) => (
                <li className="ln-vs-item" key={r.feature}>
                  <IconX />
                  <span>
                    <span className="ln-vs-feat">{r.feature}</span>
                    <span className="ln-vs-val">{r.left}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ln-vs-mid" aria-hidden="true">
            <span className="ln-vs-line" />
            <span className="ln-vs-badge">VS</span>
            <span className="ln-vs-line" />
          </div>
          <div className="ln-vs-col ln-vs-col--accent">
            <span className="ln-vs-label">{rightLabel}</span>
            <ul className="ln-vs-list">
              {rows.map((r) => (
                <li className="ln-vs-item" key={r.feature}>
                  <IconTick />
                  <span>
                    <span className="ln-vs-feat">{r.feature}</span>
                    <span className="ln-vs-val">{r.right}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 5 · FAQ — centred single-column accordion --------------------------- */
export function FaqCentered({ eyebrow, title, items, alt }) {
  const [open, setOpen] = useState(0)
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container ln-faq">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
        </div>
        <ul className="ln-faq-list">
          {items.map((it, idx) => (
            <li className={open === idx ? 'ln-faq-item is-open' : 'ln-faq-item'} key={it.q}>
              <button type="button" className="ln-faq-q" onClick={() => setOpen(open === idx ? -1 : idx)}>
                <span>{it.q}</span>
                <IconCaret />
              </button>
              <div className="ln-faq-a-wrap">
                <div className="ln-faq-a-inner"><p>{it.a}</p></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 6 · Testimonials — three hairline quotes ---------------------------- */
export function QuoteColumns({ eyebrow, title, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
        </div>
        <div className="ln-quotes-grid">
          {items.map((t) => (
            <figure className="ln-quote" key={t.name}>
              <span className="ln-quote-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="ln-quote-text">{t.quote}</blockquote>
              <figcaption className="ln-quote-author">
                <span className="ln-quote-avatar">{initials(t.name)}</span>
                <span className="ln-quote-meta">
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

/* 7 · CTA — split band ------------------------------------------------ */
export function CtaSplit({ title, subtitle, cta, secondaryCta }) {
  return (
    <section className="ln-cta">
      <div className="container ln-cta-inner">
        <div>
          <h2 className="ln-cta-title">{gradTitle(title)}</h2>
          <p className="ln-cta-sub">{subtitle}</p>
        </div>
        <div className="ln-cta-actions">
          <Link to={cta.href} className="btn btn-primary">{cta.label}</Link>
          {secondaryCta && (
            <Link to={secondaryCta.href} className="ln-cta-secondary">{secondaryCta.label} →</Link>
          )}
        </div>
      </div>
    </section>
  )
}
