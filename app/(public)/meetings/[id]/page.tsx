import { Suspense } from "react";
import { headers } from "next/headers";
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

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine the request host.");
  }

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${meetingId}`,
    { cache: "no-store" },
  );

  if (response.status === 404 || response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting details.");
  }

  const meeting: SacramentMeeting = await response.json();

  return <MeetingDetail meeting={meeting} />;
}
