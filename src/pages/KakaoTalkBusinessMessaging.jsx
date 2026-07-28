import Seo from '../components/Seo.jsx'
import { Hero, FeatureGrid, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMail, IconLink, IconBrain } from '../components/icons.jsx'
import KakaoTalkHeroMock from '../components/KakaoTalkHeroMock.jsx'
import KakaoTalkProblemShift from '../components/KakaoTalkProblemShift.jsx'
import KakaoTalkCapabilityGrid from '../components/KakaoTalkCapabilityGrid.jsx'
import KakaoTalkStepsTimeline from '../components/KakaoTalkStepsTimeline.jsx'

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

const STEPS = [
  { title: 'Verify your Kakao Channel', desc: 'We handle Kakao Channel verification and sender approval — name, category and identity confirmed.' },
  { title: 'Design notices & broadcasts', desc: 'Build AlimTalk notice templates and FriendTalk broadcasts from templates or your own assets.' },
  { title: 'Go live in one inbox', desc: 'Every notice reply and broadcast reply lands beside your other channels, answered by the same AI.' },
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

      <KakaoTalkProblemShift
        eyebrow="The problem"
        heading={<>A Kakao Channel reply lives in its own app. Everything you know about the customer doesn't.</>}
        subtitle="Bring KakaoTalk into one shared inbox and every reply opens against the full conversation — not a blank screen."
      />

      <KakaoTalkCapabilityGrid />

      <KakaoTalkStepsTimeline
        eyebrow="How it works"
        title={<>Go live on KakaoTalk in three steps</>}
        steps={STEPS}
        alt
      />

      <FeatureGrid
        variant="panel"
        eyebrow="Why us"
        title={<>Why brands run KakaoTalk on SMSLocal</>}
        subtitle="The same platform, inbox and AI that already run your other channels."
        items={WHY_US}
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
