import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhyUsSpine from '../components/WhyUsSpine.jsx'
import IndustryChips from '../components/IndustryChips.jsx'
import {
  IconMic, IconRefresh, IconChart, IconPhone, IconGlobe, IconBrain, IconLink, IconUsers,
  IconCart, IconDollar, IconCalendar, IconBook, IconBriefcase, IconShield, IconPackage,
} from '../components/icons.jsx'
import VoiceAgentMock from '../components/VoiceAgentMock.jsx'
import VoiceOmniInboxMock from '../components/VoiceOmniInboxMock.jsx'

const FEATURES = [
  { icon: <IconMic />, title: 'Natural, two-way conversation', desc: 'Real speech in, real speech out — no menu tree, no "press 1 for sales". Interruptions and pauses don\'t break it.' },
  { icon: <IconRefresh />, title: 'Understands the actual ask', desc: 'Listens for what the caller needs and resolves it directly, instead of routing by keypad choice.' },
  { icon: <IconChart />, title: 'Transcript & sentiment, every call', desc: 'Every call is transcribed, summarized and scored automatically — searchable from your dashboard.' },
  { icon: <IconRefresh />, title: 'Escalates the moment it should', desc: 'Detects a direct request for a human or rising frustration, and hands off before the caller has to ask twice.' },
  { icon: <IconPhone />, title: 'Sits in front of your existing line', desc: 'Layer it over your current IVR and number, or let it replace the queue outright.' },
  { icon: <IconGlobe />, title: 'Speaks the caller\'s language', desc: 'Hindi, English and more — the agent replies in the language the caller opened with.' },
]

const WHY_US = [
  { icon: <IconBrain />, title: 'One agent, every channel', desc: 'The same reasoning that resolves a WhatsApp chat also answers the phone — no separate voicebot to manage.' },
  { icon: <IconLink />, title: 'Shared data & guardrails', desc: 'Voice agents work from the same connected apps and roles as your chat and email agents.' },
  { icon: <IconMic />, title: 'Built for real speech', desc: 'Background noise, cross-talk and trailing off mid-sentence are handled, not just clean scripted audio.' },
  { icon: <IconUsers />, title: 'A warm handoff, not a transfer', desc: 'The human who picks up gets the full transcript and summary — never a cold "please hold" call.' },
]

const INDUSTRIES = [
  { icon: <IconCart />, title: 'Ecommerce & retail', desc: 'Order status, delivery updates and return calls, resolved without a ticket.' },
  { icon: <IconDollar />, title: 'Banking & fintech', desc: 'Balance checks and card queries handled inside compliant, logged conversations.' },
  { icon: <IconCalendar />, title: 'Healthcare', desc: 'Appointment booking, reminders and front-desk FAQs, answered around the clock.' },
  { icon: <IconBook />, title: 'Education', desc: 'Admissions queries and fee questions answered the moment a parent calls.' },
  { icon: <IconBriefcase />, title: 'Real estate', desc: 'Site-visit scheduling and listing questions handled the instant a lead calls in.' },
  { icon: <IconGlobe />, title: 'Travel & hospitality', desc: 'Booking status and itinerary questions resolved without a hold queue.' },
  { icon: <IconShield />, title: 'Insurance', desc: 'Policy and claim-status questions answered, with sensitive calls routed correctly.' },
  { icon: <IconPackage />, title: 'Logistics', desc: 'Shipment tracking and delivery-window calls resolved without reaching a dispatcher.' },
]

const FAQS = [
  { q: 'What languages does the voice agent support?', a: 'Hindi, English and several other major Indian languages, with more added over time — it replies in the language the caller opens the conversation in.' },
  { q: 'How does it decide when to bring in a human?', a: 'It escalates the moment a caller directly asks for a person, or when it detects rising frustration — and hands off with the full transcript and summary already attached, not a cold transfer.' },
  { q: 'Are calls recorded and logged?', a: 'Yes. Every call is transcribed, summarized and scored for sentiment automatically, and searchable from your dashboard.' },
  { q: 'Can it replace our existing IVR?', a: 'Yes — it can sit in front of your existing phone queue or replace it entirely, resolving repetitive requests before they ever reach an agent.' },
  { q: 'Which industries is it built for?', a: 'Ecommerce, banking, healthcare, education, real estate, travel, insurance and logistics teams all run it today — the guardrails and knowledge are tuned to what each industry\'s calls actually need.' },
]

function AiAgentsVoice() {
  return (
    <>
      <Seo
        title="Voice AI Agent for Calls"
        description="A voice AI agent that holds a natural phone conversation, resolves repetitive calls on its own, and hands off the rest to a human with a full transcript attached."
        keywords={['AI voice agent', 'AI phone agent', 'voicebot', 'conversational voice AI', 'voice AI for customer service']}
      />

      <Hero
        eyebrow="Voice AI"
        title="An AI voice agent that actually holds a conversation"
        subtitle="Natural, two-way phone conversations that resolve repetitive calls on the spot, and route the rest to a human — with the transcript, summary and sentiment already attached."
        primaryCta={{ label: 'Deploy a Voice Agent', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<VoiceAgentMock />}
      />

      <NarrativeCompare
        variant="paths"
        eyebrow="The problem"
        heading={<>A phone tree makes callers work to reach a person who asks the same three questions anyway.</>}
        paragraphs={[
          'Most calls repeat the same handful of requests. A voice agent that actually converses resolves those on the spot, and hands off the rest with the context already gathered.',
        ]}
        leftLabel="Phone tree, unassisted"
        leftItems={[
          'Menu options before reaching anyone',
          'Same repetitive questions on every call',
          'Agents spend time on issues a bot could resolve',
          'Transfers land with zero context',
        ]}
        rightLabel="Voice AI agent"
        rightItems={[
          'Natural conversation from the first word',
          'Resolves repetitive requests on its own',
          'Escalates complex calls with context gathered',
          'Transcript and summary attached automatically',
        ]}
      />

      <FeatureGrid
        eyebrow="Capabilities"
        title={<>What the voice agent actually does</>}
        subtitle="Not an IVR with a new voice — an agent that reasons over the call, resolves what it can, and hands off cleanly."
        items={FEATURES}
        variant="inline"
        alt
      />

      <section className="section">
        <div className="container">
          <span className="section-kicker">Unified inbox</span>
          <h2 className="section-title">Calls sit beside every other conversation</h2>
          <p className="section-subtitle">Voice, WhatsApp, SMS and email land in the same inbox, on the same customer record.</p>
          <VoiceOmniInboxMock />
        </div>
      </section>

      <WhyUsSpine eyebrow="Why voice runs on the same AI" title={<>One agent — not a separate voicebot to manage</>} items={WHY_US} alt />

      <IndustryChips
        eyebrow="Industries"
        title={<>Built for the calls your industry actually gets</>}
        subtitle="The same voice agent, tuned to the questions and guardrails each industry's calls need."
        items={INDUSTRIES}
      />

      <FAQ title={<>Voice AI agent — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Put a voice agent on your phone lines"
        subtitle="Connect your number and go live in days, not months."
        cta={{ label: 'Deploy a Voice Agent', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsVoice
