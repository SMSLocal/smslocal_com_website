import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemAnnotatedInbox from '../components/ProblemAnnotatedInbox.jsx'
import CopilotDraftDemo from '../components/CopilotDraftDemo.jsx'
import CopilotAheadHero from '../components/CopilotAheadHero.jsx'
import WhatsappStepsFlow from '../components/WhatsappStepsFlow.jsx'
import WhyItWorksScorecard from '../components/WhyItWorksScorecard.jsx'
import { IconPencil, IconBook, IconBolt, IconChat } from '../components/icons.jsx'

const STEPS = [
  { title: 'Connect your knowledge base', desc: 'Point the copilot at your help centre, docs and past resolved conversations.' },
  { title: 'It learns your inbox', desc: 'The copilot starts drafting from real conversation history and policy content.' },
  { title: 'Go live for your team', desc: 'Drafts and summaries appear inside the shared inbox your agents already use.' },
  { title: 'Agents stay in control', desc: 'Every reply is reviewed and sent by a human — the copilot only removes the searching.' },
]

const FEATURES = [
  { icon: <IconPencil />, title: 'Drafts the reply for you', desc: 'Suggests a ready-to-send response inside the reply box, grounded in the conversation and your knowledge base — edit or send with one click.' },
  { icon: <IconBook />, title: 'Surfaces knowledge-grounded answers', desc: 'Pulls the right policy, article or past resolution while your agent is still reading the message, so nobody has to switch tabs to find it.' },
  { icon: <IconBolt />, title: 'Summarises long threads instantly', desc: 'A ten-message thread becomes a two-line summary the moment an agent opens it, so context takes seconds, not minutes.' },
  { icon: <IconChat />, title: 'Works inside the inbox your team already uses', desc: 'Lives directly in the shared omnichannel inbox — no separate tool, no copy-pasting between windows.' },
]

const FAQS = [
  { q: 'Does the copilot send replies automatically?', a: 'No — it drafts the reply and surfaces the answer, but a human agent reviews and sends it. For fully autonomous resolution, see our AI customer service agent instead.' },
  { q: 'What does it use to ground its suggestions?', a: 'Your help centre, past resolved conversations and any documents you connect, so drafts reflect your actual policies rather than a generic answer.' },
  { q: 'Does it work across every channel in the inbox?', a: 'Yes — it drafts and summarises inside the same shared inbox that handles WhatsApp, SMS, email, voice and social, so agents get the same support regardless of channel.' },
  { q: 'Can it summarise a conversation that started days ago?', a: 'Yes, it summarises the full thread history the moment an agent opens it, however long the conversation has run.' },
  { q: 'How is this different from the AI customer service agent?', a: 'The copilot assists a human agent who stays in control of every reply. The AI customer service agent can resolve conversations autonomously, only escalating when it should.' },
]

function ProductsAgentCopilot() {
  return (
    <>
      <Seo
        title="AI Agent Copilot for Support & Sales Replies"
        description="Speed up every reply with an AI agent copilot that drafts responses, summarises long threads and surfaces knowledge-grounded answers in the reply box."
        keywords={['AI agent copilot', 'AI reply assistant', 'support copilot', 'AI drafted replies']}
      />

      <Hero
        eyebrow="Platform"
        title={<>An AI copilot that drafts the reply <span className="grad-word">before you finish reading</span></>}
        subtitle="Speed up every conversation with an AI agent copilot that drafts responses, summarises long threads and surfaces knowledge-grounded answers — right inside the reply box your team already uses."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'Omnichannel Inbox', href: '/products/inbox-and-analytics/omnichannel-inbox/' }}
        visual={<CopilotAheadHero />}
      />

      <ProblemAnnotatedInbox
        eyebrow="The problem"
        heading={<>Every reply starts with the same search: "what did we say last time?"</>}
        paragraphs={['The searching isn\'t the job — the reply is. The copilot removes the searching.']}
      />

      <CopilotDraftDemo
        eyebrow="See it work"
        title="Watch it draft a real reply, live"
        subtitle="Pick any incoming message. The copilot reads the thread, pulls from your knowledge base, and writes the reply — your agent still reviews and sends."
      />

      <WhatsappStepsFlow
        eyebrow="How it works"
        title="Live inside your inbox in four steps"
        subtitle="From connecting your knowledge base to drafts appearing in the reply box."
        steps={STEPS}
        alt
      />

      <WhyItWorksScorecard
        eyebrow="Why it works"
        title="Faster replies, without losing the human in the loop"
        subtitle="Agents stay in control of every send — the copilot just removes the time spent searching."
      />

      <CTABanner
        title="Give every agent a copilot"
        subtitle="Drafted replies, instant summaries and grounded answers — live inside your shared inbox in days."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title="AI agent copilot — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default ProductsAgentCopilot
