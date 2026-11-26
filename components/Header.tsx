import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import HeaderDate from "@/components/HeaderDate";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-primary text-white shadow-md print:hidden">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-2xl font-bold">Los Ficus Ward</p>

        <div className="flex items-center gap-5">
          <HeaderDate />

          {session?.user ? (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
