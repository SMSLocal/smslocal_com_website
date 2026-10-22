import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from './icons.jsx'
import { useInView } from './cpaas/useMotion.js'
import './EmailPageSections.css'

/**
 * Sections for the Email page, each with its own layout: a chip cluster that
 * merges email into the rest of the stack, a send timeline with a bounce
 * switch, a vertical setup rail, four editorial columns and pair cards. The
 * testimonials, call to action and FAQ stay as the site already has them.
 * Classes: `es-`. Timings in the timeline are illustrative.
 */

function Head({ eyebrow, title, subtitle, align }) {
  return (
    <header className={`es-head${align === 'center' ? ' center' : ''}`}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

/* ═════ 1 · Merge email into the stack ═════ */

const STACK = ['SMS', 'WhatsApp', 'Web chat']

export function EmailMerge({ eyebrow, title, text, fix }) {
  const [merged, setMerged] = useState(false)
  const n = merged ? 1 : 2
  return (
    <section className="es-merge">
      <div className="container es-merge-grid">
        <Head eyebrow={eyebrow} title={title} subtitle={text} />
        <div className="es-box">
          <div className="es-box-top"><span>Your stack · this month</span><em>Illustrative</em></div>
          <div className={`es-zone${merged ? ' merged' : ''}`}>
            <ul>
              {STACK.map((s) => <li key={s}>{s}</li>)}
              <li className={`es-mail${merged ? ' in' : ''}`}>Email{!merged && <small>run alone</small>}</li>
            </ul>
            {!merged && <p className="es-zone-note">Email sits outside: its own dashboard, its own bill.</p>}
            {merged && <p className="es-zone-note ok">One account for every channel.</p>}
          </div>
          <dl className="es-count">
            {[['Vendors', n], ['Dashboards', n], ['Bills', n]].map(([k, v]) => (
              <div key={k} className={merged ? 'one' : ''}><dd key={v}>{v}</dd><dt>{k}</dt></div>
            ))}
          </dl>
          <button type="button" className="es-btn" onClick={() => setMerged((m) => !m)}>{merged ? 'Show it run alone' : 'Bring email into one account'}</button>
          <p className="es-fix"><span aria-hidden="true">→</span> {fix}</p>
        </div>
      </div>
    </section>
  )
}

/* ═════ 2 · Send timeline with a bounce switch ═════ */

const FLOW_OK = [
  ['0.0 s', 'Request accepted', 'ok'],
  ['0.4 s', 'Email delivered', 'ok'],
  ['6 s', 'Email opened', 'ok'],
]
const FLOW_BOUNCE = [
  ['0.0 s', 'Request accepted', 'ok'],
  ['0.5 s', 'Email bounced', 'bad'],
  ['0.6 s', 'Fallback SMS sent', 'sms'],
  ['1.1 s', 'SMS delivered', 'ok'],
]

export function EmailTimeline({ eyebrow, title, subtitle }) {
  const [bounce, setBounce] = useState(false)
  const [shown, setShown] = useState(0)
  const [busy, setBusy] = useState(false)
  const timer = useRef(0)
  const flow = bounce ? FLOW_BOUNCE : FLOW_OK
  useEffect(() => () => clearInterval(timer.current), [])
  const send = () => {
    clearInterval(timer.current)
    setShown(0); setBusy(true)
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= flow.length) { clearInterval(timer.current); setBusy(false) }
    }, 650)
  }
  return (
    <section className="es-line">
      <div className="container es-line-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <label className="es-switch">
            <input type="checkbox" checked={bounce} onChange={(e) => { setBounce(e.target.checked); setShown(0) }} />
            <span className="es-track"><i /></span>
            Simulate a bounce
          </label>
          <button type="button" className="es-btn solid" onClick={send} disabled={busy}>{busy ? 'Sending…' : 'Send test email'}</button>
        </div>
        <div className="es-log" aria-live="polite">
          <div className="es-log-top"><code>POST /v1/send</code><span>REST · SMTP</span></div>
          <ol>
            {flow.map(([t, label, kind], i) => (
              <li key={label} className={`${kind}${i < shown ? ' on' : ''}`}>
                <time>{t}</time>
                <span className="dot">{kind === 'bad' ? '✕' : <IconCheck />}</span>
                <b>{label}</b>
              </li>
            ))}
          </ol>
          {shown === 0 && <p className="es-log-idle">Press “Send test email” to watch the events arrive.</p>}
          {shown >= flow.length && <p className={`es-log-end${bounce ? ' fb' : ''}`}>{bounce ? 'The bounce triggered a fallback, so the message still reached the contact.' : 'Delivered and opened. The SMS fallback stayed on standby.'}</p>}
        </div>
      </div>
    </section>
  )
}

/* ═════ 2b · Two kinds of email ═════ */

