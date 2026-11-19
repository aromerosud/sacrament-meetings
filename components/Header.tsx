import HeaderDate from "@/components/HeaderDate";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md print:hidden">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-2xl font-bold">Los Ficus Ward</p>

        <HeaderDate />
      </div>
    </header>
  );
}
