import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, EcosystemGrid, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import {
  IconGear, IconPackage, IconRefresh, IconFlask, IconBolt, IconGlobe, IconChart, IconShield,
  IconChat, IconPencil, IconClock, IconLink, IconCart, IconCalendar, IconDollar, IconBook,
} from '../components/icons.jsx'
import SmsApiHeroMock from '../components/SmsApiHeroMock.jsx'
import StatBand from '../components/StatBand.jsx'
import CodeTabs from '../components/CodeTabs.jsx'

const API_STATS = [
  { icon: <IconBolt />, value: '99.9%', label: 'Uptime SLA', desc: 'Carrier-grade infrastructure, monitored continuously.' },
  { icon: <IconGlobe />, value: '190+', label: 'Countries reachable', desc: 'Direct carrier routes, not resold intermediaries.' },
  { icon: <IconClock />, value: 'Seconds', label: 'Typical delivery', desc: 'From API call to handset on supported routes.' },
  { icon: <IconFlask />, value: 'Sandbox', label: 'Before production', desc: 'Test every flow without spending a credit.' },
]

const FEATURES = [
  { icon: <IconGear />, title: 'REST API', desc: 'Simple, well-documented REST endpoints for sending and receiving SMS.' },
  { icon: <IconPackage />, title: 'SDKs & code samples', desc: 'Client libraries and copy-paste snippets for popular languages.' },
  { icon: <IconRefresh />, title: 'Delivery webhooks', desc: 'Get real-time delivery receipts and inbound replies via webhook.' },
  { icon: <IconChat />, title: 'Two-way messaging', desc: 'Receive replies on a long number and route them into your app.' },
  { icon: <IconPencil />, title: 'Templates & sender IDs', desc: 'Reusable message templates under your own branded sender ID.' },
  { icon: <IconFlask />, title: 'Sandbox testing', desc: 'Test flows safely before sending to real numbers in production.' },
]

const STEPS = [
  { title: 'Get your API key', desc: 'Sign up and grab your API key from the developer dashboard.' },
  { title: 'Send your first request', desc: 'POST a message with our REST API or an official SDK.' },
  { title: 'Handle delivery events', desc: 'Subscribe to webhooks for delivery status and inbound messages.' },
]

const SAMPLES = [
  {
    label: 'cURL',
    code: `curl -X POST https://api.smslocal.com/v1/messages \\
  -H "Authorization: Bearer $SMSLOCAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+14155550123",
    "from": "SMSLOCAL",
    "text": "Your verification code is 481920."
  }'`,
  },
  {
    label: 'Node.js',
    code: `import SmsLocal from "@smslocal/node"

const client = new SmsLocal(process.env.SMSLOCAL_API_KEY)

const message = await client.messages.create({
  to: "+14155550123",
  from: "SMSLOCAL",
  text: "Your verification code is 481920.",
})

console.log(message.id, message.status)`,
  },
  {
    label: 'Python',
    code: `import os
from smslocal import SmsLocal

client = SmsLocal(api_key=os.environ["SMSLOCAL_API_KEY"])

message = client.messages.create(
    to="+14155550123",
    sender="SMSLOCAL",
    text="Your verification code is 481920.",
)

print(message.id, message.status)`,
  },
  {
    label: 'PHP',
    code: `<?php
require 'vendor/autoload.php';

use SmsLocal\\Client;

$client = new Client(getenv('SMSLOCAL_API_KEY'));

$message = $client->messages->create([
    'to'   => '+14155550123',
    'from' => 'SMSLOCAL',
    'text' => 'Your verification code is 481920.',
]);

echo $message->id . ' ' . $message->status;`,
  },
]

const INDUSTRIES = [
  { icon: <IconCart />, title: 'Retail & ecommerce', desc: 'Order confirmations, dispatch alerts and delivery windows, fired straight from your backend.' },
  { icon: <IconCalendar />, title: 'Clinics & healthcare', desc: 'Appointment reminders scheduled by your booking system, no staff time required.' },
  { icon: <IconDollar />, title: 'Banking & fintech', desc: 'One-time passcodes and transaction alerts on a channel that works without a data connection.' },
  { icon: <IconBook />, title: 'Schools & universities', desc: 'Campus alerts and result notifications pushed to thousands of numbers in one call.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: '99.9% uptime', desc: 'Carrier-grade infrastructure built for production traffic.' },
  { icon: <IconGlobe />, title: 'Global reach', desc: 'Send to 190+ countries through direct carrier connections.' },
  { icon: <IconChart />, title: 'Detailed logs', desc: 'Full message logs and delivery analytics via API or dashboard.' },
  { icon: <IconShield />, title: 'Secure auth', desc: 'API key and OAuth-based authentication with scoped permissions.' },
  { icon: <IconRefresh />, title: 'Idempotent sends', desc: 'Retry a failed request safely without double-charging a customer.' },
  { icon: <IconLink />, title: 'Predictable rate limits', desc: 'Documented limits and clear headers, so scale never surprises you.' },
]

const FAQS = [
  { q: 'What can I build with the SMS API?', a: 'Anything from OTP verification and transactional alerts to two-way conversational flows and bulk marketing sends.' },
  { q: 'Which languages have SDKs?', a: 'Official SDKs are available for common backend languages; the REST API works with any HTTP client otherwise.' },
  { q: 'How do I receive inbound SMS replies?', a: 'Configure a webhook URL in your dashboard — inbound messages are POSTed to it in real time.' },
  { q: 'How do you handle authentication?', a: 'Requests are authenticated with a bearer API key. Keys are scoped, so a key used by one service can be rotated or revoked without touching the rest.' },
  { q: 'What happens if a request fails midway?', a: 'Send requests accept an idempotency key. If you retry after a timeout, the same key returns the original result instead of sending a second message.' },
  { q: 'Is there a sandbox for testing?', a: 'Yes, a sandbox mode lets you test your integration without sending real messages or being charged.' },
]

function SmsApi() {
  return (
    <>
      <Seo
        title="SMS API — Programmable Text Messaging"
        description="Integrate SMS in minutes with our programmable SMS API. Global reach, carrier-grade delivery, code samples and 99.9% uptime."
      />

      <Hero
        eyebrow="Developer"
        title={<>Programmable <span className="grad-word">SMS API</span> for developers</>}
        subtitle="Integrate SMS into your product in minutes. Global reach, carrier-grade delivery, and webhooks for delivery receipts and inbound replies."
        primaryCta={{ label: 'Get API Key', href: '/contact-us' }}
        secondaryCta={{ label: 'View Docs', href: '/resources/docs' }}
        visual={<SmsApiHeroMock />}
      />

      <StatBand
        title="Built to be boring in production"
        subtitle="The API you integrate once and stop thinking about — because it keeps doing exactly what the docs said it would."
        items={API_STATS}
        alt
      />

      <NarrativeCompare
        heading={<>Most SMS integrations are an afterthought bolted onto a bigger platform.</>}
        paragraphs={[
          "A lot of messaging providers treat their API as a side door — undocumented edge cases, rate limits that surprise you in production, and support tickets that take days for something as basic as a failed delivery.",
          'That works fine in a demo. It falls apart the moment you\'re sending real volume and a customer is waiting on an OTP that never arrives.',
          <>A programmable SMS API should be <strong>the product, not an afterthought</strong> — documented, monitored, and built to handle production traffic from day one.</>,
        ]}
        leftLabel="Bolted-on SMS"
        leftItems={[
          'Thin docs, edge cases you discover in production',
          'Rate limits that surprise you at scale',
          'Delivery status you have to poll for',
          'Support tickets for basic integration questions',
        ]}
        rightLabel="SMS API, built as the product"
        rightItems={[
          'Full REST reference and official SDKs',
          'Carrier-grade infrastructure, built for volume',
          'Real-time delivery webhooks',
          'Sandbox testing before you touch production',
        ]}
      />

      <CodeTabs
        title="One POST request, message sent"
        subtitle="No SDK required to get started — but there's one waiting if you'd rather not hand-roll HTTP."
        note="Every send returns a message ID you can use to trace delivery through the logs."
        samples={SAMPLES}
        alt
      />

      <FeatureGrid title={<>Everything you need to integrate SMS</>} items={FEATURES} />

      <HowItWorks title={<>Send your first message in three steps</>} steps={STEPS} alt />

      <EcosystemGrid
        title="What teams ship on the API"
        subtitle="The same endpoint, wired into very different products."
        items={INDUSTRIES}
      />

      <WhyUs title={<>Built for production traffic</>} items={WHY_US} alt />

      <CTABanner
        title="Start building with the SMS API"
        subtitle="Get your API key and send a test message in minutes."
        cta={{ label: 'Get API Key', href: '/contact-us' }}
      />

      <FAQ title={<>SMS API — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default SmsApi
