import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemReceiptSwap from '../components/ProblemReceiptSwap.jsx'
import FeatureChatQA from '../components/FeatureChatQA.jsx'
import StepsFlightPath from '../components/StepsFlightPath.jsx'
import WhyItWorksCarousel from '../components/WhyItWorksCarousel.jsx'
import { IconBook, IconGlobe, IconBell, IconCheck, IconClock, IconUsers, IconBolt, IconChart } from '../components/icons.jsx'
import EducationAdmissionsHeroMock from '../components/EducationAdmissionsHeroMock.jsx'

const STEPS = [
  { title: 'Connect your admissions data', desc: 'Link your CRM or SIS so the agent can answer from real programme and deadline data.' },
  { title: 'Train on your policies', desc: 'The agent learns requirements, deadlines and fee schedules — no scripting required.' },
  { title: 'Go live in every language', desc: 'Launch across SMS, WhatsApp and web chat with automatic language detection.' },
  { title: 'Follow up automatically', desc: 'Deadline and fee reminders start running the moment an applicant enters the funnel.' },
]

const FEATURES = [
  { icon: <IconBook />, question: 'Which programmes still have spots for Fall intake?', title: 'Admissions Q&A on autopilot', desc: 'Answers programme, deadline and requirement questions instantly, grounded in your actual admissions data.' },
  { icon: <IconBell />, question: 'When is my application fee due?', title: 'Fee & deadline reminders', desc: 'Automated SMS and WhatsApp reminders for application deadlines, fee due dates and document submissions.' },
  { icon: <IconGlobe />, question: '¿Cuáles son los requisitos de admisión?', title: 'Multilingual admissions', desc: 'Detects and responds in the applicant\'s language, no separate workflow needed per market.' },
  { icon: <IconUsers />, question: 'I was accepted — what do I do next?', title: 'Enrolment follow-through', desc: 'Nudges accepted students through remaining steps — deposits, orientation, housing — until they\'re actually enrolled.' },
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
        title="Agentic AI for Education Admissions Teams"
        description="Agentic AI for education: admissions, fee reminders and round-the-clock student support."
        keywords={['AI for education', 'agentic AI education', 'admissions AI agent', 'student support AI']}
      />

      <Hero
        eyebrow="Education"
        title={<>Agentic AI that guides students from <span className="grad-word">enquiry to enrolled</span></>}
        subtitle="Answer admissions questions, send deadline reminders and follow up on every application — around the clock, in the applicant's own language."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<EducationAdmissionsHeroMock />}
      />

      <ProblemReceiptSwap
        eyebrow="The problem"
        heading="A campus visit for an admissions question is a visit that shouldn't happen."
        paragraph="Most routine admissions questions still route to a queue or a front-desk visit, even though none of them need a human decision."
        before={{
          title: 'Front Desk Queue',
          rows: ['Programme requirements', 'Application status', 'Deadline lookup', 'Fee balance'],
        }}
        after={{ title: 'Admissions AI', row: 'Every question answered', time: '0:04' }}
        alt
      />

      <FeatureChatQA
        eyebrow="Features"
        title="Covers the whole admissions journey"
        subtitle="From the first programme question to enrolment day, one agent keeps every applicant moving."
        items={FEATURES}
      />

      <StepsFlightPath
        eyebrow="How it works"
        title="Live before your next application cycle"
        subtitle="From connecting your admissions data to automated follow-up."
        steps={STEPS}
        alt
      />

      <WhyItWorksCarousel
        eyebrow="Why it works"
        title="More enrolments, less manual follow-up"
        subtitle="Automated reminders and instant answers keep applicants engaged through the whole funnel."
        items={BENEFITS}
      />

      <CTABanner
        title="Give every applicant a 24/7 admissions office"
        subtitle="Deploy an agentic AI education agent before your next application cycle starts."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for education — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryEducation
