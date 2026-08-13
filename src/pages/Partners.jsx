import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, EcosystemGrid, FeatureGrid, HowItWorks, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconDollar, IconMegaphone, IconCode, IconUsers, IconLink, IconCart, IconChat, IconChart, IconPlug } from '../components/icons.jsx'
import StatBand from '../components/StatBand.jsx'

const STATS = [
  { value: '2019', label: 'Trusted since', desc: 'Infrastructure proven with thousands of Indian businesses.' },
  { value: '4', label: 'Ways to partner', desc: 'Referral, reseller, integration or operator — pick what fits.' },
  { value: 'Monthly', label: 'Revenue payouts', desc: 'Commission calculated on real client usage, paid every month.' },
  { value: 'Verified', label: 'WhatsApp BSP', desc: 'A DLT-compliant, TRAI-approved WhatsApp Business Solution Provider.' },
]

const TRACKS = [
  { icon: <IconMegaphone />, title: 'Referral', desc: 'Send us a lead and earn a commission on every deal that closes — no delivery work on your side.' },
  { icon: <IconDollar />, title: 'Reseller', desc: 'Offer the platform under your own brand at partner rates, and set the pricing your customers pay.' },
  { icon: <IconCode />, title: 'Integration', desc: 'Build a native connector on our open API, get listed, and reach our customer base.' },
  { icon: <IconUsers />, title: 'Operator', desc: 'Manage many clients from multi-tenant sub-accounts with centralised reporting across all of them.' },
]

const BENEFITS = [
  { icon: <IconDollar />, title: 'Recurring revenue share', desc: 'Commission is calculated against real client usage and paid out every month — not a one-off bounty.' },
  { icon: <IconUsers />, title: 'A dedicated partner manager', desc: 'A named manager who helps you scope deals and onboard clients — not a shared support queue.' },
  { icon: <IconMegaphone />, title: 'Co-marketing', desc: 'Joint case studies, directory listings and campaigns that put your brand in front of more buyers.' },
  { icon: <IconPlug />, title: 'One platform, nothing to build', desc: 'Agentic AI, every channel and broadcasting on a single stack — no infrastructure to run yourself.' },
]

const USE_CASES = [
  { icon: <IconLink />, title: 'CRM workflows', desc: 'Trigger messages straight from customer records and keep every system in sync automatically.' },
  { icon: <IconCart />, title: 'E-commerce messaging', desc: 'Order updates, shipping alerts and cart-recovery flows that turn conversations into revenue.' },
  { icon: <IconChat />, title: 'Helpdesk routing', desc: 'Route WhatsApp and SMS conversations into the support tools your clients already use.' },
  { icon: <IconChart />, title: 'Centralised reporting', desc: 'Track usage, delivery and results across every client account from a single dashboard.' },
]

const STEPS = [
  { title: 'Reach out', desc: 'Send us a bit about your business and the clients you work with through the contact form.' },
  { title: 'Map your track', desc: 'We schedule a short alignment call and pick the best fit — referral, reseller, integration or operator.' },
  { title: 'Onboard and go live', desc: 'Get your partner account, resources and first clients live — usually in days, not months.' },
]

const FAQS = [
  { q: 'Who can join the partner program?', a: 'Four kinds of partners: agencies delivering customer-experience projects, resellers offering SMSLocal across channels to their customers, technology partners integrating through our open API, and operators managing multiple clients.' },
  { q: 'How is commission paid?', a: 'Commission is calculated against real client usage and paid out monthly, so it grows as your accounts grow — tracked transparently in your partner dashboard.' },
  { q: 'Is white-labeling available?', a: 'The white-label program is actively being built out. In the meantime, resellers can already purchase at partner rates and set their own customer pricing.' },
  { q: 'Do I need to build any messaging infrastructure?', a: 'No. Carrier relationships, DLT registration, TRAI compliance and platform uptime are all handled for you — you sell the outcome, we run the plumbing.' },
  { q: 'How do I apply?', a: 'Reach out through our contact form with a bit about your business and client base, and our partnerships team will take it from there.' },
]

function Partners() {
  return (
    <>
      <Seo
        title="SMSLocal Partner Program"
        description="Partner with SMSLocal on AI and messaging. Refer, resell or integrate, and earn recurring revenue."
        keywords={['SMSLocal partner program', 'WhatsApp reseller program', 'messaging reseller', 'agentic AI partner']}
      />

      <Hero
        eyebrow="Partners"
        title={<>Partner with SMSLocal on <span className="grad-word">agentic AI</span></>}
        subtitle="Grow with a platform that bundles agentic AI, every messaging channel and broadcasting — refer, resell, integrate or operate, with recurring revenue share."
        primaryCta={{ label: 'Become a Partner', href: '/contact-us/' }}
        secondaryCta={{ label: 'Explore Agentic AI', href: '/products/ai-agents/agentic-ai/' }}
      />

      <StatBand items={STATS} />

      <EcosystemGrid
        title={<>Four ways to partner</>}
        subtitle="Choose the track that matches how you already work with your customers."
        items={TRACKS}
        variant="cards"
        alt
      />

      <NarrativeCompare
        heading={<>Your clients want agentic AI. They don't need you to build the plumbing.</>}
        paragraphs={[
          "Your clients want messaging, chatbots and AI agents that simply work — they don't care who runs the carrier links, the DLT registration or the platform uptime behind it.",
          'Building all of that yourself means carrier relationships, compliance paperwork and infrastructure you have to maintain forever — a long road before you earn anything.',
          <>Partner instead and <strong>you sell the outcome while we run the platform</strong> — infrastructure already live for thousands of businesses, as a verified WhatsApp Business Solution Provider.</>,
        ]}
        leftLabel="Build it yourself"
        leftItems={[
          'Negotiate your own carrier relationships',
          'Handle DLT registration and TRAI compliance',
          'Maintain uptime and message delivery',
          'A long build before the first rupee of revenue',
        ]}
        rightLabel="Partner with SMSLocal"
        rightItems={[
          'Sell on a platform that\'s already live',
          'Carriers and compliance handled for you',
          'Launch clients in days, not months',
          'Earn recurring revenue from day one',
        ]}
      />

      <FeatureGrid title={<>What every partner gets</>} items={BENEFITS} alt />

      <EcosystemGrid
        title={<>What partners build on SMSLocal</>}
        subtitle="One open platform behind the solutions your clients actually ask for."
        items={USE_CASES}
      />

      <HowItWorks title={<>Becoming a partner takes three steps</>} steps={STEPS} alt />

      <CTABanner
        title="Grow your business as an SMSLocal partner"
        subtitle="Tell us about your business and client base, and our partnerships team will map the right track for you."
        cta={{ label: 'Become a Partner', href: '/contact-us/' }}
      />

      <FAQ title={<>Partners — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default Partners
