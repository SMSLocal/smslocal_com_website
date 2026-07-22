import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import BundlePriceHero from '../components/BundlePriceHero.jsx'
import PricingTrustBar from '../components/PricingTrustBar.jsx'
import PlanIncludesShowcase from '../components/PlanIncludesShowcase.jsx'
import PricingTiers from '../components/PricingTiers.jsx'
import PricingCompare from '../components/PricingCompare.jsx'
import { IconChat, IconRobot, IconUsers, IconChart } from '../components/icons.jsx'

// NOTE: All prices, allowances and limits below are PLACEHOLDERS to confirm.
const TRUST = [
  { value: '1', label: 'Plan family', desc: 'One transparent bundle — not a maze of add-ons and modules.' },
  { value: '6+', label: 'Channels included', desc: 'WhatsApp, RCS, SMS, voice, email and social in every tier.' },
  { value: '$0', label: 'Setup & hidden fees', desc: 'No onboarding charge, no per-channel surcharge, no surprises.' },
  { value: '14-day', label: 'Free trial', desc: 'Run the full platform before a card is ever required.' },
]

const INCLUDED = [
  {
    label: 'Every channel',
    icon: <IconChat />,
    items: ['WhatsApp Business', 'RCS business messaging', 'SMS & OTP', 'Voice', 'Email', 'Instagram, Messenger & social'],
  },
  {
    label: 'Agentic AI',
    icon: <IconRobot />,
    items: ['The AI agent, on by default', 'Natural-language understanding', 'Autonomous actions & tools', 'Human handoff when needed'],
  },
  {
    label: 'Teamwork',
    icon: <IconUsers />,
    items: ['Shared omnichannel inbox', 'Broadcasting & campaigns', 'Roles & assignment', 'Notes & collaboration'],
  },
  {
    label: 'Scale & insight',
    icon: <IconChart />,
    items: ['Analytics & reporting', 'Integrations & open API', 'Contact management', 'Templates & automations'],
  },
]

// Placeholder USD tiers — confirm before publishing.
const PLANS = [
  {
    name: 'Starter',
    tagline: 'Everything to get going, free forever.',
    price: '$0',
    period: '/mo',
    cta: 'Start Free',
    href: '/signup',
    features: [
      'Agentic AI agent included',
      'All channels: WhatsApp, RCS, SMS, voice, email, social',
      'Shared team inbox',
      'Up to 500 conversations / mo',
      '1 team seat',
      'Community support',
    ],
  },
  {
    name: 'Growth',
    tagline: 'For teams turning conversations into revenue.',
    price: '$49',
    period: '/mo',
    highlighted: true,
    cta: 'Start Free Trial',
    href: '/signup',
    features: [
      'Everything in Starter',
      '2,500 conversations / mo',
      '5 team seats',
      'Broadcasting & campaigns',
      'Standard analytics',
      'Email support',
    ],
  },
  {
    name: 'Scale',
    tagline: 'High volume, deeper insight, priority care.',
    price: '$199',
    period: '/mo',
    cta: 'Start Free Trial',
    href: '/signup',
    features: [
      'Everything in Growth',
      '15,000 conversations / mo',
      '20 team seats',
      'Advanced analytics & exports',
      'Custom agent training',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Unlimited scale, security and a team behind you.',
    price: 'Custom',
    period: '',
    cta: 'Contact Sales',
    href: '/contact-us',
    features: [
      'Everything in Scale',
      'Unlimited conversations',
      'Unlimited seats',
      'SSO & advanced security',
      'Dedicated success manager',
      'SLA-backed support',
    ],
  },
]

const TIER_ROWS = [
  { feature: 'Agentic AI agent', col1: true, col2: true, col3: true },
  { feature: 'All channels (WhatsApp, RCS, SMS, voice, email, social)', col1: true, col2: true, col3: true },
  { feature: 'Shared omnichannel inbox', col1: true, col2: true, col3: true },
  { feature: 'Broadcasting & campaigns', col1: true, col2: true, col3: true },
  { feature: 'Included conversations / mo', col1: '2,500', col2: '15,000', col3: 'Custom' },
  { feature: 'Team seats', col1: '5', col2: '20', col3: 'Unlimited' },
  { feature: 'Analytics & reporting', col1: 'Standard', col2: 'Advanced', col3: 'Advanced + export' },
  { feature: 'Integrations & open API', col1: true, col2: true, col3: true },
  { feature: 'Custom AI agent training', col1: false, col2: true, col3: true },
  { feature: 'SSO & advanced security', col1: false, col2: false, col3: true },
  { feature: 'Dedicated success manager', col1: false, col2: false, col3: true },
  { feature: 'Support', col1: 'Email', col2: 'Priority', col3: 'SLA-backed' },
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

      <PricingTrustBar items={TRUST} />

      <PlanIncludesShowcase
        eyebrow="Every plan includes"
        title={<>The same full platform in every tier</>}
        subtitle="Tiers change your volume, seats and support — never which channels or capabilities you get. Even the free plan runs the whole stack."
        ribbon={<>One price &middot; every capability &middot; even on Free</>}
        groups={INCLUDED}
      />

      <PricingTiers
        title="One plan family. Four sizes."
        subtitle="Start free and upgrade only when you outgrow a tier. Every plan includes the AI agent, every channel, the shared inbox and broadcasting — priced in USD, right here on the page."
        plans={PLANS}
      />

      <PricingCompare
        eyebrow="Plan by plan"
        title="What changes as you scale"
        subtitle="The platform is identical across tiers — these are the volume, seat and support differences between the paid plans."
        colLabels={['Growth', 'Scale', 'Enterprise']}
        rows={TIER_ROWS}
      />

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
