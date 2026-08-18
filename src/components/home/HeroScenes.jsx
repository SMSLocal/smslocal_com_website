import {
  Send,
  Clock,
  Check,
  Workflow,
  Search,
  Users,
  Headset,
  ShoppingBag,
  Bot,
  Sparkles,
  CreditCard,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Mic,
  Globe,
  Database,
} from "lucide-react";
import AppLogo from "../AppLogo";

// Scenes 2 and 3 (AI Agent, Campaign Automation) are the two the client
// approved and asked to keep untouched. The other four were generic
// receptionist-call claims that never showed the product surfaces this
// platform actually sells. Retold around chatbase-style product moments
// instead — the website chatbot, its capability toggles, meeting booking,
// and the tools/data it connects to — each with a cursor performing the
// action rather than the state just appearing.
const SCENES = [
  {
    title: "Turn On What You Need",
    desc: "Flip on capabilities — booking, RCS, escalation — no code",
  },
  {
    title: "Website Chat, Answered Instantly",
    desc: "Type a question — get an answer, not a ticket",
  },
  {
    title: "AI Agent",
    desc: "Understands, decides, and replies automatically",
  },
  {
    title: "Campaign Automation",
    desc: "Triggered messages and multi-step flows",
  },
  {
    title: "Book Meetings Automatically",
    desc: "Finds a time and books it — no back-and-forth",
  },
  {
    title: "Connects With Your Stack",
    desc: "Your tools and your data, in one agent",
  },
];

/** `scene-pop` and `scene-fade` both share the carousel's 25.2s clock (6
 *  scenes x 4.2s), so an element's delay must be its own scene's offset plus
 *  a small stagger. A `CursorClick`'s own click lands ~0.5s after its
 *  stagger — whatever it triggers (a `FlipChip`, a reply bubble) should use
 *  roughly stagger+0.5 so cause and effect read in order. */
const sceneDelay = (sceneId, stagger) => `${sceneId * 4.2 + stagger}s`;

/** Scene 1's capability list — chatbase shows these as literal support
 *  "procedures"; ours are moments this hero already promises elsewhere
 *  (booking, RCS, escalation), so the toggles read as one coherent panel
 *  rather than a random feature grab-bag. Rows 3 and 4 each get flipped
 *  LIVE by a cursor click (one off, one on) rather than sitting there
 *  already switched: `initialOn` is the state a row starts in, `cursorStagger`
 *  is when the click lands on it, and `flip` is when its `FlipChip` cover
 *  clears to reveal the new state — timed just after the click. */
const CAPABILITIES = [
  { icon: Calendar, label: "Book appointments", initialOn: true },
  { icon: Users, label: "Qualify new leads", initialOn: true },
  {
    icon: Headset,
    label: "Escalate to a human",
    initialOn: true,
    cursorStagger: 0.5,
    flip: 1.5,
  },
  {
    icon: Send,
    label: "Auto-reply via RCS",
    initialOn: false,
    cursorStagger: 1.9,
    flip: 2.9,
  },
].map((c, i) => ({ ...c, stagger: 0.1 + i * 0.08 }));


/** Scene 3's autonomous resolution — a single vertical timeline under the
 *  agent, each step landing in chronological order top-to-bottom. Vertical
 *  order alone carries the sequence, so no per-bubble numbering is needed. */
const AGENT_STEPS = [
  { icon: Search, text: "Detected: refund request", top: "30%", stagger: 0.1 },
  {
    icon: ShoppingBag,
    text: "Looked up the order in store",
    top: "47%",
    stagger: 0.2,
  },
  {
    icon: CreditCard,
    text: "Refund issued automatically",
    top: "64%",
    stagger: 0.3,
  },
  { icon: Send, text: "Customer notified", top: "81%", stagger: 0.4 },
];

/** Scene 4's automation flow: two triggers feeding one rule, which fans out to
 *  three actions. Positions are centres on the 560x400 stage. */
const FLOW_TRIGGERS = [
  { label: "New sign-up", pos: "left-[16.4%] top-[19%]", stagger: 0.12 },
  { label: "Cart abandoned", pos: "left-[83.6%] top-[19%]", stagger: 0.19 },
];

const FLOW_ACTIONS = [
  {
    icon: Send,
    label: "Send SMS",
    sub: "instantly",
    pos: "left-[19.3%] top-[74%]",
    chip: "bg-brand-start/10 text-brand-start",
    stagger: 0.3,
  },
  {
    icon: Clock,
    label: "Wait 1 hour",
    sub: "then check",
    pos: "left-[50%] top-[74%]",
    chip: "bg-gradient-brand text-white",
    stagger: 0.38,
  },
  {
    icon: Check,
    label: "Follow-up",
    sub: "if no reply",
    pos: "left-[80.7%] top-[74%]",
    chip: "bg-brand-end/10 text-brand-end",
    stagger: 0.46,
  },
];

/** Scene 5's meeting picker — mirrors the chatbase reference almost exactly
 *  (a day strip, then a time grid). Monday's pre-selected because the
 *  visitor already said "Monday afternoon" in chat; 3:30 PM is NOT
 *  pre-selected — that's the slot the cursor picks live once the visitor
 *  names it, via `MEETING_TIME_FLIP` below. */
const MEETING_DAYS = [
  { d: "25", w: "Sun", active: false },
  { d: "26", w: "Mon", active: true },
  { d: "27", w: "Tue", active: false },
  { d: "28", w: "Wed", active: false },
];

const MEETING_TIMES = ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM", "6:00 PM", "6:15 PM"];
const MEETING_TIME_PICKED = "3:30 PM";

/** Scene 6's connected tools — real logos this time (the user asked for
 *  them), matching the exact set the site's own Integrations section
 *  already advertises further down the page, via the shared `AppLogo`
 *  helper (favicon fetch + monogram fallback, same as the rest of the site). */
const STACK_TOOLS = [
  { name: "Salesforce", stagger: 0.1 },
  { name: "Zendesk", stagger: 0.14 },
  { name: "Microsoft Teams", stagger: 0.18 },
  { name: "Google Workspace", stagger: 0.22 },
  { name: "HubSpot Marketing", label: "HubSpot", stagger: 0.26 },
  { name: "Shopify", stagger: 0.3 },
];

/** The "before" face of a two-state element (a toggle, a time slot) —
 *  renders on top of `final` and disappears at `flip`'s stagger to reveal
 *  it, so a cursor click can visibly cause the change instead of the end
 *  state just being there from the start. */
function FlipChip({ sceneId, flip, final, initial, className = "inline-flex" }) {
  return (
    <span className={`relative ${className}`}>
      {final}
      <span
        className="animate-flip-cover absolute inset-0"
        style={{ animationDelay: sceneDelay(sceneId, flip) }}
      >
        {initial}
      </span>
    </span>
  );
}

function ToggleTrack({ on }) {
  return (
    <span
      className={`flex h-[18px] w-[32px] items-center rounded-full px-[3px] ${
        on ? "bg-gradient-brand justify-end" : "bg-slate-200 justify-start"
      }`}
    >
      <span className="h-[13px] w-[13px] rounded-full bg-white shadow" />
    </span>
  );
}

/** A pointer performing the click a scene is built around — the ripple fires
 *  as it presses, and whatever it triggers should land shortly after (see
 *  `sceneDelay`'s doc comment) so cause and effect read in order. */
function CursorClick({ sceneId, stagger, className, from = { x: -64, y: -40 } }) {
  return (
    <span className={`pointer-events-none absolute z-30 ${className}`}>
      <span
        className="animate-cursor-move-click relative block"
        style={{
          animationDelay: sceneDelay(sceneId, stagger),
          "--mx": `${from.x}px`,
          "--my": `${from.y}px`,
        }}
      >
        <span
          className="animate-cursor-ripple absolute -inset-2.5 rounded-full bg-brand-start/25"
          style={{ animationDelay: sceneDelay(sceneId, stagger) }}
        />
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          className="relative drop-shadow-md"
          aria-hidden
        >
          <path
            d="M3 1.5 L3 17.5 L7 13.8 L9.7 20 L12.3 18.9 L9.6 12.7 L15 12.7 Z"
            fill="#0f172a"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}

/** Every scene: full-width hero element → strip → detail band → closing stat. */
function SceneVisual({ id }) {
  // 1 — Capabilities: a panel of toggles for what the agent can do, the last
  // one (RCS) switched on live by the cursor.
  if (id === 0) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop block w-[320px] rounded-[1.75rem] bg-white p-5 text-left shadow-2xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(0, 0) }}
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white">
                <Sparkles className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-heading">
                  Capabilities
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  Flip on what your agent should handle
                </span>
              </span>
            </span>

            <span className="mt-4 block space-y-2 border-t border-slate-100 pt-4">
              {CAPABILITIES.map(({ icon: Icon, label, initialOn, flip, stagger }) => (
                <span
                  key={label}
                  className="animate-scene-pop flex items-center gap-3 rounded-xl bg-slate-50/70 px-3 py-2.5"
                  style={{ animationDelay: sceneDelay(0, stagger) }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                    <Icon
                      className="h-4 w-4 text-brand-start"
                      strokeWidth={2.25}
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-[12.5px] font-medium text-foreground">
                    {label}
                  </span>
                  {flip != null ? (
                    <FlipChip
                      sceneId={0}
                      flip={flip}
                      final={<ToggleTrack on={!initialOn} />}
                      initial={<ToggleTrack on={initialOn} />}
                      className="inline-flex shrink-0"
                    />
                  ) : (
                    <ToggleTrack on={initialOn} />
                  )}
                </span>
              ))}
            </span>
          </span>
        </span>

        {/* the cursor turns "Escalate to a human" off... */}
        <CursorClick
          sceneId={0}
          stagger={0.5}
          from={{ x: 44, y: -30 }}
          className="left-[74%] top-[57%]"
        />
        {/* ...then switches "Auto-reply via RCS" on */}
        <CursorClick
          sceneId={0}
          stagger={1.9}
          from={{ x: 44, y: -30 }}
          className="left-[74%] top-[69%]"
        />
      </div>
    );
  }

  // 2 — Website chat: the site opens, the visitor clicks in, asks a real
  // question, watches the agent "type", then gets an actual fix — not a
  // one-line FAQ answer, a resolved issue.
  if (id === 1) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* the site — chrome bar + a short skeleton of real page content,
            kept compact so the widget below has clean room to open into */}
        <span className="pointer-events-none absolute left-1/2 top-[5%] -translate-x-1/2">
          <span
            className="animate-scene-fade block w-[330px] overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(1, 0) }}
          >
            <span className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              <span className="ml-2 flex flex-1 items-center gap-1.5 rounded-full bg-slate-50 px-2 py-0.5 text-[9.5px] font-medium text-muted-foreground">
                <Globe
                  className="h-2.5 w-2.5 text-brand-start"
                  strokeWidth={2.5}
                />
                yoursite.com
              </span>
            </span>
            <span className="block space-y-2 p-3.5">
              <span className="block h-2 w-16 rounded-full bg-slate-200" />
              <span className="block h-9 w-full rounded-lg bg-gradient-to-br from-brand-start/[0.08] to-brand-end/[0.08]" />
            </span>
          </span>
        </span>

        {/* the launcher, floating over the page — this is what the cursor clicks */}
        <span className="pointer-events-none absolute right-[16%] top-[27%]">
          <span
            className="animate-scene-pop flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-2 text-[11.5px] font-semibold text-white shadow-lg shadow-slate-900/25"
            style={{ animationDelay: sceneDelay(1, 0.12) }}
          >
            <Bot className="h-3.5 w-3.5" strokeWidth={2.25} /> Ask AI
          </span>
        </span>

        <CursorClick
          sceneId={1}
          stagger={0.3}
          from={{ x: 52, y: 26 }}
          className="right-[17.5%] top-[24.5%]"
        />

        {/* the widget the click opens */}
        <span className="pointer-events-none absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop block w-[320px] rounded-[1.75rem] bg-white p-4 text-left shadow-2xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(1, 0.62) }}
          >
            <span
              className="animate-scene-pop flex justify-end"
              style={{ animationDelay: sceneDelay(1, 0.78) }}
            >
              <span className="max-w-[240px] rounded-2xl rounded-br-md bg-gradient-brand px-3.5 py-2.5 text-[12.5px] font-medium text-white shadow-md shadow-primary/20">
                My last SMS campaign never sent — can you check?
              </span>
            </span>

            {/* typing, then swapped for the reply the instant it lands */}
            <span
              className="animate-scene-pop-quick mt-2.5 flex w-max items-center gap-1 rounded-full bg-slate-50 px-3.5 py-3 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(1, 0.98) }}
            >
              {[0, 0.15, 0.3].map((d) => (
                <span
                  key={d}
                  className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
            </span>
            <span
              className="animate-scene-pop mt-2.5 block max-w-[260px] rounded-2xl rounded-bl-md bg-slate-50 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-foreground ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(1, 1.15) }}
            >
              Found it — your sender ID needed re-verification. Resubmitted
              and resent over RCS with SMS fallback. ✓
            </span>

            <span className="mt-3.5 flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2.5">
              <Paperclip
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                strokeWidth={2.25}
              />
              <span className="flex-1 text-[11.5px] text-muted-foreground/70">
                Ask a question…
              </span>
              <Mic
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                strokeWidth={2.25}
              />
            </span>
          </span>
        </span>
      </div>
    );
  }

  // 3 — AI Agent: the agent (hub, centre-top) fans out to the steps it took
  // resolving one inbound message on its own — each pops in as its own
  // bubble, in chronological order, closing with the outcome at the bottom.
  if (id === 2) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* the rail — one simple line down the spine, fading in once with the
            agent rather than redrawing per step */}
        <svg
          viewBox="0 0 560 400"
          className="animate-scene-fade pointer-events-none absolute inset-0 h-full w-full"
          style={{ animationDelay: sceneDelay(2, 0.02) }}
          aria-hidden
        >
          <path
            d="M280,84 V362"
            fill="none"
            stroke="var(--brand-start)"
            strokeOpacity="0.4"
            strokeWidth="2.5"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
        </svg>

        {/* the agent — head of the timeline, thinking continuously while the
            scene runs */}
        <span className="pointer-events-none absolute left-1/2 top-[9%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop flex flex-col items-center gap-1.5"
            style={{ animationDelay: sceneDelay(2, 0) }}
          >
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-xl shadow-primary/25">
              <span className="animate-pulse-soft absolute -inset-2 rounded-full border-2 border-brand-start/30" />
              <Bot className="h-6 w-6" strokeWidth={2} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                <Sparkles className="h-3 w-3 text-brand-end" />
              </span>
            </span>
            <span className="text-[12px] font-semibold tracking-tight text-heading">
              AI Agent
            </span>
          </span>
        </span>

        {/* the steps it takes, landing one by one down the timeline — vertical
            order alone carries the sequence, so nothing needs a number */}
        {AGENT_STEPS.map(({ icon: Icon, text, top, stagger }) => (
          <span
            key={text}
            className="pointer-events-none absolute left-1/2 w-max -translate-x-1/2 -translate-y-1/2"
            style={{ top }}
          >
            <span
              className="animate-scene-pop flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-4 py-2.5 shadow-xl shadow-emerald-500/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(2, stagger) }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[12.5px] font-medium leading-snug text-foreground">
                {text}
              </span>
            </span>
          </span>
        ))}

        {/* the outcome — foot of the timeline, once every step has landed */}
        <span className="pointer-events-none absolute left-1/2 top-[95%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-[12.5px] font-semibold text-white shadow-xl shadow-primary/25"
            style={{ animationDelay: sceneDelay(2, 0.5) }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Auto-resolved
          </span>
        </span>
      </div>
    );
  }

  // 4 — Automation: triggers feed one rule, which fans out to three actions
  if (id === 3) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* connectors: stem down from the rule, a bus, then three drops.
            Fade-only (no scale) so the lines don't warp on entry. */}
        <svg
          viewBox="0 0 560 400"
          className="animate-scene-fade pointer-events-none absolute inset-0 h-full w-full"
          style={{ animationDelay: sceneDelay(3, 0.24) }}
          aria-hidden
        >
          <g
            fill="none"
            stroke="var(--brand-start)"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {/* trigger pills into the rule */}
            <path d="M150,76 H222" />
            <path d="M410,76 H338" />
            {/* rule down to the bus, with rounded corners out to each side.
                Drops stop at y=210 so the arrowheads (tip y=224) clear the
                action cards, which start at y=236. */}
            <path d="M280,120 V178" />
            <path d="M108,210 V192 Q108,178 122,178 H438 Q452,178 452,192 V210" />
            <path d="M280,178 V210" />
          </g>
          <g fill="var(--brand-start)" fillOpacity="0.55">
            <path d="M100,212 h16 l-8,12 z" />
            <path d="M272,212 h16 l-8,12 z" />
            <path d="M444,212 h16 l-8,12 z" />
          </g>
        </svg>

        {/* the two triggers */}
        {FLOW_TRIGGERS.map(({ label, pos, stagger }) => (
          <span
            key={label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade block whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-foreground shadow-lg shadow-slate-900/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(3, stagger) }}
            >
              {label}
            </span>
          </span>
        ))}

        {/* the rule at the centre */}
        <span className="pointer-events-none absolute left-1/2 top-[19%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-brand text-white shadow-xl shadow-primary/25"
            style={{ animationDelay: sceneDelay(3, 0.05) }}
          >
            <Workflow className="h-7 w-7" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-tight">
              Flow
            </span>
          </span>
        </span>

        {/* the three actions it fans out to */}
        {FLOW_ACTIONS.map(({ icon: Icon, label, sub, pos, chip, stagger }) => (
          <span
            key={label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade flex w-[132px] flex-col items-center gap-2 rounded-2xl bg-white px-3 py-4 shadow-xl shadow-slate-900/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(3, stagger) }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${chip}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-center">
                <span className="block text-[13px] font-semibold text-foreground">
                  {label}
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  {sub}
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>
    );
  }

  // 5 — Book Meetings Automatically: the visitor asks, the agent asks back
  // for a time, the visitor names one, and the cursor is what actually
  // puts it on the calendar — the slot isn't pre-selected before that.
  if (id === 4) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* the exchange that gets to a time */}
        <span className="pointer-events-none absolute left-1/2 top-[4%] -translate-x-1/2">
          <span
            className="animate-scene-fade block max-w-[230px] rounded-2xl rounded-br-md bg-gradient-brand px-3.5 py-2 text-center text-[11.5px] font-medium text-white shadow-md shadow-primary/20"
            style={{ animationDelay: sceneDelay(4, 0) }}
          >
            Can I book a meeting with Sales?
          </span>
        </span>

        <span className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2">
          <span
            className="animate-scene-pop block whitespace-nowrap rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[11.5px] font-medium text-foreground shadow-md shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(4, 0.16) }}
          >
            Sure — what time works best for you?
          </span>
        </span>

        <span className="pointer-events-none absolute left-1/2 top-[26%] -translate-x-1/2">
          <span
            className="animate-scene-pop block max-w-[230px] rounded-2xl rounded-br-md bg-gradient-brand px-3.5 py-2 text-center text-[11.5px] font-medium text-white shadow-md shadow-primary/20"
            style={{ animationDelay: sceneDelay(4, 0.32) }}
          >
            Monday afternoon, around 3:30?
          </span>
        </span>

        {/* the picker — Monday's already filtered in, but 3:30 isn't picked
            yet; that only happens once the cursor clicks it below */}
        <span className="pointer-events-none absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop block w-[340px] rounded-[1.75rem] bg-white p-5 text-left shadow-2xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(4, 0.55) }}
          >
            <span className="flex items-center gap-1.5">
              <ChevronLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
              {MEETING_DAYS.map(({ d, w, active }) => (
                <span
                  key={d}
                  className={`flex flex-1 flex-col items-center rounded-xl py-1.5 text-center ${
                    active ? "ring-2 ring-brand-start" : "ring-1 ring-black/5"
                  }`}
                >
                  <span
                    className={`text-[13px] font-semibold ${active ? "text-heading" : "text-foreground"}`}
                  >
                    {d}
                  </span>
                  <span className="text-[9.5px] text-muted-foreground">
                    {w}
                  </span>
                </span>
              ))}
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
            </span>

            <span className="mt-3.5 grid grid-cols-3 gap-2">
              {MEETING_TIMES.map((t) =>
                t === MEETING_TIME_PICKED ? (
                  <FlipChip
                    key={t}
                    sceneId={4}
                    flip={1.2}
                    className="block"
                    final={
                      <span className="block rounded-xl py-2 text-center text-[11.5px] font-medium bg-gradient-brand text-white shadow-md shadow-primary/20 ring-2 ring-brand-start">
                        {t}
                      </span>
                    }
                    initial={
                      <span className="block rounded-xl py-2 text-center text-[11.5px] font-medium bg-white text-foreground ring-1 ring-black/5">
                        {t}
                      </span>
                    }
                  />
                ) : (
                  <span
                    key={t}
                    className="rounded-xl py-2 text-center text-[11.5px] font-medium text-foreground ring-1 ring-black/5"
                  >
                    {t}
                  </span>
                ),
              )}
            </span>

            <span className="mt-3.5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10.5px] font-medium text-muted-foreground">
              <Bot className="h-3.5 w-3.5 text-brand-start" strokeWidth={2.25} />{" "}
              AI Agent
            </span>
          </span>
        </span>

        {/* the click, then the confirmation it causes */}
        <span className="pointer-events-none absolute left-1/2 top-[95%] -translate-x-1/2">
          <span
            className="animate-scene-pop flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-brand px-4 py-2 text-[12px] font-semibold text-white shadow-xl shadow-primary/25"
            style={{ animationDelay: sceneDelay(4, 1.35) }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Booked for Mon,
            3:30 PM
          </span>
        </span>

        <CursorClick
          sceneId={4}
          stagger={0.75}
          from={{ x: -34, y: 46 }}
          className="left-[58%] top-[76%]"
        />
      </div>
    );
  }

  // 6 — Connects With Your Stack: a flat integration grid, like chatbase's
  // panel, plus a line naming the data it also draws on.
  return (
    <div className="relative mx-auto h-full w-full max-w-[560px]">
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="animate-scene-fade block w-[360px] rounded-[1.75rem] bg-white p-6 text-center shadow-2xl shadow-slate-900/10 ring-1 ring-black/5"
          style={{ animationDelay: sceneDelay(5, 0) }}
        >
          <p className="text-[13.5px] font-semibold text-heading">
            Integrate with the tools you already use
          </p>

          <span className="mt-4 grid grid-cols-3 gap-3">
            {STACK_TOOLS.map(({ name, label, stagger }) => (
              <span
                key={name}
                className="animate-scene-fade relative flex flex-col items-center gap-1.5"
                style={{ animationDelay: sceneDelay(5, stagger) }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-black/5">
                  <AppLogo name={name} size={22} />
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {label ?? name}
                </span>
                {name === "Shopify" && (
                  <span
                    className="animate-scene-pop absolute -right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-sm"
                    style={{ animationDelay: sceneDelay(5, 0.78) }}
                  >
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                  </span>
                )}
              </span>
            ))}
          </span>

          <span
            className="animate-scene-fade mt-4 flex items-center justify-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[10.5px] font-medium text-muted-foreground ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(5, 0.9) }}
          >
            <Database className="h-3 w-3 text-brand-end" strokeWidth={2.25} />{" "}
            + your docs, website &amp; CRM data
          </span>
        </span>
      </span>

      <CursorClick
        sceneId={5}
        stagger={0.28}
        from={{ x: 36, y: 42 }}
        className="left-[64%] top-[52%]"
      />
    </div>
  );
}

export default function HeroScenes() {
  // A scaled element keeps its full layout height, so the stage still reserved
  // 400px while drawing 232px — the negative margins on it claw that back, and
  // this min-height drops to match.
  //
  // min-w-0: this is a grid item, and min-width:auto would let it stretch to fit
  // the 560px stage inside it — which dragged the caption below out to 560px and
  // off the screen. Pinned to the column, the oversized stage simply overflows
  // it and is scaled back into place.
  return (
    <div className="relative flex min-h-[260px] min-w-0 flex-col items-center justify-center sm:min-h-[520px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
        <div className="animate-pulse-soft h-full w-full rounded-full bg-gradient-brand blur-3xl" />
      </div>

      {/* Fixed slot: scenes differ in height, so this keeps the title from
          jumping as the carousel rotates.

          The stage is pinned to 560px — the width these scenes were composed
          against — and scaled to fit the column, rather than being w-full.
          Children are positioned by PERCENTAGE of the stage but sized in fixed
          pixels, so a narrower stage compresses the gaps while the cards keep
          their width: at 327px the three flow cards overlapped by 26px and the
          API cards by 246px. Laying out at 560px and scaling the finished
          composition keeps every gap exactly as designed.

          Scales are set per breakpoint against the narrowest column each one
          can produce:
            base  <640   column 327  -> 560*0.58 = 325
            sm    640+   column 592  -> 560*1.00 = 560
            lg    1024+  column 464  -> 560*0.82 = 459   (two-column grid)
            xl    1280+  column 592  -> 560*1.00 = 560 */}
      <div className="relative mx-auto -my-[84px] flex h-[400px] w-[560px] shrink-0 origin-left scale-[0.58] items-center justify-center sm:my-0 sm:scale-100 lg:-my-[36px] lg:scale-[0.82] xl:my-0 xl:scale-100">
        {SCENES.map(({ title }, i) => {
          // Scenes 1-5 are driven entirely by `scene-pop`/`scene-fade` on their
          // own elements, so their wrapper must NOT fade: fading the wrapper
          // on the scene boundary clips the last elements' pop-out mid-retract
          // and leaves it looking like a plain fade.
          const popDriven = i <= 4;
          return (
            <div
              key={title}
              className={`absolute inset-0 flex items-center justify-center text-center ${
                popDriven ? "pointer-events-none" : "animate-scene-5"
              }`}
              style={popDriven ? undefined : { animationDelay: `${i * 4.2}s` }}
            >
              <SceneVisual id={i} />
            </div>
          );
        })}
      </div>

      {/* the labels cross-fade on their own, below the stage */}
      <div className="relative mt-6 h-[64px] w-full">
        {SCENES.map(({ title, desc }, i) => (
          <div
            key={title}
            className="animate-scene-5 absolute inset-0 text-center"
            style={{ animationDelay: `${i * 4.2}s` }}
          >
            <p className="text-lg font-semibold tracking-tight text-heading sm:text-xl">
              {title}
            </p>
            <p className="mx-auto mt-1 max-w-[16rem] text-xs text-muted-foreground">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
