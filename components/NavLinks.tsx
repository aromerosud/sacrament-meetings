"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromCurrent = searchParams.get("source") === "current";

  return (
    <nav className="flex flex-wrap items-center gap-6">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href === "/meetings" &&
            pathname.startsWith("/meetings/") &&
            pathname !== "/meetings/current" &&
            !fromCurrent) ||
          (link.href === "/meetings/current" && fromCurrent);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive
                ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                : "text-slate-600 hover:text-blue-700"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
