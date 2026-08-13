import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import VoiceChannelHero from '../components/VoiceChannelHero.jsx'
import VoiceShift from '../components/VoiceShift.jsx'
import VoiceCapabilityExplorer from '../components/VoiceCapabilityExplorer.jsx'
import StepsKeypad from '../components/StepsKeypad.jsx'
import WhyUsStatBars from '../components/WhyUsStatBars.jsx'

const STEPS = [
  { title: 'Get a voice number', desc: 'Pick a local, toll-free or mobile number in 60+ countries — or port the one you already use.' },
  { title: 'Build your IVR flow', desc: 'Assemble greetings, menus and routing rules in a visual builder, then test the whole path in the browser.' },
  { title: 'Connect agents or SIP', desc: 'Point calls to your team, contact centre or existing PBX over SIP, with overflow and failover built in.' },
  { title: 'Go live & track calls', desc: 'Publish, take live calls, and watch connect rates, wait times, recordings and transcripts in one dashboard.' },
]

const WHY_US = [
  { figure: '99.95%', unit: '', heading: 'Carrier-grade reliability', desc: 'The uptime target we design and route for across redundant tier-1 voice carriers.', fill: 99 },
  { figure: '<50', unit: 'ms', heading: 'Fast call setup', desc: 'Built for sub-50 ms setup so conversations begin the instant someone answers.', fill: 86 },
  { figure: '1', unit: '', heading: 'One unified platform', desc: 'Voice, SMS, WhatsApp and RCS share one API, one dashboard and one invoice.', fill: 100 },
  { figure: '60+', unit: '', heading: 'Global coverage', desc: 'Countries where you can provision numbers and place outbound calls today.', fill: 80 },
]

const FAQS = [
  { q: 'What is cloud voice calling?', a: 'Cloud voice runs your business calling over the internet instead of physical phone lines. You provision numbers, build IVR menus and route calls entirely in software — nothing to rack, wire or maintain on site.' },
  { q: 'How is this different from the AI Voice Agent?', a: 'This is the voice channel — the programmable telephony layer: numbers, IVR, routing, recording and the Voice API. The AI Voice Agent is an autonomous agent that answers and holds conversations on top of this channel. You can run the channel with human agents, the AI agent, or both.' },
  { q: 'Can I keep my existing phone numbers?', a: 'Yes. You can port existing numbers in, provision new local, toll-free or mobile numbers in 60+ countries, or connect your own carrier over SIP trunking.' },
  { q: 'Do you support both inbound and outbound calls?', a: 'Both. Handle inbound calls with IVR menus, queues and routing, and place outbound calls programmatically through the Voice API or with one-click click-to-call from your CRM.' },
  { q: 'Are calls recorded and transcribed?', a: 'You can record calls for quality and compliance and generate searchable transcripts, with controls to manage caller consent and how long recordings are retained.' },
]

function VoiceChannel() {
  return (
    <>
      <Seo
        title="Cloud Voice Calling"
        description="Programmable voice with IVR, smart routing, click-to-call and global numbers on one platform."
        keywords={['cloud voice calling', 'voice API', 'programmable voice', 'IVR', 'call routing', 'click to call', 'call recording', 'SIP trunking', 'business phone numbers']}
      />

      <Hero
        eyebrow="Voice"
        title={<><span className="grad-word">Cloud voice calling</span>, on the platform that already runs your messages</>}
        subtitle="Programmable inbound and outbound calls, IVR menus, smart routing and recording — with global numbers and a Voice API, right beside your SMS, WhatsApp and RCS."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<VoiceChannelHero />}
      />

      <VoiceShift
        eyebrow="The shift"
        heading={<>Your calls shouldn&apos;t live on an island away from your messages.</>}
        paragraphs={[
          'Cloud voice moves calling into software and onto the same platform as your messaging, so a call, an SMS and a WhatsApp reply are all part of one conversation you can route, record and measure.',
        ]}
        leftLabel="Legacy PBX / call center"
        leftItems={[
          'On-site hardware and PRI lines to maintain',
          'Voice siloed from every other channel',
          'Fixed extensions and manual transfers',
          'Insight limited to what the phone bill shows',
        ]}
        rightLabel="SMSLocal Voice"
        rightItems={[
          'Cloud numbers you provision in minutes',
          'Voice beside SMS, WhatsApp and RCS',
          'Skill, time and region routing with failover',
          'Live connect rates, wait times and recordings',
        ]}
        alt
      />

      <VoiceCapabilityExplorer />

      <StepsKeypad
        eyebrow="How it works"
        title={<>From number to live calls in four steps</>}
        subtitle="Dial it in: pick a number, build the flow, connect your agents, and go live."
        steps={STEPS}
        alt
      />

      <WhyUsStatBars
        eyebrow="Why us"
        title={<>Why teams move their calls to SMSLocal</>}
        subtitle="Reliable connectivity, one platform for every channel, and reach across the map."
        items={WHY_US}
      />

      <CTABanner
        title="Bring your calls onto one platform"
        subtitle="Programmable voice, IVR and global numbers — beside the messaging you already send."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Cloud voice calling — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default VoiceChannel
