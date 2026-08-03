import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMegaphone, IconCode, IconShield, IconChat, IconBolt, IconMail, IconGlobe, IconRefresh, IconChart, IconPhone, IconUsers } from '../components/icons.jsx'
import ChannelsHubHero from '../components/ChannelsHubHero.jsx'
import ChannelCatalog from '../components/ChannelCatalog.jsx'

const GROUPS = [
  {
    label: 'SMS & broadcasting',
    items: [
      { icon: <IconMegaphone />, title: 'Bulk SMS', desc: 'High-deliverability SMS at scale for marketing, alerts and OTP.', href: '/bulk-sms/' },
      { icon: <IconCode />, title: 'SMS API', desc: 'Programmable SMS for developers — REST API with delivery webhooks.', href: '/sms-api/' },
      { icon: <IconShield />, title: 'OTP & verification', desc: 'Fast, reliable one-time passcodes for signups and logins.', href: '/otp-sms/' },
      { icon: <IconMegaphone />, title: 'WhatsApp broadcasting', desc: 'One broadcast to your whole opted-in list, each in a personal 1:1 thread.', href: '/products/channels/whatsapp-broadcasting/' },
      { icon: <IconBolt />, title: 'RCS broadcasting', desc: 'Branded, verified rich messages at scale — with automatic SMS fallback.', href: '/products/channels/rcs-broadcasting/' },
    ],
  },
  {
    label: 'Chat & social apps',
    items: [
      { icon: <IconChat />, title: 'WhatsApp Business API', desc: 'Official, verified WhatsApp with broadcasts and two-way chat.', href: '/products/channels/whatsapp/' },
      { icon: <IconGlobe />, title: 'Instagram DM API', desc: 'Automate and manage Instagram DMs for support and sales.', href: '/products/social-and-apps/instagram/' },
      { icon: <IconChat />, title: 'Facebook Messenger', desc: 'Persistent menu, quick replies and AI for your Facebook Page.', href: '/products/social-and-apps/messenger/' },
      { icon: <IconPhone />, title: 'Viber Business', desc: 'Verified broadcasts and two-way chat, plus Viber voice calls.', href: '/products/social-and-apps/viber/' },
      { icon: <IconChat />, title: 'Telegram for Business', desc: 'Bots, buttons and broadcasts on Telegram, fully hosted for you.', href: '/products/social-and-apps/telegram/' },
      { icon: <IconChat />, title: 'Apple Messages', desc: 'Native iMessage chat with list pickers and Apple Pay.', href: '/products/social-and-apps/apple-messages/' },
      { icon: <IconChat />, title: 'LINE Business', desc: 'Flex messages, rich menu and loyalty for your LINE account.', href: '/products/social-and-apps/line/' },
      { icon: <IconBolt />, title: 'KakaoTalk Business', desc: 'AlimTalk notices and FriendTalk broadcasts on a verified Kakao Channel.', href: '/products/social-and-apps/kakaotalk/' },
      { icon: <IconUsers />, title: 'Social media inbox', desc: 'Every social DM and comment in one shared team inbox.', href: '/products/social-and-apps/' },
    ],
  },
  {
    label: 'Voice, numbers & email',
    items: [
      { icon: <IconPhone />, title: 'Voice calling', desc: 'Cloud voice — IVR, routing, recording and a programmable API.', href: '/products/channels/voice/' },
      { icon: <IconGlobe />, title: 'Virtual numbers (DID)', desc: 'Local, toll-free & mobile numbers in 100+ countries, voice + SMS.', href: '/products/channels/did/' },
      { icon: <IconMail />, title: 'Email API', desc: 'Transactional and bulk email, combined with SMS in one API.', href: '/products/channels/email/' },
    ],
  },
]

const PLATFORM_LAYER = [
  { icon: <IconChat />, title: 'One shared inbox', desc: 'Every channel lands in a single team inbox — no app-switching, nothing missed.' },
  { icon: <IconUsers />, title: 'One customer record', desc: 'Each conversation ties to one profile with full cross-channel history.' },
  { icon: <IconChart />, title: 'Unified reporting', desc: 'Delivery, opens and replies across every channel in one dashboard.' },
  { icon: <IconRefresh />, title: 'Automatic fallback', desc: 'Unreachable on one channel? The same message still lands on another.' },
  { icon: <IconCode />, title: 'One API & one bill', desc: 'Reach every channel from a single API, wallet and monthly invoice.' },
  { icon: <IconShield />, title: 'Compliant by default', desc: 'Verification, opt-in handling and sender rules managed on every channel.' },
]

const TESTIMONIALS = [
  { quote: 'We started with SMS, added WhatsApp, then RCS — all from one account. No new vendor, no new login, and one inbox for the lot.', name: 'Anaya Sharma', role: 'Head of CRM, Retail' },
  { quote: 'Voice and messaging on one platform meant a single API to learn and a single bill to reconcile. It quietly removed a whole category of work.', name: 'Lucas Meyer', role: 'CTO, Logistics' },
  { quote: 'When a channel can’t reach someone, the fallback just handles it. We stopped thinking about device support entirely.', name: 'Grace Okoro', role: 'Lifecycle Marketing Lead' },
]

const FAQS = [
  { q: 'How many channels can I use at once?', a: 'As many as you need — most teams run SMS plus two or three chat channels like WhatsApp, RCS or Instagram, and add voice or virtual numbers from the same account.' },
  { q: 'Do all channels share the same inbox?', a: 'Yes. Every channel lands in one shared inbox with one customer record, so agents and bots never work from a blank screen or lose context.' },
  { q: 'Can I combine channels in one campaign?', a: 'Yes — send a broadcast that tries RCS first and falls back to SMS, or run WhatsApp and email side by side for the same audience.' },
  { q: 'Is it one bill and one API for everything?', a: 'It is. Every channel is reachable through a single API and billed from one wallet, so there is no separate vendor or invoice per channel.' },
  { q: 'Which channel should I start with?', a: 'Most businesses start with bulk SMS or WhatsApp, then add other channels as they need reach in more of the places customers already are.' },
]

function Channels() {
  return (
    <>
      <Seo
        title="Business Messaging Channels & APIs List"
        description="Reach customers on SMS, WhatsApp, RCS, Voice, Instagram and email from one platform — one inbox, one customer record, one API. Explore every channel."
        keywords={['business messaging channels', 'omnichannel messaging platform', 'multichannel messaging API', 'communication channels', 'CPaaS platform']}
      />

      <Hero
        eyebrow="Channels"
        title={<>Every messaging channel your customers use, in <span className="grad-word">one platform</span></>}
        subtitle="SMS, WhatsApp, RCS, Voice, Instagram, Messenger, Viber, Telegram, Apple Messages, LINE, KakaoTalk, email and virtual numbers — one account, one inbox, one customer record."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        stats={[
          { value: '12+', label: 'Channels' },
          { value: '1', label: 'Shared inbox' },
          { value: '100+', label: 'Countries' },
          { value: '1', label: 'API & bill' },
        ]}
        visual={<ChannelsHubHero />}
      />

      <NarrativeCompare
        variant="columns"
        eyebrow="Why one platform"
        heading={<>A vendor per channel is a silo per channel.</>}
        paragraphs={[
          'Add a tool for WhatsApp, another for SMS, a third for social, and each one arrives with its own login, its own inbox and its own blind spots — and none of them know the customer already messaged you somewhere else.',
          <>SMSLocal runs every channel on <strong>one platform</strong> — so a broadcast, a reply and a call are all part of one conversation, with one record and one bill behind them.</>,
        ]}
        leftLabel="A vendor per channel"
        leftItems={[
          'A separate login and inbox for each channel',
          'Customer context scattered across tools',
          'A different API and bill every time',
          'No fallback when a channel can’t reach someone',
        ]}
        rightLabel="One SMSLocal platform"
        rightItems={[
          'Every channel in one shared inbox',
          'One customer record, full history',
          'One API, one wallet, one invoice',
          'Automatic fallback across channels',
        ]}
        alt
      />

      <ChannelCatalog
        eyebrow="Explore channels"
        title={<>Pick a channel, or run all of them</>}
        subtitle="Every channel below shares the same inbox, reporting and customer record."
        groups={GROUPS}
      />

      <FeatureGrid
        variant="panel"
        eyebrow="One platform underneath"
        title={<>What every channel shares</>}
        subtitle="Whichever channels you switch on, they all sit on the same unified layer."
        items={PLATFORM_LAYER}
        alt
      />

      <Testimonials title={<>Teams running every channel from one place</>} items={TESTIMONIALS} />

      <CTABanner
        title="Find the right channel mix for your business"
        subtitle="Tell us who you're trying to reach — we'll suggest a starting point across the channels that fit."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Channels — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default Channels
