import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import MergeReveal from '../components/MergeReveal.jsx'
import BroadcastCapabilityOrbit from '../components/BroadcastCapabilityOrbit.jsx'
import { IconPencil, IconShield, IconPackage, IconUsers, IconClock, IconChat } from '../components/icons.jsx'
import WaBroadcastHero from '../components/WaBroadcastHero.jsx'
import BroadcastSteps from '../components/BroadcastSteps.jsx'
import BroadcastMetrics from '../components/BroadcastMetrics.jsx'

const CAPABILITIES = [
  { icon: <IconPencil />, title: 'Personalized variables', desc: 'Merge in each contact’s name, order ID, date or balance so every broadcast reads like a note written just for them.' },
  { icon: <IconShield />, title: 'Approved templates', desc: 'Send on the official WhatsApp Business Platform using pre-approved message templates that keep every campaign compliant.' },
  { icon: <IconPackage />, title: 'Media, docs & buttons', desc: 'Attach product images, PDFs or receipts and add tappable quick-reply and call-to-action buttons.' },
  { icon: <IconUsers />, title: 'Audience segmentation', desc: 'Broadcast to the right slice — by location, language, tags or past activity — instead of blasting everyone the same way.' },
  { icon: <IconClock />, title: 'Schedule & send', desc: 'Queue a broadcast for the perfect moment and let it go out automatically, on time, to your whole list.' },
  { icon: <IconChat />, title: 'Delivery, reads & replies', desc: 'See delivery and read receipts, pick up every reply in one shared inbox, and let opt-outs handle themselves.' },
]

const STEPS = [
  { title: 'Import your opt-in audience', desc: 'Bring in contacts who’ve opted in — upload a list or sync your CRM — with consent kept on record.' },
  { title: 'Pick an approved template', desc: 'Choose a pre-approved WhatsApp template that fits your message and stays within platform policy.' },
  { title: 'Add personalization & media', desc: 'Merge in names and order details, attach images or documents, and drop in quick-reply buttons.' },
  { title: 'Send and track delivery', desc: 'Broadcast to everyone at once, then watch delivery, reads and replies roll in live.' },
]

const WHY_METRICS = [
  { value: 98, suffix: '%', heading: 'Read rate', desc: 'WhatsApp messages are widely reported to be read within minutes — well above email or SMS.' },
  { value: 3, suffix: 'x', heading: 'Reply lift', desc: 'A personal 1:1 thread invites the conversations a one-way blast never starts.' },
  { value: 1, suffix: '', heading: 'Shared inbox', desc: 'Every reply from every broadcast lands in one place your whole team works from.' },
  { value: 180, suffix: '+', heading: 'Countries reached', desc: 'WhatsApp’s global footprint puts your broadcast in front of contacts almost anywhere.' },
  { value: 99, suffix: '%', heading: 'Delivery rate', desc: 'Sent over the official WhatsApp Business Platform — no gray-market gateways to go down.' },
]

const FAQS = [
  { q: 'What is WhatsApp broadcasting?', a: 'It’s sending one message to many opted-in contacts at once on the official WhatsApp Business Platform. Each person receives it privately in their own 1:1 thread — not a group — so it feels personal and their replies come straight back to you.' },
  { q: 'Do contacts need to opt in first?', a: 'Yes. WhatsApp requires that every recipient has given consent to hear from your business. We help you capture and store opt-ins, and opt-outs are handled automatically on every send.' },
  { q: 'Why do broadcasts use approved templates?', a: 'Business-initiated WhatsApp messages must use message templates approved by WhatsApp. Templates keep your sends compliant while still letting you include personalized variables, media and buttons.' },
  { q: 'Can I personalize each message?', a: 'Absolutely. Merge in variables like name, order number, date or balance so every contact gets a message tailored to them, sent from your verified business profile.' },
  { q: 'What happens when someone replies?', a: 'Their reply opens a two-way conversation in one shared inbox, where your team — or a WhatsApp AI agent — can respond. You also get delivery and read receipts on every message you send.' },
]

function WhatsappBroadcasting() {
  return (
    <>
      <Seo
        title="WhatsApp Broadcasting for Businesses & Brands"
        description="Send one WhatsApp broadcast to your whole opted-in audience and reach each person in a personal thread, with templates, media and read receipts."
        keywords={['WhatsApp broadcasting', 'WhatsApp broadcast', 'WhatsApp Business Platform', 'bulk WhatsApp messages', 'WhatsApp message templates', 'WhatsApp marketing']}
      />

      <Hero
        eyebrow="WhatsApp broadcasting"
        title={<>Send one WhatsApp broadcast, <span className="grad-word">reach everyone personally</span></>}
        subtitle="Message your entire opted-in audience at once on the official WhatsApp Business Platform — personalized with their name, delivered to the app they check most, with read receipts and two-way replies in one shared inbox."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<WaBroadcastHero />}
      />

      <MergeReveal />

      <BroadcastCapabilityOrbit
        eyebrow="Capabilities"
        title={<>Everything a broadcast needs, built in</>}
        subtitle="Personalization, compliant templates, rich media and full delivery insight — one workflow from list to reply."
        items={CAPABILITIES}
      />

      <BroadcastSteps
        eyebrow="How it works"
        title={<>From opt-in list to live delivery in four steps</>}
        subtitle="Import, template, personalize, send — then track every message as it lands and gets read."
        steps={STEPS}
      />

      <BroadcastMetrics
        eyebrow="Why us"
        title={<>Numbers that make WhatsApp the channel to broadcast on</>}
        subtitle="Illustrative figures — the point is a channel people actually open, reply to, and reach worldwide."
        items={WHY_METRICS}
      />

      <CTABanner
        title="Reach your whole list, one person at a time"
        subtitle="Send a personalized WhatsApp broadcast to every opted-in contact — with receipts, replies and one shared inbox."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>WhatsApp broadcasting — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default WhatsappBroadcasting
