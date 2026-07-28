import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMail, IconLink, IconBrain, IconShield, IconBolt, IconChat } from '../components/icons.jsx'
import KakaoTalkHeroMock from '../components/KakaoTalkHeroMock.jsx'

const CAPABILITIES = [
  { icon: <IconBolt />, title: 'AlimTalk notices', desc: 'Send order confirmations, shipping updates and appointment reminders as verified AlimTalk notices — the notification surface Korean customers already trust.' },
  { icon: <IconChat />, title: 'FriendTalk broadcasts', desc: 'Reach everyone who has added your Kakao Channel with rich, branded broadcasts — images, buttons and coupons included.' },
  { icon: <IconMail />, title: 'Two-way channel chat', desc: 'Every reply to a notice or broadcast opens as a real conversation in your shared inbox, not a dead end.' },
  { icon: <IconShield />, title: 'Verified Kakao Channel', desc: 'We handle Kakao Channel verification and sender approval end-to-end, so broadcasts go out under a trusted business identity.' },
]

const WHY_US = [
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'KakaoTalk sits beside SMS, WhatsApp and every other channel in the same shared inbox.' },
  { icon: <IconLink />, title: 'One record follows everything', desc: 'Order history, past chats and notes travel with the customer across channels.' },
  { icon: <IconBrain />, title: 'The same AI throughout', desc: 'Whichever channel a reply comes in on, the same agentic AI already knows the context.' },
]

const TESTIMONIALS = [
  { quote: 'AlimTalk notices land in the one app our customers actually check — open rates are nothing like email.', name: 'Ji-woo Han', role: 'Head of CX, D2C brand' },
  { quote: 'Getting our Kakao Channel verified felt intimidating until SMSLocal ran the whole process for us.', name: 'Marco Silva', role: 'Marketing Manager' },
  { quote: 'Having KakaoTalk sit beside WhatsApp and SMS in one inbox changed how fast our team actually replies.', name: 'Aiko Tanaka', role: 'Customer Experience Lead' },
]

const FAQS = [
  { q: 'What is KakaoTalk Business Messaging?', a: 'It is the official way for businesses to send verified AlimTalk notices and FriendTalk broadcasts, and manage two-way chats with customers on KakaoTalk, through an approved provider like SMSLocal.' },
  { q: 'What is the difference between AlimTalk and FriendTalk?', a: 'AlimTalk is for transactional notices — order confirmations, shipping updates, reminders — sent to any customer with your channel added. FriendTalk is for marketing broadcasts to channel friends, with richer formatting.' },
  { q: 'Do I need to verify a Kakao Channel to send messages?', a: 'Yes — a verified Kakao Channel is required. We handle the full verification and approval process for you.' },
  { q: 'Can customers reply, or is it one-way?', a: 'Customers can reply directly — every response opens as a real two-way conversation in your shared inbox.' },
  { q: 'Can I manage KakaoTalk alongside WhatsApp and SMS?', a: 'Yes, KakaoTalk sits beside WhatsApp, SMS and other channels in the same shared inbox, with one customer record across all of them.' },
]

function KakaoTalkBusinessMessaging() {
  return (
    <>
      <Seo
        title="KakaoTalk Business Messaging & API"
        description="Send verified AlimTalk notices and FriendTalk broadcasts, and manage two-way KakaoTalk chats — one shared inbox alongside every other channel."
        keywords={['KakaoTalk Business Messaging', 'AlimTalk API', 'FriendTalk API', 'Kakao Channel', 'KakaoTalk for business']}
      />

      <Hero
        eyebrow="KakaoTalk"
        title={<>AlimTalk notices and FriendTalk broadcasts inside your <span className="grad-word">agentic AI platform</span></>}
        subtitle="One inbox for KakaoTalk and everything else — verified notices, two-way replies, and the same AI that already answers your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<KakaoTalkHeroMock />}
      />

      <NarrativeCompare
        variant="columns"
        eyebrow="The problem"
        heading={<>A KakaoTalk notice lives in its own app. Everything you know about the customer doesn't.</>}
        paragraphs={[
          'Send a notice or broadcast through a disconnected tool, and every reply lands with no order history, no past chats and no context — a blank screen for whoever answers it.',
          <>Bring KakaoTalk into <strong>one shared inbox</strong>, and every reply opens against the full conversation across every channel.</>,
        ]}
        leftLabel="KakaoTalk on its own"
        leftItems={[
          'A separate login just for Kakao Channel',
          'No customer history behind a reply',
          'A different bill and API to manage',
          'No fallback when a notice can’t be delivered',
        ]}
        rightLabel="KakaoTalk on SMSLocal"
        rightItems={[
          'AlimTalk and FriendTalk from one platform',
          'Full customer history on every reply',
          'One API, one wallet, one invoice',
          'Automatic fallback to SMS or WhatsApp',
        ]}
        alt
      />

      <FeatureGrid
        eyebrow="Capabilities"
        title={<>Everything a Kakao Channel can really do</>}
        subtitle="Notices, broadcasts and two-way chat — all verified, all in one inbox."
        items={CAPABILITIES}
      />

      <FeatureGrid
        variant="panel"
        eyebrow="Why us"
        title={<>Why brands run KakaoTalk on SMSLocal</>}
        subtitle="The same platform, inbox and AI that already run your other channels."
        items={WHY_US}
        alt
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} />

      <CTABanner
        title="Bring KakaoTalk into the same platform as everything else"
        subtitle="Verified notices, broadcasts and one inbox — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>KakaoTalk business messaging — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default KakaoTalkBusinessMessaging
