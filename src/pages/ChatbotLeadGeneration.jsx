import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconUsers, IconCalendar, IconLink, IconChart, IconClock, IconBrain, IconGlobe, IconShield } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconUsers />, title: 'Visitor qualification', desc: 'Ask the right questions to separate real buyers from browsers.' },
  { icon: <IconCalendar />, title: 'Meeting booking', desc: 'Let qualified leads book a slot directly inside the chat.' },
  { icon: <IconLink />, title: 'CRM sync', desc: 'Push every qualified lead straight into your CRM automatically.' },
  { icon: <IconBrain />, title: 'AI follow-up', desc: 'Answer objections and follow-up questions without a rep online.' },
]

const STEPS = [
  { title: 'Design your qualification flow', desc: 'Set the questions that separate a real lead from a browser.' },
  { title: 'Connect your calendar & CRM', desc: 'Let qualified leads book directly and sync to your pipeline.' },
  { title: 'Deploy across channels', desc: 'Run the same flow on your website, WhatsApp and social.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Higher lead quality', desc: 'Qualification questions filter out browsers before they hit your CRM.' },
  { icon: <IconClock />, title: 'Captures leads 24/7', desc: 'No lead lost overnight or over a weekend.' },
  { icon: <IconGlobe />, title: 'Works everywhere', desc: 'Same flow on your website, WhatsApp and social channels.' },
  { icon: <IconShield />, title: 'Clean handoff to sales', desc: 'Qualified leads reach your team with full context attached.' },
]

const FAQS = [
  { q: 'How does a lead generation chatbot qualify visitors?', a: 'It asks a defined set of questions to filter for budget, intent or fit, before routing qualified leads to your team or CRM.' },
  { q: 'Can leads book a meeting directly?', a: 'Yes, qualified leads can book a slot on your calendar directly inside the conversation.' },
  { q: 'Does it sync with our CRM?', a: 'Yes, qualified leads and their answers push automatically into your connected CRM.' },
  { q: 'Can the same bot run on our website and WhatsApp?', a: 'Yes, one flow can be deployed across your website, WhatsApp and social channels.' },
]

function ChatbotLeadGeneration() {
  return (
    <>
      <Seo
        title="Lead Generation Chatbot"
        description="Capture and qualify leads around the clock. A lead generation chatbot that engages visitors, books meetings and syncs to your CRM."
        keywords={['lead qualification chatbot', 'lead capture bot', 'sales chatbot', 'conversational marketing bot']}
      />

      <Hero
        eyebrow="Lead Generation"
        title={<>Qualify leads and book meetings, <span className="grad-word">automatically</span></>}
        subtitle="Engage visitors, filter for real intent, and sync qualified leads straight into your CRM — around the clock, across channels."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents/sales' }}
      />

      <NarrativeCompare
        heading={<>Most website visitors leave before anyone even knows they were interested.</>}
        paragraphs={[
          "A visitor lands on a pricing page, scrolls, and leaves — with no form filled out, no chat started, and no way for your team to know they were ever there.",
          'By the time a generic contact form does get submitted, most of the context — what they were looking at, what they actually need — is already lost.',
          <>A lead-gen chatbot catches that moment instead — <strong>asking the right questions while interest is still there</strong>, not after it's gone.</>,
        ]}
        leftLabel="Static contact form"
        leftItems={[
          'Only captures visitors who fill it out',
          'No context on what they were actually looking at',
          'Same generic form for every visitor',
          'Manual follow-up, whenever someone gets to it',
        ]}
        rightLabel="Lead-gen chatbot, engaged in real time"
        rightItems={[
          'Engages visitors while they\'re still browsing',
          'Qualifying questions tailored to intent',
          'Books a meeting directly, no back-and-forth',
          'Syncs straight to your CRM, instantly',
        ]}
        alt
      />

      <FeatureGrid title={<>Built to qualify leads</>} items={FEATURES} />

      <HowItWorks title={<>Start capturing leads in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why sales teams use our lead bot</>} items={WHY_US} />

      <CTABanner
        title="Start qualifying leads today"
        subtitle="Connect your calendar and CRM, and go live in minutes."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>Lead generation chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotLeadGeneration
