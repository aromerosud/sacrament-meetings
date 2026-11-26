import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import MeetingForm from "@/components/MeetingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Meeting",
  description:
    "Edit the schedule, assignments, and details of a sacrament meeting for Los Ficus Ward.",
};

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p className="text-center text-slate-600 py-10">Loading meeting...</p>
      }
    >
      <EditMeetingContent params={params} />
    </Suspense>
  );
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Meeting</h1>
      <MeetingForm key={JSON.stringify(meeting)} meeting={meeting} />
    </div>
  );
}
