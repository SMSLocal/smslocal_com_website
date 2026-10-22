import { useRef, useState } from 'react'
import { IconPhone, IconGear, IconPlug, IconChart, IconCheck } from './icons.jsx'
import { useInView } from './cpaas/useMotion.js'
import './VoiceApiSections.css'

/**
 * Sections for the Voice page, each with its own layout: a legacy-versus-cloud
 * ledger, an editorial accordion of capabilities, a staircase of four setup
 * steps and a row of ring gauges. The call to action and FAQ stay as the site
 * already has them. Classes: `vs-`.
 */

function Head({ eyebrow, title, subtitle, align }) {
  return (
    <header className={`vs-head${align === 'center' ? ' center' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ═════ 1 · Ledger: legacy against cloud ═════ */

export function VoiceLedger({ eyebrow, title, text, leftLabel, rightLabel, rows }) {
  const [on, setOn] = useState(0)
  return (
    <section className="vs-ledger">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={text} />
        <div className="vs-led" role="table" aria-label="Legacy phone system compared with cloud voice">
          <div className="vs-led-head" role="row">
            <span role="columnheader" />
            <span role="columnheader" className="old">{leftLabel}</span>
            <span role="columnheader" className="new">{rightLabel}</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.topic} role="row" tabIndex={0} className={`vs-led-row${i === on ? ' on' : ''}`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
              <b role="rowheader">{r.topic}</b>
              <span role="cell" className="old"><i aria-hidden="true">✕</i>{r.old}</span>
              <span role="cell" className="new"><i aria-hidden="true"><IconCheck /></i>{r.now}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════ 2 · Editorial accordion of capabilities ═════ */

export function VoiceCaps({ eyebrow, title, subtitle, items }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="vs-caps">
      <div className="container vs-caps-grid">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ul className="vs-acc">
          {items.map((c, i) => {
            const on = open === i
            return (
              <li key={c.key} className={on ? 'on' : ''}>
                <button type="button" aria-expanded={on} aria-controls={`vs-cap-${c.key}`} onClick={() => setOpen(on ? -1 : i)}>
                  <span className="vs-acc-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vs-acc-t">{c.name}</span>
                  <span className="vs-acc-c" aria-hidden="true" />
                </button>
                <div className="vs-acc-p" id={`vs-cap-${c.key}`} role="region">
                  <div>
                    <p>{c.desc}</p>
                    <ul>{c.specs.map((s) => <li key={s}><IconCheck />{s}</li>)}</ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ═════ 3 · Staircase of steps ═════ */

const STAIR_ICONS = [<IconPhone key="p" />, <IconGear key="g" />, <IconPlug key="u" />, <IconChart key="c" />]

export function VoiceStairs({ eyebrow, title, subtitle, steps }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="vs-stairs" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <ol className={`vs-stair${seen ? ' go' : ''}`}>
          {steps.map((s, i) => (
            <li key={s.title} style={{ '--i': i }}>
              <span className="vs-stair-n">{i + 1}</span>
              <span className="vs-stair-ico">{STAIR_ICONS[i]}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ═════ 3b · Call-flow strips: where teams use voice ═════ */

export function VoiceFlows({ eyebrow, title, subtitle, items }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="vs-flows" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ul className={`vs-fl${seen ? ' go' : ''}`}>
          {items.map((f, r) => (
            <li key={f.title} style={{ '--r': r }}>
              <div className="vs-fl-copy">
                <b>{String(r + 1).padStart(2, '0')}</b>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
              <ol className="vs-fl-chain" aria-label={`${f.title}: ${f.steps.join(', then ')}`}>
                {f.steps.map((s, i) => (
                  <li key={s} style={{ '--k': i }}>
                    <span>{s}</span>
                    {i < f.steps.length - 1 && <em aria-hidden="true">→</em>}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ═════ 4 · Ring gauges ═════ */

const RING = 2 * Math.PI * 42

export function VoiceGauges({ eyebrow, title, subtitle, items }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="vs-gauges" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <ul className="vs-g">
          {items.map((g, i) => (
            <li key={g.heading}>
              <div className="vs-ring">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="bg" cx="50" cy="50" r="42" />
                  <circle className="fg" cx="50" cy="50" r="42" strokeDasharray={RING} strokeDashoffset={seen ? RING * (1 - g.fill / 100) : RING} style={{ transitionDelay: `${i * 0.15}s` }} />
                </svg>
                <b>{g.figure}<small>{g.unit}</small></b>
              </div>
              <h3>{g.heading}</h3>
              <p>{g.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
