'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm dark:border-dark-border dark:bg-dark-surface">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
            <span className="text-lg text-white">ق</span>
          </div>
          <span className="text-neutral-900 dark:text-white">Al-Quran</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/surahs"
            className="text-neutral-700 transition hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
          >
            Surahs
          </Link>
          <Link
            href="/search"
            className="text-neutral-700 transition hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
          >
            Search
          </Link>
          <Link
            href="/prayer-times"
            className="text-neutral-700 transition hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
          >
            Prayer Times
          </Link>
          <Link
            href="/bookmark"
            className="text-neutral-700 transition hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
          >
            Bookmarks
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 dark:border-dark-border md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/surahs"
              className="text-neutral-700 hover:text-primary-600 dark:text-neutral-300"
            >
              Surahs
            </Link>
            <Link
              href="/search"
              className="text-neutral-700 hover:text-primary-600 dark:text-neutral-300"
            >
              Search
            </Link>
            <Link
              href="/prayer-times"
              className="text-neutral-700 hover:text-primary-600 dark:text-neutral-300"
            >
              Prayer Times
            </Link>
            <Link
              href="/bookmark"
              className="text-neutral-700 hover:text-primary-600 dark:text-neutral-300"
            >
              Bookmarks
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
