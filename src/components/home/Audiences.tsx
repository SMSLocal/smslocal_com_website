import SectionHeading from "./SectionHeading";
import {
  Users2,
  Hotel,
  Briefcase,
  HeartHandshake,
  Stethoscope,
  UserCheck,
  GraduationCap,
  Handshake,
  Bell,
} from "lucide-react";

/**
 * Each audience is a circular badge with a short pill underneath. The long
 * per-audience paragraphs the card layout used don't fit this format — they're
 * condensed to the one thing SMS does for that group.
 */
const AUDIENCES = [
  {
    icon: Users2,
    title: "Customers & Clients",
    role: "Reminders & updates",
    tint: "text-indigo-500",
  },
  {
    icon: Hotel,
    title: "Guests",
    role: "Bookings & inquiries",
    tint: "text-sky-500",
  },
  {
    icon: Briefcase,
    title: "Employees",
    role: "Internal alerts",
    tint: "text-violet-500",
  },
  {
    icon: HeartHandshake,
    title: "Donors",
    role: "Campaign appeals",
    tint: "text-pink-500",
  },
  {
    icon: Stethoscope,
    title: "Patients",
    role: "Appointments",
    tint: "text-emerald-500",
  },
  {
    icon: UserCheck,
    title: "Job applicants",
    role: "Application status",
    tint: "text-amber-500",
  },
  {
    icon: GraduationCap,
    title: "Students",
    role: "Class updates",
    tint: "text-blue-500",
  },
  {
    icon: Handshake,
    title: "Business partners",
    role: "Partner notices",
    tint: "text-rose-500",
  },
  {
    icon: Bell,
    title: "Subscribers & Members",
    role: "Offers & news",
    tint: "text-teal-500",
  },
];

export default function Audiences() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            align="left"
            badge="Built For Every Audience"
            title="Reach Audiences Who Prefer"
            highlight="Text-Based Communication"
            description="Text messaging has become the most efficient and preferred way for businesses to connect. Here's why various groups favor SMS communication over other channels."
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
              {AUDIENCES.map(({ icon: Icon, title, role, tint }) => (
                <span
                  key={title}
                  title={`${title} — ${role}`}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-white shadow-lg shadow-slate-900/[0.07] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-start/15"
                >
                  <Icon className={`h-7 w-7 ${tint}`} strokeWidth={1.75} />
                  <span className="sr-only">
                    {title} — {role}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
