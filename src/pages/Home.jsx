import Seo from '../components/Seo.jsx'
import HeroStars from '../components/HeroStars.jsx'
import DashboardPreview from '../components/DashboardPreview.jsx'
import HomeSteps from '../components/HomeSteps.jsx'
import ReviewBadges from '../components/ReviewBadges.jsx'
import ImpactStats from '../components/ImpactStats.jsx'
import TrustedBy from '../components/TrustedBy.jsx'
import AgenticShowcase from '../components/AgenticShowcase.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { Hero, Testimonials, FAQ } from '../components/sections/Sections.jsx'

const iconStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PRODUCTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" {...iconStroke}>
        <path d="M21 11.5a8.38 8.38 0 0 1-3.8 7.4A8.5 8.5 0 0 1 7 20.1L3 21l1.9-4a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8-8.5h.5a8.48 8.48 0 0 1 8 8v.3z" />
      </svg>
    ),
    title: 'Channels',
    desc: 'Bulk SMS, WhatsApp, RCS, Viber, Telegram, Instagram, Email and more — one API for every channel.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" {...iconStroke}>
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4" />
        <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
        <circle cx="9" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
        <path d="M9 17h6" />
      </svg>
    ),
    title: 'Chatbot',
    desc: 'No-code chatbots that answer, qualify and convert across every messaging channel, 24/7.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" {...iconStroke}>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    ),
    title: 'AI Agents',
    desc: 'Autonomous AI agents that resolve support, sales and voice conversations end to end.',
  },
]

const TESTIMONIALS = [
  { quote: 'We moved our OTP and order alerts to SMSLocal and delivery times dropped noticeably in the first week.', name: 'Aisha Rahman', role: 'Head of Engineering, Fintech startup' },
  { quote: 'The WhatsApp chatbot builder let our support team launch a bot without waiting on developers.', name: 'Daniel Cho', role: 'Customer Experience Lead, Retail' },
  { quote: 'Switching our SMS marketing campaigns over was painless — the API docs are genuinely good.', name: 'Priya Nair', role: 'Growth Marketer, D2C brand' },
]

const FAQS = [
  { q: 'What channels does SMSLocal support?', a: 'SMS, WhatsApp Business API, RCS, Viber, Telegram, Instagram, Facebook Messenger, Apple Messages, LINE and email — all from one dashboard and API.' },
  { q: 'Do I need to code to use SMSLocal?', a: 'No. Use the no-code dashboard and chatbot builder to send campaigns and build bots, or use our REST API if you prefer to integrate programmatically.' },
  { q: 'Is there a free trial?', a: 'Yes, you can start free with trial credits — no credit card required.' },
  { q: 'How fast is delivery?', a: 'Most messages are delivered in under a second on supported routes, backed by carrier-grade infrastructure.' },
  { q: 'Can I use SMSLocal for OTP and two-factor authentication?', a: 'Yes, our OTP SMS API includes voice and WhatsApp fallback to maximize verification success rates.' },
  { q: 'Does SMSLocal offer AI agents as well as chatbots?', a: 'Yes. Chatbots handle scripted flows; AI agents act autonomously to resolve support, sales and voice conversations — see our chatbot vs AI agent comparison to choose the right fit.' },
]

function Home() {
  return (
    <>
      <Seo
        title="Bulk SMS, Chatbot & AI Agent Platform"
        description="SMSLocal is a business messaging platform for bulk SMS, OTP, WhatsApp, chatbots and autonomous AI agents — all from one API."
      />

      <div className="home-hero">
        <HeroStars />
        <Hero
          eyebrow="Business Messaging Platform"
          title="Reach every customer with SMS, chatbot and AI agents"
          subtitle="One platform to send bulk SMS and OTPs, build no-code chatbots, and deploy autonomous AI agents — across every channel your customers use."
          primaryCta={{ label: 'Start Free Trial', href: '/contact' }}
          secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        />
      </div>

      <div className="reveal">
        <ReviewBadges />
      </div>

      <div className="reveal">
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">One platform, three product lines</h2>
            <p className="section-subtitle">Messaging channels, chatbots, and AI agents — built to work together.</p>
          </div>

          <DashboardPreview />

          <div className="container">
            <div className="feature-grid">
              {PRODUCTS.map((item) => (
                <div className="feature-card" key={item.title}>
                  <span className="feature-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="reveal">
        <TrustedBy />
      </div>

      <div className="reveal">
        <ImpactStats />
      </div>

      <div className="reveal">
        <AgenticShowcase />
      </div>

      <div className="reveal">
        <HomeSteps />
      </div>

      <div className="reveal">
        <Testimonials title="Trusted by growing businesses" items={TESTIMONIALS} />
      </div>

      <div className="reveal">
        <FAQ title="Frequently asked questions" items={FAQS} alt />
      </div>

      <div className="reveal">
        <FinalCta />
      </div>
    </>
  )
}

export default Home
