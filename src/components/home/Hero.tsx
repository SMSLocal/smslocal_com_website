import DropText from "./DropText";
import HeroScenes from "./HeroScenes";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-30 bg-[#fbfcfe]" />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% -10%, rgba(21,73,137,0.09), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-20 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-secondary/10 opacity-40 blur-3xl" />
      <div className="bg-dot-grid mask-radial-fade animate-dot-drift pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="pointer-events-none absolute left-[6%] top-[18%] -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[6%] -z-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:pb-20 lg:pt-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">
            <span className="text-primary">Powering</span>{" "}
            <span className="text-secondary">
              20,000+ businesses worldwide
            </span>
          </p>

          <DropText
            as="h1"
            className="mt-6 text-4xl font-medium leading-tight tracking-tight text-heading sm:text-5xl lg:text-[3.25rem]"
            segments={[
              { text: "One Platform for" },
              { text: "Bulk SMS", className: "text-gradient-brand" },
              { br: true },
              { text: "at Scale" },
            ]}
          />

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Launch SMS campaigns, alerts, and promotions in seconds. Simply
            log in from any web browser — no apps, no coding, no integration
            needed. Connect effortlessly and grow your business.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#signup"
              className="group rounded-full bg-gradient-brand p-[1.5px] shadow-lg shadow-primary/20 transition hover:shadow-xl hover:shadow-secondary/25"
            >
              <span className="flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold transition group-hover:bg-muted">
                <span className="text-gradient-brand">
                  Create Free Trial Account
                </span>
              </span>
            </a>
            <a
              href="#demo"
              className="rounded-full border-2 border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Book a demo
            </a>
          </div>
        </div>

        <HeroScenes />
      </div>
    </section>
  );
}
