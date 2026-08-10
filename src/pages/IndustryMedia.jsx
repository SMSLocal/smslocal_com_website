import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import IndustryCarousel from '../components/IndustryCarousel.jsx'
import StepsChevron from '../components/StepsChevron.jsx'
import WhyUsTiltBadges from '../components/WhyUsTiltBadges.jsx'
import { IconMic, IconBell, IconChart, IconCheck, IconClock, IconUsers, IconBolt, IconGlobe, IconPlug, IconGear, IconRocket } from '../components/icons.jsx'
import MediaBroadcastHeroMock from '../components/MediaBroadcastHeroMock.jsx'

const STEPS = [
  { icon: <IconPlug />, title: 'Connect ticketing & billing', desc: 'Link your ticketing platform, billing system and subscriber database.' },
  { icon: <IconGear />, title: 'Train on your catalogue', desc: 'The agent learns your content, events and subscription plans.' },
  { icon: <IconRocket />, title: 'Go live across channels', desc: 'Launch on your app, WhatsApp and SMS ready for peak traffic from day one.' },
  { icon: <IconCheck />, title: 'Recommendations run automatically', desc: 'Renewal reminders and personalised suggestions start the moment subscriber data connects.' },
]

const FEATURES = [
  { icon: <IconMic />, title: 'Ticketing & access support', desc: 'Handles ticket transfers, access code issues and event questions instantly, even during a rush.' },
  { icon: <IconChart />, title: 'Personalised recommendations', desc: 'Suggests content or events based on viewing and purchase history, sent through the channel a subscriber actually checks.' },
  { icon: <IconBell />, title: 'Renewal & billing automation', desc: 'Automated reminders before a subscription lapses, plus instant answers on billing and plan changes.' },
  { icon: <IconGlobe />, title: 'One agent, every channel', desc: 'The same agent answers on your app, WhatsApp and SMS, with a consistent view of every subscriber.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'Absorbs traffic spikes', desc: 'On-sale moments and premiere nights don\'t overwhelm support — the agent scales with demand automatically.' },
  { icon: <IconBolt />, title: 'Lower involuntary churn', desc: 'Proactive billing and renewal reminders catch lapses before they become cancellations.' },
  { icon: <IconUsers />, title: 'Frees your team for content, not tickets', desc: 'Routine access and billing questions resolve automatically, freeing staff for partnership and content work.' },
  { icon: <IconCheck />, title: 'Consistent subscriber experience', desc: 'The same accurate answers whether a fan reaches out on the app, WhatsApp or SMS.' },
]

const FAQS = [
  { q: 'Can it handle a sudden spike, like a ticket on-sale?', a: 'Yes — since it isn\'t a human queue, response time stays instant even when volume jumps 10x in minutes.' },
  { q: 'Can the agent resolve billing issues directly?', a: 'Connected to your billing platform, it can look up plan status, process simple changes and answer charge questions without a ticket.' },
  { q: 'Does it send renewal reminders automatically?', a: 'Yes, broadcasting handles renewal and billing reminders across SMS and WhatsApp ahead of a lapse, reducing involuntary churn.' },
  { q: 'Can it recommend content or events based on subscriber history?', a: 'Yes, recommendation messaging is grounded in your actual subscriber data, not generic promotional content.' },
  { q: 'How fast can we launch before a major release or event?', a: 'Most media and entertainment teams connect their subscriber and ticketing data and go live within days.' },
]

function IndustryMedia() {
  return (
    <>
      <Seo
        title="Agentic AI for Media and Entertainment Care"
        description="Agentic AI for media and entertainment: ticketing, recommendations and subscriber support."
        keywords={['AI for media and entertainment', 'agentic AI media', 'subscriber care AI', 'entertainment AI agent']}
      />

      <Hero
        eyebrow="Media & Entertainment"
        title={<>Agentic AI that handles <span className="grad-word">premiere-night volume</span> like any other day</>}
        subtitle="Support ticketing, billing and subscriber questions instantly across every channel — and turn recommendation and renewal messaging into a growth engine, not an afterthought."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<MediaBroadcastHeroMock />}
      />

      <NarrativeCompare
        variant="resolve"
        eyebrow="The problem"
        heading={<>Audience attention peaks exactly when support can least keep up.</>}
        paragraphs={[
          'A ticket drop or premiere brings a flood of the same questions at once — agentic AI scales instantly, no matter how sharp the spike.',
        ]}
        leftLabel="Staffed for average volume"
        leftItems={[
          'Overwhelmed the moment a spike hits',
          'Renewal reminders sent as one generic blast',
          'Recommendations based on guesswork',
          'The re-engagement moment passes unanswered',
        ]}
        rightLabel="Agentic AI for media"
        rightItems={[
          'Scales instantly, 10x volume or not',
          'Renewal reminders timed to each subscriber',
          'Recommendations grounded in real history',
          'Answers, resolves and recommends in real time',
        ]}
        alt
      />

      <IndustryCarousel
        className="mfeat-carousel"
        eyebrow="Features"
        title="Built for spikes, not just steady traffic"
        subtitle="From a ticketing rush to a renewal reminder, one agent covers the whole subscriber lifecycle."
        items={FEATURES}
      />

      <StepsChevron
        eyebrow="How it works"
        title="Ready for peak volume in four steps"
        subtitle="From connecting your ticketing data to recommendations that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsTiltBadges
        eyebrow="Why it works"
        title="Every spike becomes an opportunity, not an outage"
        subtitle="Instant support and timely recommendations turn peak moments into retention, not churn."
        items={BENEFITS}
      />

      <CTABanner
        title="Support your audience at their busiest moment"
        subtitle="Deploy an agentic AI media and entertainment agent before your next big release."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for media and entertainment — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryMedia
