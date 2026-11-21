import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Meeting not found</h2>

      <p className="text-gray-600">
        Sorry, we couldn&apos;t find the meeting you are looking for.
      </p>

      <Link
        href="/meetings"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Back to Meetings
      </Link>
    </div>
  );
}
