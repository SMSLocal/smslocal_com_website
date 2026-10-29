import {
  IconBolt, IconGlobe, IconShield, IconChart, IconLink, IconPhone, IconChat, IconRobot, IconBrain,
  IconCheck, IconRefresh, IconSearch, IconCalendar, IconUsers, IconGear, IconPackage, IconRocket,
  IconPlug, IconCart, IconClock, IconMail, IconBell, IconMegaphone, IconCode, IconDollar, IconReceipt,
  IconCursor, IconBook, IconInfo, IconBriefcase, IconPencil,
} from '../components/icons.jsx'
import CpaasHubVisual from '../components/CpaasHubVisual.jsx'

/**
 * Page definitions for the CPaaS, Developers, Use-case and Platform pages.
 * Rendered by src/components/CpaasPage.jsx. Copy here only restates what the
 * rest of the site already says (REST + Token auth, callbacks, DLT/TRAI rules,
 * SOC 2 / GDPR / HIPAA); it carries no prices, SLAs or uptime figures.
 */

const f = (icon, title, desc, href) => ({ icon, title, desc, ...(href ? { href } : {}) })
const s = (title, desc) => ({ title, desc })
const faq = (q, a) => ({ q, a })
const g = (text) => <span className="grad-word">{text}</span>

const START = { label: 'Start free', href: '/signup/' }
const TALK = { label: 'Talk to sales', href: '/contact-us/' }
const DOCS = { label: 'Read the docs', href: '/resources/docs/' }
const PRICING = { label: 'See pricing', href: '/pricing/' }

/* ───────────────────────────── Products: CPaaS & APIs ───────────────────────────── */

