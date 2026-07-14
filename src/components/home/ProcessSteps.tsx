import { Users, PenLine, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    step: "Step 01",
    icon: Users,
    title: "Import Your Contacts",
    description:
      "Upload a CSV, connect your CRM, or add contacts one by one — organize them into groups in seconds.",
  },
  {
    step: "Step 02",
    icon: PenLine,
    title: "Create Your Message",
    description:
      "Write your campaign, personalize it with merge tags, and preview exactly how it lands on your customer's phone.",
  },
  {
    step: "Step 03",
    icon: Send,
    title: "Send & Track Results",
    description:
      "Schedule or send instantly, then watch delivery, replies, and clicks roll in on a live dashboard.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          badge="Working Process"
          title="It's Easy To"
          highlight="Get Started"
          description="From your first contact list to your first delivered campaign — SMSLocal gets you sending in minutes, not days."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ step, icon: Icon, title, description }) => (
            <div
              key={step}
              className="rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {step}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
