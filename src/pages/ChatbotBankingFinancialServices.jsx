import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconDollar, IconShield, IconBell, IconUsers, IconClock, IconChart, IconRefresh, IconGlobe } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconDollar />, title: 'Balance & transaction alerts', desc: 'Answer balance and recent-transaction questions instantly.' },
  { icon: <IconShield />, title: 'KYC assistance', desc: 'Guide customers through verification steps without a branch visit.' },
  { icon: <IconBell />, title: 'Fraud & security alerts', desc: 'Send and confirm security notifications through the same chat.' },
  { icon: <IconUsers />, title: 'Support automation', desc: 'Deflect routine account questions before they reach an agent.' },
]

const STEPS = [
  { title: 'Connect your core systems', desc: 'Integrate securely with your banking or insurance platform.' },
  { title: 'Design compliant flows', desc: 'Build KYC, balance and support flows with your compliance rules.' },
  { title: 'Go live across channels', desc: 'Deploy to WhatsApp, web and SMS from one bot.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Lower support volume', desc: 'Routine account questions get resolved without an agent.' },
  { icon: <IconClock />, title: 'Available 24/7', desc: 'Balance checks and alerts work outside branch hours.' },
  { icon: <IconRefresh />, title: 'Consistent, compliant answers', desc: 'The bot follows your defined compliance rules every time.' },
  { icon: <IconGlobe />, title: 'Multichannel coverage', desc: 'WhatsApp, web and SMS, from the same secure flow.' },
]

const FAQS = [
  { q: 'Is this chatbot secure enough for banking?', a: 'Yes, it\'s designed for privacy-conscious workflows and integrates with your core banking or insurance systems under your compliance rules.' },
  { q: 'Can it help with KYC verification?', a: 'Yes, it can guide customers through KYC steps conversationally, reducing branch visits.' },
  { q: 'Can it send fraud or security alerts?', a: 'Yes, security notifications can be sent and confirmed through the same chat channel customers already use.' },
  { q: 'Does it work for insurance as well as banking?', a: 'Yes, the same platform covers banking, fintech and insurance use cases.' },
]

function ChatbotBankingFinancialServices() {
  return (
    <>
      <Seo
        title="Banking & Finance Chatbot"
        description="Deliver secure self-service with a banking chatbot — balances, alerts, KYC help and support automation across trusted channels."
        keywords={['financial services chatbot', 'fintech chatbot', 'banking virtual assistant', 'insurance chatbot']}
      />

      <Hero
        eyebrow="Banking & Finance"
        title="Secure self-service for banking and finance"
        subtitle="Balance checks, security alerts, KYC assistance and support automation — built for compliance, across WhatsApp, web and SMS."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
      />

      <NarrativeCompare
        heading={<>A branch visit for a balance question is a branch visit that shouldn't happen.</>}
        paragraphs={[
          "Most routine banking questions — a balance, a recent transaction, a KYC document status — still route to a call center queue or a branch visit, even though none of them need a human decision.",
          "That load stacks up fast: agents spend the day on lookups instead of the exceptions that actually need judgment, and customers wait on hold for something that could be instant.",
          <>Self-service should handle the routine cases directly — <strong>securely, under your compliance rules</strong> — and hand off to a person only when it genuinely needs one.</>,
        ]}
        leftLabel="Call center or branch visit"
        leftItems={[
          'Balance checks wait in a call queue',
          'KYC steps require an in-person visit',
          'Security alerts sent with no way to confirm in-chat',
          'Agents spend time on routine lookups',
        ]}
        rightLabel="Banking chatbot, compliant self-service"
        rightItems={[
          'Balance and transaction answers, instantly',
          'KYC guidance handled conversationally',
          'Fraud alerts sent and confirmed in the same chat',
          'Agents freed up for what actually needs judgment',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for financial services</>} items={FEATURES} />

      <HowItWorks title={<>Go live securely in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why financial teams automate with SMSLocal</>} items={WHY_US} />

      <FAQ title={<>Banking chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Automate account support securely"
        subtitle="Connect your core systems and go live under your compliance rules."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotBankingFinancialServices
