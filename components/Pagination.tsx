"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-6"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600"
        >
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600"
        >
          Next
        </span>
      )}
    </nav>
  );
}
