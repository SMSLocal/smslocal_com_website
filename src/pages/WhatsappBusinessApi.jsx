import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhatsAppOfficialCompare from '../components/WhatsAppOfficialCompare.jsx'
import WhatsappSetupRail from '../components/WhatsappSetupRail.jsx'
import FeatureMasonry from '../components/FeatureMasonry.jsx'
import {
  IconMegaphone, IconChat, IconReceipt,
  IconBrain, IconCursor, IconShield,
} from '../components/icons.jsx'
import WhatsappHeroMock from '../components/WhatsappHeroMock.jsx'
import { TemplateMessageMock, CatalogMessageMock, QuickReplyMock } from '../components/WhatsappMessageTypes.jsx'
import MessageTypeShowcase from '../components/MessageTypeShowcase.jsx'

const MESSAGE_TYPES = [
  { mock: <TemplateMessageMock />, title: 'Template message', desc: 'Approved order and alert templates with action buttons built in.' },
  { mock: <CatalogMessageMock />, title: 'Catalog message', desc: 'Showcase a product straight in the chat with a tap-through link.' },
  { mock: <QuickReplyMock />, title: 'Quick replies', desc: 'One-tap buttons that keep conversations short and structured.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Approved message templates', desc: 'Marketing, utility and authentication templates get Meta-approved before they ever reach a customer.' },
  { icon: <IconCursor />, title: 'Rich media & quick replies', desc: 'Send images, PDFs, location pins and tappable quick-reply buttons — not just plain text.' },
  { icon: <IconChat />, title: 'Two-way shared inbox', desc: 'Live chat and automated replies in one inbox — WhatsApp alongside SMS and web chat, so no reply is missed.' },
  { icon: <IconMegaphone />, title: 'Broadcasts at scale', desc: 'Send segmented, opt-in campaigns to your customers from your own verified number.' },
  { icon: <IconBrain />, title: 'Agentic AI built in', desc: 'An AI that reads each message, checks your data, and replies or hands off automatically.' },
  { icon: <IconShield />, title: 'Sender health, watched', desc: 'We monitor your quality rating and messaging tier so your number stays in good standing.' },
]

const STEPS = [
  { title: 'Apply for access', desc: 'We handle Meta verification and number registration for you.' },
  { title: 'Create templates', desc: 'Submit message templates for approval directly from your dashboard.' },
  { title: 'Send & automate', desc: 'Launch broadcasts or connect a chatbot for always-on conversations.' },
]

const TESTIMONIALS = [
  { quote: 'Order updates now land as WhatsApp messages instead of emails nobody opens — replies went up right away.', name: 'Meera Iyer', role: 'E-commerce Lead, D2C brand' },
  { quote: 'Getting Meta-verified used to feel intimidating. SMSLocal handled the whole application and we were sending within days.', name: 'Rohan Kapoor', role: 'Ops Manager, Logistics' },
  { quote: 'Agents pick up handed-off chats from the bot without losing context — customers never have to repeat themselves.', name: 'Sana Malik', role: 'Support Lead, SaaS company' },
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
        title="WhatsApp Business API"
        description="Official WhatsApp Business API for bulk broadcasts and two-way chats, with fast onboarding."
        keywords={['WhatsApp Business API', 'WhatsApp API', 'bulk WhatsApp', 'WhatsApp Business API provider', 'WhatsApp broadcast', 'WhatsApp BSP']}
      />

      <Hero
        eyebrow="WhatsApp"
        title={<>Official <span className="grad-word">WhatsApp Business API</span> for growing teams</>}
        subtitle="Send broadcasts, templates and two-way conversations at scale — with fast onboarding, an agentic AI that answers, and transparent per-conversation pricing."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        stats={[
          { value: '190+', label: 'Countries reached' },
          { value: '99.9%', label: 'Platform uptime' },
          { value: '<48h', label: 'Avg. approval time' },
        ]}
        visual={<WhatsappHeroMock />}
      />

      <WhatsAppOfficialCompare
        eyebrow="Official vs. unofficial"
        title="Running WhatsApp at scale is the hard part"
        subtitle="SMSLocal handles verification, templates and quality — so it's the real thing, not a workaround."
      />

      <FeatureMasonry eyebrow="Features" title={<>Everything you need on WhatsApp</>} items={FEATURES} alt />

      <MessageTypeShowcase
        title={<>Message types your customers actually tap on</>}
        subtitle="Templates, catalogs and quick replies — not just plain text bubbles."
        items={MESSAGE_TYPES}
      />

      <WhatsappSetupRail eyebrow="How it works" title={<>Go live on WhatsApp in three steps</>} steps={STEPS} alt />

      <Testimonials title={<>Trusted by growing businesses</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Start messaging on WhatsApp"
        subtitle="Apply for WhatsApp Business API access today."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>WhatsApp Business API — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default WhatsappBusinessApi
