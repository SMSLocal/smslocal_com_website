import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import CaseStudiesGrowthHero from '../components/CaseStudiesGrowthHero.jsx'
import CaseStudyDossier from '../components/CaseStudyDossier.jsx'
import CaseStudyOnRecord from '../components/CaseStudyOnRecord.jsx'
import CaseStudyReviews from '../components/CaseStudyReviews.jsx'
import RolloutTimeline from '../components/RolloutTimeline.jsx'

/* Customer accounts as published on smslocal.com/case-study — the challenge,
   solution, reported results and signed quote each company gave us. */
const RECORDS = [
  {
    company: 'Check Point',
    mono: 'CP',
    logo: '/logos/checkpoint.png',
    avatar: '/avatars/checkpoint.jpg',
    industry: 'Cybersecurity solutions',
    products: 'Bulk SMS, delivery reporting',
    tenure: 'Ongoing',
    challenge:
      'Check Point needed to reach customers and partners timely and efficiently with updates, alerts, and promotional messages.',
    solution:
      'Partnered with SMSLocal for bulk SMS services, leveraging their user-friendly platform and high delivery rates.',
    stack: ['Bulk SMS', 'Alerts & updates', 'Promotional campaigns', 'Delivery reports'],
    results: [
      { text: 'Sent timely alerts and updates to customers and partners' },
      { text: 'Improved customer engagement and satisfaction levels' },
      { text: 'Ran successful promotional campaigns via SMS' },
      { text: 'Achieved a significant increase in sales and revenue' },
      { text: 'Gained the ability to track and analyse campaign performance' },
      { text: 'Detailed reports on delivery status, open rates and response rates' },
    ],
    quote: {
      text: 'SMSLocal helps us connect over 700 buildings and 16,000 conference rooms worldwide.',
      author: 'Mr. Crystino Ronald',
      role: 'Check Point · Cybersecurity solutions',
    },
  },
  {
    company: 'Applimore',
    mono: 'AP',
    logo: '/logos/applimore.png',
    avatar: '/avatars/applimore.jpg',
    industry: 'Mobile app development',
    products: 'SMS marketing, segmentation, analytics',
    tenure: 'Over a year',
    challenge:
      'Applimore sought cost-effective customer communication methods and recognised that many users preferred receiving updates via text message. The company needed a way to increase engagement with its large user base across its e-commerce, healthcare and entertainment applications.',
    solution:
      'Applimore partnered with SMSLocal to implement SMS marketing — creating and scheduling personalised messages, segmenting the user base for targeted campaigns, tracking delivery and reporting on campaign performance.',
    stack: ['Personalised messaging', 'Scheduling', 'Audience segmentation', 'Delivery tracking', 'Campaign analytics'],
    results: [
      { text: 'Significant increase in customer engagement and retention' },
      { text: 'Better able to inform users about app updates, promotions and key information' },
      { text: 'Campaigns optimised by monitoring open rates and click-through rates' },
      { text: 'Data-driven insights that identified customer messaging preferences' },
    ],
    quote: {
      text: 'We have been using SMSLocal for over a year now, and we have had an excellent experience with their service. Their platform is easy to use, and we have found it to be a cost-effective way to communicate with our customers.',
      author: 'Mr. Joseph R. Woods',
      role: 'Applimore · Mobile app development',
    },
  },
  {
    company: 'NewConnect World',
    mono: 'NW',
    logo: '/logos/newconnect-world.png',
    avatar: '/avatars/newconnect-world.jpg',
    industry: 'E-commerce · electronic gadgets and accessories',
    products: 'Bulk SMS, personalised discount codes',
    tenure: 'Several months',
    challenge:
      'The company needed to reach a large customer base and increase sales during the festive season through targeted marketing campaigns.',
    solution:
      'NewConnect World partnered with SMSLocal to execute a bulk SMS campaign. They uploaded their customer list, and SMSLocal helped create customised SMS messages with a unique discount code for each customer, including call-to-action messaging.',
    stack: ['Bulk SMS', 'Customer list upload', 'Unique discount codes', 'Call-to-action messaging'],
    results: [
      { text: 'A significant increase in website traffic and sales during the festive season' },
      { text: 'Customers appreciated the personalised approach and felt valued by the company' },
      { text: 'Consistently high delivery rates on messages sent' },
    ],
    quote: {
      text: 'I have been using SMSLocal for my business for several months now and I am extremely satisfied with their services. Additionally, the delivery rates of my messages have been consistently high.',
      author: 'Mr. Mike J. Buckley',
      role: 'NewConnect World · E-commerce',
    },
  },
  {
    company: 'Jenny Fashion',
    mono: 'JF',
    logo: '/logos/jenny-fashion.png',
    avatar: '/avatars/jenny-fashion.jpg',
    industry: 'Online fashion retail',
    products: 'SMS marketing, segmentation, transactional alerts',
    tenure: 'Ongoing',
    challenge:
      'Jenny Fashion needed to increase customer engagement and drive sales through more effective communication channels.',
    solution:
      'The company implemented SMSLocal’s SMS marketing platform — running targeted campaigns to segmented customer groups, using advanced segmentation based on customer preferences and purchase history, and sending time-sensitive alerts such as order confirmations, shipping updates and abandoned-cart reminders.',
    stack: ['Targeted campaigns', 'Purchase-history segmentation', 'Order confirmations', 'Shipping updates', 'Abandoned-cart reminders'],
    headline: {
      value: '25%',
      text: 'more website traffic, and a 20% increase in sales, after switching on targeted SMS.',
    },
    results: [
      { value: '25%', text: 'Increase in website traffic' },
      { value: '20%', text: 'Increase in sales' },
      { text: 'Positive customer feedback on the personalised SMS communications' },
    ],
    quote: {
      text: 'I was hesitant to use SMS marketing for my business, but SMSLocal has made it so easy and effective. The platform is user-friendly and the delivery rates are impressive.',
      author: 'Ms. Tina P. Jackson',
      role: 'Jenny Fashion · Online fashion retail',
    },
  },
]

