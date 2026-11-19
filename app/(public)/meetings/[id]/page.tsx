import { Suspense } from "react";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { notFound } from "next/navigation";
import type { SacramentMeeting } from "@/lib/types";
import MeetingDetail from "@/components/MeetingDetail";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p className="text-center text-slate-600 py-10">
          Loading meeting details...
        </p>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const baseUrl = await getBaseUrl();

  const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting details.");
  }

  const meeting: SacramentMeeting = await response.json();

  return <MeetingDetail meeting={meeting} />;
}
