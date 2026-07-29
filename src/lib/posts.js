
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blockText(block) {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
      return block.text;
    case "ul":
      return block.items.join(" ");
    case "stats":
      return block.items.map((s) => s.label).join(" ");
    case "cta":
      return `${block.heading} ${block.text}`;
    default:
      return "";
  }
}

/** Finds the first body block that mentions `tag` and returns an anchor id
 * to jump straight to it — `h2` blocks reuse their TOC slug, everything
 * else gets a stable `block-{i}` id (see BodyBlocks.tsx). */
export function findTagAnchor(body, tag) {
  const needle = tag.toLowerCase();
  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    if (blockText(block).toLowerCase().includes(needle)) {
      return block.type === "h2" ? slugify(block.text) : `block-${i}`;
    }
  }
  return null;
}

const authors = {
  john: {
    name: "John Miller",
    initials: "JM",
    role: "Marketing Manager",
    bio: "Writes about SMS campaigns, customer engagement, and what actually moves the needle for local businesses using SMSLocal.",
  },
  sarah: {
    name: "Sarah Cooper",
    initials: "SC",
    role: "Customer Support Specialist",
    bio: "Covers two-way messaging, support workflows, and how teams keep response times low over text.",
  },
  emily: {
    name: "Emily Rodriguez",
    initials: "ER",
    role: "Operations Assistant",
    bio: "Focuses on internal communication, team alerts, and operational playbooks built on SMS.",
  },
  david: {
    name: "David Lee",
    initials: "DL",
    role: "Sales Coordinator",
    bio: "Writes about reporting, analytics, and turning delivery data into better campaigns.",
  },
  priya: {
    name: "Priya Nair",
    initials: "PN",
    role: "Product Manager",
    bio: "Covers product updates, compliance, and what's shipping next on SMSLocal.",
  },
};

export const posts = [
  {
    slug: "northside-coffee-flash-sale",
    title: "Northside Coffee's 12,480-Text Flash Sale",
    emphasis: "Sales",
    category: "Campaigns",
    date: "Jul 18, 2026",
    readTime: "7 min read",
    excerpt:
      "A behind-the-scenes look at how a local coffee shop used bulk SMS and two-way replies to turn a flash sale into a 99.7% delivery rate and real revenue.",
    dek: "A behind-the-scenes look at how a local retailer used bulk SMS and two-way replies to drive a flash sale to a 99.7% delivery rate — and turned browsers into buyers within the hour.",
    author: authors.john,
    tags: ["Bulk SMS", "Case Study", "Campaigns", "Retail"],
    featured: true,
    body: [
      {
        type: "p",
        text: "When Northside Coffee decided to run a flash sale — 50% off everything, for one day only — they didn't post it to social and hope for the best. They sent one SMS campaign to 12,480 subscribers and watched the orders roll in within minutes.",
      },
      {
        type: "p",
        text: "Here's exactly how they set it up, what results they saw, and the three decisions that made the biggest difference. If you run a local business and have ever wondered whether a text campaign is worth the effort, this is the closest thing to a full walkthrough you'll find.",
      },
      { type: "h2", text: "Why Northside chose SMS over social and email" },
      {
        type: "p",
        text: "Northside had tried the usual channels before: an Instagram story, a boosted Facebook post, and a weekly email newsletter. Each worked a little, but none of them moved fast enough for a same-day sale. Social posts get buried in an algorithm within hours. Emails sit unread in a promotions tab for days. A text message, by contrast, lands in the one inbox almost everyone actually checks — and checks quickly.",
      },
      {
        type: "p",
        text: "The team also liked that SMS didn't require a design pass. There was no banner to commission, no A/B test on subject lines, no scheduling around an algorithm's preferred posting time. They wrote four lines of copy, picked their list, and were live in under ten minutes.",
      },
      { type: "h2", text: "The setup: one campaign, one click" },
      {
        type: "p",
        text: "Using SMSLocal's bulk sending tool, the Northside team built their message, selected their full subscriber list, and scheduled it to go out at 10:00 AM — right as the morning rush was winding down and the lunch crowd was starting to think about what's next. No apps to install, no code to write, no developer on call. Just a browser tab and a send button.",
      },
      {
        type: "quote",
        text: "We didn't touch a single line of code. We wrote the message, picked the list, and hit send.",
        attribution: "Store Manager, Northside Coffee",
      },
      { type: "h3", text: "The message that worked" },
      {
        type: "p",
        text: "Short, urgent, and specific — no filler. It named the discount, the deadline, and included a one-tap link straight to checkout. That clarity is a big part of why click-through outperformed email by more than 4x. There was no hero image, no logo, no elaborate formatting — just a sentence a person could read in the time it takes to glance at a lock screen.",
      },
      {
        type: "p",
        text: "That restraint was deliberate. Every extra word in a text message is a reason for someone to stop reading before they get to the link. Northside's copywriting rule of thumb going forward: if the offer, the deadline, and the link can't fit in two sentences, the message needs another pass.",
      },
      {
        type: "stats",
        items: [
          { num: "12,480", label: "Messages sent" },
          { num: "99.7%", label: "Delivered" },
          { num: "1.2s", label: "Avg. delivery speed" },
        ],
      },
      {
        type: "cta",
        heading: "See what a single campaign can do for your business",
        text: "Launch your first bulk SMS send in minutes — no apps, no code, no waiting on a developer.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Two-way replies turned questions into sales" },
      {
        type: "p",
        text: "Because SMSLocal supports two-way messaging, customers who texted back with questions — is this valid in-store, how long does the sale run, does it apply to gift cards — landed directly in Northside's shared team inbox instead of going nowhere. Staff answered in real time, and several of those replies converted into same-day orders that would otherwise have been abandoned at the first moment of doubt.",
      },
      {
        type: "ul",
        items: [
          "Every reply routed into one shared inbox, no missed messages",
          "Average response time under two minutes during the sale window",
          "Follow-up automation re-engaged anyone who clicked but didn't check out",
        ],
      },
      {
        type: "p",
        text: "The team was surprised by how much of the day's revenue traced back to those replies. A blast is a broadcast; it only becomes a conversation when someone can answer back on the same channel, without the customer having to switch to email or a phone call to get an answer.",
      },
      { type: "h2", text: "What the numbers looked like by end of day" },
      {
        type: "p",
        text: "By 6 PM, Northside had processed more orders than any single day in the previous quarter. A meaningful share of those orders came from customers who had not purchased anything in over two months — the flash sale was as much a reactivation campaign as it was a discount push, even though the team hadn't planned it that way.",
      },
      { type: "h2", text: "What they'd do differently next time" },
      {
        type: "p",
        text: "The team's biggest takeaway: segment earlier. Sending to the full list worked, but Northside is now testing smaller, targeted sends — regulars vs. new sign-ups — to see if personalized offers push conversion even higher next quarter. They're also considering a shorter, four-hour version of the sale to create even more urgency, since the busiest 90 minutes of ordering happened almost immediately after the text went out.",
      },
      {
        type: "cta",
        heading: "Ready to run a campaign like this?",
        text: "SMSLocal gives you the same bulk sending, two-way replies, and delivery reporting Northside used — free to start.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "For any business considering their first bulk campaign, Northside's advice is simple: keep the message short, make the offer obvious, and be ready to reply. The technology is the easy part — the text itself is what does the convincing.",
      },
    ],
    faqs: [
      {
        q: "How many subscribers do I need before running a flash sale over SMS?",
        a: "There's no minimum. Even a list of a few hundred engaged subscribers can produce a strong same-day result — the key factor is engagement, not raw list size.",
      },
      {
        q: "Do I need a developer to send a campaign like this?",
        a: "No. Northside's team built and sent the entire campaign from a browser, with no code and no app to install.",
      },
      {
        q: "What made the message convert so well?",
        a: "Brevity and clarity — the discount, the deadline, and a one-tap checkout link, with nothing else competing for attention.",
      },
      {
        q: "How did two-way replies contribute to sales?",
        a: "Customers who texted back with questions were answered in real time instead of abandoning the purchase, converting doubt into completed orders.",
      },
      {
        q: "Is this approach only for retail businesses?",
        a: "No — the same one-click bulk send and two-way reply pattern works for service businesses, restaurants, and any business with a subscriber list and a time-sensitive offer.",
      },
    ],
  },
  {
    slug: "bulk-sms-templates-that-get-replies",
    title: "10 Bulk SMS Templates That Actually Get Replies",
    emphasis: "Replies",
    category: "Bulk SMS",
    date: "Jul 16, 2026",
    readTime: "5 min read",
    excerpt:
      "Steal these ten proven message formats for promotions, reminders, and alerts, built from real SMSLocal campaigns customers actually open and answer.",
    dek: "Steal these proven message formats for promotions, reminders, and alerts — built from thousands of real SMSLocal campaigns.",
    author: authors.john,
    tags: ["Bulk SMS", "Templates", "Marketing"],
    body: [
      {
        type: "p",
        text: "The best SMS templates share three traits: they're short, they name the offer up front, and they give the reader exactly one thing to do next. Everything else — the emoji, the brand voice, the clever hook — is optional. Clarity is not.",
      },
      {
        type: "p",
        text: "We pulled these ten formats from thousands of real SMSLocal campaigns across retail, hospitality, and services. Each one has been tested, iterated on, and trimmed down until every remaining word earned its place.",
      },
      { type: "h2", text: "Promotional templates" },
      {
        type: "p",
        text: "Promotions are the most common use of bulk SMS, and also the easiest to get wrong by overwriting. The goal isn't to explain the offer — it's to get someone to tap the link and let the landing page do the explaining.",
      },
      {
        type: "ul",
        items: [
          "\"[Brand]: 30% off today only. Shop now: [link]\"",
          "\"Last call — your cart expires in 2 hours. Finish checkout: [link]\"",
          "\"New arrivals just dropped. Be first: [link]\"",
        ],
      },
      {
        type: "cta",
        heading: "Send your first promotional campaign today",
        text: "Pick a template, plug in your offer, and reach your full list in one click with SMSLocal's bulk sender.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Reminder templates" },
      {
        type: "p",
        text: "Reminders exist to reduce friction, not to sell anything. The best ones read like a note from a person, not a marketing department — which is exactly why they get replies.",
      },
      {
        type: "ul",
        items: [
          "\"Reminder: your appointment is tomorrow at 3 PM. Reply C to confirm.\"",
          "\"Your order ships today. Track it here: [link]\"",
        ],
      },
      { type: "h2", text: "Alert templates" },
      {
        type: "p",
        text: "Alerts should read like a notification, not an ad — plain language, no emoji overload, and a clear next step if action is required. If a customer has to re-read an alert to understand what happened, the template has failed its one job.",
      },
      {
        type: "quote",
        text: "Every extra word in an SMS is a reason for someone to stop reading.",
      },
      { type: "h2", text: "Re-engagement templates" },
      {
        type: "p",
        text: "For subscribers who haven't opened, clicked, or purchased in a while, a plainly worded check-in tends to outperform anything with a hard sell. \"We miss you\" style messages paired with a small, no-strings incentive consistently pull dormant contacts back into the fold without feeling desperate.",
      },
      {
        type: "ul",
        items: [
          "\"Haven't seen you in a while — here's 15% back on us: [link]\"",
          "\"Still interested? Your saved cart is waiting: [link]\"",
        ],
      },
      { type: "h2", text: "How to test and improve your own templates" },
      {
        type: "p",
        text: "Once you have a working template, resist the urge to keep adding to it. Instead, change one variable at a time — the deadline, the discount amount, or the call-to-action verb — and compare click-through and reply rates across sends. Over a few campaigns, this turns guesswork into a repeatable playbook specific to your audience.",
      },
      {
        type: "cta",
        heading: "Turn these templates into a real campaign",
        text: "SMSLocal's reporting shows exactly which template variant performs best, send after send.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "None of these templates are meant to be copied word-for-word forever. Treat them as a starting point, swap in your brand's voice, and let your own delivery and reply data tell you which version to keep sending.",
      },
    ],
    faqs: [
      {
        q: "What's the ideal length for a bulk SMS message?",
        a: "Aim for one or two short sentences — enough to state the offer, the deadline, and the link, with nothing extra to slow the reader down.",
      },
      {
        q: "Should I use emoji in promotional templates?",
        a: "Sparingly. One relevant emoji can add tone, but stacking several often reads as spam and can trigger carrier filtering.",
      },
      {
        q: "How often should I send reminder texts?",
        a: "Only when there's a real reason — an upcoming appointment or a shipping update. Reminders sent without a clear trigger tend to get tuned out quickly.",
      },
      {
        q: "Do alert templates need a call to action?",
        a: "Only if action is actually required. A shipping alert may need none; a payment failure alert should always include one clear next step.",
      },
      {
        q: "How do I know which template is working best?",
        a: "Track click-through and reply rate for each variant and change one element at a time — the offer, the deadline, or the wording — so you know exactly what moved the number.",
      },
    ],
  },
  {
    slug: "multi-step-sms-flows",
    title: "Multi-Step SMS Flows: Cart to Win-Back Sequence",
    emphasis: "Win-Back",
    category: "Automation",
    date: "Jul 12, 2026",
    readTime: "6 min read",
    excerpt:
      "A step-by-step guide to building triggered SMS flows that recover abandoned carts automatically, from the first nudge to the final win-back offer.",
    dek: "A step-by-step guide to setting up triggered follow-ups that recover lost sales automatically, from the first abandoned cart to the final win-back text.",
    author: authors.sarah,
    tags: ["Automation", "Campaigns", "E-commerce"],
    body: [
      {
        type: "p",
        text: "A single abandoned-cart text recovers some sales. A flow — a sequence of timed, conditional messages — recovers a lot more, because it meets the customer at each point where they might change their mind, rather than gambling on a single moment.",
      },
      {
        type: "p",
        text: "This guide walks through a three-step flow that SMSLocal customers use to turn abandoned carts into completed orders, without a single manual follow-up.",
      },
      { type: "h2", text: "Why one message isn't enough" },
      {
        type: "p",
        text: "Most shoppers who abandon a cart aren't rejecting the product — they're distracted, comparing prices elsewhere, or waiting on a paycheck. A single reminder catches whoever happens to be ready right that moment. A flow catches the rest by giving them more than one chance, with a different nudge each time.",
      },
      { type: "h2", text: "Step 1: The instant nudge" },
      {
        type: "p",
        text: "Send immediately after cart abandonment: a friendly reminder with a direct link back to checkout. This message shouldn't include a discount — it's for the shopper who simply got interrupted and needs a one-tap way back to where they left off.",
      },
      {
        type: "cta",
        heading: "Build your first automated flow",
        text: "SMSLocal's automation builder lets you set up triggers, waits, and conditions without writing a single line of code.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Step 2: The wait-and-check" },
      {
        type: "p",
        text: "Wait one hour, then check whether the order completed. If not, move to the next step automatically — no manual work required. This is the step most teams skip when they build flows by hand, because checking order status usually means jumping between two systems. With triggers built into the flow, the check happens instantly and silently.",
      },
      { type: "h2", text: "Step 3: The win-back offer" },
      {
        type: "p",
        text: "After 24 hours with no purchase, send a small incentive — free shipping or a modest discount — to close the loop. By this point, price is often the last remaining objection, so a modest nudge tends to convert shoppers who were on the fence the whole time.",
      },
      {
        type: "stats",
        items: [
          { num: "3", label: "Steps in the flow" },
          { num: "24h", label: "Full flow duration" },
          { num: "0", label: "Manual follow-ups needed" },
        ],
      },
      { type: "h2", text: "Extending the flow beyond cart recovery" },
      {
        type: "p",
        text: "Once the basic three-step flow is running, most teams branch it further: a fourth message for anyone who clicked but still didn't buy, a separate flow for first-time visitors versus repeat customers, and a completely different sequence for high-value carts that might warrant a phone call instead of another text.",
      },
      {
        type: "ul",
        items: [
          "Branch by cart value — high-value carts get a different, more personal follow-up",
          "Branch by customer history — first-time vs. repeat buyers see different offers",
          "Add a final \"we'll leave you alone now\" message so the flow has a clean exit",
        ],
      },
      {
        type: "cta",
        heading: "See automation in action",
        text: "Watch how SMSLocal customers recover lost sales without lifting a finger after setup.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "The teams who get the most out of flows treat them the same way they'd treat any other part of the funnel: something to measure, adjust, and improve over time — not a set-it-and-forget-it script.",
      },
    ],
    faqs: [
      {
        q: "How long should a cart abandonment flow run?",
        a: "Most teams see the best return within the first 24 hours. Beyond that, additional messages tend to produce diminishing returns and can feel intrusive.",
      },
      {
        q: "Should the first message include a discount?",
        a: "No — save the incentive for later in the flow. The first message is for shoppers who were simply interrupted and just need a way back to checkout.",
      },
      {
        q: "Can flows branch based on cart value?",
        a: "Yes. Many teams route high-value carts to a different, more personal follow-up rather than the standard automated sequence.",
      },
      {
        q: "Do I need developer help to build a flow like this?",
        a: "No — SMSLocal's automation builder lets you configure triggers, waits, and conditions without writing code.",
      },
      {
        q: "What happens after the win-back message if the customer still doesn't buy?",
        a: "Most flows end there and let the contact rejoin the normal campaign cadence rather than continuing to chase the same cart indefinitely.",
      },
    ],
  },
  {
    slug: "two-way-sms-vs-blasts",
    title: "Two-Way SMS Beats One-Way Blasts for Support",
    emphasis: "Support",
    category: "Two-Way Messaging",
    date: "Jul 09, 2026",
    readTime: "4 min read",
    excerpt:
      "See how a shared inbox for text replies cuts first-response time, resolves support tickets faster, and boosts customer satisfaction for teams.",
    dek: "See how a shared inbox for text replies cuts response times, resolves issues faster, and boosts customer satisfaction scores.",
    author: authors.sarah,
    tags: ["Two-Way Messaging", "Support"],
    body: [
      {
        type: "p",
        text: "A one-way blast broadcasts. A two-way conversation resolves. When customers can simply reply to the number that texted them, support gets faster and cheaper — and the customer never has to leave the app they were already using.",
      },
      {
        type: "p",
        text: "This distinction matters more than it sounds. Plenty of businesses already send SMS alerts and reminders. Far fewer let customers reply to them, and that gap is exactly where a lot of avoidable churn happens.",
      },
      { type: "h2", text: "What changes with two-way messaging" },
      {
        type: "ul",
        items: [
          "Replies land in one shared inbox instead of getting lost",
          "Any teammate can pick up a thread with full history",
          "Common questions get answered in the same channel as the original message",
        ],
      },
      {
        type: "p",
        text: "The shared inbox is the part teams underestimate before they set it up. Without one, a reply to an SMS blast either disappears into an unmonitored number or gets forwarded manually to whoever happens to be free. With one, every reply is visible to the whole team, tagged with the customer's prior messages, and available to whichever agent picks it up next.",
      },
      {
        type: "cta",
        heading: "Give every reply a home",
        text: "SMSLocal's shared inbox puts every customer reply in one place, with full conversation history attached.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "The cost of one-way-only messaging" },
      {
        type: "p",
        text: "When a customer can't reply to a text, they default to whatever channel is left — usually a phone call or an email, both of which take longer to resolve and cost more per interaction to staff. Every one-way alert is a small tax on your support team's time, paid later instead of avoided now.",
      },
      { type: "h2", text: "What good two-way support looks like in practice" },
      {
        type: "p",
        text: "The fastest-responding teams share a few habits: they keep replies short and specific, they close the loop explicitly (\"you're all set\" beats silence), and they route by keyword so a simple \"STOP\" or \"HELP\" never waits behind a complex ticket.",
      },
      {
        type: "quote",
        text: "Customers don't want another app to open. They want to reply to the text they already got.",
      },
      { type: "h2", text: "Measuring the difference" },
      {
        type: "p",
        text: "Teams that switch from one-way blasts to two-way support typically track two numbers before and after: average first-response time, and the percentage of issues resolved without escalating to a phone call. Both tend to improve within the first few weeks, simply because the reply is already sitting in an inbox someone is watching.",
      },
      {
        type: "cta",
        heading: "See two-way messaging in action",
        text: "Watch how support teams resolve issues over text without ever picking up the phone.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "If your business already sends texts but doesn't let customers reply to them, that's the single highest-leverage change you can make this quarter — it costs nothing to turn on and it removes a friction point customers feel every time they try to respond.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between a blast and two-way messaging?",
        a: "A blast only sends outbound; two-way messaging lets recipients reply to the same number, with those replies landing in a shared inbox your team can act on.",
      },
      {
        q: "Do I need extra staff to handle two-way replies?",
        a: "Not necessarily. Because every reply lands in one shared inbox, any available teammate can pick it up — there's no need for a dedicated line per agent.",
      },
      {
        q: "How fast should support teams respond to a text reply?",
        a: "Under two minutes is a reasonable target during business hours — customers who text expect a much faster response than email.",
      },
      {
        q: "Can two-way SMS replace phone support entirely?",
        a: "For most routine questions, yes. Complex issues may still need a call, but two-way SMS resolves a large share of tickets without one.",
      },
      {
        q: "What metrics show whether two-way messaging is working?",
        a: "Track average first-response time and the percentage of issues resolved without escalating to a phone call — both should improve within a few weeks.",
      },
    ],
  },
  {
    slug: "reading-carrier-delivery-reports",
    title: "Reading Your Carrier Delivery Report: The Basics",
    emphasis: "Field Guide",
    category: "Analytics",
    date: "Jul 04, 2026",
    readTime: "5 min read",
    excerpt:
      "A practical guide to delivery rate, carrier breakdown, and average speed metrics, so you know when to worry, when to shrug it off, and what to fix next.",
    dek: "Understand delivery rate, carrier breakdown, and average speed metrics so you can optimize every campaign you send.",
    author: authors.david,
    tags: ["Analytics", "Reporting"],
    body: [
      {
        type: "p",
        text: "Every SMSLocal campaign ends with a delivery report. Here's what each number actually tells you — and when to worry, when to shrug it off, and when to change what you're sending.",
      },
      {
        type: "stats",
        items: [
          { num: "99.7%", label: "Healthy delivery rate" },
          { num: "1.2s", label: "Healthy avg. speed" },
          { num: "<1%", label: "Expected carrier filtering" },
        ],
      },
      { type: "h2", text: "Delivery rate" },
      {
        type: "p",
        text: "Anything above 98% is healthy. A sudden drop usually points to an outdated contact list or a carrier-side filtering issue rather than anything wrong with your account. Before assuming the worst, check whether the drop is concentrated in one carrier or spread evenly — that single detail usually tells you which of the two it is.",
      },
      { type: "h2", text: "Carrier breakdown" },
      {
        type: "p",
        text: "Uneven delivery across carriers can flag content that's tripping spam filters on one network but not another — worth testing message copy if you see a gap. Certain words (\"free,\" excessive punctuation, ALL CAPS) trigger filtering more aggressively on some carriers than others, so a breakdown that looks fine in aggregate can still hide a real problem on one network.",
      },
      {
        type: "cta",
        heading: "See your own delivery data in real time",
        text: "SMSLocal's dashboard breaks down delivery, speed, and carrier performance for every campaign you send.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Average delivery speed" },
      {
        type: "p",
        text: "Speed matters most for time-sensitive sends — OTP codes, appointment reminders, flash sales. Anything under two seconds is generally imperceptible to the recipient. If average speed creeps upward over several campaigns, it's usually a sign of list size growth outpacing your sending configuration, not a carrier issue.",
      },
      { type: "h2", text: "Click and reply rates" },
      {
        type: "p",
        text: "Delivery tells you the message arrived. Click and reply rates tell you whether it worked. A high delivery rate paired with a low click rate almost always points back to the message itself — the offer, the timing, or the call to action — rather than anything on the technical side.",
      },
      {
        type: "ul",
        items: [
          "Delivery rate answers: did it arrive?",
          "Click-through rate answers: was it worth reading?",
          "Reply rate answers: did it start a conversation?",
        ],
      },
      { type: "h2", text: "Building a weekly reporting habit" },
      {
        type: "p",
        text: "Rather than reacting to a single campaign's numbers, most experienced senders track a rolling weekly average across delivery rate, speed, and click-through. That habit makes it obvious within days — not months — when something has shifted, whether that's a list quality issue, a carrier change, or a template that's starting to feel stale to your audience.",
      },
      {
        type: "cta",
        heading: "Turn reporting into better campaigns",
        text: "See exactly which templates, send times, and segments perform best — and which need a rework.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "None of these metrics matter in isolation. Read them together, watch them over time, and use them to decide what to test next rather than as a scorecard for any single send.",
      },
    ],
    faqs: [
      {
        q: "What delivery rate should I expect on a healthy campaign?",
        a: "Anything above 98% is considered healthy. Consistently lower rates usually point to list quality or carrier filtering issues.",
      },
      {
        q: "Why would delivery differ across carriers?",
        a: "Message content can trigger spam filters more aggressively on some carrier networks than others — a breakdown by carrier helps isolate the cause.",
      },
      {
        q: "What counts as a healthy average delivery speed?",
        a: "Under two seconds is generally imperceptible to recipients and considered healthy for most campaign types.",
      },
      {
        q: "Does a high delivery rate guarantee a successful campaign?",
        a: "No. Delivery only confirms the message arrived — click-through and reply rate tell you whether the content itself actually worked.",
      },
      {
        q: "How often should I review my delivery reports?",
        a: "Weekly is a good default. A rolling weekly average makes it easy to spot a shift in list quality or carrier behavior quickly.",
      },
    ],
  },
  {
    slug: "api-integrations-crm",
    title: "Connecting Your CRM to SMSLocal with the API",
    emphasis: "Minutes",
    category: "Bulk SMS",
    date: "Jun 22, 2026",
    readTime: "6 min read",
    excerpt:
      "A practical walkthrough of the REST API and pre-built integrations for CRM, helpdesk, and e-commerce tools most teams adopt within the hour.",
    dek: "A practical walkthrough of the REST API and pre-built integrations for e-commerce and helpdesk tools — no custom backend required.",
    author: authors.sarah,
    tags: ["API", "Integrations", "Developers"],
    body: [
      {
        type: "p",
        text: "SMSLocal's REST API lets you trigger messages from anywhere your data already lives — CRM, helpdesk, or e-commerce platform. You don't need to build a messaging backend from scratch; you need one authenticated request.",
      },
      { type: "h2", text: "Quick start" },
      {
        type: "p",
        text: "Authenticate with an API key, POST to /v1/messages with a recipient and body, and you're sending — most teams are live within the hour. There's no queueing infrastructure to stand up on your side; SMSLocal handles delivery, retries, and carrier routing behind that single endpoint.",
      },
      {
        type: "quote",
        text: "POST /v1/messages, 200 OK, message queued for 12,480 contacts — delivered in 42ms.",
      },
      { type: "h2", text: "Pre-built integrations" },
      {
        type: "ul",
        items: [
          "Pre-built CRM sync for contact and segment data",
          "Helpdesk integration for ticket-triggered texts",
          "E-commerce webhooks for order and shipping updates",
        ],
      },
      {
        type: "p",
        text: "For most teams, the pre-built integrations remove the need to touch the API at all. Connect your CRM once, map the fields that matter, and every new contact or updated segment is available for your next campaign automatically.",
      },
      {
        type: "cta",
        heading: "Connect your first integration",
        text: "SMSLocal plugs into the CRM, helpdesk, and e-commerce tools you already use — no engineering ticket required.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "When to use the API instead of a pre-built integration" },
      {
        type: "p",
        text: "The API is the right choice when your trigger logic lives somewhere custom — an internal ops tool, a proprietary booking system, or a workflow that spans more than one platform. In those cases, a single webhook call at the moment an event happens is simpler than trying to force a generic integration to match your specific process.",
      },
      { type: "h2", text: "Handling replies programmatically" },
      {
        type: "p",
        text: "Beyond sending, the API also supports inbound webhooks, so a reply to any message can trigger a workflow in your own systems — updating a CRM field, reopening a support ticket, or logging a confirmation. This is what turns a simple send into a genuine two-way integration rather than a one-directional blast.",
      },
      {
        type: "ul",
        items: [
          "Log every inbound reply against the original contact record",
          "Trigger internal alerts when a customer replies with specific keywords",
          "Sync opt-outs back to your CRM automatically to stay compliant",
        ],
      },
      {
        type: "cta",
        heading: "Talk to our team about your integration",
        text: "Whether you need the API or a pre-built connector, our team can help you scope the fastest path to launch.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "Most teams end up using both: pre-built integrations for the common paths, and the API for the one or two workflows that are unique to how their business actually runs.",
      },
    ],
    faqs: [
      {
        q: "Do I need to use the API if I already have a CRM integration?",
        a: "Not necessarily. Pre-built integrations cover most common workflows — the API is best reserved for logic unique to your own systems.",
      },
      {
        q: "How long does it take to get the API sending messages?",
        a: "Most teams are live within the hour — authenticate with an API key, POST to /v1/messages, and delivery is handled for you.",
      },
      {
        q: "Can the API handle inbound replies, not just outbound sends?",
        a: "Yes. Inbound webhooks let a reply trigger a workflow in your own systems, such as updating a CRM record or reopening a ticket.",
      },
      {
        q: "What data does the CRM sync keep updated?",
        a: "Contact and segment data sync automatically once connected, so new or updated contacts are available for your next campaign without manual work.",
      },
      {
        q: "Is a custom backend required to use SMSLocal's API?",
        a: "No — the API is designed to be called directly from your existing CRM, helpdesk, or e-commerce platform without any custom messaging infrastructure.",
      },
    ],
  },
  {
    slug: "sms-vs-email-open-rates",
    title: "SMS vs. Email: Why Text Wins the Open Rate Battle",
    emphasis: "Battle",
    category: "Campaigns",
    date: "Jun 18, 2026",
    readTime: "5 min read",
    excerpt:
      "Text messages get opened within minutes, not days. Here's the data behind why SMS consistently beats email open rates for time-sensitive campaigns.",
    dek: "Text messages get opened in minutes, not days. Here's the data behind why SMS consistently outperforms email for time-sensitive offers.",
    author: authors.john,
    tags: ["Campaigns", "Marketing", "Benchmarks"],
    body: [
      {
        type: "p",
        text: "Email open rates hover around 20%. SMS open rates routinely clear 95% — and most of those opens happen within three minutes of delivery. That gap alone explains why so many time-sensitive campaigns have quietly moved from the inbox to the lock screen.",
      },
      {
        type: "stats",
        items: [
          { num: "95%+", label: "Typical SMS open rate" },
          { num: "3 min", label: "Median time to open" },
          { num: "20%", label: "Typical email open rate" },
        ],
      },
      { type: "h2", text: "Why the gap is so large" },
      {
        type: "p",
        text: "Email lives behind a spam filter, a promotions tab, and a subject line that has to win a split-second decision against dozens of competing messages. A text message lives on the same lock screen as a call from a family member. The channel itself carries a different level of attention before a single word is even read.",
      },
      { type: "h2", text: "When SMS wins outright" },
      {
        type: "ul",
        items: [
          "Flash sales and same-day promotions",
          "Appointment and shipping reminders",
          "Anything with a hard deadline",
        ],
      },
      {
        type: "cta",
        heading: "Test SMS against your next campaign",
        text: "Run your next time-sensitive promotion over text and see the open-rate difference yourself.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Where email still has a place" },
      {
        type: "p",
        text: "Long-form newsletters and detailed product education still read better in an inbox. The winning move is pairing both — SMS for urgency, email for depth. A well-run program uses SMS to drive the immediate action and email to nurture the relationship over time, rather than treating them as competing channels.",
      },
      { type: "h2", text: "How to combine both without overwhelming customers" },
      {
        type: "p",
        text: "The teams who blend channels well are disciplined about which triggers go where. A cart abandonment gets a text, because speed matters. A monthly product roundup gets an email, because nobody needs that delivered to their pocket at 8 AM on a Saturday.",
      },
      {
        type: "ul",
        items: [
          "Reserve SMS for messages with a real deadline or urgent action",
          "Use email for anything that benefits from more context or visuals",
          "Never send the identical message on both channels within the same hour",
        ],
      },
      { type: "h2", text: "What to measure when you switch a campaign to SMS" },
      {
        type: "p",
        text: "Before declaring SMS the winner for a given campaign type, compare more than open rate — track click-through, conversion, and unsubscribe rate side by side with the email version. Some campaigns genuinely perform better over text; others just feel more urgent without actually converting better, and the only way to know is to look at the full funnel.",
      },
      {
        type: "cta",
        heading: "See the full picture, not just opens",
        text: "SMSLocal's reporting shows delivery, clicks, and conversions in one dashboard.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "SMS isn't a replacement for email — it's a different tool for a different moment. The businesses getting the most out of both know exactly which moment belongs to which channel.",
      },
    ],
    faqs: [
      {
        q: "Why does SMS have a much higher open rate than email?",
        a: "Text messages land on the lock screen, the same place as a call from a family member, so they receive a different level of attention before anyone even reads a word.",
      },
      {
        q: "Should I stop sending email if SMS performs better?",
        a: "No. Email still works well for long-form content and product education — the best programs use both, matched to the right moment.",
      },
      {
        q: "What kinds of campaigns benefit most from moving to SMS?",
        a: "Anything with a hard deadline: flash sales, appointment reminders, and shipping updates all see the biggest lift.",
      },
      {
        q: "How do I avoid overwhelming customers with two channels?",
        a: "Never send the identical message on both channels within the same hour, and reserve SMS specifically for messages with real urgency.",
      },
      {
        q: "What should I measure before declaring SMS the winner for a campaign?",
        a: "Look beyond open rate — compare click-through, conversion, and unsubscribe rate side by side with the email version.",
      },
    ],
  },
  {
    slug: "compliance-checklist-tcpa",
    title: "The 2026 SMS Compliance Checklist, Simplified",
    emphasis: "Needs",
    category: "Analytics",
    date: "Jun 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Opt-in language, quiet hours, and opt-out handling — a practical 2026 checklist that keeps your SMS program compliant and your delivery rates high.",
    dek: "Opt-in language, quiet hours, opt-out handling — a practical checklist to keep your SMS program compliant and your delivery rates high.",
    author: authors.priya,
    tags: ["Compliance", "Analytics", "Best Practices"],
    body: [
      {
        type: "p",
        text: "Compliance isn't just a legal checkbox — carriers actively filter non-compliant traffic, which tanks delivery rates for everyone on a shared number. Getting the basics right protects both your customers and your own send performance.",
      },
      { type: "h2", text: "Before you send" },
      {
        type: "ul",
        items: [
          "Get explicit opt-in consent, in writing, before the first message",
          "Include your brand name in every message",
          "Honor quiet hours in each recipient's local time zone",
        ],
      },
      {
        type: "p",
        text: "Opt-in consent is the foundation everything else sits on. A contact imported from a spreadsheet without a documented opt-in isn't a subscriber — it's a liability the moment they file a complaint. Keep a timestamped record of how and when consent was collected for every contact on your list.",
      },
      { type: "h2", text: "Every message needs" },
      {
        type: "ul",
        items: [
          "A clear way to opt out (\"Reply STOP to unsubscribe\")",
          "No deceptive or hidden pricing language",
        ],
      },
      {
        type: "cta",
        heading: "Run your compliance check before your next send",
        text: "SMSLocal automatically handles opt-out keywords and quiet-hour scheduling for every campaign.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Handling opt-outs correctly" },
      {
        type: "p",
        text: "An opt-out request must be processed immediately and permanently — not queued for the next batch update. Any contact who replies STOP, UNSUBSCRIBE, or a similar keyword should be suppressed from every future send instantly, and re-subscribing should require a fresh opt-in, not a simple reversal.",
      },
      {
        type: "quote",
        text: "A clean opt-out flow protects your delivery rate as much as it protects the customer.",
      },
      { type: "h2", text: "Quiet hours and time zones" },
      {
        type: "p",
        text: "Most jurisdictions restrict marketing texts to a daytime window, typically 8 AM to 9 PM in the recipient's local time zone — not yours. A national list spanning multiple time zones needs sends scheduled against each recipient's own local time, not a single blanket send time for the whole list.",
      },
      { type: "h2", text: "Keeping records for an audit" },
      {
        type: "p",
        text: "If your program is ever audited, the records that matter most are proof of opt-in, a timestamped log of every message sent, and evidence that opt-out requests were honored within a reasonable window. Building this into your process from day one is far easier than reconstructing it after the fact.",
      },
      {
        type: "ul",
        items: [
          "Store opt-in source, timestamp, and method for every contact",
          "Keep a searchable send log per campaign",
          "Review your opt-out handling quarterly, not just when something breaks",
        ],
      },
      {
        type: "cta",
        heading: "Build a compliant program from day one",
        text: "Talk to our team about setting up opt-in tracking, quiet hours, and opt-out handling correctly.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "None of this needs to slow your program down. Once opt-in tracking and opt-out handling are configured correctly, compliance becomes something that happens automatically in the background of every send.",
      },
    ],
    faqs: [
      {
        q: "What counts as valid opt-in consent?",
        a: "Explicit, documented consent collected before the first message — a contact imported from a spreadsheet without that record isn't a valid subscriber.",
      },
      {
        q: "How quickly must an opt-out be processed?",
        a: "Immediately and permanently. An opt-out reply should suppress that contact from every future send right away, not on the next batch update.",
      },
      {
        q: "What are quiet hours and why do they matter?",
        a: "Most jurisdictions restrict marketing texts to a daytime window in the recipient's own local time zone — sending outside it risks complaints and carrier filtering.",
      },
      {
        q: "What records should I keep for a compliance audit?",
        a: "Proof of opt-in with a timestamp, a searchable send log per campaign, and evidence that opt-outs were honored promptly.",
      },
      {
        q: "Does compliance hurt delivery rates?",
        a: "The opposite — carriers actively filter non-compliant traffic, so a clean opt-in and opt-out process actually protects your delivery rate.",
      },
    ],
  },
  {
    slug: "segmentation-that-converts",
    title: "Segmentation That Converts: Beyond First Names",
    emphasis: "Personalization",
    category: "Automation",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    excerpt:
      "Basic first-name personalization is table stakes. Here's how top SMSLocal accounts segment by recency, frequency, and engagement to lift conversion.",
    dek: "Basic personalization is table stakes. Here's how top SMSLocal accounts segment by behavior, not just demographics, to lift conversion.",
    author: authors.emily,
    tags: ["Automation", "Segmentation", "Marketing"],
    body: [
      {
        type: "p",
        text: "Adding a first name to a template is easy. Real lift comes from segmenting by what someone actually did — not just who they are. Demographic personalization makes a message feel less generic; behavioral segmentation makes it feel relevant.",
      },
      { type: "h2", text: "Behavioral segments worth building" },
      {
        type: "ul",
        items: [
          "Recent purchasers vs. window shoppers",
          "High-frequency buyers vs. one-time customers",
          "Engaged repliers vs. silent subscribers",
        ],
      },
      {
        type: "p",
        text: "Each of these pairs deserves a different message, not just a different name field. A recent purchaser doesn't need to hear about the product they just bought — they need a complementary offer or a request for feedback. A window shopper needs a reason to come back and finish what they started.",
      },
      {
        type: "cta",
        heading: "Start segmenting your list today",
        text: "SMSLocal makes it easy to build behavioral segments and target each one with the right message.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "A simple test to run this month" },
      {
        type: "p",
        text: "Split your next campaign into two segments — active in the last 30 days vs. inactive — and send each a different offer. Most teams see the active segment convert 2-3x higher, which usually surprises people the first time they run the comparison side by side.",
      },
      { type: "h2", text: "Combining segments without overcomplicating things" },
      {
        type: "p",
        text: "It's tempting to build a dozen narrow segments right away. In practice, two or three well-chosen splits — recency, frequency, and engagement — cover most of the lift available before the complexity starts outweighing the benefit. Start simple, measure the difference, and only add more granularity once the basic splits are clearly working.",
      },
      {
        type: "ul",
        items: [
          "Recency: how recently did they purchase or engage?",
          "Frequency: how often do they buy or reply?",
          "Engagement: do they open, click, and reply, or stay silent?",
        ],
      },
      { type: "h2", text: "What to do with your silent subscribers" },
      {
        type: "p",
        text: "Contacts who never open, click, or reply are worth a segment of their own — not for more of the same messaging, but for a deliberate re-engagement attempt or, eventually, removal from the list. A shrinking list of engaged subscribers consistently outperforms a large list padded with contacts who never respond.",
      },
      {
        type: "cta",
        heading: "See segmentation results for yourself",
        text: "Watch how SMSLocal customers use behavioral segments to lift conversion without extra manual work.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "Segmentation isn't about sending more messages — it's about sending fewer, better-targeted ones. Most teams that adopt behavioral segmentation end up sending less volume overall while converting more of the audience that actually responds.",
      },
    ],
    faqs: [
      {
        q: "Is first-name personalization enough on its own?",
        a: "It helps a message feel less generic, but the real lift comes from segmenting by behavior — what someone actually did, not just their name.",
      },
      {
        q: "What are the most useful segments to start with?",
        a: "Recency, frequency, and engagement — active vs. inactive, frequent vs. one-time buyers, and repliers vs. silent subscribers cover most of the available lift.",
      },
      {
        q: "How much of a conversion difference does segmentation make?",
        a: "Many teams see their active segment convert 2-3x higher than an unsegmented send when tested side by side.",
      },
      {
        q: "Should I remove silent subscribers from my list?",
        a: "Eventually, yes. A smaller list of engaged subscribers consistently outperforms a large list padded with contacts who never respond.",
      },
      {
        q: "Is it better to build many narrow segments or a few broad ones?",
        a: "Start with two or three well-chosen splits. Additional granularity is only worth adding once the basic segments are clearly working.",
      },
    ],
  },
  {
    slug: "restaurant-sms-reservation-reminders",
    title: "How Restaurants Use SMS to Cut No-Shows in Half",
    emphasis: "Half",
    category: "Campaigns",
    date: "Jun 05, 2026",
    readTime: "4 min read",
    excerpt:
      "A simple two-message reminder flow that local restaurants use to confirm bookings, catch errors early, and fill last-minute cancellations quickly.",
    dek: "A simple two-message reminder flow that local restaurants use to confirm bookings and fill last-minute cancellations.",
    author: authors.david,
    tags: ["Campaigns", "Reminders", "Hospitality"],
    body: [
      {
        type: "p",
        text: "No-shows are one of the most expensive problems in hospitality. A two-text reminder flow is often enough to cut them dramatically, without adding any extra work for front-of-house staff.",
      },
      {
        type: "p",
        text: "Unlike a phone call, a text reminder doesn't require someone to be available to answer, and unlike email, it's almost guaranteed to be seen before the reservation time arrives.",
      },
      { type: "h2", text: "The flow" },
      {
        type: "ul",
        items: [
          "Confirmation text sent immediately after booking",
          "Reminder text sent 2 hours before the reservation, with a one-tap cancel link",
        ],
      },
      {
        type: "p",
        text: "The confirmation text does more than reassure the guest — it also catches booking errors early, like a wrong date or a mistyped party size, while there's still time to fix them without an awkward conversation at the door.",
      },
      {
        type: "cta",
        heading: "Set up reservation reminders today",
        text: "SMSLocal automates confirmation and reminder texts so your team never has to send them manually.",
        buttonText: "Create Free Trial Account",
      },
      {
        type: "stats",
        items: [
          { num: "50%", label: "Fewer no-shows" },
          { num: "2", label: "Messages per booking" },
          { num: "2h", label: "Reminder window" },
        ],
      },
      { type: "h2", text: "Why the one-tap cancel link matters" },
      {
        type: "p",
        text: "Guests who are going to cancel will cancel either way — the question is whether the restaurant finds out two hours ahead or not at all. A one-tap cancel link removes the friction of calling to cancel, which means more guests actually do it instead of just not showing up.",
      },
      {
        type: "p",
        text: "Cancellations that come in early enough get released back into the booking system automatically, turning a no-show into a filled table. Restaurants running this flow report meaningfully more last-minute bookings filling those freed slots than they expected.",
      },
      { type: "h2", text: "Extending the flow for special occasions" },
      {
        type: "p",
        text: "For larger parties, holiday bookings, or private events, many restaurants add a third message — a day-before reminder with any special instructions (parking, dress code, prepaid deposits). The extra touchpoint reduces day-of confusion without feeling like an over-the-top amount of communication for a routine reservation.",
      },
      {
        type: "ul",
        items: [
          "Day-before reminder for large parties or events",
          "Deposit or prepayment confirmation for holiday bookings",
          "Post-visit thank-you text with a review link",
        ],
      },
      {
        type: "cta",
        heading: "See the full reservation flow in action",
        text: "Watch how restaurants use SMSLocal to confirm, remind, and fill last-minute openings automatically.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "The restaurants seeing the biggest drop in no-shows aren't sending more messages than anyone else — they're just sending the right two at the right time, with an easy way for guests to act on them.",
      },
    ],
    faqs: [
      {
        q: "How many reminder texts does a typical booking need?",
        a: "Two is usually enough — a confirmation right after booking and a reminder two hours before the reservation.",
      },
      {
        q: "Why include a one-tap cancel link?",
        a: "It removes the friction of calling to cancel, so guests who were going to cancel anyway actually do it — freeing the table for a last-minute booking instead of a no-show.",
      },
      {
        q: "Does the confirmation text catch booking mistakes?",
        a: "Yes — guests often notice a wrong date or party size in the confirmation, giving staff time to fix it before the day of the reservation.",
      },
      {
        q: "Should large parties or events get extra messages?",
        a: "Many restaurants add a day-before reminder with special instructions like parking or deposits for larger bookings and events.",
      },
      {
        q: "How much can this flow actually reduce no-shows?",
        a: "Restaurants running a two-message reminder flow commonly report no-shows cut by around half.",
      },
    ],
  },
  {
    slug: "helpdesk-over-sms",
    title: "Running a Full Support Helpdesk Over SMS",
    emphasis: "Setup Guide",
    category: "Two-Way Messaging",
    date: "May 30, 2026",
    readTime: "6 min read",
    excerpt:
      "Tickets, keyword routing, and response-time tracking — how support teams run a complete helpdesk over SMS without customers leaving their texting app.",
    dek: "Tickets, routing, and response-time tracking — how support teams run a complete helpdesk without customers ever leaving their texting app.",
    author: authors.sarah,
    tags: ["Two-Way Messaging", "Support", "Helpdesk"],
    body: [
      {
        type: "p",
        text: "Customers already prefer texting over calling or emailing support. SMSLocal's helpdesk tools turn that preference into a fully trackable support channel, with the same ticketing, routing, and reporting a traditional helpdesk offers.",
      },
      { type: "h2", text: "Setting up ticketing" },
      {
        type: "p",
        text: "Every inbound text automatically opens a ticket, tagged with the customer's history so any agent can pick it up with context. There's no separate system to check — the ticket and the conversation live in the same place, which removes the copy-paste step that slows down most multi-channel support setups.",
      },
      { type: "h2", text: "Routing and SLAs" },
      {
        type: "ul",
        items: [
          "Route by keyword, topic, or customer tier",
          "Track first-response and resolution time per agent",
          "Auto-escalate tickets that sit unanswered past your SLA",
        ],
      },
      {
        type: "cta",
        heading: "Set up your SMS helpdesk",
        text: "SMSLocal turns every inbound text into a trackable ticket with routing and SLA alerts built in.",
        buttonText: "Create Free Trial Account",
      },
      { type: "h2", text: "Training a team to work a shared SMS inbox" },
      {
        type: "p",
        text: "The biggest adjustment for teams moving from phone or email support to SMS is tone — texts read as more casual, and customers expect a faster, shorter reply than an email thread. Most teams write a short internal style guide covering greeting format, sign-offs, and how to hand off a thread between agents without confusing the customer.",
      },
      {
        type: "ul",
        items: [
          "Keep replies to two or three sentences whenever possible",
          "Confirm resolution explicitly instead of letting a thread go quiet",
          "Use internal notes to hand off context between agents, not the customer-facing thread",
        ],
      },
      { type: "h2", text: "Measuring helpdesk performance over SMS" },
      {
        type: "p",
        text: "The same metrics that matter for any helpdesk — first response time, resolution time, and customer satisfaction — apply here too. Teams running SMS-based support typically see faster first-response times than email, since customers already have their phone in hand when they send the first message.",
      },
      {
        type: "quote",
        text: "Our support team responds within minutes — every day of the week.",
      },
      { type: "h2", text: "Scaling beyond a single agent" },
      {
        type: "p",
        text: "As ticket volume grows, keyword-based routing becomes essential — sending billing questions to one queue, technical issues to another, and urgent keywords like \"cancel\" or \"refund\" to a priority queue with a tighter SLA. This keeps response times consistent even as the team and message volume both grow.",
      },
      {
        type: "cta",
        heading: "See a full SMS helpdesk in action",
        text: "Talk to our team about setting up ticketing, routing, and SLA tracking for your support inbox.",
        buttonText: "Book a demo",
      },
      {
        type: "p",
        text: "A helpdesk built on SMS isn't a smaller version of a traditional support system — for most day-to-day questions, it's simply a faster one, because it meets customers on the channel they already default to.",
      },
    ],
    faqs: [
      {
        q: "Do inbound texts automatically become support tickets?",
        a: "Yes — every inbound text opens a ticket automatically, tagged with the customer's history so any agent can pick it up with context.",
      },
      {
        q: "Can I route different topics to different agents?",
        a: "Yes, by keyword, topic, or customer tier — for example, routing billing questions and urgent keywords like \"refund\" to separate queues.",
      },
      {
        q: "How is SLA tracking handled over SMS?",
        a: "First-response and resolution time are tracked per agent, and tickets that sit unanswered past your SLA can auto-escalate.",
      },
      {
        q: "Does SMS support typically respond faster than email?",
        a: "Yes — customers usually already have their phone in hand when they send the first text, which tends to produce faster first-response times than email.",
      },
      {
        q: "What changes for a team moving from email to SMS support?",
        a: "Mostly tone — texts read as more casual and expect a shorter, faster reply, so most teams write a brief internal style guide to keep replies consistent.",
      },
    ],
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost() {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getRelatedPosts(slug, count = 3) {
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}

export const categories = [
  "All",
  "Bulk SMS",
  "Automation",
  "Two-Way Messaging",
  "Analytics",
  "Campaigns",
];
