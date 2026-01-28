# Implementation Guide - Next Steps

## 🚀 Quick Start Commands

After reviewing all documentation, follow these steps to start development:

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database (PostgreSQL Required)
```bash
# Create database
createdb quran_db

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your database credentials
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quran_db"

# Generate Prisma Client
npm run prisma:generate

# Run migrations (creates tables)
npm run prisma:migrate
```

### 3. Seed Initial Data (Important!)
```bash
# You'll need to implement the seed script with Quran data
# Download Quran data from:
# - https://tanzil.net/download (for Arabic text)
# - https://api.quran.com/ (for translations)

npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

---

## 📋 Priority Implementation Checklist

### Week 1-2: Core Setup ✅
- [x] Project structure created
- [x] Next.js 14 configured
- [x] Tailwind CSS setup
- [x] Database schema designed
- [ ] Prisma seed script with Quran data
- [ ] Basic authentication setup

### Week 3-4: Quran Reading Interface
- [ ] Surah list page (`/surahs`)
- [ ] Surah reader page (`/surah/[id]`)
- [ ] Verse display component
- [ ] Translation toggle
- [ ] Font switching (Uthmani/Indo-Pak)
- [ ] Dark mode implementation

### Week 5-6: API Development
- [ ] GET /api/quran/surahs
- [ ] GET /api/quran/surah/[id]
- [ ] GET /api/quran/verses
- [ ] GET /api/translations
- [ ] GET /api/tafsir/[verseKey]
- [ ] Implement caching with Redis

### Week 7-8: Audio Integration
- [ ] Audio player component
- [ ] GET /api/audio/qaris
- [ ] GET /api/audio/[qariId]/verse/[verseKey]
- [ ] Verse synchronization
- [ ] Playback controls

### Week 9-10: Search & Navigation
- [ ] Search page (`/search`)
- [ ] POST /api/quran/search (keyword)
- [ ] Thematic categories
- [ ] Juz/Page navigation
- [ ] Bookmarks functionality

### Week 11-12: Islamic Tools
- [ ] Prayer times calculator (`/tools/prayer-times`)
- [ ] Qibla finder (`/tools/qibla`)
- [ ] Hijri calendar
- [ ] 99 Names of Allah

### Week 13-14: User Features
- [ ] User authentication (NextAuth.js)
- [ ] User preferences
- [ ] Bookmarks CRUD
- [ ] Notes system
- [ ] Reading history

### Week 15-16: Aqeedah & Tajweed
- [ ] Aqeedah section (`/aqeedah`)
- [ ] Tajweed learning module (`/tajweed`)
- [ ] Color-coded Tajweed rules
- [ ] Interactive examples

### Week 17-18: Testing & Optimization
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] SEO optimization

### Week 19-20: Deployment
- [ ] Production build
- [ ] Deploy to Vercel
- [ ] Configure CDN
- [ ] Setup monitoring (Sentry)
- [ ] Launch! 🚀

---

## 📦 Essential Data Sources

### Quran Text
1. **Tanzil.net**: Download Uthmani and Simple text
   - URL: https://tanzil.net/download
   - Format: XML or Text

2. **Quran.com API**: For additional data
   - API: https://api.quran.com/api/v4/chapters
   - Comprehensive metadata

### Translations
1. **Kanzul Iman (Urdu)**: 
   - Source needed from Islamic scholars/publishers
   - Ensure proper authorization

2. **Sahih International (English)**:
   - Available via Quran.com API

3. **Additional translations**:
   - French: Muhammad Hamidullah
   - Turkish: Diyanet İşleri
   - Indonesian: Kementerian Agama

### Audio Recitations
1. **EveryAyah.com**: High-quality recitations
   - URL: https://everyayah.com/
   - Multiple Qaris available
   - Verse-by-verse audio files

2. **Quran.com Audio**:
   - API endpoint for audio URLs
   - Streaming support

### Tafsir
1. **Siraat-ul-Jinan**: 
   - Contact Islamic publishers for digital version
   - Ensure copyright compliance

2. **Tafsir-e-Ashrafi**:
   - Contact scholars/publishers
   - Obtain proper permissions

---

## 🔧 Critical Components to Build

### 1. Prisma Seed Script (`prisma/seed.ts`)

```typescript
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Surahs
  console.log('Seeding Surahs...');
  const surahsData = JSON.parse(readFileSync('./data/surahs.json', 'utf-8'));
  await prisma.surah.createMany({ data: surahsData });

  // 2. Seed Verses
  console.log('Seeding Verses...');
  const versesData = JSON.parse(readFileSync('./data/verses.json', 'utf-8'));
  await prisma.verse.createMany({ data: versesData });

  // 3. Seed Translations
  console.log('Seeding Translations...');
  const translationsData = JSON.parse(readFileSync('./data/translations.json', 'utf-8'));
  await prisma.translation.createMany({ data: translationsData });

  // 4. Seed Translation Sources
  console.log('Seeding Translation Sources...');
  const sources = [
    {
      translationId: 'kanzul_iman_urdu',
      name: 'Kanzul Iman',
      author: 'Imam Ahmed Raza Khan',
      language: 'urdu',
      languageDirection: 'RTL',
      isActive: true,
    },
    // Add more sources
  ];
  await prisma.translationSource.createMany({ data: sources });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 2. Prisma Client Singleton (`src/lib/prisma.ts`)

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 3. NextAuth Configuration (`src/lib/auth.ts`)