export const CPAAS_HUB = {
  seo: {
    title: 'CPaaS Platform — Messaging, Voice & Email APIs',
    description: 'One communications platform (CPaaS) for SMS, WhatsApp, RCS, voice and email, through a single API, one account and one wallet.',
    keywords: ['CPaaS platform', 'communications platform as a service', 'messaging API', 'SMS API', 'WhatsApp API', 'omnichannel messaging'],
  },
  hero: {
    eyebrow: 'CPaaS',
    title: <>Every channel, <>{g('one communications platform')}</></>,
    subtitle: 'One API, one account and one wallet behind every message you send. Build it into your product, or run campaigns and AI agents on top.',
    primaryCta: START,
    secondaryCta: TALK,
    visual: <CpaasHubVisual />,
  },
  features: {
    eyebrow: 'The platform',
    title: <>Build once, <>{g('reach customers anywhere')}</></>,
    subtitle: 'The same account, credentials and reporting across every channel you switch on.',
    items: [
      f(<IconCode />, 'One REST API', 'Authenticate once with a Token header and send on any channel with the same request shape.'),
      f(<IconChat />, 'Every channel', 'SMS, WhatsApp Business API, RCS, voice and email, plus social channels and web chat.'),
      f(<IconRefresh />, 'Fallback built in', 'When a message cannot reach someone on one channel, retry on another instead of losing it.'),
      f(<IconChart />, 'One set of reports', 'Delivery, engagement and conversion for all channels in a single dashboard.'),
      f(<IconPlug />, 'Webhooks, not polling', 'Delivery reports and inbound replies are pushed to your callback URL as they happen.'),
      f(<IconShield />, 'Compliance handled', 'DLT registration and sender approvals are part of onboarding, not an afterthought.'),
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>From signup to your first message in <>{g('three steps')}</></>,
    steps: [
      s('Create an account', 'Sign up, get your access key and pick the channels you want to switch on.'),
      s('Send through the API', 'POST a sender, recipient and content. You get a message ID back immediately.'),
      s('Track every message', 'Receive status reports and replies on your callback URL, and watch them in the dashboard.'),
    ],
  },
  related: {
    eyebrow: 'Explore the APIs',
    title: <>Pick the building block you need</>,
    items: [
      f(<IconBolt />, 'SMS API', 'Send, track and receive SMS over a plain REST API.', '/products/cpaas/sms-api/'),
      f(<IconShield />, 'Verify API', 'One-time passcodes and verification for sign-ups and logins.', '/products/cpaas/verify-api/'),
      f(<IconSearch />, 'Number Lookup API', 'Find the carrier behind a phone number before you send.', '/products/cpaas/lookup-api/'),
      f(<IconChat />, 'WhatsApp Business API', 'Official WhatsApp messaging with templates and a team inbox.', '/products/channels/whatsapp/'),
      f(<IconPhone />, 'Voice API', 'Calls, IVR, routing and recording from the same account.', '/products/channels/voice/'),
      f(<IconMail />, 'Email API', 'Transactional and bulk email over REST or SMTP.', '/products/channels/email/'),
    ],
  },
  cta: { title: 'Build on one platform instead of five', subtitle: 'Start free, then talk to us when you are ready to scale.', cta: START, secondaryCta: TALK },
  faqs: {
    title: <>CPaaS — frequently asked questions</>,
    items: [
      faq('What is CPaaS?', 'CPaaS stands for communications platform as a service: messaging, voice and email delivered as APIs and ready-made tools, so you do not have to build carrier connections yourself.'),
      faq('Which channels can I use?', 'SMS, WhatsApp Business API, RCS, voice and email, plus Instagram, Messenger and web chat. You switch on the ones you need.'),
      faq('Do I need separate accounts for each channel?', 'No. One account, one set of credentials and one wallet cover every channel.'),
      faq('Can I use the API and the dashboard together?', 'Yes. Engineers can integrate through the API while marketing and support teams run campaigns and conversations from the dashboard.'),
    ],
  },
}

export const SMS_API = {
  seo: {
    title: 'SMS API — Send, Track and Receive SMS',
    description: 'A plain REST SMS API with Token authentication, instant message IDs and real-time delivery reports to your callback URL.',
    keywords: ['SMS API', 'bulk SMS API', 'send SMS API', 'transactional SMS API', 'SMS gateway API'],
  },
  hero: {
    eyebrow: 'SMS API',
    title: <>A plain REST API for {g('sending SMS')}</>,
    subtitle: 'POST your sender, recipient and content with a Token header. Get a message ID straight back, and delivery reports pushed to your server.',
    primaryCta: START,
    secondaryCta: DOCS,
  },
  features: {
    eyebrow: 'Built for developers',
    title: <>Nothing exotic <>{g('to learn')}</></>,
    items: [
      f(<IconCode />, 'Token authentication', 'Send your access key in a Token header on every request, with JSON in and JSON out.'),
      f(<IconBolt />, 'Instant response', 'Every send returns a msgid and an errorcode immediately, so you know it was accepted.'),
      f(<IconPlug />, 'Delivery reports', 'A status report is posted to your callback URL the moment a message reaches its final state.'),
      f(<IconRefresh />, 'Inbound replies', 'Replies arrive on the same callback, tagged as mobile originated, in the same message shape.'),
    ],
  },
  code: {
    eyebrow: 'Send your first SMS',
    title: <>One request, <>{g('one message')}</></>,
    subtitle: 'Authenticate with your access key, POST the message, and read the msgid from the response.',
    label: 'cURL · POST /external/sms',
    lines: [
      'curl -X POST https://secure.smslocal.com/api/service/enterprise-service/external/sms \\',
      '  -H "Token: $SMSLOCAL_TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{",
      '    "from": "SMSLOCAL",',
      '    "to": "14155550123",',
      '    "content": "Your code is 481920."',
      "  }'",
      '',
      '# → { "msgid": "9f2a7c10", "errorcode": 0 }',
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>Authenticate, send, <>{g('track')}</></>,
    steps: [
      s('Authenticate', 'Pass your access key as a Token header, with Content-Type: application/json.'),
      s('Send', 'POST a from, to and content. The response returns a msgid and an errorcode.'),
      s('Track', 'We POST or GET a status report to your callback URL when the message is delivered or fails.'),
    ],
  },
  related: {
    eyebrow: 'Keep building',
    title: <>More for your integration</>,
    items: [
      f(<IconBook />, 'Developer docs', 'The full API reference and examples.', '/resources/docs/'),
      f(<IconPlug />, 'Webhooks', 'How delivery reports and replies reach you.', '/developers/webhooks/'),
      f(<IconShield />, 'Verify API', 'OTP and verification built on the same account.', '/products/cpaas/verify-api/'),
    ],
  },
  cta: { title: 'Send your first SMS in minutes', subtitle: 'Create an account, grab your access key and make your first request.', cta: START, secondaryCta: PRICING },
  faqs: {
    title: <>SMS API — frequently asked questions</>,
    items: [
      faq('How do I authenticate requests?', 'Pass your access key in a Token header on every request, along with Content-Type: application/json.'),
      faq('How do I know a message was delivered?', 'Every send returns a msgid. Point us at a callback URL and we post a status report to it when the message reaches its final state.'),
      faq('What is the character limit per message?', '160 characters on GSM7 encoding, or 70 on Unicode. Longer messages are joined from several parts, each billed separately.'),
      faq('Can I receive replies?', 'Yes. Inbound replies are delivered to the same callback URL and marked as mobile originated.'),
    ],
  },
}

export const VERIFY_API = {
  seo: {
    title: 'Verify API — OTP and Verification Codes',
    description: 'Verify phone numbers and logins with one-time passcodes delivered over SMS, with WhatsApp and voice as other ways to reach the user.',
    keywords: ['OTP API', 'verification API', 'two-factor authentication SMS', 'phone verification API', 'SMS OTP'],
  },
  hero: {
    eyebrow: 'Verify API',
    title: <>One-time passcodes that {g('actually arrive')}</>,
    subtitle: 'Verify sign-ups, logins and payments with a passcode sent to the user’s phone, over the channel most likely to reach them.',
    primaryCta: START,
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'Why it matters',
    title: <>Verification is the message <>{g('users wait for')}</></>,
    items: [
      f(<IconClock />, 'Built for speed', 'Passcodes are time-critical, so verification traffic should never sit behind a marketing blast.'),
      f(<IconChat />, 'More than one way in', 'Reach users by SMS, with WhatsApp or voice available when SMS is not the best route.'),
      f(<IconShield />, 'Fewer fake sign-ups', 'Confirm that a real person controls the number before an account is created.'),
      f(<IconChart />, 'See what happens', 'Track delivery for every passcode so you can spot drop-offs in your sign-up flow.'),
    ],
  },
  steps: {
    eyebrow: 'The flow',
    title: <>How verification <>{g('works')}</></>,
    steps: [
      s('Request a code', 'Your app asks for a passcode for the user’s phone number.'),
      s('Deliver it', 'We send the passcode over SMS, or another channel you enable.'),
      s('Confirm it', 'The user enters the code and your app confirms it matches before continuing.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Works with the rest of the platform</>,
    items: [
      f(<IconBolt />, 'SMS API', 'The delivery layer behind every passcode.', '/products/cpaas/sms-api/'),
      f(<IconSearch />, 'Number Lookup API', 'Check a number before you send a code to it.', '/products/cpaas/lookup-api/'),
      f(<IconShield />, 'OTP & authentication', 'See how teams use verification end to end.', '/solutions/use-case/otp-authentication/'),
    ],
  },
  cta: { title: 'Make verification the easy part', subtitle: 'Talk to us about adding passcode verification to your sign-up flow.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Verify API — frequently asked questions</>,
    items: [
      faq('Which channels can deliver a passcode?', 'SMS is the default. WhatsApp and voice can be added as other ways to reach the user.'),
      faq('Can I use it for login and not only sign-up?', 'Yes. The same flow works for sign-up, login, password reset and confirming a payment.'),
      faq('Do I need DLT registration in India?', 'Yes. SMS to Indian numbers must use approved sender and template registrations, and our team helps you with them.'),
    ],
  },
}

export const LOOKUP_API = {
  seo: {
    title: 'Number Lookup API — Carrier Lookup',
    description: 'Find the carrier behind a phone number before you send. Try the free carrier lookup, then ask us about bulk and automated lookups.',
    keywords: ['number lookup API', 'carrier lookup API', 'phone number lookup', 'carrier lookup', 'mobile carrier checker'],
  },
  hero: {
    eyebrow: 'Number Lookup',
    title: <>Know the carrier {g('before you send')}</>,
    subtitle: 'Identify which carrier a phone number belongs to, so you can route, clean and plan your messaging with confidence.',
    primaryCta: { label: 'Try the free lookup', href: '/tools/carrier-lookup/' },
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'What you can do',
    title: <>Better data, <>{g('better delivery')}</></>,
    items: [
      f(<IconSearch />, 'Identify the carrier', 'Look up the carrier for any phone number.'),
      f(<IconCheck />, 'Clean your lists', 'Spot numbers that look wrong before they cost you a failed send.'),
      f(<IconGlobe />, 'Plan by network', 'Understand which carriers your audience is on before you launch a campaign.'),
      f(<IconPackage />, 'Bulk on request', 'Individual lookups are free; talk to us for high-volume or automated lookups.'),
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>Look up a number in <>{g('seconds')}</></>,
    steps: [
      s('Enter a number', 'Type any phone number into the free lookup, no account needed.'),
      s('Get the carrier', 'See which carrier the number belongs to.'),
      s('Go further', 'Need thousands of lookups or an automated check? Contact the team about bulk options.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Use it with</>,
    items: [
      f(<IconSearch />, 'Free carrier lookup', 'The tool, free and no account needed.', '/tools/carrier-lookup/'),
      f(<IconBolt />, 'SMS API', 'Send once your list is clean.', '/products/cpaas/sms-api/'),
      f(<IconShield />, 'Verify API', 'Confirm the number belongs to a real user.', '/products/cpaas/verify-api/'),
    ],
  },
  cta: { title: 'Need lookups at scale?', subtitle: 'Tell us your volume and we will set up bulk or automated lookups.', cta: TALK, secondaryCta: { label: 'Try the free lookup', href: '/tools/carrier-lookup/' } },
  faqs: {
    title: <>Number Lookup — frequently asked questions</>,
    items: [
      faq('Is the lookup free?', 'Individual lookups on the carrier lookup page are free and need no account. For high-volume or automated lookups, contact the SMSLocal team about bulk options.'),
      faq('Why look up a number before sending?', 'Knowing the carrier helps you clean lists, plan campaigns by network and avoid wasted sends.'),
    ],
  },
}

/* ───────────────────────────── Products: Campaigns & Journeys ───────────────────────────── */

export const CAMPAIGNS_HUB = {
  seo: {
    title: 'Campaigns & Journeys — Multichannel Engagement',
    description: 'Plan, send and measure campaigns across SMS, WhatsApp, RCS and email, and build automated journeys that react to what customers do.',
    keywords: ['multichannel campaigns', 'campaign management', 'customer journeys', 'marketing automation messaging'],
  },
  hero: {
    eyebrow: 'Campaigns & Journeys',
    title: <>Engage customers across {g('every channel')}</>,
    subtitle: 'Run one-off campaigns, trigger automated journeys and bring customers from ad to conversation, all from one workspace.',
    primaryCta: START,
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'What is inside',
    title: <>Everything between the <>{g('ad and the sale')}</></>,
    items: [
      f(<IconMegaphone />, 'Campaign Manager', 'Plan, schedule and send campaigns across SMS, WhatsApp, RCS and email.'),
      f(<IconRefresh />, 'Journey Builder', 'Automate follow-ups that react to delivery, replies and clicks.'),
      f(<IconCursor />, 'Click-to-WhatsApp ads', 'Turn ad clicks into WhatsApp conversations your team or AI can answer.'),
      f(<IconChart />, 'Results in one place', 'Compare delivery, engagement and conversion across every campaign and channel.'),
    ],
  },
  related: {
    eyebrow: 'Explore',
    title: <>Choose where to start</>,
    items: [
      f(<IconMegaphone />, 'Campaign Manager', 'Send to the right audience on the right channel.', '/products/campaigns/campaign-manager/'),
      f(<IconRefresh />, 'Journey Builder', 'Build automated multi-step flows.', '/products/campaigns/journey-builder/'),
      f(<IconCursor />, 'Click-to-WhatsApp ads', 'Connect ads to conversations.', '/products/campaigns/click-to-whatsapp-ads/'),
    ],
  },
  cta: { title: 'Turn messages into measurable outcomes', subtitle: 'See how campaigns and journeys fit your channels.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Campaigns & Journeys — frequently asked questions</>,
    items: [
      faq('Which channels can campaigns run on?', 'SMS, WhatsApp, RCS and email, from the same workspace and the same audience.'),
      faq('Can I automate follow-ups?', 'Yes. Journeys let you trigger the next message based on what a customer does or does not do.'),
    ],
  },
}

export const CAMPAIGN_MANAGER = {
  seo: {
    title: 'Campaign Manager — Plan, Send and Measure',
    description: 'Create, schedule and send campaigns across SMS, WhatsApp, RCS and email, with audiences, templates and reporting in one place.',
    keywords: ['campaign manager', 'bulk messaging campaigns', 'SMS campaign software', 'WhatsApp campaign manager'],
  },
  hero: {
    eyebrow: 'Campaign Manager',
    title: <>Plan it once, {g('send it everywhere')}</>,
    subtitle: 'Build an audience, pick a channel, schedule the send and see the results, without switching tools.',
    primaryCta: START,
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'Features',
    title: <>Campaigns that <>{g('stay organised')}</></>,
    items: [
      f(<IconUsers />, 'Audiences', 'Upload contacts and group them so every message goes to the right people.'),
      f(<IconPackage />, 'Templates', 'Reuse approved templates for SMS and WhatsApp, with personalisation fields.'),
      f(<IconCalendar />, 'Scheduling', 'Send now or schedule for the moment your customers are most likely to respond.'),
      f(<IconChart />, 'Reporting', 'Track delivery, clicks and replies per campaign and per channel.'),
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>Launch a campaign in <>{g('three steps')}</></>,
    steps: [
      s('Choose audience and channel', 'Pick who receives it and whether it goes by SMS, WhatsApp, RCS or email.'),
      s('Write or pick a template', 'Add your content and personalisation, using approved templates where required.'),
      s('Schedule and measure', 'Send, then follow delivery and engagement as it happens.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Pairs well with</>,
    items: [
      f(<IconBolt />, 'Promotions & campaigns', 'The use case: offers, launches and win-backs.', '/solutions/use-case/promotions-campaigns/'),
      f(<IconRefresh />, 'Journey Builder', 'Automate what happens after the send.', '/products/campaigns/journey-builder/'),
      f(<IconChat />, 'WhatsApp Broadcasting', 'One broadcast, thousands of chats.', '/products/channels/whatsapp-broadcasting/'),
      f(<IconBolt />, 'SMS Broadcasting', 'Bulk SMS at scale.', '/products/channels/sms-broadcasting/'),
    ],
  },
  cta: { title: 'Send your next campaign from one place', subtitle: 'Start free or talk to us about your volumes.', cta: START, secondaryCta: TALK },
  faqs: {
    title: <>Campaign Manager — frequently asked questions</>,
    items: [
      faq('Do WhatsApp campaigns need approved templates?', 'Yes. Marketing messages on WhatsApp go out as approved templates, and we guide you through approval.'),
      faq('Can I send the same campaign on more than one channel?', 'Yes. You can run it on one channel or combine channels, for example RCS with an SMS fallback.'),
    ],
  },
}

export const JOURNEY_BUILDER = {
  seo: {
    title: 'Journey Builder — Automated Multichannel Flows',
    description: 'Build automated customer journeys that send the next message based on delivery, replies and clicks, across SMS, WhatsApp, RCS and email.',
    keywords: ['customer journey builder', 'messaging automation', 'drip campaigns SMS', 'conversation flows'],
  },
  hero: {
    eyebrow: 'Journey Builder',
    title: <>Messages that {g('react to your customers')}</>,
    subtitle: 'Design a flow once and let it send the right follow-up, on the right channel, depending on what each customer does.',
    primaryCta: START,
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'Features',
    title: <>Automation without <>{g('writing code')}</></>,
    items: [
      f(<IconGear />, 'Triggers and conditions', 'Start a journey from an event and branch on delivery, replies or clicks.'),
      f(<IconRefresh />, 'Channel fallback', 'If a message is not read or cannot be delivered, try another channel.'),
      f(<IconRobot />, 'AI agents in the flow', 'Hand a conversation to an AI agent, and to a person when it needs one.'),
      f(<IconClock />, 'Timing control', 'Wait, delay and time follow-ups so messages feel helpful, not pushy.'),
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>Build a journey in <>{g('minutes')}</></>,
    steps: [
      s('Pick a trigger', 'Begin from a signup, a purchase, a missed payment or any event you send us.'),
      s('Add steps', 'Send messages, wait, branch and hand off to an AI agent where it helps.'),
      s('Switch it on', 'Publish the journey and watch how customers move through it.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Connect it with</>,
    items: [
      f(<IconBrain />, 'Agent Builder', 'Build the AI agent your journey hands off to.', '/products/ai-agents/agent-builder/'),
      f(<IconMegaphone />, 'Campaign Manager', 'Start with a campaign, then automate the follow-up.', '/products/campaigns/campaign-manager/'),
      f(<IconChart />, 'Analytics & insights', 'Measure how each journey performs.', '/products/inbox-and-analytics/analytics/'),
    ],
  },
  cta: { title: 'Automate the follow-up, not the relationship', subtitle: 'Talk to us about the journeys your team runs by hand today.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Journey Builder — frequently asked questions</>,
    items: [
      faq('How is a journey different from a campaign?', 'A campaign is a one-time send to an audience. A journey is a multi-step flow that reacts to what each customer does over time.'),
      faq('Can a journey use more than one channel?', 'Yes. A single journey can mix SMS, WhatsApp, RCS and email, and fall back between them.'),
    ],
  },
}

export const CTWA_ADS = {
  seo: {
    title: 'Click-to-WhatsApp Ads — Turn Ads into Conversations',
    description: 'Connect Facebook and Instagram ads to WhatsApp so every click starts a conversation your team or AI agent can answer.',
    keywords: ['click to WhatsApp ads', 'CTWA ads', 'WhatsApp ads', 'Facebook ads WhatsApp', 'Instagram ads WhatsApp'],
  },
  hero: {
    eyebrow: 'Click-to-WhatsApp Ads',
    title: <>Turn ad clicks into {g('WhatsApp conversations')}</>,
    subtitle: 'Send people from your Facebook and Instagram ads straight into a WhatsApp chat, answered at once by your team or an AI agent.',
    primaryCta: START,
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'Why it works',
    title: <>Shorter path from <>{g('interest to sale')}</></>,
    items: [
      f(<IconCursor />, 'One tap to chat', 'Skip the landing page and the form: the ad opens a conversation.'),
      f(<IconRobot />, 'Answered instantly', 'An AI agent replies the moment someone writes, day or night.'),
      f(<IconUsers />, 'Handoff to people', 'Pass warm leads to your team inside the shared inbox.'),
      f(<IconChart />, 'Know what converted', 'See which conversations came from which ad and what they led to.'),
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: <>From ad to answer in <>{g('three steps')}</></>,
    steps: [
      s('Run the ad', 'Create a Click-to-WhatsApp ad on Meta that opens a chat with your business number.'),
      s('Reply at once', 'Your AI agent or team answers the first message in the same thread.'),
      s('Follow up', 'Continue the conversation with approved templates and journeys.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Works with</>,
    items: [
      f(<IconChat />, 'WhatsApp Business API', 'The official channel behind the chat.', '/products/channels/whatsapp/'),
      f(<IconRobot />, 'AI Agents', 'Answer ad leads automatically.', '/products/ai-agents/'),
      f(<IconUsers />, 'Omnichannel inbox', 'Where your team picks up the conversation.', '/products/inbox-and-analytics/omnichannel-inbox/'),
    ],
  },
  cta: { title: 'Make every ad click a conversation', subtitle: 'We will help you connect your ads to WhatsApp.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Click-to-WhatsApp Ads — frequently asked questions</>,
    items: [
      faq('Do I need the WhatsApp Business API?', 'Yes. Replying at scale, with AI agents and templates, runs on the WhatsApp Business API.'),
      faq('Can an AI agent handle the first reply?', 'Yes. The agent can answer straight away and pass the conversation to your team when needed.'),
    ],
  },
}

/* ───────────────────────────── Developers ───────────────────────────── */

export const DEV_HUB = {
  seo: {
    title: 'Developers — APIs, Webhooks and Docs',
    description: 'Everything you need to build on SMSLocal: a REST API with Token auth, webhooks for delivery reports and replies, code samples and full docs.',
    keywords: ['SMS API documentation', 'messaging API developers', 'REST API SMS', 'webhooks SMS delivery reports'],
  },
  hero: {
    eyebrow: 'Developers',
    title: <>Build on a messaging API {g('developers like')}</>,
    subtitle: 'A plain REST API, Token authentication, real-time webhooks and clear docs. Send your first message in minutes.',
    primaryCta: { label: 'Open the quickstart', href: '/developers/quickstart/' },
    secondaryCta: DOCS,
  },
  features: {
    eyebrow: 'Start here',
    title: <>Everything to go from <>{g('idea to production')}</></>,
    items: [
      f(<IconRocket />, 'Quickstart', 'Authenticate, send and track your first message in three steps.'),
      f(<IconCode />, 'API reference', 'The endpoints for sending messages and reading delivery status.'),
      f(<IconPackage />, 'SDKs and code samples', 'cURL, Node.js and Python samples, plus the in-app chat SDK for mobile.'),
      f(<IconPlug />, 'Webhooks', 'Delivery reports and inbound replies pushed to your callback URL.'),
    ],
  },
  related: {
    eyebrow: 'Jump in',
    title: <>Pick your starting point</>,
    items: [
      f(<IconRocket />, 'Quickstart', 'Your first message in three steps.', '/developers/quickstart/'),
      f(<IconCode />, 'API reference', 'Endpoints and request formats.', '/developers/api-reference/'),
      f(<IconPackage />, 'SDKs & code samples', 'Copy-paste examples.', '/developers/sdks/'),
      f(<IconPlug />, 'Webhooks', 'Receive events as they happen.', '/developers/webhooks/'),
      f(<IconBook />, 'Developer docs', 'The complete reference.', '/resources/docs/'),
      f(<IconBolt />, 'SMS API', 'The product behind the endpoint.', '/products/cpaas/sms-api/'),
    ],
  },
  cta: { title: 'Ready to build?', subtitle: 'Create an account and get your access key.', cta: START, secondaryCta: DOCS },
  faqs: {
    title: <>Developers — frequently asked questions</>,
    items: [
      faq('How do I authenticate?', 'Pass your access key in a Token header on every request, along with Content-Type: application/json.'),
      faq('How do I get delivery status?', 'Set a callback URL and we post a status report to it when each message reaches its final state.'),
    ],
  },
}

export const DEV_QUICKSTART = {
  seo: {
    title: 'Quickstart — Send Your First SMS',
    description: 'Authenticate, send and track your first SMS through the SMSLocal REST API in three steps.',
    keywords: ['SMS API quickstart', 'send first SMS API', 'SMS API tutorial'],
  },
  hero: {
    eyebrow: 'Quickstart',
    title: <>Send your first message in {g('three steps')}</>,
    subtitle: 'Get your access key, make one request and watch the delivery report arrive.',
    primaryCta: START,
    secondaryCta: DOCS,
  },
  steps: {
    eyebrow: 'The steps',
    title: <>Authenticate, send, <>{g('track')}</></>,
    steps: [
      s('Authenticate', 'Send your access key as a Token header, with Content-Type: application/json, on every request.'),
      s('Send', 'POST a from, to and content. The response returns a msgid and an errorcode straight away.'),
      s('Track', 'We post a status report to your callback URL as soon as the message reaches its final state.'),
    ],
  },
  code: {
    eyebrow: 'Your first request',
    title: <>Copy, paste, <>{g('send')}</></>,
    subtitle: 'Replace the token and the number, then run it.',
    label: 'cURL · send an SMS',
    lines: [
      'curl -X POST https://secure.smslocal.com/api/service/enterprise-service/external/sms \\',
      '  -H "Token: $SMSLOCAL_TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{",
      '    "from": "SMSLOCAL",',
      '    "to": "14155550123",',
      '    "content": "Hello from SMSLocal"',
      "  }'",
    ],
  },
  related: {
    eyebrow: 'Next',
    title: <>Keep going</>,
    items: [
      f(<IconPlug />, 'Webhooks', 'Receive delivery reports and replies.', '/developers/webhooks/'),
      f(<IconCode />, 'API reference', 'All the fields and endpoints.', '/developers/api-reference/'),
      f(<IconBook />, 'Developer docs', 'The full guide.', '/resources/docs/'),
    ],
  },
  cta: { title: 'Get your access key', subtitle: 'Create an account and make your first request.', cta: START, secondaryCta: DOCS },
  faqs: {
    title: <>Quickstart — frequently asked questions</>,
    items: [
      faq('Where do I find my access key?', 'It is available in your account after you sign up.'),
      faq('What does errorcode 0 mean?', 'The message was accepted. Delivery status follows on your callback URL.'),
    ],
  },
}

export const DEV_API_REFERENCE = {
  seo: {
    title: 'API Reference — SMS Endpoints',
    description: 'The SMSLocal REST API: send a message, read its delivery status, and the request and response fields you will use.',
    keywords: ['SMS API reference', 'REST API endpoints SMS', 'SMS delivery report API'],
  },
  hero: {
    eyebrow: 'API reference',
    title: <>Two calls cover {g('most integrations')}</>,
    subtitle: 'POST to send a message, GET to check its status. Same host, same Token header, JSON throughout.',
    primaryCta: DOCS,
    secondaryCta: START,
  },
  features: {
    eyebrow: 'Endpoints',
    title: <>What you can <>{g('call')}</></>,
    items: [
      f(<IconBolt />, 'POST /external/sms', 'Send a message. Body: from, to and content. Returns a msgid and an errorcode.'),
      f(<IconReceipt />, 'GET /report', 'Read the status of a message, for example status=Delivrd for delivered messages.'),
      f(<IconInfo />, 'Direction', 'mt is a message you sent; mo is a reply you received. Both use the same message shape.'),
      f(<IconCode />, 'Encoding and length', '160 characters on GSM7, 70 on Unicode. Longer messages are split and billed per part.'),
    ],
  },
  code: {
    eyebrow: 'Delivery status',
    title: <>Read a message’s <>{g('final state')}</></>,
    subtitle: 'Query by status, or let us push the same report to your callback URL.',
    label: 'GET /report',
    lines: [
      'GET /report?status=Delivrd',
      'Token: $SMSLOCAL_TOKEN',
      '',
      '# → 200 OK',
      '# { msgid: "9f2a7c10", status: "Delivrd" }',
    ],
  },
  related: {
    eyebrow: 'See also',
    title: <>Related guides</>,
    items: [
      f(<IconRocket />, 'Quickstart', 'A guided first request.', '/developers/quickstart/'),
      f(<IconPlug />, 'Webhooks', 'Push instead of poll.', '/developers/webhooks/'),
      f(<IconBook />, 'Developer docs', 'The complete reference.', '/resources/docs/'),
    ],
  },
  cta: { title: 'Start building', subtitle: 'Get your access key and make a request.', cta: START, secondaryCta: DOCS },
  faqs: {
    title: <>API reference — frequently asked questions</>,
    items: [
      faq('Which format do requests and responses use?', 'JSON, with Content-Type: application/json on every request.'),
      faq('How are long messages handled?', 'Past the character limit a message is joined from several parts, and each part is billed separately.'),
    ],
  },
}

export const DEV_SDKS = {
  seo: {
    title: 'SDKs and Code Samples',
    description: 'Copy-paste code samples for sending SMS in cURL, Node.js and Python, plus the in-app chat SDK for iOS and Android.',
    keywords: ['SMS API code samples', 'Node.js SMS API', 'Python SMS API', 'mobile chat SDK'],
  },
  hero: {
    eyebrow: 'SDKs & code samples',
    title: <>Examples in the {g('language you use')}</>,
    subtitle: 'The API is plain REST, so any HTTP client works. Start from a ready sample, or add live chat to your mobile app with the in-app SDK.',
    primaryCta: DOCS,
    secondaryCta: START,
  },
  features: {
    eyebrow: 'What is here',
    title: <>Samples and <>{g('SDKs')}</></>,
    items: [
      f(<IconCode />, 'cURL, Node.js and Python', 'Ready samples that authenticate and send a message.'),
      f(<IconPlug />, 'Any HTTP client', 'There is nothing proprietary to install: send JSON with a Token header.'),
      f(<IconChat />, 'In-app chat SDK', 'Bring the same live chat experience into your iOS and Android apps.'),
      f(<IconBook />, 'Docs for each step', 'The developer docs show every field and response.'),
    ],
  },
  code: {
    eyebrow: 'Node.js',
    title: <>Send from <>{g('Node.js')}</></>,
    subtitle: 'The same request in a few lines of fetch.',
    label: 'Node.js · send an SMS',
    lines: [
      'const res = await fetch(url, {',
      '  method: "POST",',
      '  headers: { Token: token, "Content-Type": "application/json" },',
      '  body: JSON.stringify({',
      '    from: "SMSLOCAL",',
      '    to: "14155550123",',
      '    content: "Your code is 481920.",',
      '  }),',
      '})',
      'const { msgid, errorcode } = await res.json()',
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Keep exploring</>,
    items: [
      f(<IconRocket />, 'Quickstart', 'The three-step guide.', '/developers/quickstart/'),
      f(<IconChat />, 'Web chat', 'The widget and in-app SDK.', '/products/social-and-apps/web-chat/'),
      f(<IconBook />, 'Developer docs', 'Full examples.', '/resources/docs/'),
    ],
  },
  cta: { title: 'Pick a sample and ship', subtitle: 'Get your access key and send your first message.', cta: START, secondaryCta: DOCS },
  faqs: {
    title: <>SDKs — frequently asked questions</>,
    items: [
      faq('Do I need an SDK to use the API?', 'No. It is a REST API, so any HTTP client in any language can call it.'),
      faq('Is there a mobile SDK?', 'An in-app SDK brings live chat into your iOS and Android apps, landing in the same shared inbox as your other channels.'),
    ],
  },
}

export const DEV_WEBHOOKS = {
  seo: {
    title: 'Webhooks — Delivery Reports and Inbound Replies',
    description: 'Set a callback URL and receive delivery reports, failures and inbound replies as they happen, with retries if your endpoint is down.',
    keywords: ['SMS webhooks', 'delivery report webhook', 'SMS callback URL', 'inbound SMS webhook'],
  },
  hero: {
    eyebrow: 'Webhooks',
    title: <>Hear about every message {g('as it happens')}</>,
    subtitle: 'Set a callback URL and every delivery, failure and inbound reply lands there as a GET or POST. No polling.',
    primaryCta: DOCS,
    secondaryCta: START,
  },
  features: {
    eyebrow: 'Events',
    title: <>What we <>{g('send you')}</></>,
    items: [
      f(<IconCheck />, 'Delivered', 'The message reached the handset, with its final status code.'),
      f(<IconBell />, 'Failed', 'The message could not be delivered, with the reason.'),
      f(<IconChat />, 'Inbound replies', 'Replies arrive with direction mo, in the same shape as a sent message.'),
      f(<IconRefresh />, 'Retries', 'If your endpoint does not answer 200 OK, delivery is retried. Nothing is silently dropped.'),
    ],
  },
  code: {
    eyebrow: 'Example events',
    title: <>What lands <>{g('on your server')}</></>,
    subtitle: 'Each event carries the message ID, the status and the direction.',
    label: 'callback events',
    lines: [
      'delivered   msgid 9f2a7c10 · status Delivrd',
      'inbound     reply received · direction mo',
      'failed      msgid 4c81e2   · status Failed',
      '',
      '# Respond with 200 OK to acknowledge each event.',
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>Read next</>,
    items: [
      f(<IconRocket />, 'Quickstart', 'Set up your first callback.', '/developers/quickstart/'),
      f(<IconCode />, 'API reference', 'Message and report fields.', '/developers/api-reference/'),
      f(<IconBook />, 'Developer docs', 'The retry policy and more.', '/resources/docs/'),
    ],
  },
  cta: { title: 'Stop polling, start listening', subtitle: 'Add a callback URL and see events arrive.', cta: START, secondaryCta: DOCS },
  faqs: {
    title: <>Webhooks — frequently asked questions</>,
    items: [
      faq('What if my endpoint is down?', 'Delivery is retried according to the retry policy. Nothing is silently dropped, but an endpoint that never acknowledges keeps receiving retries.'),
      faq('What does direction mean?', 'mt is a message you sent; mo is a reply you received. Both use the same message object shape.'),
    ],
  },
}

/* ───────────────────────────── Solutions: by use case ───────────────────────────── */

const buildUseCasePage = ({ slugTitle, seoTitle, description, keywords, eyebrow, title, subtitle, features, steps, related, ctaTitle, faqs }) => ({
  seo: { title: seoTitle, description, keywords },
  hero: { eyebrow, title, subtitle, primaryCta: START, secondaryCta: TALK },
  features: { eyebrow: 'What teams do', title: <>{slugTitle}</>, items: features },
  steps: { eyebrow: 'How it works', title: <>How it comes together</>, steps },
  related: { eyebrow: 'Built with', title: <>The pieces behind it</>, items: related },
  cta: { title: ctaTitle, subtitle: 'Start free, or tell us what you are building.', cta: START, secondaryCta: TALK },
  faqs: { title: <>{eyebrow} — frequently asked questions</>, items: faqs },
})

export const UC_OTP = buildUseCasePage({
  slugTitle: <>Fast, reliable, <>{g('hard to fake')}</></>,
  seoTitle: 'OTP & Authentication Messaging',
  description: 'Deliver one-time passcodes and login alerts quickly and reliably over SMS, with WhatsApp and voice as other routes.',
  keywords: ['OTP SMS', 'authentication messaging', 'two-factor authentication', 'login verification SMS'],
  eyebrow: 'OTP & Authentication',
  title: <>Passcodes that {g('arrive in time')}</>,
  subtitle: 'Verify sign-ups, logins and payments with a one-time passcode sent to the right channel.',
  features: [
    f(<IconShield />, 'Verify real users', 'Confirm a person controls the number before you create an account.'),
    f(<IconClock />, 'Time-critical delivery', 'Keep passcodes separate from marketing traffic so they are never delayed.'),
    f(<IconChat />, 'More than SMS', 'Add WhatsApp or voice for users who do not receive SMS.'),
    f(<IconChart />, 'See the drop-offs', 'Track delivery and completion to improve your sign-up flow.'),
  ],
  steps: [
    s('Request a code', 'Your app asks for a passcode for the user’s number.'),
    s('Deliver it', 'We send it over SMS, or another channel you enable.'),
    s('Confirm it', 'The user enters the code and your app verifies it.'),
  ],
  related: [
    f(<IconShield />, 'Verify API', 'The building block for passcodes.', '/products/cpaas/verify-api/'),
    f(<IconBolt />, 'SMS API', 'The delivery layer.', '/products/cpaas/sms-api/'),
    f(<IconSearch />, 'Number Lookup', 'Check a number first.', '/products/cpaas/lookup-api/'),
  ],
  ctaTitle: 'Make verification painless',
  faqs: [
    faq('Which channels can carry a passcode?', 'SMS by default, with WhatsApp and voice as other ways to reach the user.'),
    faq('Does this need DLT in India?', 'Yes. SMS to Indian numbers needs approved registrations, and our team helps you complete them.'),
  ],
})

export const UC_TRANSACTIONAL = buildUseCasePage({
  slugTitle: <>The messages customers <>{g('expect to get')}</></>,
  seoTitle: 'Transactional Alerts & Notifications',
  description: 'Send order, shipping, payment and account alerts the moment they happen, over SMS, WhatsApp and RCS.',
  keywords: ['transactional SMS', 'order notifications', 'shipping alerts', 'payment confirmation messages'],
  eyebrow: 'Transactional Alerts',
  title: <>Keep customers {g('informed in real time')}</>,
  subtitle: 'Order updates, delivery alerts, payment confirmations and account notices, sent the moment something happens.',
  features: [
    f(<IconCart />, 'Order and shipping', 'Confirm orders and track deliveries without a customer asking.'),
    f(<IconReceipt />, 'Payments and receipts', 'Confirm payments and send receipts straight away.'),
    f(<IconBell />, 'Account notices', 'Tell customers about changes to their account as they occur.'),
    f(<IconRefresh />, 'Channel fallback', 'If one channel fails, reach them on another.'),
  ],
  steps: [
    s('Trigger from your system', 'Send an API call when an order ships or a payment clears.'),
    s('Choose the channel', 'SMS, WhatsApp or RCS, with a fallback if needed.'),
    s('Track delivery', 'See each alert reach the customer in your reports.'),
  ],
  related: [
    f(<IconBolt />, 'SMS API', 'Send alerts from your backend.', '/products/cpaas/sms-api/'),
    f(<IconChat />, 'WhatsApp Business API', 'Rich, interactive updates.', '/products/channels/whatsapp/'),
    f(<IconPlug />, 'Webhooks', 'Know when each alert is delivered.', '/developers/webhooks/'),
  ],
  ctaTitle: 'Send the update before they ask',
  faqs: [
    faq('Can alerts include buttons or links?', 'On WhatsApp and RCS, yes: alerts can carry buttons and links as well as text.'),
    faq('Do alerts need approved templates?', 'On SMS in India and on WhatsApp, yes. We help you register and get them approved.'),
  ],
})

export const UC_PROMOTIONS = buildUseCasePage({
  slugTitle: <>Promotions people <>{g('actually open')}</></>,
  seoTitle: 'Promotions & Marketing Campaigns',
  description: 'Run offers and marketing campaigns across SMS, WhatsApp and RCS with rich media, buttons and measurable results.',
  keywords: ['SMS marketing', 'WhatsApp marketing campaigns', 'RCS marketing', 'promotional messaging'],
  eyebrow: 'Promotions & Campaigns',
  title: <>Offers that {g('reach and convert')}</>,
  subtitle: 'Launch promotions with banners, coupon codes and buttons, and see exactly what each campaign delivered.',
  features: [
    f(<IconMegaphone />, 'Rich campaigns', 'Banners, buttons and links on WhatsApp and RCS, and clean text on SMS.'),
    f(<IconUsers />, 'Right audience', 'Group contacts so each offer goes to the people it suits.'),
    f(<IconCalendar />, 'Timed sends', 'Schedule around sales, festivals and launches.'),
    f(<IconChart />, 'Measured results', 'Compare delivery, engagement and conversion per channel.'),
  ],
  steps: [
    s('Build the audience', 'Upload and group your contacts.'),
    s('Create the message', 'Pick a template and add your offer.'),
    s('Send and learn', 'Schedule the send and follow results as they arrive.'),
  ],
  related: [
    f(<IconMegaphone />, 'Campaign Manager', 'Plan and send campaigns.', '/products/campaigns/campaign-manager/'),
    f(<IconBolt />, 'RCS Broadcasting', 'Branded rich messages at scale.', '/products/channels/rcs-broadcasting/'),
    f(<IconRefresh />, 'Journey Builder', 'Automate the follow-up.', '/products/campaigns/journey-builder/'),
  ],
  ctaTitle: 'Run your next promotion on every channel',
  faqs: [
    faq('Which channel works best for promotions?', 'It depends on your audience. Many teams combine WhatsApp or RCS for rich offers with SMS as the fallback.'),
    faq('Are there time limits for promotional SMS in India?', 'Yes. Promotional sending is restricted to daytime hours under TRAI rules, and our platform helps you stay within them.'),
  ],
})

export const UC_PAYMENTS = buildUseCasePage({
  slugTitle: <>Get paid <>{g('without chasing')}</></>,
  seoTitle: 'Payment Collection & Reminders',
  description: 'Send payment requests and reminders over WhatsApp, SMS and RCS, with a link customers can pay from in a few taps.',
  keywords: ['payment reminders SMS', 'payment collection WhatsApp', 'payment link messaging', 'EMI reminders'],
  eyebrow: 'Payment Collection',
  title: <>Turn reminders into {g('payments')}</>,
  subtitle: 'Send due-date reminders and payment links where customers actually read them, and follow up automatically.',
  features: [
    f(<IconDollar />, 'Payment links', 'Include a link so customers can pay in a few taps.'),
    f(<IconBell />, 'Timely reminders', 'Remind before the due date and again after, without manual work.'),
    f(<IconChat />, 'Pay in the chat', 'On WhatsApp, customers can see the amount and pay without leaving the conversation.'),
    f(<IconReceipt />, 'Instant receipts', 'Confirm each payment as it lands.'),
  ],
  steps: [
    s('Send the request', 'Share the amount and a payment link on the customer’s preferred channel.'),
    s('Remind automatically', 'A journey nudges anyone who has not paid yet.'),
    s('Confirm', 'Send a receipt as soon as payment is received.'),
  ],
  related: [
    f(<IconChat />, 'WhatsApp Business API', 'Payment requests in chat.', '/products/channels/whatsapp/'),
    f(<IconRefresh />, 'Journey Builder', 'Automate reminders.', '/products/campaigns/journey-builder/'),
    f(<IconBolt />, 'SMS API', 'Reach everyone, with or without data.', '/products/cpaas/sms-api/'),
  ],
  ctaTitle: 'Collect on time, every time',
  faqs: [
    faq('Can customers pay inside WhatsApp?', 'Yes, payment requests can be shared in the WhatsApp conversation so customers can pay without switching apps.'),
    faq('Can reminders stop once someone has paid?', 'Yes. A journey can check for payment before each reminder so paid customers are not nudged.'),
  ],
})

export const UC_COMMERCE = buildUseCasePage({
  slugTitle: <>Selling, <>{g('one chat at a time')}</></>,
  seoTitle: 'Conversational Commerce',
  description: 'Let customers browse, ask questions and buy in a chat on WhatsApp, Instagram and Messenger, with AI agents answering instantly.',
  keywords: ['conversational commerce', 'WhatsApp commerce', 'chat commerce', 'AI sales assistant'],
  eyebrow: 'Conversational Commerce',
  title: <>Turn conversations into {g('orders')}</>,
  subtitle: 'Answer product questions, recommend items and take customers to checkout without leaving the chat.',
  features: [
    f(<IconCart />, 'Browse in chat', 'Share products and offers with rich cards and buttons.'),
    f(<IconRobot />, 'AI that answers', 'Agents reply instantly, any time of day.'),
    f(<IconUsers />, 'Human handoff', 'Pass buying-ready customers to your team.'),
    f(<IconCursor />, 'Ads that open chats', 'Bring ad clicks straight into a conversation.'),
  ],
  steps: [
    s('Meet them in the chat', 'Customers arrive from ads, your site or a message.'),
    s('Answer and recommend', 'An AI agent handles questions and suggests products.'),
    s('Close the sale', 'Send a checkout link, or hand off to your team.'),
  ],
  related: [
    f(<IconCursor />, 'Click-to-WhatsApp ads', 'Ads that open a chat.', '/products/campaigns/click-to-whatsapp-ads/'),
    f(<IconRobot />, 'AI Agents', 'Answer and sell automatically.', '/products/ai-agents/'),
    f(<IconChat />, 'Instagram and Messenger', 'More places to start a chat.', '/products/social-and-apps/'),
  ],
  ctaTitle: 'Sell where your customers already chat',
  faqs: [
    faq('Which channels can I sell on?', 'WhatsApp, Instagram and Messenger, plus web chat on your own site.'),
    faq('Can the AI agent hand off to a person?', 'Yes. Conversations can move to your team inside the shared inbox whenever they need a human.'),
  ],
})

export const UC_APPOINTMENTS = buildUseCasePage({
  slugTitle: <>Fewer no-shows, <>{g('fuller calendars')}</></>,
  seoTitle: 'Appointment Reminders & Booking',
  description: 'Send appointment confirmations and reminders over SMS and WhatsApp, and let customers confirm, reschedule or book in the chat.',
  keywords: ['appointment reminders SMS', 'WhatsApp appointment booking', 'reduce no-shows', 'booking confirmations'],
  eyebrow: 'Appointment Reminders',
  title: <>Keep every appointment {g('on the calendar')}</>,
  subtitle: 'Confirm bookings, remind at the right time and let customers reply to confirm or reschedule.',
  features: [
    f(<IconCalendar />, 'Confirmations', 'Send a confirmation the moment a booking is made.'),
    f(<IconBell />, 'Timely reminders', 'Remind ahead of the appointment on the channel they read.'),
    f(<IconChat />, 'Reply to reschedule', 'Customers can confirm or change a slot by replying.'),
    f(<IconRobot />, 'Booking agent', 'An AI agent can book against live availability.'),
  ],
  steps: [
    s('Confirm at booking', 'Send details as soon as the appointment is made.'),
    s('Remind', 'A reminder goes out before the appointment.'),
    s('Handle changes', 'Replies confirm, reschedule or cancel without a phone call.'),
  ],
  related: [
    f(<IconCalendar />, 'Booking agent', 'Book against live availability.', '/products/ai-agents/booking/'),
    f(<IconBolt />, 'SMS API', 'Reminders by SMS.', '/products/cpaas/sms-api/'),
    f(<IconChat />, 'WhatsApp Business API', 'Two-way reminders.', '/products/channels/whatsapp/'),
  ],
  ctaTitle: 'Fill the calendar, not the waiting room',
  faqs: [
    faq('Can customers reschedule by replying?', 'Yes. Replies on WhatsApp and SMS can confirm, change or cancel an appointment.'),
    faq('Can AI book appointments?', 'Yes. The booking agent can book against live availability.'),
  ],
})

/* ───────────────────────────── Platform ───────────────────────────── */

export const PLATFORM_COMPLIANCE = {
  seo: {
    title: 'Compliance & DLT Registration',
    description: 'How SMSLocal handles DLT registration, sender and template approvals and TRAI rules so your messages are compliant from day one.',
    keywords: ['DLT registration', 'TRAI compliance', 'SMS compliance India', 'sender ID approval', 'DLT template registration'],
  },
  hero: {
    eyebrow: 'Compliance',
    title: <>Compliant from {g('the first message')}</>,
    subtitle: 'India runs the strictest A2P framework of any major market. We guide you through registration so you can focus on the message.',
    primaryCta: TALK,
    secondaryCta: START,
  },
  features: {
    eyebrow: 'What DLT covers',
    title: <>Three things, <>{g('registered separately')}</></>,
    subtitle: 'DLT registration covers entity, header and message template. All three must be approved before you can send.',
    items: [
      f(<IconBriefcase />, 'Entity', 'Your business is registered as the sender of commercial messages.'),
      f(<IconPencil />, 'Header', 'The sender ID your customers see on the message.'),
      f(<IconBook />, 'Template', 'The exact message wording, approved in advance.'),
      f(<IconClock />, 'Sending hours', 'Promotional sending is restricted to daytime hours under TRAI rules.'),
    ],
  },
  steps: {
    eyebrow: 'How we help',
    title: <>Registration without <>{g('the guesswork')}</></>,
    steps: [
      s('Register', 'We walk you through entity, header and template registration.'),
      s('Get approved', 'Templates are checked against the registry before you send.'),
      s('Send with confidence', 'Messages go out on approved registrations, within the rules.'),
    ],
  },
  related: {
    eyebrow: 'Related',
    title: <>More on trust and compliance</>,
    items: [
      f(<IconShield />, 'Enterprise security', 'SOC 2, GDPR and RBAC.', '/platform/security/'),
      f(<IconInfo />, 'Trust Center', 'Security, privacy and legal in one place.', '/platform/trust-center/'),
      f(<IconBolt />, 'SMS Broadcasting', 'Bulk SMS on registered routes.', '/products/channels/sms-broadcasting/'),
    ],
  },
  cta: { title: 'Let us handle the paperwork', subtitle: 'Talk to our team about DLT and sender approvals.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Compliance — frequently asked questions</>,
    items: [
      faq('What is DLT?', 'TRAI requires commercial messages in India to pass through a blockchain-based DLT registry that checks the sender, header and template.'),
      faq('What must be registered?', 'Three things separately: your entity, your header (sender ID) and each message template. All three must be approved.'),
      faq('Are there sending time rules?', 'Yes. Promotional sending is restricted to daytime hours under TRAI rules.'),
    ],
  },
}

export const PLATFORM_TRUST = {
  seo: {
    title: 'Trust Center — Security, Privacy and Compliance',
    description: 'Security, privacy and compliance information for SMSLocal in one place, with links to our policies and security practices.',
    keywords: ['trust center', 'security and compliance', 'data protection', 'SOC 2 GDPR HIPAA'],
  },
  hero: {
    eyebrow: 'Trust Center',
    title: <>Security and privacy, {g('in the open')}</>,
    subtitle: 'How we protect customer data and where to find our policies, in one place.',
    primaryCta: { label: 'Enterprise security', href: '/platform/security/' },
    secondaryCta: TALK,
  },
  features: {
    eyebrow: 'Our commitments',
    title: <>What we <>{g('stand behind')}</></>,
    items: [
      f(<IconShield />, 'Data security', 'Encryption and access controls protect customer data.'),
      f(<IconCheck />, 'Compliance', 'SOC 2, GDPR and HIPAA compliance, described on our security page.'),
      f(<IconUsers />, 'Access control', 'Role-based access and single sign-on for your team.'),
      f(<IconInfo />, 'Clear policies', 'Our terms and privacy policy are published and easy to read.'),
    ],
  },
  related: {
    eyebrow: 'Documents',
    title: <>Find what you need</>,
    items: [
      f(<IconShield />, 'Enterprise security', 'Controls and certifications.', '/platform/security/'),
      f(<IconBook />, 'Compliance & DLT', 'India messaging rules.', '/platform/compliance/'),
      f(<IconInfo />, 'Privacy policy', 'How we handle your data.', '/privacy-policy/'),
      f(<IconReceipt />, 'Terms and conditions', 'The agreement for using SMSLocal.', '/terms-and-conditions/'),
    ],
  },
  cta: { title: 'Need a security review?', subtitle: 'Talk to our team about your security and procurement requirements.', cta: TALK, secondaryCta: { label: 'Enterprise security', href: '/platform/security/' } },
  faqs: {
    title: <>Trust — frequently asked questions</>,
    items: [
      faq('Which certifications do you hold?', 'Our security page describes our SOC 2, GDPR and HIPAA compliance.'),
      faq('Who can I contact about a security question?', 'Use the contact page and our team will route it to the right person.'),
    ],
  },
}

export const PLATFORM_ENTERPRISE = {
  seo: {
    title: 'Enterprise — Messaging at Scale',
    description: 'SMSLocal for enterprises: every channel on one contract, with role-based access, SSO, security reviews and volume plans.',
    keywords: ['enterprise messaging platform', 'enterprise CPaaS', 'enterprise SMS', 'SSO RBAC messaging'],
  },
  hero: {
    eyebrow: 'Enterprise',
    title: <>One platform for {g('every team and channel')}</>,
    subtitle: 'Bring messaging, voice and AI agents under one contract, with the security and controls your organisation requires.',
    primaryCta: TALK,
    secondaryCta: { label: 'Enterprise security', href: '/platform/security/' },
  },
  features: {
    eyebrow: 'Built for scale',
    title: <>What large teams <>{g('ask for')}</></>,
    items: [
      f(<IconUsers />, 'Roles and SSO', 'Role-based access and single sign-on so each team sees only what it should.'),
      f(<IconShield />, 'Security reviews', 'SOC 2, GDPR and HIPAA compliance, and help with your security questionnaires.'),
      f(<IconGlobe />, 'Every channel', 'SMS, WhatsApp, RCS, voice, email and AI agents on one contract.'),
      f(<IconDollar />, 'Volume plans', 'Plans shaped around your channels and monthly volume. Talk to sales.'),
    ],
  },
  related: {
    eyebrow: 'Explore',
    title: <>Where to go next</>,
    items: [
      f(<IconShield />, 'Enterprise security', 'Controls and certifications.', '/platform/security/'),
      f(<IconLink />, 'Integrations', 'Connect your existing tools.', '/platform/integrations/'),
      f(<IconInfo />, 'Trust Center', 'Policies in one place.', '/platform/trust-center/'),
    ],
  },
  cta: { title: 'Talk to us about your organisation', subtitle: 'Tell us your channels and volumes and we will propose a plan.', cta: TALK, secondaryCta: START },
  faqs: {
    title: <>Enterprise — frequently asked questions</>,
    items: [
      faq('How do volume plans work?', 'Talk to our sales team with your channels and monthly volume, and we will build a plan that fits.'),
      faq('Can we use single sign-on?', 'Yes. Single sign-on and role-based access are part of our enterprise controls.'),
    ],
  },
}

/* ───────────────────────────── Resources: tools hub ───────────────────────────── */

export const TOOLS_HUB = {
  seo: {
    title: 'Free Messaging Tools',
    description: 'Free tools for messaging teams: a WhatsApp link generator, free SMS test, carrier lookup and country code finder.',
    keywords: ['free SMS tools', 'WhatsApp link generator', 'carrier lookup', 'country codes'],
  },
  hero: {
    eyebrow: 'Free tools',
    title: <>Free tools for {g('messaging teams')}</>,
    subtitle: 'Small, useful utilities you can use right now, no account needed.',
    primaryCta: { label: 'WhatsApp link generator', href: '/tools/whatsapp-link-generator/' },
    secondaryCta: START,
  },
  related: {
    eyebrow: 'All tools',
    title: <>Pick a tool</>,
    items: [
      f(<IconChat />, 'WhatsApp link generator', 'Create a wa.me link with a ready-typed message.', '/tools/whatsapp-link-generator/'),
      f(<IconSearch />, 'Carrier lookup', 'Find the carrier behind any phone number.', '/tools/carrier-lookup/'),
      f(<IconBolt />, 'Send a free test SMS', 'Try SMS delivery with no account.', '/tools/send-text/'),
      f(<IconGlobe />, 'Country codes', 'Dial codes for every country.', '/country-code/'),
    ],
  },
  cta: { title: 'Ready for more than a test?', subtitle: 'Create an account and use every channel.', cta: START, secondaryCta: TALK },
}
