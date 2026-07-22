import Seo from '../components/Seo.jsx'
import { Hero, FeatureGrid, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import TouchpointCarousel from '../components/TouchpointCarousel.jsx'
import WhyUsChecklist from '../components/WhyUsChecklist.jsx'
import {
  IconCalendar, IconBell, IconRefresh, IconClock, IconShield, IconUsers, IconChart,
  IconGlobe, IconLink, IconMegaphone, IconBolt, IconReceipt, IconDollar,
} from '../components/icons.jsx'
import AgentAnalyticsMock from '../components/AgentAnalyticsMock.jsx'

const CAPABILITY_STRIP = [
  { icon: <IconShield />, title: 'Compliant messaging templates', desc: 'Pre-approved templates for every patient touchpoint, so reminders and alerts go out without manual review each time.' },
  { icon: <IconLink />, title: 'Nothing sensitive in the message', desc: 'Lab results and reports link out to a secure portal instead of sitting in a chat thread.' },
  { icon: <IconGlobe />, title: 'Reaches patients in their language', desc: 'Detects and replies in the patient\'s own language across your whole patient base.' },
  { icon: <IconChart />, title: 'One live feed, every touchpoint', desc: 'Reminders, replies and escalations land in a single feed your front desk can see in real time.' },
]

const USE_CASES = [
  { icon: <IconCalendar />, title: 'Appointment confirmations & reminders', desc: 'Confirms bookings and reminds patients ahead of every visit, with rescheduling handled in the same thread.' },
  { icon: <IconRefresh />, title: 'Prescription refill reminders', desc: 'Nudges patients before a prescription runs out, and routes the refill request to the right team.' },
  { icon: <IconReceipt />, title: 'Lab & report result notifications', desc: 'Lets a patient know a result is ready and shares a secure portal link to view it.' },
  { icon: <IconBell />, title: 'Vaccination & screening reminders', desc: 'Keeps patients on schedule for vaccinations and routine screenings without a manual call list.' },
  { icon: <IconUsers />, title: 'Post-surgery & chronic-care follow-ups', desc: 'Checks in on recovery milestones and chronic-care plans automatically, flagging concerning replies to staff.' },
  { icon: <IconMegaphone />, title: 'Wellness & preventive-care campaigns', desc: 'Runs seasonal wellness and screening campaigns to opted-in patients, tracking response in one place.' },
  { icon: <IconBolt />, title: 'Emergency & urgent-care broadcasts', desc: 'Pushes urgent updates — closures, outbreak advisories — to patients the moment they matter.' },
  { icon: <IconDollar />, title: 'Insurance pre-authorization updates', desc: 'Keeps patients posted on pre-authorization status without them having to call in and ask.' },
]

const WHY_US = [
  { icon: <IconClock />, title: '24/7 patient access', desc: 'Answer common questions and book appointments any hour, without staffing the phones around the clock.' },
  { icon: <IconRefresh />, title: 'Fewer no-shows', desc: 'Automated reminders and one-message rescheduling keep the calendar full.' },
  { icon: <IconShield />, title: 'Safe by design', desc: 'Scoped access and full logs, with anything sensitive or clinical handed to your staff.' },
  { icon: <IconUsers />, title: 'Lighter front-desk load', desc: 'Deflect routine calls so your team focuses on the patients in front of them.' },
]

const FAQS = [
  { q: 'What can a healthcare AI agent do?', a: 'Autonomous appointment scheduling and reminders, refill nudges, result notifications and patient FAQs — handled safely within your rules, with anything clinical handed to your staff.' },
  { q: 'How does it reduce no-shows?', a: 'It sends automated visit reminders and makes rescheduling a one-message task, so patients keep or move appointments instead of missing them silently.' },
  { q: 'How are lab results and reports shared?', a: 'The agent never puts a result in the message itself — it sends a secure portal link, and the patient authenticates before viewing anything sensitive.' },
  { q: 'Is patient information handled safely?', a: 'Yes. Scoped roles limit exactly what the agent can access, every interaction is logged, and anything clinical or sensitive escalates to a human on your team.' },
  { q: 'Which languages does it support?', a: 'It detects the language a patient writes in and replies in it automatically, so multilingual patients are served from the same number without a separate line.' },
  { q: 'Which channels does it work on?', a: 'WhatsApp, SMS and voice — the same agent, scheduling data and rules across every channel your patients use.' },
]

function AiAgentsHealthcare() {
  return (
    <>
      <Seo
        title="AI Agents for Healthcare & Patient Engagement"
        description="AI agents for healthcare — appointment reminders, refill and lab-result notifications, and multilingual patient Q&A, handled safely within your rules across WhatsApp, SMS and voice."
        keywords={['healthcare AI agent', 'patient engagement AI', 'appointment scheduling agent', 'medical chatbot']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>AI agents that keep patients on schedule, and <span className="grad-word">in the loop</span></>}
        subtitle="Autonomous scheduling, refill and lab-result reminders, and multilingual patient Q&A — connected to your systems and safe by design, across WhatsApp, SMS and voice."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<AgentAnalyticsMock />}
      />

      <FeatureGrid eyebrow="Compliance" title={<>Built for compliant patient care</>} items={CAPABILITY_STRIP} variant="flat" />

      <NarrativeCompare
        variant="stacked"
        eyebrow="The problem"
        heading={<>No-shows and language gaps quietly drain every clinic's schedule.</>}
        paragraphs={[
          "Between 15% and 25% of a clinic's daily appointments are lost to no-shows — not because patients don't care, but because a reminder never reached them, or reached them in a language they don't read.",
          'Add slow lab-result callbacks and a front desk fielding the same scheduling questions all day, and the real cost isn\'t just missed visits — it\'s staff time and patients who feel unheard.',
        ]}
        leftItems={[
          'Missed Reminders',
          'Delayed Lab Results',
          'Language Barriers',
        ]}
      />

      <TouchpointCarousel
        eyebrow="Use cases"
        title={<>Every patient touchpoint, one agent</>}
        subtitle="From the first reminder to the last follow-up, tuned to how your practice actually runs."
        items={USE_CASES}
      />

      <WhyUsChecklist eyebrow="Why us" title={<>Why practices deploy an AI agent</>} items={WHY_US} alt />

      <CTABanner
        title="Give patients 24/7 access, safely"
        subtitle="Deploy a healthcare agent that schedules, reminds and answers within your rules."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>Healthcare agents — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AiAgentsHealthcare
