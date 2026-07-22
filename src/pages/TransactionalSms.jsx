import Seo from '../components/Seo.jsx'
import { Hero, FeatureGrid, HowItWorks, CompareTable, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconBell, IconReceipt, IconShield, IconRefresh, IconBolt, IconChart, IconGlobe, IconClock } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconBell />, title: 'Order & delivery alerts', desc: 'Confirmations, shipping updates and delivery notices sent the moment they happen.' },
  { icon: <IconShield />, title: 'OTP & authentication', desc: 'Login codes and verification texts delivered in seconds, worldwide.' },
  { icon: <IconReceipt />, title: 'Account notifications', desc: 'Payment receipts, balance alerts and account changes as they occur.' },
  { icon: <IconRefresh />, title: 'Triggered by your systems', desc: 'Fire a message automatically from your app, CRM or order system via API.' },
]

const STEPS = [
  { title: 'Connect your trigger', desc: 'Call our API from your app, order system or CRM whenever an event happens.' },
  { title: 'Map your message template', desc: 'Use merge fields so each alert is personalized without extra code.' },
  { title: 'Send instantly', desc: 'Messages go out in real time, with delivery status reported back to you.' },
]

const COMPARE_ROWS = [
  { feature: 'Purpose', left: 'Promotions, offers, campaigns', right: 'Order, account & security alerts' },
  { feature: 'Trigger', left: 'Scheduled or manual send', right: 'Fired automatically by an event' },
  { feature: 'Opt-in rules', left: 'Requires marketing consent', right: 'Sent as part of the service itself' },
  { feature: 'Priority routing', left: 'Standard throughput', right: 'High-priority, low-latency delivery' },
  { feature: 'Typical volume', left: 'Bursty, campaign-based', right: 'Continuous, event-driven' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Sub-second delivery', desc: 'Time-sensitive alerts like OTPs route through priority carrier paths.' },
  { icon: <IconGlobe />, title: 'Global reach', desc: 'Direct carrier connections across 190+ countries for consistent delivery.' },
  { icon: <IconChart />, title: 'Delivery visibility', desc: 'Real-time status for every message — sent, delivered or failed.' },
  { icon: <IconClock />, title: '24/7 reliability', desc: 'Built for continuous, always-on sending, not just scheduled campaigns.' },
]

const FAQS = [
  { q: 'What counts as a transactional SMS?', a: 'Any message tied to an account action or service the customer already expects — order updates, OTPs, receipts and account alerts, as opposed to marketing offers.' },
  { q: 'How is transactional SMS different from promotional SMS?', a: 'Transactional messages are triggered by an event and don’t require separate marketing opt-in, while promotional messages are campaigns that do. See our promotional SMS page for that side.' },
  { q: 'Can I send transactional SMS via API?', a: 'Yes — trigger sends directly from your app, order system or CRM using our REST API, with delivery status reported back in real time.' },
  { q: 'Is transactional SMS delivery faster?', a: 'Time-sensitive transactional messages like OTPs are routed with priority to minimize latency compared to standard bulk sends.' },
]

function TransactionalSms() {
  return (
    <>
      <Seo
        title="Transactional SMS Service & API"
        description="Send instant order, alert and account SMS notifications. Learn how transactional SMS differs from promotional and how to automate it via API."
        keywords={['transactional SMS API', 'transactional vs promotional SMS', 'SMS notifications API', 'automated SMS alerts']}
      />

      <Hero
        eyebrow="Transactional SMS"
        title={<>Order, alert and account SMS your customers <span className="grad-word">actually expect</span></>}
        subtitle="Trigger instant notifications from your app, CRM or order system — OTPs, delivery updates and account alerts, delivered with priority routing."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
      />

      <FeatureGrid title={<>Built for every transactional use case</>} items={FEATURES} alt />

      <HowItWorks title={<>Trigger your first alert in minutes</>} steps={STEPS} />

      <CompareTable
        title={<>Transactional vs promotional SMS</>}
        subtitle="Same network, different purpose — and different rules."
        leftLabel="Promotional SMS"
        rightLabel="Transactional SMS"
        rows={COMPARE_ROWS}
        alt
      />

      <WhyUs title={<>Why teams trust us for transactional alerts</>} items={WHY_US} />

      <CTABanner
        title="Wire up your first transactional alert"
        subtitle="Connect your app or CRM and start sending in minutes."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>Transactional SMS — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default TransactionalSms
