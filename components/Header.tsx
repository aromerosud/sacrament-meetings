import { connection } from "next/server";

export default async function Header() {
  await connection();

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl font-bold">Los Ficus Ward</h1>

        <p className="text-sm text-blue-100">{formattedDate}</p>
      </div>
    </header>
  );
}
