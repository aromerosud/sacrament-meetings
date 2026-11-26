import type { SacramentMeeting } from "@/lib/types";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Browse scheduled sacrament meetings, including dates, presiding leaders, conducting leaders, and meeting details.",
};

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const params = await searchParams;
  const query = params?.query ?? "";
  const currentPage = Math.max(1, Number(params?.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Sacrament Meetings
          </h1>
          <p className="text-slate-600 mt-2">
            Browse the scheduled sacrament meetings for our ward.
          </p>
        </div>

        {isLoggedIn && (
          <Link
            href="/meetings/new"
            className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 transition-colors text-center"
          >
            + Create New Meeting
          </Link>
        )}
      </div>

      <div className="mb-6">
        <MeetingSearch />
      </div>

      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting: SacramentMeeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-600">
          No meetings found. Try a different search.
        </p>
      )}

      <Pagination totalPages={totalPages} />
    </section>
  );
}
