import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import CaseStudiesGrowthHero from '../components/CaseStudiesGrowthHero.jsx'
import CaseStudySpotlight from '../components/CaseStudySpotlight.jsx'
import CaseStudyShowcase from '../components/CaseStudyShowcase.jsx'
import RolloutTimeline from '../components/RolloutTimeline.jsx'

const IMPACT = [
  { value: '30 sec', label: 'Median first response', desc: 'Down from hours, once routine questions were handled by an AI agent instead of a queue.' },
  { value: '3.4x', label: 'More conversations handled', desc: 'The same teams kept up with growing volume without adding headcount.' },
  { value: '71%', label: 'Auto-resolved on average', desc: 'Share of chats closed end-to-end by messaging automation and AI agents.' },
  { value: '6 wks', label: 'Typical time to results', desc: 'From first message sent to a measurable shift in the numbers that matter.' },
]

const SPOTLIGHT = {
  tag: 'Featured · Ecommerce',
  company: 'A growing D2C brand',
  sector: 'Direct-to-consumer retail · 40k orders/month',
  metric: { value: '38%', label: 'of abandoned carts recovered on WhatsApp' },
  sub: [
    { value: '30 sec', label: 'Reply time' },
    { value: '24/7', label: 'Coverage' },
    { value: '3', label: 'Languages' },
  ],
  stages: [
    {
      kicker: 'Challenge',
      head: 'Order questions piled up faster than the team could reply',
      body: 'Customers asked about shipping, sizing and returns across email and Instagram DMs. Replies took hours, carts were abandoned before anyone could help, and a small support team was drowning during every sale.',
    },
    {
      kicker: 'Approach',
      head: 'A WhatsApp AI agent on top of one shared inbox',
      body: 'We moved order updates to WhatsApp and put an AI agent in front of the queue — grounded in the store’s catalogue and policies. It answers instantly, nudges abandoned carts with a personal message, and hands anything sensitive to a human with full context.',
    },
    {
      kicker: 'Result',
      head: 'Faster replies, more recovered revenue, calmer team',
      body: 'First-response time dropped from hours to about 30 seconds, more than a third of abandoned carts were recovered, and the support team stopped copy-pasting the same answers all day — without hiring for the next peak.',
    },
  ],
  quote: {
    text: 'Switching our order updates to WhatsApp and adding an AI agent for replies changed our response time completely — and we recover carts we used to just lose.',
    author: 'Priya Nair · Growth Marketer, D2C brand',
  },
}

const STUDIES = [
  {
    tag: 'Healthcare',
    head: 'A clinic network cut no-shows with automated reminders',
    desc: 'Appointment confirmations and reminders were automated across SMS and WhatsApp, with easy reschedule links — so fewer slots went empty and front-desk staff spent less time on the phone.',
    value: '−59%',
    label: 'No-show rate',
  },
  {
    tag: 'Fintech',
    head: 'A fintech startup deflected routine account questions',
    desc: 'A compliant support AI agent now handles balance, KYC and card queries with full audit logging, escalating edge cases to humans — so the support team focuses on the conversations that actually need them.',
    value: '68%',
    label: 'Tickets auto-resolved',
  },
  {
    tag: 'Travel',
    head: 'A travel platform automated booking changes in 3 languages',
    desc: 'Guests get instant answers on itineraries, changes and refunds in their own language, across WhatsApp and web chat, with human handoff for complex trips — around the clock, across time zones.',
    value: '24/7',
    label: 'Multilingual guest support',
  },
  {
    tag: 'Logistics',
    head: 'A courier sent proactive delivery updates over RCS',
    desc: 'Branded, verified delivery notifications went out over RCS with automatic SMS fallback, cutting “where is my order?” contacts and the failed-delivery attempts that come from customers never seeing a plain text.',
    value: '−41%',
    label: 'WISMO contacts',
  },
  {
    tag: 'Education',
    head: 'An ed-tech platform lifted course enrolment with SMS journeys',
    desc: 'Timed SMS and WhatsApp sequences nudged sign-ups through onboarding, reminded them of live sessions and re-engaged dormant learners — turning a one-off blast into a measurable enrolment lift.',
    value: '2.1x',
    label: 'Enrolment conversion',
  },
  {
    tag: 'Financial services',
    head: 'A lender verified users faster with reliable OTP',
    desc: 'High-deliverability OTP over direct carrier routes replaced a flaky provider, so one-time passcodes land in seconds worldwide — fewer drop-offs at sign-up and fewer support tickets about codes that never arrive.',
    value: '99.4%',
    label: 'OTP delivery rate',
  },
]

