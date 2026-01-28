import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-5xl text-white font-arabic-uthmani">ق</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-neutral-900 dark:text-dark-text">
              <span
                className="block text-5xl font-arabic-modern mb-2"
                dir="rtl"
              >
                القرآن الكريم
              </span>
              <span className="block text-3xl mt-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Al-Quran Al-Kareem
              </span>
            </h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Read, listen, and study the Holy Quran with authentic Sunni
              translations, comprehensive Tafsir, and interactive learning
              tools.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/surahs"
              className="btn btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Reading
            </Link>
            <Link
              href="/search"
              className="btn btn-secondary px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Search Quran
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
            <FeatureCard
              icon="📖"
              title="Authentic Translations"
              description="Kanzul Iman by Imam Ahmed Raza Khan and other verified Sunni translations"
            />
            <FeatureCard
              icon="🎧"
              title="Audio Recitations"
              description="Listen to world-renowned Qaris with verse-by-verse synchronization"
            />
            <FeatureCard
              icon="📚"
              title="Comprehensive Tafsir"
              description="Siraat-ul-Jinan and Tafsir-e-Ashrafi with detailed explanations"
            />
            <FeatureCard
              icon="🔤"
              title="Word-by-Word"
              description="Interactive word-by-word meanings for deeper understanding"
            />
            <FeatureCard
              icon="🕌"
              title="Prayer Times"
              description="Accurate prayer times based on your location"
            />
            <FeatureCard
              icon="🧭"
              title="Qibla Finder"
              description="Find the direction of Kaaba from anywhere in the world"
            />
          </div>

          {/* Aqeedah Badge */}
          <div className="pt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-surface rounded-full shadow-lg border-2 border-primary-200 dark:border-primary-800">
              <span className="text-2xl">☪️</span>
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Adhering to Ahle Sunnat Wal Jamat (Ash'ari & Maturidi)
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-dark-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>© 2026 Al-Quran Al-Kareem. All rights reserved.</p>
            <p className="mt-2">
              Built with reverence for the Holy Quran and Islamic scholarship.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card p-6 hover:shadow-xl transition-shadow duration-300 group">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-text mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
