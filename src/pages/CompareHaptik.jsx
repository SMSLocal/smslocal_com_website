import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { CompareLogo, SmsLocalMark } from '../components/CompareLogo.jsx'
import './CompareHaptik.css'

const Check = () => (
  <svg
    className="hpk-check"
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l4 4L19 6" />
  </svg>
)

// Radiating channel order for the hero burst (index maps to an orbit position).
const BURST = [
  'WhatsApp', 'Telegram', 'RCS', 'LINE', 'Instagram',
  'Messenger', 'Apple', 'SMS', 'Viber', 'Email',
]

const ALL_CHANNELS = [
  'SMS', 'WhatsApp', 'RCS', 'Viber', 'Telegram',
  'Instagram', 'Messenger', 'Apple', 'LINE', 'Email',
]
const HAPTIK_ACTIVE = ['WhatsApp', 'Instagram', 'Messenger', 'RCS']

const REASONS = [
  {
    n: '01',
    title: 'Every channel in one plan',
    body: 'SMS, WhatsApp, RCS, Viber, Telegram, Instagram, Apple Messages, LINE and Email â€” not just chat surfaces.',
  },
  {
    n: '02',
    title: 'Live in days, managed',
    body: 'We handle Meta/WhatsApp verification and setup â€” no procurement cycle.',
  },
  {
    n: '03',
    title: 'Transparent pricing',
    body: 'Published, self-serve plans instead of a custom enterprise quote.',
  },
]

const SIBLINGS = [
  { name: 'Twilio', domain: 'twilio.com', slug: 'twilio' },
  { name: 'Twixor', domain: 'twixor.com', slug: 'twixor' },
  { name: 'Infobip', domain: 'infobip.com', slug: 'infobip' },
]

function CompareHaptik() {
const FAQS = [
  { q: 'How does SMSLocal compare to Haptik?', a: 'Haptik focuses on conversational AI and chatbots. SMSLocal combines messaging channels - bulk SMS, WhatsApp and a two-way inbox - with a no-code chatbot builder and agentic AI in one platform.' },
  { q: 'Can I build a chatbot without code on SMSLocal?', a: 'Yes. Chatbots and automated flows are built visually from templates, with the option to add custom logic through the API.' },
  { q: 'Does SMSLocal handle bulk messaging as well as AI?', a: 'Yes. Bulk campaigns, transactional messaging and AI conversations run from the same dashboard rather than separate tools.' },
  { q: 'How is pricing structured?', a: 'SMSLocal uses transparent, usage-based pricing with a free trial credit, so you can test the platform before committing.' },
]

  return (
    <>
      <Seo
        title="SMSLocal vs Haptik"
        description="SMSLocal vs Haptik: all-in-one omnichannel messaging, no-code chatbots and agentic AI with transparent pricing, versus Haptik's enterprise conversational-AI platform."
        keywords={['SMSLocal vs Haptik', 'Haptik alternative', 'Haptik competitor', 'conversational AI comparison']}
      />

      {/* 0 â€” HERO: channel burst */}
      <section className="hpk-hero">
        <div className="container hpk-hero-grid">
          <div className="hpk-hero-copy">
            <span className="hpk-eyebrow">SMSLocal vs Haptik</span>
            <h1 className="hpk-h1">
              All-in-one messaging + AI, <span className="hpk-grad">without the enterprise overhead</span>
            </h1>
            <p className="hpk-sub">
              Haptik is a strong enterprise conversational-AI platform. SMSLocal puts messaging, chatbots and AI in
              one plan â€” transparent pricing, live in days.
            </p>
            <div className="hpk-hero-cta">
              <Link to="/contact-us" className="hpk-btn hpk-btn--primary">Get Started Free</Link>
              <Link to="/compare" className="hpk-btn hpk-btn--ghost">Compare all</Link>
            </div>
            <div className="hpk-stats">
              <span className="hpk-stat">10+ channels</span>
              <span className="hpk-stat">No-code</span>
              <span className="hpk-stat">Days to go live</span>
            </div>
          </div>

          <div className="hpk-hero-visual">
            <div className="hpk-burst">
              <span className="hpk-burst-ring" aria-hidden="true" />
              <span className="hpk-burst-ring hpk-burst-ring--2" aria-hidden="true" />
              <div className="hpk-burst-core">
                <SmsLocalMark />
                <span className="hpk-burst-core-label">SMSLocal</span>
              </div>
              {BURST.map((name, i) => (
                <span className={`hpk-orbit hpk-orbit--${i}`} key={name}>
                  <span className="hpk-chip">{name}</span>
                </span>
              ))}
            </div>

            <div className="hpk-mini">
              <span className="hpk-mini-head">
                <CompareLogo name="Haptik" domain="haptik.ai" />
                <span className="hpk-mini-name">Haptik</span>
              </span>
              <span className="hpk-mini-chips">
                {HAPTIK_ACTIVE.map((n) => (
                  <span className="hpk-mini-chip" key={n}>{n}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 1 â€” COVERAGE BOARD */}
      <section className="hpk-cov">
        <div className="container">
          <span className="hpk-kicker">Coverage</span>
          <h2 className="hpk-h2">Every channel, in one place</h2>

          <div className="hpk-cov-row">
            <div className="hpk-cov-label">
              <SmsLocalMark />
              <span className="hpk-cov-name">SMSLocal</span>
            </div>
            <div className="hpk-cov-chips">
              {ALL_CHANNELS.map((n) => (
                <span className="hpk-cch hpk-cch--on" key={n}><Check />{n}</span>
              ))}
            </div>
          </div>

          <div className="hpk-cov-div" aria-hidden="true" />

          <div className="hpk-cov-row">
            <div className="hpk-cov-label">
              <CompareLogo name="Haptik" domain="haptik.ai" />
              <span className="hpk-cov-name">Haptik</span>
            </div>
            <div className="hpk-cov-chips">
              {ALL_CHANNELS.map((n) => {
                const on = HAPTIK_ACTIVE.includes(n)
                return (
                  <span className={`hpk-cch ${on ? 'hpk-cch--on' : 'hpk-cch--off'}`} key={n}>
                    {on && <Check />}{n}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2 â€” MANIFESTO INDEX */}
      <section className="hpk-why">
        <div className="container">
          <span className="hpk-kicker">Why switch</span>
          <h2 className="hpk-h2">Three reasons teams move to SMSLocal</h2>
          <div className="hpk-index">
            {REASONS.map((r) => (
              <div className="hpk-idx" key={r.n}>
                <span className="hpk-idx-num">{r.n}</span>
                <div className="hpk-idx-body">
                  <h3 className="hpk-idx-title">{r.title}</h3>
                  <p className="hpk-idx-line">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 â€” POSITIONING SPECTRUM */}
      <section className="hpk-spec">
        <div className="container">
          <span className="hpk-kicker">Which fits you</span>
          <h2 className="hpk-h2">Right platform for your size</h2>

          <div className="hpk-axis-wrap">
            <div className="hpk-axis">
              <span className="hpk-axis-line" aria-hidden="true" />
              <div className="hpk-band">
                <SmsLocalMark />
                <span className="hpk-band-name">SMSLocal</span>
              </div>
              <div className="hpk-marker">
                <CompareLogo name="Haptik" domain="haptik.ai" />
                <span className="hpk-marker-name">Haptik</span>
              </div>
            </div>
            <div className="hpk-axis-labels">
              <span>SMB</span>
              <span>Mid-market</span>
              <span>Enterprise</span>
            </div>
          </div>

          <div className="hpk-spec-caps">
            <p className="hpk-cap"><strong>SMSLocal</strong> Built for growing teams, one platform.</p>
            <p className="hpk-cap">
              <strong>Haptik</strong> Built around large enterprises &amp; major global brands (reaches SMBs via
              separate products).
            </p>
          </div>
        </div>
      </section>

      {/* 4 â€” CLOSE: gradient-tinted CTA band + crosslinks */}
      <CTABanner
        eyebrow="Get Started"
        title="Get messaging and AI live in days"
        subtitle="Every channel, a no-code chatbot builder and agentic AI - one platform, transparent pricing."
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>SMSLocal vs Haptik, <span className="grad-word">answered</span></>}
        subtitle="Common questions about choosing SMSLocal over Haptik."
        items={FAQS}
        alt
      />

      <section className="section">
        <div className="container">
          <div className="hpk-cross">
            <span className="hpk-cross-label">Compare with others</span>
            <div className="hpk-cross-row">
              {SIBLINGS.map((s) => (
                <Link className="hpk-cross-chip" to={`/compare/${s.slug}`} key={s.slug}>
                  <CompareLogo name={s.name} domain={s.domain} />
                  vs {s.name}
                </Link>
              ))}
              <Link className="hpk-cross-chip hpk-cross-chip--all" to="/compare">All comparisons â†’</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareHaptik
