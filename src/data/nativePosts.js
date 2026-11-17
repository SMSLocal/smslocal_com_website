// Hand-authored posts, not scraped from WordPress (see scripts/transform-smslocal-blogs.mjs
// for the imported archive). Added to fill traffic-bearing URLs from the old
// site that had no equivalent content here — see
// scripts/merge-native-posts.mjs, which appends these into
// src/data/importedPosts.generated.json so they get the exact same
// prerendering, sitemap and llms.txt treatment as every imported post.
//
// Same block schema as the imported archive (see src/pages/blog/BodyBlocks.jsx),
// but paragraphs/list items use plain `text` instead of `rich` runs wherever
// there's no inline link/bold needed — simpler to author by hand.

const houseAuthor = {
  name: 'SMSLocal',
  initials: 'SL',
  role: 'Editorial Team',
  bio: 'This communications platform’s unmatched reach and effectiveness cannot be matched by any other form or technology on offer today.',
}

const DATE_ISO = '2026-09-25'
const DATE_DISPLAY = 'September 25, 2026'

function post(p) {
  return {
    sourceUrl: null,
    sourceType: 'native',
    categories: [p.category],
    tags: p.keywords ? [p.keywords] : [],
    date: DATE_DISPLAY,
    dateISO: DATE_ISO,
    author: houseAuthor,
    publishedISO: `${DATE_ISO}T00:00:00.000Z`,
    modifiedISO: `${DATE_ISO}T00:00:00.000Z`,
    cover: null,
    sourceCover: null,
    coverAlt: null,
    faqs: [],
    ...p,
  }
}

