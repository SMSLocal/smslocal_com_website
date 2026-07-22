import { Star } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  { name: "G2", rating: "4.9/5", count: "342 reviews" },
  { name: "Capterra", rating: "4.9/5", count: "342 reviews" },
  { name: "TrustPilot", rating: "4.9/5", count: "342 reviews" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-6">
        {REVIEWS.map((r, idx) => (
          <Reveal
            key={r.name}
            delay={idx * 80}
            className="flex items-center gap-2"
          >
            <span className="font-semibold text-foreground">{r.name}</span>
            <span className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-sm text-muted-foreground">
              {r.rating} ({r.count})
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
