import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-semibold mb-3">
            Welcome to Sacrament Meetings
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Organize and manage your Sunday meetings
          </h1>

          <p className="text-slate-600 leading-relaxed mb-8">
            Plan sacrament meeting agendas, organize speakers, manage hymns, and
            keep all meeting information in one place.
          </p>

          <Link
            href="/meetings"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            View Meetings
          </Link>
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/meeting-banner.jpg"
            alt="Interior of a chapel prepared for a sacrament meeting"
            width={1200}
            height={675}
            className="w-full h-auto aspect-video object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
    </div>
  );
}