```typescript
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

### 4. Utility Functions (`src/lib/utils.ts`)

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVerseKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`;
}

export function parseVerseKey(verseKey: string): { surah: number; ayah: number } {
  const [surah, ayah] = verseKey.split(':').map(Number);
  return { surah, ayah };
}

export function getArabicNumber(num: number): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num
    .toString()
    .split('')
    .map((digit) => arabicNumbers[parseInt(digit)])
    .join('');
}
```

---

## 🎨 Component Examples

### Verse Component (`src/components/quran/Verse.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { Play, Bookmark, Share, BookOpen } from 'lucide-react';

interface VerseProps {
  verseNumber: number;
  arabicText: string;
  translations: Array<{
    id: string;
    name: string;
    text: string;
  }>;
  onPlayAudio?: () => void;
  onBookmark?: () => void;
}

export function Verse({
  verseNumber,
  arabicText,
  translations,
  onPlayAudio,
  onBookmark,
}: VerseProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="verse-container">
      {/* Verse Number Badge */}
      <div className="verse-number-badge">
        <span>{verseNumber}</span>
      </div>

      {/* Arabic Text */}
      <div className="verse-arabic" dir="rtl" lang="ar">
        {arabicText}
      </div>

      {/* Translations */}
      <div className="verse-translations">
        {translations.map((translation) => (
          <div key={translation.id} className="translation">
            <span className="translation-label">{translation.name}:</span>
            <p className="translation-text">{translation.text}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="verse-actions">
        <button className="action-btn" onClick={onPlayAudio} title="Play Audio">
          <Play size={18} />
        </button>
        <button
          className="action-btn"
          onClick={() => {
            setIsBookmarked(!isBookmarked);
            onBookmark?.();
          }}
          title="Bookmark"
        >
          <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <button className="action-btn" title="Share">
          <Share size={18} />
        </button>
        <button className="action-btn" title="View Tafsir">
          <BookOpen size={18} />
        </button>
      </div>
    </div>
  );
}
```

---

## 🔐 Environment Variables Setup

Create `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/quran_db?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/quran_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional: OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Redis
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Optional: Email
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@quran.example.com"
```

---

## 📚 Recommended Reading Order

1. **[PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)** - Understand the full scope
2. **[SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)** - Learn the technical design
3. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Understand data structure
4. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API endpoints reference
5. **[UI_UX_DESIGN.md](./UI_UX_DESIGN.md)** - Design system and components

---

## 🤝 Getting Help

- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions and share ideas
- **Documentation**: Comprehensive guides available

---

## ✅ Development Best Practices

1. **Code Quality**
   - Write TypeScript with strict mode
   - Use ESLint and Prettier
   - Write meaningful commit messages

2. **Testing**
   - Write unit tests for utilities
   - E2E tests for critical flows
   - Test accessibility

3. **Performance**
   - Use React Server Components by default
   - Implement proper caching
   - Optimize images and fonts

4. **Security**
   - Never commit .env files
   - Sanitize user inputs
   - Use rate limiting on APIs

5. **Accessibility**
   - Use semantic HTML
   - Provide ARIA labels
   - Test with screen readers

---

## 🎯 Success Metrics

- **Performance**: Lighthouse score > 90
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structure
- **User Experience**: Intuitive and spiritual

---

**May Allah facilitate this development and make it beneficial for the Ummah! 🤲**

**بارك الله فيكم**
