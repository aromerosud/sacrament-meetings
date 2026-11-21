import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Create New Meeting</h1>
      <MeetingForm />
    </main>
  );
}
