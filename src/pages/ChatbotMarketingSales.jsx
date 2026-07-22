import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCart, IconMegaphone, IconUsers, IconChart, IconGlobe, IconRefresh, IconBrain, IconClock } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconCart />, title: 'Cart recovery', desc: 'Follow up on abandoned carts directly inside WhatsApp or web chat.' },
  { icon: <IconMegaphone />, title: 'Campaign flows', desc: 'Run guided promotions and offers as a conversation, not a blast.' },
  { icon: <IconUsers />, title: 'Buyer guidance', desc: 'Help shoppers pick the right product with a few quick questions.' },
  { icon: <IconRefresh />, title: 'Post-purchase upsell', desc: 'Suggest add-ons and repeat purchases after checkout.' },
]

const STEPS = [
  { title: 'Design your buyer journey', desc: 'Map guided flows for discovery, cart recovery and upsells.' },
  { title: 'Connect your store', desc: 'Sync product and order data so replies stay accurate.' },
  { title: 'Deploy on WhatsApp & web', desc: 'Run the same flow everywhere your buyers already are.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Recovers lost sales', desc: 'Cart-recovery conversations convert better than a generic email.' },
  { icon: <IconGlobe />, title: 'Meets buyers anywhere', desc: 'WhatsApp, website and social, all from one flow.' },
  { icon: <IconBrain />, title: 'AI-guided discovery', desc: 'Answers product questions without a rep needing to step in.' },
  { icon: <IconClock />, title: 'Always selling', desc: 'Guided conversations run 24/7, not just business hours.' },
]

const FAQS = [
  { q: 'Can this recover abandoned carts?', a: 'Yes, a cart-recovery flow can follow up with shoppers directly on WhatsApp or web chat after they leave without checking out.' },
  { q: 'Does it connect to my store?', a: 'Yes, sync product and order data so the bot can answer accurately about stock, pricing and order status.' },
  { q: 'Can it run marketing campaigns?', a: 'Yes, guided promotional flows can run as a conversation instead of a one-way blast, on WhatsApp or web.' },
  { q: 'Is this different from the ecommerce chatbot?', a: 'This page focuses on marketing and sales conversations; see our ecommerce chatbot page for storefront-specific features like order tracking.' },
]

function ChatbotMarketingSales() {
  return (
    <>
      <Seo
        title="Marketing & Sales Chatbot"
        description="Drive conversions with a conversational marketing chatbot — recover carts, run campaigns and guide buyers on WhatsApp and web."
        keywords={['conversational marketing', 'WhatsApp marketing chatbot', 'sales automation chatbot', 'cart recovery bot']}
      />

      <Hero
        eyebrow="Marketing & Sales"
        title={<>Turn conversations into <span className="grad-word">conversions</span></>}
        subtitle="Recover carts, guide buyers, and run promotions as a conversation instead of a blast — on WhatsApp and web."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See Promotional SMS', href: '/promotional-sms' }}
      />

      <NarrativeCompare
        heading={<>A cart abandoned is a sale most brands never try to recover.</>}
        paragraphs={[
          "Most abandoned-cart follow-up is a single automated email, sent hours later, that lands in a promotions tab most people never open.",
          'By then the moment of intent has passed — the shopper has either bought elsewhere or forgotten what they wanted.',
          <>A conversation reaches people where they're already paying attention — <strong>WhatsApp, not an inbox they've stopped checking</strong>.</>,
        ]}
        leftLabel="Email cart-recovery"
        leftItems={[
          'One email, hours after the cart was left',
          'Buried in a promotions folder',
          'No way to answer a quick product question',
          'Same message regardless of what was in the cart',
        ]}
        rightLabel="Conversational recovery, on WhatsApp & web"
        rightItems={[
          'Follows up within minutes, in the same chat',
          'Lands where shoppers are already looking',
          'Answers sizing or stock questions instantly',
          'Guides the shopper back to checkout directly',
        ]}
        alt
      />

      <FeatureGrid title={<>Built to convert</>} items={FEATURES} />

      <HowItWorks title={<>Launch a sales flow in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why brands drive sales with our chatbot</>} items={WHY_US} />

      <CTABanner
        title="Start recovering carts today"
        subtitle="Connect your store and go live in minutes."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>Marketing & sales chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotMarketingSales
