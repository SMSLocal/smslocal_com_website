import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import TangleConvergeHero from '../components/TangleConvergeHero.jsx'
import PlatformHub from '../components/PlatformHub.jsx'
import OneAccountList from '../components/OneAccountList.jsx'
import StitchedSeamCompare from '../components/StitchedSeamCompare.jsx'

const STATS = [
  { value: '5→1', label: 'tools to manage', desc: 'CPaaS API, chatbot, campaigns, inbox and numbers become one platform.' },
  { value: '1', label: 'invoice', desc: 'Every channel, seat and message on a single itemised bill.' },
  { value: '1', label: 'customer record', desc: 'Each touchpoint resolves to the same profile, so context never resets.' },
  { value: 'Days', label: 'to launch', desc: 'Go live without a multi-vendor integration project.' },
]

const TESTIMONIALS = [
  { quote: 'We replaced four separate vendors with SMSLocal and cut our monthly tooling bill sharply. One login, one invoice, one support team.', name: 'Meera Nair', role: 'Head of CX, Retail' },
  { quote: 'The best part is that there is nothing to stitch together. The API, campaigns and the shared inbox already talk to each other out of the box.', name: 'Daniel Okafor', role: 'Engineering Lead, Fintech' },
  { quote: 'Onboarding a new agent used to mean five tools and five passwords. Now it is one platform and they are live the same day.', name: 'Priya Sharma', role: 'Operations Manager' },
]

const FAQS = [
  { q: 'What exactly does SMSLocal replace?', a: 'A typical stack: a CPaaS messaging API, a separate chatbot or AI tool, a campaign and broadcast tool, a shared inbox or helpdesk, and a number or sender-ID vendor. SMSLocal provides all of these on one account.' },
  { q: 'Do I have to move everything at once?', a: 'No. Most teams start with one channel or capability - bulk SMS, the API, or WhatsApp - and switch on campaigns, the inbox, chatbots or analytics whenever they are ready.' },
  { q: 'Is it really one bill and one login?', a: 'Yes. Every channel, seat and message is on a single itemised invoice, and your whole team works from one login and one shared set of contacts.' },
  { q: 'Will consolidating slow anything down?', a: 'The opposite. Because the pieces are built to work together, you skip the integration project between vendors and go live in days, not months.' },
  { q: 'Can you migrate what we already use?', a: 'Our team helps move contacts, templates, opt-in lists and existing automations from most messaging, chatbot and helpdesk providers, so you keep your history.' },
]

function WhySmslocal() {
  return (
    <>
      <Seo
        title="Why SMSLocal - One Platform, Not a Stitched-Together Stack"
        description="Most teams bolt a CPaaS API to a chatbot tool, a campaign tool, an inbox and a number vendor. SMSLocal replaces the whole stack with one account - one bill, one login, one customer record."
        keywords={['why smslocal', 'one messaging platform', 'CPaaS consolidation', 'replace messaging stack', 'unified customer engagement platform', 'one bill one login']}
      />

      <Hero
        eyebrow="Why SMSLocal"
        title={<>One platform instead of <span className="grad-word">a tangle of tools</span></>}
        subtitle="Most teams bolt a CPaaS API to a chatbot tool, a campaign tool, an inbox and a number vendor - then spend months keeping them in sync. SMSLocal is all of it, on one account."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See pricing', href: '/pricing' }}
        stats={[
          { value: '5→1', label: 'tools consolidated' },
          { value: '1', label: 'bill & one login' },
          { value: 'Days', label: 'to go live' },
        ]}
        visual={<TangleConvergeHero />}
      />

      <PlatformHub />

      <OneAccountList />

      <StatBand
        title="One platform, by the numbers"
        subtitle="What changes when five tools become one."
        items={STATS}
      />

      <StitchedSeamCompare />

      <Testimonials title="Teams that consolidated on SMSLocal" items={TESTIMONIALS} />

      <CTABanner
        title="Replace the stack with one platform"
        subtitle="Bring your channels, contacts and automations onto one account. We'll help you migrate what you already run."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'View pricing', href: '/pricing' }}
        variant="spotlight"
      />

      <FAQ title="Why SMSLocal - questions, answered" items={FAQS} alt />
    </>
  )
}

export default WhySmslocal
