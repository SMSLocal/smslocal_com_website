import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhatsappFeatureGrid from '../components/WhatsappFeatureGrid.jsx'
import IndustryBubbles from '../components/IndustryBubbles.jsx'
import WhatsappStepsFlow from '../components/WhatsappStepsFlow.jsx'
import {
  IconBrain, IconLink, IconUsers, IconShield, IconChart, IconCart, IconCalendar, IconPencil,
  IconBell, IconDollar, IconGlobe, IconBook, IconPackage, IconBriefcase,
} from '../components/icons.jsx'
import WhatsappInboxMock from '../components/WhatsappInboxMock.jsx'
import CardCarousel from '../components/CardCarousel.jsx'

const USE_CASES = [
  { icon: <IconCart />, title: 'E-commerce support', desc: 'Answers order, return and shipping questions instantly, and updates the order when asked.' },
  { icon: <IconBrain />, title: 'Product recommendations', desc: 'Understands what a shopper needs and suggests the right plan or product to lift conversions.' },
  { icon: <IconCalendar />, title: 'Appointment scheduling', desc: 'Collects details, checks availability and books the slot straight into your calendar.' },
  { icon: <IconChart />, title: 'Lead generation', desc: 'Qualifies visitors on WhatsApp, captures budget and intent, and routes hot leads to your team.' },
  { icon: <IconPencil />, title: 'Feedback collection', desc: 'Runs a friendly Q&A to gather ratings and comments right after a purchase or visit.' },
  { icon: <IconUsers />, title: 'Event registration', desc: 'Guides attendees through sign-up, shares details and confirms their RSVP end to end.' },
]

const FEATURES = [
  { icon: <IconBrain />, title: 'Understands real intent', desc: 'Reasons over the conversation, not just keyword-matched replies.' },
  { icon: <IconLink />, title: 'Takes real actions', desc: 'Checks orders, updates records and completes tasks on WhatsApp.' },
  { icon: <IconUsers />, title: 'Clean human handoff', desc: 'Escalates to a live agent with full context when it truly needs one.' },
  { icon: <IconShield />, title: 'Official WhatsApp API', desc: 'Runs on the verified WhatsApp Business API, not a workaround.' },
  { icon: <IconCart />, title: 'Rich media & catalog messages', desc: 'Sends product cards, quick-reply buttons and list menus — not just plain text — so customers browse and choose without leaving the chat.' },
  { icon: <IconBell />, title: 'Proactive follow-ups', desc: 'Nudges an abandoned cart or a pending action on its own, instead of only replying when someone writes in first.' },
]

const INDUSTRIES = [
  { icon: <IconCart />, title: 'Ecommerce & D2C', desc: 'Order status, catalog browsing and cart recovery, all inside the same WhatsApp thread customers already use.' },
  { icon: <IconDollar />, title: 'Banking & fintech', desc: 'Balance checks and service requests answered inside a secure, verified WhatsApp number.' },
  { icon: <IconCalendar />, title: 'Healthcare', desc: 'Appointment booking and reminders sent and confirmed without a phone call.' },
  { icon: <IconGlobe />, title: 'Travel & hospitality', desc: 'Booking confirmations and itinerary questions resolved the moment a guest messages in.' },
  { icon: <IconBriefcase />, title: 'Real estate', desc: 'Site-visit scheduling and listing questions answered instantly to a warm lead.' },
  { icon: <IconBook />, title: 'Education', desc: 'Admissions queries and fee reminders answered the moment a parent messages in.' },
  { icon: <IconPackage />, title: 'Logistics', desc: 'Delivery updates and shipment tracking sent proactively, not just on request.' },
  { icon: <IconShield />, title: 'Insurance', desc: 'Policy and claim-status questions answered any hour, with sensitive cases routed correctly.' },
]

const STEPS = [
  { title: 'Connect WhatsApp Business API', desc: 'Link your verified WhatsApp number in a few clicks.' },
  { title: 'Ground the agent in your data', desc: 'Connect your order system, CRM or helpdesk as callable tools.' },
  { title: 'Go live and monitor', desc: 'Watch resolutions, handoffs and reply times from one dashboard.' },
]

const FAQS = [
  { q: 'What is a WhatsApp AI agent?', a: 'An autonomous AI agent that understands customer intent on WhatsApp and takes real actions to resolve requests, rather than just replying with scripted text.' },
  { q: 'Does it use the official WhatsApp Business API?', a: 'Yes, it runs on the verified WhatsApp Business API — the same number you use for broadcasts and support.' },
  { q: 'Can it reply in my customers\' language?', a: 'Yes. It detects the language a customer writes in and responds in it automatically, across 19+ languages, so you can support a global audience from one number.' },
  { q: 'How do I train the agent on my business?', a: 'Upload your FAQs, product docs and policies, or connect your help center — the agent references them to answer accurately in your own tone.' },
  { q: 'What happens when the agent can\'t resolve something?', a: 'It hands off to a live agent inbox with the full conversation and any actions already taken, so nothing gets lost.' },
  { q: 'Can it connect to our order system or CRM?', a: 'Yes, connect your order system, CRM or helpdesk as tools the agent can use to check real information and take action.' },
]

function AiAgentsWhatsapp() {
  return (
    <>
      <Seo
        title="WhatsApp AI Agent"
        description="Put an autonomous AI agent on WhatsApp — it understands intent, takes actions and resolves conversations end to end on the channel customers use."
        keywords={['AI agent for WhatsApp', 'WhatsApp autonomous agent', 'agentic WhatsApp automation', 'WhatsApp AI assistant']}
      />

      <Hero
        eyebrow="WhatsApp AI Agent"
        title="An autonomous AI agent, right on WhatsApp"
        subtitle="Understands intent, takes real actions and resolves conversations end to end — on the verified WhatsApp Business API your customers already message."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See WhatsApp API', href: '/whatsapp-business-api' }}
        visual={<WhatsappInboxMock />}
      />

      <NarrativeCompare
        eyebrow="The problem"
        heading={<>A WhatsApp bot without real actions is still just a script.</>}
        paragraphs={[
          "Plenty of \"AI\" on WhatsApp is really a keyword-matched script wearing a friendlier tone — it can sound conversational, but it still can't check an order or actually resolve anything.",
          'So the moment a request goes past the script, it\'s a dead end — a generic "let me connect you to an agent" and the wait starts anyway.',
          <>An agent on WhatsApp should mean <strong>real reasoning and real actions</strong> — not a nicer-sounding version of the same limitations.</>,
        ]}
        leftLabel="Scripted WhatsApp bot"
        leftItems={[
          'Matches keywords, not intent',
          'Can\'t check an order or account',
          'Dead ends the moment the script runs out',
          'Handoffs carry no context',
        ]}
        rightLabel="WhatsApp AI agent"
        rightItems={[
          'Reasons over the whole conversation',
          'Checks and acts on real order and account data',
          'Resolves end to end, not just replies',
          'Handoffs carry full context and actions taken',
        ]}
      />

      <WhatsappFeatureGrid title={<>Built to resolve on WhatsApp</>} items={FEATURES} alt />

      <CardCarousel
        eyebrow="Use cases"
        title={<>One agent, every WhatsApp use case</>}
        subtitle="The same agent, tuned to how your team actually uses WhatsApp."
        items={USE_CASES}
      />

      <WhatsappStepsFlow eyebrow="How it works" title={<>Go live on WhatsApp in three steps</>} steps={STEPS} alt />

      <IndustryBubbles
        eyebrow="Industries"
        title={<>Built for the conversations your industry gets on WhatsApp</>}
        subtitle="The same WhatsApp AI agent, tuned to the requests and guardrails each industry needs."
        items={INDUSTRIES}
      />

      <FAQ title={<>WhatsApp AI agent — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Put an AI agent on your WhatsApp number"
        subtitle="Connect your account and start resolving conversations today."
        cta={{ label: 'Get Started', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsWhatsapp
