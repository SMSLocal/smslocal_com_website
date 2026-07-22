import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconSearch, IconGear, IconUsers, IconBrain, IconRocket, IconPlug, IconShield } from '../components/icons.jsx'
import ConsultingArcHero from '../components/ConsultingArcHero.jsx'
import LastMileContrast from '../components/LastMileContrast.jsx'
import EngagementRoadmap from '../components/EngagementRoadmap.jsx'
import DeliverablesRows from '../components/DeliverablesRows.jsx'
import OutcomeStats from '../components/OutcomeStats.jsx'
import PartnerCore from '../components/PartnerCore.jsx'

const PHASES = [
  { duration: 'Week 1–2', title: 'Discover & scope', desc: 'We map your use cases, data and systems, then pick the highest-ROI place to start and define what success looks like.', exit: 'Signed-off scope & KPIs' },
  { duration: 'Week 3–6', title: 'Design & build', desc: 'We architect and build the agent or workflow against your real systems, with evaluations and guardrails baked in from day one.', exit: 'Working agent on live data' },
  { duration: 'Week 6–9', title: 'Pilot & enable', desc: 'We run a controlled pilot, tune on real conversations, and train your team to operate and improve it themselves.', exit: 'Pilot hits target metrics' },
  { duration: 'Week 9+', title: 'Launch & scale', desc: 'We roll out to production, wire up monitoring, and line up the next use case so momentum compounds.', exit: 'Live, measured, scaling' },
]

const DELIVERABLES = [
  {
    icon: <IconSearch />,
    tag: 'Strategy',
    name: 'Strategy & scope',
    items: ['Use-case assessment & ROI model', 'Solution architecture & data plan', 'Success metrics & eval framework', 'Build-vs-buy recommendation'],
  },
  {
    icon: <IconGear />,
    tag: 'Build',
    name: 'Build & integration',
    items: ['Production-ready agent or workflow', 'CRM, helpdesk & channel integrations', 'Evals, guardrails & test suite', 'Deployment & monitoring setup'],
  },
  {
    icon: <IconUsers />,
    tag: 'Enablement',
    name: 'Enablement & handover',
    items: ['Team training & operating runbooks', 'Prompt & configuration documentation', 'Admin & governance controls', '30-day post-launch support'],
  },
]

const REASONS = [
  { icon: <IconBrain />, title: 'Practitioners, not slideware', desc: 'You work directly with people who ship AI in production — not a hand-off to a junior team after the pitch.' },
  { icon: <IconRocket />, title: 'Outcome-first delivery', desc: 'We scope to a measurable result and get a working proof of concept live in weeks, not quarters.' },
  { icon: <IconPlug />, title: 'Built on your stack', desc: 'We integrate with your CRM, data and channels — SMS, WhatsApp, voice, RCS and email — with no rip-and-replace.' },
  { icon: <IconShield />, title: 'Governed by default', desc: 'Evaluations, guardrails and audit trails are part of the build, so scaling never means losing control.' },
]

const STATS = [
  { value: '4–6 wks', label: 'POC to first result', desc: 'Typical time from kickoff to a working proof of concept running on your real data.' },
  { value: '100%', label: 'Source handed over', desc: 'Full code, prompts and documentation transferred at the end of every engagement.' },
  { value: '5', label: 'Channels supported', desc: 'SMS, WhatsApp, voice, RCS and email connected to a single production workflow.' },
  { value: '30-day', label: 'Launch support', desc: 'Every engagement includes a post-launch support window, with ongoing support available on request.' },
]

