import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import './ResourcesDocs.css'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import PayloadFieldAnatomy from '../components/PayloadFieldAnatomy.jsx'
import FeatureMasonry from '../components/FeatureMasonry.jsx'
import { IconLink, IconMail, IconUsers, IconRefresh, IconChat, IconShield, IconRocket, IconSearch } from '../components/icons.jsx'

/* ---------- data ---------- */

const STEPS = [
  {
    n: '01', t: 'Authenticate', d: 'Send your access key as a Token header, with Content-Type: application/json, on every request.',
    cmd: 'Token: sk_live_9f2a7c10', out: 'Content-Type: application/json ✓',
  },
  {
    n: '02', t: 'Send', d: 'POST a from, to and content. The response comes back with a msgid and an errorcode immediately.',
    cmd: 'POST /external/sms', out: '{ msgid: "9f2a7c10", errorcode: 0 }',
  },
  {
    n: '03', t: 'Track', d: 'We POST or GET a status report to your callback URL the moment a message reaches its final state.',
    cmd: 'GET /report?status=Delivrd', out: '200 OK',
  },
]

const SAMPLES = [
  {
    label: 'cURL',
    lines: [
      { k: 'curl -X POST https://secure.smslocal.com/api/service/enterprise-service/external/sms \\' },
      { k: '  -H ', s: '"Token: $SMSLOCAL_TOKEN"', t: ' \\' },
      { k: '  -H ', s: '"Content-Type: application/json"', t: ' \\' },
      { k: "  -d '{" },
      { k: '    "from": ', s: '"SMSLOCAL"', t: ',' },
      { k: '    "to": ', s: '"14155550123"', t: ',' },
      { k: '    "content": ', s: '"Your code is 481920."' },
      { k: "  }'" },
    ],
  },
  {
    label: 'Node.js',
    lines: [
      { k: 'const res = ', kw: 'await', t: ' fetch(url, {' },
      { k: '  method: ', s: '"POST"', t: ',' },
      { k: '  headers: { Token: token },' },
      { k: '  body: JSON.stringify({' },
      { k: '    from: ', s: '"SMSLOCAL"', t: ',' },
      { k: '    to: ', s: '"14155550123"', t: ',' },
      { k: '    content: ', s: '"Your code is 481920."' },
      { k: '  }),' },
      { k: '})' },
    ],
  },
  {
    label: 'Python',
    lines: [
      { k: 'res = requests.post(' },
      { k: '  url,' },
      { k: '  headers={', s: '"Token"', t: ': token},' },
      { k: '  json={' },
      { k: '    ', s: '"from"', t: ': ', s2: '"SMSLOCAL"' },
      { k: '    ', s: '"to"', t: ': ', s2: '"14155550123"' },
      { k: '    ', s: '"content"', t: ': ', s2: '"Your code is 481920."' },
      { k: '  },' },
      { k: ')' },
    ],
  },
]

const RESPONSE_FIELDS = [
  { title: 'Message ID', icon: <IconLink />, tint: '#4f5bd5', tintBg: 'rgba(79, 91, 213, 0.12)', desc: 'msgid — minted the moment a message is created. This is the handle you use to check its status later.' },
  { title: 'Sender', icon: <IconMail />, tint: '#ec4899', tintBg: 'rgba(236, 72, 153, 0.12)', desc: 'from — a phone number, or an alphanumeric ID up to 11 characters, whichever identity your recipients see.' },
  { title: 'Recipient', icon: <IconUsers />, tint: '#14b8a6', tintBg: 'rgba(20, 184, 166, 0.12)', desc: 'to — the number the message is going to, including country code.' },
  { title: 'Encoding', icon: <IconRefresh />, tint: '#8b5cf6', tintBg: 'rgba(139, 92, 246, 0.12)', desc: 'datacoding — GSM7 fits 160 characters per part; switch to Unicode and that drops to 70. Go over, and it concatenates into extra billed parts.' },
  { title: 'Direction', icon: <IconChat />, tint: '#f59e0b', tintBg: 'rgba(245, 158, 11, 0.12)', desc: 'direction — every message is mt (you sent it) or mo (you received it), the same shape either way.' },
  { title: 'Error Code', icon: <IconShield />, tint: '#fb7185', tintBg: 'rgba(251, 113, 133, 0.12)', desc: 'errorcode — returned on the send response and every status report. 0 means accepted; anything else tells you exactly what went wrong.' },
]

