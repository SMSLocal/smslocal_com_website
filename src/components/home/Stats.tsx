import { ShieldCheck, Send, Languages, Gift } from "lucide-react";

const STATS = [
  { icon: ShieldCheck, title: "DLT-compliant" },
  { icon: Send, title: "99.7% delivery" },
  { icon: Languages, title: "AI in 8 languages" },
  { icon: Gift, title: "₹60 free credit" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-dashed lg:divide-border">
        {STATS.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center lg:px-10"
          >
            <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <p className="mt-5 text-lg font-semibold text-foreground">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
