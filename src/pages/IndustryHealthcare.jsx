import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import FeatureReveal from '../components/FeatureReveal.jsx'
import BuilderJourneyPath from '../components/BuilderJourneyPath.jsx'
import WhyUsChecklist from '../components/WhyUsChecklist.jsx'
import { IconCalendar, IconShield, IconBell, IconCheck, IconClock, IconUsers, IconBolt, IconChat } from '../components/icons.jsx'
import VoiceCallMock from '../components/VoiceCallMock.jsx'

const STEPS = [
  { icon: <IconCalendar />, title: 'Connect your scheduling system', desc: 'Link your calendar or EHR platform along with SMS and WhatsApp.' },
  { icon: <IconShield />, title: 'Define access boundaries', desc: 'Set exactly what patient data each conversation can touch, with role-based access.' },
  { icon: <IconBolt />, title: 'Go live for scheduling', desc: 'Launch booking, rescheduling and reminders within your defined compliance scope.' },
  { icon: <IconCheck />, title: 'Review the audit log', desc: 'Every automated interaction is logged and reviewable from day one.' },
]

const STATS = [
  { value: '30%', label: 'Fewer no-shows', desc: 'Automated appointment reminders sent across SMS and WhatsApp cut missed visits measurably.' },
  { value: '24/7', label: 'Patient support', desc: 'Scheduling and general questions answered around the clock, without a call centre shift.' },
  { value: '<1s', label: 'First response time', desc: 'No hold time for a patient asking about clinic hours or a prescription refill.' },
  { value: 'RBAC', label: 'Access control by design', desc: 'Role-based access keeps patient data visible only to what each workflow actually needs.' },
]

const FEATURES = [
  { icon: <IconCalendar />, title: 'Scheduling on autopilot', desc: 'Books, reschedules and confirms appointments against live calendar availability, inside the conversation.' },
  { icon: <IconBell />, title: 'Reminders that reduce no-shows', desc: 'Automated SMS and WhatsApp reminders ahead of every appointment, with an easy reschedule link built in.' },
  { icon: <IconChat />, title: 'Consent-aware conversations', desc: 'Handles patient questions within the access boundaries your compliance team defines, every time.' },
  { icon: <IconShield />, title: 'Role-based access control', desc: 'Strict access controls determine exactly what data each conversation can touch, logged for review.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No after-hours gap', desc: 'A scheduling question at 9pm gets the same instant, accurate answer as one at 9am.' },
  { icon: <IconBolt />, title: 'Fewer missed appointments', desc: 'Timely reminders and easy rescheduling directly reduce costly no-shows.' },
  { icon: <IconUsers />, title: 'Frees clinical staff for patients, not phones', desc: 'Routine scheduling and general questions resolve automatically, freeing front-desk time for in-person care.' },
  { icon: <IconCheck />, title: 'Built for compliance from the start', desc: 'Consent-aware handling and access controls make automated patient communication defensible, not risky.' },
]

const FAQS = [
  { q: 'Is this compliant for handling patient communication?', a: 'The platform uses consent-aware conversations, role-based access control and audit logs designed for the access requirements of healthcare data.' },
  { q: 'Can it actually book and reschedule appointments?', a: 'Connected to your scheduling system, it books against live availability and confirms changes directly, not just describes how to call the front desk.' },
  { q: 'Can it send appointment reminders automatically?', a: 'Yes — broadcasting handles reminder sequences across SMS and WhatsApp ahead of every appointment, reducing no-shows.' },
  { q: 'What happens if a patient asks something outside its scope?', a: 'It escalates to a human staff member inside the same thread, with full context and without exposing data outside the defined access boundaries.' },
  { q: 'How long does it take a clinic or health system to go live?', a: 'Most healthcare teams connect their scheduling system and are live within weeks, scoped to their specific compliance requirements.' },
]

function IndustryHealthcare() {
  return (
    <>
      <Seo
        title="Agentic AI for Healthcare Communication"
        description="Handle appointments, reminders and patient questions with agentic AI for healthcare, using consent-aware conversations and strict role-based access control."
        keywords={['AI for healthcare', 'agentic AI healthcare', 'patient communication AI', 'healthcare AI agent']}
      />

      <Hero
        eyebrow="Healthcare"
        title={<>Agentic AI for healthcare, built <span className="grad-word">consent-aware</span> from the ground up</>}
        subtitle="Handle appointment scheduling, reminders and patient questions automatically, with role-based access control and audit logs that hold up to scrutiny."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'Enterprise Security', href: '/platform/security' }}
        visual={<VoiceCallMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="stacked"
        eyebrow="The problem"
        heading={<>Patient communication can't trade speed for safety.</>}
        paragraphs={[
          'A generic chatbot is either too limited to help with scheduling, or too loosely governed to trust with anything involving patient data.',
          'Patients expect instant answers about appointments and basic questions, not a phone tree and a hold queue.',
          'Agentic AI for healthcare acts on real scheduling data within strict access boundaries — fast for the patient, defensible for compliance.',
        ]}
        leftItems={[
          'Books against live calendar availability',
          'Sends reminders that cut no-shows',
          'Answers within defined access boundaries',
          'Every interaction logged for review',
        ]}
        alt
      />

      <FeatureReveal
        eyebrow="Features"
        title="Patient communication that respects the rules"
        subtitle="From booking to reminders, every interaction stays fast, accurate and access-controlled."
        items={FEATURES}
      />

      <BuilderJourneyPath
        eyebrow="How it works"
        title="Live within your compliance scope in four steps"
        subtitle="From connecting your scheduling system to a fully reviewable audit log."
        steps={STEPS}
        alt
      />

      <WhyUsChecklist
        eyebrow="Why it works"
        title="Fewer no-shows, less front-desk load"
        subtitle="Automated reminders and instant scheduling reduce missed visits without adding staff."
        items={BENEFITS}
      />

      <CTABanner
        title="Automate patient communication without cutting corners"
        subtitle="Deploy an agentic AI healthcare agent with role-based access control, scoped to your compliance requirements."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for healthcare — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryHealthcare
