import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, TripleCompareTable, FAQ } from '../components/sections/Sections.jsx'
import {
  IconMegaphone, IconBell, IconShield, IconCode, IconGlobe, IconBolt, IconChart,
  IconClock, IconCalendar, IconUsers, IconLink, IconCart, IconBook, IconDollar,
} from '../components/icons.jsx'
import BulkSmsHeroMock from '../components/BulkSmsHeroMock.jsx'
import DarkCtaCard from '../components/DarkCtaCard.jsx'
import StatBand from '../components/StatBand.jsx'
import { UploadContactsMock, ComposeMessageMock, SendTrackMock } from '../components/StepMocks.jsx'
import SmsNotificationGrid from '../components/SmsNotificationGrid.jsx'
import CampaignStepsShowcase from '../components/CampaignStepsShowcase.jsx'
import IndustryPillars from '../components/IndustryPillars.jsx'
import WhyUsZebra from '../components/WhyUsZebra.jsx'

const CHANNEL_STATS = [
  { icon: <IconBolt />, value: 'Seconds', label: 'Time to deliver', desc: 'Messages hit the handset in seconds, not minutes.' },
  { icon: <IconGlobe />, value: '190+', label: 'Countries covered', desc: 'Direct carrier routes on every major network.' },
  { icon: <IconChart />, value: '~98%', label: 'Typical open rate', desc: 'Read far more reliably than email or app push.' },
  { icon: <IconClock />, value: 'Minutes', label: 'Typical time to read', desc: 'Most texts are opened almost as soon as they land.' },
]

const FEATURES = [
  { icon: <IconMegaphone />, title: 'Bulk marketing', desc: 'Blast promotions and offers to segmented lists in seconds.' },
  { icon: <IconBell />, title: 'Alerts & notifications', desc: 'Send order updates, appointment reminders and account alerts.' },
  { icon: <IconShield />, title: 'OTP & verification', desc: 'Verify signups and logins with fast, reliable OTP delivery.' },
  { icon: <IconCalendar />, title: 'Scheduled sends', desc: 'Queue a campaign for the hour your audience actually reads.' },
  { icon: <IconUsers />, title: 'Audience segments', desc: 'Filter by tag, geography or opt-in status before you send.' },
  { icon: <IconCode />, title: 'Developer API', desc: 'Prefer to code it yourself? Use our SMS API for full control.' },
]

const STEPS = [
  { title: 'Upload contacts', desc: 'Import a list or connect your CRM — dedupe and opt-outs handled automatically.', visual: <UploadContactsMock /> },
  { title: 'Write your message', desc: 'Personalize with merge fields and schedule for the best send time.', visual: <ComposeMessageMock /> },
  { title: 'Send & track', desc: 'Monitor delivery, clicks and replies from a single campaign dashboard.', visual: <SendTrackMock /> },
]

const INDUSTRIES = [
  { icon: <IconCart />, title: 'Retail & ecommerce', desc: 'Flash sales, back-in-stock pings and abandoned-cart nudges that land while intent is still warm.' },
  { icon: <IconCalendar />, title: 'Clinics & healthcare', desc: 'Appointment confirmations and reminders that quietly cut the no-shows nobody was tracking.' },
  { icon: <IconBook />, title: 'Schools & universities', desc: 'Campus closures, exam updates and emergency alerts that reach every student without an app.' },
  { icon: <IconDollar />, title: 'Banking & fintech', desc: 'Transaction alerts and login codes delivered on a channel that works without a data connection.' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'Global carrier network', desc: 'Direct routes across 190+ countries for high deliverability.' },
  { icon: <IconBolt />, title: 'High throughput', desc: 'Send millions of messages per hour without throttling.' },
  { icon: <IconChart />, title: 'Real-time reporting', desc: 'Track delivery, click-through and opt-out rates live.' },
  { icon: <IconShield />, title: 'Compliance built-in', desc: 'Opt-in/opt-out handling and sender ID rules managed for you.' },
  { icon: <IconLink />, title: 'Fits your stack', desc: 'Connect your CRM, or drive everything through the REST API.' },
  { icon: <IconUsers />, title: 'Support that answers', desc: 'Real engineers on call, not a ticket queue that goes quiet.' },
]

const FAQS = [
  { q: 'What is bulk SMS used for?', a: 'Bulk SMS is used for marketing campaigns, transactional alerts, OTP verification, and mass notifications sent to large contact lists at once.' },
  { q: 'Can I send bulk SMS without coding?', a: 'Yes — use the no-code campaign dashboard to upload contacts, write your message and send. Developers can use the SMS API instead.' },
  { q: 'How fast do messages actually arrive?', a: 'On supported routes most messages reach the handset within seconds, because we send over direct carrier connections rather than through intermediaries.' },
  { q: 'Can I personalize each message?', a: 'Yes. Merge fields let you drop a first name, order number or appointment time into each message, so every recipient gets a message written for them.' },
  { q: "What's the difference between promotional and transactional SMS?", a: 'Promotional messages carry marketing content and are subject to opt-in and time-of-day rules. Transactional messages — OTPs, order updates, security alerts — are tied to something the customer already did, and are treated differently by carriers.' },
  { q: 'How is bulk SMS priced?', a: 'Pricing is based on message volume and destination country. See the pricing page for current rates.' },
  { q: 'Do you support two-way SMS?', a: 'Yes, replies are routed back into your dashboard or forwarded to your webhook via the SMS API.' },
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
        title="Send bulk SMS worldwide with high deliverability"
        subtitle="A reliable SMS gateway for marketing, alerts and OTP — send from a no-code dashboard, or integrate our developer API for full control."
        primaryCta={{ label: 'Start Sending', href: '/contact' }}
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
        visual={<BulkSmsHeroMock />}
      />

      <StatBand
        title="Why teams still reach for text first"
        subtitle="No app to install, no inbox to compete with — just a message on the screen your customer is already holding."
        items={CHANNEL_STATS}
        alt
      />

      <NarrativeCompare
        heading={<>A promotion sent by email might get opened next week. Or never.</>}
        paragraphs={[
          "Email and app push both depend on something you don't control — an inbox the customer barely checks, or a notification a phone has already learned to ignore.",
          "So the message technically \"sends,\" the campaign dashboard shows it as delivered, and the customer never actually sees it in time for the offer to matter.",
          <>A text lands on a lock screen within seconds — <strong>read on a device that's always in the customer's hand</strong>, no app or inbox required.</>,
        ]}
        leftLabel="Email & push campaigns"
        leftItems={[
          'Buried in an inbox or a notification tray',
          'Needs an app install or an active data connection',
          'Read within hours, if read at all',
          'Filtered by spam rules or OS-level throttling',
        ]}
        rightLabel="Bulk SMS, built to be seen"
        rightItems={[
          'Lands directly on the lock screen',
          'Works on any phone, no app or wifi needed',
          'Read within minutes of sending, on average',
          'Delivered over carrier-grade routing, not a spam filter',
        ]}
      />

      <SmsNotificationGrid eyebrow="Features" title={<>Built for every SMS use case</>} items={FEATURES} alt />

      <CampaignStepsShowcase eyebrow="How it works" title={<>Launch a campaign in minutes</>} steps={STEPS} />

      <IndustryPillars
        eyebrow="Industries"
        title="What teams actually send"
        subtitle="The same gateway, put to work very differently depending on who's sending."
        items={INDUSTRIES}
        alt
      />

      <TripleCompareTable
        title={<>Bulk SMS versus every other channel</>}
        subtitle="How text stacks up against email and app push for reach and speed."
        col1Label="Email"
        col2Label="Push notification"
        col3Label="Bulk SMS"
        rows={[
          { feature: 'Typical open rate', col1: '~20-30%', col2: '~4-8%', col3: '~98%' },
          { feature: 'Requires an app install', col1: false, col2: true, col3: false },
          { feature: 'Works without data or wifi', col1: false, col2: false, col3: true },
          { feature: 'Average time to open', col1: 'Hours to days', col2: 'Minutes, if noticed', col3: 'Under 3 minutes' },
          { feature: 'Reaches feature phones', col1: false, col2: false, col3: true },
          { feature: 'Delivery path', col1: 'Spam filters', col2: 'OS-level throttling', col3: 'Carrier-grade routing' },
        ]}
      />

      <WhyUsZebra eyebrow="Why us" title={<>Why send bulk SMS with SMSLocal</>} items={WHY_US} alt />

      <FAQ title={<>Bulk SMS — frequently asked questions</>} items={FAQS} />

      <DarkCtaCard
        title="Millions of texts, one dashboard to run them from."
        subtitle="Upload your list, write the message once, and watch delivery, clicks and replies update live as it sends."
        primaryCta={{ label: 'Start Sending', href: '/contact' }}
        secondaryCta={{ label: 'Talk to Sales', href: '/contact' }}
      />
    </>
  )
}

export default BulkSms
