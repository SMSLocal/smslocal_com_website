import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconRefresh, IconBolt, IconShield, IconChart } from '../components/icons.jsx'
import RcsBroadcastHero from '../components/RcsBroadcastHero.jsx'
import RcsCapabilityConsole from '../components/RcsCapabilityConsole.jsx'
import RcsBroadcastUseCases from '../components/RcsBroadcastUseCases.jsx'
import StepsCardDeal from '../components/StepsCardDeal.jsx'
import WhyUsTabs from '../components/WhyUsTabs.jsx'

const STEPS = [
  { title: 'Get RCS-verified', desc: 'We submit your brand to Google for RCS verification — name, logo and sender ID approved for you.' },
  { title: 'Design the rich card', desc: 'Build cards, carousels and quick replies from templates or drop in your own brand assets.' },
  { title: 'Set the SMS fallback', desc: 'Choose the plain-text SMS that lands automatically on any device without RCS support.' },
  { title: 'Schedule the broadcast', desc: 'Pick your segment, set the send time, and launch to the whole list at full throughput.' },
]

const WHY_US = [
  {
    icon: <IconBolt />,
    title: 'Higher engagement',
    desc: 'Branded, media-rich messages with tappable buttons stand out in the inbox far more than a plain grey text — and they turn a broadcast into a two-way conversation.',
    points: [
      'Verified brand identity earns the open',
      'Suggested replies and buttons drive the tap',
      'Carousels showcase more than a single link ever could',
    ],
  },
  {
    icon: <IconRefresh />,
    title: 'Built-in SMS fallback',
    desc: 'You broadcast once. Every recipient whose device cannot receive RCS is served the same campaign as a plain SMS automatically — you never manage two sends or lose reach.',
    points: [
      'Fallback decided per recipient at send time',
      'No separate SMS campaign to build or trigger',
      'Full reach across every Android and non-RCS device',
    ],
  },
  {
    icon: <IconShield />,
    title: 'We run Google verification',
    desc: 'Getting a brand verified for RCS can feel like a black box. We handle the whole submission — name, logo and sender — and shepherd it through to approval.',
    points: [
      'End-to-end brand submission handled for you',
      'Guidance on assets and sender requirements',
      'Live sooner, without the back-and-forth',
    ],
  },
  {
    icon: <IconChart />,
    title: 'Unified RCS + SMS reporting',
    desc: 'One dashboard shows how the whole broadcast performed — RCS and its SMS fallback together — so you measure true reach, not two disconnected numbers.',
    points: [
      'Delivered, read and fallback rates in one view',
      'See exactly what share dropped to SMS',
      'Compare campaigns and segments over time',
    ],
  },
]

const FAQS = [
  { q: 'What is RCS broadcasting?', a: 'RCS broadcasting is sending a single rich, verified message — cards, carousels, media and buttons — to a large audience of Android recipients at once, with automatic SMS fallback for anyone whose device does not support RCS.' },
  { q: 'What happens to recipients who cannot receive RCS?', a: 'The decision is made per recipient at send time. Anyone whose device or carrier lacks RCS is served the same campaign as a standard SMS automatically, so a broadcast reaches your whole list without you managing two sends.' },
  { q: 'Do I need to be Google-verified to broadcast RCS?', a: 'Yes — brands must be verified with Google to send branded RCS. We run the full verification process for you, from submitting your name and logo through to sender approval.' },
  { q: 'Can I segment and schedule broadcasts?', a: 'Yes. You can target specific segments of your audience and schedule each broadcast to the minute, including across time zones, then launch to the whole segment at high throughput.' },
  { q: 'How do I measure results across RCS and SMS?', a: 'One unified report shows delivered, read and fallback numbers for RCS and its SMS fallback together, so you can see true reach and how much of a broadcast dropped to SMS.' },
]

function RcsBroadcasting() {
  return (
    <>
      <Seo
        title="RCS Broadcasting at Scale"
        description="Broadcast verified, branded RCS rich messages to your whole Android audience at scale — with automatic per-recipient SMS fallback so no one is missed."
        keywords={['RCS broadcasting', 'RCS broadcast', 'bulk RCS', 'RCS campaigns', 'RCS with SMS fallback', 'branded RCS messaging at scale']}
      />

      <Hero
        eyebrow="RCS broadcasting"
        title={<>Broadcast branded RCS to your whole audience — <span className="grad-word">at scale</span></>}
        subtitle="Send verified, rich RCS campaigns to every Android inbox with automatic per-recipient SMS fallback, so your message reaches everyone."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<RcsBroadcastHero />}
      />

      <RcsCapabilityConsole
        eyebrow="Capabilities"
        title={<>Everything a broadcast needs, built in</>}
        subtitle="Rich messaging, a real safety net and reporting that treats RCS and SMS as one campaign."
      />

      <RcsBroadcastUseCases />

      <StepsCardDeal
        eyebrow="How it works"
        title={<>From verified brand to live broadcast</>}
        subtitle="Four steps to put a branded RCS campaign — with its fallback — in front of your whole list."
        steps={STEPS}
        alt
      />

      <WhyUsTabs
        eyebrow="Why us"
        title={<>Why brands broadcast RCS with us</>}
        subtitle="Pick a reason to see how it plays out for your campaigns."
        items={WHY_US}
      />

      <CTABanner
        title="Broadcast branded RCS to everyone"
        subtitle="Verified sender, rich campaigns and automatic SMS fallback — reach your whole list without leaving anyone behind."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>RCS broadcasting — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default RcsBroadcasting
