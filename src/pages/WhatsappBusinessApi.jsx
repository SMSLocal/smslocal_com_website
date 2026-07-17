import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, EcosystemGrid, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhatsappSetupRail from '../components/WhatsappSetupRail.jsx'
import WhyUsBrackets from '../components/WhyUsBrackets.jsx'
import FeatureMasonry from '../components/FeatureMasonry.jsx'
import {
  IconMegaphone, IconChat, IconReceipt, IconCheck, IconDollar, IconLink, IconChart,
  IconBrain, IconMail, IconPlug, IconCursor, IconShield, IconClock, IconGlobe,
} from '../components/icons.jsx'
import WhatsappHeroMock from '../components/WhatsappHeroMock.jsx'
import StatBand from '../components/StatBand.jsx'
import { TemplateMessageMock, CatalogMessageMock, QuickReplyMock } from '../components/WhatsappMessageTypes.jsx'
import MessageTypeShowcase from '../components/MessageTypeShowcase.jsx'

const MESSAGE_TYPES = [
  { mock: <TemplateMessageMock />, title: 'Template message', desc: 'Approved order and alert templates with action buttons built in.' },
  { mock: <CatalogMessageMock />, title: 'Catalog message', desc: 'Showcase a product straight in the chat with a tap-through link.' },
  { mock: <QuickReplyMock />, title: 'Quick replies', desc: 'One-tap buttons that keep conversations short and structured.' },
]

const TRUST_STATS = [
  { icon: <IconShield />, value: 'Official', label: 'Business API', desc: 'Meta-sanctioned messaging, not an unofficial workaround.' },
  { icon: <IconCheck />, value: 'Verified', label: 'Green-tick sender', desc: 'The badge customers already recognise and trust.' },
  { icon: <IconClock />, value: '24/7', label: 'AI answers', desc: 'Routine questions resolved the moment they land.' },
  { icon: <IconCursor />, value: 'Rich', label: 'Templates & buttons', desc: 'Media headers, quick replies and list pickers.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Approved message templates', desc: 'Marketing, utility and authentication templates get Meta-approved before they ever reach a customer.' },
  { icon: <IconCursor />, title: 'Rich media & quick replies', desc: 'Send images, PDFs, location pins and tappable quick-reply buttons — not just plain text.' },
  { icon: <IconChat />, title: 'Two-way conversations', desc: 'Support live chat and automated replies from the same shared inbox.' },
  { icon: <IconMegaphone />, title: 'Broadcasts at scale', desc: 'Send segmented campaigns to opted-in customers on your own verified number.' },
  { icon: <IconShield />, title: 'Quality rating monitored', desc: 'We watch your sender health and messaging tier so your number never gets flagged.' },
  { icon: <IconBrain />, title: 'Agentic AI built in', desc: 'An AI that reads each message, checks your data, and replies or hands off automatically.' },
]

const STEPS = [
  { title: 'Apply for access', desc: 'We handle Meta verification and number registration for you.' },
  { title: 'Create templates', desc: 'Submit message templates for approval directly from your dashboard.' },
  { title: 'Send & automate', desc: 'Launch broadcasts or connect a chatbot for always-on conversations.' },
]

const WHY_US = [
  { icon: <IconCheck />, title: 'Fast onboarding', desc: 'Get approved and sending without wrestling with Meta directly.' },
  { icon: <IconDollar />, title: 'Transparent pricing', desc: 'Clear per-conversation pricing with no hidden markups.' },
  { icon: <IconLink />, title: 'Unified inbox', desc: 'Manage WhatsApp alongside SMS and other channels in one place.' },
  { icon: <IconChart />, title: 'Delivery analytics', desc: 'Track sent, delivered, read and replied rates per campaign.' },
  { icon: <IconShield />, title: 'Sender health, watched', desc: 'Quality rating and messaging limits monitored so you stay in good standing.' },
  { icon: <IconGlobe />, title: 'One number, every use', desc: 'Broadcasts, support and automation all run on the same verified sender.' },
]

const ECOSYSTEM = [
  { icon: <IconMegaphone />, title: 'WhatsApp broadcasting', desc: 'Launch opt-in campaigns and template sends from the same verified number your customers already reply to.', href: '/whatsapp-business-api' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'An AI layer that reads incoming messages, resolves what it can, and hands off to a human when it matters.', href: '/ai-agents/customer-service' },
  { icon: <IconMail />, title: 'Shared inbox', desc: 'WhatsApp, SMS and web chat land in one inbox so no reply gets missed across channels.', href: '/chatbot/whatsapp' },
  { icon: <IconPlug />, title: 'Integrations', desc: 'Connect your store, CRM or helpdesk so every reply is backed by real order and customer data.', href: '/sms-api' },
]

const TESTIMONIALS = [
  { quote: 'Order updates now land as WhatsApp messages instead of emails nobody opens — replies went up right away.', name: 'Meera Iyer', role: 'E-commerce Lead, D2C brand' },
  { quote: 'Getting Meta-verified used to feel intimidating. SMSLocal handled the whole application and we were sending within days.', name: 'Rohan Kapoor', role: 'Ops Manager, Logistics' },
  { quote: 'Agents pick up handed-off chats from the bot without losing context — customers never have to repeat themselves.', name: 'Sana Malik', role: 'Support Lead, SaaS company' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One phone, one device', right: 'Unlimited team seats' },
  { feature: 'Automation', left: 'Manual replies only', right: 'Bots, agentic AI and routing rules' },
  { feature: 'Broadcasting', left: 'No bulk sending', right: 'Segmented broadcasts at scale' },
  { feature: 'Integrations', left: 'None', right: 'CRM, store and helpdesk integrations' },
  { feature: 'Verification', left: 'Basic profile', right: 'Official green-tick verified business' },
]

const FAQS = [
  { q: 'What is the WhatsApp Business API?', a: 'It is the official way for businesses to send and receive WhatsApp messages at scale, accessed through an approved provider like SMSLocal. You get a verified sender, real messaging limits, and a quality rating — not a scraped or unofficial workaround that risks getting your number banned.' },
  { q: 'Do I need Meta approval?', a: 'Yes — we handle the Meta Business verification and template approval process as part of onboarding, so you go live without dealing with Meta directly.' },
  { q: 'Can the AI answer WhatsApp chats automatically?', a: 'Yes. The agentic AI reads each incoming message, checks your knowledge base and connected systems, and replies on WhatsApp in seconds — resolving routine volume on its own and handing off to a person with full context when it should.' },
  { q: 'What are WhatsApp templates and when do I need them?', a: 'Templates are pre-approved message formats — order confirmations, shipping updates, reminders — used to start a conversation or message a customer outside the 24-hour window. Free-form replies are fine once a customer messages you first.' },
  { q: 'Can I broadcast or run campaigns on WhatsApp?', a: 'Yes. Send segmented, opt-in broadcasts to your customers from the same verified number they already reply to, and keep the replies in the same shared inbox.' },
  { q: 'How does the human handoff work?', a: 'When something needs a person, the AI hands the thread to your team with the full conversation and context attached — so the customer never has to repeat themselves.' },
  { q: 'How is WhatsApp Business API priced?', a: 'Pricing is based on conversation category — marketing, utility and authentication. See the pricing page for current per-conversation rates.' },
]

function WhatsappBusinessApi() {
  return (
    <>
      <Seo
        title="WhatsApp Business API Provider"
        description="Official WhatsApp Business API access. Send bulk broadcasts, templates and two-way chats at scale with fast onboarding and transparent pricing."
        keywords={['WhatsApp Business API', 'WhatsApp API', 'bulk WhatsApp', 'WhatsApp Business API provider', 'WhatsApp broadcast', 'WhatsApp BSP']}
      />

      <Hero
        eyebrow="WhatsApp"
        title="Official WhatsApp Business API for growing teams"
        subtitle="Send broadcasts, templates and two-way conversations at scale — with fast onboarding, an agentic AI that answers, and transparent per-conversation pricing."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        stats={[
          { value: '190+', label: 'Countries reached' },
          { value: '99.9%', label: 'Platform uptime' },
          { value: '<48h', label: 'Avg. approval time' },
        ]}
        visual={<WhatsappHeroMock />}
      />

      <StatBand
        title="Real WhatsApp business messaging — not a workaround"
        subtitle="Everything runs on the official API, with an agentic AI on top and your team one tap away."
        items={TRUST_STATS}
        alt
      />

      <NarrativeCompare
        heading={<>Customers live on WhatsApp. Running it at scale is the hard part.</>}
        paragraphs={[
          "WhatsApp is where your customers actually want to talk — it's faster and more personal than email, and open rates leave every other channel behind.",
          'But doing it properly means wrestling with the Business API: sender verification, template approvals, quality ratings and messaging tiers. Get any of it wrong and you get rate-limited, or your number gets flagged.',
          <>SMSLocal manages all of that plumbing for you and puts an <strong>agentic AI on top</strong> — so WhatsApp becomes a channel you can actually scale, not a compliance headache.</>,
        ]}
        leftLabel="Unofficial workaround"
        leftItems={[
          'No green badge — customers hesitate',
          'Numbers get flagged or banned',
          'No templates, no media, no buttons',
          'A bot that stalls on anything real',
        ]}
        rightLabel="SMSLocal on the official API"
        rightItems={[
          'Verified green-badge sender',
          'Quality rating monitored for you',
          'Templates with media and quick replies',
          'Agentic AI resolves, then hands off',
        ]}
      />

      <FeatureMasonry eyebrow="Features" title={<>Everything you need on WhatsApp</>} items={FEATURES} alt />

      <MessageTypeShowcase
        title={<>Message types your customers actually tap on</>}
        subtitle="Templates, catalogs and quick replies — not just plain text bubbles."
        items={MESSAGE_TYPES}
      />

      <WhatsappSetupRail eyebrow="How it works" title={<>Go live on WhatsApp in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Business App vs Business API</>}
        subtitle="The free WhatsApp Business app works for a single phone. The API is built for teams."
        leftLabel="WhatsApp Business App"
        rightLabel="WhatsApp Business API"
        rows={COMPARE_ROWS}
      />

      <WhyUsBrackets eyebrow="Why us" title={<>Why teams choose our WhatsApp API</>} items={WHY_US} alt />

      <EcosystemGrid
        title={<>WhatsApp is one piece of a bigger system.</>}
        subtitle="See how broadcasting, agentic AI and your shared inbox work together around one verified number."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing businesses</>} items={TESTIMONIALS} alt />

      <FAQ title={<>WhatsApp Business API — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Start messaging on WhatsApp"
        subtitle="Apply for WhatsApp Business API access today."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default WhatsappBusinessApi
