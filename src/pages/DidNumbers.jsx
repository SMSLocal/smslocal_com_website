import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import DidNumberWhySection from '../components/DidNumberWhySection.jsx'
import NumberCapabilitiesGrid from '../components/NumberCapabilitiesGrid.jsx'
import { IconGlobe, IconBolt, IconLink, IconRefresh, IconChart, IconShield, IconClock, IconChat } from '../components/icons.jsx'
import DidNumberHero from '../components/DidNumberHero.jsx'
import StepsProvision from '../components/StepsProvision.jsx'
import CoverageReasons from '../components/CoverageReasons.jsx'

const CAPABILITIES = [
  {
    icon: <IconGlobe />, title: 'Every number type', desc: 'Local, national, toll-free and mobile numbers across 100+ countries, all provisioned from the same account and billed on the same invoice.',
    specs: ['Local, national & toll-free', 'Mobile numbers where available', '100+ countries, one account'],
  },
  {
    icon: <IconBolt />, title: 'Instant provisioning', desc: 'Search availability and activate a number online in minutes — no paperwork wait, no hardware to order, and no carrier queue standing between you and going live.',
    specs: ['Live availability search', 'Activate online, no hardware', 'Ready in minutes'],
  },
  {
    icon: <IconLink />, title: 'Smart inbound routing', desc: 'Send voice and SMS to teams, apps, webhooks or your CRM with per-number rules, so every number behaves exactly the way that number needs to.',
    specs: ['Per-number routing rules', 'Teams, apps, webhooks or CRM', 'Voice and SMS together'],
  },
  {
    icon: <IconRefresh />, title: 'Number porting', desc: 'Bring your existing numbers and keep them live — customers never notice a change, and every relationship and campaign tied to that number keeps working.',
    specs: ['Keep your existing number', 'No service interruption', 'Same number, new platform'],
  },
  {
    icon: <IconChart />, title: 'Call tracking', desc: 'Attribute calls and texts to campaigns with per-number tracking and analytics, so you know exactly which channel and campaign drove each conversation.',
    specs: ['Per-number attribution', 'Campaign-level analytics', 'Calls and texts, one report'],
  },
  {
    icon: <IconShield />, title: 'Privacy masking', desc: 'Connect two parties through a proxy number so real numbers stay private on both sides, right up until the call or text is delivered.',
    specs: ['Two-party proxy connect', 'Real numbers stay hidden', 'Ideal for delivery & marketplace'],
  },
]

const STEPS = [
  { title: 'Search availability', desc: 'Filter by country, city or number type to find the number you want.', frag: '+1' },
  { title: 'Reserve the number', desc: 'Claim it instantly online — no hardware orders, no waiting on a carrier.', frag: '+1 (415)' },
  { title: 'Verify your use-case', desc: 'Confirm your business details so the number is compliant from day one.', frag: '+1 (415) 555' },
  { title: 'Route voice & SMS', desc: 'Point inbound calls and texts to your team, apps, webhooks or CRM.', frag: '+1 (415) 555-0182' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'Global coverage in 100+ countries', desc: 'Local, national, toll-free and mobile numbers everywhere you operate — all from one account.' },
  { icon: <IconClock />, title: 'Provision in minutes', desc: 'Search, reserve and activate online. No hardware, no carrier queue, no waiting.' },
  { icon: <IconRefresh />, title: 'Keep your number', desc: 'Port your existing numbers in and keep every relationship and campaign you have built.' },
  { icon: <IconChat />, title: 'One number, voice + SMS', desc: 'Every number receives calls and texts, routed wherever your workflows already live.' },
]

const FAQS = [
  { q: 'What is a DID or virtual number?', a: 'A DID (Direct Inward Dialing) or virtual number is a real phone number you provision online instead of installing a physical line. It can receive voice calls and SMS and be routed to any team, app or endpoint you choose.' },
  { q: 'Which countries and number types can I get?', a: 'You can get local, national, toll-free and mobile numbers across 100+ countries, subject to each country’s regulatory requirements for that number type.' },
  { q: 'Can I keep my existing number?', a: 'Yes. You can port eligible numbers in and keep them live, so customers and campaigns that already know your number are unaffected.' },
  { q: 'How quickly can a number go live?', a: 'Most numbers can be searched, reserved and activated online in minutes. Some countries require use-case or address verification before a number can be activated.' },
  { q: 'Where can inbound calls and SMS be routed?', a: 'Route inbound voice and SMS to your team, your apps, a webhook or your CRM, with per-number rules so each number behaves exactly the way you need.' },
]

function DidNumbers() {
  return (
    <>
      <Seo
        title="DID & Virtual Phone Numbers, 100+ Countries"
        description="Get local, national, toll-free and mobile virtual numbers in 100+ countries in minutes. Route inbound voice and SMS to your team, your apps and your CRM."
        keywords={['DID numbers', 'virtual phone numbers', 'virtual numbers', 'toll-free numbers', 'local phone numbers', 'number porting', 'inbound voice and SMS', 'local presence dialing']}
      />

      <Hero
        eyebrow="DID / Virtual numbers"
        title={<>Virtual phone numbers in <span className="grad-word">100+ countries</span>, live in minutes</>}
        subtitle="Get local, national, toll-free and mobile numbers anywhere, then route inbound voice and SMS to your team, your apps and your CRM — no hardware, and keep your existing numbers."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        stats={[
          { value: '100+', label: 'Countries covered' },
          { value: 'Minutes', label: 'To provision online' },
          { value: 'Voice + SMS', label: 'On every number' },
        ]}
        visual={<DidNumberHero />}
      />

      <DidNumberWhySection
        eyebrow="Why virtual numbers"
        heading={<>One number that follows your business, not your hardware</>}
        paragraphs={[
          <>A phone line meant a physical connection to one desk. A virtual number cuts that cord — provisioned online, routed anywhere, and scaled to thousands <strong>on demand</strong>.</>,
        ]}
        alt
      />

      <NumberCapabilitiesGrid
        eyebrow="Capabilities"
        title={<>Everything a number should do</>}
        subtitle="One virtual number, and all the routing, tracking and privacy controls you need around it."
        items={CAPABILITIES}
      />

      <StepsProvision
        eyebrow="How it works"
        title={<>From search to live routing in four steps</>}
        subtitle="Watch the number come together — each stage provisions one more piece."
        steps={STEPS}
        alt
      />

      <CoverageReasons
        eyebrow="Why us"
        title={<>Coverage that scales with you</>}
        subtitle="Local presence anywhere you operate, provisioned in minutes and yours to keep."
        items={WHY_US}
      />

      <CTABanner
        title="Claim your virtual numbers today"
        subtitle="Local presence in 100+ countries, voice and SMS on every number, live in minutes."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>DID & virtual numbers — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default DidNumbers
