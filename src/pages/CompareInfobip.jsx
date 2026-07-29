import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { CompareLogo, SmsLocalMark } from '../components/CompareLogo.jsx'
import './CompareInfobip.css'

const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l4 4L19 6" />
  </svg>
)

const HERO_MODULES = ['Moments', 'Answers', 'Conversations', 'People', 'AgentOS']

const MODULES = [
  { name: 'Moments', role: 'engagement' },
  { name: 'Answers', role: 'chatbot' },
  { name: 'Conversations', role: 'contact center' },
  { name: 'People', role: 'CDP' },
  { name: 'AgentOS', role: 'agentic AI' },
]

const SPOTLIGHT = [
  { us: 'One unified plan', them: 'Separate modules to assemble' },
  { us: 'No-code â€” non-developers ship', them: 'Developer & enterprise-oriented' },
  { us: 'Transparent, self-serve pricing', them: 'Mostly quote-based at platform level' },
  { us: 'Managed onboarding, live in days', them: 'Sales-led for larger rollouts' },
]

const SIBLINGS = [
  { name: 'Bird', domain: 'bird.com', slug: 'bird' },
  { name: 'Twilio', domain: 'twilio.com', slug: 'twilio' },
  { name: 'Plivo', domain: 'plivo.com', slug: 'plivo' },
]

