import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconShield, IconPackage, IconRefresh, IconChart, IconGlobe, IconBolt, IconMail, IconChat, IconCheck, IconBrain } from '../components/icons.jsx'
import RcsHeroTransform from '../components/RcsHeroTransform.jsx'
import RcsHeroBadges from '../components/RcsHeroBadges.jsx'
import RcsCapabilities from '../components/RcsCapabilities.jsx'
import RcsUseCases from '../components/RcsUseCases.jsx'
import RcsCompareMatrix from '../components/RcsCompareMatrix.jsx'
import RcsWhyUsQuad from '../components/RcsWhyUsQuad.jsx'
import RcsEcosystemHub from '../components/RcsEcosystemHub.jsx'

const HERO_BADGES = [
  { icon: <IconCheck />, word: 'Verified', desc: 'brand sender with logo & name' },
  { icon: <IconPackage />, word: 'Rich', desc: 'cards, carousels & media' },
  { icon: <IconRefresh />, word: 'Auto', desc: 'SMS fallback, no message lost' },
  { icon: <IconBrain />, word: 'AI', desc: 'answers every reply in one inbox' },
]

const COMPARE_ROWS = [
  { feature: 'Sender identity', left: 'Just a phone number', right: 'Verified brand name + logo' },
  { feature: 'Message format', left: 'Plain text only', right: 'Rich cards, carousels & media' },
  { feature: 'Interactivity', left: 'No buttons', right: 'Quick-reply & action buttons' },
  { feature: 'Read status', left: 'No read receipts', right: 'Delivered, read & typing indicators' },
  { feature: 'Unsupported devices', left: 'N/A', right: 'Auto-fallback to SMS, nothing lost' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Higher engagement', desc: 'Rich, branded messages get noticed and clicked far more than a plain SMS.' },
  { icon: <IconRefresh />, title: 'Built-in fallback', desc: 'Every send still lands as SMS on non-RCS devices — no lost reach.' },
  { icon: <IconShield />, title: 'Fast verification', desc: 'We run the Google RCS brand verification process end-to-end for you.' },
  { icon: <IconGlobe />, title: 'Unified reporting', desc: 'Track RCS and SMS delivery side by side in one dashboard.' },
]

const ECOSYSTEM = [
  { icon: <IconBolt />, title: 'RCS broadcasting', desc: 'Send verified, branded RCS campaigns to your whole list at once — with SMS fallback built in.', href: '/channels/rcs/' },
  { icon: <IconChat />, title: 'SMS broadcasting', desc: 'The universal safety net — when a device can’t receive RCS, the same send still lands as plain SMS.', href: '/bulk-sms/' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The AI layer that reads every reply, grounds its answer in your data, and closes the loop without a human.', href: '/ai-agents/customer-service/' },
  { icon: <IconMail />, title: 'Omnichannel inbox', desc: 'Every RCS reply lands right beside WhatsApp, SMS and social replies — all inside one shared team inbox.', href: '/chatbot/whatsapp/' },
]

const TESTIMONIALS = [
  { quote: 'Our shipping updates went from plain texts to branded rich cards overnight — click-through nearly doubled.', name: 'Vikram Sethi', role: 'D2C Founder' },
  { quote: 'The SMS fallback meant we didn’t have to think about device support at all. It just works.', name: 'Naomi Fernandes', role: 'Marketing Ops Lead' },
  { quote: 'Getting Google-verified felt like it would take weeks. SMSLocal ran the whole process for us in days.', name: 'Arjun Reddy', role: 'Growth Manager, Fintech' },
]

const FAQS = [
  { q: 'What is RCS business messaging?', a: 'RCS (Rich Communication Services) is an upgrade to SMS that adds verified branding, rich cards, carousels, buttons and read receipts to text messaging on supported Android devices.' },
  { q: 'How is RCS different from SMS?', a: 'SMS is plain text from a number. RCS shows your verified brand name and logo, and supports images, carousels, suggested replies and delivery/read status.' },
  { q: 'What happens if a customer’s phone doesn’t support RCS?', a: 'The message automatically falls back to standard SMS, so delivery never depends on the recipient having an RCS-capable device.' },
  { q: 'Do I need Google verification to send RCS?', a: 'Yes — brands need to be verified with Google to send branded RCS messages. We handle the full verification process for you.' },
]

function RcsBusinessMessaging() {
  return (
    <>
      <Seo
        title="RCS Business Messaging for Growing Brands"
        description="Upgrade SMS to RCS with a verified sender, rich media, buttons and carousels plus automatic SMS fallback. Reach Android at scale with our RCS API."
        keywords={['RCS business messaging', 'RCS API', 'RCS for business', 'rich communication services', 'branded RCS messaging', 'RCS vs SMS']}
      />

      <Hero
        eyebrow="RCS"
        title={<>Bring branded RCS messaging to <span className="grad-word">every Android inbox</span></>}
        subtitle="Verified sender badges, rich cards, carousels and quick-reply buttons — with automatic SMS fallback when RCS isn't supported."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<RcsHeroTransform />}
      />

      <RcsHeroBadges items={HERO_BADGES} />

      <RcsCapabilities />

      <RcsUseCases />

      <RcsCompareMatrix
        title={<>RCS vs plain SMS</>}
        subtitle="Same underlying network, a much richer experience for the customer."
        leftLabel="SMS"
        rightLabel="RCS"
        rows={COMPARE_ROWS}
      />

      <RcsWhyUsQuad eyebrow="Why us" title={<>Why brands upgrade to our RCS API</>} items={WHY_US} />

      <RcsEcosystemHub
        eyebrow="Ecosystem"
        title={<>Everything RCS connects to</>}
        subtitle="RCS is one channel in a bigger system — scaled broadcasting, an SMS safety net, agentic AI, and a shared inbox tying it all together."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Upgrade your SMS to branded RCS"
        subtitle="Verified sender, rich cards and automatic fallback — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>RCS business messaging — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default RcsBusinessMessaging