const ENDPOINTS = [
  { label: 'Send', verb: 'POST', icon: <IconRocket />, tint: '#4f5bd5', tintBg: 'rgba(79, 91, 213, 0.1)', desc: 'Send a message and get back a msgid and an errorcode immediately.', returns: 'msgid + errorcode' },
  { label: 'Track', verb: 'GET', icon: <IconSearch />, tint: '#14b8a6', tintBg: 'rgba(20, 184, 166, 0.1)', desc: 'Look up a message you already sent to check its current status.', returns: 'message + status' },
]

const EVENTS = [
  { tag: 'delivered', text: 'msgid 9f2a7c10 · status Delivrd', tone: 'ok' },
  { tag: 'inbound', text: 'reply received · direction mo', tone: 'in' },
  { tag: 'failed', text: 'msgid 4c81e2 · status Failed', tone: 'bad' },
]

const FAQS = [
  { q: 'How do I authenticate requests?', a: 'Pass your access key in a Token header on every request — Token: {accessKey} — along with Content-Type: application/json.' },
  { q: 'How do I check whether a message was delivered?', a: 'Every send returns a msgid. Point us at a callback URL and we POST or GET a status report to it the moment the message reaches its final state — subdate, donedate and the resulting status code included.' },
  { q: 'What does the "direction" field mean?', a: 'mt (mobile terminated) is a message you sent; mo (mobile originated) is a reply you received. Both use the same message object shape.' },
  { q: "What happens if my callback URL doesn't respond with 200 OK?", a: 'Delivery is retried according to the retry policy — nothing is silently dropped, but an endpoint that never acknowledges will keep receiving retries.' },
  { q: 'What is the character limit per message?', a: '160 characters on GSM7 encoding, or 70 on Unicode. Go past the limit and the message concatenates into multiple parts, each billed separately.' },
]

/* ---------- code showcase (de-boxed, tabbed) ---------- */

