import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import ProblemFlipDeck from '../components/ProblemFlipDeck.jsx'
import FeatureSpotlight from '../components/FeatureSpotlight.jsx'
import WhatsappStepsFlow from '../components/WhatsappStepsFlow.jsx'
import WhyUsSplitGrid from '../components/WhyUsSplitGrid.jsx'
import { IconBook, IconGlobe, IconBell, IconCheck, IconClock, IconUsers, IconBolt, IconChart } from '../components/icons.jsx'
import SmsChatMock from '../components/SmsChatMock.jsx'

const STEPS = [
  { title: 'Connect your admissions data', desc: 'Link your CRM or SIS so the agent can answer from real programme and deadline data.' },
  { title: 'Train on your policies', desc: 'The agent learns requirements, deadlines and fee schedules — no scripting required.' },
  { title: 'Go live in every language', desc: 'Launch across SMS, WhatsApp and web chat with automatic language detection.' },
  { title: 'Follow up automatically', desc: 'Deadline and fee reminders start running the moment an applicant enters the funnel.' },
]

const STATS = [
  { value: '35%', label: 'Higher enrolment follow-through', desc: 'Automated nudges keep applicants moving from enquiry to enrolled, without a staff member chasing each one.' },
  { value: '24/7', label: 'Admissions support', desc: 'Prospective students get answers on programmes and deadlines at any hour.' },
  { value: '<1s', label: 'First response time', desc: 'No waiting for office hours — questions get answered the moment they\'re asked.' },
  { value: '40+', label: 'Languages supported', desc: 'International applicants get answers in their own language automatically.' },
]

const FEATURES = [
  { icon: <IconBook />, title: 'Admissions Q&A on autopilot', desc: 'Answers programme, deadline and requirement questions instantly, grounded in your actual admissions data.' },
  { icon: <IconBell />, title: 'Fee & deadline reminders', desc: 'Automated SMS and WhatsApp reminders for application deadlines, fee due dates and document submissions.' },
  { icon: <IconGlobe />, title: 'Multilingual admissions', desc: 'Detects and responds in the applicant\'s language, no separate workflow needed per market.' },
  { icon: <IconUsers />, title: 'Enrolment follow-through', desc: 'Nudges accepted students through remaining steps — deposits, orientation, housing — until they\'re actually enrolled.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No office-hours bottleneck', desc: 'A question asked at midnight during application season gets answered instantly, not the next business day.' },
  { icon: <IconBolt />, title: 'Fewer applicants lost to silence', desc: 'Automated follow-up keeps applicants engaged through every stage, from enquiry to enrolment.' },
  { icon: <IconChart />, title: 'Frees admissions staff for real conversations', desc: 'Routine questions resolve automatically, so staff spend time on applicants who need real guidance.' },
  { icon: <IconCheck />, title: 'Consistent answers, every channel', desc: 'The same accurate admissions information whether a student asks on SMS, WhatsApp or your website.' },
]

const FAQS = [
  { q: 'Can the agent answer questions about specific programmes and deadlines?', a: 'Yes — trained on your admissions data, it answers programme-specific questions and deadline queries accurately, not with generic responses.' },
  { q: 'Can it send reminders for fees and documents automatically?', a: 'Yes, broadcasting handles deadline and fee reminders across SMS and WhatsApp, with delivery receipts and opt-out handling built in.' },
  { q: 'Does it work for international applicants who don\'t speak English?', a: 'It detects the applicant\'s language and responds naturally, making it straightforward to support international admissions at scale.' },
  { q: 'What happens if a question needs a real admissions counsellor?', a: 'It hands off to a human with the full conversation history attached, so the counsellor has complete context immediately.' },
  { q: 'How quickly can our institution go live before application season?', a: 'Most education teams connect their admissions data and are live within days, well ahead of a typical application cycle.' },
]

function IndustryEducation() {
  return (
    <>
      <Seo
        title="Agentic AI for Education and Student Admissions Teams"
        description="Guide students from first enquiry to enrolment with agentic AI for education, covering admissions, fee reminders and round-the-clock multilingual support."
        keywords={['AI for education', 'agentic AI education', 'admissions AI agent', 'student support AI']}
      />

      <Hero
        eyebrow="Education"
        title={<>Agentic AI that guides students from <span className="grad-word">enquiry to enrolled</span></>}
        subtitle="Answer admissions questions, send deadline reminders and follow up on every application — around the clock, in the applicant's own language."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<SmsChatMock />}
      />

      <StatBand items={STATS} />

      <ProblemFlipDeck
        eyebrow="The problem"
        heading="Admissions season shouldn't run on office hours."
        paragraph="Prospective students ask their most important questions evenings, weekends, the night before a deadline. Flip the switch to see what changes."
        pairs={[
          { before: 'Applicant status means a manual lookup', after: 'Status answered instantly from real data' },
          { before: 'Deadlines get missed without a nudge', after: 'Fee and deadline reminders send themselves' },
          { before: 'International applicants wait for a translator', after: 'Answers arrive in their own language' },
        ]}
        alt
      />

      <FeatureSpotlight
        eyebrow="Features"
        title="Covers the whole admissions journey"
        subtitle="From the first programme question to enrolment day, one agent keeps every applicant moving."
        items={FEATURES}
      />

      <WhatsappStepsFlow
        eyebrow="How it works"
        title="Live before your next application cycle in four steps"
        subtitle="From connecting your admissions data to automated follow-up."
        steps={STEPS}
        alt
      />

      <WhyUsSplitGrid
        eyebrow="Why it works"
        title="More enrolments, less manual follow-up"
        subtitle="Automated reminders and instant answers keep applicants engaged through the whole funnel."
        items={BENEFITS}
      />

      <CTABanner
        title="Give every applicant a 24/7 admissions office"
        subtitle="Deploy an agentic AI education agent before your next application cycle starts."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for education — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryEducation
