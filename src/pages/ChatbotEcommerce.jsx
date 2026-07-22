import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCart, IconReceipt, IconRefresh, IconUsers, IconChart, IconGlobe, IconClock, IconShield } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconCart />, title: 'Product discovery', desc: 'Guide shoppers to the right product with a few quick questions.' },
  { icon: <IconReceipt />, title: 'Order tracking (WISMO)', desc: 'Answer "where is my order" instantly, pulled from your store.' },
  { icon: <IconRefresh />, title: 'Returns automation', desc: 'Walk customers through a return or exchange without a ticket.' },
  { icon: <IconUsers />, title: 'Cart recovery', desc: 'Follow up on abandoned carts directly inside the chat.' },
]

const STEPS = [
  { title: 'Connect your store', desc: 'Sync product, order and returns data from Shopify or your platform.' },
  { title: 'Design your shopping flows', desc: 'Build discovery, WISMO and returns flows visually.' },
  { title: 'Go live on your channels', desc: 'Deploy to your website, WhatsApp and social from one bot.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Fewer WISMO tickets', desc: 'Order-status questions get answered instantly, no ticket needed.' },
  { icon: <IconGlobe />, title: 'Works with your platform', desc: 'Connects to Shopify and most major ecommerce platforms.' },
  { icon: <IconClock />, title: 'Shops 24/7', desc: 'Product discovery and support never sleep.' },
  { icon: <IconShield />, title: 'Accurate answers', desc: 'Replies pull real data from your store, not guesses.' },
]

const FAQS = [
  { q: 'Does this work with Shopify?', a: 'Yes, connect your Shopify store (or most major ecommerce platforms) to sync product, order and returns data.' },
  { q: 'Can it answer "where is my order" questions?', a: 'Yes, WISMO questions are answered instantly by pulling live order status from your store.' },
  { q: 'Can customers start a return through the bot?', a: 'Yes, a guided returns flow walks customers through eligibility and next steps without opening a ticket.' },
  { q: 'Does it recommend products?', a: 'Yes, a few guided questions help the bot recommend the right product for each shopper.' },
]

function ChatbotEcommerce() {
  return (
    <>
      <Seo
        title="Ecommerce Chatbot for Online Stores"
        description="Boost sales with an ecommerce chatbot — product discovery, order tracking (WISMO) and returns automation on WhatsApp, web and SMS."
        keywords={['retail chatbot', 'Shopify chatbot', 'chatbot for online store', 'product recommendation chatbot']}
      />

      <Hero
        eyebrow="Ecommerce"
        title={<>A chatbot that shops, tracks and <span className="grad-word">handles returns</span></>}
        subtitle="Product discovery, order tracking and returns automation — connected to your store, live on WhatsApp, web and SMS."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See Bulk SMS', href: '/bulk-sms' }}
      />

      <NarrativeCompare
        heading={<>A stockout answered wrong is a sale lost to a competitor.</>}
        paragraphs={[
          "Most storefront support runs on a support inbox that has no idea what is actually in stock, what a customer already ordered, or where that order currently sits.",
          "So a shopper asks a simple sizing or delivery question, waits hours for a reply, and by the time it arrives has already bought the same item somewhere else.",
          <>A storefront chatbot should answer from <strong>live product and order data, not a rep guessing</strong> — instantly, on whatever channel the shopper is already using.</>,
        ]}
        leftLabel="Generic support inbox"
        leftItems={[
          'Answers based on guesswork, not live stock',
          'WISMO questions wait for a human reply',
          'Returns require opening a separate ticket',
          'No idea what a shopper already has in cart',
        ]}
        rightLabel="Ecommerce chatbot, connected to your store"
        rightItems={[
          'Pulls real product and order data instantly',
          'Answers "where is my order" without a ticket',
          'Guides returns and exchanges in the chat itself',
          'Follows up on abandoned carts automatically',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for online stores</>} items={FEATURES} />

      <HowItWorks title={<>Connect your store in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why stores automate with our chatbot</>} items={WHY_US} />

      <CTABanner
        title="Connect your store today"
        subtitle="Product discovery, WISMO and returns — live in minutes."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>Ecommerce chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotEcommerce
