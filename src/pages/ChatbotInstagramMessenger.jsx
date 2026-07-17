import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconBrain, IconUsers, IconBolt, IconChart, IconMail, IconRefresh, IconClock } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconChat />, title: 'Instant DM replies', desc: 'Answer Instagram and Messenger DMs the moment they land.' },
  { icon: <IconRefresh />, title: 'Comment-to-DM', desc: 'Turn public comments into private conversations automatically.' },
  { icon: <IconBrain />, title: 'AI-generated answers', desc: 'Handle open-ended questions your flow doesn\'t explicitly cover.' },
  { icon: <IconUsers />, title: 'Cart recovery', desc: 'Follow up on abandoned carts directly inside the DM thread.' },
]

const STEPS = [
  { title: 'Connect your accounts', desc: 'Link your Instagram Business and Facebook Page in a few clicks.' },
  { title: 'Design your flow', desc: 'Build replies, comment automation and cart-recovery sequences visually.' },
  { title: 'Go live in one inbox', desc: 'Every DM and comment reply lands beside your other channels.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Faster replies', desc: 'Cut average DM response time from hours to seconds.' },
  { icon: <IconChart />, title: 'Comment capture', desc: 'Stop losing interested buyers in the comments section.' },
  { icon: <IconMail />, title: 'One shared inbox', desc: 'Instagram and Messenger sit beside WhatsApp and SMS.' },
  { icon: <IconClock />, title: '24/7 coverage', desc: 'Never leave a DM unanswered overnight or on weekends.' },
]

const FAQS = [
  { q: 'Can one bot cover both Instagram and Messenger?', a: 'Yes, a single flow can be deployed to Instagram DMs and Facebook Messenger from the same builder.' },
  { q: 'Can it turn comments into DMs?', a: 'Yes, comments on your posts can be automatically routed into a private DM conversation.' },
  { q: 'Is this an alternative to ManyChat?', a: 'Yes — the same social automation, plus a shared inbox with WhatsApp, SMS and other channels in one platform.' },
  { q: 'Can it help recover abandoned carts?', a: 'Yes, cart-recovery sequences can run directly inside Instagram or Messenger DMs.' },
]

function ChatbotInstagramMessenger() {
  return (
    <>
      <Seo
        title="Instagram & Messenger Chatbot"
        description="Automate Instagram DMs and Facebook Messenger with an AI chatbot. Reply instantly, recover carts and qualify leads across social."
        keywords={['Facebook Messenger chatbot', 'Instagram DM automation', 'social media chatbot', 'ManyChat alternative']}
      />

      <Hero
        eyebrow="Social Chatbot"
        title="One bot for Instagram DMs and Facebook Messenger"
        subtitle="Reply instantly, turn comments into conversations, and recover carts — across both social channels from a single flow."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See Instagram API', href: '/instagram-messaging-api' }}
      />

      <NarrativeCompare
        heading={<>Comments and DMs pile up faster than any team can reply.</>}
        paragraphs={[
          "A single post can generate hundreds of comments and DMs within minutes — most of them asking the same three things: size, price, availability.",
          'By the time someone gets to comment forty, the interested buyer who asked at comment three has already moved on to a competitor\'s post.',
          <>Automating the reply doesn't mean sounding robotic — it means <strong>catching the moment of interest before it disappears</strong>.</>,
        ]}
        leftLabel="Manual social replies"
        leftItems={[
          'Comments buried under newer posts within hours',
          'Same three questions answered one by one',
          'DMs and comments checked separately',
          'Interested buyers lost to slow replies',
        ]}
        rightLabel="Automated, on Instagram & Messenger"
        rightItems={[
          'Comments auto-routed into a private DM',
          'Instant answers to the common questions',
          'One inbox for DMs, comments and Messenger',
          'Cart-recovery follow-ups run automatically',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for social conversations</>} items={FEATURES} />

      <HowItWorks title={<>Go live on social in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why brands automate social with SMSLocal</>} items={WHY_US} />

      <FAQ title={<>Instagram & Messenger chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Automate your Instagram and Messenger DMs"
        subtitle="Connect both accounts and go live in minutes."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotInstagramMessenger
