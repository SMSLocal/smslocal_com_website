import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from '../icons.jsx'
import './cpaas-sections.css'

/**
 * A library of deliberately different section layouts for the CPaaS pages.
 * Every export is one distinct design (bento, pipeline, matrix, zig-zag
 * timeline, dark principle band, scroll rail, tabbed code, vertical tabs,
 * status board, before/after, checklist, split showcase), so a page can stack
 * several of them without any two sections looking alike. Classes are
 * prefixed `cx-`.
 */

function Head({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`cx-head cx-head--${align}`}>
      {eyebrow && <span className="section-kicker">{eyebrow}</span>}
      {title && <h2 className="cx-title">{title}</h2>}
      {subtitle && <p className="cx-sub">{subtitle}</p>}
    </div>
  )
}

/* 1 ─ Bento: asymmetric cards of different sizes ───────────────────────── */
export function BentoGrid({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-bento">
          {items.map((it, i) => (
            <article key={it.title} className={`cx-bento-card cx-bento-card--${it.size || 'sm'}${i === 0 ? ' is-accent' : ''}`}>
              <span className="cx-bento-icon">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 2 ─ Pipeline: connected nodes with a travelling pulse ────────────────── */
export function FlowDiagram({ eyebrow, title, subtitle, nodes, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ol className="cx-flow">
          {nodes.map((n, i) => (
            <li key={n.title} className="cx-flow-node" style={{ '--i': i }}>
              <span className="cx-flow-icon">{n.icon}</span>
              <span className="cx-flow-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{n.title}</h3>
              <p>{n.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 3 ─ Matrix: channels against capabilities ────────────────────────────── */
export function ChannelMatrix({ eyebrow, title, subtitle, columns, rows }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-matrix-wrap">
          <table className="cx-matrix">
            <thead>
              <tr>
                <th scope="col" />
                {columns.map((c) => <th scope="col" key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={columns[i]}>
                      {v === true ? <span className="cx-yes"><IconCheck /></span> : v === false ? <span className="cx-no" aria-label="No">–</span> : <span className="cx-text">{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* 4 ─ Zig-zag timeline ─────────────────────────────────────────────────── */
export function TimelineSteps({ eyebrow, title, subtitle, steps }) {
  return (
    <section className="section">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ol className="cx-timeline">
          {steps.map((s, i) => (
            <li key={s.title} className={`cx-tl-item ${i % 2 ? 'is-right' : 'is-left'}`}>
              <span className="cx-tl-dot">{i + 1}</span>
              <div className="cx-tl-card">
                {s.tag && <span className="cx-tl-tag">{s.tag}</span>}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 5 ─ Dark principle band ──────────────────────────────────────────────── */
export function PrincipleBand({ eyebrow, title, items }) {
  return (
    <section className="cx-band">
      <div className="cx-band-glow" aria-hidden="true" />
      <div className="container cx-band-inner">
        <div className="cx-band-head">
          {eyebrow && <span className="cx-band-kicker">{eyebrow}</span>}
          <h2>{title}</h2>
        </div>
        <div className="cx-band-grid">
          {items.map((it, i) => (
            <div key={it.title} className="cx-band-item">
              <span className="cx-band-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 6 ─ Horizontal scroll rail of link cards ─────────────────────────────── */
export function CardRail({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
      </div>
      <div className="cx-rail" tabIndex={0} aria-label={typeof title === 'string' ? title : 'Related pages'}>
        {items.map((it) => (
          <Link key={it.title} to={it.href} className="cx-rail-card">
            <span className="cx-rail-icon">{it.icon}</span>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
            <span className="cx-rail-go">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* 7 ─ Tabbed code with a response terminal ─────────────────────────────── */
function Terminal({ label, lines }) {
  return (
    <div className="cx-term">
      <div className="cx-term-bar">
        <span className="cx-term-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="cx-term-label">{label}</span>
      </div>
      <pre className="cx-term-body"><code>{lines.map((l, i) => (
        <span key={i} className={l.trim().startsWith('#') || l.trim().startsWith('//') ? 'cx-c' : undefined}>{l}{'\n'}</span>
      ))}</code></pre>
    </div>
  )
}

export function CodeTabs({ eyebrow, title, subtitle, tabs, response, alt }) {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-codetabs">
          <div className="cx-codetabs-main">
            <div className="cx-tabs" role="tablist">
              {tabs.map((t, i) => (
                <button key={t.label} role="tab" aria-selected={i === active} className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} type="button">{t.label}</button>
              ))}
            </div>
            <Terminal label={tab.file} lines={tab.lines} />
          </div>
          <Terminal label={response.label} lines={response.lines} />
        </div>
      </div>
    </section>
  )
}

/* 8 ─ Vertical tabs with a detail panel ────────────────────────────────── */
export function AccordionDeepDive({ eyebrow, title, subtitle, items }) {
  const [active, setActive] = useState(0)
  const cur = items[active]
  return (
    <section className="section">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-deep">
          <div className="cx-deep-list" role="tablist" aria-orientation="vertical">
            {items.map((it, i) => (
              <button key={it.label} role="tab" aria-selected={i === active} type="button" className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                <span className="cx-deep-icon">{it.icon}</span>
                <span>{it.label}</span>
              </button>
            ))}
          </div>
          <div className="cx-deep-panel" role="tabpanel" key={cur.label}>
            <h3>{cur.title}</h3>
            <p>{cur.desc}</p>
            <ul>
              {cur.points.map((p) => <li key={p}><IconCheck />{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 9 ─ Status board: a mock delivery report next to copy ────────────────── */
export function StatusBoard({ eyebrow, title, subtitle, caption, columns, rows, points, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container cx-board-wrap">
        <div className="cx-board-copy">
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
          <ul className="cx-points">
            {points.map((p) => <li key={p.title}><strong>{p.title}</strong><span>{p.desc}</span></li>)}
          </ul>
        </div>
        <div className="cx-board" role="table" aria-label={caption}>
          <div className="cx-board-bar"><span className="cx-board-live" />{caption}</div>
          <div className="cx-board-row cx-board-head" role="row">{columns.map((c) => <span key={c} role="columnheader">{c}</span>)}</div>
          {rows.map((r) => (
            <div className="cx-board-row" role="row" key={r.id}>
              <span className="cx-mono" role="cell">{r.id}</span>
              <span role="cell">{r.to}</span>
              <span role="cell"><b className={`cx-pill cx-pill--${r.tone}`}>{r.status}</b></span>
              <span className="cx-muted" role="cell">{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 10 ─ Before / after ──────────────────────────────────────────────────── */
export function BeforeAfter({ eyebrow, title, subtitle, beforeLabel, beforeItems, afterLabel, afterItems }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-ba">
          <div className="cx-ba-card cx-ba-before">
            <span className="cx-ba-label">{beforeLabel}</span>
            <ul>{beforeItems.map((t) => <li key={t}><i aria-hidden="true">×</i>{t}</li>)}</ul>
          </div>
          <span className="cx-ba-vs" aria-hidden="true">vs</span>
          <div className="cx-ba-card cx-ba-after">
            <span className="cx-ba-label">{afterLabel}</span>
            <ul>{afterItems.map((t) => <li key={t}><IconCheck />{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 11 ─ Grouped checklist ───────────────────────────────────────────────── */
export function Checklist({ eyebrow, title, subtitle, groups }) {
  return (
    <section className="section">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="cx-check">
          {groups.map((g) => (
            <div key={g.title} className="cx-check-group">
              <h3>{g.title}</h3>
              <ul>{g.items.map((t) => <li key={t}><IconCheck />{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 12 ─ Split showcase: a visual panel beside numbered points ───────────── */
export function SplitShowcase({ eyebrow, title, subtitle, points, visual, reverse, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className={`container cx-split${reverse ? ' is-reverse' : ''}`}>
        <div className="cx-split-visual">{visual}</div>
        <div className="cx-split-copy">
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
          <ol className="cx-split-points">
            {points.map((p, i) => (
              <li key={p.title}>
                <span>{i + 1}</span>
                <div><strong>{p.title}</strong><p>{p.desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
