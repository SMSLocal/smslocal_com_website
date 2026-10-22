import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from './cpaas/useMotion.js'
import './WhatsappApiSections.css'

/**
 * Sections for the WhatsApp Business API page, each with its own layout: a grid
 * of cards that flip to show what is inside, a fan of three phones that turns
 * to bring each message type forward, and a metro line for the three setup
 * steps. The "official vs unofficial" phones, testimonials, call to action and
 * FAQ stay as the site already has them. Classes: `wx-`.
 */

function Head({ eyebrow, title, subtitle, align }) {
  return (
    <header className={`wx-head${align === 'center' ? ' center' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ═════ 1 · Flip cards ═════ */

export function FeatureFlips({ eyebrow, title, subtitle, items }) {
  const [on, setOn] = useState(-1)
  const toggle = (i) => setOn((v) => (v === i ? -1 : i))
  return (
    <section className="wx-flips">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ul className="wx-fgrid">
          {items.map((f, i) => (
            <li key={f.title}>
              <div
                className={`wx-fcard${on === i ? ' on' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={on === i}
                onClick={() => toggle(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) } }}
              >
                <div className="wx-fin">
                  <div className="wx-face front">
                    <span className="wx-fno">{String(i + 1).padStart(2, '0')}</span>
                    <span className="wx-card-ico">{f.icon}</span>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                    <em>See what is inside →</em>
                  </div>
                  <div className="wx-face back">
                    <strong>{f.title}</strong>
                    <ul>{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    <em>← Back</em>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ═════ 2 · Fan of phones ═════ */

const STAGE_MS = 4800

export function MessageFan({ eyebrow, title, subtitle, items }) {
  const ref = useRef(null)
  const seen = useInView(ref, false)
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!seen || reduced) return undefined
    const t = setTimeout(() => setI((v) => (v + 1) % items.length), STAGE_MS)
    return () => clearTimeout(t)
  }, [i, seen, reduced, items.length])
  const slot = (n) => (n - i + items.length) % items.length // 0 centre, 1 right, 2 left
  return (
    <section className="wx-stage" ref={ref}>
      <div className="container wx-stage-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="wx-types" role="tablist" aria-label="Message types">
            {items.map((it, n) => (
              <button key={it.title} type="button" role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
                <strong>{it.title}</strong>
                <span>{it.desc}</span>
                {n === i && !reduced && seen && <u key={i} style={{ animationDuration: `${STAGE_MS}ms` }} />}
              </button>
            ))}
          </div>
        </div>

        <div className="wx-fan">
          <span className="wx-fan-glow" aria-hidden="true" />
          {items.map((it, n) => (
            <div key={it.title} className={`wx-ph p${slot(n)}`} aria-hidden={slot(n) !== 0} onClick={() => setI(n)}>
              {it.mock}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════ 3 · Metro line ═════ */

const WHO = ['We handle this', 'In your dashboard', 'You are live']

export function MetroSteps({ eyebrow, title, steps }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="wx-metro" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} align="center" />
        <ol className={`wx-line${seen ? ' go' : ''}`}>
          {steps.map((s, i) => (
            <li key={s.title} style={{ '--i': i }}>
              <span className="wx-stop"><b>{i + 1}</b></span>
              <em>{WHO[i] || ''}</em>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