const KINDS = [
  {
    key: 'transactional',
    label: 'Transactional',
    lead: 'Triggered by something a person just did in your product, sent to them alone, right away.',
    examples: ['Order confirmation', 'Password reset', 'OTP email', 'Receipt'],
    flow: ['Event in your app', 'REST API or SMTP', 'One email, at once'],
    end: 'From a single OTP email…',
  },
  {
    key: 'bulk',
    label: 'Bulk',
    lead: 'Sent to a whole list or segment in one go, with opens and clicks reported together.',
    examples: ['Product launch', 'Monthly newsletter', 'Offer to a segment', 'Announcement'],
    flow: ['Pick a segment', 'Choose a template', 'Many emails, one report'],
    end: '…to a million-send campaign.',
  },
]

export function EmailKinds({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)
  const k = KINDS[i]
  return (
    <section className="es-kinds">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className="es-kseg" role="tablist" aria-label="Kind of email">
          {KINDS.map((x, n) => (
            <button key={x.key} type="button" role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>{x.label}</button>
          ))}
        </div>
        <div className="es-kcard" role="tabpanel" key={k.key}>
          <div className="es-kcopy">
            <p>{k.lead}</p>
            <ul>{k.examples.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
          <div className="es-kflow">
            <ol>
              {k.flow.map((f, n) => (
                <li key={f} style={{ '--n': n }}><span>{n + 1}</span>{f}</li>
              ))}
            </ol>
            <p className="es-kend">{k.end}</p>
          </div>
        </div>
        <p className="es-knote">The same API and the same account handle both.</p>
      </div>
    </section>
  )
}

/* ═════ 3 · Setup rail ═════ */

const SETUP_CHIPS = [
  ['SPF', 'DKIM', 'DMARC'],
  ['Visual builder', 'Raw HTML via API', 'Transactional', 'Bulk'],
  ['Retry over SMS', 'On a bounce', 'On no-open'],
]

export function EmailSetupRail({ eyebrow, title, steps }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  return (
    <section className="es-rail" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} align="center" />
        <ol className={`es-steps${seen ? ' go' : ''}`}>
          {steps.map((s, i) => (
            <li key={s.title} style={{ '--i': i }}>
              <span className="es-dot">{i + 1}</span>
              <div className="es-step">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{SETUP_CHIPS[i]?.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ═════ 4 · Editorial columns ═════ */

export function EmailColumns({ eyebrow, title, items }) {
  return (
    <section className="es-cols">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} />
        <ul>
          {items.map((it, i) => (
            <li key={it.title}>
              <span className="es-col-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="es-col-ico">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ═════ 6 · Authentication explained ═════ */

const RECORDS = [
  {
    key: 'spf',
    name: 'SPF',
    what: 'A list of the servers that are allowed to send email for your domain.',
    without: 'Inbox providers cannot tell your mail from a forgery, so more of it is doubted.',
    host: '@  (yourbrand.com)',
    value: 'v=spf1 include:_spf.sender.example ~all',
  },
  {
    key: 'dkim',
    name: 'DKIM',
    what: 'A digital signature added to every message, so receivers know it was not changed on the way.',
    without: 'Nothing proves a message is really yours or that it arrived untouched.',
    host: 'selector1._domainkey',
    value: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN…',
  },
  {
    key: 'dmarc',
    name: 'DMARC',
    what: 'Tells inbox providers what to do when SPF or DKIM checks fail, and where to send reports about it.',
    without: 'Failed mail is handled however each provider likes, and you never see the reports.',
    host: '_dmarc',
    value: 'v=DMARC1; p=none; rua=mailto:dmarc@yourbrand.com',
  },
]

export function EmailAuth({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)
  const [copied, setCopied] = useState(false)
  const r = RECORDS[i]
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${r.host} TXT ${r.value}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* clipboard blocked */ }
  }
  return (
    <section className="es-auth">
      <div className="container es-auth-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="es-recs" role="tablist" aria-label="Authentication records">
            {RECORDS.map((x, n) => (
              <button key={x.key} type="button" role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => { setI(n); setCopied(false) }}>
                <b>{x.name}</b><span>{x.what}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="es-dns" role="tabpanel" key={r.key}>
          <div className="es-dns-top">
            <span>Example DNS record</span>
            <em><IconCheck /> Verified</em>
          </div>
          <dl>
            <div><dt>Type</dt><dd>TXT</dd></div>
            <div><dt>Host</dt><dd>{r.host}</dd></div>
            <div><dt>Value</dt><dd className="val">{r.value}</dd></div>
          </dl>
          <div className="es-dns-warn"><b>Without {r.name}</b><p>{r.without}</p></div>
          <div className="es-dns-foot">
            <small>Placeholders only. Your real values come from the setup.</small>
            <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy record'}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════ 5 · Pair cards ═════ */

export function EmailPairs({ eyebrow, title, subtitle, items }) {
  return (
    <section className="es-pairs">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <ul className="es-pair-grid">
          {items.map((it) => {
            const body = (
              <>
                <span className="es-pair-top">
                  <span className="a">Email</span>
                  <b aria-hidden="true">+</b>
                  <span className="b">{it.icon}{it.title}</span>
                </span>
                <p>{it.desc}</p>
                {it.href && <em aria-hidden="true">Learn more →</em>}
              </>
            )
            return (
              <li key={it.title}>
                {it.href ? <Link to={it.href} className="es-pair">{body}</Link> : <div className="es-pair">{body}</div>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
