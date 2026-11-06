import { connection } from "next/server";

export default async function Footer() {
  await connection();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-slate-300">
          © {currentYear} Sacrament Meetings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
