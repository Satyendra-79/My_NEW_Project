import Link from "next/link";
import { SURAHS } from "@/data/quran";
import { Header } from "@/components/Header";

export const metadata = {
  title: "All Surahs | Al-Quran Al-Kareem",
  description:
    "Browse all 114 Surahs (chapters) of the Holy Quran with verse counts and revelation information",
};

export default function SurahsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-neutral-900 dark:text-dark-text mb-4">
              <span className="block text-4xl font-arabic-modern mb-2" dir="rtl">
                السور القرآنية
              </span>
              All Surahs
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Explore all 114 Surahs (chapters) of the Holy Quran
            </p>
          </div>

          {/* Surahs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SURAHS.map((surah) => (
              <Link
                key={surah.id}
                href={`/surahs/${surah.id}`}
                className="card p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                {/* Surah Number */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                      {surah.number}
                    </div>
                    <div>
                      {/* English Name */}
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                        {surah.name}
                      </h3>
                      {/* Arabic Name */}
                      <p
                        className="text-sm font-arabic-modern text-neutral-700 dark:text-neutral-400"
                        dir="rtl"
                      >
                        {surah.nameAr}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Surah Info */}
                <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>📖 {surah.verses} verses</span>
                  <span>
                    {surah.revelation === "Meccan" ? "🕋️ Meccan" : "🕌 Madinan"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
