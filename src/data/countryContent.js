/**
 * Hand-written, per-country content for the /country-code/ pages.
 *
 * Deliberately NOT generated. The factual base (dial code, ISO, population,
 * area, GDP) lives in countryPages.generated.json; everything here — operators,
 * sender-ID rules, routing notes — is written per market because it cannot be
 * derived, and because sender-ID and DND rules are compliance information.
 * Inventing them would tell customers something false about what they may send.
 *
 * A country with no entry here still gets a page from the generated facts, but
 * without the regulatory sections. Add a market only once its rules have
 * actually been checked. `verified` records when that happened.
 *
 * Fields:
 *   intro      one paragraph, specific to this market — not a template
 *   operators  the mobile networks worth naming
 *   senderId   how sender IDs behave: alphanumeric, numeric, registration
 *   rules      3–4 practical constraints a sender needs to know
 *   useCases   what traffic actually looks like in this market
 *   format     local number shape, for the "how to dial" section
 */
export const COUNTRY_CONTENT = {
  'united-states': {
    verified: '2026-08',
    intro:
      'The United States is the largest A2P SMS market in the world by revenue, and also the most heavily gated. Since 10DLC registration became mandatory, every business sending from a standard ten-digit number must register a brand and a campaign with The Campaign Registry before carriers will deliver at scale. Unregistered traffic is not merely throttled — it is increasingly blocked outright.',
    operators: ['AT&T', 'Verizon', 'T-Mobile', 'US Cellular'],
    senderId:
      'Alphanumeric sender IDs are not supported. Traffic runs on 10DLC numbers, toll-free numbers, or short codes, each with its own registration path and throughput ceiling.',
    rules: [
      '10DLC brand and campaign registration is required before carriers will pass business traffic at volume.',
      'Toll-free numbers must be verified; unverified toll-free traffic is filtered.',
      'HELP and STOP keyword handling is mandatory, and opt-out must be honoured immediately.',
      'TCPA governs consent. Written consent is required for marketing, and the penalties are per-message.',
    ],
    useCases: [
      'Appointment reminders for healthcare and services',
      'Delivery and order status for e-commerce',
      'Two-factor authentication',
    ],
    format: '+1 (NPA) NXX-XXXX — three-digit area code, then a seven-digit number.',
  },

  india: {
    verified: '2026-08',
    intro:
      'India runs the strictest A2P framework of any major market. TRAI requires every commercial message to pass through a blockchain-based DLT registry: the sender, the header and the exact template must all be pre-registered, and anything that does not match a registered template is rejected by the operator rather than delivered late.',
    operators: ['Reliance Jio', 'Bharti Airtel', 'Vodafone Idea', 'BSNL'],
    senderId:
      'Six-character alphanumeric headers, registered on the DLT platform against your entity. Headers are tied to a content category — a promotional header cannot carry transactional content.',
    rules: [
      'DLT registration covers three things separately: entity, header and message template. All three must be approved.',
      'Message content must match a registered template exactly, including variable placement.',
      'Promotional traffic respects DND preferences; transactional and service-implicit traffic is treated differently.',
      'Promotional sending is restricted to daytime hours under TRAI rules.',
    ],
    useCases: [
      'OTP and transaction alerts for banking and fintech',
      'Order and delivery updates for e-commerce',
      'Government and utility service notifications',
    ],
    format: '+91 XXXXX XXXXX — ten digits, mobile numbers starting 6, 7, 8 or 9.',
  },

  'united-kingdom': {
    verified: '2026-08',
    intro:
      'The UK is a mature alphanumeric-sender-ID market with light registration compared to India or the US, but heavy enforcement on consent. The ICO polices PECR actively and fines are public, so the practical constraint on a UK campaign is rarely deliverability — it is whether your opt-in record would survive a complaint.',
    operators: ['EE', 'O2', 'Vodafone', 'Three'],
    senderId:
      'Alphanumeric sender IDs up to 11 characters work without pre-registration, though networks increasingly filter unregistered IDs that mimic banks or delivery brands.',
    rules: [
      'PECR requires prior consent for marketing SMS, with a narrow soft opt-in for existing customers.',
      'Every marketing message must carry an opt-out route, and STOP is the expected keyword.',
      'Sender IDs impersonating a bank, courier or government body are filtered under anti-smishing measures.',
      'The ICO publishes enforcement actions, so consent records need to be auditable, not just claimed.',
    ],
    useCases: [
      'Retail promotions and loyalty campaigns',
      'Appointment reminders for NHS and private practice',
      'Delivery notifications',
    ],
    format: '+44 7XXX XXXXXX — mobile numbers begin 07 nationally, 7 in E.164.',
  },

  'united-arab-emirates': {
    verified: '2026-08',
    intro:
      'The UAE is a registration-first market. The TDRA requires sender IDs to be approved, and both operators run their own commercial approval on top, so lead time on a new UAE sender is measured in days rather than minutes. In exchange, delivery on approved routes is reliable and the market has unusually high smartphone penetration.',
    operators: ['Etisalat (e&)', 'du'],
    senderId:
      'Alphanumeric sender IDs must be registered with the operator and approved by the TDRA. Unregistered traffic is blocked, not degraded.',
    rules: [
      'Sender ID registration is required and handled per operator.',
      'Promotional content requires explicit consent, and marketing to non-consenting numbers is actively enforced.',
      'Arabic content is common; messages using Arabic script are billed as unicode with a shorter segment length.',
      'Weekend and prayer-time sending windows are a practical consideration for campaign timing.',
    ],
    useCases: [
      'Banking alerts and OTP',
      'Retail and hospitality promotions',
      'Government service notifications',
    ],
    format: '+971 5X XXX XXXX — mobile prefixes 50, 52, 54, 55, 56 and 58.',
  },

  'saudi-arabia': {
    verified: '2026-08',
    intro:
      'Saudi Arabia routes commercial SMS through a centralised framework overseen by the CST, and sender IDs are tied to a registered commercial entity. For international senders the practical hurdle is documentation: a CR number and local sponsorship are usually needed before a sender ID is approved at all.',
    operators: ['STC', 'Mobily', 'Zain KSA'],
    senderId:
      'Registered alphanumeric sender IDs only, bound to a verified commercial registration. Generic or unregistered IDs are rejected.',
    rules: [
      'Sender ID registration requires a Saudi commercial registration (CR) in most cases.',
      'Promotional and transactional traffic are separated, with different approval routes.',
      'Arabic messaging is the norm and is billed at unicode segment lengths.',
      'Marketing sends are restricted outside permitted hours.',
    ],
    useCases: ['Banking and payment alerts', 'Government (Absher) notifications', 'Retail campaigns'],
    format: '+966 5X XXX XXXX — mobile numbers begin 05 nationally.',
  },

  nigeria: {
    verified: '2026-08',
    intro:
      'Nigeria is the largest mobile market in Africa and one where SMS still carries traffic that has moved to data elsewhere — bank alerts in particular. The NCC mandates a Do-Not-Disturb short code, and 2442 opt-outs are honoured at network level, which means a list bought rather than built will quietly stop delivering.',
    operators: ['MTN Nigeria', 'Airtel Nigeria', 'Glo', '9mobile'],
    senderId:
      'Alphanumeric sender IDs are supported and should be registered with the operators to avoid filtering.',
    rules: [
      'The NCC DND service (short code 2442) lets subscribers block promotional traffic at network level.',
      'Sender ID registration reduces filtering, particularly on MTN.',
      'Financial-services messaging is the dominant category and is treated as transactional.',
      'Network coverage varies sharply between urban and rural areas, which affects retry strategy.',
    ],
    useCases: ['Bank transaction alerts', 'Airtime and data top-up confirmations', 'Political and public information'],
    format: '+234 XXX XXX XXXX — mobile numbers drop the leading 0 in E.164.',
  },

  indonesia: {
    verified: '2026-08',
    intro:
      'Indonesia is a high-volume, price-sensitive market spread across thousands of islands and four major networks, which makes route quality more variable than in a single-operator country. Masking rules differ by operator, so a sender ID that works on Telkomsel may be rewritten on another network.',
    operators: ['Telkomsel', 'Indosat Ooredoo Hutchison', 'XL Axiata', 'Smartfren'],
    senderId:
      'Alphanumeric sender IDs require registration and behave differently per operator; some routes replace unregistered IDs with a numeric long code.',
    rules: [
      'Sender ID registration is per operator, not central.',
      'OTP traffic dominates and is prioritised on most routes.',
      'Grey routes are common and unreliable — delivery receipts on them are not trustworthy.',
      'Bahasa Indonesia fits GSM-7, so standard segment lengths apply.',
    ],
    useCases: ['OTP for fintech and e-wallets', 'Ride-hailing and delivery notifications', 'E-commerce promotions'],
    format: '+62 8XX XXXX XXXX — mobile numbers begin 08 nationally.',
  },

  philippines: {
    verified: '2026-08',
    intro:
      'The Philippines was once the texting capital of the world and SMS remains central to how businesses reach customers. Since the SIM Registration Act, unregistered SIMs are deactivated, and the NTC now requires commercial senders to register — a direct response to the scale of smishing the market experienced.',
    operators: ['Globe Telecom', 'Smart Communications', 'DITO Telecommunity'],
    senderId:
      'Registered alphanumeric sender IDs. Following anti-smishing measures, messages containing URLs face additional scrutiny and are frequently blocked from unregistered senders.',
    rules: [
      'SIM registration is mandatory for subscribers, which has reduced but not eliminated fraud traffic.',
      'Commercial sender registration with the operators is required.',
      'Messages containing clickable links are heavily filtered — many routes block them entirely.',
      'The Data Privacy Act governs consent and applies to marketing lists.',
    ],
    useCases: ['E-wallet and remittance alerts', 'Telco service notifications', 'E-commerce order updates'],
    format: '+63 9XX XXX XXXX — mobile numbers begin 09 nationally.',
  },

  brazil: {
    verified: '2026-08',
    intro:
      'Brazil combines a large mobile base with an active consumer-protection regime. Anatel runs the "Não Perturbe" registry for telemarketing, and LGPD applies to messaging data the way GDPR does in Europe, so consent handling matters as much as routing.',
    operators: ['Vivo', 'Claro', 'TIM', 'Oi'],
    senderId:
      'Short codes are the norm for A2P traffic; alphanumeric sender IDs are not generally supported.',
    rules: [
      'LGPD governs personal data, including phone numbers held for marketing.',
      'Anatel operates a do-not-disturb registry that applies to telemarketing.',
      'Portuguese uses accented characters, which push messages into unicode segments unless transliterated.',
      'Short code provisioning takes time — plan lead time for a new campaign.',
    ],
    useCases: ['Banking and Pix payment alerts', 'Delivery notifications', 'Retail promotions'],
    format: '+55 (XX) 9XXXX-XXXX — two-digit area code, then a nine-digit mobile number.',
  },

  germany: {
    verified: '2026-08',
    intro:
      'Germany is a strict-consent market where the practical risk is legal rather than technical. Under UWG, sending marketing SMS without documented prior consent exposes you to competitor-initiated Abmahnung claims, which is a faster and more expensive route to trouble than a regulator would be.',
    operators: ['Telekom', 'Vodafone', 'O2 Telefónica'],
    senderId: 'Alphanumeric sender IDs up to 11 characters are supported without pre-registration.',
    rules: [
      'Explicit prior consent is required for marketing; UWG makes unsolicited SMS actionable.',
      'GDPR applies to the number itself as personal data.',
      'German umlauts (ä, ö, ü, ß) are in the GSM-7 extension set and consume extra characters.',
      'Consent records must be produced on demand, so double opt-in is the practical standard.',
    ],
    useCases: ['Appointment reminders', 'Logistics and delivery windows', 'Two-factor authentication'],
    format: '+49 15X XXXXXXXX — mobile prefixes 015, 016 and 017 nationally.',
  },

  france: {
    verified: '2026-08',
    intro:
      'France separates marketing from service messaging clearly, and the distinction is enforced through timing rules as well as consent. Marketing SMS may not be sent on Sundays, public holidays, or outside daytime hours — a constraint that catches international senders scheduling in their own time zone.',
    operators: ['Orange', 'SFR', 'Bouygues Telecom', 'Free Mobile'],
    senderId: 'Alphanumeric sender IDs are supported; marketing messages must carry a STOP opt-out.',
    rules: [
      'Marketing SMS is prohibited on Sundays, public holidays, and outside 08:00–20:00.',
      'Marketing messages must include "STOP" opt-out wording.',
      'Prior consent is required for marketing under CNIL guidance.',
      'Accented French characters push messages into unicode unless transliterated.',
    ],
    useCases: ['Retail and click-and-collect', 'Appointment confirmations', 'Banking alerts'],
    format: '+33 6XX XX XX XX or 7XX — mobile numbers begin 06 or 07 nationally.',
  },

  australia: {
    verified: '2026-08',
    intro:
      'Australia is governed by the Spam Act, which ACMA enforces with real penalties, and the compliance bar is specific: consent, identification of the sender, and a functional unsubscribe in every commercial message. There is no grace for "we assumed they wanted it".',
    operators: ['Telstra', 'Optus', 'Vodafone (TPG)'],
    senderId: 'Alphanumeric sender IDs are supported, though replies require a numeric long code.',
    rules: [
      'The Spam Act requires consent, sender identification, and a working unsubscribe in every commercial message.',
      'Unsubscribe requests must be honoured within five working days.',
      'ACMA publishes enforcement actions and fines are substantial.',
      'Alphanumeric senders cannot receive replies — use a long code for two-way.',
    ],
    useCases: ['Appointment reminders', 'Delivery notifications', 'Emergency and weather alerts'],
    format: '+61 4XX XXX XXX — mobile numbers begin 04 nationally.',
  },

  canada: {
    verified: '2026-08',
    intro:
      "Canada's CASL is among the strictest anti-spam laws anywhere, and unusually it carries a private right of action alongside regulatory penalties. Consent must be express or fall into a narrow implied category, and the burden of proving it sits with the sender.",
    operators: ['Rogers', 'Bell', 'Telus', 'Freedom Mobile'],
    senderId:
      'Alphanumeric sender IDs are not supported. Traffic runs on long codes or short codes, with short codes requiring carrier approval.',
    rules: [
      'CASL requires express or defined implied consent, and the sender must be able to prove it.',
      'Every message must identify the sender and provide an unsubscribe mechanism.',
      'Short code applications go through the Canadian carriers and take time.',
      'Quebec-facing campaigns should account for French-language requirements.',
    ],
    useCases: ['Appointment reminders', 'Banking alerts', 'Retail promotions'],
    format: '+1 (NPA) NXX-XXXX — shares the North American Numbering Plan with the US.',
  },

  'south-africa': {
    verified: '2026-08',
    intro:
      'South Africa pairs a mature mobile market with POPIA, which took full effect recently and reshaped how marketing lists are handled. Direct marketing to someone who is not an existing customer generally requires prior consent, and the regulator has been willing to act.',
    operators: ['Vodacom', 'MTN South Africa', 'Cell C', 'Telkom Mobile'],
    senderId: 'Alphanumeric sender IDs are supported and widely used.',
    rules: [
      'POPIA restricts direct marketing to non-customers without prior consent.',
      'Messages must identify the sender and offer opt-out.',
      'WASPA operates an industry code that member providers enforce.',
      'Coverage and handset mix vary widely, so plain-text SMS remains the reliable reach channel.',
    ],
    useCases: ['Banking and insurance alerts', 'Retail promotions', 'Utility and municipal notices'],
    format: '+27 6X/7X/8X XXX XXXX — mobile numbers drop the leading 0 in E.164.',
  },

  kenya: {
    verified: '2026-08',
    intro:
      'Kenya is the market that made mobile money mainstream, and SMS is the transaction layer underneath it. M-Pesa confirmations alone represent enormous message volume, which means Kenyan users read SMS in a way users in saturated markets no longer do.',
    operators: ['Safaricom', 'Airtel Kenya', 'Telkom Kenya'],
    senderId:
      'Alphanumeric sender IDs must be registered with the Communications Authority and with each operator.',
    rules: [
      'Sender ID registration is required, via the operators and the Communications Authority.',
      'The Data Protection Act governs consent for marketing.',
      'Safaricom holds a dominant share, so its route quality effectively sets national deliverability.',
      'Mobile-money-adjacent messaging is treated as transactional and prioritised.',
    ],
    useCases: ['M-Pesa and mobile money confirmations', 'Microfinance and lending alerts', 'Agricultural information'],
    format: '+254 7XX XXX XXX — mobile numbers drop the leading 0 in E.164.',
  },

  singapore: {
    verified: '2026-08',
    intro:
      'Singapore responded to SMS impersonation fraud faster than most regulators: alphanumeric sender IDs must be registered with the SMS Sender ID Registry, and unregistered IDs are labelled "Likely-SCAM" on the recipient handset. That makes registration a brand-trust question, not just a deliverability one.',
    operators: ['Singtel', 'StarHub', 'M1', 'SIMBA'],
    senderId:
      'Alphanumeric sender IDs must be registered with the SSIR. Unregistered senders are delivered with a "Likely-SCAM" prefix.',
    rules: [
      'SSIR registration is required for alphanumeric sender IDs.',
      'Unregistered sender IDs are visibly flagged to the recipient as likely scam.',
      'PDPA governs consent, and the Do Not Call registry applies to marketing.',
      'Checking the DNC registry before a marketing send is a legal requirement, not a courtesy.',
    ],
    useCases: ['Banking and government (Singpass) alerts', 'Delivery notifications', 'Appointment reminders'],
    format: '+65 8XXX XXXX or 9XXX XXXX — eight digits, no trunk prefix.',
  },

  malaysia: {
    verified: '2026-08',
    intro:
      'Malaysia is a multilingual market where the same campaign may need Malay, English, Chinese and Tamil variants — and the moment Chinese or Tamil script appears, the message becomes unicode and the segment length drops from 160 characters to 70. That single fact drives most Malaysian campaign design.',
    operators: ['Maxis', 'Celcom', 'Digi', 'U Mobile'],
    senderId: 'Alphanumeric sender IDs are supported and should be registered with the operators.',
    rules: [
      'MCMC regulates the sector and operators filter unregistered senders.',
      'PDPA governs consent for marketing communications.',
      'Non-Latin script triggers unicode encoding — 70 characters per segment instead of 160.',
      'Sender ID registration is handled per operator.',
    ],
    useCases: ['Banking and e-wallet alerts', 'Retail promotions', 'Logistics notifications'],
    format: '+60 1X XXX XXXX — mobile numbers begin 01 nationally.',
  },

  pakistan: {
    verified: '2026-08',
    intro:
      'Pakistan runs sender-ID approval through the PTA alongside the operators, and the market skews heavily toward transactional traffic: banking alerts, mobile wallet confirmations and telco notifications make up the bulk of legitimate A2P volume.',
    operators: ['Jazz', 'Zong', 'Telenor Pakistan', 'Ufone'],
    senderId: 'Alphanumeric sender IDs (masks) require PTA and operator approval before use.',
    rules: [
      'Sender ID approval goes through the PTA as well as the operators.',
      'Marketing traffic is restricted and transactional routes are separate.',
      'Urdu content is unicode, which halves the characters per segment.',
      'Bulk marketing without approval is actively blocked rather than throttled.',
    ],
    useCases: ['Banking and branchless banking alerts', 'Telco balance notifications', 'OTP'],
    format: '+92 3XX XXX XXXX — mobile numbers begin 03 nationally.',
  },

  bangladesh: {
    verified: '2026-08',
    intro:
      'Bangladesh has one of the densest mobile subscriber bases in South Asia and a mobile financial services sector — bKash above all — that runs on SMS confirmation. BTRC oversees masking approval, and unapproved senders do not reach the network.',
    operators: ['Grameenphone', 'Robi', 'Banglalink', 'Teletalk'],
    senderId: 'Masking (alphanumeric sender ID) requires BTRC and operator approval.',
    rules: [
      'Sender ID masking must be approved by the BTRC.',
      'Bangla content is unicode and consumes 70 characters per segment.',
      'Mobile financial services messaging dominates transactional volume.',
      'Promotional sending windows are restricted by regulation.',
    ],
    useCases: ['bKash and mobile financial services alerts', 'Garment and logistics notifications', 'OTP'],
    format: '+880 1XXX XXXXXX — mobile numbers begin 01 nationally.',
  },

  egypt: {
    verified: '2026-08',
    intro:
      'Egypt is the largest mobile market in North Africa, and Arabic-language messaging is the default rather than the exception. That makes unicode segment maths central to campaign cost here: a 160-character English message and a 70-character Arabic one cost the same per segment.',
    operators: ['Vodafone Egypt', 'Orange Egypt', 'Etisalat Misr', 'WE (Telecom Egypt)'],
    senderId: 'Alphanumeric sender IDs require registration with the operators and NTRA oversight.',
    rules: [
      'Sender ID registration is required and handled per operator under NTRA regulation.',
      'Arabic content is unicode — 70 characters per segment.',
      'Promotional traffic is separated from transactional and approved differently.',
      'Right-to-left rendering should be tested on real handsets before launch.',
    ],
    useCases: ['Banking alerts', 'E-commerce order updates', 'Telco notifications'],
    format: '+20 1XX XXX XXXX — mobile numbers begin 01 nationally.',
  },
}

/** Markets with authored content, in the order they should appear as "popular". */
export const FEATURED = Object.keys(COUNTRY_CONTENT)
