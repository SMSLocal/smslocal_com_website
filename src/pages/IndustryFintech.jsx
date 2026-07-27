import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import FeatureVerticalIndex from '../components/FeatureVerticalIndex.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsTargetRing from '../components/WhyUsTargetRing.jsx'
import { IconDollar, IconShield, IconBell, IconCheck, IconClock, IconChart, IconBolt, IconLink } from '../components/icons.jsx'
import AgenticWorkflowMock from '../components/AgenticWorkflowMock.jsx'

const STEPS = [
  { title: 'Connect your core systems', desc: 'Link your banking core, card processor and CRM through our REST API or pre-built integrations.' },
  { title: 'Set access boundaries', desc: 'Define exactly what data and actions the agent can touch, with role-based access from day one.' },
  { title: 'Go live with logging on', desc: 'Launch across SMS and WhatsApp with every automated action written to an auditable trail.' },
  { title: 'Review and refine', desc: 'Use the audit log to see exactly what the agent did, and tune guardrails as you scale.' },
]

const STATS = [
  { value: '100%', label: 'Actions logged', desc: 'Every automated step is written to an auditable trail — no black-box decisions.' },
  { value: '24/7', label: 'Account support', desc: 'Balance checks, transaction queries and alerts answered around the clock.' },
  { value: '<1s', label: 'First response time', desc: 'Time-sensitive alerts, like a suspicious transaction, reach the customer instantly.' },
  { value: 'SOC 2', label: 'Aligned security posture', desc: 'Role-based access and encrypted data handling built for regulated environments.' },
]

const FEATURES = [
  { icon: <IconDollar />, title: 'Onboarding & KYC support', desc: 'Guides applicants through document upload and status questions without a call to support.' },
  { icon: <IconBell />, title: 'Real-time transaction alerts', desc: 'Fraud flags, large transactions and low-balance warnings sent the moment they happen, across SMS and WhatsApp.' },
  { icon: <IconShield />, title: 'Auditable by design', desc: 'Every action the agent takes — a balance lookup, a card freeze — is logged and reviewable for compliance.' },
  { icon: <IconLink />, title: 'Connects to your core systems', desc: 'Integrates with your banking core, card processor and CRM through 200+ integrations and an open REST API.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'Always-on account support', desc: 'A locked card or a failed transfer gets answered at 2am the same as at 2pm.' },
  { icon: <IconBolt />, title: 'Faster fraud response', desc: 'Suspicious activity alerts reach the customer in seconds, not after a batch email run.' },
  { icon: <IconChart />, title: 'Lower cost per resolution', desc: 'Routine account queries resolve without a live agent, cutting cost while keeping response quality high.' },
  { icon: <IconCheck />, title: 'Consent-aware by default', desc: 'Access controls and audit logs mean every automated interaction is defensible to a regulator.' },
]

const FAQS = [
  { q: 'Is this safe to use for regulated financial data?', a: 'The platform provides role-based access, audit logs and encrypted data handling aligned with GDPR and CCPA, built for regulated environments.' },
  { q: 'Can the agent actually freeze a card or flag fraud, not just describe the process?', a: 'Connected to your core banking or card platform, it can trigger real actions like a card freeze or a fraud flag, each one logged for review.' },
  { q: 'How does it handle a request that needs human sign-off?', a: 'It escalates to a human agent inside the same thread, with the full context and audit trail attached, so nothing is lost.' },
  { q: 'Can it send time-sensitive alerts, like a fraud warning?', a: 'Yes — broadcasting can trigger instant SMS or WhatsApp alerts for large transactions, low balances or suspicious activity.' },
  { q: 'How long does implementation take for a fintech team?', a: 'Most teams connect their core systems and go live with an AI consulting engagement scoped to your compliance requirements within weeks, not months.' },
]

function IndustryFintech() {
  return (
    <>
      <Seo
        title="Agentic AI for Fintech and Digital Banking Support"
        description="Support onboarding, transactions and alerts with secure agentic AI for fintech, backed by audit logs, access controls and omnichannel broadcasting at scale."
        keywords={['AI for fintech', 'agentic AI fintech', 'digital banking AI', 'fintech AI agent']}
      />

      <Hero
        eyebrow="Fintech"
        title={<>Agentic AI for fintech, built for <span className="grad-word">auditable</span> support</>}
        subtitle="Support onboarding, transactions and time-sensitive alerts across SMS and WhatsApp — with every automated action logged, and role-based access built in from day one."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'Enterprise Security', href: '/platform/security' }}
        visual={<AgenticWorkflowMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="flanked"
        eyebrow="The problem"
        heading={<>Financial support can't afford a black box.</>}
        paragraphs={[
          "Generic chatbots either can't touch real account data, or they touch it without leaving a trail — neither works for a regulated business.",
          'Agentic AI for fintech acts on real account data and logs every step, so support stays fast without becoming a compliance risk.',
        ]}
        leftLabel="Generic chatbot"
        leftItems={[
          "Can't touch real account data",
          'No audit trail on what it did',
          'Same script regardless of risk',
          'Escalates everything sensitive',
        ]}
        rightLabel="Agentic AI for fintech"
        rightItems={[
          'Acts on real account data safely',
          'Every action logged and reviewable',
          'Role-based access, set by you',
          'Escalates only what needs sign-off',
        ]}
        alt
      />

      <FeatureVerticalIndex
        eyebrow="Features"
        title="Support built for money, not just messages"
        subtitle="From onboarding to fraud alerts, every interaction is fast, accurate and defensible."
        items={FEATURES}
      />

      <StepsSignal
        eyebrow="How it works"
        title="Live with full audit logging in four steps"
        subtitle="From connecting your core systems to a fully reviewable action trail."
        steps={STEPS}
        alt
      />

      <WhyUsTargetRing
        eyebrow="Why it works"
        title="Speed and compliance, not one or the other"
        subtitle="Customers get instant answers on real account data, while every action stays logged and reviewable."
        items={BENEFITS}
      />

      <CTABanner
        title="Automate support without losing the audit trail"
        subtitle="Deploy an agentic AI fintech agent with role-based access and full logging, live in weeks."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for fintech — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryFintech
