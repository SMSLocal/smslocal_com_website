import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, CTABanner } from '../components/sections/Sections.jsx'
import { IconRocket, IconChat, IconRobot, IconBrain, IconCode } from '../components/icons.jsx'

const GUIDES = [
  { icon: <IconRocket />, title: 'Getting started', desc: 'Set up your account and send your first message in minutes.' },
  { icon: <IconChat />, title: 'Channel setup', desc: 'Step-by-step guides for WhatsApp, RCS, Viber, Telegram and more.' },
  { icon: <IconRobot />, title: 'Building a chatbot', desc: 'Design your first flow and deploy it across channels.' },
  { icon: <IconBrain />, title: 'Deploying an AI agent', desc: 'Connect your data, set guardrails and go live.' },
  { icon: <IconCode />, title: 'API integration', desc: 'Wire up the REST API or SMTP relay from your own systems.' },
]

function ResourcesGuides() {
  return (
    <>
      <Seo
        title="Setup Guides"
        description="Step-by-step guides for getting started with SMSLocal — channels, chatbots, AI agents and API integration."
      />

      <Hero
        eyebrow="Guides"
        title="Step-by-step guides to get you live faster"
        subtitle="From your first message to a fully deployed AI agent — practical guides for every part of the platform."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Docs', href: '/resources/docs' }}
      />

      <EcosystemGrid
        title={<>Guides by topic</>}
        subtitle="Pick where you're starting from."
        items={GUIDES}
        alt
      />

      <CTABanner
        title="Need help with something specific?"
        subtitle="Talk to our team and we'll walk you through it."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default ResourcesGuides
