import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconShield, IconBrain, IconMail, IconLink } from '../components/icons.jsx'
import ViberHeroMock from '../components/ViberHeroMock.jsx'
import ViberProblemShift from '../components/ViberProblemShift.jsx'
import ViberCapabilityGrid from '../components/ViberCapabilityGrid.jsx'
import ViberStepsTimeline from '../components/ViberStepsTimeline.jsx'
import WhyUsUnderline from '../components/WhyUsUnderline.jsx'

const STEPS = [
  { title: 'Verify your sender', desc: 'We handle Viber Business verification — logo, name and sender ID approved.' },
  { title: 'Design broadcasts & replies', desc: 'Build rich broadcasts and automated reply flows from templates or your own assets.' },
  { title: 'Go live in one inbox', desc: 'Every broadcast reply and chat lands beside your other channels.' },
]

const WHY_US = [
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Viber, WhatsApp, SMS and Instagram all land in the same shared inbox.' },
  { icon: <IconLink />, title: 'One record follows everything', desc: 'Order history, past chats and notes travel with the customer across channels.' },
  { icon: <IconBrain />, title: 'The same AI throughout', desc: 'Whichever channel a reply comes in on, the same agentic AI already knows the context.' },
  { icon: <IconShield />, title: 'Verified and compliant', desc: 'Broadcasts go out under a verified sender, handled end-to-end by our team.' },
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
        title="Viber Business Messages & API for Brands"
        description="Send verified Viber broadcasts and manage two-way chats via our Viber API, in one shared inbox."
        keywords={['Viber Business Messages', 'Viber API', 'Viber business account', 'Viber broadcast messages', 'Viber for business']}
      />

      <Hero
        eyebrow="Viber"
        title={<>Viber broadcasts and chat inside your <span className="grad-word">agentic AI platform</span></>}
        subtitle="One inbox for Viber and everything else — verified broadcasts, two-way replies, and the same AI that already answers your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<ViberHeroMock />}
      />

      <ViberProblemShift
        eyebrow="/01 The problem"
        heading={<>A Viber broadcast lives in its own app. Everything you know about the customer doesn't.</>}
        subtitle="Bring Viber into one shared inbox and every reply opens against the full conversation — not a blank screen."
        alt
      />

      <ViberCapabilityGrid />

      <ViberStepsTimeline eyebrow="How it works" title={<>Go live on Viber in three steps</>} steps={STEPS} alt />

      <WhyUsUnderline eyebrow="Why us" title={<>Why brands run Viber on SMSLocal</>} items={WHY_US} alt />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Bring Viber into the same platform as everything else"
        subtitle="Verified broadcasts, two-way chat and one inbox — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Viber business messaging — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default ViberBusinessMessages
