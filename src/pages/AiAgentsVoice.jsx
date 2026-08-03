import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import OneAgentCore from '../components/OneAgentCore.jsx'
import IndustryChips from '../components/IndustryChips.jsx'
import {
  IconCart, IconDollar, IconCalendar, IconBook, IconBriefcase, IconShield, IconPackage, IconGlobe,
} from '../components/icons.jsx'
import VoiceAgentMock from '../components/VoiceAgentMock.jsx'
import UnifiedInboxTimeline from '../components/UnifiedInboxTimeline.jsx'
import VoiceCapabilitiesConsole from '../components/VoiceCapabilitiesConsole.jsx'
import ImmersivePhoneSection from '../components/ImmersivePhoneSection.jsx'

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
        title="Voice AI Agent for Phone Conversations Today"
        description="A voice AI agent that holds a natural phone conversation, resolves repetitive calls on its own, and hands off the rest with a full transcript."
        keywords={['AI voice agent', 'AI phone agent', 'voicebot', 'conversational voice AI', 'voice AI for customer service']}
      />

      <Hero
        eyebrow="Voice AI"
        title={<>An AI voice agent that actually <span className="grad-word">holds a conversation</span></>}
        subtitle="Natural, two-way phone conversations that resolve repetitive calls on the spot, and route the rest to a human — with the transcript, summary and sentiment already attached."
        primaryCta={{ label: 'Deploy a Voice Agent', href: '/contact-us/' }}
        secondaryCta={{ label: 'See AI Agents', href: '/products/ai-agents/' }}
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

      <section className="section">
        <div className="container">
          <ImmersivePhoneSection
            eyebrow="See it live"
            title="A voice agent that never puts a caller on hold."
            subtitle="Every call answered instantly, transcribed live, and handed off to a human the moment it should be — synced to your CRM automatically."
            stats={[
              { value: '<0.4s', label: 'Pickup time' },
              { value: '24/7', label: 'Always on' },
              { value: '3+', label: 'Languages' },
              { value: '0', label: 'Missed calls' },
            ]}
            bullets={[
              'Answers every call instantly — never rings busy',
              'Speaks the caller’s language automatically',
              'Transcribes, summarizes and logs every call',
              'Escalates to a human with full context attached',
            ]}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="section-kicker">Capabilities</span>
          <h2 className="section-title">What the voice agent actually does</h2>
          <p className="section-subtitle">Not an IVR with a new voice — an agent that reasons over the call, resolves what it can, and hands off cleanly.</p>
          <VoiceCapabilitiesConsole />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-kicker">Unified inbox</span>
          <h2 className="section-title">Calls sit beside every other conversation</h2>
          <p className="section-subtitle">Voice, WhatsApp, SMS and email land in the same inbox, on the same customer record.</p>
          <UnifiedInboxTimeline />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="section-kicker">Why voice runs on the same AI</span>
          <h2 className="section-title">One agent — not a separate voicebot to manage</h2>
          <OneAgentCore />
        </div>
      </section>

      <IndustryChips
        eyebrow="Industries"
        title={<>Built for the calls your industry actually gets</>}
        subtitle="The same voice agent, tuned to the questions and guardrails each industry's calls need."
        items={INDUSTRIES}
      />

      <CTABanner
        title="Put a voice agent on your phone lines"
        subtitle="Connect your number and go live in days, not months."
        cta={{ label: 'Deploy a Voice Agent', href: '/contact-us/' }}
        variant="spotlight"
      />

      <FAQ title={<>Voice AI agent — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsVoice
