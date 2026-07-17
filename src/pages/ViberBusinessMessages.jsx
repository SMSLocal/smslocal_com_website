import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconShield, IconBrain, IconMail, IconLink, IconPhone, IconReceipt } from '../components/icons.jsx'
import ViberHeroMock from '../components/ViberHeroMock.jsx'
import ViberCapabilityGrid from '../components/ViberCapabilityGrid.jsx'
import ViberStepsTimeline from '../components/ViberStepsTimeline.jsx'
import WhyUsUnderline from '../components/WhyUsUnderline.jsx'
import EcosystemMinimalRow from '../components/EcosystemMinimalRow.jsx'

const HERO_BADGES = [
  { icon: <IconPhone />, word: 'In + out', desc: 'inbound and outbound calling' },
  { icon: <IconPhone />, word: '1 click', desc: 'to call from any record' },
  { icon: <IconReceipt />, word: 'Every call', desc: 'notes tied to the conversation' },
  { icon: <IconBrain />, word: 'Ready', desc: 'a path to AI voice agents' },
]

const STEPS = [
  { title: 'Verify your sender', desc: 'We handle Viber Business verification — logo, name and sender ID approved.' },
  { title: 'Design broadcasts & replies', desc: 'Build rich broadcasts and automated reply flows from templates or your own assets.' },
  { title: 'Go live in one inbox', desc: 'Every broadcast reply and chat lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One app, one device', right: 'Unlimited team seats' },
  { feature: 'Broadcasts', left: 'Manual sends only', right: 'Segmented, verified broadcasts at scale' },
  { feature: 'Automation', left: 'No automated replies', right: 'Auto-replies & agentic AI handoff' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'Basic delivery count', right: 'Delivery, read & reply analytics' },
]

const WHY_US = [
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Viber, WhatsApp, SMS and Instagram all land in the same shared inbox.' },
  { icon: <IconLink />, title: 'One record follows everything', desc: 'Order history, past chats and notes travel with the customer across channels.' },
  { icon: <IconBrain />, title: 'The same AI throughout', desc: 'Whichever channel a reply comes in on, the same agentic AI already knows the context.' },
  { icon: <IconShield />, title: 'Verified and compliant', desc: 'Broadcasts go out under a verified sender, handled end-to-end by our team.' },
]

const ECOSYSTEM = [
  { icon: <IconBrain />, title: 'Voice AI agents', desc: 'Add an AI voice agent for after-hours and overflow calls — same customer record, same context.', href: '/ai-agents/voice' },
  { icon: <IconPhone />, title: 'Local & toll-free numbers', desc: 'Get local or toll-free numbers to make and receive Viber calls on.', href: '/sms-api' },
  { icon: <IconMail />, title: 'Omnichannel inbox', desc: 'One inbox where Viber sits beside WhatsApp, SMS and email.', href: '/whatsapp-business-api' },
  { icon: <IconLink />, title: 'Agentic AI platform', desc: 'The platform that runs your agents, inbox, numbers and campaigns.', href: '/ai-agents/customer-service' },
]

const TESTIMONIALS = [
  { quote: 'Our Viber broadcasts used to be a one-way shout into the void. Now every reply lands as a real conversation with full context.', name: 'Noor Fatima', role: 'Growth Lead, D2C brand' },
  { quote: 'Getting verified on Viber felt intimidating until SMSLocal ran the whole process for us in days, not weeks.', name: 'Sebastian Cruz', role: 'Marketing Manager' },
  { quote: 'Having Viber sit beside WhatsApp and SMS in one inbox changed how fast our support team actually replies.', name: 'Priyanka Desai', role: 'Customer Experience Lead' },
]

const FAQS = [
  { q: 'What is Viber Business Messaging?', a: 'It is the official way for businesses to send verified broadcasts and manage two-way chats with customers on Viber, accessed through an approved provider like SMSLocal.' },
  { q: 'Can customers reply to a broadcast, or is it one-way?', a: 'Customers can reply directly — every response opens as a real two-way conversation in your shared inbox, not a dead end.' },
  { q: 'Do I need Viber verification to send broadcasts?', a: 'Yes — a verified business sender is required for branded broadcasts. We handle the full verification process for you.' },
  { q: 'Can I manage Viber alongside WhatsApp and SMS?', a: 'Yes, Viber sits beside WhatsApp, SMS and other channels in the same shared inbox, with one customer record across all of them.' },
]

function ViberBusinessMessages() {
  return (
    <>
      <Seo
        title="Viber Business Messages & API"
        description="Send verified Viber broadcasts and manage two-way business chats via our Viber API — rich media, automated replies and one shared inbox."
        keywords={['Viber Business Messages', 'Viber API', 'Viber business account', 'Viber broadcast messages', 'Viber for business']}
      />

      <Hero
        eyebrow="Viber"
        title="Viber broadcasts and chat inside your agentic AI platform"
        subtitle="One inbox for Viber and everything else — verified broadcasts, two-way replies, and the same AI that already answers your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<ViberHeroMock />}
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
        eyebrow="/01 The problem"
        heading={<>A Viber broadcast lives in its own app. Everything you know about the customer doesn't.</>}
        paragraphs={[
          "Most teams run Viber in one tool and everything else — chat, orders, support — in another. A broadcast goes out, a customer replies, and whoever picks it up sees a bare Viber handle with no order history and no idea the same person already messaged on WhatsApp an hour ago.",
          'So replies get answered blind. The agent re-asks questions the customer already answered elsewhere, notes stay stuck inside the Viber app, and the next channel that customer uses starts from zero again.',
          <>Bringing Viber into the same inbox as your other channels closes that gap — <strong>every reply opens against the full conversation</strong>, not a blank screen.</>,
        ]}
        leftLabel="Viber, standalone"
        leftItems={[
          'Broadcasts go out, replies land in a separate app',
          'No order or chat history behind a reply',
          'Customer re-explains what they already said elsewhere',
          'Notes and context stay stuck in Viber',
        ]}
        rightLabel="Viber, on SMSLocal"
        rightItems={[
          'Viber sits beside WhatsApp, SMS and web chat',
          'Every reply opens against the full customer record',
          'Zero repeat questions across channels',
          'Notes and history saved to one shared timeline',
        ]}
        alt
      />

      <ViberCapabilityGrid />

      <ViberStepsTimeline eyebrow="How it works" title={<>Go live on Viber in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Standalone Viber vs the SMSLocal API</>}
        subtitle="The Viber app works for one person, one device. The API is built for a team and for scale."
        leftLabel="Viber App"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
      />

      <WhyUsUnderline eyebrow="Why us" title={<>Why brands run Viber on SMSLocal</>} items={WHY_US} alt />

      <EcosystemMinimalRow
        eyebrow="Ecosystem"
        title={<>The platform behind every Viber call</>}
        subtitle="Voice is one channel on a platform that runs your agents, numbers and inbox together."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Viber business messaging — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Bring Viber into the same platform as everything else"
        subtitle="Verified broadcasts, two-way chat and one inbox — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default ViberBusinessMessages
