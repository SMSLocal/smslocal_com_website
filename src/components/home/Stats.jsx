import { ShieldCheck, Send, Languages, Gift } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { icon: ShieldCheck, title: "Secure & compliant", color: "text-emerald-400" },
  { icon: Send, title: "99.7% delivery", color: "text-sky-400" },
  { icon: Languages, title: "AI in Multiple languages", color: "text-violet-400" },
  { icon: Gift, title: "Free trial credit", color: "text-orange-400" },
];

export default function Stats() {
  // Half the vertical padding on mobile. Two rows of stats are only 108px tall,
  // so the original 56px top and bottom wrapped the content in more padding than
  // content. sm+ keeps the original spacing.
  return (
    <section className="mx-auto max-w-7xl px-6 pt-7 pb-3 sm:py-14">
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 lg:flex lg:items-center lg:justify-center lg:gap-16">
        {/* Two per row on mobile. The longest label needs 153px of the
            156px cell at a 24px icon and 13px text, so both step down
            below sm; at 36px/14px only two of the four would have fit.
            At lg+ this is a flex row (not equal-width grid cells) so each
            item sizes to its own content — a fixed lg:gap-16 between items
            keeps the visual spacing even regardless of label length, instead
            of the old equal-width-cell-centering, which put the same gap
            between every item's content and the NEXT divider (fixed at the
            cell edge) — making longer labels look closer to the following
            item than shorter ones. The divider is a 1px element rather than
            a left border, centered in that gap via -left-8 (half of 4rem). */}
        {STATS.map(({ icon: Icon, title, color }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="relative flex items-center gap-2 py-2 sm:gap-3.5">
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute top-1 bottom-1 -left-8 hidden w-px bg-border lg:block"
                />
              )}
              <Icon className={`h-6 w-6 shrink-0 sm:h-9 sm:w-9 ${color}`} strokeWidth={1.5} />
              <p className="text-[13px] font-semibold whitespace-nowrap text-foreground sm:text-lg lg:text-xl">
                {title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