function CodeShowcase() {
  const [active, setActive] = useState(0)
  const sample = SAMPLES[active]

  return (
    <section className="section rd-code-section">
      <div className="container">
        <span className="section-kicker">Send</span>
        <h2 className="section-title">One request, in the language you already use</h2>
        <p className="section-subtitle">POST your sender, recipient and content with a Token header. The response comes back the moment we accept it.</p>

        <div className="rd-code">
          <div className="rd-code-tabs" role="tablist">
            {SAMPLES.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={active === i}
                className={active === i ? 'rd-code-tab is-on' : 'rd-code-tab'}
                onClick={() => setActive(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="rd-code-grid">
            <pre className="rd-code-block"><code>
              {sample.lines.map((ln, i) => (
                <span className="rd-code-ln" key={i}>
                  <span className="rd-code-gutter">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rd-code-txt">
                    {ln.kw ? <><span className="c-def">{ln.k}</span><span className="c-kw">{ln.kw}</span>{ln.t}</>
                      : <>
                          <span className="c-def">{ln.k}</span>
                          {ln.s && <span className="c-str">{ln.s}</span>}
                          {ln.t}
                          {ln.s2 && <span className="c-str">{ln.s2}</span>}
                        </>}
                  </span>
                </span>
              ))}
            </code></pre>

            <div className="rd-code-resp">
              <span className="rd-code-resp-head"><span className="rd-code-resp-dot" /> 201 · Accepted</span>
              <p className="rd-code-resp-line"><span className="c-key">msgid</span> "9f2a7c10-4b2e-…"</p>
              <p className="rd-code-resp-line"><span className="c-key">direction</span> "mt"</p>
              <p className="rd-code-resp-line"><span className="c-key">errorcode</span> <span className="c-num">0</span></p>
              <p className="rd-code-resp-note">Save the <strong>msgid</strong> — it is how you track this message from here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- page ---------- */

function ResourcesDocs() {
  return (
    <>
      <Seo
        title="SMSLocal Developer Docs & API Reference"
        description="API and developer reference for SMSLocal — authentication, endpoints and SDKs, with code samples."
      />

      <Hero
        eyebrow="Docs"
        title={<>Ship your first message <span className="grad-word">in an afternoon</span></>}
        subtitle="A plain REST API for sending, tracking and receiving SMS — token auth, real-time webhooks and SDKs, with nothing exotic to learn."
        primaryCta={{ label: 'Get API Key', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Guides', href: '/resources/guides/' }}
        visual={<PayloadFieldAnatomy />}
      />

      {/* quickstart — a floating path: one line, three real waypoints */}
      <section className="section section-alt rd-steps-section">
        <div className="container">
          <span className="section-kicker">Quickstart</span>
          <h2 className="section-title">Three moves, start to delivered</h2>
          <p className="section-subtitle">Every integration is the same short arc — authenticate, send, then track.</p>

          <div className="rd-qs-path keeps-own-width">
            <span className="rd-qs-path-line" aria-hidden="true" />
            {STEPS.map((s, i) => {
              const chip = (
                <div className="rd-qs-chip">
                  <span className="rd-qs-chip-n">{s.n} · {s.t}</span>
                  <span className="rd-qs-chip-cmd">{s.cmd}</span>
                  <span className="rd-qs-chip-out">{s.out}</span>
                </div>
              )
              return (
                <div className="rd-qs-point" style={{ '--i': i }} key={s.n}>
                  <span className="rd-qs-point-slot">{i % 2 === 0 ? chip : null}</span>
                  <span className="rd-qs-point-dot" />
                  <span className="rd-qs-point-slot">{i % 2 === 1 ? chip : null}</span>
                  <p className="rd-qs-point-d">{s.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* send — de-boxed tabbed code + response */}
      <CodeShowcase />

      {/* response object — the shared vertical-tabs masonry, same as WhatsApp's Features */}
      <FeatureMasonry
        eyebrow="The message object"
        title={<>Read a message top to bottom</>}
        subtitle="Send, status and inbound events all return the same shape — learn it once."
        items={RESPONSE_FIELDS}
        alt
      />

      {/* endpoints — an icon-led pair, no code font */}
      <section className="section rd-ep-section">
        <div className="container">
          <span className="section-kicker">Reference</span>
          <h2 className="section-title">One endpoint, two verbs</h2>
          <p className="section-subtitle">POST to send, GET to check status — the same URL and the same Token header either way.</p>

          <div className="rd-ep-pair keeps-own-width">
            {ENDPOINTS.map((e) => (
              <div className="rd-ep-card" key={e.label}>
                <span
                  className="rd-ep-icon"
                  style={{ '--rd-ep-tint': e.tint, '--rd-ep-tint-bg': e.tintBg }}
                >
                  {e.icon}
                </span>
                <span className="rd-ep-verb" style={{ color: e.tint }}>{e.verb}</span>
                <h3 className="rd-ep-label">{e.label}</h3>
                <p className="rd-ep-desc">{e.desc}</p>
                <span className="rd-ep-returns">Returns {e.returns}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* webhooks — event stream into your endpoint */}
      <section className="section section-alt rd-hooks-section">
        <div className="container">
          <span className="section-kicker">Webhooks</span>
          <h2 className="section-title">Status reports, the moment they happen</h2>
          <p className="section-subtitle">Set a callback URL and every delivery, failure and inbound reply lands there as a GET or POST — no polling required.</p>

          <div className="rd-stream">
            <div className="rd-stream-events">
              {EVENTS.map((ev, i) => (
                <div className={`rd-event rd-event--${ev.tone}`} style={{ '--i': i }} key={ev.tag}>
                  <span className="rd-event-tag">{ev.tag}</span>
                  <span className="rd-event-text">{ev.text}</span>
                </div>
              ))}
            </div>
            <div className="rd-stream-rail" aria-hidden="true"><span className="rd-stream-pulse" /></div>
            <div className="rd-stream-node">
              <span className="rd-stream-node-dot" />
              <span className="rd-stream-node-label">Your endpoint</span>
              <span className="rd-stream-node-sub">200 OK</span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Get your API key"
        subtitle="Start integrating in minutes with our REST API."
        cta={{ label: 'Get API Key', href: '/contact-us/' }}
      />

      <FAQ title={<>Developer docs — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default ResourcesDocs
