import { Fragment, useEffect, useState } from 'react'
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

const WHY_POINTS = [
  'No developer needed — built from templates',
  'Works the same on iOS, Android and desktop LINE',
  'Every tap and reply logged in your shared inbox',
]

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
        <div className="ln-head ln-head--tight">
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

          <div className="ln-demo-caption">
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
            <div key={`c-${active}`} className="ln-demo-caption-text">
              <h3 className="ln-cap-title">{items[active].title}</h3>
              <p className="ln-cap-desc">{items[active].desc}</p>
            </div>

            <ul className="ln-cap-why">
              {WHY_POINTS.map((p) => (
                <li key={p}><IconTick />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3 · Steps — real code, typed out character by character ------------- */
function fnNameFor(title) {
  const words = title.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean)
  return words.map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1))).join('')
}
function codeFor(step) {
  return `${fnNameFor(step.title)}()\n  // ${step.desc}`
}

export function StepTracker({ eyebrow, title, steps, alt }) {
  const [display, setDisplay] = useState(() => steps.map(() => ''))
  const [done, setDone] = useState(() => steps.map(() => false))

  useEffect(() => {
    if (REDUCED) {
      setDisplay(steps.map((s) => codeFor(s)))
      setDone(steps.map(() => true))
      return
    }

    let cancelled = false
    let timeoutId
    let stepIdx = 0
    let charIdx = 0

    const tick = () => {
      if (cancelled) return
      const text = codeFor(steps[stepIdx])
      charIdx += 1
      const i = stepIdx
      setDisplay((d) => {
        const next = [...d]
        next[i] = text.slice(0, charIdx)
        return next
      })
      if (charIdx >= text.length) {
        setDone((d) => {
          const next = [...d]
          next[i] = true
          return next
        })
        timeoutId = setTimeout(() => {
          if (cancelled) return
          stepIdx = (stepIdx + 1) % steps.length
          charIdx = 0
          if (stepIdx === 0) {
            setDisplay(steps.map(() => ''))
            setDone(steps.map(() => false))
          }
          timeoutId = setTimeout(tick, 24)
        }, 750)
        return
      }
      timeoutId = setTimeout(tick, 24)
    }

    timeoutId = setTimeout(tick, 24)
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [steps])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
        </div>

        <div className="ln-steps-layout">
          <div className="ln-console">
            <div className="ln-console-bar">
              <span className="ln-console-dot ln-console-dot--red" />
              <span className="ln-console-dot ln-console-dot--yellow" />
              <span className="ln-console-dot ln-console-dot--green" />
              <span className="ln-console-bar-title">line-setup.js</span>
            </div>
            <div className="ln-console-body">
              {steps.map((s, i) => {
                const [fullCmd = '', fullComment = ''] = codeFor(s).split('\n')
                const [cmdLine = '', commentLine = ''] = (display[i] || '').split('\n')
                const started = display[i] !== undefined && display[i].length > 0
                const isTyping = started && !done[i]
                const typingOnCmd = isTyping && !commentLine
                return (
                  <div className="ln-console-line" key={s.title}>
                    <span className="ln-console-prompt">{i + 1}</span>
                    <div className="ln-console-content">
                      <div className="ln-console-stack">
                        <p className="ln-console-cmd ln-console-ghost" aria-hidden="true">{fullCmd}</p>
                        <p className="ln-console-cmd">
                          {cmdLine}
                          {typingOnCmd && <span className="ln-console-cursor" aria-hidden="true" />}
                        </p>
                      </div>
                      <div className="ln-console-stack">
                        <p className="ln-console-out ln-console-ghost" aria-hidden="true">{fullComment}</p>
                        <p className="ln-console-out">
                          {commentLine}
                          {isTyping && !typingOnCmd && <span className="ln-console-cursor" aria-hidden="true" />}
                        </p>
                      </div>
                    </div>
                    <span className={`ln-console-done${done[i] ? '' : ' ln-console-done--hidden'}`}>✓ done</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="ln-steps-side">
            <span className="ln-steps-side-stat">&lt; 1 day</span>
            <span className="ln-steps-side-stat-lbl">average time from signup to a live Official Account</span>
            <ul className="ln-steps-side-list">
              <li><IconTick />No code — every step is a template or a click</li>
              <li><IconTick />Your rich menu and flex messages carry over as you grow</li>
              <li><IconTick />Support is with you for the whole setup, not just the sale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 4 · Compare — a single spec-table grid, clickable rows reveal "why" -- */
export function CompareVS({ eyebrow, title, subtitle, leftLabel, rightLabel, rows, alt }) {
  const [openIndex, setOpenIndex] = useState(null)
  const [explored, setExplored] = useState(() => new Set())

  const toggleRow = (i) => {
    setOpenIndex((cur) => (cur === i ? null : i))
    setExplored((cur) => {
      const next = new Set(cur)
      next.add(i)
      return next
    })
  }

  const pct = Math.round((explored.size / rows.length) * 100)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ln-head">
          {eyebrow && <span className="ln-kicker">{eyebrow}</span>}
          <h2 className="ln-h2 ln-head-title">{title}</h2>
          {subtitle && <p className="ln-head-sub">{subtitle}</p>}
        </div>

        <div className="ln-cmp-progress">
          <span className="ln-cmp-progress-label">
            {explored.size === 0 ? 'Tap a row to see why it matters' : `Explored ${explored.size} of ${rows.length} reasons teams switch`}
          </span>
          <span className="ln-cmp-progress-track">
            <span className="ln-cmp-progress-fill" style={{ width: `${pct}%` }} />
          </span>
        </div>

        <div className="ln-cmp">
          <span className="ln-cmp-corner" />
          <span className="ln-cmp-head">{leftLabel}</span>
          <span className="ln-cmp-head ln-cmp-head--accent">{rightLabel}</span>

          {rows.map((r, i) => {
            const isOpen = openIndex === i
            const isLast = i === rows.length - 1
            return (
              <Fragment key={r.feature}>
                <div
                  className={`ln-cmp-feat ln-cmp-feat--clickable${isOpen ? ' is-open' : ''}${explored.has(i) ? ' is-explored' : ''}`}
                  onClick={() => toggleRow(i)}
                >
                  <span className="ln-cmp-caret" aria-hidden="true">›</span>
                  {r.feature}
                </div>
                <div className={`ln-cmp-cell${isOpen ? ' is-open' : ''}`} onClick={() => toggleRow(i)}>
                  <IconX />
                  <span>{r.left}</span>
                </div>
                <div
                  className={`ln-cmp-cell ln-cmp-cell--accent${isOpen ? ' is-open' : ''}${isLast && !isOpen ? ' ln-cmp-cell--last' : ''}`}
                  onClick={() => toggleRow(i)}
                >
                  <IconTick />
                  <span>{r.right}</span>
                </div>
                {isOpen && (
                  <div className={`ln-cmp-why${isLast ? ' ln-cmp-why--last' : ''}`}>
                    {r.why}
                  </div>
                )}
              </Fragment>
            )
          })}
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
