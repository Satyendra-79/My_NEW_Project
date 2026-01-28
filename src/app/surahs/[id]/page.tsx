import { getSurahById, getVersesBySurah } from "@/data/quran";
import { VerseCard } from "@/components/VerseCard";
import { Header } from "@/components/Header";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Generate params for all 114 Surahs
  return Array.from({ length: 114 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const surah = getSurahById(parseInt(params.id));
  if (!surah) return { title: "Not Found" };
  return {
    title: `${surah.name} (Surah ${surah.number}) | Al-Quran Al-Kareem`,
    description: `Read Surah ${surah.name} with translations and Tafsir. ${surah.verses} verses from the Holy Quran.`,
  };
}

export default function SurahPage({
  params,
}: {
  params: { id: string };
}) {
  const surah = getSurahById(parseInt(params.id));

  if (!surah) {
    notFound();
  }

  const verses = getVersesBySurah(surah.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            href="/surahs"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 font-medium"
          >
            ← Back to Surahs
          </Link>

          {/* Surah Header */}
          <div className="card p-8 mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-2xl mb-4">
              {surah.number}
            </div>

            <h1 className="text-5xl font-bold text-neutral-900 dark:text-dark-text mb-2">
              <span className="block text-4xl font-arabic-modern mb-2" dir="rtl">
                {surah.nameAr}
              </span>
              {surah.name}
            </h1>

            {/* Surah Info */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-neutral-600 dark:text-neutral-400">
              <div>
                <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {surah.verses}
                </span>
                <span className="text-sm">Verses</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {surah.revelation}
                </span>
                <span className="text-sm">Revelation</span>
              </div>
            </div>
          </div>

          {/* Basmala */}
          {surah.number !== 9 && (
            <div className="card p-8 mb-8 text-center">
              <div
                className="text-3xl leading-relaxed font-arabic-uthmani text-neutral-900 dark:text-dark-text"
                dir="rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-4 italic">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          )}

          {/* Verses */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-6">
              Verses
            </h2>
            {verses.length > 0 ? (
              verses.map((verse) => (
                <VerseCard
                  key={verse.verseNumber}
                  verseNumber={verse.verseNumber}
                  arabic={verse.arabic}
                  translation={verse.translation}
                  transliteration={verse.transliteration}
                />
              ))
            ) : (
              <div className="card p-8 text-center text-neutral-600 dark:text-neutral-400">
                <p>Verses for this Surah will be added soon.</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            {surah.id > 1 && (
              <Link
                href={`/surahs/${surah.id - 1}`}
                className="btn btn-secondary px-6 py-3"
              >
                ← Previous Surah
              </Link>
            )}
            <div />
            {surah.id < 114 && (
              <Link
                href={`/surahs/${surah.id + 1}`}
                className="btn btn-primary px-6 py-3"
              >
                Next Surah →
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
