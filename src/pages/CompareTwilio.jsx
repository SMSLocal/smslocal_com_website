import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { CompareLogo, SmsLocalMark } from '../components/CompareLogo.jsx'
import './CompareTwilio.css'

/* ---- tiny inline icons (neutral, currentColor) --------------------------- */
const IconChat = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 21 12z" /></svg>
)
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5 5L17 12l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" /></svg>
)
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="13" width="4" height="6" rx="1.4" /><rect x="17.5" y="13" width="4" height="6" rx="1.4" /><path d="M20 19a4 4 0 0 1-4 3h-2" /></svg>
)
const IconLayers = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></svg>
)
const IconSpark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>
)

const twilioProducts = [
  { name: 'Messaging', icon: <IconChat /> },
  { name: 'Voice', icon: <IconPhone /> },
  { name: 'SendGrid', icon: <IconMail /> },
  { name: 'Flex', icon: <IconHeadset /> },
  { name: 'Segment', icon: <IconLayers /> },
  { name: 'AI suite', icon: <IconSpark /> },
]

const builderNodes = [
  { tag: 'Trigger', label: 'When a message arrives' },
  { tag: 'Action', label: 'Send WhatsApp or SMS' },
  { tag: 'AI', label: 'AI agent replies' },
]

const twilioCost = [
  { label: 'Base per-message rate', cls: 'twl-cost-seg--base', flex: 1 },
  { label: 'Carrier / pass-through fees', cls: 'twl-cost-seg--g1', flex: 1.15 },
  { label: '10DLC & compliance', cls: 'twl-cost-seg--g2', flex: 1.2 },
  { label: 'Add-ons (Flex, Segment)', cls: 'twl-cost-seg--g3', flex: 1.1 },
]

const siblings = [
  { slug: 'bird', name: 'Bird', domain: 'bird.com' },
  { slug: 'plivo', name: 'Plivo', domain: 'plivo.com' },
  { slug: 'infobip', name: 'Infobip', domain: 'infobip.com' },
]

const twilioCode = `import twilio from 'twilio'

const client = twilio(sid, token)

client.messages.create({
  to:   '+1 555 0134',
  from: '+1 555 0100',
  body: 'Your code: 4821',
})`

