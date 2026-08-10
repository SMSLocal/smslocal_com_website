import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconUsers, IconGear, IconBrain } from '../components/icons.jsx'
import SocialInboxHero from '../components/SocialInboxHero.jsx'
import SocialWhyItMatters from '../components/SocialWhyItMatters.jsx'
import SocialCapabilitySpotlight from '../components/SocialCapabilitySpotlight.jsx'
import StepsConverge from '../components/StepsConverge.jsx'
import WhyUsFeed from '../components/WhyUsFeed.jsx'

const STEPS = [
  { title: 'Connect your channels', desc: 'Link Instagram, Messenger, WhatsApp, Telegram, LINE and more in a few clicks — no dev work needed.' },
  { title: 'Everything lands in one inbox', desc: 'Messages and comments merge into a single stream, each tied to one customer profile and history.' },
  { title: 'Assign & route', desc: 'Rules send each conversation to the right person or team, with collision detection built in.' },
  { title: 'Reply once', desc: 'Answer with AI-assist, templates and notes from one place — on whichever channel the customer used.' },
]

const WHY_US = [
  { icon: <IconChat />, title: 'Never miss a DM again', desc: 'Every message and comment lands in one shared queue your whole team can watch and work.', handle: '@shared-inbox', count: '128', replies: '24' },
  { icon: <IconUsers />, title: 'Context on every customer', desc: 'One profile stitches Instagram, WhatsApp, Messenger and more into a single running history.', handle: '@one-record', count: '96', replies: '18' },
  { icon: <IconGear />, title: 'No more double replies', desc: 'Assignment and collision detection keep two agents off the same conversation for good.', handle: '@smart-routing', count: '74', replies: '12' },
  { icon: <IconBrain />, title: 'Faster, on-brand answers', desc: 'AI-assist drafts the first reply; your team edits, approves and sends in seconds.', handle: '@ai-assist', count: '152', replies: '31' },
]

const FAQS = [
  { q: 'Which channels can I connect?', a: 'Instagram DMs and comments, Facebook Messenger and comments, WhatsApp, Telegram, LINE, Viber and Apple Messages — with more added over time.' },
  { q: 'Does it merge comments and DMs?', a: 'Yes. Public comments and private messages from the same person can be tied to one customer record, so your team keeps full context in a single thread view.' },
  { q: 'Can I assign conversations to teammates?', a: 'Every conversation can be assigned, routed by rules and tracked with SLA timers — and collision detection stops two people replying at the same time.' },
  { q: 'What does AI-assist actually do?', a: 'It drafts an on-brand reply you can edit and send, and can suggest canned replies. A human always stays in control of what goes out.' },
  { q: 'Do customers know they are talking to one team?', a: 'Customers keep chatting in whichever app they prefer. Your team simply sees and answers everything from one shared inbox.' },
]

function SocialInbox() {
  return (
    <>
      <Seo
        title="Social Media Inbox for Every DM & Comment"
        description="Unify Instagram, Messenger, WhatsApp, Telegram and LINE in one shared team inbox."
        keywords={['social media inbox', 'shared social inbox', 'unified social inbox', 'Instagram DM management', 'Messenger inbox', 'omnichannel social support']}
      />

      <Hero
        eyebrow="Social inbox"
        title={<>Every DM and comment in one <span className="grad-word">shared inbox</span></>}
        subtitle="Instagram, Messenger, WhatsApp, Telegram, LINE and more converge into a single team inbox — with one customer record, smart routing and AI-assisted replies."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<SocialInboxHero />}
      />

      <SocialWhyItMatters alt />

      <SocialCapabilitySpotlight />

      <StepsConverge
        eyebrow="How it works"
        title={<>Many channels in, one reply out</>}
        subtitle="Connect your channels once and watch every conversation flow into a single, assignable queue."
        steps={STEPS}
        alt
      />

      <WhyUsFeed
        eyebrow="Why us"
        title={<>Why teams run social on SMSLocal</>}
        subtitle="Built for the way support and community teams actually work across channels."
        items={WHY_US}
      />

      <CTABanner
        title="Bring every conversation into one inbox"
        subtitle="Connect your channels and give your team one shared, context-rich inbox — live in minutes."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Social media inbox — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default SocialInbox
