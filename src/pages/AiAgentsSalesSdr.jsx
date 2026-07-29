import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconSearch, IconPencil, IconCalendar, IconRefresh, IconBolt, IconChart, IconLink, IconUsers, IconClock, IconBell, IconMail } from '../components/icons.jsx'
import SdrProspectPipelineHeroMock from '../components/SdrProspectPipelineHeroMock.jsx'
import ProblemStalledInbox from '../components/ProblemStalledInbox.jsx'
import FeatureExpandRow from '../components/FeatureExpandRow.jsx'
import StepsSdrSpine from '../components/StepsSdrSpine.jsx'
import WhyUsSdrPulse from '../components/WhyUsSdrPulse.jsx'

const FEATURES = [
  { icon: <IconSearch />, title: 'Lead research', desc: 'Automatically enriches and prioritizes leads before outreach.' },
  { icon: <IconPencil />, title: 'Personalized outreach', desc: 'Writes tailored messages across email, SMS and WhatsApp.' },
  { icon: <IconCalendar />, title: 'Meeting booking', desc: 'Handles scheduling back-and-forth and books meetings directly.' },
  { icon: <IconRefresh />, title: 'Follow-up sequences', desc: 'Runs multi-touch follow-ups until a lead responds or opts out.' },
]

const STEPS = [
  { title: 'Define your ICP', desc: 'Set target criteria and messaging guidelines for the agent.' },
  { title: 'Connect your CRM', desc: 'Sync leads and activity so the agent works from live data.' },
  { title: 'Launch outreach', desc: 'The agent researches, messages and books meetings automatically.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Always-on prospecting', desc: 'Outreach continues around the clock, not just business hours.' },
  { icon: <IconChart />, title: 'Higher reply rates', desc: 'Personalization at scale outperforms generic sequences.' },
  { icon: <IconLink />, title: 'CRM-native', desc: 'Syncs activity and meeting bookings back to your CRM automatically.' },
  { icon: <IconUsers />, title: 'Human-in-the-loop', desc: 'Reps can review and approve messages before they send.' },
]

const WHY_ITEMS = [
  'Why leads sit in a queue',
  'Why outreach reads the same to everyone',
  'Why one meeting takes five emails',
]

const SYMPTOM_ITEMS = [
  { icon: <IconClock />, label: 'New Lead Waiting' },
  { icon: <IconBell />, label: '3 Days, No Reply' },
  { icon: <IconMail />, label: 'Same Template Again' },
  { icon: <IconCalendar />, label: 'Reschedule Email #4' },
]

const FAQS = [
  { q: 'What does an AI SDR actually do?', a: 'It researches leads, personalizes outreach messages, runs follow-up sequences, and books meetings on reps’ calendars — the core work of a sales development rep.' },
  { q: 'Which channels can it message on?', a: 'Email, SMS and WhatsApp, coordinated as a single outreach sequence.' },
  { q: 'Can a human review messages before sending?', a: 'Yes, you can configure approval steps so reps review outreach before it goes out.' },
  { q: 'Does it replace my sales team?', a: 'No — it handles repetitive prospecting work so reps can focus on qualified conversations and closing.' },
]

function AiAgentsSalesSdr() {
  return (
    <>
      <Seo
        title="AI Sales Agent & AI SDR for Outbound Sales"
        description="Automate prospecting and outreach with an AI SDR. Research leads, personalize messages, follow up automatically, and book meetings across channels."
      />

      <Hero
        eyebrow="AI Sales"
        title={<>An AI SDR that prospects <span className="grad-word">while your team sells</span></>}
        subtitle="Research leads, personalize outreach and book meetings automatically — across email, SMS and WhatsApp."
        primaryCta={{ label: 'Deploy an AI SDR', href: '/contact-us' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<SdrProspectPipelineHeroMock />}
      />

      <ProblemStalledInbox
        eyebrow="The problem"
        heading={<>Most leads go cold before a human ever replies.</>}
        paragraph={<>An AI SDR closes that gap — <strong>researching and reaching out the moment a lead arrives</strong> — so reps spend their time on qualified conversations, not the queue.</>}
        whyItems={WHY_ITEMS}
        symptomItems={SYMPTOM_ITEMS}
        alt
      />

      <FeatureExpandRow eyebrow="Features" title={<>Everything an SDR does, automated</>} subtitle="Research, outreach, booking and follow-up — one agent, every step." items={FEATURES} />

      <StepsSdrSpine eyebrow="How it works" title={<>Launch AI-powered outreach in three steps</>} steps={STEPS} alt />

      <WhyUsSdrPulse eyebrow="Why us" title={<>Why sales teams use our AI SDR</>} subtitle="Built for reps who need pipeline, not more busywork." items={WHY_US} />

      <CTABanner
        title="Put prospecting on autopilot"
        subtitle="Deploy an AI SDR and start booking meetings automatically."
        cta={{ label: 'Deploy an AI SDR', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI SDR — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsSalesSdr
