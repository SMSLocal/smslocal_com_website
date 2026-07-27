import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import FeatureVerticalIndex from '../components/FeatureVerticalIndex.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsSpotlight from '../components/WhyUsSpotlight.jsx'
import { IconShield, IconRefresh, IconBell, IconCheck, IconClock, IconChart, IconBolt, IconReceipt } from '../components/icons.jsx'
import AgentWorkflowMock from '../components/AgentWorkflowMock.jsx'

const STEPS = [
  { title: 'Connect policy & claims systems', desc: 'Link your policy admin and claims platforms along with SMS and WhatsApp.' },
  { title: 'Train on your products', desc: 'The agent learns your coverage types, quote logic and claims workflow.' },
  { title: 'Go live for quotes & claims', desc: 'Launch conversational quoting and claims status lookups across channels.' },
  { title: 'Renewals run automatically', desc: 'Reminder and cross-sell broadcasts start the moment policy data connects.' },
]

const STATS = [
  { value: '45%', label: 'Faster claims updates', desc: 'Automated status checks and document requests keep claims moving without a phone call.' },
  { value: '24/7', label: 'Policy support', desc: 'Coverage and quote questions answered instantly, any hour, any day.' },
  { value: '<1s', label: 'First response time', desc: 'No hold queue for a policyholder checking a claim or requesting a quote.' },
  { value: '2x', label: 'Renewal & cross-sell lift', desc: 'Timely, targeted broadcasts that improve retention instead of getting ignored.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Quotes without the wait', desc: 'Walks prospects through a quote conversationally and hands off to an agent only when it should.' },
  { icon: <IconRefresh />, title: 'Claims status on demand', desc: 'Looks up real claim status and requests missing documents directly inside the chat, no adjuster callback needed.' },
  { icon: <IconBell />, title: 'Renewal & lapse reminders', desc: 'Automated SMS and WhatsApp reminders ahead of renewal, reducing policy lapses that hurt retention.' },
  { icon: <IconChart />, title: 'Cross-sell, done right', desc: 'Surfaces relevant coverage gaps based on actual policy data, not a blanket promotional blast.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No after-hours gap', desc: 'A claims question after an accident gets an instant answer, not a next-business-day callback.', stat: { value: 24, suffix: '/7' } },
  { icon: <IconBolt />, title: 'Higher renewal rates', desc: 'Proactive reminders catch lapsing policies before they cancel, directly protecting retained premium.', stat: { value: 2, suffix: 'x' } },
  { icon: <IconChart />, title: 'Lower cost per interaction', desc: 'Routine quote and status questions resolve automatically, cutting call centre load.', stat: { value: 45, suffix: '%' } },
  { icon: <IconCheck />, title: 'Every action logged', desc: 'Status updates and document requests are tracked for compliance and quality review.', stat: { value: 100, suffix: '%' } },
]

const FAQS = [
  { q: 'Can the agent actually check claim status, not just explain the process?', a: 'Connected to your claims system, it looks up the real status and can request missing documents directly, inside the conversation.' },
  { q: 'Can it generate a real quote, or does it just collect information?', a: 'It can walk a prospect through a conversational quote flow and hand off to a licensed agent at the right moment for anything requiring one.' },
  { q: 'Does it help with renewals and reducing lapses?', a: 'Yes, broadcasting handles renewal reminder sequences across SMS and WhatsApp ahead of a policy\'s expiry date.' },
  { q: 'How does it stay compliant when discussing coverage?', a: 'Every conversation and action is logged for review, and the agent operates within the guardrails and disclosures your compliance team sets.' },
  { q: 'How fast can we deploy across our book of business?', a: 'Most insurance teams connect their policy and claims systems and are live within weeks.' },
]

function IndustryInsurance() {
  return (
    <>
      <Seo
        title="Agentic AI for Insurance Quotes, Claims and Renewals"
        description="Guide quotes, claims and renewals with agentic AI for insurance, plus reminders and omnichannel campaigns that lift retention and cross-sell performance."
        keywords={['AI for insurance', 'agentic AI insurance', 'insurance claims AI', 'insurance AI agent']}
      />

      <Hero
        eyebrow="Insurance"
        title={<>Agentic AI for insurance, from <span className="grad-word">first quote to renewal</span></>}
        subtitle="Guide quotes, resolve claims status questions and send renewal reminders automatically — across SMS and WhatsApp, with every action logged for compliance."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AgentWorkflowMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="paths"
        eyebrow="The problem"
        heading={<>Nobody wants to wait on hold after a claim.</>}
        paragraphs={[
          'Insurance support happens at the worst possible moment — after an accident, a loss, a lapse — exactly when a phone tree feels the most frustrating.',
          'Agentic AI for insurance answers with real policy and claims data instantly — quoting, updating and reminding without the wait.',
        ]}
        leftLabel="The old path"
        leftItems={['File a claim', 'Wait for a callback', 'Chase a document', 'Wonder about status']}
        rightLabel="The agentic path"
        rightItems={['File a claim', 'Instant status update', 'Document request sent', 'Claim resolved']}
        alt
      />

      <FeatureVerticalIndex
        eyebrow="Features"
        title="Covers the full policy lifecycle"
        subtitle="From the first quote to renewal, one agent keeps policyholders informed automatically."
        items={FEATURES}
      />

      <StepsSignal
        eyebrow="How it works"
        title="Live across quotes and claims in four steps"
        subtitle="From connecting your policy systems to renewals that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsSpotlight
        eyebrow="Why it works"
        title="Faster answers, stronger retention"
        subtitle="Instant claims updates and timely renewal reminders keep policyholders engaged, not frustrated."
        items={BENEFITS}
      />

      <CTABanner
        title="Turn claims and renewals into a retention advantage"
        subtitle="Deploy an agentic AI insurance agent that quotes, updates and reminds automatically."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for insurance — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryInsurance
