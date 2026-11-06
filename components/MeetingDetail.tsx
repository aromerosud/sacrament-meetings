import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${meeting.date}T00:00:00Z`));

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-slate-500">
            Meeting ID: {meeting.id}
          </p>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {meeting.meetingType}
          </span>
        </div>

        <p className="text-sm text-slate-500">{formattedDate}</p>
        <h1 className="text-3xl font-bold text-primary capitalize mt-2">
          {meeting.meetingType} Meeting
        </h1>
        <p className="text-slate-600 mt-2">Presiding: {meeting.presiding}</p>
        <p className="text-slate-600">Conducting: {meeting.conducting}</p>
      </header>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Opening</h2>
        <p className="text-slate-600">
          <strong>Opening Hymn:</strong> {meeting.openingHymn.number} -{" "}
          {meeting.openingHymn.title}
        </p>
        <p className="text-slate-600 mt-2">
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Ward Business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-slate-600">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No ward business.</p>
        )}

        <p className="mt-3 text-slate-600">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Sacrament</h2>
        <p className="text-slate-600">
          <strong>Sacrament Hymn:</strong> {meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          Speakers and Musical Numbers
        </h2>
        <ul className="space-y-3">
          {meeting.speakers.map((item, index) => (
            <li key={index} className="border-l-4 border-blue-200 pl-4 py-1">
              <p className="font-semibold text-slate-800">{item.name}</p>
              <p className="text-sm text-slate-600">
                {item.type === "speaker"
                  ? `Topic: ${item.topic || "Not specified"}`
                  : "Musical Number"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Closing</h2>
        <p className="text-slate-600">
          <strong>Closing Hymn:</strong> {meeting.closingHymn.number} -{" "}
          {meeting.closingHymn.title}
        </p>
        <p className="text-slate-600 mt-2">
          <strong>Closing Prayer:</strong> {meeting.closingPrayer}
        </p>
      </section>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            Announcements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
