import {
  IconGlobe, IconRocket, IconDollar, IconCursor, IconBrain, IconBolt, IconChat,
} from '../components/icons.jsx'

/*
 * Competitor comparison content — deliberately lean (short one-liners, no long paragraphs).
 * All competitor claims are FAIR and DEFENSIBLE (packaging / segment-fit / no-code /
 * onboarding / pricing transparency) and fact-checked — no fabricated weaknesses, no
 * unverifiable competitor pricing figures.
 */

const SMSLOCAL_STATS = [
  { value: '10+', label: 'channels, one platform' },
  { value: 'No-code', label: 'chatbot builder' },
  { value: 'Days', label: 'to go live' },
]

const COMPETITORS = {
  bird: {
    slug: 'bird',
    name: 'Bird',
    domain: 'bird.com',
    category: 'Marketing & CX messaging (formerly MessageBird)',
    seo: {
      title: 'SMSLocal vs Bird: Omnichannel Messaging & AI',
      description:
        'SMSLocal vs Bird: all-in-one messaging and agentic AI, versus Bird’s marketing and CX messaging suite.',
      keywords: ['SMSLocal vs Bird', 'Bird alternative', 'MessageBird alternative', 'Bird competitor', 'CX messaging comparison'],
    },
    hero: {
      title: <>Every channel and AI, <span className="cmp-grad">bundled at one predictable rate</span></>,
      subtitle:
        'Bird, formerly MessageBird, covers marketing and CX messaging at scale. SMSLocal bundles messaging, chatbots and agentic AI into one plan with transparent, all-in USD pricing.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['Transparent bundled pricing', 'Agentic AI included', 'No-code by default'],
    scorecard: [
      { feature: 'Focus', them: 'Marketing & CX messaging platform', us: 'Messaging + chatbots + AI in one' },
      { feature: 'Channels', them: 'WhatsApp, SMS, email, voice', us: '10+ incl. Viber, Telegram, LINE, Email' },
      { feature: 'Agentic AI', them: 'AI features rolling out', us: 'Built into every channel' },
      { feature: 'Setup', them: 'Sales-led for larger plans', us: 'No-code, managed onboarding' },
      { feature: 'Pricing', them: 'Usage-based, multiple tiers', us: 'Transparent, all-in bundled plans' },
      { feature: 'Best for', them: 'Marketing-led CX teams', us: 'Growing teams' },
    ],
    reasons: [
      { icon: <IconDollar />, title: 'Transparent bundled pricing', desc: 'One predictable, published rate that includes messaging, chatbots and AI — no separate line items to track.' },
      { icon: <IconGlobe />, title: 'Every channel in one plan', desc: 'SMS, WhatsApp, RCS, Viber, Telegram, Instagram, Apple Messages, LINE and Email — not just marketing surfaces.' },
      { icon: <IconRocket />, title: 'Agentic AI built in', desc: 'AI agents that take real action ship with the platform from day one, not as a rolling-out add-on.' },
    ],
    faqs: [
      { q: 'Is SMSLocal a Bird alternative?', a: 'Yes — for teams that want omnichannel messaging, no-code chatbots and agentic AI bundled into one plan with transparent USD pricing.' },
      { q: 'Is Bird the same company as MessageBird?', a: 'Yes, Bird is the rebrand of MessageBird. It remains a strong marketing and CX messaging platform; SMSLocal focuses on bundling messaging, chatbots and AI as one finished product.' },
      { q: 'How is it different from Bird?', a: 'Bird prices usage across tiers as your volume grows. SMSLocal bundles the core channels, a no-code builder and agentic AI into one transparent, predictable rate.' },
      { q: 'Which should I choose?', a: 'A marketing-led team running large campaign programs may prefer Bird. A growing team that wants messaging plus AI at a predictable, bundled rate should choose SMSLocal.' },
    ],
    cardBlurb: 'Marketing & CX messaging platform vs an all-in-one messaging + AI platform with bundled pricing.',
    cta: {
      title: 'Get one predictable rate for everything',
      subtitle: 'Every channel, a no-code chatbot builder and agentic AI — bundled, transparent USD pricing.',
    },
  },

  twilio: {
    slug: 'twilio',
    name: 'Twilio',
    domain: 'twilio.com',
    category: 'CPaaS / communications APIs',
    seo: {
      title: 'SMSLocal vs Twilio: No-Code Messaging & AI',
      description:
        'SMSLocal vs Twilio: a no-code messaging platform with agentic AI, versus Twilio’s developer-first APIs.',
      keywords: ['SMSLocal vs Twilio', 'Twilio alternative', 'no-code Twilio alternative', 'CPaaS comparison', 'Twilio without code'],
    },
    hero: {
      title: <>The same channels, <span className="cmp-grad">without writing the code</span></>,
      subtitle:
        'Twilio’s APIs are the developer standard. SMSLocal delivers the same channels as a no-code platform — managed onboarding, a shared inbox and AI included.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['No code to maintain', 'Verification handled', 'Shared inbox included'],
    scorecard: [
      { feature: 'Build model', them: 'Developer-first APIs & SDKs', us: 'No-code, non-developers ship' },
      { feature: 'Chatbot', them: 'Twilio Studio flow tooling', us: 'Native no-code builder' },
      { feature: 'Agentic AI', them: 'AI suite to assemble', us: 'Built into every channel' },
      { feature: 'Team inbox', them: 'Flex — a separate product', us: 'Shared inbox included' },
      { feature: 'Onboarding', them: 'Self-service 10DLC & Meta', us: 'Managed — handled for you' },
      { feature: 'Pricing', them: 'Rates + carrier fees & add-ons', us: 'Transparent, all-in plans' },
    ],
    reasons: [
      { icon: <IconCursor />, title: 'No code to maintain', desc: 'Launch campaigns, chatbots and AI in a visual platform — not integrations you build and own.' },
      { icon: <IconRocket />, title: 'Verification handled', desc: 'We manage 10DLC and WhatsApp/Meta sender verification — no self-service maze.' },
      { icon: <IconBrain />, title: 'AI out of the box', desc: 'Agentic AI ships with the platform — you don’t assemble it from a toolkit.' },
    ],
    faqs: [
      { q: 'Is SMSLocal a Twilio alternative?', a: 'Yes. SMSLocal reaches the same core channels but as a no-code platform with managed onboarding, a shared inbox and AI included — no integrations to maintain.' },
      { q: 'Do I need developers?', a: 'No. SMSLocal is no-code and low-code first, so non-technical teams can launch. APIs are there when you want them.' },
      { q: 'Is Twilio cheaper?', a: 'Twilio’s base rates are low, but real cost adds carrier fees, compliance registration and separately-priced products like Flex and Segment. Compare total cost, not the base rate.' },
      { q: 'Does SMSLocal handle 10DLC and WhatsApp verification?', a: 'Yes — sender registration and Meta/WhatsApp verification are managed for you during onboarding.' },
    ],
    cardBlurb: 'Developer-first APIs vs a no-code, all-in-one platform with managed onboarding and AI included.',
    cta: {
      title: 'Get the same reach without the code',
      subtitle: 'Every channel, a shared inbox and agentic AI in one no-code platform — onboarding managed for you.',
    },
  },

  plivo: {
    slug: 'plivo',
    name: 'Plivo',
    domain: 'plivo.com',
    category: 'Communications APIs',
    seo: {
      title: 'SMSLocal vs Plivo: No-Code Messaging & AI',
      description:
        'SMSLocal vs Plivo: a ready-to-use, no-code messaging and AI platform, versus Plivo’s developer-first APIs.',
      keywords: ['SMSLocal vs Plivo', 'Plivo alternative', 'Plivo competitor', 'CPaaS comparison', 'no-code Plivo alternative'],
    },
    hero: {
      title: <>The same reach, <span className="cmp-grad">shipped as a finished product</span></>,
      subtitle:
        'Plivo gives developers reliable, low-cost voice and SMS APIs to build on. SMSLocal delivers the same channels, plus a shared inbox and agentic AI, ready to use — no raw API build required.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['Ships ready to use', 'Shared inbox included', 'Agentic AI included'],
    scorecard: [
      { feature: 'Build model', them: 'Developer-first APIs & SDKs', us: 'No-code, non-developers ship' },
      { feature: 'Chatbot & AI', them: 'Build your own on top of the API', us: 'Native no-code builder + agentic AI' },
      { feature: 'Team inbox', them: 'Not included — build your own', us: 'Shared inbox included' },
      { feature: 'Setup', them: 'Self-service registration & compliance', us: 'Managed onboarding' },
      { feature: 'Pricing', them: 'Low per-unit API rates', us: 'Transparent, all-in plans' },
      { feature: 'Best for', them: 'Developers building custom stacks', us: 'Growing teams' },
    ],
    reasons: [
      { icon: <IconCursor />, title: 'Nothing to build on top', desc: 'A shared inbox, chatbot builder and agentic AI ship with the platform — not left for you to assemble on the API.' },
      { icon: <IconRocket />, title: 'Managed setup', desc: 'We handle sender verification and channel setup instead of a self-service registration process.' },
      { icon: <IconDollar />, title: 'Transparent all-in pricing', desc: 'One published plan that includes the AI and inbox, instead of pricing the API separately from everything built around it.' },
    ],
    faqs: [
      { q: 'Is SMSLocal a Plivo alternative?', a: 'Yes — for teams that want messaging, a shared inbox and agentic AI as a finished product instead of building it on top of a raw API.' },
      { q: 'Is Plivo cheaper than SMSLocal?', a: 'Plivo’s per-unit API rates can be low, but that excludes the inbox, chatbot builder and AI you would otherwise have to build and maintain yourself.' },
      { q: 'How is it different from Plivo?', a: 'Plivo is a developer-first API for voice and SMS. SMSLocal delivers the same core channels plus a shared inbox, no-code chatbot builder and agentic AI, ready to use.' },
      { q: 'Which should I choose?', a: 'A team with engineers who want to build a fully custom stack may prefer Plivo’s APIs directly. A team that wants messaging and AI live quickly without building it themselves should choose SMSLocal.' },
    ],
    cardBlurb: 'Developer-first communications APIs vs a finished, no-code messaging + AI platform.',
    cta: {
      title: 'Skip building it yourself',
      subtitle: 'Every channel, a shared inbox and agentic AI — ready to use, not left for you to build on an API.',
    },
  },

  infobip: {
    slug: 'infobip',
    name: 'Infobip',
    domain: 'infobip.com',
    category: 'Global omnichannel CPaaS',
    seo: {
      title: 'SMSLocal vs Infobip: No-Code Messaging & AI',
      description:
        'SMSLocal vs Infobip: a no-code messaging and AI platform for growing teams, versus Infobip’s enterprise CPaaS.',
      keywords: ['SMSLocal vs Infobip', 'Infobip alternative', 'Infobip competitor', 'CPaaS comparison', 'omnichannel messaging alternative'],
    },
    hero: {
      title: <>Enterprise-grade channels, <span className="cmp-grad">right-sized for growing teams</span></>,
      subtitle:
        'Infobip is a global enterprise CPaaS with huge reach. SMSLocal gives growing teams the channels, chatbots and AI they actually need — one plan, no-code, transparent pricing.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['One unified plan', 'No-code building', 'Transparent pricing'],
    scorecard: [
      { feature: 'Scale', them: 'Enterprise, 15+ channels, global carriers', us: '10+ channels, reliable global delivery' },
      { feature: 'Packaging', them: 'Separate modules to assemble', us: 'One unified plan' },
      { feature: 'Build', them: 'Dev & enterprise-oriented', us: 'No-code, non-developers ship' },
      { feature: 'Setup', them: 'Sales-led for larger rollouts', us: 'No-code, managed onboarding' },
      { feature: 'Pricing', them: 'Mostly quote-based', us: 'Transparent, self-serve' },
      { feature: 'Best for', them: 'Large enterprise & telco', us: 'Growing teams' },
    ],
    reasons: [
      { icon: <IconBolt />, title: 'One unified plan', desc: 'Messaging, a no-code builder and AI in a single package — not separate modules to license and integrate.' },
      { icon: <IconCursor />, title: 'No-code accessibility', desc: 'Non-technical teams build bots and campaigns without a solution-engineering engagement.' },
      { icon: <IconDollar />, title: 'Transparent pricing', desc: 'Published, self-serve plans — no platform-level custom quote.' },
    ],
    faqs: [
      { q: 'Is SMSLocal an Infobip alternative?', a: 'Yes — for growing teams that want omnichannel messaging, no-code chatbots and agentic AI in one transparent, self-serve plan.' },
      { q: 'Does SMSLocal have Infobip’s reach?', a: 'SMSLocal delivers reliable global messaging across 10+ channels. Infobip’s carrier footprint goes deeper for the largest enterprises; SMSLocal covers the channels growing teams actually use.' },
      { q: 'Why choose SMSLocal over Infobip?', a: 'If you don’t need a full enterprise stack: one unified plan instead of separate modules, no-code building, managed onboarding and transparent pricing.' },
      { q: 'Which should I choose?', a: 'A large enterprise or telco needing maximum global scale may prefer Infobip. A growing team gets what it needs, without the overhead, from SMSLocal.' },
    ],
    cardBlurb: 'Enterprise-scale global CPaaS vs a right-sized, no-code all-in-one plan for growing teams.',
    cta: {
      title: 'Enterprise-grade channels, right-sized',
      subtitle: 'Messaging, chatbots and agentic AI in one no-code plan — transparent pricing, managed onboarding.',
    },
  },
}

// Ordered list used by the hub, matrix and crosslink chips.
export const COMPETITOR_LIST = ['bird', 'twilio', 'plivo', 'infobip'].map((slug) => ({
  slug,
  name: COMPETITORS[slug].name,
  domain: COMPETITORS[slug].domain,
  category: COMPETITORS[slug].category,
  cardBlurb: COMPETITORS[slug].cardBlurb,
}))

export function getCompetitor(slug) {
  return COMPETITORS[slug] || null
}

// P = nuanced / partial cell, rendered as muted text rather than a hard yes/no.
const P = (label) => ({ label })

/*
 * The compare-all matrix. Values: true = built in · false = not a focus ·
 * {label} = nuanced/partial · string = text. Every competitor value is fair and defensible.
 */
export const COMPARE_MATRIX = [
  {
    feature: 'All-in-one: messaging + chatbot + AI in one plan',
    cells: { smslocal: true, bird: P('Separate products'), twilio: P('Separate products'), plivo: P('API only'), infobip: P('Separate modules') },
  },
  {
    feature: 'No-code, non-developer friendly',
    cells: { smslocal: true, bird: true, twilio: P('Developer-first'), plivo: P('Developer-first'), infobip: P('Dev / enterprise') },
  },
  {
    feature: 'Omnichannel breadth (10+ channels)',
    cells: { smslocal: true, bird: P('Core channels'), twilio: true, plivo: P('Voice & SMS focus'), infobip: true },
  },
  {
    feature: 'Managed onboarding (Meta / 10DLC handled for you)',
    cells: { smslocal: true, bird: P('Sales-led'), twilio: P('Self-service'), plivo: P('Self-service'), infobip: P('Sales-led') },
  },
  {
    feature: 'Shared team inbox included',
    cells: { smslocal: true, bird: true, twilio: P('Flex add-on'), plivo: false, infobip: true },
  },
  {
    feature: 'Transparent, self-serve pricing',
    cells: { smslocal: true, bird: P('Usage-based tiers'), twilio: P('Published + fees'), plivo: P('Published + fees'), infobip: false },
  },
  {
    feature: 'Free to start / self-serve signup',
    cells: { smslocal: true, bird: false, twilio: true, plivo: true, infobip: false },
  },
  {
    feature: 'Best fit',
    cells: { smslocal: 'Growing teams', bird: 'Marketing-led CX teams', twilio: 'Developers & enterprise', plivo: 'Developers building custom stacks', infobip: 'Enterprise & telco' },
  },
]

export const HUB_REASONS = [
  { icon: <IconGlobe />, title: 'Every channel, one platform', desc: 'SMS, WhatsApp, RCS, Viber, Telegram, Instagram, Messenger, Apple Messages, LINE and Email — from one account.' },
  { icon: <IconCursor />, title: 'No-code by default', desc: 'Non-developers build chatbots and campaigns visually. APIs are there when you want them.' },
  { icon: <IconBrain />, title: 'Agentic AI included', desc: 'AI agents that read context and take real actions ship with the platform — not as a separate module.' },
  { icon: <IconRocket />, title: 'Managed onboarding', desc: 'We handle Meta/WhatsApp Business verification and sender setup, so you’re live in days.' },
  { icon: <IconDollar />, title: 'Transparent pricing', desc: 'Published, self-serve plans you can evaluate today — no custom-quote gatekeeping.' },
  { icon: <IconChat />, title: 'One shared inbox', desc: 'Every channel, human and AI replies together in a single inbox — no bolt-on contact center.' },
]

// Honest decision guide for the hub — builds credibility by naming when NOT to pick SMSLocal.
export const HUB_CHOOSE = {
  us: {
    label: 'Choose SMSLocal if',
    points: [
      'You want messaging, chatbots and AI in one plan',
      'You’d rather not write or maintain integration code',
      'You want transparent pricing and to launch in days',
      'You’re a growing SMB-to-mid-market team',
    ],
  },
  them: {
    label: 'Consider an enterprise platform if',
    points: [
      'You need maximum global carrier scale across many countries',
      'You have engineers to build and run custom integrations',
      'You require a full enterprise contact-center or CDP stack',
      'You’re a large enterprise or telecom operator',
    ],
  },
}

export const HUB_FAQS = [
  { q: 'How is SMSLocal different from Twilio, Infobip, Bird and Plivo?', a: 'Those platforms are excellent at what they focus on — Twilio and Plivo on developer APIs, Infobip on enterprise-scale CPaaS, and Bird on marketing and CX messaging. SMSLocal packages omnichannel messaging, a no-code chatbot builder and agentic AI into one plan for growing teams, with transparent pricing and managed onboarding.' },
  { q: 'Is SMSLocal cheaper than the alternatives?', a: 'SMSLocal focuses on transparent, self-serve pricing you can see up front. Several alternatives price at the platform level by custom quote, so the fair comparison is total cost and time-to-value — not just a base per-message rate.' },
  { q: 'Does SMSLocal work for enterprises too?', a: 'Yes, but our sweet spot is growing SMB-to-mid-market teams. If you need maximum global carrier scale or a full enterprise contact-center stack, a platform like Infobip or Twilio may fit better — and we’ll tell you honestly.' },
  { q: 'Do I need developers to use SMSLocal?', a: 'No. SMSLocal is no-code first, so non-technical teams can launch messaging, chatbots and AI agents. Developer APIs are available when you want deeper control.' },
  { q: 'How quickly can I get started?', a: 'Most teams go live in days. Onboarding — including Meta/WhatsApp Business verification and sender setup — is managed for you.' },
]
