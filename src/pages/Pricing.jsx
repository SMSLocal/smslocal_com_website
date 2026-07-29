import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import BundlePriceHero from '../components/BundlePriceHero.jsx'
import PricingTrialCard from '../components/PricingTrialCard.jsx'
import PricingTiers from '../components/PricingTiers.jsx'
import PricingCompareAccordion from '../components/PricingCompareAccordion.jsx'
import PricingWhyUs from '../components/PricingWhyUs.jsx'
import { IconChat, IconBolt, IconRocket, IconBriefcase } from '../components/icons.jsx'

// Placeholder USD tiers — confirm before publishing.
const PLANS = [
  {
    name: 'Starter',
    icon: <IconChat />,
    accent: 'teal',
    tagline: 'Everything to get going, no contracts.',
    bestFor: 'Solo founders and small teams who want a real messaging setup without a sales call.',
    fitTag: 'No contracts',
    price: '$10',
    annualPrice: '$10',
    period: 'min. purchase',
    billedNote: '$0.0822 per SMS · United States',
    cta: 'Get Started',
    href: '/signup',
    // Every tier lists the FULL set of what you get (not "everything in X,
    // plus"), so the ladder of value is visible at a glance. `upgrade: true`
    // marks what improves versus the tier below it.
    features: [
      'Agentic AI agent included',
      'All channels: WhatsApp, RCS, SMS, voice, email, social',
      'Shared team inbox',
      'Up to 500 conversations / mo',
      '1 team seat',
      'Contact management',
      'Delivery tracking',
      'Community support',
    ],
  },
  {
    name: 'Growth',
    icon: <IconBolt />,
    accent: 'primary',
    tagline: 'For teams turning conversations into revenue.',
    bestFor: 'Growing teams running broadcasts and campaigns who need more seats and standard analytics.',
    fitTag: '5 team seats',
    price: '$25',
    annualPrice: '$25',
    period: 'min. purchase',
    billedNote: '$0.0822 per SMS · United States',
    highlighted: true,
    cta: 'Get Started',
    href: '/signup',
    features: [
      'Agentic AI agent included',
      'All channels: WhatsApp, RCS, SMS, voice, email, social',
      'Shared team inbox',
      { label: '2,500 conversations / mo', upgrade: true },
      { label: '5 team seats', upgrade: true },
      'Contact management',
      'Delivery tracking',
      { label: 'Broadcasting & campaigns', upgrade: true },
      { label: 'Standard analytics', upgrade: true },
      { label: 'Email support', upgrade: true },
    ],
  },
  {
    name: 'Scale',
    icon: <IconRocket />,
    accent: 'coral',
    tagline: 'High volume, deeper insight, priority care.',
    bestFor: 'High-volume teams that need advanced analytics, custom AI training and priority support.',
    fitTag: '20 team seats',
    price: '$50',
    annualPrice: '$50',
    period: 'min. purchase',
    billedNote: '$0.0822 per SMS · United States',
    cta: 'Get Started',
    href: '/signup',
    features: [
      'Agentic AI agent included',
      'All channels: WhatsApp, RCS, SMS, voice, email, social',
      'Shared team inbox',
      { label: '15,000 conversations / mo', upgrade: true },
      { label: '20 team seats', upgrade: true },
      'Contact management',
      'Delivery tracking',
      'Broadcasting & campaigns',
      { label: 'Advanced analytics & exports', upgrade: true },
      { label: 'Custom agent training', upgrade: true },
      { label: 'Integrations & open API', upgrade: true },
      { label: 'Priority support', upgrade: true },
    ],
  },
  {
    name: 'Enterprise',
    icon: <IconBriefcase />,
    accent: 'dark',
    tagline: 'Unlimited scale, security and a team behind you.',
    bestFor: 'Large teams that need SSO, unlimited seats and a dedicated success manager.',
    fitTag: 'Unlimited seats',
    price: 'Custom',
    annualPrice: 'Custom',
    period: '',
    billedNote: 'Get a custom bulk SMS quote',
    cta: 'Contact Sales',
    href: '/contact-us',
    features: [
      'Agentic AI agent included',
      'All channels: WhatsApp, RCS, SMS, voice, email, social',
      'Shared team inbox',
      { label: 'Unlimited conversations', upgrade: true },
      { label: 'Unlimited team seats', upgrade: true },
      'Contact management',
      'Delivery tracking',
      'Broadcasting & campaigns',
      'Advanced analytics & exports',
      'Custom agent training',
      'Integrations & open API',
      { label: 'SSO & advanced security', upgrade: true },
      { label: 'Dedicated success manager', upgrade: true },
      { label: 'SLA-backed support', upgrade: true },
    ],
  },
]

// Four columns: Starter, Growth, Scale, Enterprise — grouped into categories,
// modelled on acepeak.com/pricing's collapsible side-by-side compare table.
const COMPARE_CATEGORIES = [
  {
    label: 'Channels & messaging',
    rows: [
      { feature: 'WhatsApp, RCS, SMS & OTP', col1: true, col2: true, col3: true, col4: true },
      { feature: 'Voice, email & social channels', col1: true, col2: true, col3: true, col4: true },
      { feature: 'Broadcasting & campaigns', col1: false, col2: true, col3: true, col4: true },
      { feature: 'Included conversations / mo', col1: '500', col2: '2,500', col3: '15,000', col4: 'Custom' },
    ],
  },
  {
    label: 'AI & automation',
    rows: [
      { feature: 'Agentic AI agent', col1: true, col2: true, col3: true, col4: true },
      { feature: 'Natural-language understanding & tools', col1: true, col2: true, col3: true, col4: true },
      { feature: 'Custom AI agent training', col1: false, col2: false, col3: true, col4: true },
    ],
  },
  {
    label: 'Team & inbox',
    rows: [
      { feature: 'Shared omnichannel inbox', col1: true, col2: true, col3: true, col4: true },
      { feature: 'Team seats', col1: '1', col2: '5', col3: '20', col4: 'Unlimited' },
      { feature: 'Roles & assignment', col1: false, col2: true, col3: true, col4: true },
    ],
  },
  {
    label: 'Analytics & integrations',
    rows: [
      { feature: 'Analytics & reporting', col1: 'Basic', col2: 'Standard', col3: 'Advanced', col4: 'Advanced + export' },
      { feature: 'Integrations & open API', col1: false, col2: true, col3: true, col4: true },
    ],
  },
  {
    label: 'Security & support',
    rows: [
      { feature: 'SSO & advanced security', col1: false, col2: false, col3: false, col4: true },
      { feature: 'Dedicated success manager', col1: false, col2: false, col3: false, col4: true },
      { feature: 'Support', col1: 'Community', col2: 'Email', col3: 'Priority', col4: 'SLA-backed' },
    ],
  },
]

const FAQS = [
  { q: 'Is the price really all-inclusive?', a: 'Yes. One plan price covers the agentic AI agent, every channel — WhatsApp, RCS, SMS, voice, email and social — the shared inbox and broadcasting. There are no separate module fees to unlock a channel or the agent; the number you see is the number you pay for the SMSLocal platform.' },
  { q: 'Do I pay extra per channel like WhatsApp or voice?', a: 'The SMSLocal platform fee is bundled and flat. Some channels carry third-party carrier or provider charges (for example WhatsApp conversation fees or voice minutes); where they apply, we pass them through at cost with no markup, and you always see them itemised before they are billed.' },
  { q: 'How is usage measured?', a: 'Usage is counted in conversations per month — a two-way thread with a customer across any channel, handled by the agent or your team. Each plan includes a monthly conversation allowance; the numbers shown here are representative placeholders for you to confirm.' },
  { q: 'Is there a free plan or a trial?', a: 'Both. The Starter plan is free forever with the agent and every channel switched on, and paid plans include a 14-day free trial so you can run the full platform before you pay.' },
  { q: 'What happens if I exceed the volume included in my plan?', a: 'You are never cut off mid-conversation. Additional usage is billed at a simple, transparent per-conversation rate, or you can move up a tier at any time — whichever works out cheaper for you.' },
  { q: 'Can I change plans or cancel anytime?', a: 'Yes. Upgrade, downgrade or cancel whenever you like, straight from your account. Plans are month-to-month with no lock-in, and annual billing is available if you want a discount.' },
  { q: 'Are there setup or onboarding fees?', a: 'No. There is no setup fee, no onboarding charge and no per-seat activation cost. You can start on the free plan today and add a card only when you are ready to scale.' },
  { q: 'How does Enterprise pricing work?', a: 'Enterprise is a custom quote for teams that need unlimited volume, SSO, advanced security, a dedicated success manager and an SLA. It is the one tier priced to your requirements — everything below it stays transparently listed on this page.' },
]

function Pricing() {
  return (
    <>
      <Seo
        title="Pricing — One Transparent Plan for Every Channel & the AI Agent"
        description="SMSLocal pricing is one transparent, bundled USD plan family. The agentic AI agent, every channel — WhatsApp, RCS, SMS, voice, email and social — the shared inbox and broadcasting are all included. Start free, no custom quotes."
        keywords={['SMSLocal pricing', 'omnichannel messaging pricing', 'AI agent pricing', 'transparent messaging pricing', 'WhatsApp RCS SMS pricing', 'all-in-one customer messaging plan']}
      />

      <Hero
        eyebrow="Pricing"
        title={<>One transparent price for <span className="grad-word">the whole platform</span></>}
        subtitle="The agentic AI agent, every channel — WhatsApp, RCS, SMS, voice, email and social — the shared inbox and broadcasting, all in one bundled USD plan. No custom quotes, no per-channel surprises."
        primaryCta={{ label: 'Start Free', href: '/signup' }}
        secondaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        stats={[
          { value: '$0', label: 'to get started' },
          { value: '6+', label: 'channels included' },
          { value: '1', label: 'simple bundle' },
        ]}
        visual={<BundlePriceHero />}
      />

      <PricingTrialCard />

      <PricingTiers
        title="One plan family. Four sizes."
        subtitle="Start free and upgrade only when you outgrow a tier. Every plan includes the AI agent, every channel, the shared inbox and broadcasting — priced in USD, right here on the page."
        plans={PLANS}
      />

      <PricingCompareAccordion
        eyebrow="Side-by-side"
        title="Compare every feature, side by side."
        subtitle="Every plan, every category, no fine print hidden in a footer."
        colLabels={['Starter', 'Growth', 'Scale', 'Enterprise']}
        priceLabels={['$10 min.', '$25 min.', '$50 min.', 'Talk to sales']}
        categories={COMPARE_CATEGORIES}
      />

      <PricingWhyUs />

      <CTABanner
        title="Start free, upgrade when you're ready"
        subtitle="Switch on the agent and every channel on the free plan today — no card, no sales call, no hidden fees."
        cta={{ label: 'Start Free', href: '/signup' }}
        secondaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>Pricing — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default Pricing
