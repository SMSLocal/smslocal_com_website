import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import FeatureSpotlight from '../components/FeatureSpotlight.jsx'
import WhatsappStepsFlow from '../components/WhatsappStepsFlow.jsx'
import WhyUsChecks from '../components/WhyUsChecks.jsx'
import { IconReceipt, IconBell, IconClock, IconCheck, IconChart, IconBolt, IconUsers, IconLink } from '../components/icons.jsx'
import SdrCampaignMock from '../components/SdrCampaignMock.jsx'

const STEPS = [
  { title: 'Connect your LOS', desc: 'Link your loan origination system and CRM along with SMS and WhatsApp.' },
  { title: 'Train on your process', desc: 'The agent learns your qualification criteria and document requirements.' },
  { title: 'Go live for intake', desc: 'Launch conversational pre-qualification and status lookups across channels.' },
  { title: 'Reminders run automatically', desc: 'Document and status reminders start the moment a file enters underwriting.' },
]

const STATS = [
  { value: '50%', label: 'Faster pre-qualification', desc: 'Automated conversational intake gets borrowers pre-qualified without a scheduled call.' },
  { value: '24/7', label: 'Borrower support', desc: 'Document status and application questions answered instantly, any hour.' },
  { value: '<1s', label: 'First response time', desc: 'No waiting for a loan officer callback for a routine status update.' },
  { value: '35%', label: 'Fewer missed documents', desc: 'Automated reminders keep document submissions on track toward closing.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Conversational pre-qualification', desc: 'Walks a borrower through initial qualification questions and routes them to the right loan officer, instantly.' },
  { icon: <IconBell />, title: 'Document reminders', desc: 'Automated SMS and WhatsApp reminders for outstanding documents, keeping the file moving toward closing.' },
  { icon: <IconClock />, title: 'Status updates on demand', desc: 'Answers "where is my loan" questions with real underwriting status, not a generic timeline.' },
  { icon: <IconLink />, title: 'Connects to your LOS', desc: 'Integrates with your loan origination system and CRM through 200+ integrations and an open REST API.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No after-hours gap', desc: 'A borrower checking document status on a Sunday gets an instant, accurate answer.' },
  { icon: <IconBolt />, title: 'Faster time to close', desc: 'Automated reminders and instant status updates keep files moving instead of stalling on missing paperwork.' },
  { icon: <IconChart />, title: 'Higher loan officer capacity', desc: 'Routine status and document questions resolve automatically, freeing officers for underwriting conversations.' },
  { icon: <IconCheck />, title: 'Consistent borrower experience', desc: 'Every borrower gets the same accurate, fast answer regardless of channel or time of day.' },
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
        title="Agentic AI for Mortgage Lenders and Borrower Updates"
        description="Move borrowers from enquiry to close with agentic AI for mortgage lenders, covering pre-qualification, document reminders and status updates on any channel."
        keywords={['AI for mortgage', 'agentic AI mortgage', 'mortgage lending AI', 'mortgage AI agent']}
      />

      <Hero
        eyebrow="Mortgage"
        title={<>Agentic AI that moves borrowers from <span className="grad-word">enquiry to close</span></>}
        subtitle="Pre-qualify leads, chase documents automatically and answer status questions instantly — across SMS and WhatsApp, so files stop stalling on silence."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<SdrCampaignMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="columns"
        eyebrow="The problem"
        heading={<>Most loans don't die on rate — they die on silence.</>}
        paragraphs={[
          'A borrower who can\'t get a status update starts shopping other lenders, and a missing document sitting unrequested for a week can stall a whole file.',
          'Agentic AI for mortgage chases documents and answers status questions automatically.',
        ]}
        leftLabel="Manual chasing"
        leftItems={[
          'Status updates need a phone call',
          'Missing documents sit unrequested',
          'Officers chase files between underwriting',
          'Borrowers go quiet and shop elsewhere',
        ]}
        rightLabel="Agentic AI for mortgage"
        rightItems={[
          'Real underwriting status, on demand',
          'Document reminders sent automatically',
          'Officers focus on underwriting, not chasing',
          'Borrowers stay engaged to close',
        ]}
        alt
      />

      <FeatureSpotlight
        eyebrow="Features"
        title="Covers the whole path from application to close"
        subtitle="From pre-qualification to the final document, one agent keeps borrowers informed."
        items={FEATURES}
      />

      <WhatsappStepsFlow
        eyebrow="How it works"
        title="Live for intake and status updates in four steps"
        subtitle="From connecting your loan origination system to reminders that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsChecks
        eyebrow="Why it works"
        title="Faster closings, less manual chasing"
        subtitle="Automated reminders and instant status updates keep files moving without adding staff."
        items={BENEFITS}
      />

      <CTABanner
        title="Stop losing loans to silence"
        subtitle="Deploy an agentic AI mortgage agent that pre-qualifies, reminds and updates borrowers automatically."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for mortgage — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryMortgage
