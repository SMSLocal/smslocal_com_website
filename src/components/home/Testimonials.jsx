import { useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "SMSLocal has truly transformed the way we connect with our customers. From running SMS marketing campaigns to sending appointment reminders, the platform is incredibly easy to use.",
    name: "John Miller",
    role: "Marketing Manager",
    tint: "bg-indigo-100 text-indigo-600",
  },
  {
    quote:
      "We've been using SMSLocal to communicate with our customers, and it's been a game changer. Two-way messaging lets us provide instant support and build better relationships.",
    name: "Sarah Cooper",
    role: "Customer Support Specialist",
    tint: "bg-sky-100 text-sky-700",
  },
  {
    quote:
      "SMSLocal has made communication within our team so much smoother. Whether it's shift reminders or urgent updates, it's super convenient to send quick messages.",
    name: "Emily Rodriguez",
    role: "Operations Assistant",
    tint: "bg-rose-100 text-rose-700",
  },
  {
    quote:
      "I love how simple it is to integrate SMS messaging into our sales process. Whether we're sending quick updates or following up with leads, SMSLocal makes it easy and efficient.",
    name: "David Lee",
    role: "Sales Coordinator",
    tint: "bg-amber-100 text-amber-700",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function Testimonials() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  // Highest reachable index. Measured, because it depends on how many cards fit
  // — 1-up on mobile, 2-up on desktop. Starts at the 1-up value so the first
  // paint is sane, then corrects on mount.
  // How many cards are in view is decided by one CSS breakpoint (the cards are
  // w-full below sm, half-width at sm+), so read that directly instead of
  // inferring it from measured widths — inference raced the first layout and
  // left the range stuck at the 1-up value.
  const [perView, setPerView] = useState(1);
  const last = Math.max(0, TESTIMONIALS.length - perView);
  // Autoplay stops while the user is reading (hover) or tabbing through the
  // cards (focus), and never starts if they've asked for reduced motion.
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => setPerView(mq.matches ? 2 : 1);
    apply();
    // Both sources read the same query. The resize listener is a backstop —
    // some environments resize the viewport without delivering a media-query
    // change event, which would otherwise strand the page count.
    mq.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  // Clamp when the breakpoint shrinks the reachable range under the current index.
  useEffect(() => {
    setIndex((i) => Math.min(i, last));
  }, [last]);

  /**
   * Cards are paged one at a time, but two sit in view at once on desktop — so
   * the step is the card pitch, not the track width. Only ever called from event
   * handlers, by which point layout has long settled.
   */
  const metrics = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return null;
    const first = el.children[0].getBoundingClientRect();
    const second = el.children[1]?.getBoundingClientRect();
    const pitch = second ? second.left - first.left : first.width;
    if (pitch <= 0) return null;
    return { pitch, last };
  };

  /** Keep the index honest when the track is swiped or trackpad-scrolled. */
  const sync = () => {
    const el = trackRef.current;
    const m = metrics();
    if (!el || !m) return;
    setIndex(Math.min(m.last, Math.round(el.scrollLeft / m.pitch)));
  };

  const go = (i) => {
    const el = trackRef.current;
    const m = metrics();
    if (!el || !m) return;
    const to = Math.max(0, Math.min(m.last, i));
    el.scrollTo({ left: to * m.pitch, behavior: "smooth" });
    // Set from the target we just committed to rather than waiting on a scroll
    // event — those can be throttled, which would leave the arrows stale.
    setIndex(to);
  };

  // Autoplay. Keyed on `index`, so any manual nav restarts the dwell rather
  // than firing mid-way through the one the user just chose.
  useEffect(() => {
    if (paused || reduced || last === 0) return;
    const id = setTimeout(() => go(index >= last ? 0 : index + 1), 3000);
    return () => clearTimeout(id);
  }, [index, last, paused, reduced]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = last + 1;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_2fr] lg:gap-16">
          {/* LEFT — heading, then the slider controls beneath. */}
          <div>
            <SectionHeading
              align="left"
              badge="Experience Their Journey"
              title="Why Teams Rely On"
              highlight="SMSLocal"
              description="From solo founders to support teams, businesses trust SMSLocal to keep every conversation moving."
            />

            {/* Arrows with a progress rail between them, per the reference. */}
            <div className="mt-6 flex items-center gap-5">
              <button
                type="button"
                onClick={() => go(index - 1)}
                disabled={index === 0}
                aria-label="Previous testimonial"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-heading transition hover:text-brand-start disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-heading"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <span className="relative h-px flex-1 bg-border">
                <span
                  className="absolute inset-y-0 left-0 bg-gradient-brand transition-all duration-300"
                  style={{ width: `${((index + 1) / pages) * 100}%` }}
                />
              </span>

              <button
                type="button"
                onClick={() => go(index + 1)}
                disabled={index >= pages - 1}
                aria-label="Next testimonial"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-heading transition hover:text-brand-start disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-heading"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT — glyph above, then two cards in view on desktop.
              min-w-0: a grid item defaults to min-width:auto, which would let
              the scroll track size to its content and burst the container. */}
          <div className="min-w-0">
            {/* Rotated about its own centre — the glyph is inline-block inside
                a right-aligned wrapper, so spinning it doesn't drag a
                full-width box off the column edge. */}
            {/* Closing quote, upright — the two commas read side by side, heads
                up. z-10 keeps it above the track: the cards are semi-transparent,
                so a glyph painted behind them would show through dulled. */}
            {/* At this size the glyph's ink renders above its own line box, so
                the offset is tuned to where the ink actually lands (measured),
                not to the box. Retune if the display face or size changes. */}
            <span
              aria-hidden
              className="relative z-10 -mb-[104px] block text-right"
            >
              <span className="inline-block font-serif text-[11rem] leading-[0.28] text-heading/15 select-none">
                &rdquo;
              </span>
            </span>

            <div
              ref={trackRef}
              onScroll={sync}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map(({ quote, name, role, tint }, i) => (
                <figure
                  key={name}
                  className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)]"
                >
                  {/* Reveal nested inside the sized cell — the track measures
                      cell widths to compute its paging step. */}
                  <Reveal delay={i * 90}>
                    {/* Opaque fill, not bg-muted/60: the tail below is a child
                        of this card, so a translucent tail let the card's own
                        bottom border show through the diamond and the two
                        translucent fills stacked into a darker patch. */}
                    <div className="relative rounded-2xl border border-border bg-muted p-7">
                      <blockquote className="text-[15px] leading-relaxed text-foreground/80">
                        {quote}
                      </blockquote>

                      <div className="mt-5 flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Speech-bubble tail, bottom-left — centred over the
                        avatar below so it points at the speaker. Opaque, so it
                        masks the card border it sits on. */}
                      <span
                        aria-hidden
                        className="absolute -bottom-[8.5px] left-9 h-4 w-4 rotate-45 border-r border-b border-border bg-muted"
                      />
                    </div>

                    {/* Author straddles the card's lower edge. */}
                    <figcaption className="mt-6 flex items-center gap-3 pl-7">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-white ${tint}`}
                      >
                        {initials(name)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-heading">
                          {name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {role}
                        </span>
                      </span>
                    </figcaption>
                  </Reveal>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
