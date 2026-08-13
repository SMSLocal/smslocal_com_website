import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemVerificationRace from '../components/ProblemVerificationRace.jsx'
import FeatureStackPicker from '../components/FeatureStackPicker.jsx'
import DeploymentTimeline from '../components/DeploymentTimeline.jsx'
import WhyUsSpotlightGrid from '../components/WhyUsSpotlightGrid.jsx'
import { IconClock, IconShield, IconChart, IconLink } from '../components/icons.jsx'
import FintechAgentHeroMock from '../components/FintechAgentHeroMock.jsx'

const BENEFITS = [
  { icon: <IconClock />, title: '24/7 coverage', desc: 'Routine account questions answered any hour, without adding to the queue.' },
  { icon: <IconShield />, title: 'Compliance-ready', desc: 'Every automated action is logged with role-based access built in from day one.' },
  { icon: <IconChart />, title: 'Lower cost to serve', desc: 'Deflect routine servicing volume from your team without adding headcount.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connects to your core banking and card platforms to trigger real actions.' },
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
        title="Agentic AI for Fintech"
        description="Secure agentic AI for fintech: onboarding, transactions and alerts, backed by audit logs."
        keywords={['AI for fintech', 'agentic AI fintech', 'digital banking AI', 'fintech AI agent']}
      />

      <Hero
        eyebrow="Fintech"
        title={<>Agentic AI for fintech, built for <span className="grad-word">auditable</span> support</>}
        subtitle="Support onboarding, transactions and time-sensitive alerts across SMS and WhatsApp — with every automated action logged, and role-based access built in from day one."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'Enterprise Security', href: '/platform/security/' }}
        visual={<FintechAgentHeroMock />}
      />

      <ProblemVerificationRace
        eyebrow="The problem"
        heading="It's hard to verify a customer's account details before you can even help them."
        alt
      />

      <FeatureStackPicker
        eyebrow="Features"
        title="Built for regulated servicing"
      />

      <DeploymentTimeline
        eyebrow="How it works"
        title="Deploy with oversight, end to end"
        alt
      />

      <WhyUsSpotlightGrid
        eyebrow="Why us"
        title="Why finance teams trust our AI agents"
        items={BENEFITS}
      />

      <CTABanner
        title="Automate support without losing the audit trail"
        subtitle="Deploy an agentic AI fintech agent with role-based access and full logging, live in weeks."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for fintech — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryFintech
