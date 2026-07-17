import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMegaphone, IconCode, IconShield, IconChat, IconBolt, IconMail, IconGlobe, IconRefresh, IconChart } from '../components/icons.jsx'

const CHANNELS = [
  { icon: <IconMegaphone />, title: 'Bulk SMS', desc: 'Send high-deliverability SMS at scale for marketing, alerts and OTP.', href: '/bulk-sms' },
  { icon: <IconCode />, title: 'SMS API', desc: 'Programmable SMS for developers — REST API with delivery webhooks.', href: '/sms-api' },
  { icon: <IconShield />, title: 'OTP & verification', desc: 'Fast, reliable one-time passcodes for signups and logins.', href: '/otp-sms' },
  { icon: <IconChat />, title: 'WhatsApp Business API', desc: 'Official, verified WhatsApp messaging with broadcasts and two-way chat.', href: '/whatsapp-business-api' },
  { icon: <IconBolt />, title: 'RCS Business Messaging', desc: 'Verified sender, rich cards and buttons on Android, with SMS fallback.', href: '/rcs-business-messaging' },
  { icon: <IconChat />, title: 'Instagram DM API', desc: 'Automate and manage Instagram DMs for support and sales.', href: '/instagram-messaging-api' },
  { icon: <IconChat />, title: 'Facebook Messenger', desc: 'Persistent menu, quick replies and AI for your Facebook Page.', href: '/facebook-messenger-api' },
  { icon: <IconChat />, title: 'Viber Business Messages', desc: 'Verified broadcasts and two-way chat, plus Viber voice calls.', href: '/viber-business-messages' },
  { icon: <IconChat />, title: 'Telegram for Business', desc: 'Bots, buttons and broadcasts on Telegram, fully hosted for you.', href: '/telegram-business' },
  { icon: <IconChat />, title: 'Apple Messages for Business', desc: 'Native iMessage chat with list pickers and Apple Pay.', href: '/apple-messages-for-business' },
  { icon: <IconChat />, title: 'LINE Business Messaging', desc: 'Flex messages, rich menu and loyalty for your LINE Official Account.', href: '/line-business-messaging' },
  { icon: <IconMail />, title: 'Email API', desc: 'Transactional and bulk email, combined with SMS in one API.', href: '/email-api' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'Every channel, one account', desc: 'No separate vendor per channel — SMS, WhatsApp, RCS and more from one login.' },
  { icon: <IconRefresh />, title: 'Automatic fallback', desc: 'Unreachable customers on one channel are reached on another, automatically.' },
  { icon: <IconChart />, title: 'Unified reporting', desc: 'Delivery, opens and replies across every channel in a single dashboard.' },
  { icon: <IconShield />, title: 'Compliant by default', desc: 'Verification, opt-in handling and sender rules managed for every channel.' },
]

const FAQS = [
  { q: 'How many channels can I use at once?', a: 'As many as you need — most teams run SMS plus two or three chat channels like WhatsApp, RCS or Instagram from the same account.' },
  { q: 'Do all channels share the same inbox?', a: 'Yes, every channel lands in one shared inbox with one customer record, so agents and bots never work from a blank screen.' },
  { q: 'Can I combine channels in one campaign?', a: 'Yes — send a broadcast that tries RCS first and falls back to SMS, or run WhatsApp and email side by side for the same audience.' },
  { q: 'Which channel should I start with?', a: 'Most businesses start with bulk SMS or WhatsApp, then add other channels as they need reach in more places customers already are.' },
]

function Channels() {
  return (
    <>
      <Seo
        title="Business Messaging Channels & APIs"
        description="Reach customers on SMS, WhatsApp, RCS, Viber, Email and more from one platform. Explore every SMSLocal messaging channel and API."
        keywords={['business messaging channels', 'omnichannel messaging platform', 'multichannel messaging API', 'communication channels', 'CPaaS platform']}
      />

      <Hero
        eyebrow="Channels"
        title="Every messaging channel your customers use, in one platform"
        subtitle="SMS, WhatsApp, RCS, Instagram, Messenger, Viber, Telegram, Apple Messages, LINE and email — one account, one inbox, one customer record."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
      />

      <EcosystemGrid
        title={<>Pick a channel, or run all of them</>}
        subtitle="Every channel below shares the same inbox, reporting and customer record."
        items={CHANNELS}
        alt
      />

      <WhyUs title={<>Why run every channel through SMSLocal</>} items={WHY_US} />

      <FAQ title={<>Channels — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Find the right channel mix for your business"
        subtitle="Tell us who you're trying to reach — we'll suggest a starting point."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default Channels
