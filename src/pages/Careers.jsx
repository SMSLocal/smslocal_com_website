import Seo from '../components/Seo.jsx'
import { Hero, WhyUs, EcosystemGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconGlobe, IconRocket, IconUsers, IconRefresh, IconCode, IconChart, IconChat, IconBrain } from '../components/icons.jsx'

const VALUES = [
  { icon: <IconGlobe />, title: 'Remote-friendly', desc: 'We hire across time zones and build our processes around that.' },
  { icon: <IconRocket />, title: 'Ship fast, ship often', desc: 'Small teams that own their part of the platform end to end.' },
  { icon: <IconUsers />, title: 'Customer-obsessed', desc: 'Everyone talks to customers, not just the support team.' },
  { icon: <IconRefresh />, title: 'Always learning', desc: 'The messaging and AI space moves fast — so do we.' },
]

const TEAMS = [
  { icon: <IconCode />, title: 'Engineering', desc: 'Build the messaging infrastructure, chatbot builder and AI agent platform.' },
  { icon: <IconBrain />, title: 'AI & Data', desc: 'Push what agentic AI agents can reason about and do.' },
  { icon: <IconChart />, title: 'Sales & Success', desc: 'Help businesses find the right channels and get real value fast.' },
  { icon: <IconChat />, title: 'Support', desc: 'Be the human backup when a customer\'s automation needs a person.' },
]

const FAQS = [
  { q: 'Do you have open roles right now?', a: 'Openings vary by team and season — reach out and we\'ll let you know what\'s currently open or coming up.' },
  { q: 'Is SMSLocal remote-friendly?', a: 'Yes, we hire across time zones and build our workflows to support distributed teams.' },
  { q: 'What teams can I apply to?', a: 'Engineering, AI & Data, Sales & Success and Support are our core teams — see above for what each does.' },
]

function Careers() {
  return (
    <>
      <Seo
        title="Careers at SMSLocal"
        description="Join the team building SMSLocal's messaging platform — remote-friendly and fast-moving."
      />

      <Hero
        eyebrow="Careers"
        title={<>Help build the platform teams actually run <span className="grad-word">their business</span> on</>}
        subtitle="We're a remote-friendly team working on messaging, chatbots and agentic AI — moving fast, close to customers."
        primaryCta={{ label: 'Get in Touch', href: '/contact-us/' }}
        secondaryCta={{ label: 'About Us', href: '/about-us/' }}
      />

      <WhyUs title={<>How we work</>} items={VALUES} alt />

      <EcosystemGrid
        title={<>Teams you could join</>}
        subtitle="A look at where people spend their time."
        items={TEAMS}
      />

      <CTABanner
        title="Interested in joining?"
        subtitle="Reach out and tell us where you'd fit in."
        cta={{ label: 'Get in Touch', href: '/contact-us/' }}
      />

      <FAQ title={<>Careers — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default Careers
