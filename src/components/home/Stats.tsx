import { ShieldCheck, Send, Languages, Gift } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { icon: ShieldCheck, title: "Secure & compliant", color: "text-emerald-400" },
  { icon: Send, title: "99.7% delivery", color: "text-sky-400" },
  { icon: Languages, title: "AI in 8 languages", color: "text-violet-400" },
  { icon: Gift, title: "Free trial credit", color: "text-orange-400" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {/* The divider classes live on the Reveal wrapper, not the inner row:
            wrapped, every inner div would be the first child of its own
            wrapper, so lg:first:border-l-0 would strip every divider. */}
        {STATS.map(({ icon: Icon, title, color }, i) => (
          <Reveal
            key={title}
            delay={i * 80}
            className="lg:border-l lg:border-border lg:px-4 lg:first:border-l-0"
          >
            <div className="flex items-center justify-center gap-3.5 py-2">
              <Icon className={`h-9 w-9 shrink-0 ${color}`} strokeWidth={1.5} />
              <p className="text-xl font-semibold text-foreground">{title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
