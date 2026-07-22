import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, HowItWorks, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import FinFeatureTabs from '../components/FinFeatureTabs.jsx'
import FinWhyUsManifesto from '../components/FinWhyUsManifesto.jsx'
import { IconDollar, IconShield, IconReceipt, IconUsers, IconBolt, IconClock, IconChart, IconLink } from '../components/icons.jsx'
import SmsDashboardMock from '../components/SmsDashboardMock.jsx'

const FEATURES = [
  { icon: <IconDollar />, title: 'Account self-service', desc: 'Balance checks, statement requests and payment status, answered instantly from live systems.' },
  { icon: <IconShield />, title: 'Secure by design', desc: 'Scoped roles decide exactly what the agent can access, and every action is verified.' },
  { icon: <IconReceipt />, title: 'Full audit trail', desc: 'Every lookup, action and handoff is logged — who, what, when and why — and exportable.' },
  { icon: <IconUsers />, title: 'Clean escalation', desc: 'Sensitive or complex cases hand off to a human with the full context already gathered.' },
]

const STEPS = [
  { title: 'Connect your systems', desc: 'Link your core banking, payments and CRM within roles that scope exactly what the agent can touch.' },
  { title: 'Set the guardrails', desc: 'Define allowed actions, verification steps and when a case must escalate to a person.' },
  { title: 'Go live with oversight', desc: 'Deploy across channels with every action logged and auditable from day one.' },
]

const WHY_US = [
  { icon: <IconClock />, title: '24/7 servicing', desc: 'Routine account questions answered any hour, without adding to the queue.' },
  { icon: <IconShield />, title: 'Compliance-ready', desc: 'Scoped access and complete audit logs your risk team can actually defend.' },
  { icon: <IconChart />, title: 'Lower cost to serve', desc: 'Deflect the repetitive so your team focuses on high-value, high-judgment cases.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connects to real financial systems, so answers reflect live account data.' },
]

const FAQS = [
  { q: 'What can a financial services AI agent do?', a: 'Compliant, auditable self-service — balance and statement requests, payment status and account questions — connected to your live systems, with sensitive cases escalated to a human.' },
  { q: 'How is access kept secure?', a: 'Custom roles scope exactly which systems and actions the agent can touch, verification steps gate sensitive requests, and every action is logged for review.' },
  { q: 'Is there an audit trail?', a: 'Yes. Every lookup, action and handoff is recorded — who, what, when and why — and exportable for compliance.' },
  { q: 'When does it hand off to a human?', a: 'Whenever your rules say so — for sensitive, complex or regulated cases — with the full context passed to your team.' },
]

function AiAgentsFinancialServices() {
  return (
    <>
      <Seo
        title="AI Agents for Banking & Financial Services"
        description="Compliant, auditable AI agents for banking and fintech — account self-service, secure verification and a full audit trail, with clean human handoff."
        keywords={['financial services AI agent', 'banking AI agent', 'fintech automation', 'compliant AI support']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>Compliant AI agents for <span className="grad-word">banking and fintech</span></>}
        subtitle="Auditable self-service for balances, statements and account questions — connected to your live systems, scoped by roles, and logged for compliance."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<SmsDashboardMock />}
      />

      <NarrativeCompare
        variant="scatter"
        eyebrow="The problem"
        heading={<>It's hard to verify a customer's account details before you can even help them.</>}
        leftItems={[
          { icon: <IconLink />, text: 'Core banking and CRM systems hold fragmented, out-of-sync account records.' },
          { icon: <IconUsers />, text: 'Verifying identity over the phone means re-asking the same questions every call.' },
          { icon: <IconClock />, text: 'Agents burn minutes cross-checking one customer across three separate systems.' },
        ]}
        rightItems={[
          { name: 'Ananya R.', meta: 'Premium account', field1: 'Acc •••4021', field2: 'Unverified' },
          { name: 'David K.', meta: 'Unknown tier', field1: 'KYC: Pending', field2: '555-0132' },
          { name: 'Fatima S.', meta: 'Status: —', field1: 'Balance: Hidden', field2: 'Flagged' },
          { name: 'Marcus T.', meta: 'Business account', field1: 'Txn: Review', field2: 'Verified' },
        ]}
        alt
      />

      <FinFeatureTabs eyebrow="Features" title={<>Built for regulated servicing</>} items={FEATURES} />

      <HowItWorks title={<>Deploy with oversight in three steps</>} steps={STEPS} alt variant="numbered" />

      <FinWhyUsManifesto eyebrow="Why us" title={<>Why finance teams trust our AI agents</>} items={WHY_US} />

      <CTABanner
        title="Automate servicing without losing oversight"
        subtitle="Deploy compliant AI agents that resolve the routine and log every action."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>Financial services agents — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsFinancialServices
