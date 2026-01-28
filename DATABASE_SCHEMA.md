# Database Schema - Quranic Web Application

## 🗄️ Database Design Overview

This document defines the complete database schema for the Quranic Web Application using PostgreSQL and Prisma ORM.

---

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Surah     │────────<│    Verse     │>────────│ Translation │
│             │ 1     * │              │ 1     * │             │
└─────────────┘         └──────────────┘         └─────────────┘
                              │ 1
                              │
                              │ *
                        ┌──────────────┐
                        │  Word        │
                        │  (Word-by-   │
                        │   Word)      │
                        └──────────────┘

┌──────────────┐         ┌──────────────┐
│   Tafsir     │────────<│    Verse     │
│              │ 1     * │              │
└──────────────┘         └──────────────┘

┌──────────────┐         ┌──────────────┐
│   Audio      │────────<│    Verse     │
│   Files      │ 1     * │              │
└──────────────┘         └──────────────┘

┌──────────────┐         ┌──────────────┐
│   User       │────────<│   Bookmark   │
│              │ 1     * │              │
└──────────────┘         └──────────────┘
       │                        │
       │ 1                      │ *
       │ *                ┌─────▼──────┐
┌──────▼──────┐           │   Verse    │
│   UserNote  │───────────│            │
│             │ *       1 │            │
└─────────────┘           └────────────┘

┌──────────────┐         ┌──────────────┐
│  Aqeedah     │────────<│   Topic      │
│  Category    │ 1     * │              │
└──────────────┘         └──────────────┘

┌──────────────┐
│  Tajweed     │
│  Rule        │
└──────────────┘
```

---

## 📝 Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "fullTextIndex"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================================================
// CORE QURAN MODELS
// ============================================================================

/// Represents a Surah (Chapter) of the Quran
model Surah {
  id                      Int       @id @default(autoincrement())
  number                  Int       @unique // 1-114
  name                    String    // Arabic name: "الفاتحة"
  nameArabic              String    // Full Arabic: "سورة الفاتحة"
  nameTransliteration     String    // "Al-Fatihah"
  nameTranslation         String    // "The Opening"
  revelationType          RevelationType
  revelationOrder         Int       // Chronological order of revelation
  numberOfAyahs           Int       // Total verses in this Surah
  numberOfWords           Int       // Total words
  numberOfLetters         Int       // Total letters

  // Metadata
  bismillahPre            Boolean   @default(true) // Has Bismillah before?
  sajdahAyah              Int?      // Ayah number with Sajdah (if any)
  rukus                   Int?      // Number of Rukus

  // Relations
  verses                  Verse[]
  tafsirs                 Tafsir[]

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([number])
  @@map("surahs")
}

/// Represents a Verse (Ayah) of the Quran
model Verse {
  id                      Int       @id @default(autoincrement())

  // Identification
  surahId                 Int
  surah                   Surah     @relation(fields: [surahId], references: [id])
  verseNumber             Int       // Verse number within Surah (1-286)
  verseKey                String    @unique // "1:1", "2:255", etc.
  numberInQuran           Int       @unique // Global position (1-6236)

  // Arabic Text (Multiple Scripts)
  textUthmani             String    @db.Text // Uthmanic script
  textIndopak             String    @db.Text // Indo-Pak script
  textSimple              String    @db.Text // Simple text (no diacritics)
  textImlaei              String?   @db.Text // Imlaei script

  // Navigation
  juzNumber               Int       // 1-30
  hizbNumber              Int       // 1-60
  rubNumber               Int       // 1-240
  pageNumber              Int       // 1-604 (Mushaf Madina)

  // Special Markings
  sajdahType              SajdahType? // If sajdah verse
  manzilNumber            Int       // 1-7

  // Metadata
  wordCount               Int
  letterCount             Int

  // Relations
  translations            Translation[]
  tafsirs                 Tafsir[]
  words                   Word[]
  audioFiles              AudioFile[]
  bookmarks               Bookmark[]
  userNotes               UserNote[]
  tajweedRules            VersesTajweedRules[]

  // Full-text search
  searchVector            Unsupported("tsvector")?

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([surahId, verseNumber])
  @@index([surahId])
  @@index([verseNumber])
  @@index([juzNumber])
  @@index([pageNumber])
  @@index([numberInQuran])
  @@fulltext([textUthmani, textIndopak, textSimple])
  @@map("verses")
}

/// Word-by-word breakdown of verses
model Word {
  id                      Int       @id @default(autoincrement())

  // Verse relation
  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Word details
  position                Int       // Position in verse (1-based)
  arabic                  String    // Arabic word
  transliteration         String    // Latin transliteration

  // Translations
  translationEnglish      String
  translationUrdu         String?
  translationFrench       String?

  // Linguistic analysis
  root                    String?   // Arabic root letters
  lemma                   String?   // Dictionary form
  grammar                 String?   // Grammatical category (noun, verb, etc.)

  // Audio
  audioUrl                String?

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([verseId, position])
  @@index([verseId])
  @@map("words")
}

// ============================================================================
// TRANSLATION MODELS
// ============================================================================

/// Translations of Quranic verses
model Translation {
  id                      Int       @id @default(autoincrement())

  // Verse relation
  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Translation source
  translationId           String    // Unique identifier (e.g., "kanzul_iman_urdu")
  language                String    // ISO 639-1 code (en, ur, ar, fr)

  // Translation text
  text                    String    @db.Text

  // Footnotes
  footnotes               String?   @db.Text

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([verseId, translationId])
  @@index([verseId])
  @@index([translationId])
  @@index([language])
  @@fulltext([text])
  @@map("translations")
}

/// Translation sources metadata
model TranslationSource {
  id                      Int       @id @default(autoincrement())

  // Identifier
  translationId           String    @unique // "kanzul_iman_urdu"

  // Metadata
  name                    String    // "Kanzul Iman"
  author                  String    // "Imam Ahmed Raza Khan"
  language                String    // "urdu"
  languageDirection       Direction @default(RTL)

  // Description
  description             String?   @db.Text
  source                  String?   // Source URL or reference

  // Status
  isActive                Boolean   @default(true)
  isPremium               Boolean   @default(false)
  displayOrder            Int       @default(0)

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([language])
  @@map("translation_sources")
}

// ============================================================================
// TAFSIR MODELS
// ============================================================================

/// Tafsir (Exegesis) of Quranic verses
model Tafsir {
  id                      Int       @id @default(autoincrement())

  // Relations
  surahId                 Int
  surah                   Surah     @relation(fields: [surahId], references: [id])
  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Tafsir source
  tafsirId                String    // "siratul_jinan", "tafsir_ashrafi"
  language                String    // ISO 639-1

  // Content
  text                    String    @db.Text

  // Additional fields
  footnotes               String?   @db.Text
  references              String?   @db.Text // Related verses, hadiths

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([verseId, tafsirId])
  @@index([verseId])
  @@index([surahId])
  @@index([tafsirId])
  @@fulltext([text])
  @@map("tafsirs")
}

/// Tafsir sources metadata
model TafsirSource {
  id                      Int       @id @default(autoincrement())

  // Identifier
  tafsirId                String    @unique // "siratul_jinan"

  // Metadata
  name                    String    // "Siraat-ul-Jinan"
  author                  String    // "Mufti Muhammad Amjad Ali A'zami"
  language                String    // "urdu"
  languageDirection       Direction @default(RTL)

  // Description
  description             String?   @db.Text
  madhab                  Madhab    @default(SUNNI)
  school                  AqeedahSchool? // ASH_ARI, MATURIDI

  // Status
  isActive                Boolean   @default(true)
  isPremium               Boolean   @default(false)
  displayOrder            Int       @default(0)

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([language])
  @@map("tafsir_sources")
}

// ============================================================================
// AUDIO MODELS
// ============================================================================

/// Audio recitations
model AudioFile {
  id                      Int       @id @default(autoincrement())

  // Verse relation
  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Reciter (Qari)
  qariId                  String
  qari                    Qari      @relation(fields: [qariId], references: [qariId])

  // File details
  url                     String    // CDN URL
  format                  String    // mp3, ogg
  bitrate                 Int       // 64, 128, 192
  duration                Float     // in seconds
  fileSize                Int       // in bytes

  // Metadata
  segmentStart            Float?    // Start time in recitation
  segmentEnd              Float?    // End time in recitation

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([verseId, qariId])
  @@index([verseId])
  @@index([qariId])
  @@map("audio_files")
}

/// Qari (Reciter) information
model Qari {
  id                      Int       @id @default(autoincrement())

  // Identifier
  qariId                  String    @unique // "abdulbasit_murattal"

  // Personal info
  name                    String    // "Abdul Basit Abdul Samad"
  nameArabic              String?

  // Recitation style
  style                   RecitationStyle // MURATTAL, MUJAWWAD

  // Metadata
  country                 String?
  biography               String?   @db.Text

  // Media
  imageUrl                String?

  // Status
  isActive                Boolean   @default(true)
  displayOrder            Int       @default(0)

  // Relations
  audioFiles              AudioFile[]

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([qariId])
  @@map("qaris")
}

// ============================================================================
// TAJWEED MODELS
// ============================================================================

/// Tajweed rules
model TajweedRule {
  id                      Int       @id @default(autoincrement())

  // Rule identification
  code                    String    @unique // "ghunnah", "ikhfa", "qalqalah"
  name                    String    // "Ghunnah"
  nameArabic              String    // "الغنة"

  // Description
  description             String    @db.Text
  descriptionArabic       String?   @db.Text

  // Category
  category                TajweedCategory

  // Visual representation
  colorCode               String?   // Hex color for highlighting

  // Examples
  examples                String?   @db.Text

  // Media
  audioExampleUrl         String?
  videoExampleUrl         String?

  // Relations
  verses                  VersesTajweedRules[]

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([code])
  @@map("tajweed_rules")
}

/// Junction table for Tajweed rules in verses
model VersesTajweedRules {
  id                      Int       @id @default(autoincrement())

  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  tajweedRuleId           Int
  tajweedRule             TajweedRule @relation(fields: [tajweedRuleId], references: [id])

  // Position in verse
  startPosition           Int       // Character position
  endPosition             Int       // Character position

  createdAt               DateTime  @default(now())

  @@unique([verseId, tajweedRuleId, startPosition])
  @@index([verseId])
  @@map("verses_tajweed_rules")
}

// ============================================================================
// USER MODELS
// ============================================================================

/// User accounts
model User {
  id                      String    @id @default(cuid())

  // Authentication
  email                   String?   @unique
  emailVerified           DateTime?
  hashedPassword          String?

  // Profile
  name                    String?
  image                   String?

  // Preferences
  preferences             UserPreferences?

  // Relations
  accounts                Account[]
  sessions                Session[]
  bookmarks               Bookmark[]
  notes                   UserNote[]
  readingHistory          ReadingHistory[]

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([email])
  @@map("users")
}

/// User preferences
model UserPreferences {
  id                      Int       @id @default(autoincrement())

  userId                  String    @unique
  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Display preferences
  theme                   Theme     @default(LIGHT)
  fontSize                Int       @default(18)
  arabicFont              ArabicFont @default(UTHMANI)
  showTransliteration     Boolean   @default(false)

  // Reading preferences
  readingMode             ReadingMode @default(MUSHAF)
  defaultTranslations     String[]  // Array of translation IDs
  defaultTafsir           String?   // Tafsir ID

  // Audio preferences
  defaultQari             String?   // Qari ID
  autoPlayAudio           Boolean   @default(false)
  playbackSpeed           Float     @default(1.0)

  // Tajweed
  showTajweed             Boolean   @default(false)

  // Notifications
  enableNotifications     Boolean   @default(true)
  prayerTimeReminders     Boolean   @default(false)
  dailyVerseReminder      Boolean   @default(false)

  // Location (for prayer times)
  latitude                Float?
  longitude               Float?
  timezone                String?

  updatedAt               DateTime  @updatedAt

  @@map("user_preferences")
}

/// User bookmarks
model Bookmark {
  id                      Int       @id @default(autoincrement())

  userId                  String
  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Optional note
  note                    String?   @db.Text

  // Tags
  tags                    String[]

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@unique([userId, verseId])
  @@index([userId])
  @@index([verseId])
  @@map("bookmarks")
}

/// User notes on verses
model UserNote {
  id                      Int       @id @default(autoincrement())

  userId                  String
  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  verseId                 Int
  verse                   Verse     @relation(fields: [verseId], references: [id], onDelete: Cascade)

  // Note content
  title                   String?
  content                 String    @db.Text

  // Tags and categories
  tags                    String[]
  isPrivate               Boolean   @default(true)

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([userId])
  @@index([verseId])
  @@map("user_notes")
}

/// Reading history tracking
model ReadingHistory {
  id                      Int       @id @default(autoincrement())

  userId                  String
  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Last read position
  lastSurahNumber         Int
  lastVerseNumber         Int
  lastReadAt              DateTime  @default(now())

  // Statistics
  totalVersesRead         Int       @default(0)
  totalTimeSpent          Int       @default(0) // in seconds

  updatedAt               DateTime  @updatedAt

  @@unique([userId])
  @@index([userId])
  @@map("reading_history")
}

// ============================================================================
// AQEEDAH (CREED) MODELS
// ============================================================================

/// Aqeedah categories
model AqeedahCategory {
  id                      Int       @id @default(autoincrement())

  // Category info
  slug                    String    @unique
  name                    String    // "Tawheed", "Prophethood"
  nameArabic              String
  nameUrdu                String?

  // Description
  description             String    @db.Text

  // School of thought
  school                  AqeedahSchool // ASH_ARI, MATURIDI

  // Hierarchy
  parentId                Int?
  parent                  AqeedahCategory? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children                AqeedahCategory[] @relation("CategoryHierarchy")

  // Relations
  topics                  AqeedahTopic[]

  // Display
  displayOrder            Int       @default(0)
  iconName                String?

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([slug])
  @@map("aqeedah_categories")
}

/// Aqeedah topics/articles
model AqeedahTopic {
  id                      Int       @id @default(autoincrement())

  // Topic info
  slug                    String    @unique
  title                   String
  titleArabic             String?
  titleUrdu               String?

  // Category
  categoryId              Int
  category                AqeedahCategory @relation(fields: [categoryId], references: [id])

  // Content
  content                 String    @db.Text
  contentArabic           String?   @db.Text
  contentUrdu             String?   @db.Text

  // References
  quranReferences         String[]  // Array of verse keys
  hadithReferences        String[]
  scholarReferences       String[]

  // Metadata
  author                  String?
  reviewedBy              String?

  // Status
  isPublished             Boolean   @default(false)
  publishedAt             DateTime?

  // SEO
  metaDescription         String?

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([slug])
  @@index([categoryId])
  @@fulltext([title, content])
  @@map("aqeedah_topics")
}

// ============================================================================
// THEMATIC SEARCH MODELS
// ============================================================================

/// Thematic categories for semantic search
model Theme {
  id                      Int       @id @default(autoincrement())

  // Theme info
  slug                    String    @unique
  name                    String    // "Rights of Parents"
  nameArabic              String
  nameUrdu                String?

  // Description
  description             String?   @db.Text

  // Relations
  verses                  ThemeVerse[]

  // Hierarchy
  parentId                Int?
  parent                  Theme?    @relation("ThemeHierarchy", fields: [parentId], references: [id])
  children                Theme[]   @relation("ThemeHierarchy")

  // Display
  displayOrder            Int       @default(0)
  iconName                String?

  createdAt               DateTime  @default(now())
  updatedAt               DateTime  @updatedAt

  @@index([slug])
  @@map("themes")
}

/// Junction table for themes and verses
model ThemeVerse {
  id                      Int       @id @default(autoincrement())

  themeId                 Int
  theme                   Theme     @relation(fields: [themeId], references: [id], onDelete: Cascade)

  verseId                 Int

  // Relevance score
  relevanceScore          Float     @default(1.0)

  // Context
  contextNote             String?   @db.Text

  createdAt               DateTime  @default(now())

  @@unique([themeId, verseId])
  @@index([themeId])
  @@map("theme_verses")
}

// ============================================================================
// NEXTAUTH MODELS
// ============================================================================

model Account {
  id                      String    @id @default(cuid())
  userId                  String
  type                    String
  provider                String
  providerAccountId       String
  refresh_token           String?   @db.Text
  access_token            String?   @db.Text
  expires_at              Int?
  token_type              String?
  scope                   String?
  id_token                String?   @db.Text
  session_state           String?

  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id                      String    @id @default(cuid())
  sessionToken            String    @unique
  userId                  String
  expires                 DateTime
  user                    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model VerificationToken {
  identifier              String
  token                   String    @unique
  expires                 DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ============================================================================
// ENUMS
// ============================================================================

enum RevelationType {
  MECCAN
  MEDINAN
}

enum SajdahType {
  OBLIGATORY  // Wajib
  RECOMMENDED // Mustahab
}

enum Direction {
  LTR
  RTL
}

enum Madhab {
  SUNNI
  SHIA
  OTHER
}

enum AqeedahSchool {
  ASH_ARI
  MATURIDI
  ATHARI
}

enum RecitationStyle {
  MURATTAL    // Slow, clear
  MUJAWWAD    // Melodic
  MUALLIM     // Educational
}

enum TajweedCategory {
  NOON_RULES        // Noon Sakinah rules
  MEEM_RULES        // Meem Sakinah rules
  QALQALAH          // Bouncing sound
  MADD              // Elongation
  STOPPING          // Waqf rules
  LAAM_RULES        // Laam rules
  RAA_RULES         // Ra rules
  OTHER
}

enum Theme {
  LIGHT
  DARK
  AUTO
}

enum ArabicFont {
  UTHMANI
  INDOPAK
  IMLAEI
}

enum ReadingMode {
  MUSHAF          // Page-by-page like physical Quran
  TRANSLATION     // Verse-by-verse with translation
  SPLIT           // Split view (Arabic + Translation)
  CONTINUOUS      // Continuous scrolling
}
```

