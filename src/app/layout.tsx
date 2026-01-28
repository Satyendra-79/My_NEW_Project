import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Al-Quran Al-Kareem | القرآن الكريم",
    template: "%s | Al-Quran Al-Kareem",
  },
  description:
    "A comprehensive Quranic web application with authentic Sunni translations, Tafsir, word-by-word meanings, audio recitations, and Islamic tools. Adhering to Ahle Sunnat Wal Jamat teachings.",
  keywords: [
    "Quran",
    "القرآن",
    "Kanzul Iman",
    "Islamic",
    "Sunni",
    "Ahle Sunnat",
    "Tafsir",
    "Tajweed",
    "Prayer Times",
    "Qibla",
  ],
  authors: [{ name: "Al-Quran Al-Kareem Team" }],
  creator: "Al-Quran Al-Kareem",
  publisher: "Al-Quran Al-Kareem",
  metadataBase: new URL("https://quran.example.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
      "ur-PK": "/ur",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quran.example.com",
    title: "Al-Quran Al-Kareem | القرآن الكريم",
    description:
      "Read, listen, and study the Holy Quran with authentic Sunni translations and Tafsir",
    siteName: "Al-Quran Al-Kareem",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Quran Al-Kareem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Quran Al-Kareem",
    description: "Read, listen, and study the Holy Quran",
    images: ["/twitter-image.jpg"],
    creator: "@quranapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0D7C66" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
