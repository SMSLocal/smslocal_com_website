import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck, IconSearch, IconPencil, IconPackage } from '../icons.jsx'
import { useInView } from './useMotion.js'
import './lookup-api-sections.css'

/**
 * Sections for the Number Lookup page. Six sections, six layouts: a number
 * shape checker, a list cleaner, a carrier-mix bar, a connected three-step row,
 * a bulk notice and a chain of next steps. The shape checker and list cleaner
 * run real (client-side) checks on format only; carrier data is never faked
 * there. The carrier mix is illustrative. Classes are prefixed `lx-`.
 */

export function Head({ eyebrow, title, subtitle, align }) {
  return (
    <header className={`lx-head${align === 'center' ? ' center' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ───────── format check (no carrier data involved) ───────── */

const CODES = {
  1: 'United States / Canada', 7: 'Russia / Kazakhstan', 20: 'Egypt', 27: 'South Africa', 33: 'France', 34: 'Spain', 39: 'Italy',
  44: 'United Kingdom', 49: 'Germany', 52: 'Mexico', 55: 'Brazil', 61: 'Australia', 62: 'Indonesia', 63: 'Philippines', 65: 'Singapore',
  81: 'Japan', 82: 'South Korea', 86: 'China', 91: 'India', 92: 'Pakistan', 234: 'Nigeria', 254: 'Kenya', 880: 'Bangladesh', 971: 'United Arab Emirates',
}

function inspect(raw) {
  const text = raw.trim()
  if (!text) return { kind: 'empty', ok: false, msg: 'Type a number to check its shape.' }
  if (/[^\d\s()+.-]/.test(text)) return { kind: 'chars', ok: false, msg: 'Use only digits, spaces, dashes and brackets.' }
  if (!text.startsWith('+')) return { kind: 'plus', ok: false, msg: 'Start with + and the country code, for example +44.' }
  const d = text.replace(/\D/g, '')
  const cc = [3, 2, 1].map((n) => d.slice(0, n)).find((c) => CODES[c])
  if (!cc) return { kind: 'country', ok: false, msg: 'That country code is not one we recognise.' }
  const national = d.slice(cc.length)
  const base = { cc, country: CODES[cc], national, e164: `+${d}`, digits: d.length }
  if (d.length > 15) return { ...base, kind: 'long', ok: false, msg: 'Too long. A full number has at most 15 digits.' }
  if (national.length < 6) return { ...base, kind: 'short', ok: false, msg: 'Too short for a full phone number.' }
  if ((cc === '1' || cc === '91') && national.length !== 10) {
    return { ...base, kind: 'length', ok: false, msg: `Numbers in this country normally have 10 digits after +${cc}.` }
  }
  return { ...base, kind: 'ok', ok: true, msg: 'Looks well-formed.' }
}

const group = (s) => s.replace(/(\d{3})(?=\d)/g, '$1 ')

/* ═════ 1 · Shape checker ═════ */

const PRESETS = [
  ['US', '+1 415 555 0123'],
  ['UK', '+44 7911 123456'],
  ['India', '+91 98765 43210'],
  ['No +', '4155550123'],
  ['Short', '+44 7911'],
]

export function ShapeChecker({ eyebrow, title, subtitle, toolHref }) {
  const [value, setValue] = useState(PRESETS[0][1])
  const r = inspect(value)
  return (
    <section className="lx-shape">
      <div className="container lx-shape-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <label htmlFor="lx-num" className="lx-label">Phone number</label>
          <input id="lx-num" className="lx-input" value={value} onChange={(e) => setValue(e.target.value)} inputMode="tel" autoComplete="off" spellCheck="false" />
          <div className="lx-presets" aria-label="Try an example">
            {PRESETS.map(([l, v]) => <button key={l} type="button" className={value === v ? 'on' : ''} onClick={() => setValue(v)}>{l}</button>)}
          </div>
        </div>

        <div className="lx-shape-out" aria-live="polite">
          <div className={`lx-verdict ${r.kind === 'empty' ? 'idle' : r.ok ? 'ok' : 'bad'}`}>
            <span>{r.ok ? <IconCheck /> : r.kind === 'empty' ? <IconSearch /> : '!'}</span>
            <b>{r.msg}</b>
          </div>
          <dl>
            <div><dt>Country</dt><dd>{r.country || '—'}</dd></div>
            <div><dt>Country code</dt><dd>{r.cc ? `+${r.cc}` : '—'}</dd></div>
            <div><dt>National number</dt><dd>{r.national ? group(r.national) : '—'}</dd></div>
            <div><dt>Standard format</dt><dd className="mono">{r.e164 || '—'}</dd></div>
          </dl>
          <p>This checks the shape only. To see the carrier behind a number, use the lookup.</p>
          <Link to={toolHref} className="lx-link">Open the free lookup →</Link>
        </div>
      </div>
    </section>
  )
}

/* ═════ 2 · List cleaner ═════ */

// A sample list as a lookup would describe it. Landlines usually cannot receive
// SMS and invalid numbers never can, so "Clean list" sets those two aside.
// VoIP stays in the list but is flagged to review. Illustrative data.
const LIST = [
  { n: '+44 7911 123456', kind: 'Mobile', note: 'Can receive SMS' },
  { n: '+44 20 7946 0123', kind: 'Landline', note: 'Usually cannot receive SMS' },
  { n: '+91 98765 43210', kind: 'Mobile', note: 'Can receive SMS' },
  { n: '+91 98765', kind: 'Invalid', note: 'Not a valid number' },
  { n: '+1 415 555 0123', kind: 'VoIP', note: 'Runs over the internet. Review it.' },
  { n: '+61 412 345 678', kind: 'Mobile', note: 'Can receive SMS' },
  { n: '+999 123456789', kind: 'Invalid', note: 'Not a valid number' },
  { n: '+49 30 123456', kind: 'Landline', note: 'Usually cannot receive SMS' },
]
const REMOVE = new Set(['Landline', 'Invalid'])

export function ListCleaner({ eyebrow, title, subtitle }) {
  const [clean, setClean] = useState(false)
  const out = LIST.filter((x) => REMOVE.has(x.kind)).length
  return (
    <section className="lx-clean">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className="lx-list">
          <div className="lx-list-top">
            <span><b>{LIST.length - out}</b> can stay <i>·</i> <b className="bad">{out}</b> to set aside <em>Illustrative</em></span>
            <button type="button" onClick={() => setClean((c) => !c)}>{clean ? 'Undo' : 'Clean list'}</button>
          </div>
          <ul>
            {LIST.map((x) => {
              const gone = clean && REMOVE.has(x.kind)
              return (
                <li key={x.n} className={`${x.kind.toLowerCase()}${gone ? ' gone' : ''}`}>
                  <code>{x.n}</code>
                  <span>{x.note}</span>
                  <i>{x.kind}</i>
                </li>
              )
            })}
          </ul>
          <p aria-live="polite">{clean ? `${out} numbers set aside, so you do not pay to message numbers that cannot receive a text.` : 'Press “Clean list” to set landlines and invalid numbers aside.'}</p>
        </div>
      </div>
    </section>
  )
}

/* ═════ 3 · Carrier mix ═════ */

const MIX = [
  { name: 'Network A', pct: 38, c: '#4f5bd5' },
  { name: 'Network B', pct: 27, c: '#ec4899' },
  { name: 'Network C', pct: 21, c: '#0f766e' },
  { name: 'Network D', pct: 9, c: '#d97706' },
  { name: 'Other', pct: 5, c: '#94a3b8' },
]

export function NetworkMix({ eyebrow, title, subtitle }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const [on, setOn] = useState(0)
  const cur = MIX[on]
  return (
    <section className="lx-mix" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="lx-mix-card">
          <div className="lx-mix-top"><span>Example audience of 10,000 numbers</span><em>Illustrative</em></div>
          <div className="lx-bar" role="group" aria-label="Share of numbers by network">
            {MIX.map((m, i) => (
              <button key={m.name} type="button" className={i === on ? 'on' : ''} style={{ '--c': m.c, flexGrow: seen ? m.pct : 0.0001 }} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} aria-label={`${m.name}, ${m.pct} percent`}>
                <span>{m.pct}%</span>
              </button>
            ))}
          </div>
          <p className="lx-mix-read" aria-live="polite"><i style={{ background: cur.c }} /><b>{cur.name}</b> carries {cur.pct}% of this list, about {(cur.pct * 100).toLocaleString('en-US')} numbers.</p>
          <ul className="lx-legend">
            {MIX.map((m, i) => (
              <li key={m.name} className={i === on ? 'on' : ''}>
                <button type="button" onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)}>
                  <i style={{ background: m.c }} /><span>{m.name}</span><b>{m.pct}%</b>
                </button>
              </li>
            ))}
          </ul>
          <p className="lx-mix-note">
            <span aria-hidden="true">i</span>
            The network shown is the one a number range was first assigned to. If the owner has since moved to another operator, the current carrier can differ. For US and Canada numbers the carrier is not shown.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═════ 4 · Three connected steps ═════ */

const STEP_ICONS = [<IconPencil key="p" />, <IconSearch key="s" />, <IconPackage key="k" />]

export function TrioSteps({ eyebrow, title, steps }) {
  return (
    <section className="lx-trio">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} align="center" />
        <ol className="lx-trio-row">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="lx-trio-ico">{STEP_ICONS[i]}<b>{i + 1}</b></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ═════ 5 · Bulk notice ═════ */

export function BulkBand({ title, text, primary, secondary }) {
  return (
    <section className="lx-bulk">
      <div className="container">
        <div className="lx-bulk-box">
          <span className="lx-bulk-ico"><IconPackage /></span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div>
            <Link to={primary.href} className="btn btn-ghost">{primary.label}</Link>
            <Link to={secondary.href} className="btn btn-primary">{secondary.label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════ 6 · Chain of next steps ═════ */

export function FlowChain({ eyebrow, title, items }) {
  return (
    <section className="lx-chain">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} align="center" />
        <ol className="lx-chain-row">
          {items.map((it, i) => (
            <li key={it.title}>
              <Link to={it.href}>
                <span className="lx-chain-ico">{it.icon}</span>
                <strong>{it.title}</strong>
                <span>{it.desc}</span>
                <em aria-hidden="true">Open →</em>
              </Link>
              {i < items.length - 1 && <span className="lx-chain-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