---

## 📊 Database Indexes Strategy

### Primary Indexes (Created Automatically)

- All `@id` fields have automatic indexes
- All `@unique` fields have automatic indexes

### Performance Indexes

```sql
-- Verse lookup optimization
CREATE INDEX idx_verses_surah_verse ON verses(surah_id, verse_number);
CREATE INDEX idx_verses_page ON verses(page_number);
CREATE INDEX idx_verses_juz ON verses(juz_number);

-- Translation lookup
CREATE INDEX idx_translations_lang ON translations(language);
CREATE INDEX idx_translations_source ON translations(translation_id);

-- Full-text search
CREATE INDEX idx_verses_fts ON verses USING GIN(to_tsvector('arabic', text_uthmani));
CREATE INDEX idx_translations_fts ON translations USING GIN(to_tsvector('english', text));

-- User queries
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id, created_at DESC);
CREATE INDEX idx_user_notes_user ON user_notes(user_id, created_at DESC);

-- Audio files
CREATE INDEX idx_audio_verse_qari ON audio_files(verse_id, qari_id);
```

---

## 🔄 Sample Data Migration Scripts

### Insert Surahs

```typescript
// seed-surahs.ts
const surahs = [
  {
    number: 1,
    name: "الفاتحة",
    nameArabic: "سورة الفاتحة",
    nameTransliteration: "Al-Fatihah",
    nameTranslation: "The Opening",
    revelationType: "MECCAN",
    revelationOrder: 5,
    numberOfAyahs: 7,
    numberOfWords: 29,
    numberOfLetters: 139,
    bismillahPre: true,
  },
  // ... more surahs
];

await prisma.surah.createMany({ data: surahs });
```

### Insert Verses

```typescript
// seed-verses.ts
const verses = [
  {
    surahId: 1,
    verseNumber: 1,
    verseKey: "1:1",
    numberInQuran: 1,
    textUthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    textIndopak: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    textSimple: "بسم الله الرحمن الرحيم",
    juzNumber: 1,
    hizbNumber: 1,
    rubNumber: 1,
    pageNumber: 1,
    wordCount: 4,
    letterCount: 19,
  },
  // ... more verses
];

await prisma.verse.createMany({ data: verses });
```

### Insert Translations

```typescript
// seed-translations.ts
const translations = [
  {
    verseId: 1,
    translationId: "kanzul_iman_urdu",
    language: "ur",
    text: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
  },
  {
    verseId: 1,
    translationId: "sahih_international",
    language: "en",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  },
  // ... more translations
];

await prisma.translation.createMany({ data: translations });
```

---

## 🔍 Query Examples

### Get Surah with Verses

```typescript
const surah = await prisma.surah.findUnique({
  where: { number: 1 },
  include: {
    verses: {
      include: {
        translations: {
          where: {
            translationId: "kanzul_iman_urdu",
          },
        },
      },
    },
  },
});
```

### Search Verses by Keyword

```typescript
const results = await prisma.$queryRaw`
  SELECT v.*, ts_rank(search_vector, query) AS rank
  FROM verses v, plainto_tsquery('arabic', ${keyword}) query
  WHERE search_vector @@ query
  ORDER BY rank DESC
  LIMIT 20
`;
```

### Get User's Bookmarks

```typescript
const bookmarks = await prisma.bookmark.findMany({
  where: { userId },
  include: {
    verse: {
      include: {
        surah: true,
        translations: {
          where: {
            translationId: { in: userPreferredTranslations },
          },
        },
      },
    },
  },
  orderBy: { createdAt: "desc" },
});
```

### Get Verses by Theme

```typescript
const themeVerses = await prisma.theme.findUnique({
  where: { slug: "rights-of-parents" },
  include: {
    verses: {
      include: {
        verse: {
          include: {
            translations: true,
          },
        },
      },
      orderBy: {
        relevanceScore: "desc",
      },
    },
  },
});
```

---

## 📈 Database Size Estimates

| Table        | Rows             | Size (Approx)                |
| ------------ | ---------------- | ---------------------------- |
| Surahs       | 114              | < 1 MB                       |
| Verses       | 6,236            | 5-10 MB                      |
| Words        | ~78,000          | 20-30 MB                     |
| Translations | 37,416 (6 langs) | 50-100 MB                    |
| Tafsirs      | 6,236+           | 500+ MB                      |
| Audio Files  | 37,416 (6 qaris) | Metadata only (audio on CDN) |
| Users        | Variable         | 1 KB per user                |
| Bookmarks    | Variable         | 100 bytes per bookmark       |

**Total Database Size**: ~1-2 GB (without audio files)

---

## 🔒 Security Considerations

### Row-Level Security (RLS)

```sql
-- Example: Users can only see their own data
CREATE POLICY user_bookmarks ON bookmarks
  FOR ALL
  USING (user_id = current_user_id());
```

### Data Encryption

- Sensitive user data encrypted at rest
- Connection encrypted with SSL/TLS
- API keys stored in environment variables

### Backup Strategy

- Daily automated backups (30-day retention)
- Point-in-time recovery enabled
- Backup stored in separate region

---

## 🎯 Performance Optimization

### Connection Pooling

```typescript
// PgBouncer configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["query", "error", "warn"],
});
```

### Query Optimization

- Use `select` to fetch only needed fields
- Implement cursor-based pagination for large datasets
- Use database views for complex joins
- Cache frequently accessed data in Redis

### Materialized Views (for complex queries)

```sql
-- Example: Aggregated verse statistics
CREATE MATERIALIZED VIEW verse_statistics AS
SELECT
  s.id,
  s.name,
  COUNT(v.id) as verse_count,
  SUM(v.word_count) as total_words
FROM surahs s
LEFT JOIN verses v ON s.id = v.surah_id
GROUP BY s.id;

-- Refresh periodically
REFRESH MATERIALIZED VIEW verse_statistics;
```

---

This comprehensive database schema ensures data integrity, performance, and scalability for the Quranic Web Application while maintaining the sanctity and authenticity of the Islamic content.
