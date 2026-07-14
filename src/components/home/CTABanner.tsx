const TAGS = [
  { label: "Two-Way Messaging", position: "left-[4%] top-[14%]" },
  { label: "Global Reach", position: "right-[6%] top-[10%]" },
  { label: "Automation", position: "left-[8%] bottom-[16%]" },
  { label: "Secure & Compliant", position: "right-[3%] bottom-[12%]" },
];

export default function CTABanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-4">
      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] px-8 py-20 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(50% 60% at 50% 0%, rgba(61,104,255,0.25), transparent 70%)",
          }}
        />
        <div className="bg-dot-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-20" />

        {TAGS.map((tag) => (
          <span
            key={tag.label}
            className={`animate-float-slow pointer-events-none absolute hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur sm:block ${tag.position}`}
          >
            {tag.label}
          </span>
        ))}

        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Join thousands of businesses
            <br />
            building with SMSLocal
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            One platform. Endless communication possibilities. Start today —
            it&apos;s free.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#signup"
              className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-90"
            >
              Create Free Trial Account
            </a>
            <a
              href="#demo"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