function CompareInfobip() {
const FAQS = [
  { q: 'How is SMSLocal different from Infobip?', a: 'Infobip is a large enterprise CPaaS suite. SMSLocal delivers the core channels most teams actually need - SMS, WhatsApp, a shared inbox and automation - in a simpler no-code plan with managed onboarding.' },
  { q: 'Is SMSLocal suitable for smaller teams?', a: 'Yes. SMSLocal is right-sized for teams that want enterprise-grade delivery without a lengthy enterprise procurement or integration project.' },
  { q: 'Does SMSLocal support omnichannel messaging?', a: 'Yes. You can reach customers across SMS, WhatsApp and other channels from one inbox, with a single customer record across all of them.' },
  { q: 'How quickly can I get started?', a: 'Most teams are live in minutes with a free trial, and onboarding is managed for you.' },
]

  return (
    <>
      <Seo
        title="SMSLocal vs Infobip: Messaging & AI Compared"
        description="SMSLocal vs Infobip: a no-code messaging platform with a shared inbox, automation and agentic AI in one plan, versus Infobip's enterprise CPaaS modules."
        keywords={['SMSLocal vs Infobip', 'Infobip alternative', 'Infobip competitor', 'CPaaS comparison']}
      />

      {/* 0 â€” HERO: many modules converge into one plan */}
      <section className="ibp-hero">
        <div className="container ibp-hero-inner">
          <div className="ibp-hero-copy">
            <span className="ibp-eyebrow">SMSLocal vs Infobip</span>
            <h1 className="ibp-hero-title">
              Enterprise-grade channels, <span className="ibp-grad">right-sized for growing teams</span>
            </h1>
            <p className="ibp-hero-sub">
              Infobip is a global enterprise CPaaS with huge reach. SMSLocal gives growing teams the
              channels, chatbots and AI they actually need â€” one plan, no-code, transparent pricing.
            </p>
            <div className="ibp-hero-actions">
              <Link to="/contact-us" className="btn btn-primary">Get Started Free</Link>
              <Link to="/compare" className="btn btn-ghost">Compare all</Link>
            </div>
            <div className="ibp-hero-stats">
              <div className="ibp-stat"><strong>10+</strong><span>channels</span></div>
              <div className="ibp-stat ibp-stat-solo"><strong>No-code</strong></div>
              <div className="ibp-stat"><strong>Days</strong><span>to go live</span></div>
            </div>
          </div>

          <div className="ibp-hero-visual" aria-hidden="true">
            <div className="ibp-merge">
              <div className="ibp-merge-side">
                <span className="ibp-merge-tag">
                  <CompareLogo name="Infobip" domain="infobip.com" />
                  Infobip modules
                </span>
                <div className="ibp-merge-mods">
                  {HERO_MODULES.map((m) => (
                    <span className="ibp-merge-mod" key={m}>{m}</span>
                  ))}
                </div>
              </div>

              <svg className="ibp-merge-flow" viewBox="0 0 100 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ibpFlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="var(--blue)" />
                    <stop offset="1" stopColor="var(--cyan)" />
                  </linearGradient>
                </defs>
                <path className="ibp-flow-line" d="M2 18 C 52 18, 62 110, 98 110" />
                <path className="ibp-flow-line" d="M2 64 C 52 64, 72 110, 98 110" />
                <path className="ibp-flow-line" d="M2 110 L 98 110" />
                <path className="ibp-flow-line" d="M2 156 C 52 156, 72 110, 98 110" />
                <path className="ibp-flow-line" d="M2 202 C 52 202, 62 110, 98 110" />
              </svg>

              <span className="ibp-merge-down" />

              <div className="ibp-merge-one">
                <SmsLocalMark />
                <span className="ibp-merge-one-label">One plan</span>
                <span className="ibp-merge-one-sub">SMSLocal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 â€” MODULE vs UNIFIED */}
      <section className="ibp-pack section-alt">
        <div className="container">
          <span className="ibp-eyebrow">Packaging</span>
          <h2 className="ibp-h2">One plan, not five modules</h2>

          <div className="ibp-pack-grid">
            <div className="ibp-pack-them">
              <div className="ibp-pack-mods">
                {MODULES.map((m) => (
                  <span className="ibp-pack-mod" key={m.name}>
                    <b>{m.name}</b>
                    <em>{m.role}</em>
                  </span>
                ))}
              </div>
              <p className="ibp-pack-note">licensed &amp; integrated separately</p>
            </div>

            <div className="ibp-pack-divide" aria-hidden="true">
              <span className="ibp-pack-vs">vs</span>
            </div>

            <div className="ibp-pack-us">
              <div className="ibp-pack-plan">
                <span className="ibp-pack-plan-head">
                  <SmsLocalMark />
                  <span>One SMSLocal plan</span>
                </span>
                <ul className="ibp-pack-plan-list">
                  <li><i><Check /></i>Messaging</li>
                  <li><i><Check /></i>No-code chatbot</li>
                  <li><i><Check /></i>Agentic AI</li>
                  <li><i><Check /></i>Shared inbox</li>
                </ul>
                <span className="ibp-pack-plan-foot">one unit â€” no assembly required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 â€” SPOTLIGHT ROWS */}
      <section className="ibp-spot">
        <div className="container">
          <span className="ibp-eyebrow">Why switch</span>
          <h2 className="ibp-h2">What growing teams get</h2>

          <div className="ibp-spot-rows">
            {SPOTLIGHT.map((r) => (
              <div className="ibp-spot-row" key={r.us}>
                <div className="ibp-spot-us">
                  <i className="ibp-spot-check" aria-hidden="true"><Check /></i>
                  <span>{r.us}</span>
                </div>
                <span className="ibp-spot-vs" aria-hidden="true">vs</span>
                <div className="ibp-spot-them">
                  <span className="ibp-spot-dot" aria-hidden="true" />
                  {r.them}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 â€” RIGHT-SIZED VERDICT */}
      <section className="ibp-verdict section-alt">
        <div className="container ibp-verdict-inner">
          <span className="ibp-eyebrow">Honest take</span>
          <h2 className="ibp-verdict-title">
            You don&apos;t need a full enterprise stack to run great messaging.
          </h2>
          <p className="ibp-verdict-sub">
            SMSLocal covers 10+ channels with reliable global delivery, no-code building and agentic
            AI â€” in one plan.
          </p>

          <div className="ibp-note">
            <span className="ibp-note-tag">Honest note</span>
            <p>
              Infobip may fit better if you need maximum global carrier scale across many countries,
              or a full enterprise contact-center and CDP stack.
            </p>
          </div>
        </div>
      </section>

      {/* 4 â€” CLOSE */}
      <CTABanner
        eyebrow="Get Started"
        title="Enterprise-grade channels, right-sized"
        subtitle="Messaging, chatbots and agentic AI in one no-code plan - transparent pricing, managed onboarding."
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>SMSLocal vs Infobip, <span className="grad-word">answered</span></>}
        subtitle="Common questions about choosing SMSLocal over Infobip."
        items={FAQS}
        alt
      />

      <section className="section">
        <div className="container">
          <div className="ibp-cross">
            <span className="ibp-cross-label">Compare with others</span>
            <div className="ibp-cross-row">
              {SIBLINGS.map((s) => (
                <Link className="ibp-cross-chip" to={`/compare/${s.slug}`} key={s.slug}>
                  <CompareLogo name={s.name} domain={s.domain} />
                  vs {s.name}
                </Link>
              ))}
              <Link className="ibp-cross-chip ibp-cross-all" to="/compare">All comparisons â†’</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareInfobip
