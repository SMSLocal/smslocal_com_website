import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconLink, IconShield, IconUsers, IconClock, IconChart, IconChat } from '../components/icons.jsx'
import SmsChatMock from '../components/SmsChatMock.jsx'
import BroadcastCapabilityOrbit from '../components/BroadcastCapabilityOrbit.jsx'
import BroadcastSteps from '../components/BroadcastSteps.jsx'
import BroadcastMetrics from '../components/BroadcastMetrics.jsx'

const CAPABILITIES = [
  { icon: <IconLink />, title: 'Link tracking built in', desc: 'Every shortened link in a broadcast reports clicks back to the campaign, so you see what actually drove action.' },
  { icon: <IconUsers />, title: 'Segmentation that targets right', desc: 'Send to the exact slice of your list — by location, tag or past activity — instead of blasting everyone the same message.' },
  { icon: <IconChat />, title: 'Personalized variables', desc: 'Merge in each contact\'s name, order number or balance so every message reads like it was written for them.' },
  { icon: <IconShield />, title: 'STOP & HELP handled automatically', desc: 'Opt-outs and help requests are processed instantly on every send, keeping every campaign compliant by default.' },
  { icon: <IconClock />, title: 'Schedule & send at scale', desc: 'Queue a broadcast for the right moment and it goes out automatically to your whole list, at full A2P throughput.' },
  { icon: <IconChart />, title: 'Delivery receipts on every message', desc: 'See delivered, failed and pending status per message, so you know exactly what reached its recipient.' },
]

const STEPS = [
  { title: 'Import your opt-in list', desc: 'Upload contacts or sync your CRM, with consent and opt-out status kept on record.' },
  { title: 'Write and personalize', desc: 'Draft your message and merge in names, order details or any variable that makes it personal.' },
  { title: 'Segment and schedule', desc: 'Target the right slice of your list and pick the exact moment the broadcast should go out.' },
  { title: 'Send and track', desc: 'Broadcast to the whole segment at once, then watch delivery receipts and link clicks roll in live.' },
]

const WHY_METRICS = [
  { value: 98, suffix: '%', heading: 'Delivery rate', desc: 'Sent over direct A2P routes for reliable throughput, not a gray-market gateway that can go down.' },
  { value: 3, suffix: 'x', heading: 'Reply lift with AI', desc: 'An agentic AI answering replies turns a one-way blast into a two-way conversation that converts.' },
  { value: 1, suffix: '', heading: 'Shared inbox', desc: 'Every reply from every broadcast lands in the same place your whole team already works from.' },
  { value: 190, suffix: '+', heading: 'Countries reached', desc: 'A2P SMS routes reach almost any phone, no app or internet connection required.' },
  { value: 99, suffix: '%', heading: 'Open rate', desc: 'SMS is opened by nearly everyone who receives it, and usually within minutes.' },
]

const FAQS = [
  { q: 'What is A2P SMS broadcasting?', a: 'A2P (application-to-person) SMS broadcasting is sending one message to a large opted-in audience at once over registered, compliant SMS routes — built for reliable delivery at volume, not one-off personal texts.' },
  { q: 'Does every recipient need to opt in first?', a: 'Yes. We help you capture and store opt-ins, and STOP/HELP keyword handling is processed automatically on every campaign so opt-outs are respected instantly.' },
  { q: 'Can I personalize each message in a broadcast?', a: 'Yes — merge in variables like name, order number or balance so every recipient gets a message that reads like it was written just for them.' },
  { q: 'What happens when someone replies to a broadcast?', a: 'Replies land in one shared inbox, where your team or an AI agent can respond, keeping the conversation going instead of ending at the blast.' },
  { q: 'Can I track link clicks and delivery?', a: 'Yes — every message reports delivery status, and shortened links in the message report clicks back to the campaign.' },
]

function SmsBroadcasting() {
  return (
    <>
      <Seo
        title="A2P SMS Broadcasting and Bulk SMS Marketing Campaigns"
        description="Run SMS broadcasting at scale with segmentation, personalisation, link tracking, STOP and HELP handling and delivery receipts, with AI answering the replies."
        keywords={['SMS broadcasting', 'A2P SMS', 'bulk SMS marketing', 'SMS broadcast campaigns']}
      />

      <Hero
        eyebrow="SMS broadcasting"
        title={<>Broadcast to your whole list, <span className="grad-word">at A2P scale</span></>}
        subtitle="Send segmented, personalized SMS campaigns to your entire opted-in audience — with link tracking, delivery receipts and automatic STOP/HELP handling, and AI answering every reply."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<SmsChatMock />}
      />

      <BroadcastCapabilityOrbit
        eyebrow="Capabilities"
        title={<>Everything a broadcast needs, built in</>}
        subtitle="Segmentation, personalization, compliance and full delivery insight — one workflow from list to reply."
        items={CAPABILITIES}
      />

      <BroadcastSteps
        eyebrow="How it works"
        title={<>From opt-in list to live delivery in four steps</>}
        subtitle="Import, personalize, segment, send — then track every message as it lands."
        steps={STEPS}
      />

      <BroadcastMetrics
        eyebrow="Why us"
        title={<>Numbers that make SMS the channel to broadcast on</>}
        subtitle="Illustrative figures — the point is a channel nearly everyone opens, worldwide, with no app required."
        items={WHY_METRICS}
      />

      <CTABanner
        title="Reach your whole list, reliably"
        subtitle="Send a segmented, personalized SMS broadcast with delivery receipts and AI answering the replies."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>SMS broadcasting — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default SmsBroadcasting
