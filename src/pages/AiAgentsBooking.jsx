import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemChannelConverge from '../components/ProblemChannelConverge.jsx'
import FeatureCapabilityTabs from '../components/FeatureCapabilityTabs.jsx'
import StepsZigzagFlow from '../components/StepsZigzagFlow.jsx'
import WhyUsAgendaPanel from '../components/WhyUsAgendaPanel.jsx'
import BookingTimelineHeroMock from '../components/BookingTimelineHeroMock.jsx'
import {
  IconCalendar, IconClock, IconRefresh, IconBell, IconCheck, IconGlobe,
  IconLink, IconBrain, IconUsers, IconChart,
} from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconCalendar />, title: 'Checks real availability', desc: 'Reads your calendar or scheduling tool live, so every slot it offers is genuinely open — no back-and-forth, no clashes.' },
  { icon: <IconCheck />, title: 'Confirms and books in-chat', desc: 'The customer picks a time and the agent books it on the spot, then sends confirmation details in the same conversation.' },
  { icon: <IconBell />, title: 'Reminds and reduces no-shows', desc: 'Sends automatic reminders before the appointment and lets customers reschedule with a tap instead of vanishing.' },
  { icon: <IconRefresh />, title: 'Reschedules and cancels', desc: 'Handles changes autonomously — frees the old slot, offers new ones, and updates every connected system instantly.' },
]

const STEPS = [
  { title: 'Connect your calendar', desc: 'Link Google Calendar, Outlook, or your booking tool so the agent works from live, real-time availability.' },
  { title: 'Set your rules', desc: 'Define service types, durations, buffers, working hours and how far ahead people can book.' },
  { title: 'Deploy across channels', desc: 'Turn it on for WhatsApp, web chat, SMS and more — one agent takes bookings everywhere your customers are.' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'Books on every channel', desc: 'WhatsApp, web chat, SMS, Instagram and more — one booking agent, every touchpoint.' },
  { icon: <IconLink />, title: 'Syncs with your stack', desc: 'Two-way sync with your calendar and CRM so records stay accurate everywhere, automatically.' },
  { icon: <IconBrain />, title: 'Understands natural language', desc: '"Sometime next Tuesday afternoon" becomes a real, confirmed slot — no rigid menus.' },
  { icon: <IconClock />, title: 'Timezone-aware', desc: 'Reads each customer\'s timezone and confirms the right local time, every time.' },
  { icon: <IconUsers />, title: 'Human handoff when needed', desc: 'Complex or high-value bookings pass to your team with the full conversation attached.' },
  { icon: <IconChart />, title: 'Insight on every booking', desc: 'See booking volume, no-show rates and popular slots to plan capacity with confidence.' },
]

const FAQS = [
  { q: 'How is a booking agent different from a scheduling link?', a: 'A scheduling link makes the customer do the work in a separate tool. An AI booking agent handles the whole thing conversationally — it understands the request in natural language, offers real open slots, confirms, and sends reminders, all inside the chat the customer is already in.' },
  { q: 'Which calendars and tools does it connect to?', a: 'It syncs with Google Calendar, Outlook and popular scheduling and CRM tools, reading live availability and writing bookings back automatically so every system stays in sync.' },
  { q: 'Can it handle rescheduling and cancellations?', a: 'Yes. The agent reschedules and cancels autonomously — it frees the old slot, offers new times, and updates your calendar and records without anyone on your team lifting a finger.' },
  { q: 'Does it prevent double bookings?', a: 'It checks real-time availability before confirming any slot, so two customers can never book the same time. Buffers and working-hour rules are respected too.' },
  { q: 'What channels can customers book on?', a: 'WhatsApp, web chat, SMS, Instagram, Messenger and more — the same agent takes bookings across every channel you enable, with one shared calendar behind it.' },
  { q: 'How fast can it go live?', a: 'Connect your calendar, set your booking rules, and deploy in days — no code required. Most teams are taking real bookings within their first week.' },
]

function AiAgentsBooking() {
  return (
    <>
      <Seo
        title="AI Booking Agent for Appointments & Reservations"
        description="Book appointments and reservations inside the chat with an agentic AI booking agent that checks live availability and confirms instantly, cutting no-shows."
        keywords={['AI booking agent', 'AI appointment scheduling', 'agentic AI booking', 'automated appointment booking', 'AI reservation agent']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>An AI agent that fills your calendar <span className="grad-word">while you sleep</span></>}
        subtitle="Let customers book, reschedule and confirm appointments right inside the chat — an agent that checks live availability, prevents double bookings, and reminds so slots don't go empty."
        primaryCta={{ label: 'Deploy a Booking Agent', href: '/contact-us' }}
        secondaryCta={{ label: 'See all AI Agents', href: '/ai-agents' }}
        visual={<BookingTimelineHeroMock />}
      />

      <ProblemChannelConverge
        eyebrow="The problem"
        heading={<>Every booking that needs a human is a booking you can lose.</>}
        paragraph="Phone tag, forms that get abandoned, and hold-for-confirmation all leak intent that a booking agent captures the moment it's asked."
        alt
      />

      <FeatureCapabilityTabs
        eyebrow="Capabilities"
        title={<>Everything it takes to run bookings on autopilot</>}
        subtitle="From the first question to the reminder before the appointment."
        items={FEATURES}
      />

      <StepsZigzagFlow
        eyebrow="How it works"
        title={<>Live in three steps</>}
        subtitle="Connect, configure, deploy — no code, no scheduling headaches."
        steps={STEPS}
        alt
      />

      <WhyUsAgendaPanel
        eyebrow="Why it works"
        title={<>Built to book, not just chat</>}
        subtitle="A booking agent that fits how your customers ask and how your business runs."
        items={WHY_US}
      />

      <CTABanner
        title="Turn every conversation into a confirmed booking"
        subtitle="Connect your calendar, set your rules, and let the agent fill your schedule across every channel — day and night."
        cta={{ label: 'Deploy a Booking Agent', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI booking agent — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsBooking
