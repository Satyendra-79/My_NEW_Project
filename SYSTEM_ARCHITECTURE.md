# System Architecture - Quranic Web Application

## 🏛️ Architecture Overview

This document outlines the system architecture for the Quranic Web Application, designed for scalability, performance, and adherence to Islamic authenticity.

---

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  Mobile PWA  │  │  Future Apps │          │
│  │  (Next.js)   │  │  (Offline)   │  │  (Native)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN LAYER (Cloudflare)                      │
│         Static Assets │ Audio Files │ Images │ Fonts            │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER (Vercel)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Next.js 14 App Router (SSR/SSG)             │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │  API Routes│  │ Server     │  │  Middleware│         │  │
│  │  │  (REST)    │  │ Components │  │  (Auth/i18n)│        │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CACHING LAYER (Redis)                       │
│    API Responses │ User Sessions │ Query Results │ Hot Data     │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA ACCESS LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Prisma ORM                              │  │
│  │  Connection Pooling │ Query Optimization │ Migrations    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  PostgreSQL    │  │  Full-Text     │  │  Vector Store  │   │
│  │  (Primary DB)  │  │  Search Index  │  │  (Embeddings)  │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     STORAGE LAYER                                │
│  ┌────────────────┐  ┌────────────────┐                         │
│  │   AWS S3 /     │  │   Backup       │                         │
│  │   Cloudflare R2│  │   Storage      │                         │
│  │   (Audio/Media)│  │   (Automated)  │                         │
│  └────────────────┘  └────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │  Prayer    │  │  Analytics │  │  Monitoring│               │
│  │  Times API │  │  (Plausible)│  │  (Sentry)  │               │
│  └────────────┘  └────────────┘  └────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Core Components

### 1. Frontend Layer (Next.js 14)

#### 1.1 App Router Structure

```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (main)/
│   ├── page.tsx                    # Homepage
│   ├── surah/
│   │   ├── page.tsx                # Surah list
│   │   └── [id]/
│   │       ├── page.tsx            # Surah reader
│   │       └── [ayah]/page.tsx     # Specific verse
│   ├── juz/[id]/page.tsx           # Juz view
│   ├── page/[number]/page.tsx      # Page view (Mushaf)
│   ├── search/page.tsx             # Search interface
│   ├── tafsir/
│   │   └── [surah]/[ayah]/page.tsx # Tafsir viewer
│   ├── aqeedah/
│   │   ├── page.tsx                # Aqeedah home
│   │   └── [topic]/page.tsx        # Specific topics
│   ├── tajweed/
│   │   └── page.tsx                # Tajweed learning
│   ├── tools/
│   │   ├── prayer-times/page.tsx   # Prayer calculator
│   │   ├── qibla/page.tsx          # Qibla finder
│   │   └── duas/page.tsx           # Daily Duas
│   ├── bookmarks/page.tsx          # User bookmarks
│   ├── settings/page.tsx           # User settings
│   └── layout.tsx
├── api/
│   ├── quran/
│   │   ├── verses/route.ts
│   │   ├── surahs/route.ts
│   │   ├── search/route.ts
│   │   └── audio/route.ts
│   ├── tafsir/route.ts
│   ├── translations/route.ts
│   ├── prayer-times/route.ts
│   └── user/
│       ├── bookmarks/route.ts
│       └── preferences/route.ts
├── layout.tsx                      # Root layout
└── globals.css
```

#### 1.2 Key Frontend Features

- **Server Components**: Default for data fetching
- **Client Components**: Interactive UI (audio player, search)
- **Streaming SSR**: Progressive rendering for large content
- **Route Groups**: Clean URL structure
- **Parallel Routes**: Simultaneous tafsir/translation display
- **Intercepting Routes**: Modal overlays for verse details

#### 1.3 State Management

```typescript
// Zustand store example
interface QuranStore {
  // Reading state
  currentSurah: number;
  currentAyah: number;
  readingMode: "mushaf" | "translation" | "split";

  // UI preferences
  theme: "light" | "dark";
  fontSize: number;
  arabicFont: "uthmani" | "indopak";
  showTransliteration: boolean;

  // Active translations
  activeTranslations: string[];
  activeTafsir: string | null;

  // Audio state
  isPlaying: boolean;
  audioQari: string;
  playbackSpeed: number;

  // Actions
  setCurrentVerse: (surah: number, ayah: number) => void;
  toggleTheme: () => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
}
```

---

### 2. API Layer

#### 2.1 RESTful Endpoints

##### Quran Endpoints

```typescript
// GET /api/quran/surahs
// Returns: List of all 114 surahs with metadata
{
  "surahs": [
    {
      "id": 1,
      "number": 1,
      "name": "الفاتحة",
      "englishName": "Al-Fatihah",
      "englishNameTranslation": "The Opening",
      "revelationType": "Meccan",
      "numberOfAyahs": 7
    }
  ]
}

// GET /api/quran/verses?surah=1&from=1&to=7
// Returns: Verses with Arabic text, translations, and metadata
{
  "verses": [
    {
      "id": 1,
      "surahNumber": 1,
      "ayahNumber": 1,
      "numberInQuran": 1,
      "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "uthmani": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
      "indopak": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
      "juzNumber": 1,
      "hizbNumber": 1,
      "pageNumber": 1,
      "sajdah": null
    }
  ]
}

// GET /api/quran/verse/:id/translations?lang=en,ur
// Returns: Specific verse with requested translations
{
  "verse": {...},
  "translations": [
    {
      "id": "kanzul_iman_urdu",
      "language": "urdu",
      "name": "Kanzul Iman",
      "author": "Imam Ahmed Raza Khan",
      "text": "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے"
    }
  ]
}

// GET /api/quran/word-by-word/:surah/:ayah
// Returns: Word-by-word breakdown with meanings
{
  "words": [
    {
      "position": 1,
      "arabic": "بِسْمِ",
      "transliteration": "bismi",
      "translation": "In the name",
      "root": "س م و",
      "grammar": "preposition + noun"
    }
  ]
}
```

##### Search Endpoints

```typescript
// POST /api/quran/search
// Body: { "query": "parents", "type": "semantic", "language": "en" }
{
  "results": [
    {
      "verse": {...},
      "relevanceScore": 0.95,
      "highlightedText": "...",
      "context": [/* surrounding verses */]
    }
  ],
  "totalResults": 15,
  "page": 1
}

// GET /api/quran/topics
// Returns: Thematic categorization
{
  "topics": [
    {
      "id": "parents",
      "nameEn": "Rights of Parents",
      "nameAr": "حقوق الوالدين",
      "verses": [/* verse references */],
      "count": 8
    }
  ]
}
```

##### Audio Endpoints

```typescript
// GET /api/quran/audio/:surah/:ayah?qari=abdulbasit
{
  "audioUrl": "https://cdn.example.com/audio/abdulbasit/001001.mp3",
  "duration": 5.2,
  "format": "mp3",
  "bitrate": 128
}

// GET /api/quran/audio/qaris
{
  "qaris": [
    {
      "id": "abdulbasit",
      "name": "Abdul Basit Abdul Samad",
      "style": "Murattal",
      "language": "ar"
    }
  ]
}
```

##### Tafsir Endpoints

```typescript
// GET /api/tafsir/:surah/:ayah?source=siratul_jinan
{
  "tafsir": {
    "id": "siratul_jinan",
    "name": "Siraat-ul-Jinan",
    "author": "Mufti Muhammad Amjad Ali A'zami",
    "language": "urdu",
    "text": "تفسیر کا متن...",
    "surahNumber": 1,
    "ayahNumber": 1
  },
  "relatedVerses": [/* cross-references */]
}
```

##### User Endpoints

```typescript
// POST /api/user/bookmarks
// Body: { "surahNumber": 2, "ayahNumber": 255 }
{
  "success": true,
  "bookmark": {
    "id": "uuid",
    "createdAt": "2026-01-28T12:00:00Z"
  }
}

// GET /api/user/preferences
{
  "preferences": {
    "theme": "dark",
    "fontSize": 18,
    "arabicFont": "uthmani",
    "defaultTranslations": ["kanzul_iman_urdu", "sahih_international"],
    "autoPlayAudio": false
  }
}
```

##### Islamic Tools Endpoints

```typescript
// GET /api/tools/prayer-times?lat=40.7128&lng=-74.0060&date=2026-01-28
{
  "location": {
    "city": "New York",
    "country": "USA"
  },
  "date": "2026-01-28",
  "times": {
    "fajr": "05:45",
    "sunrise": "07:15",
    "dhuhr": "12:20",
    "asr": "15:10",
    "maghrib": "17:25",
    "isha": "18:50"
  },
  "method": "ISNA"
}

// GET /api/tools/qibla?lat=40.7128&lng=-74.0060
{
  "direction": 58.5,
  "distance": 11058
}
```

#### 2.2 API Security & Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return NextResponse.next();
}
```

---

### 3. Database Layer (PostgreSQL + Prisma)

#### 3.1 Connection Architecture

```typescript
// Database connection pooling
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Connection pool settings
{
  "connection_limit": 10,
  "pool_timeout": 10,
  "statement_timeout": "30s"
}
```

#### 3.2 Query Optimization Strategies

- **Indexes**: On frequently queried fields (surahNumber, ayahNumber)
- **Materialized Views**: For complex aggregations
- **Prepared Statements**: Via Prisma for security
- **Connection Pooling**: PgBouncer for Serverless
- **Read Replicas**: For scaling read operations

#### 3.3 Full-Text Search

```sql
-- Create GIN index for full-text search
CREATE INDEX idx_verses_search ON verses
USING GIN(to_tsvector('arabic', text));

-- Search query
SELECT * FROM verses
WHERE to_tsvector('arabic', text) @@ to_tsquery('arabic', 'الله & رحمن');
```

---

### 4. Caching Strategy

#### 4.1 Redis Caching Layers

```typescript
// Cache hierarchy
const CACHE_TTL = {
  VERSES: 86400, // 24 hours (rarely changes)
  TRANSLATIONS: 86400, // 24 hours
  TAFSIR: 86400, // 24 hours
  AUDIO_URLS: 3600, // 1 hour (CDN URLs)
  USER_PREFS: 300, // 5 minutes
  SEARCH_RESULTS: 1800, // 30 minutes
  PRAYER_TIMES: 3600, // 1 hour
};

// Cache key patterns
const CACHE_KEYS = {
  VERSE: (surah: number, ayah: number) => `verse:${surah}:${ayah}`,
  TRANSLATION: (verseId: string, lang: string) => `trans:${verseId}:${lang}`,
  SURAH: (id: number) => `surah:${id}`,
  AUDIO: (qari: string, surah: number, ayah: number) =>
    `audio:${qari}:${surah}:${ayah}`,
};
```

#### 4.2 Cache Invalidation

```typescript
// Invalidation strategies
- Time-based expiration (TTL)
- Manual invalidation on data updates
- Cache warming for popular content
- LRU eviction policy
```

---

### 5. CDN & Asset Delivery

#### 5.1 Cloudflare Configuration

```javascript
// Cloudflare Workers for edge caching
export default {
  async fetch(request, env) {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await fetch(request);
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=86400");
      response = new Response(response.body, { headers });
      await cache.put(request, response.clone());
    }

    return response;
  },
};
```

#### 5.2 Asset Types & Caching

- **Audio Files**: 1 year cache, versioned URLs
- **Fonts (SVG)**: Immutable, long-term cache
- **Images**: Optimized with Next/Image, auto WebP
- **Static Pages**: Edge cached, ISR for updates

---

### 6. Authentication & Authorization

#### 6.1 NextAuth.js Configuration

```typescript
// auth.config.ts
export const authOptions: NextAuthOptions = {
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
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
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

#### 6.2 Authorization Levels

- **Guest**: Read-only access to Quran, translations, tafsir
- **Registered User**: Bookmarks, notes, preferences sync
- **Premium User** (future): Offline download, ad-free, advanced features
- **Admin**: Content management, user management

---

### 7. Performance Optimization

#### 7.1 Next.js Optimizations

```typescript
// next.config.js
module.exports = {
  experimental: {
    ppr: true, // Partial Pre-rendering
    serverActions: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
};
```

#### 7.2 Code Splitting

```typescript
// Dynamic imports for heavy components
const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), {
  ssr: false,
  loading: () => <AudioPlayerSkeleton />,
});

const TafsirPanel = dynamic(() => import('@/components/TafsirPanel'), {
  loading: () => <TafsirSkeleton />,
});
```

#### 7.3 Image Optimization

```typescript
// Optimized Arabic fonts
import localFont from "next/font/local";

const uthmaniFont = localFont({
  src: "./fonts/UthmanicHafs.woff2",
  variable: "--font-uthmani",
  display: "swap",
  preload: true,
});
```

---

### 8. Monitoring & Observability

#### 8.1 Sentry Configuration

```typescript
// sentry.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  },
});
```

#### 8.2 Performance Monitoring

```typescript
// Web Vitals tracking
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "FCP":
    case "LCP":
    case "CLS":
    case "FID":
    case "TTFB":
      // Send to analytics
      analytics.track(metric.name, metric.value);
      break;
  }
}
```

---

### 9. Deployment Architecture

#### 9.1 Vercel Deployment

```
┌─────────────────────────────────────────┐
│         Vercel Edge Network             │
│    (Global CDN - 100+ locations)        │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼─────────┐   ┌────────▼────────┐
│  Edge Functions │   │  Serverless     │
│  (Middleware)   │   │  Functions      │
│  - Auth check   │   │  - API Routes   │
│  - i18n routing │   │  - SSR Pages    │
└─────────────────┘   └─────────────────┘
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────▼───────────┐
        │  Database Connection  │
        │  (Connection Pooling) │
        └───────────┬───────────┘
                    │
        ┌───────────▼───────────┐
        │  Vercel Postgres      │
        │  (or AWS RDS)         │
        └───────────────────────┘
```

#### 9.2 Environment Configuration

```bash
# Production
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
REDIS_URL="redis://..."
NEXTAUTH_URL="https://quran.example.com"
NEXTAUTH_SECRET="..."

# Vercel KV (Redis)
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."

# S3/R2 for Audio
STORAGE_ENDPOINT="..."
STORAGE_ACCESS_KEY="..."
STORAGE_SECRET_KEY="..."

# Third-party APIs
PRAYER_TIMES_API_KEY="..."
SENTRY_DSN="..."
```

---

### 10. Scalability Considerations

#### 10.1 Horizontal Scaling

- **Serverless Functions**: Auto-scale with traffic
- **Database**: Read replicas for query distribution
- **Cache**: Redis cluster for high availability
- **CDN**: Global edge locations for static assets

#### 10.2 Performance Targets

- **Page Load**: < 2s (mobile 3G)
- **Time to Interactive**: < 3s
- **API Response**: < 100ms (95th percentile)
- **Audio Start**: < 500ms
- **Search Results**: < 500ms

#### 10.3 Load Testing

```bash
# Artillery.io load test
artillery quick --count 100 --num 10 https://quran.example.com/api/quran/verses
```

---

### 11. Disaster Recovery

#### 11.1 Backup Strategy

- **Database**: Daily automated backups (30-day retention)
- **User Data**: Real-time replication
- **Audio Files**: Replicated across regions
- **Configuration**: Version controlled in Git

#### 11.2 Recovery Plan

- **RTO (Recovery Time Objective)**: < 1 hour
- **RPO (Recovery Point Objective)**: < 5 minutes
- **Failover**: Automatic to backup region
- **Monitoring**: 24/7 uptime monitoring

---

## 📊 Architecture Decision Records (ADR)

### ADR-001: Why Next.js 14?

- **Decision**: Use Next.js 14 with App Router
- **Rationale**:
  - Server Components for performance
  - Built-in optimizations (images, fonts)
  - Excellent SEO support
  - Strong TypeScript integration
  - Large community and ecosystem

### ADR-002: Why PostgreSQL over MongoDB?

- **Decision**: PostgreSQL for primary database
- **Rationale**:
  - ACID compliance for data integrity
  - Strong full-text search capabilities
  - Better for structured Quranic data
  - Excellent JSON support for flexibility
  - Robust indexing and query optimization

### ADR-003: Why Redis for Caching?

- **Decision**: Redis for application cache
- **Rationale**:
  - In-memory speed (sub-millisecond latency)
  - Rich data structures
  - Excellent Next.js integration (Vercel KV)
  - Pub/sub for real-time features
  - Proven scalability

---

## 🔄 Future Enhancements

1. **GraphQL API**: For complex, nested queries
2. **WebSockets**: Real-time collaborative study sessions
3. **AI Features**: Thematic analysis, smart recommendations
4. **Offline-First**: Progressive Web App with IndexedDB
5. **Multi-tenancy**: White-label solutions for Islamic centers
6. **API Gateway**: Kong or AWS API Gateway for advanced routing

---

**This architecture ensures a scalable, performant, and maintainable system that can serve millions of users while maintaining the authenticity and sanctity of the Quranic content.**
