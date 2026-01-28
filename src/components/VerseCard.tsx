'use client';

export function VerseCard({
  verseNumber,
  arabic,
  translation,
  transliteration,
}: {
  verseNumber: number;
  arabic: string;
  translation: string;
  transliteration: string;
}) {
  return (
    <div className="card mb-4 p-6 transition-shadow hover:shadow-lg">
      {/* Verse Number */}
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
          {verseNumber}
        </span>
        <button className="text-neutral-400 transition hover:text-accent-600">🔖</button>
      </div>

      {/* Arabic Text */}
      <div
        className="font-arabic-uthmani mb-4 text-2xl leading-relaxed text-neutral-900 dark:text-dark-text"
        dir="rtl"
      >
        {arabic}
      </div>

      {/* Transliteration */}
      <div className="mb-3 text-sm italic text-neutral-500 dark:text-neutral-400">
        {transliteration}
      </div>

      {/* Translation */}
      <div className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        {translation}
      </div>

      {/* Audio Button */}
      <div className="mt-4 flex gap-2">
        <button className="flex items-center gap-2 rounded-lg bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800">
          🔊 Listen
        </button>
      </div>
    </div>
  );
}
