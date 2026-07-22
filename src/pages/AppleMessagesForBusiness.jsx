import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCalendar, IconDollar, IconShield, IconChat, IconMail, IconUsers, IconLink } from '../components/icons.jsx'
import AppleMessagesHeroMock from '../components/AppleMessagesHeroMock.jsx'
import './AppleMessagesForBusiness.css'

const FORMATS = [
  { icon: <IconCalendar />, title: 'List & time pickers', desc: 'Customers tap a slot, size or option right inside the thread — no forms, no links out.' },
  { icon: <IconDollar />, title: 'Apple Pay', desc: 'Take a deposit or full payment without the customer ever leaving Messages.' },
  { icon: <IconChat />, title: 'Rich links & tapbacks', desc: 'Branded link previews, images and reaction tapbacks — not plain grey texts.' },
  { icon: <IconShield />, title: 'Verified brand', desc: 'Your name, logo and colour sit at the top of every conversation.' },
]

const DIRECT = [
  'Apply as your own Messages Service Provider',
  'Wait through Apple’s review and verification',
  'Build list pickers and Apple Pay yourself',
  'No shared inbox with your other channels',
]
const ONUS = [
  'Send through our already-approved MSP status',
  'Live as soon as your business is verified',
  'List pickers, time pickers and Apple Pay, ready-made',
  'Sits beside WhatsApp, SMS and email in one inbox',
]

const STEPS = [
  { title: 'Get Apple-approved', desc: 'We handle the Messages Service Provider application and Apple review for you.' },
  { title: 'Design rich replies', desc: 'Build list pickers, time pickers and Apple Pay prompts from templates.' },
  { title: 'Go live in one inbox', desc: 'Every Business Chat conversation lands beside your other channels.' },
]

const WHY = [
  { icon: <IconShield />, title: 'We are the approved path', desc: 'Apple requires an approved Messages Service Provider — that paperwork and review is on us, not you.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same Business Chat inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply carries real order and customer context.' },
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Apple Messages sits beside WhatsApp, SMS and email in the same shared inbox.' },
]

const TESTIMONIALS = [
  { quote: 'Letting customers pick an appointment slot right inside Messages, with no app to download, cut our no-show rate noticeably.', name: 'Claire Bennett', role: 'Ops Manager, Salon chain' },
  { quote: 'The Apple approval process looked intimidating until SMSLocal ran the whole MSP application for us.', name: 'Marcus Lee', role: 'Founder, D2C brand' },
  { quote: 'Taking a deposit with Apple Pay inside the chat removed a step that used to lose us bookings.', name: 'Ana Popescu', role: 'Customer Experience Lead' },
]

const FAQS = [
  { q: 'What is Apple Messages for Business?', a: 'It is the official way for businesses to chat with customers inside the Messages app on iPhone, using rich formats like list pickers, time pickers and Apple Pay.' },
  { q: 'Do I need Apple approval to use this?', a: 'Yes — Apple requires businesses to send through an approved Messages Service Provider. We are that approved provider, and we handle the application for you.' },
  { q: 'Can customers pay inside the conversation?', a: 'Yes, Apple Pay can be triggered directly inside the chat for deposits, orders or invoices, without the customer leaving Messages.' },
  { q: 'Can I manage Apple Messages alongside WhatsApp and SMS?', a: 'Yes, Apple Messages sits beside WhatsApp, SMS and other channels in the same shared inbox, with one customer record across all of them.' },
]

function AppleMessagesForBusiness() {
  return (
    <>
      <Seo
        title="Apple Messages for Business"
        description="Reach customers in the Messages app on iPhone. Rich links, Apple Pay, appointments and reactions — delivered through an approved provider."
        keywords={['iMessage for business', 'Apple Messages for Business API', 'iMessage business API', 'Messages for Business provider']}
      />

      <Hero
        eyebrow="Apple Messages"
        title={<>Native <span className="grad-word">iMessage</span> business chat, sent through an approved provider</>}
        subtitle="Rich links, list pickers, Apple Pay and reactions — delivered to the Messages app customers already trust, with Apple's required approval handled for you."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AppleMessagesHeroMock />}
      />

      {/* INNER 1 — rich formats: open 4-column band with hairline dividers */}
      <section className="section am-formats">
        <div className="container">
          <span className="section-kicker">Rich formats</span>
          <h2 className="section-title">Messages that do more than say hello</h2>
          <div className="am-format-band">
            {FORMATS.map((f) => (
              <div className="am-format" key={f.title}>
                <span className="am-format-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INNER 2 — the approval gate: two lists split by a checkpoint badge */}
      <section className="section section-alt am-gate">
        <div className="container">
          <span className="section-kicker">The catch</span>
          <h2 className="section-title">Apple decides who can send. We are already through the gate.</h2>
          <p className="section-subtitle am-gate-sub">Apple Messages for Business isn’t an open API — every message must go through an approved Messages Service Provider. The bottleneck isn’t the chat, it’s the approval.</p>
          <div className="am-gate-grid">
            <div className="am-gate-col am-gate-col--direct">
              <span className="am-gate-label">Going direct</span>
              <ul>
                {DIRECT.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
            <div className="am-gate-badge" aria-hidden="true">
              <span className="am-gate-lock">✓</span>
              <span>Apple-approved MSP</span>
            </div>
            <div className="am-gate-col am-gate-col--us">
              <span className="am-gate-label">On SMSLocal</span>
              <ul>
                {ONUS.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INNER 3 — how it works: vertical timeline rail */}
      <section className="section am-steps">
        <div className="container">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title">Go live on Apple Messages in three steps</h2>
          <ol className="am-timeline">
            {STEPS.map((s, i) => (
              <li className="am-tl-item" key={s.title}>
                <span className="am-tl-node">{i + 1}</span>
                <div className="am-tl-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INNER 4 — why us: quadrant with center cross */}
      <section className="section section-alt am-why">
        <div className="container">
          <span className="section-kicker">Why us</span>
          <h2 className="section-title">Why brands choose SMSLocal as their MSP</h2>
          <div className="am-quad">
            {WHY.map((w) => (
              <div className="am-quad-cell" key={w.title}>
                <span className="am-quad-icon">{w.icon}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Bring your brand into iMessage the right way"
        subtitle="We handle Apple's approval — you handle the conversation."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>Apple Messages for Business — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AppleMessagesForBusiness
