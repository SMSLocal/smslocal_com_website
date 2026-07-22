import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner, Testimonials } from '../components/sections/Sections.jsx'
import BulkIntegrationSync from '../components/BulkIntegrationSync.jsx'
import BulkSmsSendFlash from '../components/BulkSmsSendFlash.jsx'
import BulkUseCaseFeed from '../components/BulkUseCaseFeed.jsx'
import BulkCapabilitiesConsole from '../components/BulkCapabilitiesConsole.jsx'
import BulkStepsFlow from '../components/BulkStepsFlow.jsx'
import BulkGlobalReach from '../components/BulkGlobalReach.jsx'
import BulkComplianceStamp from '../components/BulkComplianceStamp.jsx'

const STEPS = [
  { title: 'Upload your list', desc: 'Import a CSV or sync your CRM — duplicates and opt-outs are cleaned for you automatically.' },
  { title: 'Write once, personalise', desc: 'Drop in merge fields so every text reads like it was written for one person.' },
  { title: 'Send & track', desc: 'Fire now or schedule, then watch delivery and replies come in, in real time.' },
]

const TESTIMONIALS = [
  { quote: 'We moved every appointment reminder to SMSLocal and no-shows dropped by a third in the first month.', name: 'Priya Nair', role: 'Operations Lead, clinic network' },
  { quote: 'Launch texts sell out drops before the email even loads. Read in minutes, not filtered into spam.', name: 'Marcus Bell', role: 'Growth, DTC retail' },
  { quote: 'One CSV, merge fields, send. My team ships promotions without ever waiting on engineering.', name: 'Sofia Almeida', role: 'Marketing Manager' },
  { quote: 'Delivery is genuinely seconds and the reporting shows exactly what landed. Support actually answers.', name: 'Daniel Okoro', role: 'Product, fintech' },
  { quote: 'We send across nine countries from one dashboard and deliverability just holds. No babysitting routes.', name: 'Hannah Wei', role: 'Lifecycle Marketing' },
]

const FAQS = [
  { q: 'What is bulk SMS used for?', a: 'Bulk SMS sends one message to a large contact list at once — marketing campaigns, transactional alerts, appointment reminders, and OTP verification are the most common uses.' },
  { q: 'Can I send bulk SMS without coding?', a: 'Yes. Upload your contacts, write the message and send from the no-code dashboard. Developers who want full control can drive the same gateway through our SMS API instead.' },
  { q: 'How fast do messages actually arrive?', a: 'On supported routes most messages reach the handset within seconds, because we send over direct carrier connections rather than through intermediaries.' },
  { q: 'Can I personalise each message?', a: 'Yes. Merge fields drop a first name, order number or appointment time into each message, so every recipient gets a text written for them.' },
  { q: 'How is bulk SMS priced?', a: 'Pricing is based on message volume and destination country. See the pricing page for current rates.' },
]

function BulkSms() {
  return (
    <>
      <Seo
        title="Bulk SMS Service & Gateway for Business"
        description="Send bulk SMS worldwide with high deliverability. Reliable SMS gateway for alerts, marketing and OTP — no-code sending plus a developer API."
      />

      <Hero
        eyebrow="Bulk SMS"
        title={<>Send <span className="grad-word">bulk SMS</span> that lands in seconds, worldwide</>}
        subtitle="A reliable SMS gateway for marketing, alerts and OTP — fire a campaign from a no-code dashboard, or wire it straight into your product with our API."
        primaryCta={{ label: 'Start Sending', href: '/contact-us' }}
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
        visual={<BulkSmsSendFlash />}
      />

      <BulkUseCaseFeed
        eyebrow="Use cases"
        title="One gateway, every kind of text"
        subtitle="Promotions, alerts, reminders and verification codes — the same reliable route carries all of them."
      />

      <BulkStepsFlow
        eyebrow="How it works"
        title="Live in three steps"
        steps={STEPS}
        alt
      />

      <BulkCapabilitiesConsole
        eyebrow="Capabilities"
        title="Everything you need to send at scale"
        subtitle="A complete toolkit around every broadcast — no add-ons, no engineering required."
      />

      <BulkGlobalReach
        eyebrow="Global reach"
        title="Live in 190+ countries, not just the ones you tested"
        subtitle="Direct carrier routes worldwide keep delivery fast and reliable, wherever your customers are."
      />

      <BulkComplianceStamp
        eyebrow="Compliance"
        title="Sending at scale, without the compliance headache"
        subtitle="Every sender is registered, every opt-out is honored, and every campaign is approved before it goes out — handled for you."
      />

      <BulkIntegrationSync
        eyebrow="Integrations"
        title="Plug into the tools you already use"
        subtitle="Trigger messages straight from your CRM, store or workflow — no glue code required."
      />

      <Testimonials
        eyebrow="Customers"
        title={<>Teams that reach for text</>}
        items={TESTIMONIALS}
      />

      <CTABanner
        title="Millions of texts, one place to send them"
        subtitle="Upload your list, write the message once, and watch it land across every network you need to reach."
        cta={{ label: 'Start Sending', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>Bulk SMS — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default BulkSms