const TESTIMONIALS = [
  { quote: 'Automated reminders across SMS and WhatsApp brought our no-show rate down within the first month — the front desk noticed the difference immediately.', name: 'Dr. Amit Rao', role: 'Operations Lead, Clinic Network' },
  { quote: 'Our support AI agent now resolves most account questions on its own, with full audit logging for compliance. It freed the team to handle the hard cases.', name: 'Sara Bianchi', role: 'Head of Support, Fintech' },
  { quote: 'One platform for SMS, WhatsApp and RCS meant we could roll out proactive delivery updates without stitching three vendors together.', name: 'Lucas Meyer', role: 'CTO, Logistics' },
]

const FAQS = [
  { q: 'Are these real customer results?', a: 'They’re representative outcomes drawn from the kinds of deployments teams run on SMSLocal across ecommerce, healthcare, fintech, travel and logistics. Company names are generalised for privacy — we’ll share directly relevant, named references on request.' },
  { q: 'How quickly do teams usually see results?', a: 'Most see a measurable shift within about six weeks — often sooner for a focused use case like abandoned-cart recovery or appointment reminders, where you can go live in days and read the numbers almost immediately.' },
  { q: 'Which channels and products drive these outcomes?', a: 'A mix — bulk SMS and OTP, WhatsApp and RCS broadcasting, and AI agents on top of a shared inbox. The common thread is running them from one platform, one customer record and one API rather than stitching vendors together.' },
  { q: 'Can you build a case for my industry?', a: 'Yes. Tell us your use case and the metric you care about — response time, no-shows, deflection, conversion — and we’ll map a relevant example and a starting point for your own rollout.' },
  { q: 'Do results hold as volume grows?', a: 'That’s the point of automating at the platform layer — the AI agents and broadcast tooling handle rising volume without a matching rise in headcount, which is exactly where these teams saw the biggest gains.' },
]

function ResourcesCaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Real results from teams running messaging, chatbots and AI agents on SMSLocal — see how ecommerce, healthcare, fintech, travel and logistics teams cut response times, no-shows and support load."
        keywords={['SMSLocal case studies', 'messaging automation results', 'WhatsApp AI agent case study', 'SMS marketing ROI', 'customer success stories']}
      />

      <Hero
        eyebrow="Case Studies"
        title={<><span className="grad-word">Real results</span>, across every industry</>}
        subtitle="See how teams in ecommerce, healthcare, fintech, travel and logistics use SMSLocal to answer faster, resolve more and grow — without adding headcount."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Solutions', href: '/products' }}
        visual={<CaseStudiesGrowthHero />}
      />

      <StatBand
        title={<>The numbers behind the stories</>}
        subtitle="Aggregate outcomes teams typically see once messaging and AI agents run on one platform."
        items={IMPACT}
        alt
      />

      <CaseStudySpotlight
        eyebrow="Featured story"
        title={<>How one D2C brand turned replies into recovered revenue</>}
        subtitle="A closer look at the challenge, the approach and the outcome behind one deployment."
        study={SPOTLIGHT}
      />

      <CaseStudyShowcase
        eyebrow="More case studies"
        title={<>Stories from every corner of the platform</>}
        subtitle="Six teams, six industries, one common thread — running messaging and AI agents from a single platform."
        items={STUDIES}
        alt
      />

      <RolloutTimeline />

      <Testimonials title={<>In their own words</>} items={TESTIMONIALS} />

      <CTABanner
        title="See what SMSLocal could do for your team"
        subtitle="Tell us about your use case and the metric you care about — we’ll show you a relevant example and a starting point."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>Case studies — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ResourcesCaseStudies