/* Statements as published on the case-study index. */
const ON_RECORD = [
  {
    area: 'Omnichannel contact centre',
    company: 'Check Point',
    mono: 'CP',
    logo: '/logos/checkpoint.png',
    industry: 'Cybersecurity solutions',
    quote: 'SMSLocal’s omnichannel contact centre solution has been instrumental in enabling us to deliver consistent and seamless CX across multiple communication channels.',
  },
  {
    area: 'Workforce management',
    company: 'Applimore',
    mono: 'AP',
    logo: '/logos/applimore.png',
    industry: 'Mobile app development',
    quote: 'SMSLocal’s workforce management tools have been a huge asset for our call centre operations.',
    note: 'We’re now able to forecast staffing needs far more reliably than before.',
  },
  {
    area: 'Predictive dialler & call routing',
    company: 'Jenny Fashion',
    mono: 'JF',
    logo: '/logos/jenny-fashion.png',
    industry: 'Online fashion retail',
    quote: 'The predictive dialler and intelligent call routing have helped our reps focus on the most promising leads.',
    note: 'We really appreciated SMSLocal’s flexibility throughout the rollout.',
  },
]

/* Star-rated reviews from the carousel on the live case-study index. */
const REVIEWS = [
  {
    stars: 5,
    quote: 'What I like most about SMSLocal is their ability to provide real-time delivery reports, which allows me to track the success of my SMS campaigns. I also appreciate their customer support team, who are always available to answer any questions I have and provide assistance whenever I need it.',
    author: 'Mr. Crystino Ronald',
    company: 'Check Point',
    industry: 'Cybersecurity solutions',
    logo: '/logos/checkpoint.png',
  },
  {
    stars: 5,
    quote: 'I have been using SMSLocal for my business for several months now and I am extremely satisfied with their services. Additionally, the delivery rates of my messages have been consistently high, ensuring that my customers receive the information they need in a timely manner.',
    author: 'Mr. Mike J. Buckley',
    company: 'NewConnect World',
    industry: 'E-commerce',
    logo: '/logos/newconnect-world.png',
  },
  {
    stars: 5,
    quote: 'We have been using SMSLocal for over a year now, and we have had an excellent experience with their service. Their platform is easy to use, and we have found it to be a cost-effective way to communicate with our customers.',
    author: 'Mr. Joseph R. Woods',
    company: 'Applimore',
    industry: 'Mobile app development',
    logo: '/logos/applimore.png',
  },
  {
    stars: 5,
    quote: 'I was hesitant to use SMS marketing for my business, but SMSLocal has made it so easy and effective. The platform is user-friendly and the delivery rates are impressive. I’m now able to keep my customers informed about new products and promotions in a way that’s convenient for them.',
    author: 'Ms. Tina P. Jackson',
    company: 'Jenny Fashion',
    industry: 'Online fashion retail',
    logo: '/logos/jenny-fashion.png',
  },
]

