import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from '../icons.jsx'
import './sms-api-sections.css'

/**
 * Sections for the SMS API page. Every one is built to look and behave unlike
 * the others: a runnable code playground on a dark band, numbered ideas on
 * warm paper, a live delivery log on a colour wash, a part-by-part message
 * counter, a drag-to-compare slider, a checklist with a progress ring, a path
 * of next steps. Classes are prefixed `sx-`.
 * All sample data is illustrative.
 */

/* ───────── shared helpers ───────── */

function useInView(ref, once = true) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect() } else if (!once) setSeen(false)
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once])
  return seen
}

function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setR(mq.matches)
    const on = (e) => setR(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return r
}

const TOKEN = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\$[A-Z_]+)|(\b(?:curl|const|await|import|from|print|console)\b)|(\s-[HdX]\b)/g

/** Tiny syntax highlighter: strings, $VARS, keywords and curl flags. */
function hl(line) {
  const out = []
  let last = 0
  let m
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const cls = m[1] ? 's' : m[2] ? 'v' : m[3] ? 'kw' : 'f'
    out.push(<span key={m.index} className={cls}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

/* ═════════ 1 ─ Playground: dark band, code you can run ═════════ */

export function SendPlayground({ eyebrow, title, subtitle, tabs, response }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const reduced = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [run, setRun] = useState(0)
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  const send = () => {
    if (phase === 'sending') return
    clearTimeout(timer.current)
    setPhase('sending')
    setRun((r) => r + 1)
    timer.current = setTimeout(() => setPhase('done'), reduced ? 0 : 1100)
  }

  useEffect(() => {
    if (seen) send()
    // run once when the section first scrolls into view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen])
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[tab].lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard blocked: nothing to do */ }
  }

  return (
    <section className="sx-play" ref={ref}>
      <div className="container">
        <div className="sx-play-head">
          <span className="sx-play-kicker">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="sx-play-grid">
          <div className="sx-ed">
            <div className="sx-ed-bar">
              <span className="sx-ed-dots" aria-hidden="true"><i /><i /><i /></span>
              <div className="sx-ed-tabs" role="tablist" aria-label="Language">
                {tabs.map((t, i) => (
                  <button key={t.label} type="button" role="tab" aria-selected={i === tab} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{t.label}</button>
                ))}
              </div>
              <button type="button" className="sx-ed-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <pre className="sx-ed-code"><code>
              {tabs[tab].lines.map((l, i) => (
                <span className="sx-ln" key={`${tab}-${i}`}><b aria-hidden="true">{i + 1}</b>{hl(l)}{'\n'}</span>
              ))}
            </code></pre>
            <div className="sx-ed-file">{tabs[tab].file}</div>
          </div>

          <div className="sx-run">
            <div className="sx-run-top"><span>POST</span><code>/external/sms</code></div>
            <button type="button" className={`sx-send ${phase}`} onClick={send} disabled={phase === 'sending'}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              {phase === 'sending' ? 'Sending…' : phase === 'done' ? 'Send again' : 'Send request'}
            </button>
            <div className="sx-bar" aria-hidden="true"><i key={run} className={phase} /></div>

            <div className="sx-resp">
              <div className="sx-resp-head">
                <span>{response.label}</span>
                {phase === 'done' && <em>200 OK</em>}
                {phase === 'done' && <small>38 ms · illustrative</small>}
              </div>
              {phase === 'done' ? (
                <pre key={`r-${run}`}>
                  {response.lines.slice(0, 4).map((l, i) => <span key={i} style={{ '--d': `${i * 0.12}s` }}>{hl(l)}{'\n'}</span>)}
                </pre>
              ) : (
                <p className="sx-resp-wait">{phase === 'sending' ? 'Waiting for the API…' : 'Run the request to see the response.'}</p>
              )}
            </div>

            <div className={`sx-toast${phase === 'done' ? ' on' : ''}`} aria-hidden="true">
              <span className="sx-toast-ico"><IconCheck /></span>
              <div><b>SMSLOCAL</b><p>Your code is 481920.</p></div>
              <small>now</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════ 2 ─ Ideas: warm paper, giant numerals ═════════ */

export function IdeasRow({ eyebrow, title, subtitle, items }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="sx-ideas" ref={ref}>
      <div className="container">
        <header className="sx-ideas-head">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>
        <ol className="sx-ideas-grid">
          {items.map((it, i) => (
            <li key={it.title} className={seen ? 'in' : ''} style={{ '--i': i }}>
              <span className="sx-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="sx-chip">{it.icon}{it.label}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <ul>
                {it.points.map((p) => <li key={p}><IconCheck />{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ═════════ 3 ─ Live log: colour wash, rows stream in ═════════ */

const POOL = ['+1 415 ••• 0123', '+91 98••• 43210', '+44 7••• 123456', '+91 99••• 00012', '+61 4•• ••• 789', '+971 50 ••• 4421', '+65 9••• 1180', '+49 15•• ••• 902', '+55 11 9•• ••• 31', '+27 82 ••• 5507']
const hex = (n) => (0x9f2a7c10 + n).toString(16)
const rel = (at, now) => {
  const s = Math.max(0, Math.floor((now - at) / 1000))
  return s < 2 ? 'just now' : s < 60 ? `${s} s ago` : `${Math.floor(s / 60)} m ago`
}

export function LiveLog({ eyebrow, title, subtitle, points }) {
  const ref = useRef(null)
  const inView = useInView(ref, false)
  const reduced = useReducedMotion()
  const [now, setNow] = useState(() => Date.now())
  const [rows, setRows] = useState(() => {
    const t = Date.now()
    return [
      { id: hex(0), to: POOL[0], status: 'Delivered', at: t - 1000 },
      { id: hex(1), to: POOL[1], status: 'Delivered', at: t - 3000 },
      { id: hex(2), to: POOL[2], status: 'Pending', at: t - 5000 },
      { id: hex(3), to: POOL[3], status: 'Failed', at: t - 9000 },
    ]
  })
  const [filter, setFilter] = useState('All')
  const n = useRef(3)

  useEffect(() => {
    if (!inView || reduced) return undefined
    const tick = setInterval(() => setNow(Date.now()), 1000)
    const feed = setInterval(() => {
      n.current += 1
      const i = n.current
      const r = Math.random()
      const status = r < 0.62 ? 'Delivered' : r < 0.9 ? 'Pending' : 'Failed'
      const row = { id: hex(i), to: POOL[i % POOL.length], status, at: Date.now() }
      setRows((rs) => [row, ...rs].slice(0, 24))
      if (status === 'Pending') {
        setTimeout(() => setRows((rs) => rs.map((x) => (x.id === row.id ? { ...x, status: Math.random() < 0.85 ? 'Delivered' : 'Failed', flash: true } : x))), 1500)
      }
    }, 1700)
    return () => { clearInterval(tick); clearInterval(feed) }
  }, [inView, reduced])

  const count = (s) => rows.filter((r) => r.status === s).length
  const shown = rows.filter((r) => filter === 'All' || r.status === filter).slice(0, 6)
  const tone = { Delivered: 'ok', Pending: 'wait', Failed: 'bad' }

  return (
    <section className="sx-log" ref={ref}>
      <div className="container sx-log-grid">
        <div className="sx-log-copy">
          <span className="sx-log-kicker">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <ol>
            {points.map((p, i) => (
              <li key={p.title}><b>{i + 1}</b><div><strong>{p.title}</strong><span>{p.desc}</span></div></li>
            ))}
          </ol>
        </div>

        <div className="sx-logcard">
          <div className="sx-logcard-top">
            <span><i className="sx-pulse" />Delivery log</span>
            <em>Illustrative</em>
          </div>
          <div className="sx-filters" role="tablist" aria-label="Filter by status">
            {['All', 'Delivered', 'Pending', 'Failed'].map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} className={`${filter === f ? 'on ' : ''}${tone[f] || ''}`} onClick={() => setFilter(f)}>
                {f}<b>{f === 'All' ? rows.length : count(f)}</b>
              </button>
            ))}
          </div>
          <ul className="sx-rows">
            {shown.map((r) => (
              <li key={r.id} className={r.flash ? 'flash' : ''}>
                <code>{r.id}</code>
                <span>{r.to}</span>
                <i className={tone[r.status]}>{r.status}</i>
                <small>{rel(r.at, now)}</small>
              </li>
            ))}
            {shown.length === 0 && <li className="empty">Nothing with that status yet.</li>}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ═════════ 4 ─ Counter: message split into parts ═════════ */

/* GSM 03.38 basic set and extension set; anything else forces Unicode. */
const GSM_BASIC = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà'
const GSM_EXT = '^{}\\[~]|€\f'

function measure(text) {
  let units = 0
  let unicode = false
  for (const ch of text) {
    if (GSM_BASIC.includes(ch)) units += 1
    else if (GSM_EXT.includes(ch)) units += 2
    else { unicode = true; break }
  }
  if (unicode) {
    const len = text.length
    const parts = len === 0 ? 0 : len <= 70 ? 1 : Math.ceil(len / 67)
    return { encoding: 'Unicode', length: len, parts, perPart: parts > 1 ? 67 : 70 }
  }
  const parts = units === 0 ? 0 : units <= 160 ? 1 : Math.ceil(units / 153)
  return { encoding: 'GSM7', length: units, parts, perPart: parts > 1 ? 153 : 160 }
}

const PRESETS = [
  ['OTP', 'Your code is 481920. It expires in 10 minutes.'],
  ['Hindi', 'आपका ओटीपी 481920 है। यह 10 मिनट में समाप्त हो जाएगा।'],
  ['Emoji', 'Your order has shipped 🚚 Track it at sml.in/t4821'],
  ['Long', 'Hi Aarav, thanks for shopping with us! Your order #4821 has shipped and will arrive on Thursday between 10 AM and 2 PM. Track it any time at sml.in/t4821, or reply HELP to reach our support team. Reply STOP to opt out.'],
]

export function PartsCounter({ eyebrow, title, subtitle }) {
  const [text, setText] = useState(PRESETS[0][1])
  const m = measure(text)
  const shownParts = Math.min(m.parts, 6)
  const fill = (i) => {
    if (m.parts <= 1) return m.length / m.perPart
    return i < m.parts - 1 ? 1 : (m.length - m.perPart * (m.parts - 1)) / m.perPart
  }
  return (
    <section className="sx-count">
      <div className="container">
        <header className="sx-count-head">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>

        <div className="sx-count-grid">
          <div className="sx-count-in">
            <div className="sx-presets" aria-label="Try an example">
              {PRESETS.map(([label, t]) => (
                <button key={label} type="button" className={text === t ? 'on' : ''} onClick={() => setText(t)}>{label}</button>
              ))}
            </div>
            <label htmlFor="sx-text">Message text</label>
            <textarea id="sx-text" value={text} onChange={(e) => setText(e.target.value)} rows={7} />
            <div className="sx-count-meta">
              <span className={`sx-enc ${m.encoding === 'Unicode' ? 'uni' : 'gsm'}`}>{m.encoding}</span>
              <span>{m.length} characters</span>
              <span>{m.perPart} per part</span>
            </div>
          </div>

          <div className="sx-count-out">
            <div className="sx-big" aria-live="polite">
              <b key={m.parts}>{m.parts}</b>
              <span>{m.parts === 1 ? 'part' : 'parts'}<small>billed separately</small></span>
            </div>
            <ul className="sx-parts">
              {Array.from({ length: shownParts }, (_, i) => (
                <li key={i} style={{ '--i': i }}>
                  <span>Part {i + 1}</span>
                  <div><i style={{ width: `${Math.max(3, Math.min(100, fill(i) * 100))}%` }} /></div>
                  <em>{Math.round(Math.min(1, fill(i)) * m.perPart)} / {m.perPart}</em>
                </li>
              ))}
              {m.parts > shownParts && <li className="more">+ {m.parts - shownParts} more</li>}
              {m.parts === 0 && <li className="more">Type something to see it counted.</li>}
            </ul>
            <p className="sx-count-note">One part holds 160 characters in GSM7 or 70 in Unicode. One non-GSM character, such as an emoji or a Hindi letter, switches the whole message to Unicode.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════ 5 ─ Compare: drag the divider ═════════ */

function MessyArt() {
  return (
    <svg viewBox="0 0 600 250" role="img" aria-label="A team connected to four separate tools by tangled lines">
      <g className="sx-box"><rect x="14" y="95" width="104" height="60" rx="12" /><text x="66" y="130">Your team</text></g>
      {[['CSV export', 22], ['Spreadsheet', 80], ['Vendor portal', 138], ['Shared inbox', 196]].map(([t, y], i) => (
        <g key={t}>
          <path className="sx-tangle" d={`M118 125 C 190 ${i % 2 ? 40 : 210}, 230 ${y + 20}, 296 ${y + 20}`} />
          <path className="sx-tangle" d={`M396 ${y + 20} C 470 ${y + 20}, 470 ${i % 2 ? 190 : 60}, 486 125`} strokeDasharray="4 6" />
          <g className="sx-box"><rect x="296" y={y} width="100" height="40" rx="10" /><text x="346" y={y + 24}>{t}</text></g>
        </g>
      ))}
      <g className="sx-box"><rect x="486" y="95" width="100" height="60" rx="12" /><text x="536" y="130">Customers</text></g>
      <text className="sx-q" x="452" y="90">?</text><text className="sx-q" x="236" y="62">?</text><text className="sx-q" x="236" y="214">?</text>
    </svg>
  )
}

function CleanArt() {
  return (
    <svg viewBox="0 0 600 250" role="img" aria-label="An application sending through one API to customers, with reports coming back">
      <defs><marker id="sx-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#4f5bd5" /></marker></defs>
      <g className="sx-box on"><rect x="14" y="95" width="110" height="60" rx="12" /><text x="69" y="130">Your app</text></g>
      <path className="sx-clean" d="M124 125 H 236" markerEnd="url(#sx-arr)" />
      <g className="sx-hub"><circle cx="300" cy="125" r="52" /><text x="300" y="121">SMS API</text><text x="300" y="140" className="sm">one endpoint</text></g>
      <path className="sx-clean" d="M352 125 H 476" markerEnd="url(#sx-arr)" />
      <g className="sx-box on"><rect x="486" y="95" width="100" height="60" rx="12" /><text x="536" y="130">Customers</text></g>
      <path className="sx-back" d="M536 160 C 536 232, 69 232, 69 160" markerEnd="url(#sx-arr)" />
      <text className="sx-tag" x="300" y="226">delivery reports and replies, pushed back</text>
    </svg>
  )
}

export function CompareSlider({ eyebrow, title, beforeLabel, beforeItems, afterLabel, afterItems }) {
  const [pos, setPos] = useState(50)
  return (
    <section className="sx-cmp">
      <div className="container">
        <header className="sx-cmp-head">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>Drag the divider to compare.</p>
        </header>

        <div className="sx-cmp-stage" style={{ '--p': `${pos}%` }}>
          <div className="sx-pane sx-after">
            <b className="sx-pane-label">{afterLabel}</b>
            <CleanArt />
            <ul>{afterItems.map((t) => <li key={t}><IconCheck />{t}</li>)}</ul>
          </div>
          <div className="sx-pane sx-before">
            <b className="sx-pane-label">{beforeLabel}</b>
            <MessyArt />
            <ul>{beforeItems.map((t) => <li key={t}><span aria-hidden="true">✕</span>{t}</li>)}</ul>
          </div>
          <span className="sx-handle" aria-hidden="true"><i>⇄</i></span>
          <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare without and with the SMS API" />
        </div>
      </div>
    </section>
  )
}

/* ═════════ 6 ─ Launch: tick it off, watch the ring fill ═════════ */

export function LaunchChecklist({ eyebrow, title, groups }) {
  const [done, setDone] = useState(() => new Set())
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const pct = done.size / total
  const C = 2 * Math.PI * 52
  const toggle = (k) => setDone((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n })
  const ready = done.size === total
  return (
    <section className="sx-launch">
      <div className="container">
        <div className="sx-launch-grid">
          <div className="sx-launch-side">
            <span className="sx-launch-kicker">{eyebrow}</span>
            <h2>{title}</h2>
            <div className={`sx-ring${ready ? ' ready' : ''}`}>
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="bg" />
                <circle cx="60" cy="60" r="52" className="fg" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} />
              </svg>
              <div><b>{Math.round(pct * 100)}%</b><span>{done.size} of {total}</span></div>
            </div>
            <p className="sx-launch-note" aria-live="polite">
              {ready ? 'You are ready to go live.' : 'Tick items off as you go. Nothing here is saved.'}
            </p>
            {ready && <Link to="/signup/" className="sx-launch-cta">Create your account →</Link>}
          </div>

          <div className="sx-launch-cols">
            {groups.map((g, gi) => (
              <fieldset key={g.title} className="sx-group">
                <legend><span>{String(gi + 1).padStart(2, '0')}</span>{g.title}</legend>
                {g.items.map((it) => {
                  const k = `${gi}:${it}`
                  return (
                    <label key={k} className={done.has(k) ? 'on' : ''}>
                      <input type="checkbox" checked={done.has(k)} onChange={() => toggle(k)} />
                      <i aria-hidden="true"><IconCheck /></i>
                      <span>{it}</span>
                    </label>
                  )
                })}
              </fieldset>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════ 7 ─ Next steps: a path with a node per link ═════════ */

export function NextSteps({ eyebrow, title, links }) {
  return (
    <section className="sx-next">
      <div className="container sx-next-grid">
        <header className="sx-next-head">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>Pick up wherever you are. Each of these builds on the same account and access key.</p>
        </header>
        <ol className="sx-next-list">
          {links.map((l, i) => (
            <li key={l.t}>
              <span className="sx-node" aria-hidden="true">{i + 1}</span>
              <Link to={l.href}>
                <span className="sx-next-txt"><strong>{l.t}</strong><span>{l.d}</span></span>
                <em aria-hidden="true">→</em>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
