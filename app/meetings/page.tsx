import { headers } from "next/headers";
import type { SacramentMeeting } from "@/lib/types";
import MeetingCard from "@/components/MeetingCard";

export default async function MeetingsPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine the request host.");
  }

  const response = await fetch(`${protocol}://${host}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meetings.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Sacrament Meetings
        </h2>
        <p className="text-slate-600 mt-2">
          Browse the scheduled sacrament meetings for our ward.
        </p>
      </div>

      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="text-slate-600">No meetings have been scheduled yet.</p>
      )}
    </section>
  );
}
