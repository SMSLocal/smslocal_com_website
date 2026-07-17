import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, Testimonials, CTABanner } from '../components/sections/Sections.jsx'
import { IconCart, IconCalendar, IconDollar, IconGlobe } from '../components/icons.jsx'

const RESULTS = [
  { icon: <IconCart />, title: 'D2C brand', desc: 'Cut cart-recovery response time from hours to seconds with a WhatsApp chatbot.' },
  { icon: <IconCalendar />, title: 'Clinic network', desc: 'Reduced no-shows by automating appointment reminders across SMS and WhatsApp.' },
  { icon: <IconDollar />, title: 'Fintech startup', desc: 'Deflected most routine account questions with a compliant support AI agent.' },
  { icon: <IconGlobe />, title: 'Travel platform', desc: 'Automated booking changes and guest support across three languages.' },
]

const TESTIMONIALS = [
  { quote: 'Switching our order updates to WhatsApp and adding an AI agent for replies changed our response time completely.', name: 'Priya Nair', role: 'Growth Marketer, D2C brand' },
  { quote: 'Automated reminders across SMS and WhatsApp brought our no-show rate down within the first month.', name: 'Dr. Amit Rao', role: 'Operations Lead, Clinic Network' },
  { quote: 'Our support AI agent now resolves most account questions on its own, with full audit logging for compliance.', name: 'Sara Bianchi', role: 'Head of Support, Fintech' },
]

function ResourcesCaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Real results from teams running messaging, chatbots and AI agents on SMSLocal — ecommerce, healthcare, fintech and travel."
      />

      <Hero
        eyebrow="Case Studies"
        title="Real results, across industries"
        subtitle="A look at how teams in ecommerce, healthcare, fintech and travel are using SMSLocal to move faster and resolve more without adding headcount."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Solutions', href: '/products' }}
      />

      <EcosystemGrid
        title={<>Results across industries</>}
        subtitle="A snapshot of the kind of outcomes teams see."
        items={RESULTS}
        alt
      />

      <Testimonials title={<>In their own words</>} items={TESTIMONIALS} />

      <CTABanner
        title="See what SMSLocal could do for your team"
        subtitle="Tell us about your use case — we'll show you a relevant example."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default ResourcesCaseStudies