const FAQS = [
  { q: 'What does an AI consulting engagement include?', a: 'Use-case scoping, solution architecture, hands-on build against your systems, evaluations and guardrails, a controlled pilot, team enablement, and a documented handover — everything needed to go from proof of concept to production.' },
  { q: 'How long does it take to reach production?', a: 'Most engagements produce a working proof of concept in four to six weeks, with a production rollout following the pilot. Exact timing depends on integration complexity and how many use cases you start with.' },
  { q: 'Do we own what you build?', a: 'Yes. All source code, prompts, configuration and documentation are handed over, and we train your team to run and extend it. There is no lock-in.' },
  { q: 'Can you work with our existing stack and channels?', a: 'We integrate with your CRM, helpdesk, data sources and messaging channels — SMS, WhatsApp, voice, RCS and email — rather than replacing them.' },
  { q: 'What if we already have a proof of concept?', a: 'Great — we assess it, close the gaps in integration, evaluation and governance, and take it the rest of the way to a supported production deployment.' },
  { q: 'Do you offer support after launch?', a: 'Every engagement includes a post-launch support window, and ongoing support or a next-use-case engagement is available whenever you want it.' },
]

function ServicesAiConsulting() {
  return (
    <>
      <Seo
        title="AI Consulting & Onboarding Services"
        description="Expert, hands-on AI consulting and onboarding. We scope the right use case, build it on your systems, enable your team, and take you from proof of concept to production."
        keywords={['AI consulting', 'AI onboarding', 'AI implementation services', 'proof of concept to production', 'AI agent development', 'AI strategy consulting', 'SMSLocal']}
      />

      <Hero
        eyebrow="AI Consulting & Onboarding"
        title={<>From proof of concept to <span className="grad-word">production AI</span></>}
        subtitle="Expert, hands-on consulting and onboarding. We scope the right use case, build it against your systems, enable your team, and scale it into production."
        primaryCta={{ label: 'Book a scoping call', href: '/contact-us' }}
        secondaryCta={{ label: 'Explore AI Agents', href: '/ai-agents' }}
        stats={[
          { value: '4–6 wks', label: 'POC to first result' },
          { value: '100%', label: 'Yours to keep' },
          { value: '5', label: 'Channels supported' },
        ]}
        visual={<ConsultingArcHero />}
      />

      <LastMileContrast
        eyebrow="The last-mile problem"
        heading={<>A working demo is not a working product.</>}
        paragraphs={[
          'Most AI projects stall in the gap between an impressive proof of concept and something a business can actually run — integrations, evaluations, guardrails, ownership and change management all still have to happen.',
          'We do that last mile with you: scoping the right use case, building against your real systems, and handing your team something they can operate and extend.',
        ]}
        leftLabel="Where projects stall"
        leftItems={[
          'A demo that never touches real data',
          'No evals, so quality is a guess',
          'One-off scripts nobody can maintain',
          'The vendor owns all the knowledge',
        ]}
        rightLabel="How we finish"
        rightItems={[
          'Built against your live systems',
          'Evals and guardrails from day one',
          'Documented, maintainable, and yours',
          'Your team trained to own it',
        ]}
      />

      <EngagementRoadmap
        eyebrow="The engagement"
        title={<>How an engagement runs</>}
        subtitle="A clear path from scoping to a supported production launch, with an exit criterion at every phase so you always know what you are getting."
        phases={PHASES}
      />

      <DeliverablesRows
        eyebrow="What you get"
        title={<>What you walk away with</>}
        subtitle="Every engagement produces working software and the knowledge to run it, grouped across strategy, build and enablement."
        groups={DELIVERABLES}
        note={<>Everything we build is <strong>yours to keep</strong> — full source, prompts and documentation are handed over, with no lock-in.</>}
      />

      <OutcomeStats
        title="What good looks like"
        subtitle="Outcome-focused numbers from real AI onboarding and consulting work."
        items={STATS}
      />

      <PartnerCore
        eyebrow="Why partner with us"
        title={<>Why teams partner with us</>}
        subtitle="Senior, hands-on delivery that treats production — not a demo — as the finish line."
        items={REASONS}
      />

      <CTABanner
        title="From proof of concept to production"
        subtitle="Book a scoping call and we will map the highest-ROI place to start."
        cta={{ label: 'Book a scoping call', href: '/contact-us' }}
        secondaryCta={{ label: 'Explore AI Agents', href: '/ai-agents' }}
        variant="spotlight"
      />

      <FAQ title={<>AI consulting — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ServicesAiConsulting
