import Seo from '../components/Seo.jsx'
import './ResourcesDocs.css'
import { Hero, EcosystemGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import CodeTabs from '../components/CodeTabs.jsx'
import { IconShield, IconMegaphone, IconChat, IconRefresh, IconCode, IconPackage } from '../components/icons.jsx'

const STATS = [
  { value: 'REST', label: 'Simple HTTP API', desc: 'Standard JSON over HTTPS — call it from any language.' },
  { value: 'Token', label: 'Header auth', desc: 'One access key in a header, scoped and revocable.' },
  { value: 'Webhooks', label: 'Real-time events', desc: 'Delivery receipts and inbound messages pushed to you.' },
  { value: 'SDKs', label: 'Client libraries', desc: 'Official libraries for popular backend languages.' },
]

const SECTIONS = [
  { icon: <IconShield />, title: 'Authentication', desc: 'Pass your access key in a Token header on every request.' },
  { icon: <IconMegaphone />, title: 'Send SMS', desc: 'POST a message with sender, recipient and content.' },
  { icon: <IconRefresh />, title: 'Delivery status', desc: 'Check any message by its ID, or receive status via webhook.' },
  { icon: <IconChat />, title: 'Inbound messages', desc: 'Receive replies (direction "mo") pushed to your endpoint.' },
  { icon: <IconPackage />, title: 'SDKs & libraries', desc: 'Official client libraries for common backend languages.' },
  { icon: <IconCode />, title: 'Error codes', desc: 'Every response carries an errorcode you can act on.' },
]

const SAMPLES = [
  {
    label: 'cURL',
    code: `curl -X POST https://secure.smslocal.com/api/service/\\
  enterprise-service/external/sms \\
  -H "Token: $SMSLOCAL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "SMSLOCAL",
    "to": "14155550123",
    "content": "Your code is 481920."
  }'`,
  },
  {
    label: 'Node.js',
    code: `const res = await fetch(
  "https://secure.smslocal.com/api/service/enterprise-service/external/sms",
  {
    method: "POST",
    headers: {
      "Token": process.env.SMSLOCAL_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "SMSLOCAL",
      to: "14155550123",
      content: "Your code is 481920.",
    }),
  }
)

const message = await res.json()
console.log(message.msgid, message.errorcode)`,
  },
  {
    label: 'Python',
    code: `import os, requests

res = requests.post(
    "https://secure.smslocal.com/api/service/enterprise-service/external/sms",
    headers={
        "Token": os.environ["SMSLOCAL_TOKEN"],
        "Content-Type": "application/json",
    },
    json={
        "from": "SMSLOCAL",
        "to": "14155550123",
        "content": "Your code is 481920.",
    },
)

message = res.json()
print(message["msgid"], message["errorcode"])`,
  },
]

const FAQS = [
  { q: 'How do I authenticate requests?', a: 'Pass your access key in a Token header on every request, along with Content-Type: application/json. Keys are scoped, so one can be rotated or revoked without touching the others.' },
  { q: 'How do I check whether a message was delivered?', a: 'Every send returns a unique message ID (msgid). Poll the status endpoint with that ID, or subscribe to a webhook to have delivery status pushed to you as it changes.' },
  { q: 'How do I receive replies?', a: 'Inbound messages arrive as events with direction "mo". Configure a webhook URL and they are POSTed to it in real time, tied to the original conversation.' },
  { q: 'What happens if my webhook is down?', a: 'The platform expects a 200 OK from your endpoint. If it does not acknowledge, delivery is retried according to the retry policy so events are not silently lost.' },
  { q: 'Which languages have SDKs?', a: 'Official SDKs are available for common backend languages, and the REST API works with any HTTP client otherwise.' },
]

function ResourcesDocs() {
  return (
    <>
      <Seo
        title="Developer Docs"
        description="API and developer reference for SMSLocal — authentication, SMS endpoints, delivery status, webhooks and SDKs."
      />

      <Hero
        eyebrow="Docs"
        title="Everything you need to integrate, in one reference"
        subtitle="A simple REST API for sending messages and tracking delivery — with token auth, webhooks and SDKs, built for developers wiring this into their own systems."
        primaryCta={{ label: 'Get API Key', href: '/contact' }}
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
      />

      <StatBand
        title="A REST API you integrate once"
        subtitle="Standard HTTP and JSON, predictable responses, and events pushed to you — nothing exotic to learn."
        items={STATS}
        alt
      />

      <EcosystemGrid
        title={<>Browse the API reference</>}
        subtitle="Jump straight to the section you need."
        items={SECTIONS}
      />

      <CodeTabs
        title="Send an SMS in one request"
        subtitle="POST your sender, recipient and content with a Token header. Every send returns a unique message ID."
        note="Base URL: https://secure.smslocal.com/api/service/enterprise-service/external/sms"
        samples={SAMPLES}
        alt
      />

      <section className="section">
        <div className="container">
          <h2 className="section-title">Every message is one object</h2>
          <p className="section-subtitle">The same shape is returned on send, on status checks, and on inbound events.</p>

          <div className="docs-object-wrap">
            <div className="docs-code">
              <pre><code>{`{
  `}<span className="docs-k">"msgid"</span>{`: `}<span className="docs-s">"9f2a7c10-4b2e-..."</span>{`,
  `}<span className="docs-k">"from"</span>{`: `}<span className="docs-s">"SMSLOCAL"</span>{`,
  `}<span className="docs-k">"to"</span>{`: `}<span className="docs-s">"14155550123"</span>{`,
  `}<span className="docs-k">"content"</span>{`: `}<span className="docs-s">"Your code is 481920."</span>{`,
  `}<span className="docs-k">"direction"</span>{`: `}<span className="docs-s">"mt"</span>{`,
  `}<span className="docs-k">"sendOn"</span>{`: `}<span className="docs-s">"2026-07-11T09:41:00Z"</span>{`,
  `}<span className="docs-k">"errorcode"</span>{`: `}<span className="docs-n">0</span>{`
}`}</code></pre>
            </div>

            <div className="docs-fields">
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">msgid</span>
                  <span className="docs-field-type">uuid</span>
                </div>
                <p>Unique ID generated for every message — use it to check status later.</p>
              </div>
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">from</span>
                  <span className="docs-field-type">string</span>
                </div>
                <p>Sender — a number or an alphanumeric ID up to 11 characters.</p>
              </div>
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">to</span>
                  <span className="docs-field-type">string</span>
                </div>
                <p>Recipient number in international format, without a leading plus.</p>
              </div>
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">direction</span>
                  <span className="docs-field-type">enum</span>
                </div>
                <p><strong>mt</strong> for messages you send, <strong>mo</strong> for replies you receive.</p>
              </div>
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">sendOn</span>
                  <span className="docs-field-type">datetime</span>
                </div>
                <p>RFC 3339 timestamp — set it in the future to schedule a send.</p>
              </div>
              <div className="docs-field">
                <div className="docs-field-top">
                  <span className="docs-field-name">errorcode</span>
                  <span className="docs-field-type">int</span>
                </div>
                <p>0 on success; a non-zero code tells you exactly what went wrong.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ title={<>Developer docs — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Get your API key"
        subtitle="Start integrating in minutes with our REST API."
        cta={{ label: 'Get API Key', href: '/contact' }}
      />
    </>
  )
}

export default ResourcesDocs
