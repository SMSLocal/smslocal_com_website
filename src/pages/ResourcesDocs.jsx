import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import './ResourcesDocs.css'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import PayloadFieldAnatomy from '../components/PayloadFieldAnatomy.jsx'

/* ---------- data ---------- */

const METRICS = [
  { v: '1', l: 'header authenticates every call' },
  { v: '5', l: 'endpoints cover the whole API' },
  { v: '<200ms', l: 'median response, globally' },
  { v: '24/7', l: 'delivery + inbound webhooks' },
]

const STEPS = [
  { n: '01', t: 'Authenticate', d: 'Drop your access key into a Token header. It is scoped, so you can rotate or revoke it without touching the rest.' },
  { n: '02', t: 'Send', d: 'POST a sender, recipient and content. Every send returns a unique msgid in the response, instantly.' },
  { n: '03', t: 'Track', d: 'Fetch a message by its id, or let webhooks push delivery receipts and inbound replies straight to you.' },
]

const SAMPLES = [
  {
    label: 'cURL',
    lines: [
      { k: 'curl -X POST https://secure.smslocal.com/…/sms \\' },
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
  { name: 'msgid', type: 'uuid', desc: 'Unique ID minted for every message — the handle you use to check status later.' },
  { name: 'direction', type: 'enum', desc: 'mt for messages you send, mo for the replies you receive.' },
  { name: 'errorcode', type: 'int', desc: '0 means accepted; any non-zero value tells you exactly what went wrong.' },
]

const ENDPOINT_GROUPS = [
  {
    label: 'Send',
    endpoints: [
      { method: 'POST', path: '/external/sms', desc: 'Send a message and get back a message ID.', returns: 'message ID' },
    ],
  },
  {
    label: 'Track',
    endpoints: [
      { method: 'GET', path: '/external/sms/{msgid}', desc: 'Fetch one message and its delivery status.', returns: 'delivery status' },
      { method: 'GET', path: '/external/sms', desc: 'List recent messages, filtered and paged.', returns: 'message list' },
    ],
  },
  {
    label: 'Receive',
    endpoints: [
      { method: 'POST', path: '/external/webhook', desc: 'Register a URL for delivery + inbound events.', returns: 'subscription' },
    ],
  },
  {
    label: 'Account',
    endpoints: [
      { method: 'GET', path: '/external/balance', desc: 'Check the remaining credit on your account.', returns: 'credit left' },
    ],
  },
]

const EVENTS = [
  { tag: 'delivered', text: 'msgid 9f2a · errorcode 0', tone: 'ok' },
  { tag: 'inbound', text: 'reply "STOP" · direction mo', tone: 'in' },
  { tag: 'failed', text: 'msgid 4c81 · errorcode 21', tone: 'bad' },
]

const FAQS = [
  { q: 'How do I authenticate requests?', a: 'Pass your access key in a Token header on every request, along with Content-Type: application/json. Keys are scoped, so one can be rotated or revoked without touching the others.' },
  { q: 'How do I check whether a message was delivered?', a: 'Every send returns a unique message ID (msgid). Poll the status endpoint with that ID, or subscribe to a webhook to have delivery status pushed to you as it changes.' },
  { q: 'How do I receive replies?', a: 'Inbound messages arrive as events with direction "mo". Configure a webhook URL and they are POSTed to it in real time, tied to the original conversation.' },
  { q: 'What happens if my webhook is down?', a: 'The platform expects a 200 OK from your endpoint. If it does not acknowledge, delivery is retried according to the retry policy so events are not silently lost.' },
  { q: 'Which languages have SDKs?', a: 'Official SDKs are available for common backend languages, and the REST API works with any HTTP client otherwise.' },
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
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
        visual={<PayloadFieldAnatomy />}
      />

      {/* de-boxed number strip */}
      <section className="section rd-metrics-section">
        <div className="container">
          <div className="rd-metrics">
            {METRICS.map((m) => (
              <div className="rd-metric" key={m.l}>
                <span className="rd-metric-v">{m.v}</span>
                <span className="rd-metric-l">{m.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quickstart — big ghost numerals */}
      <section className="section section-alt rd-steps-section">
        <div className="container">
          <span className="section-kicker">Quickstart</span>
          <h2 className="section-title">Three moves, start to delivered</h2>
          <p className="section-subtitle">Every integration is the same short arc — authenticate, send, then track.</p>

          <div className="rd-steps">
            {STEPS.map((s, i) => (
              <div className="rd-step" style={{ '--i': i }} key={s.n}>
                <span className="rd-step-n">{s.n}</span>
                <h3 className="rd-step-t">{s.t}</h3>
                <p className="rd-step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* send — de-boxed tabbed code + response */}
      <CodeShowcase />

      {/* response object — editorial field breakdown */}
      <section className="section section-alt rd-fields-section">
        <div className="container">
          <span className="section-kicker">The message object</span>
          <h2 className="section-title">Read a message top to bottom</h2>
          <p className="section-subtitle">Send, status and inbound events all return the same shape — learn it once.</p>

          <div className="rd-fields">
            {RESPONSE_FIELDS.map((f) => (
              <div className="rd-field" key={f.name}>
                <span className="rd-field-name">{f.name}</span>
                <span className="rd-field-type">{f.type}</span>
                <p className="rd-field-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* endpoints — method rows */}
      <section className="section rd-ep-section">
        <div className="container">
          <span className="section-kicker">Reference</span>
          <h2 className="section-title">The endpoints you'll actually use</h2>
          <p className="section-subtitle">Five calls cover sending, tracking and receiving — the same Token header on every one.</p>

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
          <h2 className="section-title">Events, the moment they happen</h2>
          <p className="section-subtitle">Point us at a URL and every delivery receipt, failure and inbound reply is POSTed to you in real time.</p>

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
