"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { VerseCard } from "@/components/VerseCard";
import { searchVerses } from "@/data/quran";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const searchResults = searchVerses(query);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="container mx-auto px-4 py-12">
          {/* Search Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-text mb-4">
              Search the Holy Quran
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Search through verses, translations, and meanings
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for verses, words, or topics..."
                className="w-full px-6 py-4 pr-32 text-lg rounded-2xl border-2 border-primary-200 dark:border-primary-800 bg-white dark:bg-dark-surface text-neutral-900 dark:text-dark-text placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
              />
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => {
                  setQuery("mercy");
                  handleSearch(new Event("submit") as any);
                }}
                className="px-4 py-2 bg-white dark:bg-dark-surface border border-primary-200 dark:border-primary-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Mercy
              </button>
              <button
                onClick={() => {
                  setQuery("paradise");
                  handleSearch(new Event("submit") as any);
                }}
                className="px-4 py-2 bg-white dark:bg-dark-surface border border-primary-200 dark:border-primary-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Paradise
              </button>
              <button
                onClick={() => {
                  setQuery("prayer");
                  handleSearch(new Event("submit") as any);
                }}
                className="px-4 py-2 bg-white dark:bg-dark-surface border border-primary-200 dark:border-primary-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Prayer
              </button>
              <button
                onClick={() => {
                  setQuery("guidance");
                  handleSearch(new Event("submit") as any);
                }}
                className="px-4 py-2 bg-white dark:bg-dark-surface border border-primary-200 dark:border-primary-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Guidance
              </button>
            </div>
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-text">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </h2>
              </div>

              <div className="space-y-4">
                {results.map((verse) => (
                  <VerseCard key={`${verse.surahId}-${verse.number}`} verse={verse} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && !isSearching && results.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                No results found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try different keywords or search terms
              </p>
            </div>
          )}

          {/* Search Tips */}
          {!query && (
            <div className="max-w-3xl mx-auto mt-16">
              <div className="card p-8">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-text mb-4">
                  Search Tips
                </h3>
                <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      •
                    </span>
                    <span>
                      Use simple keywords for better results (e.g., "mercy", "patience")
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      •
                    </span>
                    <span>
                      Search works across Arabic text, translations, and transliterations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      •
                    </span>
                    <span>Click on quick filters above for common topics</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
