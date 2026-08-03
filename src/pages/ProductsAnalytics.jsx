import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import AnalyticsPulseHero from '../components/AnalyticsPulseHero.jsx'
import AnalyticsFunnel from '../components/AnalyticsFunnel.jsx'
import AnalyticsPipeline from '../components/AnalyticsPipeline.jsx'
import AnalyticsReportIndex from '../components/AnalyticsReportIndex.jsx'

const FAQS = [
  {
    q: 'Is the analytics real-time or batched?',
    a: 'Both. Delivery, engagement and conversion events stream into your dashboards in real time, while heavier attribution and cohort reports are continuously recomputed in the background — so live monitoring and historical analysis use the same single source of truth.',
  },
  {
    q: 'Can I export the data or pull it into my own tools?',
    a: 'Yes. Every report exports to CSV or a scheduled email, and the full metrics API lets you push delivery, engagement, conversion and revenue data into your warehouse, BI tool or CRM. Nothing is locked inside a silo.',
  },
  {
    q: 'Which channels does the analytics cover?',
    a: 'One layer spans SMS, WhatsApp, RCS, email, chatbots and AI agents. Numbers are unified across every channel a customer touches, so a journey that starts on SMS and finishes in a chatbot is measured as one path — not four disconnected reports.',
  },
  {
    q: 'How does revenue attribution work?',
    a: 'Each conversion is tied back to the specific message, campaign and channel that drove it, and to the customer record behind it. You see funnel drop-off, ROI per campaign and revenue per channel without stitching exports together by hand.',
  },
]

function ProductsAnalytics() {
  return (
    <>
      <Seo
        title="Analytics & Insights Across Every Channel"
        description="One source of truth for delivery, engagement, conversion and revenue across SMS, WhatsApp, chatbots and AI agents — real-time, exportable and silo-free."
        keywords={['messaging analytics', 'campaign analytics', 'conversion tracking', 'customer engagement analytics']}
      />

      <Hero
        eyebrow="Analytics & Insights"
        title={<>Every channel, <span className="grad-word">one analytics layer</span></>}
        subtitle="Delivery, engagement, conversion funnels, agent and bot performance and revenue attribution — measured together in real time, exportable, with no data silos to reconcile."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<AnalyticsPulseHero />}
      />

      <AnalyticsFunnel />

      <AnalyticsPipeline />

      <AnalyticsReportIndex />

      <CTABanner
        title="Turn every message into measurable insight"
        subtitle="See delivery, engagement, conversion and revenue for every channel in one live workspace."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
        variant="spotlight"
      />

      <FAQ title={<>Analytics — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ProductsAnalytics
