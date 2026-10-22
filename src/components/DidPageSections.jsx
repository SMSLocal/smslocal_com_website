import { useEffect, useRef, useState } from 'react'
import { IconCheck } from './icons.jsx'
import { useInView, useReducedMotion } from './cpaas/useMotion.js'
import './DidPageSections.css'

/**
 * Sections for the Virtual Numbers page, each with its own layout: a
 * line-versus-number split, number-type tabs, a bento of capabilities, a
 * sticky number that builds as the steps advance, a voice/SMS routing picker,
 * a port-in before/after and expanding reason panels. The call to action and
 * FAQ stay as the site already has them. Classes: `dn-`. Numbers shown are
 * fictional and labelled illustrative.
 */

function Head({ eyebrow, title, subtitle }) {
  return (
    <header className="dn-head">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ═════ 1 · A line versus a number ═════ */

export function DidLineVsNumber({ eyebrow, title, text }) {
  return (
    <section className="dn-vs">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={text} />
        <div className="dn-vs-grid">
          <div className="dn-vs-card old">
            <h3>A phone line</h3>
            <svg viewBox="0 0 240 90" aria-hidden="true">
              <rect x="10" y="38" width="64" height="38" rx="8" fill="#e2e8f0" />
              <rect x="22" y="26" width="40" height="14" rx="6" fill="#cbd5e1" />
              <path d="M74 58 C110 58 110 20 150 20 S 190 58 226 58" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="228" cy="58" r="6" fill="#94a3b8" />
            </svg>
            <ul>
              <li>Tied to one desk</li>
              <li>Physical connection to install</li>
              <li>Scaling means ordering hardware</li>
            </ul>
          </div>
          <div className="dn-vs-arrow" aria-hidden="true"><span /></div>
          <div className="dn-vs-card new">
            <h3>A virtual number</h3>
            <div className="dn-vs-hub" aria-hidden="true">
              <b>+1 415 555 0182</b>
              <span style={{ '--a': '-35deg' }}>Team</span>
              <span style={{ '--a': '0deg' }}>App</span>
              <span style={{ '--a': '35deg' }}>CRM</span>
            </div>
            <ul>
              <li>Provisioned online</li>
              <li>Routed anywhere you choose</li>
              <li>Scaled to thousands on demand</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════ 2 · Number types ═════ */

const TYPES = [
  { key: 'Local', ex: '+1 415 555 0182', text: 'Tied to a city or region, so customers see a number that feels close to home. Good for local presence in every market you serve.' },
  { key: 'National', ex: '+44 20 7946 0123', text: 'Works nationwide in a country, not just one area. A single recognisable number for the whole market.' },
  { key: 'Toll-free', ex: '+91 1800 555 0142', text: 'Free for the caller. The usual choice for support lines and sales enquiries you want people to feel safe using.' },
  { key: 'Mobile', ex: '+49 151 5550 1234', text: 'A mobile-range number, where available, for messaging and for markets where people expect to text a mobile.' },
]

export function DidTypes({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)
  const t = TYPES[i]
  return (
    <section className="dn-types">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="dn-types-box">
          <div role="tablist" aria-label="Number types" className="dn-types-tabs">
            {TYPES.map((x, k) => (
              <button key={x.key} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{x.key}</button>
            ))}
          </div>
          <div className="dn-types-body" key={t.key}>
            <div className="dn-types-num" aria-hidden="true">
              <span>{t.ex}</span>
              <em>Illustrative</em>
            </div>
            <p>{t.text}</p>
            <small>Availability and requirements differ by country.</small>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════ 3 · Capabilities bento ═════ */

export function DidBento({ eyebrow, title, subtitle, items }) {
  return (
    <section className="dn-bento">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="dn-bento-grid">
          {items.map((c, k) => (
            <article key={c.title} className={`dn-cell c${k + 1}`}>
              <span className="dn-ico">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <ul>{c.specs.map((s) => <li key={s}><IconCheck />{s}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════ 4 · Sticky number that builds ═════ */

export function DidBuild({ eyebrow, title, subtitle, steps }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const reduced = useReducedMotion()
  const [a, setA] = useState(0)

  useEffect(() => {
    if (!seen || reduced) return undefined
    const t = setInterval(() => setA((v) => (v + 1) % steps.length), 2600)
    return () => clearInterval(t)
  }, [seen, reduced, steps.length])

  const cur = reduced ? steps.length - 1 : a
  return (
    <section className="dn-build" ref={ref}>
      <div className="container dn-build-grid">
        <div className="dn-build-left">
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="dn-build-num" aria-hidden="true">
            <span key={cur}>{steps[cur].frag}</span>
            <i />
          </div>
          <small>Illustrative number</small>
        </div>
        <ol className="dn-build-steps">
          {steps.map((s, k) => (
            <li key={s.title} className={k === cur ? 'on' : k < cur ? 'done' : ''}>
              <button type="button" onClick={() => setA(k)}>
                <span className="n">{k < cur ? <IconCheck /> : k + 1}</span>
                <span><b>{s.title}</b><em>{s.desc}</em></span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ═════ 5 · Routing picker ═════ */

const DEST = ['Your team', 'Your apps', 'A webhook', 'Your CRM']

export function DidRouting({ eyebrow, title, subtitle }) {
  const [kind, setKind] = useState('Voice')
  const [to, setTo] = useState(0)
  return (
    <section className="dn-route">
      <div className="container dn-route-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="dn-seg" role="group" aria-label="Inbound type">
            {['Voice', 'SMS'].map((k) => (
              <button key={k} className={kind === k ? 'on' : ''} onClick={() => setKind(k)}>{k}</button>
            ))}
          </div>
        </div>
        <div className="dn-route-box" aria-label={`Inbound ${kind} routed to ${DEST[to]} (illustrative)`}>
          <div className="dn-route-src"><b>+1 415 555 0182</b><span>Inbound {kind}</span></div>
          <ul>
            {DEST.map((d, k) => (
              <li key={d} className={k === to ? 'on' : ''}>
                <button onClick={() => setTo(k)}><span className="line"><i key={`${kind}${to}`} /></span>{d}</button>
              </li>
            ))}
          </ul>
          <em>Illustrative · per-number rules</em>
        </div>
      </div>
    </section>
  )
}

/* ═════ 6 · Porting before / after ═════ */

export function DidPort({ eyebrow, title, subtitle }) {
  const [moved, setMoved] = useState(false)
  return (
    <section className="dn-port">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="dn-port-stage">
          <div className={`dn-port-side${moved ? '' : ' has'}`}><span>Current provider</span></div>
          <div className="dn-port-mid">
            <div className={`dn-port-chip${moved ? ' moved' : ''}`}><b>+1 415 555 0182</b><i /><em>Live</em></div>
          </div>
          <div className={`dn-port-side${moved ? ' has' : ''}`}><span>SMSLocal</span></div>
        </div>
        <button className="dn-port-btn" onClick={() => setMoved((m) => !m)}>{moved ? 'Reset' : 'Port the number'}</button>
        <p className="dn-port-note">Same number, no break in service. <em>Illustrative</em></p>
      </div>
    </section>
  )
}

/* ═════ 7 · Expanding reason panels ═════ */

export function DidPanels({ eyebrow, title, subtitle, items }) {
  const [on, setOn] = useState(0)
  return (
    <section className="dn-panels">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="dn-panels-row">
          {items.map((it, k) => (
            <button key={it.title} className={`dn-panel${k === on ? ' on' : ''}`} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} aria-expanded={k === on}>
              <span className="dn-ico">{it.icon}</span>
              <b>{it.title}</b>
              <p>{it.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
