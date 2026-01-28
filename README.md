# 🕌 Al-Quran Al-Kareem - Quranic Web Application

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A world-class, professional Quranic web application adhering to the **Ahle Sunnat Wal Jamat (Sunni)** Islamic creed. Built with modern web technologies to provide an authentic, accessible, and comprehensive digital Quran experience.

## ✨ Features

### 📖 Quran Reading & Study
- **Multiple Arabic Scripts**: Uthmani, Indo-Pak, and Imlaei scripts
- **Authentic Translations**: 
  - Kanzul Iman (Imam Ahmed Raza Khan) - Urdu
  - Sahih International - English
  - Multiple languages (Arabic, Urdu, English, French, Turkish, Malay, Bengali)
- **Comprehensive Tafsir**:
  - Siraat-ul-Jinan
  - Tafsir-e-Ashrafi
- **Word-by-Word Meanings**: Interactive tooltips with root words and grammar
- **Reading Modes**: Mushaf (page view), Translation, Split view, Continuous scroll

### 🎧 Audio Features
- **World-Renowned Qaris**:
  - Abdul Basit Abdul Samad
  - Mishary Rashid Alafasy
  - Saad Al-Ghamdi
  - And more...
- **Verse Synchronization**: Real-time highlighting during recitation
- **Playback Controls**: Speed adjustment, repeat, autoplay

### 🔍 Advanced Search
- **Semantic Search**: Find verses by meaning and context
- **Keyword Search**: Search in Arabic text and translations
- **Thematic Categories**: Browse verses by topic (e.g., Prayer, Parents, Charity)
- **Filters**: By Surah, Juz, revelation type, and more

### 📚 Tajweed Learning
- **Color-Coded Rules**: Visual representation of Tajweed rules
- **Interactive Lessons**: Learn rules with examples
- **Audio Pronunciation**: Hear correct pronunciation

### 🕌 Islamic Tools
- **Prayer Times**: Accurate times based on location
- **Qibla Finder**: Direction to Kaaba with compass
- **Hijri Calendar**: Islamic date conversion
- **99 Names of Allah**: With meanings and benefits
- **Daily Duas**: Quranic supplications

### 🎯 Aqeedah Section
- **Ash'ari & Maturidi Schools**: Authentic Sunni beliefs
- **Core Topics**: Tawheed, Prophethood, Hereafter
- **Scholarly References**: Citations from classical scholars

### 👤 User Features
- **Bookmarks**: Save favorite verses
- **Notes**: Personal study notes
- **Reading History**: Track progress
- **Customization**: Font size, theme, translations
- **Sync Across Devices**: Cloud-based preferences

### ♿ Accessibility
- **WCAG 2.1 AA Compliant**: Fully accessible
- **Screen Reader Support**: Complete keyboard navigation
- **RTL Support**: Proper Arabic/Urdu text handling
- **High Contrast Mode**: For visual impairments

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm** or **yarn**: Latest version
- **PostgreSQL**: 15 or higher
- **Redis**: (Optional) For caching

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Satyendra-79/My_NEW_Project.git
   cd My_NEW_Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/quran_db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Setup database**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed database with Quran data
   npm run prisma:seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
My_NEW_Project/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Main application routes
│   │   │   ├── surah/         # Surah listing and reading
│   │   │   ├── search/        # Search interface
│   │   │   ├── aqeedah/       # Aqeedah section
│   │   │   ├── tajweed/       # Tajweed learning
│   │   │   └── tools/         # Islamic tools
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── quran/            # Quran-specific components
│   │   └── layout/           # Layout components
│   ├── lib/                   # Utility libraries
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # Authentication
│   │   └── utils.ts          # Helper functions
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeding
├── public/                    # Static assets
│   ├── audio/                # Audio files (CDN)
│   ├── fonts/                # Arabic fonts
│   └── images/               # Images
├── docs/                      # Documentation
│   ├── PROJECT_ROADMAP.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── UI_UX_DESIGN.md
└── tests/                     # Test files
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router, React Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Heroicons

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Caching**: Redis (Upstash)
- **Search**: PostgreSQL Full-Text Search

### DevOps
- **Hosting**: Vercel
- **CDN**: Cloudflare
- **Database**: Vercel Postgres / AWS RDS
- **Storage**: AWS S3 / Cloudflare R2
- **Monitoring**: Sentry
- **Analytics**: Plausible (Privacy-focused)

---

## 📚 Documentation

Comprehensive documentation is available in the project root:

1. **[Project Roadmap](./PROJECT_ROADMAP.md)**: Complete development timeline and milestones
2. **[System Architecture](./SYSTEM_ARCHITECTURE.md)**: Technical architecture and design decisions
3. **[Database Schema](./DATABASE_SCHEMA.md)**: Complete database design with Prisma schema
4. **[API Documentation](./API_DOCUMENTATION.md)**: All API endpoints with examples
5. **[UI/UX Design](./UI_UX_DESIGN.md)**: Design system and component guidelines

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

---

## 📦 Build & Deploy

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🤝 Contributing

We welcome contributions from the Muslim community! Please read our Contributing Guidelines before submitting pull requests.

### Areas for Contribution
- Translations in new languages
- Additional Tafsir sources
- Bug fixes and improvements
- Documentation
- UI/UX enhancements

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Quran Text**: [Tanzil.net](https://tanzil.net)
- **Audio Recitations**: [EveryAyah.com](https://everyayah.com)
- **Translations**: Various authentic Islamic scholars
- **Tafsir**: Classical Islamic scholars (Mufti Muhammad Amjad Ali A'zami, and others)

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Satyendra-79/My_NEW_Project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Satyendra-79/My_NEW_Project/discussions)

---

## 🌟 Features Roadmap

### ✅ Phase 1 (Current)
- [x] Core Quran reading interface
- [x] Multiple translations
- [x] Basic audio playback
- [x] Search functionality
- [x] Prayer times

### 🔄 Phase 2 (In Progress)
- [ ] Complete Tafsir integration
- [ ] Advanced Tajweed module
- [ ] Mobile apps (iOS & Android)
- [ ] Offline mode (PWA)
- [ ] Study groups feature

### 📅 Phase 3 (Planned)
- [ ] AI-powered semantic search
- [ ] Live Quran classes
- [ ] Memorization tracker (Hifz)
- [ ] Community features
- [ ] Widget for other websites

---

## 💖 Support the Project

This project is free and open-source. If you find it beneficial, please:

1. ⭐ Star the repository
2. 📢 Share with others
3. 🤲 Make Dua for the team
4. 🐛 Report bugs and suggest features
5. 💻 Contribute code or translations

---

## 📖 Quranic Verse

> **"Indeed, it is We who sent down the Quran and indeed, We will be its guardian."**  
> *— Surah Al-Hijr (15:9)*

---

**Built with ❤️ for the Muslim Ummah**

*May Allah accept this effort and make it a means of guidance for all.*

**بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ**
THIS IS A NEW experiment project
