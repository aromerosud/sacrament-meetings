import { Suspense } from "react";
import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Ward Meetings
        </h1>

        <Suspense fallback={<div className="h-6" />}>
          <NavLinks />
        </Suspense>
      </div>

      {children}
    </div>
  );
}
