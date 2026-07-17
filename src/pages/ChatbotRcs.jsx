import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconPackage, IconCursor, IconShield, IconRefresh, IconChart, IconGlobe, IconBrain, IconClock } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconPackage />, title: 'Rich cards & carousels', desc: 'Show images, product carousels and buttons in every reply.' },
  { icon: <IconCursor />, title: 'Suggested replies', desc: 'One-tap buttons guide the conversation without typing.' },
  { icon: <IconShield />, title: 'Verified sender', desc: 'Your brand name and logo appear on every automated reply.' },
  { icon: <IconRefresh />, title: 'SMS fallback', desc: 'Devices without RCS support still get the message, as plain SMS.' },
]

const STEPS = [
  { title: 'Get RCS verified', desc: 'We handle the Google RCS brand verification for you.' },
  { title: 'Design your bot flow', desc: 'Build rich cards, carousels and quick replies visually.' },
  { title: 'Go live with fallback on', desc: 'Every send drops to SMS automatically on unsupported devices.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Higher engagement', desc: 'Rich, branded bot replies get noticed more than plain text.' },
  { icon: <IconGlobe />, title: 'Android-wide reach', desc: 'Works across RCS-capable Android devices worldwide.' },
  { icon: <IconBrain />, title: 'AI-generated answers', desc: 'Handles questions your flow doesn\'t explicitly cover.' },
  { icon: <IconClock />, title: 'Always on', desc: 'Automated replies around the clock, with human handoff when needed.' },
]

const FAQS = [
  { q: 'What is an RCS chatbot?', a: 'A bot that automates rich, branded conversations on RCS — with cards, carousels and buttons, backed by an automatic SMS fallback.' },
  { q: 'Do I need Google verification?', a: 'Yes, a verified sender is required for branded RCS. We handle that verification process for you.' },
  { q: 'What happens on unsupported devices?', a: 'The message automatically falls back to plain SMS, so delivery never depends on RCS support.' },
  { q: 'Can the bot use rich cards and buttons?', a: 'Yes, rich cards, carousels and suggested-reply buttons are all built into the flow builder.' },
]

function ChatbotRcs() {
  return (
    <>
      <Seo
        title="RCS Chatbot for Rich Messaging"
        description="Build an RCS chatbot with rich cards, buttons and branding on Android — with SMS fallback. Automate conversations that look premium."
        keywords={['RCS Business Messaging bot', 'RCS chatbot for business', 'rich messaging chatbot']}
      />

      <Hero
        eyebrow="RCS Chatbot"
        title="An automated bot that looks as good as it replies"
        subtitle="Rich cards, carousels and suggested replies on RCS — with a verified sender and automatic SMS fallback built in."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See RCS Messaging', href: '/rcs-business-messaging' }}
      />

      <NarrativeCompare
        heading={<>Most automated RCS replies still look like plain SMS with a logo bolted on.</>}
        paragraphs={[
          "RCS supports rich cards, carousels and tappable buttons — but most bots built for it still just send plain text with a verified name attached, ignoring almost everything that makes the channel different.",
          'So the brand pays for a richer channel and gets the same flat experience customers were already used to on SMS.',
          <>An RCS bot should actually use what the channel offers — <strong>cards, carousels and one-tap replies</strong> — with a plain-text fallback only when the device can't support it.</>,
        ]}
        leftLabel="RCS bot, plain-text habits"
        leftItems={[
          'Text-only replies, just with a verified name',
          'No cards, carousels or buttons in use',
          'Same flow whether the device supports rich media or not',
          'Fallback logic bolted on as an afterthought',
        ]}
        rightLabel="RCS bot, built for the channel"
        rightItems={[
          'Rich cards and carousels in the flow itself',
          'Suggested-reply buttons instead of typed answers',
          'Automatic SMS fallback for unsupported devices',
          'Verified sender on every automated reply',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for rich automated replies</>} items={FEATURES} />

      <HowItWorks title={<>Launch your RCS bot in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why brands automate RCS with SMSLocal</>} items={WHY_US} />

      <FAQ title={<>RCS chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Build your first RCS bot"
        subtitle="Verified sender, rich cards and SMS fallback — live in days."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotRcs
