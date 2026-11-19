import CurrentYear from "@/components/CurrentYear";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white print:hidden">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-slate-300">
          © <CurrentYear /> Sacrament Meetings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
