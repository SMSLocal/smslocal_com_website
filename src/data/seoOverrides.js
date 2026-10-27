/**
 * Search-result titles and descriptions for static pages, keyed by English
 * route. Seo.jsx applies these over whatever a page component passes, so a
 * route's metadata can be tuned here without editing the page itself.
 *
 * Titles are written in full (brand included) at 40-60 characters and
 * descriptions at 130-160, the ranges that show whole in Google results.
 * Blog posts are not listed: they carry their own metaTitle/metaDescription
 * in importedPosts.generated.json. Country pages are built from a template in
 * country/CountryCode.jsx.
 */
export const SEO_OVERRIDES = {
  "/": {
    title: "Bulk SMS Marketing Platform with AI Agents | SMSLocal",
    description: "Send bulk SMS, WhatsApp and RCS campaigns, manage every reply in one shared inbox, and let AI agents handle support and sales. Start a free trial.",
  },
  "/about-us/": {
    title: "About SMSLocal: Messaging and Agentic AI in One Place",
    description: "SMSLocal builds messaging infrastructure, no-code chatbots and agentic AI so businesses can run SMS, WhatsApp and RCS conversations from one platform.",
  },
  "/blog/": {
    title: "SMS Marketing Blog: Guides, Tips and How-Tos | SMSLocal",
    description: "Practical guides on SMS marketing, bulk texting, 10DLC, area codes and customer messaging from the SMSLocal team. Learn what works and what to avoid.",
  },
  "/careers/": {
    title: "Careers at SMSLocal: Build Messaging and Agentic AI",
    description: "Join SMSLocal's remote-friendly team building messaging, chatbots and agentic AI. Learn how we work, then get in touch about joining us.",
  },
  "/compare/": {
    title: "Compare SMSLocal vs Twilio, Infobip, Bird and Plivo",
    description: "See how SMSLocal compares with Twilio, Infobip, Bird and Plivo on channels, onboarding, no-code tools and pricing, side by side in one table.",
  },
  "/compare/bird/": {
    title: "SMSLocal vs Bird (MessageBird): Messaging Compared",
    description: "Compare SMSLocal and Bird, formerly MessageBird: all-in-one messaging with agentic AI and transparent USD pricing, versus a marketing and CX messaging suite.",
  },
  "/compare/infobip/": {
    title: "SMSLocal vs Infobip: No-Code Messaging vs Enterprise CPaaS",
    description: "Compare SMSLocal and Infobip: a no-code messaging platform with chatbots, AI and one transparent plan, against Infobip's enterprise CPaaS.",
  },
  "/compare/plivo/": {
    title: "SMSLocal vs Plivo: Finished Platform vs Developer APIs",
    description: "Compare SMSLocal and Plivo: a ready-to-use, no-code messaging platform with a shared inbox and agentic AI, against Plivo's developer-first voice and SMS APIs.",
  },
  "/compare/twilio/": {
    title: "SMSLocal vs Twilio: No-Code Platform vs Developer API",
    description: "Compare SMSLocal and Twilio: the same channels as a no-code platform with managed onboarding, a shared inbox and AI, against Twilio's developer-first APIs.",
  },
  "/contact-us/": {
    title: "Contact SMSLocal: Talk to Sales, Support or Partners",
    description: "Questions about SMS, WhatsApp, RCS or AI agents? Contact SMSLocal for sales, support or partnerships and get a reply within one business day.",
  },
  "/country-code/": {
    title: "International Country Codes List: Dialing and SMS Rules",
    description: "Browse every international calling code with ISO codes, number formats and SMS sender ID rules for 195 countries, plus operators and regulator notes.",
  },
  "/developers/api-reference/": {
    title: "SMS API Reference: Send Messages and Check Status | SMSLocal",
    description: "The SMSLocal REST API reference: send a message with one POST, read its delivery status with a GET, with the request and response fields explained.",
  },
  "/developers/quickstart/": {
    title: "SMS API Quickstart: Your First SMS in 3 Steps | SMSLocal",
    description: "Get your access key, send your first SMS with one REST request and watch the delivery report arrive. Three steps with copy-paste code samples.",
  },
  "/developers/sdks/": {
    title: "SMS API Code Samples: cURL, Node.js, Python | SMSLocal",
    description: "Copy-paste code samples for sending SMS in cURL, Node.js and Python, plus the in-app chat SDK for iOS and Android. Any HTTP client works with the REST API.",
  },
  "/partnerships/": {
    title: "SMSLocal Partner Program: Refer, Resell or Integrate",
    description: "Partner with SMSLocal on agentic AI and messaging. Refer customers, resell, integrate or operate the platform and earn a recurring revenue share.",
  },
  "/platform/": {
    title: "SMSLocal Platform: Messaging, Inbox, AI and Analytics",
    description: "One platform for messaging channels, a shared inbox, AI automation, integrations, analytics and enterprise security, all on one account and one customer record.",
  },
  "/platform/integrations/": {
    title: "Integrations: Connect SMSLocal to Your CRM and Apps",
    description: "One-click OAuth links your CRM, store, helpdesk and finance apps to SMSLocal. Sync contacts and events, trigger messages, or build your own with the REST API.",
  },
  "/platform/security/": {
    title: "Security & Compliance: How SMSLocal Protects Your Data",
    description: "See how SMSLocal protects customer data with encryption, authentication, role-based access and audit logs, and what compliance information we publish.",
  },
  "/platform/why-smslocal/": {
    title: "Why SMSLocal: One Platform Instead of a Tangle of Tools",
    description: "Most teams bolt together a CPaaS API, a chatbot tool, a campaign tool and an inbox. SMSLocal replaces the whole stack with one account and one customer record.",
  },
  "/pricing/": {
    title: "SMSLocal Pricing: Pay Only for Messages You Send",
    description: "Pay only for the texts you send, with no monthly plans, seat fees or long-term contracts. Check live per-message rates for any country and top up any amount.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy: How SMSLocal Handles Your Data | SMSLocal",
    description: "Read SMSLocal's Privacy Policy to see what personal data we collect, how we use and protect it, and the privacy rights available to you.",
  },
  "/products/": {
    title: "SMSLocal Products: Messaging Channels, Chatbots, AI Agents",
    description: "Explore SMSLocal: reach customers on every messaging channel, automate conversations with no-code chatbots and deploy AI agents, all from one account.",
  },
  "/products/ai-agents/": {
    title: "AI Agents for Business: Support, Sales, Booking | SMSLocal",
    description: "Deploy AI agents that resolve support, close sales, book appointments and qualify leads, grounded in your data with a human handoff when it matters.",
  },
  "/products/ai-agents/agent-builder/": {
    title: "AI Agent Builder: Build No-Code AI Agents | SMSLocal",
    description: "Build a custom AI agent with no-code flows or code. Connect your data and tools, set guardrails and deploy it across chat, WhatsApp and voice.",
  },
  "/products/ai-agents/agentic-ai/": {
    title: "Agentic AI Platform: AI Agents That Take Action | SMSLocal",
    description: "Deploy autonomous AI agents that read the request, pull live data from your tools and take real action in the conversation, with a clean human handoff.",
  },
  "/products/ai-agents/booking/": {
    title: "AI Booking Agent: Book Appointments in Chat | SMSLocal",
    description: "An AI agent that books, reschedules and confirms appointments inside the chat, checks live availability, prevents double bookings and sends reminders.",
  },
  "/products/ai-agents/customer-service/": {
    title: "AI Customer Service Agent for Every Channel | SMSLocal",
    description: "Deflect repetitive tickets on every channel with an AI customer service agent that answers from your data, takes real action and escalates with full context.",
  },
  "/products/ai-agents/sales/": {
    title: "AI Sales Agent & SDR: Automate Outreach | SMSLocal",
    description: "An AI SDR that researches leads, personalizes outreach across email, SMS and WhatsApp, and books meetings automatically while your team sells.",
  },
  "/products/ai-agents/support/": {
    title: "AI Support Agent: Clear Tier-One Tickets Fast | SMSLocal",
    description: "An AI support agent that resolves tier-one questions from your help centre, replies on every channel and escalates only what needs a person, with context.",
  },
  "/products/ai-agents/voice/": {
    title: "Voice AI Agent: Natural Phone Conversations | SMSLocal",
    description: "A voice AI agent that holds natural, two-way phone calls, resolves repetitive requests and hands off to a human with the transcript, summary and sentiment.",
  },
  "/products/campaigns/click-to-whatsapp-ads/": {
    title: "Click-to-WhatsApp Ads: Turn Ad Clicks into Chats | SMSLocal",
    description: "Connect Facebook and Instagram ads to WhatsApp so every click starts a conversation that your team or an AI agent can answer right away.",
  },
  "/products/channels/": {
    title: "Messaging Channels & APIs: SMS, WhatsApp, RCS | SMSLocal",
    description: "Reach customers on SMS, WhatsApp, RCS, voice, email and social apps from one platform with one inbox, one API and one customer record.",
  },
  "/products/channels/did/": {
    title: "Virtual Phone Numbers in 100+ Countries | SMSLocal",
    description: "Get local, national, toll-free and mobile virtual numbers in 100+ countries, live in minutes. Route calls and SMS to your team, apps and CRM.",
  },
  "/products/channels/email/": {
    title: "Email API: Transactional and Bulk Email with SMS | SMSLocal",
    description: "Send transactional and bulk email by REST or SMTP, with high deliverability and an automatic SMS fallback when an email bounces, all in one API.",
  },
  "/products/channels/rcs/": {
    title: "RCS Business Messaging: Rich, Branded Messages | SMSLocal",
    description: "Send branded RCS messages with verified sender badges, rich cards, carousels and quick replies, with automatic SMS fallback when RCS is not supported.",
  },
  "/products/channels/rcs-broadcasting/": {
    title: "RCS Broadcasting: Branded RCS Campaigns at Scale | SMSLocal",
    description: "Broadcast verified, rich RCS campaigns to every Android inbox with automatic per-recipient SMS fallback, so your message reaches everyone.",
  },
  "/products/channels/sms-broadcasting/": {
    title: "Bulk SMS Broadcasting: A2P SMS Campaigns at Scale | SMSLocal",
    description: "Send segmented, personalized bulk SMS campaigns to your opted-in list with link tracking, delivery receipts and automatic STOP and HELP handling.",
  },
  "/products/channels/voice/": {
    title: "Cloud Voice Calling: IVR, Routing and Voice API | SMSLocal",
    description: "Programmable inbound and outbound calls with IVR menus, smart routing, recording and global numbers, on the same platform as your SMS and WhatsApp.",
  },
  "/products/channels/whatsapp/": {
    title: "WhatsApp Business API: Broadcasts and Chats | SMSLocal",
    description: "Use the official WhatsApp Business API for broadcasts, templates and two-way conversations at scale, with fast onboarding and AI that answers customers.",
  },
  "/products/channels/whatsapp-broadcasting/": {
    title: "WhatsApp Broadcasting: Reach Your Whole Audience | SMSLocal",
    description: "Send one WhatsApp broadcast to your entire opted-in audience, personalized with their name, with templates, media and read receipts.",
  },
  "/products/inbox-and-analytics/agent-copilot/": {
    title: "AI Agent Copilot: Draft Replies, Summarize Chats | SMSLocal",
    description: "An AI copilot inside the reply box that drafts responses, summarizes long threads and surfaces knowledge-based answers so agents reply faster.",
  },
  "/products/inbox-and-analytics/analytics/": {
    title: "Messaging Analytics: Delivery and Revenue | SMSLocal",
    description: "Measure delivery, engagement, conversion funnels, bot and agent performance and revenue across SMS, WhatsApp and AI agents in one real-time view.",
  },
  "/products/inbox-and-analytics/omnichannel-inbox/": {
    title: "Omnichannel Shared Inbox for SMS, WhatsApp, Email | SMSLocal",
    description: "One shared team inbox for WhatsApp, SMS, email, voice and social. Assign, mention and route conversations with SLAs while keeping full customer context.",
  },
  "/products/social-and-apps/": {
    title: "Social Media Inbox for Instagram and Messenger | SMSLocal",
    description: "Bring Instagram, Messenger, WhatsApp, Telegram, LINE and more into one shared team inbox with one customer record, smart routing and AI-assisted replies.",
  },
  "/products/social-and-apps/apple-messages/": {
    title: "Apple Messages for Business: Chat in iMessage | SMSLocal",
    description: "Reach customers in Messages on iPhone with rich links, list pickers, Apple Pay and reactions, with Apple approval handled through an approved provider.",
  },
  "/products/social-and-apps/instagram/": {
    title: "Instagram Messaging API: Automate DMs, Comments | SMSLocal",
    description: "Automate Instagram DM replies and turn comments into conversations through the official Messaging API, all answered from one shared team inbox.",
  },
  "/products/social-and-apps/kakaotalk/": {
    title: "KakaoTalk Business Messaging: AlimTalk | SMSLocal",
    description: "Send verified AlimTalk notices and FriendTalk broadcasts, and manage two-way KakaoTalk chats in the same inbox and AI as your other channels.",
  },
  "/products/social-and-apps/line/": {
    title: "LINE Business Messaging: Two-Way Chat and Flex | SMSLocal",
    description: "Run your LINE Official Account as a real channel with two-way chat, flex messages and a rich menu, integrated with WhatsApp, SMS and your inbox.",
  },
  "/products/social-and-apps/messenger/": {
    title: "Facebook Messenger API: Support and Sales Chat | SMSLocal",
    description: "Automate Facebook Messenger conversations while staying inside Meta's messaging window rules, with every chat routed to one shared inbox.",
  },
  "/products/social-and-apps/telegram/": {
    title: "Telegram Business Messaging: Bots and Broadcasts | SMSLocal",
    description: "Automate two-way Telegram conversations, publish channel broadcasts and run bots with buttons, integrated with your CRM and shared inbox.",
  },
  "/products/social-and-apps/viber/": {
    title: "Viber Business Messages: Broadcasts and Chat | SMSLocal",
    description: "Send verified Viber broadcasts and manage two-way chats through the API, in the same shared inbox and AI that already answers your other channels.",
  },
  "/products/social-and-apps/web-chat/": {
    title: "Live Chat Widget with AI: Instant Answers | SMSLocal",
    description: "A customizable live chat widget answered instantly by agentic AI, with proactive triggers, file sharing and an in-app SDK for mobile.",
  },
  "/resources/case-studies/": {
    title: "Customer Case Studies: Results in Their Own Words | SMSLocal",
    description: "Read how real SMSLocal customers use SMS and messaging to grow engagement and sales, in their own words. See results from the companies that did it.",
  },
  "/resources/docs/": {
    title: "Developer Docs: SMS API, Webhooks and SDKs | SMSLocal",
    description: "Developer documentation for the SMSLocal REST API: token authentication, sending and tracking SMS, real-time webhooks and SDKs with code samples.",
  },
  "/resources/guides/": {
    title: "Guides & Tutorials: Set Up Channels, Bots and AI | SMSLocal",
    description: "Step-by-step SMSLocal guides, from your first message to a deployed AI agent. Practical walkthroughs with screenshots and copy-paste code.",
  },
  "/resources/tools/": {
    title: "Free Messaging Tools: Carrier Lookup, SMS Test | SMSLocal",
    description: "Free tools for messaging teams: a WhatsApp link generator, free SMS test, carrier lookup and country code finder. No account needed.",
  },
  "/solutions/": {
    title: "Business Messaging Solutions by Industry and Team | SMSLocal",
    description: "SMSLocal solutions organized by industry and by team: messaging, chatbots and AI agents for support, sales, bookings and more, from one account.",
  },
  "/solutions/industry/education/": {
    title: "AI for Education: Admissions and Student Support | SMSLocal",
    description: "Agentic AI for education: answer admissions questions, send deadline and fee reminders and support students around the clock in their own language.",
  },
  "/solutions/industry/fintech/": {
    title: "Agentic AI for Fintech: Onboarding and Alerts | SMSLocal",
    description: "Support onboarding, transactions and time-sensitive alerts over SMS and WhatsApp, with every automated action logged and role-based access built in.",
  },
  "/solutions/industry/healthcare/": {
    title: "AI for Healthcare: Appointments and Patient Q&A | SMSLocal",
    description: "Agentic AI for healthcare: handle appointment scheduling, reminders and patient questions with role-based access control and audit logs.",
  },
  "/solutions/industry/insurance/": {
    title: "Agentic AI for Insurance: Quotes and Claims | SMSLocal",
    description: "Guide quotes, answer claims status questions and send renewal reminders automatically over SMS and WhatsApp, with every action logged for compliance.",
  },
  "/solutions/industry/media-entertainment/": {
    title: "Agentic AI for Media and Entertainment Support | SMSLocal",
    description: "Support ticketing, billing and subscriber questions instantly on every channel, and turn recommendation and renewal messaging into a growth engine.",
  },
  "/solutions/industry/mortgage/": {
    title: "AI for Mortgage Lenders: Pre-Qualify, Chase Docs | SMSLocal",
    description: "Agentic AI for mortgages: pre-qualify leads, chase documents automatically and answer status questions over SMS and WhatsApp so files stop stalling.",
  },
  "/solutions/industry/real-estate/": {
    title: "AI for Real Estate: Capture Leads, Book Viewings | SMSLocal",
    description: "Agentic AI for real estate: respond to every enquiry instantly, recommend listings and book viewings across web chat, WhatsApp, SMS and voice.",
  },
  "/solutions/industry/retail/": {
    title: "AI for Retail: Order Updates and Cart Recovery | SMSLocal",
    description: "Agentic AI for retail: answer product questions, recover abandoned carts and resolve order issues over WhatsApp, SMS, RCS and web chat.",
  },
  "/solutions/industry/telecom/": {
    title: "AI for Telecom: Support, Billing, Outage Alerts | SMSLocal",
    description: "Agentic AI for telecom: resolve billing, plan and outage questions across SMS, RCS, WhatsApp and voice, with proactive alerts that deflect tickets.",
  },
  "/solutions/industry/travel-and-hospitality/": {
    title: "AI for Travel and Hospitality Guest Support | SMSLocal",
    description: "Agentic AI for travel and hospitality: handle bookings, itinerary changes and guest questions across WhatsApp, SMS and web chat in any language.",
  },
  "/solutions/services/ai-consulting/": {
    title: "AI Consulting: Proof of Concept to Production | SMSLocal",
    description: "Hands-on AI consulting and onboarding: we scope the right use case, build it against your systems, enable your team and scale it into production.",
  },
  "/solutions/use-case/otp-authentication/": {
    title: "OTP and Authentication Messaging by SMS | SMSLocal",
    description: "Deliver one-time passcodes and login alerts quickly and reliably over SMS, with WhatsApp and voice as other routes. Verify sign-ups, logins and payments.",
  },
  "/solutions/use-case/payment-collection/": {
    title: "Payment Collection Reminders by WhatsApp, SMS | SMSLocal",
    description: "Send payment requests and due-date reminders over WhatsApp, SMS and RCS with a link customers can pay from in a few taps, and follow up automatically.",
  },
  "/solutions/use-case/promotions-campaigns/": {
    title: "Promotions and Marketing Campaigns by SMS | SMSLocal",
    description: "Run offers and marketing campaigns across SMS, WhatsApp and RCS with banners, coupon codes, buttons and measurable results for every send.",
  },
  "/solutions/use-case/transactional-alerts/": {
    title: "Transactional Alerts: Order and Payment Texts | SMSLocal",
    description: "Send order, shipping, payment and account alerts the moment they happen, over SMS, WhatsApp and RCS, so customers are informed in real time.",
  },
  "/terms-and-conditions/": {
    title: "Terms and Conditions of Service | SMSLocal",
    description: "Terms and Conditions for using SMSLocal's website and services, covering licensing, acceptable use, payments and refunds. The English text is authoritative.",
  },
  "/tools/whatsapp-link-generator/": {
    title: "Free WhatsApp Link Generator: Create wa.me Links | SMSLocal",
    description: "Create a click-to-chat wa.me link with a pre-filled message in seconds. Free, instant and no account needed. Share it anywhere customers can tap.",
  },
  "/platform/enterprise/": {
    title: "Enterprise Messaging at Scale on One Contract | SMSLocal",
    description: "Enterprise messaging on one contract: SMS, WhatsApp, RCS, voice and AI agents with role-based access, SSO, security reviews and volume plans for large teams.",
  },
  "/platform/trust-center/": {
    title: "Trust Center: Security, Privacy and Compliance | SMSLocal",
    description: "Security, privacy and compliance information for SMSLocal in one place, with links to our policies, security practices and how we protect customer data.",
  },
  "/products/campaigns/campaign-manager/": {
    title: "Campaign Manager: Plan, Send and Measure | SMSLocal",
    description: "Create, schedule and send campaigns across SMS, WhatsApp, RCS and email, with audiences, templates and reporting in one place so you can measure every send.",
  },
  "/products/cpaas/": {
    title: "CPaaS Platform: Messaging, Voice and Email APIs | SMSLocal",
    description: "One communications platform (CPaaS) for SMS, WhatsApp, RCS, voice and email, through a single API, one account and one wallet, to build into your product.",
  },
  "/products/cpaas/sms-api/": {
    title: "SMS API: Send, Track and Receive SMS | SMSLocal",
    description: "A plain REST SMS API with Token authentication, instant message IDs and real-time delivery reports sent to your callback URL. Send your first SMS in minutes.",
  },
  "/solutions/use-case/appointment-reminders/": {
    title: "Appointment Reminders and Booking by SMS | SMSLocal",
    description: "Send appointment confirmations and reminders over SMS and WhatsApp, and let customers confirm, reschedule or book in chat to keep appointments on the calendar.",
  },
  "/solutions/use-case/conversational-commerce/": {
    title: "Conversational Commerce: Sell in Chat with AI | SMSLocal",
    description: "Let customers browse, ask questions and buy in a chat on WhatsApp, Instagram and Messenger, with AI agents answering instantly and guiding them to checkout.",
  },
}
