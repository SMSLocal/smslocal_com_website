import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import FeatureFormulaIndustry from '../components/FeatureFormulaIndustry.jsx'
import StepsRibbonCards from '../components/StepsRibbonCards.jsx'
import WhyUsReasonRows from '../components/WhyUsReasonRows.jsx'
import ProblemInboxSplit from '../components/ProblemInboxSplit.jsx'
import { IconReceipt, IconBell, IconClock, IconLink, IconMail, IconCalendar } from '../components/icons.jsx'
import SdrCampaignMock from '../components/SdrCampaignMock.jsx'

const INBOX_ROWS = [
  { icon: <IconClock />, title: 'New Application Waiting', time: '1d' },
  { icon: <IconBell />, title: '3 Days, No Update', time: '2d' },
  { icon: <IconMail />, title: 'Same Reminder Again', time: '3d' },
  { icon: <IconCalendar />, title: 'Missing Doc #4', time: '4d' },
]

const STEPS = [
  { title: 'Connect your LOS', desc: 'Link your loan origination system and CRM along with SMS and WhatsApp.' },
  { title: 'Train on your process', desc: 'The agent learns your qualification criteria and document requirements.' },
  { title: 'Go live for intake', desc: 'Launch conversational pre-qualification and status lookups across channels.' },
  { title: 'Reminders run automatically', desc: 'Document and status reminders start the moment a file enters underwriting.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Conversational pre-qualification', desc: 'Walks a borrower through initial qualification questions and routes them to the right loan officer, instantly.' },
  { icon: <IconBell />, title: 'Document reminders', desc: 'Automated SMS and WhatsApp reminders for outstanding documents, keeping the file moving toward closing.' },
  { icon: <IconClock />, title: 'Status updates on demand', desc: 'Answers "where is my loan" questions with real underwriting status, not a generic timeline.' },
  { icon: <IconLink />, title: 'Connects to your LOS', desc: 'Integrates with your loan origination system and CRM through 200+ integrations and an open REST API.' },
]

const REASONS = [
  {
    title: 'Faster time to close',
    stat: { value: '50%', label: 'Faster' },
    checks: ['Automated reminders keep files moving', 'Instant status updates, no callback'],
    bestFor: 'High-volume lending teams',
  },
  {
    title: 'Available 24/7',
    stat: { value: '24/7', label: 'Uptime' },
    checks: ['Status checks any hour', 'No after-hours gap'],
    bestFor: 'Borrowers who won\'t wait',
    highlighted: true,
    badge: 'Most relied on',
  },
  {
    title: 'Fewer missed documents',
    stat: { value: '35%', label: 'Fewer missed' },
    checks: ['Automated document reminders', 'Files keep moving to close'],
    bestFor: 'Officers juggling many files',
  },
  {
    title: 'Consistent borrower experience',
    stat: { value: '100%', label: 'Consistent' },
    checks: ['Same accurate answer, every channel', 'SMS, WhatsApp, web'],
    bestFor: 'Multi-channel lending programs',
  },
]

const FAQS = [
  { q: 'Can the agent check real loan status, or just describe the process?', a: 'Connected to your loan origination system, it looks up the real underwriting status and communicates it accurately, not a generic estimate.' },
  { q: 'Can it collect documents, or just ask for them?', a: 'It sends targeted reminders and can guide borrowers to a secure upload link, keeping the file moving without a manual chase.' },
  { q: 'How does pre-qualification work?', a: 'It walks the borrower through a conversational intake and routes qualified leads to the right loan officer immediately, with full context attached.' },
  { q: 'What happens if a borrower asks something that needs a licensed loan officer?', a: 'It escalates inside the same thread with full conversation history, so the loan officer doesn\'t have to start from scratch.' },
  { q: 'How fast can a lending team deploy this?', a: 'Most mortgage teams connect their loan origination system and are live within weeks, scoped to their compliance requirements.' },
]

function IndustryMortgage() {
  return (
    <>
      <Seo
        title="Mortgage AI"
        description="Agentic AI for mortgages: pre-qualification, document reminders and status updates on any channel."
        keywords={['AI for mortgage', 'agentic AI mortgage', 'mortgage lending AI', 'mortgage AI agent']}
      />

      <Hero
        eyebrow="Mortgage"
        title={<>Agentic AI that moves borrowers from <span className="grad-word">enquiry to close</span></>}
        subtitle="Pre-qualify leads, chase documents automatically and answer status questions instantly — across SMS and WhatsApp, so files stop stalling on silence."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<SdrCampaignMock />}
      />

      <ProblemInboxSplit
        eyebrow="The problem"
        heading={<>Most loans don&rsquo;t die on rate — they die on silence.</>}
        paragraph={<>A borrower who can&rsquo;t get a status update starts shopping other lenders — an agent closes that gap by <strong>answering the moment a borrower asks</strong>, so officers spend their time underwriting, not chasing.</>}
        badge="4 stalled"
        rows={INBOX_ROWS}
        alt
      />

      <FeatureFormulaIndustry
        eyebrow="Features"
        title={<>Everything you need to move a loan forward</>}
        items={FEATURES}
      />

      <StepsRibbonCards
        eyebrow="How it works"
        title="Live for intake and status updates in four steps"
        subtitle="From connecting your loan origination system to reminders that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsReasonRows
        eyebrow="Why it works"
        title="Faster closings, less manual chasing"
        items={REASONS}
      />

      <CTABanner
        title="Stop losing loans to silence"
        subtitle="Deploy an agentic AI mortgage agent that pre-qualifies, reminds and updates borrowers automatically."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for mortgage — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryMortgage
