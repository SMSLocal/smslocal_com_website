import {
  Send,
  Megaphone,
  MessagesSquare,
  Users,
  Headset,
  BarChart2,
  Clock,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const PLATFORM = [
  { icon: Send, label: "Mass texting" },
  { icon: Megaphone, label: "SMS marketing" },
  { icon: MessagesSquare, label: "Two Way Messaging" },
  { icon: Users, label: "Contacts" },
  { icon: Headset, label: "Helpdesk" },
  { icon: BarChart2, label: "Reporting" },
];

const USE_CASES = [
  "Service & support",
  "Sales & Marketing",
  "Appointment reminder",
  "Internal communication",
  "Event management",
  "Alerts & notifications",
  "School & campus",
  "Recruitment & HR",
];

export default function PlatformFeatures() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          badge="Complete SMS Platform"
          title="Explore The Features That Make"
          highlight="Messaging Seamless"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-5 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-medium text-foreground">{label}</span>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
              <Clock className="h-4 w-4" />
              Driving Business Outcomes
            </span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Through SMSLocal&apos;s Messaging Platform
            </h3>
            <p className="mt-4 text-muted-foreground">
              With SMSLocal, send smarter campaigns, improve response times,
              and deliver messages that truly connect — using bulk SMS, mass
              texting, and two-way messaging tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {USE_CASES.map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground/80"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
