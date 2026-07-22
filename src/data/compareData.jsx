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
  haptik: {
    slug: 'haptik',
    name: 'Haptik',
    domain: 'haptik.ai',
    category: 'Enterprise conversational AI',
    seo: {
      title: 'SMSLocal vs Haptik',
      description:
        'SMSLocal vs Haptik: all-in-one omnichannel messaging, no-code chatbots and agentic AI with transparent pricing, versus Haptik’s enterprise conversational-AI platform.',
      keywords: ['SMSLocal vs Haptik', 'Haptik alternative', 'Haptik competitor', 'conversational AI comparison', 'enterprise chatbot alternative'],
    },
    hero: {
      title: <>All-in-one messaging + AI, <span className="cmp-grad">without the enterprise overhead</span></>,
      subtitle:
        'Haptik is a strong enterprise conversational-AI platform. SMSLocal puts messaging, chatbots and AI in one plan — transparent pricing, live in days.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['Every channel in one plan', 'Transparent pricing', 'Live in days'],
    scorecard: [
      { feature: 'Focus', them: 'Enterprise conversational AI', us: 'Messaging + chatbots + AI in one' },
      { feature: 'Channels', them: 'WhatsApp, Instagram, Messenger, RCS, voice', us: '10+ incl. Viber, Telegram, LINE, Email' },
      { feature: 'Dedicated SMS', them: 'SMS as a channel', us: 'First-class Bulk, OTP & transactional' },
      { feature: 'Setup', them: 'Sales-led rollout', us: 'No-code, managed onboarding' },
      { feature: 'Pricing', them: 'Custom quote', us: 'Transparent, self-serve' },
      { feature: 'Best for', them: 'Large enterprises', us: 'Growing teams' },
    ],
    reasons: [
      { icon: <IconGlobe />, title: 'Every channel in one plan', desc: 'SMS, WhatsApp, RCS, Viber, Telegram, Instagram, Apple Messages, LINE and Email — not just chat surfaces.' },
      { icon: <IconRocket />, title: 'Live in days, managed', desc: 'We handle Meta/WhatsApp verification and setup — no procurement cycle.' },
      { icon: <IconDollar />, title: 'Transparent pricing', desc: 'Published, self-serve plans instead of a custom enterprise quote.' },
    ],
    faqs: [
      { q: 'Is SMSLocal a Haptik alternative?', a: 'Yes — for teams that want omnichannel messaging, no-code chatbots and agentic AI in one platform with transparent pricing.' },
      { q: 'Does SMSLocal have AI agents like Haptik?', a: 'Yes. Agentic AI is built in — it reads each conversation, takes action, and hands off to a person with full context when needed.' },
      { q: 'How is it different from Haptik?', a: 'Haptik centers on enterprise conversational AI, usually sold via demo-and-quote. SMSLocal bundles 10+ channels, a no-code builder and AI into one self-serve plan for growing teams.' },
      { q: 'Which should I choose?', a: 'A large enterprise standing up a major CX program may prefer Haptik. A growing team that wants messaging plus AI live quickly, priced transparently, should choose SMSLocal.' },
    ],
    cardBlurb: 'Enterprise conversational AI vs an all-in-one messaging + AI platform for growing teams.',
    cta: {
      title: 'Get messaging and AI live in days',
      subtitle: 'Every channel, a no-code chatbot builder and agentic AI — one platform, transparent pricing.',
    },
  },

  twilio: {
    slug: 'twilio',
    name: 'Twilio',
    domain: 'twilio.com',
    category: 'CPaaS / communications APIs',
    seo: {
      title: 'SMSLocal vs Twilio',
      description:
        'SMSLocal vs Twilio: an all-in-one, no-code messaging platform with managed onboarding, a shared inbox and AI included, versus Twilio’s developer-first communications APIs.',
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

  twixor: {
    slug: 'twixor',
    name: 'Twixor',
    domain: 'twixor.com',
    category: 'CX & process automation',
    seo: {
      title: 'SMSLocal vs Twixor',
      description:
        'SMSLocal vs Twixor: an all-in-one, no-code messaging and AI platform for growing teams, versus Twixor’s enterprise CX and process-automation platform.',
      keywords: ['SMSLocal vs Twixor', 'Twixor alternative', 'Twixor competitor', 'CX automation comparison', 'no-code messaging platform'],
    },
    hero: {
      title: <>Omnichannel messaging + AI, <span className="cmp-grad">without an enterprise rollout</span></>,
      subtitle:
        'Twixor is strong at enterprise process automation. SMSLocal gives growing teams messaging, no-code chatbots and AI — transparent pricing, fast self-serve onboarding.',
      stats: SMSLOCAL_STATS,
    },
    heroWins: ['Broader consumer channels', 'No enterprise rollout', 'Transparent pricing'],
    scorecard: [
      { feature: 'Focus', them: 'Enterprise CX & process automation', us: 'Messaging + chatbots + AI' },
      { feature: 'Channels', them: 'WhatsApp, RCS, SMS, Telegram, Messenger, Voice', us: '10+ incl. Viber, Instagram, Apple Messages, LINE' },
      { feature: 'Build', them: 'Low-code, enterprise programs', us: 'No-code, non-developers ship' },
      { feature: 'Setup', them: 'Sales-led, integration-heavy', us: 'Fast, managed self-serve' },
      { feature: 'Pricing', them: 'Custom quote', us: 'Transparent, self-serve' },
      { feature: 'Best for', them: 'Enterprise & telco partners', us: 'Growing teams' },
    ],
    reasons: [
      { icon: <IconGlobe />, title: 'Broader consumer channels', desc: 'Add Viber, Instagram, Apple Messages and LINE alongside the core WhatsApp, RCS, SMS and Telegram set.' },
      { icon: <IconRocket />, title: 'Live in days, no rollout', desc: 'No integration project — build visually and launch fast with managed onboarding.' },
      { icon: <IconDollar />, title: 'Transparent pricing', desc: 'Published, self-serve plans instead of a contact-sales quote.' },
    ],
    faqs: [
      { q: 'Is SMSLocal a Twixor alternative?', a: 'Yes — for growing teams that want omnichannel messaging, no-code chatbots and agentic AI in one transparent, self-serve platform.' },
      { q: 'Does SMSLocal do automation and AI?', a: 'SMSLocal includes agentic AI that takes real actions. Twixor goes deeper on heavy enterprise process automation; SMSLocal focuses on fast, accessible automation.' },
      { q: 'How is it different from Twixor?', a: 'Twixor is enterprise-first and often sold to telcos and integrators via a sales-led rollout. SMSLocal serves growing teams directly with no-code building and published pricing.' },
      { q: 'How fast can I go live?', a: 'Most teams launch in days — onboarding, including Meta/WhatsApp verification, is managed for you.' },
    ],
    cardBlurb: 'Enterprise CX & process automation vs an all-in-one, no-code messaging + AI platform for growing teams.',
    cta: {
      title: 'Launch omnichannel messaging in days',
      subtitle: 'No integration project — no-code building, managed onboarding and agentic AI across 10+ channels.',
    },
  },

  infobip: {
    slug: 'infobip',
    name: 'Infobip',
    domain: 'infobip.com',
    category: 'Global omnichannel CPaaS',
    seo: {
      title: 'SMSLocal vs Infobip',
      description:
        'SMSLocal vs Infobip: an all-in-one, no-code messaging and AI platform with transparent pricing for growing teams, versus Infobip’s enterprise-scale global CPaaS.',
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
export const COMPETITOR_LIST = ['haptik', 'twilio', 'twixor', 'infobip'].map((slug) => ({
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
    cells: { smslocal: true, haptik: P('Separate products'), twilio: P('Separate products'), twixor: P('Enterprise suite'), infobip: P('Separate modules') },
  },
  {
    feature: 'No-code, non-developer friendly',
    cells: { smslocal: true, haptik: true, twilio: P('Developer-first'), twixor: P('Low-code'), infobip: P('Dev / enterprise') },
  },
  {
    feature: 'Omnichannel breadth (10+ channels)',
    cells: { smslocal: true, haptik: P('Core channels'), twilio: true, twixor: P('Core channels'), infobip: true },
  },
  {
    feature: 'Managed onboarding (Meta / 10DLC handled for you)',
    cells: { smslocal: true, haptik: P('Sales-led'), twilio: P('Self-service'), twixor: P('Sales-led'), infobip: P('Sales-led') },
  },
  {
    feature: 'Shared team inbox included',
    cells: { smslocal: true, haptik: true, twilio: P('Flex add-on'), twixor: true, infobip: true },
  },
  {
    feature: 'Transparent, self-serve pricing',
    cells: { smslocal: true, haptik: false, twilio: P('Published + fees'), twixor: false, infobip: false },
  },
  {
    feature: 'Free to start / self-serve signup',
    cells: { smslocal: true, haptik: false, twilio: true, twixor: false, infobip: false },
  },
  {
    feature: 'Best fit',
    cells: { smslocal: 'Growing teams', haptik: 'Large enterprise', twilio: 'Developers & enterprise', twixor: 'Enterprise & telco', infobip: 'Enterprise & telco' },
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
  { q: 'How is SMSLocal different from Twilio, Infobip, Haptik and Twixor?', a: 'Those platforms are excellent at what they focus on — Twilio on developer APIs, Infobip on enterprise-scale CPaaS, Haptik on enterprise conversational AI, and Twixor on enterprise process automation. SMSLocal packages omnichannel messaging, a no-code chatbot builder and agentic AI into one plan for growing teams, with transparent pricing and managed onboarding.' },
  { q: 'Is SMSLocal cheaper than the alternatives?', a: 'SMSLocal focuses on transparent, self-serve pricing you can see up front. Several alternatives price at the platform level by custom quote, so the fair comparison is total cost and time-to-value — not just a base per-message rate.' },
  { q: 'Does SMSLocal work for enterprises too?', a: 'Yes, but our sweet spot is growing SMB-to-mid-market teams. If you need maximum global carrier scale or a full enterprise contact-center stack, a platform like Infobip or Twilio may fit better — and we’ll tell you honestly.' },
  { q: 'Do I need developers to use SMSLocal?', a: 'No. SMSLocal is no-code first, so non-technical teams can launch messaging, chatbots and AI agents. Developer APIs are available when you want deeper control.' },
  { q: 'How quickly can I get started?', a: 'Most teams go live in days. Onboarding — including Meta/WhatsApp Business verification and sender setup — is managed for you.' },
]
