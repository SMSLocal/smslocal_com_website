import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { CompareLogo, SmsLocalMark } from '../components/CompareLogo.jsx'
import './CompareTwixor.css'

const Arrow = ({ className = 'twx-arrow' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

const IconNoCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.6" />
    <rect x="14" y="3" width="7" height="7" rx="1.6" />
    <rect x="3" y="14" width="7" height="7" rx="1.6" />
    <path d="M17.5 14.5v6M14.5 17.5h6" />
  </svg>
)

const IconDays = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" />
    <path d="M12.6 11.5l-2.2 3.2H13l-2 3" />
  </svg>
)

const IconPricing = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12.6V5a2 2 0 0 1 2-2h7.6a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8l-7.6 7.6a2 2 0 0 1-2.8 0L3.6 14a2 2 0 0 1-.6-1.4z" />
    <circle cx="7.6" cy="7.6" r="1.3" />
  </svg>
)

const IconChannels = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5v5A1.5 1.5 0 0 1 14.5 12H8l-4 3.4V5.5z" />
    <path d="M18.5 13v5M21 15.5h-5" />
  </svg>
)

const IconOnboarding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13.5v-1.5a7 7 0 0 1 14 0v1.5" />
    <rect x="3.4" y="13" width="3.6" height="6" rx="1.6" />
    <rect x="17" y="13" width="3.6" height="6" rx="1.6" />
    <path d="M19 19a4 4 0 0 1-4 3h-2" />
  </svg>
)

const IconInbox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 13l2.4-8.2A2 2 0 0 1 7.3 3.4h9.4a2 2 0 0 1 1.9 1.4L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M3 13h5l1.4 2.4h5.2L16 13h5" />
  </svg>
)

const HERO_STATS = ['10+ channels', 'No-code', 'Days to go live']

const THEM_STEPS = ['Discovery', 'Solution design', 'Integration', 'UAT', 'Go-live']
const US_STEPS = ['Sign up', 'We verify your senders', 'Go live']

const BENTO = [
  { cls: 'twx-cell--lg', icon: <IconNoCode />, title: 'No-code, non-developers ship', desc: 'Marketers and ops build and launch on their own.' },
  { cls: 'twx-cell--wide', icon: <IconDays />, title: 'Live in days', desc: 'Onboard fast â€” no rollout project.' },
  { cls: '', icon: <IconPricing />, title: 'Transparent pricing', desc: 'Clear plans, no negotiation.' },
  { cls: '', icon: <IconChannels />, title: 'Broader consumer channels', desc: 'More messaging apps in one plan.' },
  { cls: 'twx-cell--wide', icon: <IconOnboarding />, title: 'Managed onboarding', desc: 'We set up and verify with you.' },
  { cls: 'twx-cell--wide', icon: <IconInbox />, title: 'Shared inbox included', desc: 'One team inbox for every channel.' },
]

const CORE_CHANNELS = ['WhatsApp', 'RCS', 'SMS', 'Telegram', 'Messenger', 'Voice']
const ADDED_CHANNELS = ['Viber', 'Instagram', 'Apple Messages', 'LINE', 'Email']

const SIBLINGS = [
  { name: 'Haptik', domain: 'haptik.ai', slug: 'haptik' },
  { name: 'Twilio', domain: 'twilio.com', slug: 'twilio' },
  { name: 'Infobip', domain: 'infobip.com', slug: 'infobip' },
]

