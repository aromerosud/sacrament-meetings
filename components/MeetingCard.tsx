import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${meeting.date}T00:00:00Z`));

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <p className="text-sm text-slate-500 mb-1">{formattedDate}</p>

          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {meeting.meetingType} Meeting
          </h2>
        </div>

        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          #{meeting.id}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-5">
        <p>
          <strong className="text-slate-800">Presiding:</strong>{" "}
          {meeting.presiding}
        </p>

        <p>
          <strong className="text-slate-800">Conducting:</strong>{" "}
          {meeting.conducting}
        </p>

        <p>
          <strong className="text-slate-800">Opening Hymn:</strong>{" "}
          {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
      >
        View Meeting Details
      </Link>
    </article>
  );
}
