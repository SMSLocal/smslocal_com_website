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

const AUDIENCES = [
  {
    icon: Users2,
    title: "Customers & Clients",
    description:
      "SMS enables quick communication, appointment reminders, and customer updates for higher engagement and satisfaction.",
  },
  {
    icon: Hotel,
    title: "Guests",
    description:
      "Texting enhances guest experiences with fast, real-time communication for bookings, updates, and inquiries.",
  },
  {
    icon: Briefcase,
    title: "Employees",
    description:
      "SMS allows quick reminders, updates, and announcements, helping employees stay informed without needing phone calls.",
  },
  {
    icon: HeartHandshake,
    title: "Donors",
    description:
      "Engage donors instantly with SMS for faster responses, boosting participation in campaigns and donation drives.",
  },
  {
    icon: Stethoscope,
    title: "Patients",
    description:
      "SMS offers discreet communication for appointments, health updates, and medical inquiries with ease and privacy.",
  },
  {
    icon: UserCheck,
    title: "Job applicants",
    description:
      "Speed up the hiring process with SMS updates, application status, and reminders, keeping candidates informed.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Students prefer SMS for timely class updates, reminders, assignments, and quick communication with educators.",
  },
  {
    icon: Handshake,
    title: "Business partners",
    description:
      "SMS ensures seamless communication, providing quick updates, reminders, and notifications for partners.",
  },
  {
    icon: Bell,
    title: "Subscribers & Members",
    description:
      "Keep your audience engaged with real-time SMS updates, promotions, and notifications to enhance interaction.",
  },
];

export default function Audiences() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        badge="Built For Every Audience"
        title="Reach Audiences Who Prefer"
        highlight="Text-Based Communication"
        description="Text messaging has become the most efficient and preferred way for businesses to connect. Here's why various groups favor SMS communication over other channels."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AUDIENCES.map(({ icon: Icon, title, description }, i) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                i % 2 === 0
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
