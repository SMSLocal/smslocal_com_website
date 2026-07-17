import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, HowItWorks, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import EcomFeatureShowcase from '../components/EcomFeatureShowcase.jsx'
import WhyUsDividers from '../components/WhyUsDividers.jsx'
import { IconCart, IconRefresh, IconSearch, IconMegaphone, IconBolt, IconChart, IconShield, IconClock, IconGlobe, IconBell } from '../components/icons.jsx'
import EcomAgentMock from '../components/EcomAgentMock.jsx'

const FEATURES = [
  { icon: <IconCart />, title: 'Order status & tracking', desc: 'Answers "where\'s my order?" instantly from live store data, with a live tracking link — no ticket, no waiting.' },
  { icon: <IconMegaphone />, title: 'Cart recovery that converts', desc: 'Follows up on abandoned carts on WhatsApp and SMS, answers the objection, and walks the shopper back to checkout.' },
  { icon: <IconSearch />, title: 'Guided product discovery', desc: 'Understands what a shopper wants, recommends from your live catalog, and guides them to the right product and checkout.' },
  { icon: <IconRefresh />, title: 'Returns & refunds', desc: 'Handles return requests end to end — checking eligibility, generating the label, and issuing the refund right inside the chat.' },
  { icon: <IconBell />, title: 'Back-in-stock & alerts', desc: 'Notifies shoppers the moment a product is restocked, and sends offer, loyalty and shipping updates on their channel.' },
  { icon: <IconGlobe />, title: 'Speaks your buyer\'s language', desc: 'Replies in the shopper\'s own language across regions, so a follow-up in Hindi or Spanish reads like a native reply.' },
]

const STEPS = [
  { title: 'Connect your store', desc: 'One-click connect to Shopify, WooCommerce, Magento or your platform for live order, inventory and customer data.' },
  { title: 'Set your policies', desc: 'Tell the agent your return window, shipping rules and what it can resolve on its own — it works inside those guardrails.' },
  { title: 'Go live on your channels', desc: 'Deploy on WhatsApp, your website and SMS from one wallet — the agent resolves, recommends and recovers, 24/7.' },
]

const WHY_US = [
  { icon: <IconClock />, title: '24/7 store support', desc: 'Answers order and product questions overnight and on weekends, when carts are hot.' },
  { icon: <IconBolt />, title: 'Fewer WISMO tickets', desc: 'Deflects the "where is my order" flood before it reaches your team.' },
  { icon: <IconChart />, title: 'More recovered revenue', desc: 'Guided shopping and cart recovery turn conversations into completed checkouts.' },
  { icon: <IconShield />, title: 'Acts on real data', desc: 'Looks up the actual order and inventory, so answers are accurate, not guesses.' },
]

const FAQS = [
  { q: 'What can an ecommerce AI agent do?', a: 'It answers order-status and product questions, processes returns and refunds, guides shoppers to checkout, and recovers abandoned carts — all connected to your store\'s live data.' },
  { q: 'Which platforms does it connect to?', a: 'Shopify, WooCommerce and other major store platforms, with live access to orders, inventory and customer data.' },
  { q: 'Can it actually issue a refund?', a: 'Yes. Within the policies you set, it can check eligibility and process the refund inside the conversation, not just explain the policy.' },
  { q: 'Where does it talk to customers?', a: 'On WhatsApp, your website and SMS — the same agent and store data across every channel.' },
]

function AiAgentsEcommerce() {
  return (
    <>
      <Seo
        title="Ecommerce AI Agent"
        description="An AI agent for online stores — order status, returns, product discovery and cart recovery, connected to your store's live data across WhatsApp, web and SMS."
        keywords={['ecommerce AI agent', 'WISMO automation', 'cart recovery agent', 'AI for online store']}
      />

      <Hero
        eyebrow="AI Agents"
        title="An AI agent that runs your store's conversations"
        subtitle="Guided shopping, order status, returns and cart recovery — connected to your store's live data and working across WhatsApp, your website and SMS."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<EcomAgentMock />}
      />

      <NarrativeCompare
        variant="rows"
        eyebrow="The problem"
        heading={<>Most store support is just "where's my order?" on repeat.</>}
        paragraphs={[
          'A huge share of ecommerce tickets are the same handful of questions — order status, returns, sizing — and every one of them waits in a queue for a human to look up and answer.',
          'Meanwhile the conversations that could actually drive a sale — a shopper unsure which product to buy, a cart left at checkout — get no attention at all.',
          <>An ecommerce agent flips that — <strong>resolving the repetitive instantly and guiding the buyers</strong> — connected to your real order and inventory data.</>,
        ]}
        leftLabel="Manual store support"
        leftItems={[
          'WISMO tickets pile up in a queue',
          'Returns need a human every time',
          'Shoppers get no guidance at checkout',
          'Abandoned carts are never followed up',
        ]}
        rightLabel="Ecommerce AI agent"
        rightItems={[
          'Order status answered instantly',
          'Returns and refunds handled end to end',
          'Shoppers guided to the right product',
          'Abandoned carts recovered automatically',
        ]}
        alt
      />

      <EcomFeatureShowcase eyebrow="Features" title={<>Built for online stores</>} items={FEATURES} />

      <HowItWorks title={<>Live on your store in three steps</>} steps={STEPS} alt variant="flow" />

      <WhyUsDividers eyebrow="Why us" title={<>Why online stores deploy an AI agent</>} items={WHY_US} />

      <FAQ title={<>Ecommerce agent — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Turn store conversations into revenue"
        subtitle="Connect your store and let an AI agent resolve, guide and recover — around the clock."
        cta={{ label: 'Get Started', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsEcommerce
