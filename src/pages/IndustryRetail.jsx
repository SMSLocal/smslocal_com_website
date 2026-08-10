import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemFlipDeck from '../components/ProblemFlipDeck.jsx'
import StoreFeatureShowcase from '../components/StoreFeatureShowcase.jsx'
import BuildJourneyStepperIndustry from '../components/BuildJourneyStepperIndustry.jsx'
import WhyUsChecks from '../components/WhyUsChecks.jsx'
import { IconCheck, IconClock, IconBolt, IconPackage, IconPlug, IconGear, IconRocket } from '../components/icons.jsx'
import StoreAgentHeroMock from '../components/StoreAgentHeroMock.jsx'

const BENEFITS = [
  { icon: <IconClock />, title: 'Never miss peak traffic', desc: 'Handles Black Friday-level volume the same way it handles a quiet Tuesday — no queue, no dropped chats.' },
  { icon: <IconBolt />, title: 'Recovers revenue automatically', desc: 'Cart and browse-abandonment flows run without a marketer touching a send button.' },
  { icon: <IconPackage />, title: 'Fewer WISMO tickets', desc: '"Where is my order" resolves itself — the agent pulls live tracking data and replies instantly.' },
  { icon: <IconCheck />, title: 'Consistent brand voice', desc: 'Every channel answers from the same product catalogue and policy data, so nothing contradicts your site.' },
]

const STEPS = [
  { icon: <IconPlug />, title: 'Connect your store', desc: 'Link Shopify, WooCommerce or your commerce platform along with WhatsApp, SMS and web chat.' },
  { icon: <IconGear />, title: 'Train on your catalogue', desc: 'The agent learns your products, return policy and order data — no scripting required.' },
  { icon: <IconRocket />, title: 'Go live across channels', desc: 'Launch on your storefront, WhatsApp and SMS at once, with a human handoff ready for the exceptions.' },
  { icon: <IconCheck />, title: 'Recover, resolve, repeat', desc: 'Cart recovery and order support run automatically from day one, with results visible immediately.' },
]

const FAQS = [
  { q: 'Can the AI agent actually process a return, not just explain the policy?', a: 'Yes. Connected to your commerce stack, it initiates the return, generates the label link and updates the order record — inside the conversation.' },
  { q: 'Does it work with my existing store platform?', a: 'It integrates with Shopify, WooCommerce and most major commerce and helpdesk platforms via our 200+ integrations and open REST API.' },
  { q: 'How does cart recovery messaging stay compliant?', a: 'Every broadcast respects opt-in status and includes STOP/HELP handling automatically, so campaigns stay compliant by default.' },
  { q: 'Can it upsell or just answer questions?', a: 'Both — it can recommend complementary products based on the cart or order it is already looking at, without feeling like a pop-up ad.' },
  { q: 'What happens during a big sale when volume spikes 10x?', a: 'The agent scales with volume automatically since it is not a human queue — response time stays sub-second regardless of traffic.' },
]

function IndustryRetail() {
  return (
    <>
      <Seo
        title="Agentic AI for Retail and eCommerce Support"
        description="Agentic AI for retail: order updates, cart recovery, returns and broadcasting across every channel shoppers use."
        keywords={['AI for retail', 'agentic AI retail', 'ecommerce AI support', 'retail AI agent']}
      />

      <Hero
        eyebrow="Retail & eCommerce"
        title={<>Agentic AI for retail that <span className="grad-word">closes the loop</span>, not just chats</>}
        subtitle="Answer product questions, recover abandoned carts and resolve order issues automatically — across WhatsApp, SMS, RCS and web chat, with a human handoff when it truly matters."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<StoreAgentHeroMock />}
      />

      <ProblemFlipDeck
        eyebrow="The problem"
        heading="Most retail chat tools stop at &ldquo;let me check on that for you.&rdquo;"
        paragraph="A live agent still opens three tabs to check an order, and a scripted chatbot just repeats your FAQ page. Flip the switch to see what changes."
        pairs={[
          { before: 'Order status means checking three tabs', after: 'Order status answered instantly, in the chat' },
          { before: 'Carts go cold with no follow-up', after: 'Cart recovery messages send themselves' },
          { before: 'Every channel needs its own answer', after: 'One agent, consistent everywhere' },
        ]}
        alt
      />

      <StoreFeatureShowcase
        eyebrow="Features"
        title="Built for online stores"
      />

      <BuildJourneyStepperIndustry
        eyebrow="How it works"
        title="Live in four steps"
        subtitle="From connecting your store to recovering your first cart, with no scripting required."
        steps={STEPS}
        alt
      />

      <WhyUsChecks
        eyebrow="Why it works"
        title="Support that scales with your busiest day"
        subtitle="Peak traffic stops being a staffing problem — the agent handles the surge, and your team handles the exceptions."
        items={BENEFITS}
      />

      <CTABanner
        title="Turn support into a revenue channel"
        subtitle="Deploy an agentic AI retail agent across your storefront, WhatsApp and SMS in days, not months."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for retail — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryRetail
