/**
 * Full body replacements for specific posts, applied by
 * transform-smslocal-blogs.mjs right after buildBody() — same override
 * pattern as COVER_SPECS and INNER_IMAGE_SPECS, so it survives a re-run of
 * the import pipeline instead of being a one-off hand-edit to the generated
 * JSON.
 *
 * Unlike those two, this one doesn't reshape scraped content — it REPLACES
 * it outright. Reserved for source pages so thin (a couple of boilerplate
 * paragraphs, no FAQ, sub-200 words) that reshaping them would still leave a
 * page too short to be useful or to rank; the replacement is original,
 * researched copy, grounded in SMSLocal's own real product facts (REST API,
 * JSON payloads, API-key auth, PHP/Python/Node/Java support — confirmed
 * against smslocal.com/developer/ and smslocal.com/http-api/) rather than
 * anything scraped from a competitor.
 */

/**
 * Exact in-body string replacements, applied after the body is built.
 *
 * Deliberately a list of exact strings per post rather than a blanket
 * /2025/ -> /2026/ sweep: a global year replace would also rewrite genuine
 * historical references ("the code was introduced in 2025"), turning a true
 * statement false. Every entry below was read in context first and is a
 * "current year" usage — a title reference or an example — not a fact about
 * when something happened.
 *
 * Post dates are untouched by this; those are real timestamps.
 */
export const TEXT_REPLACEMENTS = {
  'what-does-dw-mean-in-text': [
    // Refers to the emoji post, whose own title now says 2026.
    ['Emoji Meaning in Text: A Guide to 230+ Emoji Meanings for 2025',
     'Emoji Meaning in Text: A Guide to 230+ Emoji Meanings for 2026'],
  ],
  'what-does-mb-mean': [
    ['In 2025, “MB” has become', 'In 2026, “MB” has become'],
  ],
  'what-does-wyll-mean': [
    ['Incredible Advantages & How It Works in 2025?',
     'Incredible Advantages & How It Works in 2026?'],
  ],
  'what-does-wyf-mean': [
    // An example message: a concert "in 2025" reads as the past now.
    ['tour concert in 2025!', 'tour concert in 2026!'],
  ],
}

export const CONTENT_OVERRIDES = {
  // Year-rollover only. The source headlines say 2025 and the scraped pages
  // won't be updated, so the year is refreshed here rather than by editing
  // the generated JSON (which the next import would overwrite). Titles only:
  // the posts' publish/modified dates are left exactly as they are, because
  // those are real timestamps and rewriting them to imply fresh publication
  // is precisely the kind of fabricated date signal this project avoids.
  'what-does-dw-mean-in-text': {
    title: 'What Does DW Mean in Text ? The Trending Slang of 2026',
    metaTitle: 'What Does DW Mean in Text? Understanding the Trending Slang of 2026',
    metaDescription: 'What does DW mean in text? The meaning of this trending slang, with examples.',
  },
  'emoji-meaning-in-text': {
    title: 'Emoji Meaning in Text: A Guide to 230+ Emoji Meanings for 2026',
    metaTitle: 'Complete Guide to 230+ Emoji Meaning in text for 2026',
    metaDescription: 'Over 230+ emoji meanings decoded, for texting, social media and professional messages.',
  },

  // Meta descriptions only, added below — the scraped originals ran
  // 140-175 chars in English, already brushing Google's ~160-char cutoff,
  // and every locale that translates longer than English (ru, pl, fr, de,
  // it) pushed them past 200-250 once localized. Shortened, not rewritten:
  // same facts, tighter wording, same pattern as the two overrides above.
  '626-area-code': {
    metaDescription: 'The 626 area code covers the San Gabriel Valley, California — how it shapes SMS and local business.',
  },
  'message-blocking-is-active': {
    metaDescription: "Why the 'Message Blocking is Active' error happens, and how to fix it on Android and iPhone.",
  },
  'what-does-ts-mean-in-text': {
    metaDescription: 'What does TS mean in text? "True Story," "Timestamp" and more, on Snapchat, WhatsApp and TikTok.',
  },
  '801-area-code': {
    metaDescription: "The 801 area code serves Utah's urban core — its history and impact on local business.",
  },
  '469-area-code': {
    metaDescription: 'The 469 area code in northeastern Texas: uses, dialing rules and business opportunities.',
  },
  'what-does-smh-mean-in-text': {
    metaDescription: 'What does SMH mean in text? Its meaning and use in messages and social media, with examples.',
  },
  'unlocking-the-770-area-code': {
    metaDescription: "The 770 area code serves Atlanta's suburbs in Georgia — its history and role in local business.",
  },
  'exploring-the-808-area-code': {
    metaDescription: "Hawaii's 808 area code covers all islands. Its history, usage and SMS safety tips.",
  },
  'what-does-mk-mean': {
    metaDescription: 'What does MK mean in text? "Mmm, okay" — agreement, hesitation or sarcasm, on Snapchat and TikTok.',
  },
  'what-does-wyll-mean': {
    metaDescription: "What does WYLL mean in texting and social media? Its definition and why it's trending.",
  },
  '913-area-code': {
    metaDescription: 'Get a 913 area code number for Kansas City with SMS features, for businesses targeting the metro.',
  },
  'what-does-istg-mean': {
    metaDescription: 'What does ISTG mean? "I Swear to God" — how to use this popular slang in texts and social media.',
  },
  '22395-short-code': {
    metaDescription: 'The 22395 short code: its use in two-factor authentication and secure SMS banking alerts.',
  },
  'what-does-mb-mean': {
    metaDescription: 'What does MB mean in text? "My Bad" — how it\'s used on Snapchat, Instagram and TikTok.',
  },
  'what-does-wtw-mean': {
    metaDescription: 'What does WTW mean? "What\'s the Word," "What the What," or "What to Watch" — every meaning.',
  },
  '971-area-code': {
    metaDescription: 'The 971 area code covers parts of Oregon, including Portland — ideal for local businesses.',
  },
  'what-does-nfs-mean-in-text': {
    metaDescription: 'What does NFS mean in text? "Not For Sale" and "Need For Speed" — how to use it in context.',
  },
  'what-does-ty-mean': {
    metaDescription: 'What does "TY" mean in chats and social media? Its usage and examples, from SMSLocal.',
  },
  'what-does-tbh-mean': {
    metaDescription: 'What does TBH mean in texting? "To Be Honest" — plus related slang like WYLL, WYF and FS.',
  },
  'sms-bomber': {
    metaDescription: "What an SMS bomber is, how it works, and why it's harmful — stay protected with SMSLocal.",
  },
  'what-does-ig-mean': {
    metaDescription: 'What does IG mean? "I guess" or "Instagram," depending on context — usage across chat apps.',
  },
  'what-does-otp-mean-in-text': {
    metaDescription: 'What does OTP mean in a text message? How this abbreviation is used in digital conversation.',
  },
  '216-area-code': {
    metaDescription: 'How the 216 area code supports Cleveland businesses — dialing tips and getting a local number.',
  },
  'what-does-lwk-mean-in-text': {
    metaDescription: 'What does LWK mean in text? From "low-key" to "love with kisses" — modern digital slang.',
  },
  'what-does-ttyl-mean': {
    metaDescription: 'What does TTYL mean in texting? "Talk to You Later" — its usage in messages and chats.',
  },
  'what-does-frl-mean-in-text': {
    metaDescription: 'What does FRL mean in text? "For Real" — usage on Snapchat, Instagram and similar slang.',
  },
  '252-area-code': {
    metaDescription: "The 252 area code's coverage and role in North Carolina's business landscape.",
  },
  'what-does-wyf-mean': {
    metaDescription: 'What does WYF mean? This texting acronym\'s meanings, and how to use it on Snapchat and TikTok.',
  },
  '385-area-code': {
    metaDescription: 'The 385 area code: location, history, dialing rules and common scams to watch for.',
  },

  'how-to-send-a-system-generated-sms': {
    metaTitle: 'How to Send a System-Generated SMS: Setup Guide + API Steps',
    // Kept under 155 chars deliberately — the unabridged version ran 188,
    // already over Google's ~160-char cutoff before translation, and every
    // locale that isn't shorter than English (ru, pl, de, fr, nl) pushed it
    // past 250.
    metaDescription:
      'Learn how a system-generated SMS works: automatic triggers, real OTP/alert/reminder use cases, and a step-by-step setup guide with Python and PHP examples.',
    keywords: 'system generated sms, automated text messages, sms api, python sms library, python send message, otp sms, transactional sms',
    body: [
      { type: 'h2', text: 'Introduction', anchor: null },
      {
        type: 'p',
        rich: [
          'Every "Your OTP is 4821," delivery update, or appointment reminder you have ever received was almost certainly never typed by a human. It was a ',
          { b: ['system-generated SMS'] },
          " — a text message a piece of software sends automatically, the moment a specific event happens, without anyone opening a phone or logging into a dashboard. Businesses rely on this for a simple reason: it's the fastest, most reliable way to reach a customer the instant something they care about occurs.",
        ],
      },
      {
        type: 'p',
        rich: [
          'This guide covers exactly what a system-generated SMS is, how the automation actually works behind the scenes, the most common ways businesses use it, and a practical, step-by-step path to sending your first one — including what that looks like in ',
          { b: ['Python'] },
          ' and ',
          { b: ['PHP'] },
          ', the two languages developers ask about most.',
        ],
      },
      { type: 'h3', text: 'Key Takeaways', anchor: null },
      {
        type: 'ul',
        items: [
          [
            'A system-generated SMS is sent automatically by software through an ',
            { b: ['SMS API'] },
            ' — no manual typing or login required.',
          ],
          ['Three things make it work: a trigger (an event), an API call, and an SMS gateway that delivers the text.'],
          ['The most common uses are OTP codes, delivery updates, appointment reminders, and account alerts.'],
          ['Sending one takes an API key, a REST endpoint, and a few lines of code in almost any language — Python and PHP included.'],
          ["Consent and opt-out (STOP) handling aren't optional — they're what keeps automated SMS legal and your numbers from getting blocked."],
        ],
      },

      { type: 'h2', text: 'What Is a System-Generated SMS?', anchor: null },
      {
        type: 'p',
        rich: [
          'A system-generated SMS (also called an automated text message or a transactional SMS) is a message created and sent by an application, not a person. Instead of someone opening a messaging app and typing "Your order has shipped," a piece of code detects that the order status changed to "shipped" and fires off that exact text on its own, in milliseconds.',
        ],
      },
      {
        type: 'p',
        rich: [
          "The distinction that actually matters isn't the wording of the message — a human could type the same sentence. It's ",
          { b: ['who, or what, presses send'] },
          '. A system-generated SMS is triggered by code reacting to an event: a login attempt, a completed payment, a countdown reaching zero, a status change in a database. Nobody is standing by to send it manually, which is exactly why it can reach someone in seconds, 24 hours a day, at any scale.',
        ],
      },

      { type: 'h2', text: 'How Does System-Generated SMS Work?', anchor: null },
      {
        type: 'p',
        rich: [
          'Every automated text — regardless of the platform behind it — comes down to the same three moving parts:',
        ],
      },
      {
        type: 'ul',
        items: [
          [
            { b: ['A trigger.'] },
            ' The event your software is watching for: a new signup, a payment confirmation, a delivery status update, or simply a scheduled time (like "24 hours before an appointment").',
          ],
          [
            { b: ['An SMS API call.'] },
            ' When the trigger fires, your application sends an HTTP request to an SMS gateway — the recipient\'s number, the message text, and your API key, packaged as JSON.',
          ],
          [
            { b: ['Delivery through the gateway.'] },
            " The gateway hands the message to the recipient's mobile carrier, and — for platforms like SMSLocal — reports back whether it was delivered.",
          ],
        ],
      },
      {
        type: 'p',
        rich: [
          'That middle step is the part that actually makes automation possible: the ',
          { b: ['SMS API'] },
          '. An SMS API is just a defined way for one piece of software to ask another — "send this text to this number" — over a standard web request, the same way a browser asks a server for a webpage. SMSLocal\'s own HTTP-to-SMS API is a REST API: it accepts a straightforward HTTP request with JSON in and JSON back out, authorized with an access key instead of a username and password — the same shape ',
          { a: 'https://www.twilio.com/docs/sms', x: true, c: ["Twilio's own SMS API documentation"] },
          ' describes. If your software can make an HTTP request — and virtually all modern software can — it can send a system-generated SMS.',
        ],
      },

      { type: 'h2', text: 'Common Types of System-Generated SMS', anchor: null },
      {
        type: 'p',
        rich: [
          "Almost every automated text a business sends falls into one of a handful of categories. Here's what each one is actually for:",
        ],
      },
      {
        type: 'table',
        head: [['Type'], ['What triggers it'], ['Example']],
        rows: [
          [['OTP & two-factor authentication'], ['A login, password reset, or payment confirmation attempt'], [{ a: '/blog/what-does-otp-mean-in-text/', x: false, c: ['"Your OTP is 5821. Valid for 10 minutes."'] }]],
          [['Order & delivery updates'], ['A status change in an order-management or logistics system'], ['"Your order #4482 has shipped and will arrive Thursday."']],
          [['Appointment reminders'], ['A scheduled time offset before a calendar event'], ['"Reminder: your appointment is tomorrow at 3 PM."']],
          [['Account & security alerts'], ['A new device login, a failed payment, or a balance threshold'], ['"New sign-in detected from a new device. Wasn\'t you? Reply STOP."']],
          [['Marketing & promotional triggers'], ['A cart abandonment, a re-engagement window, or a signup'], ['"You left something in your cart — here\'s 10% off to finish checking out."']],
        ],
      },
      {
        type: 'p',
        rich: [
          'OTP messages are worth calling out specifically: they carry the highest urgency of any automated text (a code that expires in minutes), which is why they typically route through a dedicated, high-priority sending path rather than the same queue as promotional messages.',
        ],
      },

      { type: 'h2', text: 'How to Send a System-Generated SMS: Step-by-Step', anchor: null },
      {
        type: 'ol',
        items: [
          [
            { b: ['Choose an SMS API provider.'] },
            " Look for a REST API with JSON support, clear per-message pricing, and delivery reports — you'll want to confirm a text actually arrived, not just that it was sent.",
          ],
          [
            { b: ['Get your API key.'] },
            ' After creating an account, generate an access key from your dashboard. This key authorizes every request instead of a username/password login — which is exactly what removes the "manual login" step from the process.',
          ],
          [
            { b: ['Define your trigger.'] },
            ' Decide, in your own application, exactly what event should cause a text to go out — a webhook firing, a database row changing, or a scheduled job running.',
          ],
          [
            { b: ['Build the message template.'] },
            ' Write the text once, with placeholders for the parts that change — a name, an order number, a code — so the same template can serve every recipient.',
          ],
          [
            { b: ['Send the request.'] },
            ' When the trigger fires, your code sends an HTTP POST to the API endpoint with the recipient\'s number, the filled-in message, and your API key.',
          ],
          [
            { b: ['Confirm delivery and log the result.'] },
            ' Check the delivery report the API returns, and store it — if a message fails, you want to know immediately, not when a customer complains.',
          ],
        ],
      },

      { type: 'h2', text: 'Sending System-Generated SMS with Python and PHP', anchor: null },
      {
        type: 'p',
        rich: [
          'Because the underlying API is just HTTP and JSON, sending a text programmatically looks almost identical no matter which language your application is written in — only the syntax for making the request changes.',
        ],
      },
      { type: 'h3', text: 'Python', anchor: null },
      {
        type: 'p',
        rich: [
          "Python doesn't need a specialized SMS library to send a system-generated text — the standard ",
          { b: ['requests'] },
          ' package is enough. You build a small dictionary with the recipient number, the message, and your API key, POST it to the API endpoint as JSON, and read the JSON response back to confirm the message was accepted. This is the pattern behind most "python send message" automation scripts: a scheduled job or event handler that calls the same function every time it needs to text someone.',
        ],
      },
      { type: 'h3', text: 'PHP', anchor: null },
      {
        type: 'p',
        rich: [
          "PHP's most common route is the built-in ",
          { b: ['cURL'] },
          ' extension: initialize a cURL session pointed at the API endpoint, attach your JSON payload and API key as a header, execute the request, and decode the response. Since this needs nothing beyond what a standard PHP install already ships with, it\'s why SMSLocal\'s own documentation notes that "if you\'re capable of building a web page with a form, backed by a scripting language like PHP, you\'re already equipped to send automated SMS messages."',
        ],
      },
      {
        type: 'p',
        rich: [
          'Node.js and Java follow the same shape — an HTTP client, a JSON body, and your API key in the request. Once you\'ve sent one system-generated SMS in any language, sending the next in a different one is mostly a syntax swap.',
        ],
      },

      { type: 'h2', text: 'Benefits of System-Generated SMS', anchor: null },
      {
        type: 'ul',
        items: [
          [
            { b: ['Speed.'] },
            ' A trigger-to-delivery path measured in seconds, not the minutes or hours a manual process takes.',
          ],
          [{ b: ['Consistency.'] }, ' The same event always produces the same message, with none of the typos or missed sends a manual process risks.'],
          [{ b: ['Scale.'] }, ' Sending 10 automated texts costs the same effort as sending 10,000 — the code runs identically either way.'],
          [{ b: ['Round-the-clock coverage.'] }, ' An OTP or delivery alert fires at 3 AM exactly as reliably as at 3 PM.'],
          [{ b: ['Lower support load.'] }, ' Proactive updates ("your order shipped") head off the "where is my order?" ticket before it gets written.'],
        ],
      },

      { type: 'h2', text: 'Best Practices for Automated Text Messages', anchor: null },
      {
        type: 'ul',
        items: [
          [
            { b: ['Get explicit opt-in first.'] },
            ' A signup form or a keyword reply is enough — but automated texts should only go to numbers that agreed to receive them.',
          ],
          [{ b: ['Always support STOP.'] }, ' Every message needs a working, immediate way to opt out — it\'s both a compliance requirement and basic respect for the recipient.'],
          [{ b: ['Keep templates short and specific.'] }, ' "Your order #4482 shipped, arriving Thu" beats a paragraph — SMS is a glance-and-go channel.'],
          [{ b: ['Separate urgent from promotional.'] }, ' Route OTP and security alerts through a distinct, higher-priority path than marketing messages.'],
          [{ b: ['Monitor delivery reports.'] }, " A silent failure on an OTP message is a locked-out customer — check status, don't assume success."],
        ],
      },

      { type: 'h2', text: 'Wrapping Up', anchor: null },
      {
        type: 'p',
        rich: [
          'A system-generated SMS is nothing more exotic than code reacting to an event and making an HTTP request — but that simplicity is exactly what makes it powerful. Once a trigger, an SMS API, and a message template are in place, an OTP, a delivery update, or a reminder can reach a customer in seconds, at any hour, at any scale, without a single person clicking send. Whether that request comes from Python, PHP, Node.js, or Java, the shape of the work is the same: define the event, template the message, call the API, and confirm it landed.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a system-generated SMS?',
        rich: [
          'A system-generated SMS is a text message created and sent automatically by software — through an SMS API — the moment a specific event occurs, rather than being typed and sent manually by a person.',
        ],
      },
      {
        q: 'What do I need to send a system-generated SMS?',
        rich: [
          'Three things: an SMS API provider with an access key, a defined trigger (the event that should cause a message to send), and a message template. From there it\'s a standard HTTP request from whatever language your application already runs.',
        ],
      },
      {
        q: 'Can I send automated SMS without writing code?',
        rich: [
          'Some platforms offer visual trigger-and-action workflow builders that need no coding at all. Sending through a raw HTTP API, though — the most flexible and often cheapest route — does need at least a few lines of code in a language like Python, PHP, or Node.js.',
        ],
      },
      {
        q: 'Is system-generated SMS the same as bulk SMS?',
        rich: [
          "Not quite. Bulk SMS usually means one message sent to many recipients at once (a promotion, for example). System-generated SMS is triggered per event and per recipient — an OTP or an order update is personal and one-to-one, even though the same automation can technically run at bulk scale.",
        ],
      },
      {
        q: 'Is it legal to send automated text messages?',
        rich: [
          'Yes, as long as the recipient opted in to receive them and every message includes a clear way to opt out (a "reply STOP" instruction is standard). Regulations vary by country, but consent and an easy opt-out are the baseline everywhere.',
        ],
      },
      {
        q: 'How much does it cost to send a system-generated SMS?',
        rich: [
          {
            a: '/pricing',
            x: false,
            c: ['Pricing'],
          },
          ' is typically per message and varies by destination country and provider — there\'s no extra charge for the fact that a message was triggered by code rather than typed by hand.',
        ],
      },
    ],
  },
}
