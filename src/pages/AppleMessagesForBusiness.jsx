import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCalendar, IconDollar, IconShield, IconBrain, IconMail, IconLink, IconUsers, IconChat, IconBolt, IconPencil } from '../components/icons.jsx'
import AppleMessagesHeroMock from '../components/AppleMessagesHeroMock.jsx'
import AppleMessagesCapabilityGrid from '../components/AppleMessagesCapabilityGrid.jsx'
import AppleStepsBrackets from '../components/AppleStepsBrackets.jsx'
import WhyUsReceipt from '../components/WhyUsReceipt.jsx'
import EcosystemHexGrid from '../components/EcosystemHexGrid.jsx'

const HERO_BADGES = [
  { icon: <IconCalendar />, word: 'Pickers', desc: 'lists, times & options in-chat' },
  { icon: <IconDollar />, word: 'Apple Pay', desc: 'checkout without leaving Messages' },
  { icon: <IconShield />, word: 'Approved', desc: 'sent through an official MSP' },
  { icon: <IconBrain />, word: 'AI', desc: 'answers folded into one inbox' },
]

const STEPS = [
  { title: 'Get Apple-approved', desc: 'We handle the Messages Service Provider application and Apple review for you.' },
  { title: 'Design rich replies', desc: 'Build list pickers, time pickers and Apple Pay prompts from templates.' },
  { title: 'Go live in one inbox', desc: 'Every Business Chat conversation lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Access', left: 'Requires a Messages Service Provider', right: 'We are the approved MSP for you' },
  { feature: 'Message format', left: 'Plain text only', right: 'List pickers, time pickers, Apple Pay' },
  { feature: 'Team access', left: 'One login at a time', right: 'Unlimited team seats' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'No analytics', right: 'Delivery, read & reply reporting' },
]

const WHY_US = [
  { icon: <IconShield />, title: 'We are the approved path', desc: 'Apple requires an approved Messages Service Provider — that paperwork and review is on us, not you.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents can work the same Business Chat inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real order and customer context.' },
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Apple Messages sits beside WhatsApp, SMS and email in the same shared inbox.' },
]

const ECOSYSTEM = [
  { icon: <IconChat />, title: 'WhatsApp, too', desc: 'Run Apple Messages alongside WhatsApp Business API from the same inbox.', href: '/whatsapp-business-api' },
  { icon: <IconBolt />, title: 'SMS fallback', desc: 'Keep a universal channel in reach for customers on Android or outside iMessage.', href: '/bulk-sms' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The same AI that answers Apple Messages can carry a conversation across every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design list pickers and reply flows visually, without writing code.', href: '/chatbot/builder' },
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
        title="Native iMessage business chat, sent through an approved provider"
        subtitle="Rich links, list pickers, Apple Pay and reactions — delivered to the Messages app customers already trust, with Apple's required approval handled for you."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AppleMessagesHeroMock />}
      />

      <div className="hero-badges-wrap">
        <div className="container">
          <div className="hero-badges">
            {HERO_BADGES.map((b) => (
              <div className="hero-badge" key={b.word}>
                <span className="hero-badge-icon">{b.icon}</span>
                <div className="hero-badge-text">
                  <strong>{b.word}</strong>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NarrativeCompare
        heading={<>You can't just start sending Apple Business Chat. Apple decides who can.</>}
        paragraphs={[
          'Apple Messages for Business is not an open API — every message has to be sent through a Messages Service Provider that Apple has reviewed and approved. Most teams discover this only after trying to integrate it directly.',
          "So the real bottleneck isn't the chat experience, it's getting approved in the first place: the MSP application, the business verification, the review queue.",
          <>We are an approved Messages Service Provider, so <strong>the approval process is already done</strong> — you connect your business and start sending.</>,
        ]}
        leftLabel="Going direct"
        leftItems={[
          'Apply as your own Messages Service Provider',
          'Wait through Apple\'s review and verification',
          'Build list pickers and Apple Pay integration yourself',
          'No shared inbox with your other channels',
        ]}
        rightLabel="Apple Messages, on SMSLocal"
        rightItems={[
          'Send through our already-approved MSP status',
          'Live once your business is verified with us',
          'List pickers, time pickers and Apple Pay, ready-made',
          'Sits beside WhatsApp, SMS and email in one inbox',
        ]}
        alt
      />

      <AppleMessagesCapabilityGrid />

      <AppleStepsBrackets eyebrow="How it works" title={<>Go live on Apple Messages in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Going direct vs the SMSLocal path</>}
        subtitle="Apple requires an approved provider either way — here's what changes when that provider is us."
        leftLabel="Going Direct"
        rightLabel="SMSLocal"
        rows={COMPARE_ROWS}
      />

      <WhyUsReceipt eyebrow="Why us" title={<>Why brands choose SMSLocal as their MSP</>} items={WHY_US} alt />

      <EcosystemHexGrid
        eyebrow="Ecosystem"
        title={<>Apple Messages fits right into your messaging stack</>}
        subtitle="Pair Apple Messages with WhatsApp, SMS fallback and agentic AI across the same conversations."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Apple Messages for Business — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Bring your brand into iMessage the right way"
        subtitle="We handle Apple's approval — you handle the conversation."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default AppleMessagesForBusiness
