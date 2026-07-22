import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconSearch, IconLink, IconCalendar, IconBolt, IconClock, IconShield, IconUsers } from '../components/icons.jsx'
import LeadQualifyVisual from '../components/LeadQualifyVisual.jsx'
import FeatureSpotlight from '../components/FeatureSpotlight.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsTargetRing from '../components/WhyUsTargetRing.jsx'

const FEATURES = [
  { icon: <IconChat />, title: 'Conversational qualification', desc: 'Asks natural follow-up questions instead of a rigid form — adapting to each reply to uncover budget, authority, need and timeline.' },
  { icon: <IconSearch />, title: 'Enrichment & scoring', desc: 'Pulls firmographic data and reasons over every answer to score fit and intent in real time, not against a static checklist.' },
  { icon: <IconLink />, title: 'Instant routing & CRM sync', desc: 'Pushes qualified leads into your CRM with full context and routes hot ones to the right rep the moment they qualify.' },
  { icon: <IconCalendar />, title: 'Books the meeting', desc: 'Lets a qualified lead grab a slot on the right rep’s calendar inside the same conversation — no handoff gap.' },
]

const STEPS = [
  { title: 'Describe your ideal customer', desc: 'Tell the agent what a qualified lead looks like — the criteria, disqualifiers and questions that matter to your team.' },
  { title: 'Connect CRM & calendar', desc: 'Sync your pipeline and booking links so the agent works from live data and can hand off cleanly.' },
  { title: 'Go live across channels', desc: 'Deploy the same agent on your website, WhatsApp and social — qualifying every inbound lead the second it arrives.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Reasons, not scripts', desc: 'It interprets vague answers and asks the right follow-up — where a rules-based bot would dead-end.' },
  { icon: <IconClock />, title: 'Qualifies in seconds, 24/7', desc: 'No lead waits in a queue overnight; every inbound is engaged and scored the instant it lands.' },
  { icon: <IconShield />, title: 'Clean, explainable handoff', desc: 'Sales gets the score, the reasoning and the full transcript — so the first call is never cold.' },
  { icon: <IconUsers />, title: 'Protects rep time', desc: 'Browsers and poor-fit leads are filtered out before they ever reach a human’s calendar.' },
]

const FAQS = [
  { q: 'How is an AI lead qualification agent different from a lead-gen chatbot?', a: 'A chatbot follows a fixed script and branching rules. An AI agent reasons over each reply — interpreting unclear answers, asking adaptive follow-ups, enriching data and scoring intent — so it qualifies leads the way a good SDR would, not a decision tree.' },
  { q: 'What criteria does it qualify against?', a: 'Whatever you define — commonly budget, authority, need and timeline, plus firmographic fit like company size or industry. You set the qualifiers and disqualifiers, and the agent scores every conversation against them.' },
  { q: 'Where do qualified leads go?', a: 'Straight into your CRM with the full transcript and score attached, and hot leads are routed to the right rep instantly. Qualified leads can also book a meeting inside the same conversation.' },
  { q: 'Which channels can it run on?', a: 'One agent runs across your website, WhatsApp and social messaging, qualifying inbound leads consistently wherever they reach you.' },
  { q: 'Can a human stay in the loop?', a: 'Yes. You can require rep approval before a lead is routed, and every decision comes with the reasoning and transcript so your team can review or override it.' },
]

function AiAgentsLeadQualification() {
  return (
    <>
      <Seo
        title="AI Lead Qualification Agent"
        description="Qualify every inbound lead automatically with an AI agent. It scores budget, authority, need and timeline in real conversation, then routes and books qualified leads."
        keywords={['ai lead qualification agent', 'lead qualification automation', 'ai sdr qualification', 'automated lead scoring']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>An AI agent that qualifies <span className="grad-word">every lead</span> before it reaches sales</>}
        subtitle="It engages each inbound lead in real conversation, scores fit and intent, then routes and books the qualified ones — automatically, around the clock."
        primaryCta={{ label: 'Deploy the agent', href: '/contact-us' }}
        secondaryCta={{ label: 'See all AI Agents', href: '/ai-agents' }}
        visual={<LeadQualifyVisual />}
      />

      <NarrativeCompare
        variant="convert"
        eyebrow="The problem"
        heading={<>Your team spends its best hours on leads that were never going to buy.</>}
        paragraphs={[
          'Inbound arrives faster than reps can vet it, so poor-fit leads and real buyers land in the same queue. The good ones cool off waiting, while reps burn time on conversations that go nowhere.',
          <>An AI agent flips that — <strong>qualifying every lead the moment it arrives</strong> and passing sales only the ones worth a call, with the reasoning already attached.</>,
        ]}
        leftLabel="Unqualified inbound queue"
        leftItems={[
          'Reps vet every lead by hand',
          'Hot leads cool off waiting in line',
          'Poor-fit leads eat calendar slots',
          'Sales starts every call from zero',
        ]}
        rightLabel="Qualified by the AI agent"
        rightItems={[
          'Every lead engaged in seconds',
          'Scored on budget, authority, need, timeline',
          'Only qualified leads reach a rep',
          'Handoff carries score and full context',
        ]}
        alt
      />

      <FeatureSpotlight
        eyebrow="Capabilities"
        title={<>Qualification that thinks, not just filters</>}
        subtitle="Each capability works from live conversation and live data — not a static form."
        items={FEATURES}
      />

      <StepsSignal
        eyebrow="How it works"
        title={<>Live in three steps</>}
        subtitle="Describe, connect, deploy — the agent starts qualifying from day one."
        steps={STEPS}
        alt
      />

      <WhyUsTargetRing
        eyebrow="Why it works"
        title={<>Why revenue teams trust it with their pipeline</>}
        subtitle="Qualification that hits the mark on fit and intent, every time."
        items={WHY_US}
      />

      <CTABanner
        title="Stop sending sales unqualified leads"
        subtitle="Deploy the AI agent and let every inbound lead get qualified, scored and routed automatically."
        cta={{ label: 'Deploy the agent', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI lead qualification — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsLeadQualification
