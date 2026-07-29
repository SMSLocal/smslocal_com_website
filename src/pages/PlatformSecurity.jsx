import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import SecGatesHero from '../components/SecGatesHero.jsx'
import SecCompliance from '../components/SecCompliance.jsx'
import SecTrustColumns from '../components/SecTrustColumns.jsx'
import SecRbacMatrix from '../components/SecRbacMatrix.jsx'

const HERO_STATS = [
  { value: '99.9%+', label: 'Uptime SLA' },
  { value: 'SOC 2', label: 'Type II audited' },
  { value: 'AES-256', label: 'Encryption at rest' },
]

const FAQS = [
  {
    q: 'Who owns the data, and can I delete it?',
    a: 'You do. Your data is yours — you can export it at any time, and you can request permanent deletion of your account data, which we complete within the timeframes set out in our contract and privacy commitments.',
  },
  {
    q: 'Where is my data stored?',
    a: 'You choose your data residency region — EU, US and more. Data stays in the region you select and is encrypted in transit with TLS 1.2+ and at rest with AES-256.',
  },
  {
    q: 'How do you handle a security incident or breach?',
    a: 'We run a formal incident-response program with continuous monitoring. If an incident affects your data we notify you promptly, in line with GDPR and our contractual obligations, and share what happened and the steps we took.',
  },
  {
    q: 'Do you sign a DPA and publish your subprocessors?',
    a: 'Yes. We sign a Data Processing Agreement on request and maintain a current list of the subprocessors we rely on, so your legal and security teams always have full visibility.',
  },
]

function PlatformSecurity() {
  return (
    <>
      <Seo
        title="Enterprise Security & Compliance Platform"
        description="See how SMSLocal protects customer data with encryption, SOC 2 Type II, GDPR and HIPAA compliance, access control, SSO/SAML and audit logging."
        keywords={['enterprise security', 'SOC 2', 'GDPR compliance', 'data security', 'RBAC', 'SSO']}
      />

      <Hero
        eyebrow="Enterprise security"
        title={<>Enterprise-grade <span className="grad-word">security and compliance</span></>}
        subtitle="Every message runs a gauntlet of controls — authenticated, encrypted, authorized and audited — before it reaches your customers. Security your legal team can sign off on."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        stats={HERO_STATS}
        visual={<SecGatesHero />}
      />

      <SecCompliance />

      <SecTrustColumns />

      <SecRbacMatrix />

      <CTABanner
        title="Security your team can trust"
        subtitle="Talk to us about enterprise controls, data residency, a DPA and your security review — we'll meet you where you are."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        variant="spotlight"
      />

      <FAQ title={<>Security &amp; compliance — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default PlatformSecurity
