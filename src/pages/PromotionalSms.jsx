import Seo from '../components/Seo.jsx'
import { Hero, FeatureGrid, HowItWorks, WhyUs, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMegaphone, IconUsers, IconCalendar, IconPencil, IconChart, IconShield, IconGlobe, IconBolt } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconUsers />, title: 'List segmentation', desc: 'Target campaigns by location, purchase history or any custom attribute.' },
  { icon: <IconCalendar />, title: 'Scheduled sends', desc: 'Queue a campaign for the best send time, or trigger it on demand.' },
  { icon: <IconPencil />, title: 'Personalized messages', desc: 'Merge fields drop in each recipient\'s name, offer or order detail.' },
  { icon: <IconShield />, title: 'Built-in compliance', desc: 'Opt-in tracking, STOP/HELP handling and suppression lists managed for you.' },
]

const STEPS = [
  { title: 'Upload or segment your list', desc: 'Import contacts or build a segment from existing customer data.' },
  { title: 'Write your campaign', desc: 'Personalize with merge fields and preview before you send.' },
  { title: 'Send and track results', desc: 'Watch delivery, clicks and opt-outs update live as it goes out.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Real results tracking', desc: 'See delivery, click-through and opt-out rates for every campaign.' },
  { icon: <IconGlobe />, title: 'High deliverability', desc: 'Direct carrier routes keep promotional sends landing in the inbox.' },
  { icon: <IconBolt />, title: 'Send at scale', desc: 'Millions of messages per campaign without throttling.' },
  { icon: <IconShield />, title: 'Compliant by design', desc: 'Opt-out handling and suppression lists applied automatically.' },
]

const TESTIMONIALS = [
  { quote: 'Our SMS campaigns now outperform email on open rate by a wide margin — and setup took an afternoon.', name: 'Priya Nair', role: 'Growth Marketer, D2C brand' },
  { quote: 'Segmenting by purchase history instead of blasting everyone doubled our click-through rate.', name: 'Dev Malhotra', role: 'Ecommerce Manager' },
  { quote: 'Opt-outs and compliance used to worry us. Now it\'s handled automatically on every send.', name: 'Louise Carter', role: 'Marketing Ops Lead' },
]

const FAQS = [
  { q: 'What is promotional SMS?', a: 'Marketing messages sent to opted-in customers — offers, sales, announcements and campaigns, as opposed to service-related transactional alerts.' },
  { q: 'Do I need opt-in consent to send promotional SMS?', a: 'Yes, promotional messages require marketing consent. We track opt-ins and handle STOP/HELP replies and suppression lists automatically.' },
  { q: 'Can I segment my list for different campaigns?', a: 'Yes, segment by location, purchase history, tags or any custom field, and send different messages to each segment.' },
  { q: 'How is this different from transactional SMS?', a: 'Promotional SMS is a marketing campaign requiring opt-in; transactional SMS is triggered by an account event the customer already expects. See our transactional SMS page for that side.' },
]

function PromotionalSms() {
  return (
    <>
      <Seo
        title="Promotional SMS & SMS Marketing Service"
        description="Run high-converting SMS marketing campaigns. Segment lists, schedule sends, personalize messages and track results — with built-in opt-in compliance."
        keywords={['SMS marketing', 'bulk SMS marketing', 'SMS campaigns', 'SMS advertising', 'send promotional text messages']}
      />

      <Hero
        eyebrow="Promotional SMS"
        title={<>SMS marketing campaigns that <span className="grad-word">actually get opened</span></>}
        subtitle="Segment your list, personalize the message, and send at scale — with opt-in compliance and reporting built in from the first send."
        primaryCta={{ label: 'Start a Campaign', href: '/contact-us' }}
        secondaryCta={{ label: 'View Bulk SMS', href: '/bulk-sms' }}
      />

      <FeatureGrid title={<>Everything you need to run SMS marketing</>} items={FEATURES} alt />

      <HowItWorks title={<>Launch a campaign in minutes</>} steps={STEPS} />

      <WhyUs title={<>Why brands run promotions on SMSLocal</>} items={WHY_US} alt />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} />

      <CTABanner
        title="Send your first SMS campaign today"
        subtitle="Upload a list, write the message, and watch it go out live."
        cta={{ label: 'Start a Campaign', href: '/contact-us' }}
      />

      <FAQ title={<>Promotional SMS — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default PromotionalSms
