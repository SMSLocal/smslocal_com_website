import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ChannelDirectory from '../components/ChannelDirectory.jsx'
import CapabilityNumerals from '../components/CapabilityNumerals.jsx'
import GovernanceControls from '../components/GovernanceControls.jsx'
import WhyUsCompass from '../components/WhyUsCompass.jsx'
import {
  IconChat, IconMic, IconMail, IconMegaphone, IconBolt, IconGlobe, IconLink,
  IconRefresh, IconChart, IconShield, IconReceipt, IconBrain, IconClock, IconCheck,
  IconPhone, IconRobot,
} from '../components/icons.jsx'
import OmniInboxMock from '../components/OmniInboxMock.jsx'

const CAPABILITIES = [
  { icon: <IconBrain />, title: 'One memory across channels', desc: 'The agent remembers the whole customer, so a chat that starts on WhatsApp and moves to email never loses the thread — or asks them to repeat themselves.' },
  { icon: <IconCheck />, title: 'Resolves, not just replies', desc: 'It completes multi-step tasks and closes the conversation on whichever channel it happens — not a canned reply that opens another ticket.' },
  { icon: <IconLink />, title: 'Takes real action', desc: 'Checks orders, issues refunds, updates records and raises tickets — the same real actions, on every channel your customers use.' },
  { icon: <IconRefresh />, title: 'Clean human handoff', desc: 'When a person is needed, the agent hands off in the same thread with the full cross-channel context and intent already summarized.' },
]

const CHANNELS = [
  { icon: <IconChat />, title: 'WhatsApp', desc: 'Resolves two-way conversations on the verified WhatsApp Business API.', href: '/whatsapp-business-api' },
  { icon: <IconMegaphone />, title: 'SMS', desc: 'Two-way text that reaches every phone, no app required.', href: '/bulk-sms' },
  { icon: <IconBolt />, title: 'RCS', desc: 'Rich cards and buttons on Android, with SMS fallback.', href: '/rcs-business-messaging' },
  { icon: <IconPhone />, title: 'Viber', desc: 'Reaches Viber users directly, from the same agent.', href: '/viber-business-messages' },
  { icon: <IconRobot />, title: 'Telegram', desc: 'Automated Telegram conversations, resolved by the agent.', href: '/telegram-business' },
  { icon: <IconGlobe />, title: 'Instagram', desc: 'Handles Instagram DMs and comments beside every channel.', href: '/instagram-messaging-api' },
  { icon: <IconLink />, title: 'Messenger', desc: 'Facebook Messenger DMs continue the same conversation.', href: '/facebook-messenger-api' },
  { icon: <IconShield />, title: 'Apple Messages', desc: 'Native iMessage business chat, handled by the agent.', href: '/apple-messages-for-business' },
  { icon: <IconChat />, title: 'LINE', desc: 'Messages LINE users at scale, from the same agent.', href: '/line-business-messaging' },
  { icon: <IconMail />, title: 'Email', desc: 'Triages, drafts and sends email replies from the same agent.', href: '/email-api' },
]

const CONTROLS = [
  { icon: <IconShield />, title: 'Scoped guardrails', desc: 'Roles decide exactly what the agent can access and do on each channel.' },
  { icon: <IconRefresh />, title: 'Smart routing', desc: 'Routes each conversation to the right skill or human, by channel and load.' },
  { icon: <IconClock />, title: 'SLA & escalation', desc: 'Honors response-time targets and escalates to a human before a breach.' },
  { icon: <IconChart />, title: 'CSAT & analytics', desc: 'Satisfaction and resolution scored on every conversation, across every channel.' },
  { icon: <IconMic />, title: 'Voice included', desc: 'Calls and callbacks are handled by the same agent, not a separate phone system.' },
  { icon: <IconReceipt />, title: 'Audit logs', desc: 'Every action and handoff logged and exportable — who, what, when and why.' },
]

const WHY_US = [
  { icon: <IconBrain />, title: 'One brain, every channel', desc: 'Not a separate bot per channel — the same reasoning and knowledge answers everywhere.' },
  { icon: <IconLink />, title: 'One record, no silos', desc: 'A broadcast reply, a phone call and a web chat are one conversation on one profile.' },
  { icon: <IconCheck />, title: 'Acts, not just talks', desc: 'The agent connects to your tools and resolves the request, not just describes the policy.' },
  { icon: <IconGlobe />, title: 'Nothing to sync', desc: 'One platform for the agent, your numbers and broadcasting — no integrations to maintain.' },
]

const FAQS = [
  { q: 'What is an omnichannel AI agent?', a: 'A single AI agent that resolves conversations across WhatsApp, RCS, SMS, voice, email, Instagram and Messenger — with one shared memory and real actions — rather than a separate bot bolted onto each channel.' },
  { q: 'How is it different from a bot on each channel?', a: 'A per-channel bot has no shared memory, so a customer who switches channels starts over. The omnichannel agent remembers the whole customer and continues the same conversation wherever it moves.' },
  { q: 'Does context follow the customer across channels?', a: 'Yes. A campaign reply, a phone call and a web chat all attach to the same customer record, so nobody has to ask the customer to repeat themselves.' },
  { q: 'Can it take real actions, not just reply?', a: 'Yes. Connected to your order system, CRM or helpdesk, the agent checks records, issues refunds and completes tasks — the same actions on every channel.' },
  { q: 'What happens when it hands off to a human?', a: 'The teammate picks up the same thread with the full cross-channel history and the intent already summarized, so nothing is lost and the customer stays in flow.' },
]

function AiAgentsOmnichannel() {
  return (
    <>
      <Seo
        title="Omnichannel AI Agent"
        description="One AI agent across every channel — WhatsApp, RCS, SMS, voice, email, Instagram and Messenger. Shared memory, real actions and clean human handoff, everywhere."
        keywords={['omnichannel AI agent', 'omnichannel agent', 'cross-channel AI agent', 'one agent every channel']}
      />

      <Hero
        eyebrow="AI Agents"
        title="One AI agent, every channel"
        subtitle="The same agent resolves conversations on WhatsApp, RCS, SMS, voice, email, Instagram and Messenger — with one memory, one customer record, and real actions taken wherever the message arrives."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<OmniInboxMock />}
      />

      <NarrativeCompare
        variant="statement"
        alt
        eyebrow="The problem"
        heading={<>Most "omnichannel" is just the same bot copy-pasted onto more channels.</>}
        paragraphs={[
          'Adding a bot to WhatsApp, then another to your website, then a third to Instagram doesn\'t make you omnichannel — it makes three disconnected bots, each with no memory of what happened anywhere else.',
          'So the moment a customer switches channels, they start over: they re-explain the order, repeat the question and wait while a bot that has never seen them tries to catch up. The channel changed, but the experience got worse.',
          <>An omnichannel agent is <strong>one agent with one memory</strong> — it recognizes the customer, continues the same conversation, and takes real action no matter which channel the message arrives on.</>,
        ]}
        leftLabel=""
        leftItems={[]}
        rightLabel=""
        rightItems={[]}
      />

      <CapabilityNumerals
        eyebrow="What the agent does"
        title={<>One agent that follows the customer everywhere</>}
        subtitle="Not a consolidated view of bots — a single agent with shared memory, real actions and clean handoff on every channel."
        items={CAPABILITIES}
      />

      <ChannelDirectory
        eyebrow="Channels"
        title={<>Every channel, one agent</>}
        subtitle="Wherever your customers message, the same agent replies — same context, same memory, same actions."
        items={CHANNELS}
        alt
      />

      <GovernanceControls
        eyebrow="Built-in controls"
        title={<>Autonomy you can actually govern</>}
        subtitle="The agent works inside the guardrails your team already relies on — across every channel."
        items={CONTROLS}
      />

      <WhyUsCompass
        eyebrow="Why SMSLocal"
        title={<>One agent — not a bot bolted onto every channel</>}
        items={WHY_US}
        alt
      />

      <FAQ title={<>Omnichannel agent — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="One agent, every channel your customers use"
        subtitle="Connect your channels and let a single agent resolve, act and hand off — with one memory across every conversation."
        cta={{ label: 'Get Started', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsOmnichannel
