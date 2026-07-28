import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import './ResourcesDocs.css'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import PayloadFieldAnatomy from '../components/PayloadFieldAnatomy.jsx'

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
  { name: 'msgid', v: '"0f3e-8ac1-77d0"', type: 'uuid', desc: 'minted on creation, your handle for checking status later' },
  { name: 'from', v: '"SMSLOCAL"', type: 'string', desc: 'sender — a number or up to 11 alphanumeric chars' },
  { name: 'to', v: '"+14155550142"', type: 'string', desc: 'recipient number' },
  { name: 'datacoding', v: '0', type: 'int', desc: 'GSM7 (160 chars) or Unicode (70) — over that, it concatenates' },
  { name: 'direction', v: '"mt"', type: 'enum', desc: 'mt = you sent it, mo = you received it' },
  { name: 'errorcode', v: '0', type: 'int', desc: 'on every send + status report — 0 is accepted' },
]

const ENDPOINT_GROUPS = [
  {
    label: 'Send',
    endpoints: [
      { method: 'POST', path: '/external/sms', desc: 'Send a message and get back a msgid and errorcode immediately.', returns: 'msgid + errorcode' },
    ],
  },
  {
    label: 'Track',
    endpoints: [
      { method: 'GET', path: '/external/sms', desc: 'Look up a message you already sent to check its current status.', returns: 'message + status' },
    ],
  },
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
        title="Developer Docs"
        description="API and developer reference for SMSLocal — authentication, SMS endpoints, delivery status, webhooks and SDKs."
      />

      <Hero
        eyebrow="Docs"
        title={<>Ship your first message <span className="grad-word">in an afternoon</span></>}
        subtitle="A plain REST API for sending, tracking and receiving SMS — token auth, real-time webhooks and SDKs, with nothing exotic to learn."
        primaryCta={{ label: 'Get API Key', href: '/contact-us' }}
        secondaryCta={{ label: 'View Guides', href: '/resources/guides' }}
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

      {/* response object — a real JSON object, read as inline comments */}
      <section className="section section-alt rd-fields-section">
        <div className="container">
          <span className="section-kicker">The message object</span>
          <h2 className="section-title">Read a message top to bottom</h2>
          <p className="section-subtitle">Send, status and inbound events all return the same shape — learn it once.</p>

          <div className="rd-obj keeps-own-width">
            <span className="rd-obj-brace">{'{'}</span>
            {RESPONSE_FIELDS.map((f, i) => (
              <div className="rd-obj-line" key={f.name}>
                <span className="rd-obj-code">
                  <span className="rd-obj-key">&quot;{f.name}&quot;</span>
                  <span className="rd-obj-punct">: </span>
                  <span className="rd-obj-val">{f.v}</span>
                  {i < RESPONSE_FIELDS.length - 1 && <span className="rd-obj-punct">,</span>}
                </span>
                <span className="rd-obj-type">{f.type}</span>
                <span className="rd-obj-comment">// {f.desc}</span>
              </div>
            ))}
            <span className="rd-obj-brace">{'}'}</span>
          </div>
        </div>
      </section>

      {/* endpoints — method rows */}
      <section className="section rd-ep-section">
        <div className="container">
          <span className="section-kicker">Reference</span>
          <h2 className="section-title">One endpoint, two verbs</h2>
          <p className="section-subtitle">POST to send, GET to check status — the same URL and the same Token header either way.</p>

          <div className="rd-api">
            {ENDPOINT_GROUPS.map((g) => (
              <div className="rd-api-group" key={g.label}>
                <span className="rd-api-glabel">{g.label}</span>
                {g.endpoints.map((e) => (
                  <div className="rd-api-row" key={e.method + e.path}>
                    <div className="rd-api-line">
                      <code className="rd-api-call">
                        <span className="rd-api-verb">{e.method}</span>
                        <span className="rd-api-path">{e.path}</span>
                      </code>
                      <span className="rd-api-lead" aria-hidden="true" />
                      <span className="rd-api-returns">
                        <span className="rd-api-returns-arrow">→</span> {e.returns}
                      </span>
                    </div>
                    <p className="rd-api-desc">{e.desc}</p>
                  </div>
                ))}
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
        cta={{ label: 'Get API Key', href: '/contact-us' }}
      />

      <FAQ title={<>Developer docs — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default ResourcesDocs