function CompareTwilio() {
const FAQS = [
  { q: 'How is SMSLocal different from Twilio?', a: 'Twilio is a developer-first API platform you assemble with code. SMSLocal is a no-code messaging platform - bulk SMS, a shared inbox, campaigns and automation all work from a dashboard, with a REST API available when you need it.' },
  { q: 'Do I need developers to use SMSLocal?', a: 'No. You can import contacts, build campaigns and run two-way conversations without writing code, whereas Twilio typically needs engineering time to build and maintain those flows yourself.' },
  { q: 'Can I still use an API with SMSLocal?', a: 'Yes. SMSLocal offers a REST API and pre-built integrations, so developers can send programmatically while non-technical teams work from the dashboard.' },
  { q: 'Will I get onboarding and support?', a: 'SMSLocal includes managed onboarding and responsive support, so you are set up quickly instead of piecing together documentation on your own.' },
]

  return (
    <>
      <Seo
        title="SMSLocal vs Twilio: Messaging & AI Compared"
        description="SMSLocal vs Twilio: an all-in-one, no-code platform with a shared inbox, managed onboarding and a REST API, versus Twilio's developer-first API."
        keywords={['SMSLocal vs Twilio', 'Twilio alternative', 'no-code Twilio alternative', 'CPaaS comparison']}
      />

      {/* 0 â€” HERO: code â†’ canvas morph */}
      <section className="twl-hero">
        <div className="container">
          <div className="twl-hero-copy">
            <span className="twl-hero-eyebrow">SMSLocal vs Twilio</span>
            <h1>The same channels, <span className="twl-grad">without writing the code</span></h1>
            <p className="twl-hero-sub">
              Twilio's APIs are the developer standard. SMSLocal delivers the same channels as a
              no-code platform â€” managed onboarding, a shared inbox and AI included.
            </p>
            <div className="twl-hero-actions">
              <Link to="/contact-us" className="btn btn-primary">Get Started Free</Link>
              <Link to="/compare" className="btn btn-ghost">Compare all</Link>
            </div>
            <div className="twl-hero-stats">
              <span className="twl-stat">10+ channels</span>
              <span className="twl-stat">No-code</span>
              <span className="twl-stat">Days to go live</span>
            </div>
          </div>

          <div className="twl-hero-visual">
            <figure className="twl-code">
              <figcaption className="twl-code-bar">
                <span className="twl-code-dots"><i /><i /><i /></span>
                <span className="twl-code-tag">
                  <CompareLogo name="Twilio" domain="twilio.com" /> Twilio API
                </span>
              </figcaption>
              <pre className="twl-code-body"><code>{twilioCode}</code></pre>
            </figure>

            <div className="twl-morph" aria-hidden="true">
              <svg className="twl-morph-svg" viewBox="0 0 40 64" width="40" height="64">
                <defs>
                  <linearGradient id="twlFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4f5bd5" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <line x1="20" y1="4" x2="20" y2="50" stroke="url(#twlFlow)" strokeWidth="3" strokeLinecap="round" />
                <path d="M13 46l7 8 7-8" fill="none" stroke="url(#twlFlow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle className="twl-morph-dot" cx="20" cy="6" r="3.6" fill="#fff" stroke="url(#twlFlow)" strokeWidth="2" />
              </svg>
              <span className="twl-morph-cap">no-code</span>
            </div>

            <figure className="twl-builder">
              <figcaption className="twl-builder-bar">
                <SmsLocalMark /> SMSLocal builder
              </figcaption>
              <div className="twl-nodes">
                {builderNodes.map((n, i) => (
                  <span className="twl-node-wrap" key={n.tag}>
                    <span className="twl-node">
                      <span className="twl-node-grip" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
                      <span className="twl-node-tag">{n.tag}</span>
                      <span className="twl-node-label">{n.label}</span>
                    </span>
                    {i < builderNodes.length - 1 && <span className="twl-node-conn" aria-hidden="true" />}
                  </span>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 1 â€” BUILD MODEL: diagonal two-tone split */}
      <section className="section section-alt">
        <div className="container">
          <div className="twl-head">
            <span className="twl-eyebrow">Build model</span>
            <h2>Write code, or just ship</h2>
          </div>

          <div className="twl-split">
            <span className="twl-split-fill them" aria-hidden="true" />
            <span className="twl-split-fill us" aria-hidden="true" />
            <svg className="twl-split-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="twlSeam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4f5bd5" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <line x1="57" y1="0" x2="43" y2="100" stroke="url(#twlSeam)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="twl-split-grid">
              <div className="twl-split-col them">
                <span className="twl-split-name">
                  <CompareLogo name="Twilio" domain="twilio.com" /> Twilio
                </span>
                <p>Developer-first APIs &amp; SDKs. You build and maintain the integration.</p>
                <div className="twl-split-chips">
                  <span className="twl-chip them">APIs</span>
                  <span className="twl-chip them">SDKs</span>
                  <span className="twl-chip them">Self-service 10DLC</span>
                </div>
              </div>

              <div className="twl-split-col us">
                <span className="twl-split-name">
                  <SmsLocalMark /> SMSLocal
                </span>
                <p>A no-code platform. Non-developers launch campaigns, chatbots and AI.</p>
                <div className="twl-split-chips">
                  <span className="twl-chip us">No-code builder</span>
                  <span className="twl-chip us">Shared inbox</span>
                  <span className="twl-chip us">Managed setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 â€” ASSEMBLY EQUATION */}
      <section className="section">
        <div className="container">
          <div className="twl-head">
            <span className="twl-eyebrow">What's included</span>
            <h2>Assemble it yourself, or get it in one</h2>
          </div>

          <div className="twl-eq">
            <div className="twl-eq-them">
              {twilioProducts.map((p, i) => (
                <span className="twl-eq-cell" key={p.name}>
                  <span className="twl-eq-tile">
                    <span className="twl-eq-ic">{p.icon}</span>
                    {p.name}
                  </span>
                  {i < twilioProducts.length - 1 && <span className="twl-eq-plus" aria-hidden="true">+</span>}
                </span>
              ))}
            </div>

            <span className="twl-eq-eq" aria-hidden="true">=</span>

            <div className="twl-eq-us">
              <SmsLocalMark />
              <span className="twl-eq-us-text">
                <strong>One platform</strong>
                <span>messaging + chatbot + AI + shared inbox</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 â€” COST STACK (qualitative, no numbers) */}
      <section className="section section-alt">
        <div className="container">
          <div className="twl-head">
            <span className="twl-eyebrow">The real cost</span>
            <h2>Compare the whole bill, not the base rate</h2>
          </div>

          <div className="twl-bars">
            <div className="twl-bar-col">
              <div className="twl-bar them" role="img" aria-label="Twilio total cost stack: base rate plus carrier fees, compliance and add-ons">
                {twilioCost.map((s) => (
                  <span className={`twl-cost-seg ${s.cls}`} style={{ flex: s.flex }} key={s.label}>{s.label}</span>
                ))}
              </div>
              <span className="twl-bar-foot">
                <CompareLogo name="Twilio" domain="twilio.com" /> Twilio
              </span>
            </div>

            <div className="twl-bar-col">
              <div className="twl-bar us" role="img" aria-label="SMSLocal cost: one transparent all-in plan">
                <span className="twl-cost-seg" style={{ flex: 1 }}>One transparent all-in plan</span>
              </div>
              <span className="twl-bar-foot">
                <SmsLocalMark /> SMSLocal
              </span>
            </div>
          </div>

          <p className="twl-cost-cap">
            Twilio publishes low base rates; real cost adds fees, compliance and separately-priced products.
          </p>
        </div>
      </section>

      {/* 4 â€” CLOSE: dark ink slab + crosslinks */}
      <CTABanner
        eyebrow="Get Started"
        title="Get the same reach without the code"
        subtitle="Every channel, a shared inbox and agentic AI in one no-code platform - onboarding managed for you."
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>SMSLocal vs Twilio, <span className="grad-word">answered</span></>}
        subtitle="Common questions about choosing SMSLocal over Twilio."
        items={FAQS}
        alt
      />

      <section className="section">
        <div className="container">
          <div className="twl-cross">
            <span className="twl-cross-label">Compare with others</span>
            <div className="twl-cross-row">
              {siblings.map((s) => (
                <Link className="twl-cross-chip" to={`/compare/${s.slug}`} key={s.slug}>
                  <CompareLogo name={s.name} domain={s.domain} /> vs {s.name}
                </Link>
              ))}
              <Link className="twl-cross-chip all" to="/compare">All comparisons â†’</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareTwilio
