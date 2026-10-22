import Seo from '../components/Seo.jsx'
import PageSchema from '../components/PageSchema.jsx'
import { InLink, OutLink } from '../components/BodyLinks.jsx'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import VoiceCallHero from '../components/VoiceCallHero.jsx'
import { VoiceLedger, VoiceCaps, VoiceFlows, VoiceStairs, VoiceGauges } from '../components/VoiceApiSections.jsx'

// Each use case restates a capability or an FAQ answer already on this page.
const FLOWS = [
  { title: 'A support line', desc: 'Greet callers, route them by skill, time or region, and record the conversation for quality.', steps: ['Caller dials', 'IVR menu', 'Queue by skill', 'Agent, recorded'] },
  { title: 'Click-to-call from your CRM', desc: 'Place a call with one click from the tools your team already uses.', steps: ['Click in your CRM', 'Call is placed', 'Customer answers', 'Transcript saved'] },
  { title: 'Private two-party calls', desc: 'Connect two people through a temporary proxy number so their personal digits stay private.', steps: ['Person A', 'Proxy number', 'Person B'] },
  { title: 'Calls from your own app', desc: 'Place and receive calls from code, with a webhook fired for every call event.', steps: ['Your app calls the API', 'Call is placed', 'Webhook per event'] },
]

const ROWS = [
  { topic: 'Setup', old: 'On-site hardware and PRI lines to maintain', now: 'Cloud numbers you provision in minutes' },
  { topic: 'Channels', old: 'Voice siloed from every other channel', now: 'Voice beside SMS, WhatsApp and RCS' },
  { topic: 'Routing', old: 'Fixed extensions and manual transfers', now: 'Skill, time and region routing with failover' },
  { topic: 'Insight', old: 'Insight limited to what the phone bill shows', now: 'Live connect rates, wait times and recordings' },
]

const CAPABILITIES = [
  {
    key: 'api',
    name: 'Programmable voice API',
    desc: 'Place and receive calls straight from your app with a REST Voice API and a webhook fired for every call event, from ringing to hangup.',
    specs: ['REST API for calls', 'Webhook per call event', 'Inbound & outbound'],
  },
  {
    key: 'ivr',
    name: 'IVR & auto-attendant',
    desc: 'Build multi-level menus that greet callers and send them down the right path — no code, no telecom expertise required.',
    specs: ['Multi-level menus', 'Visual builder, no code', 'Greet & route callers'],
  },
  {
    key: 'routing',
    name: 'Routing, queues & failover',
    desc: 'Route by skill, time of day or region, with queues, overflow and instant failover, so a call never drops into dead silence when the first destination is busy.',
    specs: ['Skill / time / region routing', 'Queues & overflow', 'Instant failover'],
  },
  {
    key: 'recording',
    name: 'Recording & transcripts',
    desc: 'Record calls for quality and compliance, with searchable transcripts attached to every conversation and stored recording.',
    specs: ['Call recording', 'Searchable transcripts', 'Quality & compliance'],
  },
  {
    key: 'masking',
    name: 'Number masking',
    desc: 'Connect two people through a temporary proxy number so their personal digits stay private on both sides of the call, right up until it ends.',
    specs: ['Proxy numbers', 'Private on both sides', 'Two-party connect'],
  },
  {
    key: 'sip',
    name: 'Global numbers & SIP',
    desc: 'Provision local, toll-free and mobile phone numbers in 60+ countries, or bring your own carrier over SIP trunking and keep the numbers you already have.',
    specs: ['60+ countries', 'Local / toll-free / mobile', 'SIP trunking & BYOC'],
  },
]

const STEPS = [
  { title: 'Get a voice number', desc: 'Pick a local, toll-free or mobile number in 60+ countries — or port the one you already use.' },
  { title: 'Build your IVR flow', desc: 'Assemble greetings, menus and routing rules in a visual builder, then test the whole path in the browser.' },
  { title: 'Connect agents or SIP', desc: 'Point calls to your team, contact centre or existing PBX over SIP, with overflow and failover built in.' },
  { title: 'Go live & track calls', desc: 'Publish, take live calls, and watch connect rates, wait times, recordings and transcripts in one dashboard.' },
]

const WHY_US = [
  { figure: '99.95', unit: '%', heading: 'Carrier-grade reliability', desc: 'The uptime target we design and route for across redundant tier-1 voice carriers.', fill: 99 },
  { figure: '<50', unit: 'ms', heading: 'Fast call setup', desc: 'Built for sub-50 ms setup so conversations begin the instant someone answers.', fill: 86 },
  { figure: '1', unit: 'platform', heading: 'One unified platform', desc: 'Voice, SMS, WhatsApp and RCS share one API, one dashboard and one invoice.', fill: 100 },
  { figure: '60+', unit: 'countries', heading: 'Global coverage', desc: 'Countries where you can provision numbers and place outbound calls today.', fill: 80 },
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
      <PageSchema name={'Cloud Voice Calling'} description={'Programmable voice with IVR, smart routing, click-to-call and global numbers on one platform.'} faqs={FAQS} />

      <VoiceCallHero
        eyebrow="Voice"
        title={<><span className="grad-word">Cloud voice calling</span>, on the platform that already runs your messages</>}
        subtitle="Programmable inbound and outbound calls, IVR menus, smart routing and recording — with global numbers and a Voice API, right beside your SMS, WhatsApp and RCS."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />

      <VoiceLedger
        eyebrow="The shift"
        title="Your calls shouldn’t live on an island away from your messages."
        text="Cloud voice moves calling into software and onto the same platform as your messaging, so a call, an SMS and a WhatsApp reply are all part of one conversation you can route, record and measure."
        leftLabel="Legacy PBX / call center"
        rightLabel="SMSLocal Voice"
        rows={ROWS}
      />

      <VoiceCaps
        eyebrow="Capabilities"
        title="Everything you need to run voice in the cloud"
        subtitle="A full telephony stack — numbers, menus, routing, recording and an API. Open a capability to see what it does."
        items={CAPABILITIES}
      />

      <VoiceFlows
        eyebrow="Where it fits"
        title="How teams use cloud voice"
        subtitle={<>The same building blocks, put together four different ways, with <InLink to="/products/channels/did/">virtual numbers</InLink> on every flow.</>}
        items={FLOWS}
      />

      <VoiceStairs
        eyebrow="How it works"
        title="From number to live calls in four steps"
        subtitle={<>Pick a number, build the flow, connect your agents (or your <OutLink href="https://www.rfc-editor.org/rfc/rfc3261">SIP</OutLink> trunk), and go live.</>}
        steps={STEPS}
      />

      <VoiceGauges
        eyebrow="Why us"
        title="Why teams move their calls to SMSLocal"
        subtitle={<>Reliable connectivity, one <InLink to="/products/cpaas/">CPaaS platform</InLink> for every channel, and reach across the map.</>}
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
