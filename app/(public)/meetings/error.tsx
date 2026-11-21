"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>

      <p className="text-gray-600">
        {error.message || "An unexpected error occurred."}
      </p>

      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try Again
      </button>

      <Link
        href="/meetings"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Back to Meetings
      </Link>
    </div>
  );
}