const FAQS = [
  {
    q: 'Are these real customers?',
    a: 'Yes. Check Point, Applimore and Jenny Fashion are live SMSLocal accounts, and each case study is published with that company’s permission. The challenge, solution and results on this page are their own account of the work — we don’t write outcomes on a customer’s behalf.',
  },
  {
    q: 'Where do the numbers come from?',
    a: 'Every figure shown is one the customer reported themselves — Jenny Fashion’s 25% lift in website traffic and 20% lift in sales, for example, come from their own analytics after the SMS programme went live. Where a customer described an outcome without a number, we quote it as they described it rather than attaching a figure to it.',
  },
  {
    q: 'Can I speak to a reference customer?',
    a: 'Usually, yes. Tell us your industry and use case and we’ll try to connect you with a customer running something comparable, subject to their availability and consent.',
  },
  {
    q: 'How quickly did these companies see results?',
    a: 'It varies with the use case. Transactional messaging like order confirmations and delivery alerts starts producing data within days of going live; engagement and retention gains of the kind Applimore describes built up over the year they’ve been on the platform.',
  },
  {
    q: 'Can you build a case for my industry?',
    a: 'Tell us your use case and the metric you care about — response time, engagement, deliverability, conversion — and we’ll map the closest customer story we have and a starting point for your own rollout.',
  },
]

function ResourcesCaseStudies() {
  return (
    <>
      <Seo
        title="Customer Case Studies"
        description="Real SMSLocal customers in their own words — how they use SMS to grow engagement and sales."
        keywords={['SMSLocal case studies', 'SMS marketing case study', 'bulk SMS success stories', 'Check Point SMSLocal', 'Jenny Fashion SMS marketing']}
      />

      <Hero
        eyebrow="Case Studies"
        title={<><span className="grad-word">Real results</span>, in our customers&rsquo; words</>}
        subtitle="Experience firsthand how SMSLocal is revolutionising the way global enterprises communicate and deliver exceptional customer experiences — told by the companies that did it."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Solutions', href: '/products/' }}
        visual={<CaseStudiesGrowthHero />}
      />

      <CaseStudyDossier
        eyebrow="Customer stories"
        title={<>Four customers, on the record</>}
        subtitle="Pick a company to read what they said — and open the full account when you want the detail."
        items={RECORDS}
        alt
      />

      <CaseStudyReviews
        eyebrow="Rated by our customers"
        title={<>Five stars, four businesses</>}
        subtitle="Short reviews from the same teams — on delivery rates, reporting and the support behind them."
        items={REVIEWS}
      />

      <CaseStudyOnRecord
        eyebrow="Why brands big &amp; small love SMSLocal"
        title={<>Elsewhere on the platform</>}
        subtitle="The same companies on the other parts of SMSLocal they use day to day."
        items={ON_RECORD}
        footnote="Each statement is published with the customer's written permission and attributed to the company that gave it. We don't publish anonymous or composite quotes."
        alt
      />

      <RolloutTimeline />

      <CTABanner
        title="See what SMSLocal could do for your team"
        subtitle="Tell us about your use case and the metric you care about — we&rsquo;ll show you the closest customer story we have and a starting point."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Case studies &mdash; frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ResourcesCaseStudies
