import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMail, IconChart, IconRefresh, IconShield, IconLink, IconBolt, IconBrain, IconPencil } from '../components/icons.jsx'
import EmailHeroMock from '../components/EmailHeroMock.jsx'
import EmailAloneLedger from '../components/EmailAloneLedger.jsx'
import EmailSetupJourney from '../components/EmailSetupJourney.jsx'
import EmailOneApi from '../components/EmailOneApi.jsx'
import EmailWhyFlip from '../components/EmailWhyFlip.jsx'
import EmailEcosystemOrbit from '../components/EmailEcosystemOrbit.jsx'

const STEPS = [
  { title: 'Verify your domain', desc: 'Add a few DNS records — SPF, DKIM and DMARC — we walk you through it.' },
  { title: 'Design your templates', desc: 'Build transactional and bulk templates visually, or send raw HTML via API.' },
  { title: 'Send with fallback on', desc: 'Launch sends that automatically retry over SMS on a bounce or no-open.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'High deliverability', desc: 'Managed sending infrastructure and reputation monitoring keep you out of the spam folder.' },
  { icon: <IconRefresh />, title: 'A real fallback channel', desc: 'Bounces and unopened sends can automatically retry over SMS — nothing just disappears.' },
  { icon: <IconLink />, title: 'One report, two channels', desc: 'See email and SMS delivery, opens and clicks side by side in the same dashboard.' },
  { icon: <IconShield />, title: 'Built for scale', desc: 'From a single OTP email to a million-send campaign, the same API handles both.' },
]

const ECOSYSTEM = [
  { icon: <IconBolt />, title: 'Bulk SMS', desc: 'Pair email with bulk SMS campaigns from the same account and API.' },
  { icon: <IconMail />, title: 'WhatsApp, too', desc: 'Add WhatsApp Business API as a richer channel alongside email and SMS.', href: '/products/channels/whatsapp/' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'Let AI handle replies to transactional emails and SMS from the same inbox.', href: '/products/ai-agents/customer-service/' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design multi-channel flows that combine email, SMS and chat, without writing code.' },
]

const TESTIMONIALS = [
  { quote: 'Switching to a combined email + SMS API cut our vendor bill in half and gave us one dashboard instead of two.', name: 'Rhea Kapoor', role: 'Growth Lead, SaaS' },
  { quote: 'Bounced emails used to just vanish. Now they retry over SMS automatically and we actually reach people.', name: 'Tom Whitfield', role: 'Ecommerce Ops' },
  { quote: 'Domain verification and deliverability setup that used to take our team a week took an afternoon here.', name: 'Sana Al-Amin', role: 'Marketing Manager' },
]

const FAQS = [
  { q: 'What is included in the email API?', a: 'Transactional and bulk email sending via REST API or SMTP relay, template design, deliverability monitoring, and reporting — combined with SMS in the same account.' },
  { q: 'Can I use SMTP instead of the REST API?', a: 'Yes — point your existing SMTP relay at us with no code changes, or integrate directly with the REST API for more control.' },
  { q: 'What happens if an email bounces?', a: 'A bounce or unopened send can automatically trigger a fallback SMS to the same contact, so the message still reaches them.' },
  { q: 'Can I send both email and SMS from one account?', a: 'Yes, email and SMS run on the same API and account, with combined delivery, open and click reporting in one dashboard.' },
]

function EmailApi() {
  return (
    <>
      <Seo
        title="Email API & Bulk Email Sending Platform"
        description="Send transactional and bulk email via REST or SMTP, combined with SMS in one unified API."
        keywords={['bulk email API', 'transactional email API', 'bulk email service', 'SMTP relay API', 'mass email service']}
      />

      <Hero
        eyebrow="Email"
        title={<>Transactional and bulk email, combined with SMS in <span className="grad-word">one API</span></>}
        subtitle="REST or SMTP, high deliverability, and a fallback to SMS when an email bounces — all from the same account as your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<EmailHeroMock />}
      />

      <EmailAloneLedger
        heading={<>Email is the one channel most teams still run alone.</>}
        paragraphs={[
          <>SMS, WhatsApp and chat live in one platform — email is the exception. A separate vendor, a separate dashboard, a separate bill, for a message that&rsquo;s often the exact same one.</>,
        ]}
      />

      <EmailOneApi />

      <EmailSetupJourney eyebrow="How it works" title={<>Start sending email in three steps</>} steps={STEPS} />

      <EmailWhyFlip eyebrow="Why us" title={<>Why teams send email through SMSLocal</>} items={WHY_US} />

      <EmailEcosystemOrbit
        eyebrow="Ecosystem"
        title={<>Email fits right into your messaging stack</>}
        subtitle="Pair email with SMS, WhatsApp and agentic AI across the same customer record."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Send email that has a backup plan"
        subtitle="One API for email and SMS — set up your first send in minutes."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Email API — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default EmailApi