function CompareTwixor() {
const FAQS = [
  { q: 'How does SMSLocal compare to Twixor?', a: 'Both offer omnichannel messaging and automation. SMSLocal pairs 10+ channels with a no-code builder, a shared inbox and agentic AI, plus managed onboarding.' },
  { q: 'Do I need a technical integration to launch?', a: 'No. SMSLocal is designed for no-code setup, so you can launch omnichannel journeys without an integration project.' },
  { q: 'Which channels does SMSLocal support?', a: 'SMS, WhatsApp, RCS, Viber and more, all managed from one dashboard with a single customer record.' },
  { q: 'What support do I get during setup?', a: 'Managed onboarding and responsive support help you go live in days rather than weeks.' },
]

  return (
    <>
      <Seo
        title="SMSLocal vs Twixor"
        description="SMSLocal vs Twixor: an all-in-one, no-code messaging and AI platform for growing teams, versus Twixor's enterprise CX and process-automation platform."
        keywords={['SMSLocal vs Twixor', 'Twixor alternative', 'Twixor competitor', 'CX automation comparison']}
      />

      {/* 0 â€” HERO: two-track race */}
      <section className="section twx-hero">
        <div className="container twx-hero-grid">
          <div className="twx-hero-copy">
            <span className="twx-eyebrow">SMSLocal vs Twixor</span>
            <h1 className="twx-h1">
              Omnichannel messaging + AI, <span className="twx-grad">without an enterprise rollout</span>
            </h1>
            <p className="twx-sub">
              Twixor is strong at enterprise process automation. SMSLocal gives growing teams messaging,
              no-code chatbots and AI â€” transparent pricing, fast self-serve onboarding.
            </p>
            <div className="twx-cta-row">
              <Link to="/contact-us" className="btn btn-primary">Get Started Free</Link>
              <Link to="/compare" className="btn btn-ghost">Compare all</Link>
            </div>
            <div className="twx-stats">
              {HERO_STATS.map((s) => (
                <span className="twx-stat" key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className="twx-race" aria-label="SMSLocal goes live in days; Twixor is a longer enterprise rollout">
            <div className="twx-track">
              <div className="twx-track-head">
                <SmsLocalMark />
                <b>SMSLocal</b>
                <span className="twx-track-note twx-track-note--us">Days</span>
              </div>
              <div className="twx-lane twx-lane--us" aria-hidden="true">
                <span className="twx-rail twx-rail--us" />
                <span className="twx-tick twx-tick--us" style={{ left: '14%' }} />
                <span className="twx-tick twx-tick--us" style={{ left: '48%' }} />
                <span className="twx-flag">LIVE</span>
                <span className="twx-runner twx-runner--us" />
              </div>
              <span className="twx-lane-cap">Sign up, verify, go live</span>
            </div>

            <div className="twx-track">
              <div className="twx-track-head">
                <CompareLogo name="Twixor" domain="twixor.com" />
                <b>Twixor</b>
                <span className="twx-track-note twx-track-note--them">Months</span>
              </div>
              <div className="twx-lane twx-lane--them" aria-hidden="true">
                <span className="twx-rail twx-rail--them" />
                <span className="twx-tick twx-tick--them" style={{ left: '8%' }} />
                <span className="twx-tick twx-tick--them" style={{ left: '24%' }} />
                <span className="twx-tick twx-tick--them" style={{ left: '40%' }} />
                <span className="twx-tick twx-tick--them" style={{ left: '56%' }} />
                <span className="twx-tick twx-tick--them" style={{ left: '72%' }} />
                <span className="twx-tick twx-tick--them" style={{ left: '88%' }} />
                <span className="twx-runner twx-runner--them" style={{ left: '24%' }} />
              </div>
              <span className="twx-lane-cap">Enterprise rollout, stages ahead</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1 â€” Rollout vs self-serve tracks */}
      <section className="section section-alt">
        <div className="container">
          <div className="twx-head">
            <span className="twx-eyebrow">Time to live</span>
            <h2 className="twx-h2">Days, not a rollout</h2>
          </div>

          <div className="twx-tracks">
            <div className="twx-trow">
              <div className="twx-trow-label">
                <CompareLogo name="Twixor" domain="twixor.com" />
                <span><b>Twixor</b><small>Sales-led rollout</small></span>
              </div>
              <div className="twx-chain-scroll">
                <div className="twx-chain">
                  {THEM_STEPS.map((s, i) => (
                    <span className="twx-seg" key={s}>
                      {i > 0 && <Arrow className="twx-arrow" />}
                      <span className="twx-node twx-node--muted">{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="twx-trow">
              <div className="twx-trow-label">
                <SmsLocalMark />
                <span><b>SMSLocal</b><small>Self-serve</small></span>
              </div>
              <div className="twx-chain-scroll">
                <div className="twx-chain">
                  {US_STEPS.map((s, i) => (
                    <span className="twx-seg" key={s}>
                      {i > 0 && <Arrow className="twx-arrow twx-arrow--us" />}
                      <span className="twx-node twx-node--grad">{s}</span>
                    </span>
                  ))}
                  <span className="twx-pill">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 â€” Bento differentiators */}
      <section className="section">
        <div className="container">
          <div className="twx-head">
            <span className="twx-eyebrow">Why switch</span>
            <h2 className="twx-h2">Why teams pick SMSLocal</h2>
          </div>

          <div className="twx-bento">
            {BENTO.map((b) => (
              <div className={`twx-cell ${b.cls}`} key={b.title}>
                <span className="twx-cell-ic">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 â€” Channel chip-cloud */}
      <section className="section section-alt">
        <div className="container">
          <div className="twx-head">
            <span className="twx-eyebrow">Reach</span>
            <h2 className="twx-h2">The channels you add</h2>
          </div>

          <div className="twx-cloud">
            {CORE_CHANNELS.map((c) => (
              <span className="twx-chip" key={c}>{c}</span>
            ))}
            {ADDED_CHANNELS.map((c, i) => (
              <span className="twx-chip twx-chip--add" style={{ animationDelay: `${i * 0.35}s` }} key={c}>
                <span className="twx-chip-plus" aria-hidden="true">+</span>
                {c}
              </span>
            ))}
          </div>
          <p className="twx-cloud-cap">
            Everything Twixor's core set covers, plus more consumer channels â€” in one plan.
          </p>
        </div>
      </section>

      {/* 4 â€” Close: split CTA + crosslinks */}
      <CTABanner
        eyebrow="Get Started"
        title="Launch omnichannel messaging in days"
        subtitle="No integration project - no-code building, managed onboarding and agentic AI across 10+ channels."
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>SMSLocal vs Twixor, <span className="grad-word">answered</span></>}
        subtitle="Common questions about choosing SMSLocal over Twixor."
        items={FAQS}
        alt
      />

      <section className="section">
        <div className="container">
          <div className="twx-cross">
            <span className="twx-cross-label">Compare with others</span>
            <div className="twx-cross-row">
              {SIBLINGS.map((s) => (
                <Link className="twx-cross-chip" to={`/compare/${s.slug}`} key={s.slug}>
                  <CompareLogo name={s.name} domain={s.domain} />
                  vs {s.name}
                </Link>
              ))}
              <Link className="twx-cross-chip twx-cross-chip--all" to="/compare">All comparisons â†’</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareTwixor
