import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import AppLogo, { colorFor } from "../AppLogo.jsx";
import "./Audiences.css";

const CRM_APPS = [
  "Salesforce",
  "Zendesk",
  "Microsoft Teams",
  "Google Workspace",
  "HubSpot",
  "Shopify",
  "Slack",
  "Zoho",
];

export default function Audiences() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            align="left"
            badge="Built For Every Audience"
            title="Integrations powered by"
            highlight="agentic AI"
            description="SMSLocal connects with all the apps you need—Salesforce, Zendesk, Microsoft Teams, Google Workspace, and more. With custom widgets, custom APIs, and custom actions, our agentic AI handles CRM integration and takes real actions on your behalf, so support, sales, and everything in between runs smoothly."
          />

          {/* A tight icon cloud, per the reference — no visible labels. The
              track is capped at 470px so exactly 5 tiles fit a row (6 would
              need 532); the remaining 4 centre themselves and land in the gaps
              above, giving the half-step offset. Narrow screens fall to 3.
              Names survive as sr-only text plus a title tooltip, so dropping
              the captions doesn't strip the meaning for screen readers. */}
          <div className="relative mx-auto w-full max-w-[470px]">
            {/* Pastel wash, scoped to the cluster. It bleeds well past the
                tiles and fades to nothing before the edge, so the colour reads
                as a glow behind the icons rather than a panel with a border. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-16 -inset-y-20"
              style={{
                backgroundImage: [
                  "radial-gradient(38% 46% at 24% 40%, rgba(167,139,250,0.24), transparent 70%)",
                  "radial-gradient(34% 42% at 46% 66%, rgba(125,211,252,0.22), transparent 70%)",
                  "radial-gradient(36% 44% at 68% 36%, rgba(251,207,232,0.28), transparent 70%)",
                  "radial-gradient(34% 42% at 86% 62%, rgba(254,215,170,0.28), transparent 70%)",
                ].join(","),
              }}
            />

            <div className="relative flex flex-wrap justify-center gap-4 sm:gap-5">
              {CRM_APPS.map((name, i) => (
                <Reveal key={name} delay={i * 60}>
                  <span
                    title={name}
                    className="audiences-crm-tile flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-white shadow-lg shadow-slate-900/[0.07] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-start/15"
                  >
                    <AppLogo name={name} color={colorFor(i)} size={64} className="h-16 w-16 !rounded-[18px]" />
                    <span className="sr-only">{name}</span>
                  </span>
                </Reveal>
              ))}
              <Reveal delay={CRM_APPS.length * 60}>
                <span
                  title="And more"
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-white text-sm font-semibold text-muted-foreground shadow-lg shadow-slate-900/[0.07] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-start/15"
                >
                  +more
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
