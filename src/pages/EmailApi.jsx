import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMail, IconChart, IconRefresh, IconCode, IconShield, IconLink, IconBolt, IconBrain, IconPencil } from '../components/icons.jsx'
import EmailHeroMock from '../components/EmailHeroMock.jsx'
import EmailCapabilityGrid from '../components/EmailCapabilityGrid.jsx'
import EmailStepsQuiet from '../components/EmailStepsQuiet.jsx'
import WhyUsTargetRing from '../components/WhyUsTargetRing.jsx'
import EcosystemBareIcons from '../components/EcosystemBareIcons.jsx'

const HERO_BADGES = [
  { icon: <IconMail />, word: 'Transactional', desc: 'order & OTP emails, instant' },
  { icon: <IconChart />, word: 'Deliverability', desc: 'inbox placement tracked' },
  { icon: <IconRefresh />, word: 'Fallback', desc: 'auto-retries via SMS' },
  { icon: <IconCode />, word: 'REST + SMTP', desc: 'integrate either way' },
]

const STEPS = [
  { title: 'Verify your domain', desc: 'Add a few DNS records — SPF, DKIM and DMARC — we walk you through it.' },
  { title: 'Design your templates', desc: 'Build transactional and bulk templates visually, or send raw HTML via API.' },
  { title: 'Send with fallback on', desc: 'Launch sends that automatically retry over SMS on a bounce or no-open.' },
]

const COMPARE_ROWS = [
  { feature: 'Channels', left: 'Email only', right: 'Email + SMS in one API' },
  { feature: 'On a bounce', left: 'Message is just lost', right: 'Automatic retry over SMS' },
  { feature: 'Integration', left: 'REST API only', right: 'REST API or SMTP relay' },
  { feature: 'Reporting', left: 'Separate email dashboard', right: 'Unified email + SMS reporting' },
  { feature: 'Deliverability', left: 'Self-managed reputation', right: 'Managed sending infrastructure' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'High deliverability', desc: 'Managed sending infrastructure and reputation monitoring keep you out of the spam folder.' },
  { icon: <IconRefresh />, title: 'A real fallback channel', desc: 'Bounces and unopened sends can automatically retry over SMS — nothing just disappears.' },
  { icon: <IconLink />, title: 'One report, two channels', desc: 'See email and SMS delivery, opens and clicks side by side in the same dashboard.' },
  { icon: <IconShield />, title: 'Built for scale', desc: 'From a single OTP email to a million-send campaign, the same API handles both.' },
]

const ECOSYSTEM = [
  { icon: <IconBolt />, title: 'Bulk SMS', desc: 'Pair email with bulk SMS campaigns from the same account and API.', href: '/bulk-sms' },
  { icon: <IconMail />, title: 'WhatsApp, too', desc: 'Add WhatsApp Business API as a richer channel alongside email and SMS.', href: '/whatsapp-business-api' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'Let AI handle replies to transactional emails and SMS from the same inbox.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design multi-channel flows that combine email, SMS and chat, without writing code.', href: '/chatbot/builder' },
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
        title="Email API & Bulk Email Service"
        description="Send transactional and bulk email from one platform. REST + SMTP, high deliverability and analytics — combined with SMS in a single API."
        keywords={['bulk email API', 'transactional email API', 'bulk email service', 'SMTP relay API', 'mass email service']}
      />

      <Hero
        eyebrow="Email"
        title="Transactional and bulk email, combined with SMS in one API"
        subtitle="REST or SMTP, high deliverability, and a fallback to SMS when an email bounces — all from the same account as your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<EmailHeroMock />}
      />

      <div className="hero-badges-wrap">
        <div className="container">
          <div className="hero-badges">
            {HERO_BADGES.map((b) => (
              <div className="hero-badge" key={b.word}>
                <span className="hero-badge-icon">{b.icon}</span>
                <div className="hero-badge-text">
                  <strong>{b.word}</strong>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NarrativeCompare
        heading={<>Email is the one channel most teams still run alone.</>}
        paragraphs={[
          "SMS, WhatsApp and chat usually live in one platform. Email is the exception — a separate vendor, a separate dashboard, and a separate bill, even though it is often sending the exact same transactional message.",
          'When an email bounces or sits unopened, that is usually the end of it. There is no automatic next step, and no shared view of whether the customer actually got the message on any channel.',
          <>Running email on the same platform as SMS means <strong>one API, one report, and an automatic fallback</strong> when an email does not land.</>,
        ]}
        leftLabel="Email, on its own"
        leftItems={[
          'A separate vendor and a separate bill',
          'Bounces and unopened sends just end there',
          'No shared reporting with your other channels',
          'Deliverability is entirely on your team',
        ]}
        rightLabel="Email, on SMSLocal"
        rightItems={[
          'One API and one account for email and SMS',
          'Bounces can retry automatically over SMS',
          'Combined delivery, open and click reporting',
          'Managed sending infrastructure and monitoring',
        ]}
        alt
      />

      <EmailCapabilityGrid />

      <EmailStepsQuiet eyebrow="How it works" title={<>Start sending email in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Email-only provider vs the combined API</>}
        subtitle="Both send email. Only one of them also catches the ones that don't land."
        leftLabel="Email-only provider"
        rightLabel="SMSLocal"
        rows={COMPARE_ROWS}
      />

      <WhyUsTargetRing eyebrow="Why us" title={<>Why teams send email through SMSLocal</>} items={WHY_US} alt />

      <EcosystemBareIcons
        eyebrow="Ecosystem"
        title={<>Email fits right into your messaging stack</>}
        subtitle="Pair email with SMS, WhatsApp and agentic AI across the same customer record."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Email API — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Send email that has a backup plan"
        subtitle="One API for email and SMS — set up your first send in minutes."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default EmailApi
