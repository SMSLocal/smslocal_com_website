import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, FAQ } from '../components/sections/Sections.jsx'
import { IconChart, IconUsers, IconHandshake, IconChat } from '../components/icons.jsx'

const OPTIONS = [
  { icon: <IconChart />, title: 'Talk to Sales', desc: 'Get a walkthrough of the platform and find the right plan for your team.', href: 'mailto:sales@smslocal.com' },
  { icon: <IconUsers />, title: 'Get Support', desc: 'Already a customer? Reach our support team for help with your account.', href: 'mailto:support@smslocal.com' },
  { icon: <IconHandshake />, title: 'Partnerships', desc: 'Interested in reselling or integrating with SMSLocal? Let\'s talk.', href: '/partners' },
  { icon: <IconChat />, title: 'General Inquiries', desc: 'Anything else — press, feedback or just a question.', href: 'mailto:hello@smslocal.com' },
]

const FAQS = [
  { q: 'How quickly will someone get back to me?', a: 'Sales and general inquiries are typically answered within one business day. Existing customers get priority support response times based on their plan.' },
  { q: 'Can I book a live demo?', a: 'Yes — reach out to sales and we\'ll schedule a walkthrough tailored to your use case.' },
  { q: 'I\'m a current customer with an urgent issue — who do I contact?', a: 'Use the support option above, or reach out through your account dashboard for priority routing.' },
]

function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with SMSLocal — sales, support, partnerships or general inquiries."
      />

      <Hero
        eyebrow="Contact"
        title="Let's talk about what you're trying to build"
        subtitle="Whether it's a quick question or a full platform walkthrough, pick the option below that fits."
      />

      <EcosystemGrid
        title={<>How can we help?</>}
        subtitle="Pick the team that fits what you need."
        items={OPTIONS}
        alt
      />

      <FAQ title={<>Contact — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default Contact