const nativePosts = [
  post({
    slug: 'what-is-text-message-rcs-mean',
    routePath: '/blog/what-is-text-message-rcs-mean/',
    title: 'What Does "RCS" Mean in a Text Message?',
    metaTitle: 'What Does RCS Mean in Texting?',
    metaDescription: 'RCS stands for Rich Communication Services — the messaging standard replacing SMS with typing indicators, read receipts and high-res media.',
    keywords: 'rcs meaning, what does rcs mean, text message rcs meaning',
    category: 'Text Meanings',
    readTime: '3 min read',
    words: 480,
    excerpt: 'RCS stands for Rich Communication Services — a quick answer, plus what it actually changes about how your messages look and work.',
    body: [
      {
        type: 'p',
        text: 'If a message thread on your phone suddenly says "Chatting via RCS" instead of the usual "Text Message" label, you\'ve run into Rich Communication Services — RCS for short. It\'s the technology quietly replacing plain SMS as the default way phones talk to each other.',
      },
      { type: 'h2', text: 'RCS Stands For Rich Communication Services', anchor: null },
      {
        type: 'p',
        text: 'RCS is a messaging protocol built to do everything SMS and MMS never could: typing indicators, read receipts, high-resolution photos and videos, larger group chats, and messages sent over Wi-Fi or mobile data instead of the older cellular signaling channel SMS relies on. It\'s effectively the same leap WhatsApp and iMessage made over standard texting — except RCS is meant to work as the default, carrier-level replacement for SMS itself, not a separate app.',
      },
      { type: 'h2', text: 'How Is RCS Different From a Regular Text?', anchor: null },
      {
        type: 'ul',
        items: [
          'Read receipts and typing indicators, the way messaging apps behave',
          'Full-resolution photos and video instead of heavily compressed MMS',
          'Group chats with named participants, not just a merged thread',
          'Sent over an internet connection (Wi-Fi or data), not the old SMS network',
        ],
      },
      { type: 'h2', text: 'When Do You See "RCS" on Your Phone?', anchor: null },
      {
        type: 'p',
        text: 'Android\'s Google Messages app enables RCS automatically once both people in a conversation have it turned on and a working data connection — the bubble color and "Chatting via RCS" label under the recipient\'s name are the tell. If either side loses signal or turns RCS off, the same conversation quietly drops back to standard SMS/MMS, which is why the label can flip back and forth in one thread.',
      },
      {
        type: 'p',
        text: 'For businesses, RCS is also the technology behind rich, brand-verified business messages — see our guide on ',
      },
      {
        type: 'ul',
        items: ['RCS vs. SMS, if you want the full side-by-side comparison', 'What RCS business messaging looks like for customer-facing texts'],
      },
    ],
  }),

  post({
    slug: 'what-is-rcs-messaging',
    routePath: '/blog/what-is-rcs-messaging/',
    title: 'What Is RCS Messaging? A Complete Guide',
    metaTitle: 'What Is RCS Messaging?',
    metaDescription: 'RCS messaging explained: how Rich Communication Services works, what it adds over SMS, and what it means for businesses texting customers.',
    keywords: 'what is rcs messaging, rcs business messaging, rcs chat',
    category: 'SMS Insights',
    readTime: '6 min read',
    words: 1350,
    excerpt: 'RCS (Rich Communication Services) is the GSMA-backed successor to SMS — here\'s how it actually works, what it changes, and where it still falls short.',
    body: [
      {
        type: 'p',
        text: 'RCS — Rich Communication Services — is a messaging standard designed to replace plain SMS with something closer to a modern chat app: read receipts, typing indicators, high-resolution media, and richer group conversations, all without requiring either side to install a separate app.',
      },
      { type: 'h2', text: 'Key Takeaways', anchor: null },
      {
        type: 'ul',
        items: [
          'RCS is a carrier- and Google-backed standard (GSMA Universal Profile), not a single company\'s app.',
          'It runs over Wi-Fi or mobile data, unlike SMS, which uses the cellular signaling channel.',
          'Both people in a conversation need RCS support and a working connection, or it falls back to SMS/MMS automatically.',
          'For businesses, RCS enables verified sender branding, rich cards, and interactive reply buttons inside the native messaging app.',
          'Apple added RCS support in iOS 18, so iPhone-to-Android RCS conversations are now possible — though iMessage-to-iMessage still uses its own protocol.',
        ],
      },
      { type: 'h2', text: 'How RCS Works', anchor: null },
      {
        type: 'p',
        text: 'Traditional SMS travels over the same signaling channel phones use to set up calls — a decades-old, low-bandwidth pathway that caps messages at 160 characters and can\'t carry real photos or video (that\'s what MMS, a separate and more limited protocol, is for). RCS abandons that channel entirely and sends messages as structured data over an internet connection, the same way any modern messaging app does.',
      },
      {
        type: 'p',
        text: 'That single change is what unlocks everything else: because RCS messages are just data packets, not squeezed into the old SMS format, they can carry full-size images and video, deliver typing indicators and read receipts, and support named group chats instead of the confusing merged threads SMS group texts create.',
      },
      { type: 'h2', text: 'RCS vs. SMS: What Actually Changes', anchor: null },
      {
        type: 'table',
        head: [['Feature'], ['SMS/MMS'], ['RCS']],
        rows: [
          [['Delivery channel'], ['Cellular signaling network'], ['Wi-Fi or mobile data']],
          [['Read receipts'], ['No'], ['Yes']],
          [['Typing indicators'], ['No'], ['Yes']],
          [['Media quality'], ['Heavily compressed'], ['Full resolution']],
          [['Group chats'], ['Merged thread, no names'], ['Named participants']],
          [['Character limit'], ['160 per segment'], ['No practical limit']],
          [['Fallback'], ['—'], ['Drops to SMS automatically if unsupported']],
        ],
      },
      { type: 'h2', text: 'RCS for Businesses', anchor: null },
      {
        type: 'p',
        text: 'The business version of RCS — often called RCS Business Messaging — lets a verified brand send messages that show up with a logo, a verified checkmark, and rich interactive elements: carousels of products, suggested-reply buttons, and calendar or map actions the customer can tap without leaving the thread. It sits in the same inbox as a customer\'s personal texts, rather than a separate app they need to be convinced to download.',
      },
      {
        type: 'p',
        text: 'That matters for open rates: a business text delivered as a verified, media-rich RCS message reads very differently from an unbranded SMS from an unknown number, and customers are more likely to trust and engage with it.',
      },
      { type: 'h2', text: 'Limitations Worth Knowing', anchor: null },
      {
        type: 'ul',
        items: [
          'Both sender and recipient need RCS support and a data connection — it isn\'t guaranteed the way SMS delivery is.',
          'Carrier and regional rollout has been uneven; some markets still lean heavily on SMS or app-based messaging (WhatsApp, LINE, KakaoTalk) instead.',
          'Business RCS requires going through a registered aggregator and brand verification process, similar in spirit to SMS sender ID registration.',
        ],
      },
      { type: 'h2', text: 'Wrapping Up', anchor: null },
      {
        type: 'p',
        text: 'RCS is best understood as SMS catching up to what messaging apps have offered for over a decade — richer media, real-time status, and branded business messaging — without asking anyone to install anything new. It doesn\'t replace SMS outright yet (the automatic fallback is the whole point), but for both personal chats and business messaging, it\'s steadily becoming the default rather than the exception.',
      },
    ],
  }),

  post({
    slug: 'rcs-vs-sms',
    routePath: '/blog/rcs-vs-sms/',
    title: 'RCS vs. SMS: What\'s the Difference?',
    metaTitle: 'RCS vs SMS: Key Differences',
    metaDescription: 'RCS vs SMS compared: delivery method, media support, read receipts, and which one businesses should rely on for customer messaging.',
    keywords: 'rcs vs sms, difference between rcs and sms, rcs messages vs sms',
    category: 'SMS Insights',
    readTime: '5 min read',
    words: 950,
    excerpt: 'RCS and SMS both land in the same messaging app, but they\'re fundamentally different technologies underneath — here\'s what that means in practice.',
    body: [
      {
        type: 'p',
        text: 'RCS and SMS often show up in the exact same conversation thread, which makes them easy to confuse. They\'re not the same technology, though — SMS is a 1980s-era protocol built for 160-character messages over the cellular network, while RCS is a modern, internet-based standard designed to compete with apps like WhatsApp and iMessage.',
      },
      { type: 'h2', text: 'The Core Difference', anchor: null },
      {
        type: 'p',
        text: 'SMS travels over the cellular signaling channel — the same low-bandwidth pathway phones use to negotiate calls — which is why it\'s capped at 160 characters per segment and can\'t reliably carry photos or video (MMS handles that separately, and poorly). RCS sends messages as data over Wi-Fi or mobile data, the same way any chat app does, which removes those limits entirely.',
      },
      { type: 'h2', text: 'Side-by-Side Comparison', anchor: null },
      {
        type: 'table',
        head: [['Feature'], ['SMS'], ['RCS']],
        rows: [
          [['Requires internet connection'], ['No'], ['Yes']],
          [['Delivery guarantee'], ['Near-universal'], ['Falls back to SMS if unsupported']],
          [['Read receipts'], ['No'], ['Yes']],
          [['High-res photos/video'], ['No (MMS is compressed)'], ['Yes']],
          [['Group chat with names'], ['No'], ['Yes']],
          [['Works across carriers/countries'], ['Yes, universally'], ['Improving, but not universal yet']],
          [['Business branding'], ['Plain number or short code'], ['Verified name, logo, rich cards']],
        ],
      },
      { type: 'h2', text: 'Why SMS Still Matters', anchor: null },
      {
        type: 'p',
        text: 'SMS\'s one real advantage is reach: it works on every phone, on every carrier, with no data connection and no app required — including basic feature phones. That\'s exactly why time-sensitive, must-arrive messages like one-time passcodes, appointment reminders, and delivery alerts are still overwhelmingly sent as plain SMS rather than RCS: a business can\'t control whether a customer\'s device or carrier supports RCS, but SMS delivery is close to guaranteed.',
      },
      { type: 'h2', text: 'Why RCS Matters for Customer Engagement', anchor: null },
      {
        type: 'p',
        text: 'For messages where the goal is engagement rather than guaranteed delivery — a promotion with a product carousel, a support message with a quick-reply button, a booking confirmation with a map link — RCS gives a business far more room to work with, and it shows up looking like a real, trusted brand instead of an anonymous number.',
      },
      { type: 'h2', text: 'Which One Should a Business Use?', anchor: null },
      {
        type: 'p',
        text: 'In practice, most businesses use both: SMS as the dependable fallback for critical, time-sensitive messages, and RCS where it\'s supported to add rich media and branding for marketing and engagement messages. A messaging platform that automatically falls back from RCS to SMS when a recipient can\'t receive RCS gets the best of both without the business having to track device support itself.',
      },
    ],
  }),

  post({
    slug: 'how-to-change-from-rcs-to-sms',
    routePath: '/blog/how-to-change-from-rcs-to-sms/',
    title: 'How to Change From RCS to SMS on Your Phone',
    metaTitle: 'How to Switch From RCS to SMS',
    metaDescription: 'Turn RCS chat features off and switch a conversation or your whole phone back to standard SMS/MMS texting, on Android and iPhone.',
    keywords: 'how to change from rcs to sms, how to switch from sms to rcs, turn off rcs',
    category: 'SMS Insights',
    readTime: '3 min read',
    words: 520,
    excerpt: 'If RCS chat features are causing trouble — messages not sending, a contact stuck on "connecting" — here\'s how to switch back to plain SMS.',
    body: [
      {
        type: 'p',
        text: 'RCS chat features are usually an upgrade, but they can occasionally cause a message to get stuck, fail to send to a specific contact, or behave oddly right after switching phones or carriers. Turning RCS off drops every conversation back to plain, reliable SMS/MMS.',
      },
      { type: 'h2', text: 'On Android (Google Messages)', anchor: null },
      {
        type: 'ol',
        items: [
          'Open Google Messages and tap your profile photo in the top-right corner.',
          'Tap Messages settings.',
          'Tap RCS chats.',
          'Toggle Chat features off.',
        ],
      },
      {
        type: 'p',
        text: 'With chat features off, every conversation — including ones currently showing "Chatting via RCS" — falls back to standard SMS/MMS immediately. There\'s no waiting period and no need to restart the app.',
      },
      { type: 'h2', text: 'On iPhone (iOS 18 and Later)', anchor: null },
      {
        type: 'ol',
        items: [
          'Open Settings and tap Apps.',
          'Tap Messages.',
          'Toggle RCS Messaging off.',
        ],
      },
      {
        type: 'p',
        text: 'This only affects RCS conversations with Android users — iMessage-to-iMessage conversations between iPhones are a separate protocol and aren\'t changed by this setting.',
      },
      { type: 'h2', text: 'When Turning RCS Off Actually Helps', anchor: null },
      {
        type: 'ul',
        items: [
          'A message repeatedly fails to send or gets stuck showing "connecting"',
          'A specific contact\'s messages behave inconsistently after a carrier or SIM change',
          'You want to guarantee a message sends the same way every time, regardless of the recipient\'s connection',
        ],
      },
      {
        type: 'p',
        text: 'If the problem was specific to one contact rather than RCS generally, it\'s worth trying to send one plain-text message first (RCS quietly falls back to SMS on its own if the connection drops) before disabling the feature entirely.',
      },
    ],
  }),

  post({
    slug: 'how-to-send-an-sms-with-a-company-name',
    routePath: '/resources/insights/how-to-send-an-sms-with-a-company-name/',
    title: 'How to Send an SMS With a Company Name Instead of a Number',
    metaTitle: 'Send SMS With a Company Name (Sender ID)',
    metaDescription: 'Send text messages that show your business name instead of a phone number, using an alphanumeric Sender ID — how it works and where it\'s supported.',
    keywords: 'send sms with company name, alphanumeric sender id, sms sender name',
    category: 'SMS Insights',
    readTime: '5 min read',
    words: 900,
    excerpt: 'Instead of texting from a random number, a business can send SMS that shows its actual name in the sender field — here\'s how that works.',
    body: [
      {
        type: 'p',
        text: 'When a text message arrives showing "YourBrand" as the sender instead of a phone number, that\'s an alphanumeric Sender ID — a feature that lets a business replace the number a message comes from with its own name, up to 11 characters, letters and numbers only.',
      },
      { type: 'h2', text: 'What an Alphanumeric Sender ID Is', anchor: null },
      {
        type: 'p',
        text: 'A Sender ID is the "from" field a recipient sees on an SMS. By default, that\'s a long code or short code — a number. An alphanumeric Sender ID replaces it with up to 11 characters (letters, numbers, and some symbols), so a message reads as coming from, say, "SMSLOCAL" instead of "+1 555 0100".',
      },
      { type: 'h2', text: 'Why Businesses Use It', anchor: null },
      {
        type: 'ul',
        items: [
          'Instant brand recognition — a recipient knows who the text is from before opening it',
          'Higher trust than an unfamiliar number, which improves open and response rates',
          'No shared number: unlike a shared short code, the name is exclusively the sender\'s',
        ],
      },
      { type: 'h2', text: 'The Trade-Off: It\'s One-Way', anchor: null },
      {
        type: 'p',
        text: 'The most important limitation to know before choosing an alphanumeric Sender ID: a recipient cannot reply to it. There\'s no number behind the name to route a reply to, so alphanumeric Sender ID is best suited to one-way notifications — order confirmations, delivery updates, appointment reminders, marketing alerts — not conversational, two-way support texting. For two-way conversations, a long code or dedicated number is the right choice instead.',
      },
      { type: 'h2', text: 'Where It\'s Supported', anchor: null },
      {
        type: 'p',
        text: 'Alphanumeric Sender ID support varies significantly by country. Most of Europe, the UK, and much of Asia and the Middle East support it widely. The United States and Canada, by contrast, generally do not support alphanumeric Sender ID for standard SMS — carriers there require a registered long code or short code instead, partly for spam-prevention and traceability reasons.',
      },
      { type: 'h2', text: 'How to Get One', anchor: null },
      {
        type: 'ol',
        items: [
          'Choose a name up to 11 characters, letters and numbers only, that clearly represents the business.',
          'Register it through an SMS platform or gateway that supports Sender ID registration for the destination countries needed.',
          'Some countries require pre-approval or documentation before a new Sender ID goes live — this can take anywhere from same-day to a couple of weeks depending on the regulator.',
          'Use it for one-way sends; keep a real number or two-way-capable channel available for replies.',
        ],
      },
    ],
  }),

  post({
    slug: 'difference-between-a2p-and-p2p-sms-messaging',
    routePath: '/resources/insights/difference-between-a2p-and-p2p-sms-messaging/',
    title: 'A2P vs P2P SMS: What\'s the Difference?',
    metaTitle: 'A2P vs P2P SMS Explained',
    metaDescription: 'A2P (application-to-person) and P2P (person-to-person) SMS explained — the regulatory and technical differences, and why they\'re treated differently.',
    keywords: 'a2p vs p2p sms, p2p sms, application to person messaging',
    category: 'SMS Insights',
    readTime: '5 min read',
    words: 880,
    excerpt: 'Every text falls into one of two categories — A2P or P2P — and which one applies determines the rules, throughput, and registration a message needs.',
    body: [
      {
        type: 'p',
        text: 'Every SMS sent is either P2P (person-to-person) or A2P (application-to-person). The distinction isn\'t just technical trivia — it determines what registration is required, how fast messages can send, and which rules apply.',
      },
      { type: 'h2', text: 'P2P: Person-to-Person', anchor: null },
      {
        type: 'p',
        text: 'P2P is the SMS everyone is familiar with: one individual texting another individual from a personal phone number, at normal conversational pace. It carries no special registration requirements because it\'s assumed to be exactly what it looks like — two people talking.',
      },
      { type: 'h2', text: 'A2P: Application-to-Person', anchor: null },
      {
        type: 'p',
        text: 'A2P is a message sent by software — an application, a platform, a business system — to an individual. An OTP code, an appointment reminder, a delivery update, or a marketing blast are all A2P, even when they\'re a single message to a single person, because the sender is a system rather than a human typing on a phone.',
      },
      { type: 'h2', text: 'Why the Distinction Matters', anchor: null },
      {
        type: 'table',
        head: [['P2P'], ['A2P']],
        rows: [
          [['Sent from a personal number'], ['Sent from a business number, short code, or Sender ID']],
          [['No registration required'], ['Often requires business/campaign registration (e.g. 10DLC in the US)']],
          [['Low, human-paced volume'], ['Can send at high throughput, once approved']],
          [['Not filtered as spam by default'], ['Subject to carrier spam filtering if unregistered']],
        ],
      },
      {
        type: 'p',
        text: 'Carriers actively monitor for A2P traffic disguised as P2P — a business sending thousands of messages from what looks like a personal number — because that pattern is exactly how spam and phishing campaigns try to avoid registration requirements and filtering. Traffic that looks A2P but isn\'t properly registered gets throttled or blocked outright.',
      },
      { type: 'h2', text: 'What This Means for Businesses', anchor: null },
      {
        type: 'ul',
        items: [
          'Any automated or bulk messaging a business sends is A2P, regardless of volume — a single automated reminder counts.',
          'Registering A2P traffic properly (campaign registration, sender ID approval, brand verification depending on the country) is what keeps delivery rates high and avoids carrier filtering.',
          'An SMS platform that handles this registration on a business\'s behalf removes most of the complexity — the business doesn\'t need to track each country\'s specific A2P rules directly.',
        ],
      },
    ],
  }),

  post({
    slug: 'how-to-send-sms-from-your-website',
    routePath: '/resources/insights/how-to-send-sms-from-your-website/',
    title: 'How to Send an SMS From Your Website',
    metaTitle: 'How to Send SMS From a Website',
    metaDescription: 'Two ways to send SMS text messages from a website: through a web-based dashboard with no code, or via an SMS API for automated sends.',
    keywords: 'how to send sms from website, send text message from website, http send sms',
    category: 'SMS Insights',
    readTime: '4 min read',
    words: 760,
    excerpt: 'You don\'t need a phone to send a text message — a website with the right SMS platform behind it can send (and receive) SMS directly.',
    body: [
      {
        type: 'p',
        text: 'Sending an SMS from a website comes down to one of two approaches depending on what\'s needed: a web dashboard for sending messages manually with no code, or an SMS API for sending messages automatically as part of the website\'s own logic.',
      },
      { type: 'h2', text: 'Option 1: A Web-Based SMS Dashboard', anchor: null },
      {
        type: 'p',
        text: 'The simplest route for occasional or manual sending is a browser-based SMS dashboard: log in, type a message, choose or upload recipient numbers, and send — no phone, no code, no app install. This is the right fit for a small team sending appointment reminders, order updates, or a one-off announcement, and it\'s how most SMS platforms\' own web apps work.',
      },
      { type: 'h2', text: 'Option 2: An SMS API', anchor: null },
      {
        type: 'p',
        text: 'For anything automated — a confirmation the moment someone submits a form, an OTP the instant a user tries to log in, an alert triggered by a change in a database — a website needs to send that message itself, on its own, without a person clicking send. That\'s what an SMS API is for: a standard HTTP request the website\'s own backend code makes, carrying the recipient\'s number, the message text, and an API key, which the SMS gateway then delivers.',
      },
      { type: 'h2', text: 'What Sending via API Actually Looks Like', anchor: null },
      {
        type: 'ol',
        items: [
          'The website\'s backend detects a trigger — an order placed, a form submitted, a login attempted.',
          'It sends an HTTP POST request to the SMS API endpoint, with the recipient number, message, and an API key in the request.',
          'The SMS gateway delivers the message and returns a delivery status the website can log or display.',
        ],
      },
      {
        type: 'p',
        text: 'Because it\'s a standard web request, this works from any backend language a website already runs — PHP, Node.js, Python, Java — with no specialized library required beyond whatever the language already uses to make HTTP requests.',
      },
      { type: 'h2', text: 'Which One to Use', anchor: null },
      {
        type: 'table',
        head: [['Need'], ['Best fit']],
        rows: [
          [['Occasional, manual sends'], ['Web dashboard']],
          [['Automated, triggered by website events'], ['SMS API']],
          [['No developer available'], ['Web dashboard']],
          [['High volume, needs to scale with traffic'], ['SMS API']],
        ],
      },
    ],
  }),

  post({
    slug: 'how-to-sign-up-to-bulksms',
    routePath: '/resources/insights/how-to-sign-up-to-bulksms/',
    title: 'How to Sign Up for a Bulk SMS Account',
    metaTitle: 'How to Sign Up for Bulk SMS',
    metaDescription: 'Sign up for a bulk SMS account in a few steps: verify your email, add business details, and you\'re ready to send — here\'s what to expect.',
    keywords: 'how to sign up to bulksms, bulk sms sign up, create bulk sms account',
    category: 'SMS Insights',
    readTime: '3 min read',
    words: 520,
    excerpt: 'Signing up for a bulk SMS account is a short process — verify an email, add a few business details, and start sending. Here\'s the walkthrough.',
    body: [
      {
        type: 'p',
        text: 'Getting set up to send bulk SMS is a short process on most platforms — typically three steps: submit a work email, confirm it with a code, and fill in a few business details.',
      },
      { type: 'h2', text: 'Step 1: Submit a Work Email', anchor: null },
      {
        type: 'p',
        text: 'Start with the platform\'s sign-up page and enter a work email address. This is what the account and any billing or delivery notifications will be tied to.',
      },
      { type: 'h2', text: 'Step 2: Verify the Email', anchor: null },
      {
        type: 'p',
        text: 'A verification code arrives in the inbox within a minute or two — enter it on the sign-up page to confirm the email is real and under the applicant\'s control. This step exists mainly to keep spam and throwaway signups off the platform.',
      },
      { type: 'h2', text: 'Step 3: Add Business Details', anchor: null },
      {
        type: 'p',
        text: 'The final step collects the information needed to actually set up the account: company name, contact name, phone number, country, and the currency to bill in. Some platforms also ask for an industry, which helps tailor default settings like message templates or compliance requirements for that sector.',
      },
      { type: 'h2', text: 'What Happens Next', anchor: null },
      {
        type: 'ul',
        items: [
          'The account is created and a dashboard becomes available immediately in most cases.',
          'A free trial credit is commonly included, so a first test message can be sent right away, with no payment required upfront.',
          'From there, sending a bulk message is usually a matter of uploading or pasting a recipient list, writing the message, and sending — either from the dashboard or via the API for automated sends.',
        ],
      },
    ],
  }),

  post({
    slug: 'promotional-vs-transactional-texts',
    routePath: '/resources/insights/promotional-vs-transactional-texts/',
    title: 'Promotional vs. Transactional Texts: What\'s the Difference?',
    metaTitle: 'Promotional vs Transactional SMS',
    metaDescription: 'Promotional and transactional SMS follow different rules for opt-in, timing, and content — here\'s how to tell them apart and stay compliant.',
    keywords: 'promotional vs transactional texts, transactional text messages, promotional sms rules',
    category: 'SMS Insights',
    readTime: '4 min read',
    words: 780,
    excerpt: 'Not all business texts are the same in the eyes of regulators — promotional and transactional messages follow different rules, and mixing them up risks compliance issues.',
    body: [
      {
        type: 'p',
        text: 'Two business texts can look almost identical and still be governed by completely different rules, depending on whether they\'re classified as transactional or promotional. Getting that classification wrong is one of the most common compliance mistakes in SMS marketing.',
      },
      { type: 'h2', text: 'Transactional Texts', anchor: null },
      {
        type: 'p',
        text: 'A transactional message relates to a specific transaction or account action the recipient already initiated or is party to: an order confirmation, a shipping update, an OTP code, an appointment reminder, a password reset. It\'s informational, expected, and tied to something the recipient did.',
      },
      { type: 'h2', text: 'Promotional Texts', anchor: null },
      {
        type: 'p',
        text: 'A promotional message is marketing: a discount code, a sale announcement, a new-product alert, a re-engagement offer. It exists to drive a purchase or engagement the recipient didn\'t specifically ask for at that moment.',
      },
      { type: 'h2', text: 'Why the Distinction Matters', anchor: null },
      {
        type: 'table',
        head: [['Transactional'], ['Promotional']],
        rows: [
          [['Consent is generally implied by the transaction'], ['Requires explicit opt-in beforehand']],
          [['Not restricted to specific sending windows in most regions'], ['Often restricted to certain hours/days by regulation']],
          [['Opt-out is good practice but less strictly regulated'], ['Opt-out (STOP) must be honored immediately, by law in most countries']],
          [['Lower spam-filtering scrutiny'], ['Higher scrutiny — carriers actively filter unsolicited marketing']],
        ],
      },
      { type: 'h2', text: 'The Line Can Blur — Be Careful', anchor: null },
      {
        type: 'p',
        text: 'A message that starts as transactional ("Your order has shipped") but adds a promotional line at the end ("...and here\'s 10% off your next order!") is generally treated as promotional by regulators and carriers, since it now contains marketing content. Mixing the two in one message is one of the fastest ways to trigger compliance issues or carrier filtering — when in doubt, keep transactional and promotional content in separate messages.',
      },
      { type: 'h2', text: 'Staying Compliant', anchor: null },
      {
        type: 'ul',
        items: [
          'Get clear, documented opt-in before sending any promotional text.',
          'Always include a working STOP/opt-out instruction on promotional messages.',
          'Keep transactional messages strictly informational — no marketing content mixed in.',
          'Check local regulations (like TCPA in the US) for specific rules on timing and consent, since they vary significantly by country.',
        ],
      },
    ],
  }),

  post({
    slug: 'how-and-when-do-i-need-to-register-a-sender-id',
    routePath: '/resources/insights/how-and-when-do-i-need-to-register-a-sender-id/',
    title: 'How and When Do I Need to Register a Sender ID?',
    metaTitle: 'When to Register an SMS Sender ID',
    metaDescription: 'Which countries require Sender ID registration before sending SMS, what the process involves, and what happens if a message sends unregistered.',
    keywords: 'sender id registration, register sender id, senderid',
    category: 'SMS Insights',
    readTime: '4 min read',
    words: 700,
    excerpt: 'Some countries let a Sender ID go live instantly; others require formal registration before a single message can send. Here\'s how to know which applies.',
    body: [
      {
        type: 'p',
        text: 'A Sender ID is the name or number a recipient sees a text arrive from. In many countries, using one — especially an alphanumeric one, like a business name — requires formal registration with local regulators or carriers before it can be used, and sending without it can mean messages are blocked outright.',
      },
      { type: 'h2', text: 'When Registration Is Required', anchor: null },
      {
        type: 'p',
        text: 'Registration requirements vary by country and change over time as regulators tighten anti-spam and anti-fraud rules. As a general pattern: markets with a history of SMS fraud or spam (much of South Asia, parts of the Middle East, and increasingly Southeast Asia) tend to require pre-approved, registered Sender IDs, sometimes with supporting business documentation. Markets like the UK and much of Western Europe are comparatively more open, though even there, unregistered alphanumeric Sender IDs are increasingly filtered.',
      },
      { type: 'h2', text: 'What the Registration Process Usually Involves', anchor: null },
      {
        type: 'ol',
        items: [
          'Choose the Sender ID (up to 11 alphanumeric characters, no spaces in most countries).',
          'Submit it through the SMS platform, which routes it to the relevant carrier or regulator.',
          'Provide supporting business documentation if the country requires it — this can include a business registration certificate or a letter of authorization.',
          'Wait for approval, which ranges from same-day to a few weeks depending on the country.',
        ],
      },
      { type: 'h2', text: 'What Happens Without Registration', anchor: null },
      {
        type: 'p',
        text: 'In countries that require it, sending with an unregistered Sender ID typically results in the message being blocked or silently dropped by the carrier — not delivered with a generic fallback, but simply not delivered at all. This is the single most common reason a legitimate business\'s SMS campaign shows unexpectedly low delivery rates in a specific country.',
      },
      { type: 'h2', text: 'How to Check What a Specific Country Requires', anchor: null },
      {
        type: 'p',
        text: 'Because requirements shift and vary so much by country, the most reliable approach is checking with the SMS platform being used before launching a campaign in a new market — a platform that actively maintains Sender ID registrations across countries can confirm what\'s needed (or handle the registration directly) rather than leaving it to guesswork.',
      },
    ],
  }),

  post({
    slug: 'what-is-sms-otp',
    routePath: '/blog/what-is-sms-otp/',
    title: 'What Is an SMS OTP and How Does It Work?',
    metaTitle: 'What Is SMS OTP?',
    metaDescription: 'SMS OTP (one-time password) explained: how it verifies logins and payments, why it\'s sent by text, and how secure it actually is.',
    keywords: 'what is sms otp, sms otp meaning, one time password sms',
    category: 'SMS Insights',
    readTime: '4 min read',
    words: 680,
    excerpt: 'That six-digit code texted to confirm a login or payment is an SMS OTP — a one-time password sent to a device you already control, to prove it\'s really you.',
    body: [
      {
        type: 'p',
        text: 'An SMS OTP — one-time password — is a short numeric code sent by text message to verify that whoever is trying to log in, complete a payment, or reset a password actually has access to the phone number on file. It\'s used once and expires shortly after, usually within five to fifteen minutes.',
      },
      { type: 'h2', text: 'How It Works', anchor: null },
      {
        type: 'ol',
        items: [
          'A user attempts a sensitive action — logging in, making a payment, resetting a password.',
          'The system generates a random, single-use code and sends it by SMS to the phone number tied to the account.',
          'The user enters that code back into the app or website within the expiry window.',
          'The system confirms the code matches and lets the action proceed.',
        ],
      },
      { type: 'h2', text: 'Why SMS Specifically', anchor: null },
      {
        type: 'p',
        text: 'SMS OTP works as a second-factor verification because it relies on something the user physically has — their phone — separate from something they know, like a password. Even if a password is stolen or guessed, an attacker without physical access to the phone (or control of its number) generally can\'t complete the login. SMS is used over other channels mainly because it needs no app, no internet connection, and works on virtually every phone.',
      },
      { type: 'h2', text: 'Common Uses', anchor: null },
      {
        type: 'ul',
        items: [
          'Two-factor authentication for logins',
          'Confirming a payment or a change to account details',
          'Verifying a phone number during account sign-up',
          'Authorizing a password reset',
        ],
      },
      { type: 'h2', text: 'Is SMS OTP Secure?', anchor: null },
      {
        type: 'p',
        text: 'SMS OTP is a significant security improvement over a password alone, but it isn\'t the strongest possible second factor — it can be vulnerable to SIM-swap fraud, where an attacker convinces a carrier to transfer a victim\'s number to a new SIM, or to interception on poorly secured networks. For most consumer applications it remains a practical, low-friction standard; higher-security use cases increasingly pair it with, or replace it with, authenticator apps or hardware keys.',
      },
      { type: 'h2', text: 'Best Practices for Businesses Sending OTP', anchor: null },
      {
        type: 'ul',
        items: [
          'Keep the expiry window short — five to ten minutes is typical.',
          'Route OTP traffic through a dedicated, high-priority sending path rather than the same queue as marketing messages.',
          'Rate-limit how often a code can be requested for the same number, to prevent abuse.',
          'Never include anything beyond the code and a short instruction — OTP messages are a common phishing target for lookalike texts.',
        ],
      },
    ],
  }),
]

export default nativePosts
