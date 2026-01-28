# API Documentation - Quranic Web Application

## 🔌 API Overview

This document provides comprehensive API documentation for the Quranic Web Application, including RESTful endpoints, request/response formats, and authentication.

**Base URL**: `https://api.quran.example.com` or `/api` for Next.js routes

---

## 🔐 Authentication

### Auth Endpoints

#### POST /api/auth/signin

Sign in with email or OAuth provider.

**Request Body**:

```json
{
  "email": "user@example.com",
  "provider": "google" // optional: google, facebook
}
```

**Response**:

```json
{
  "success": true,
  "session": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "image": "https://..."
    },
    "expires": "2026-02-28T12:00:00Z"
  }
}
```

---

## 📖 Quran Endpoints

### GET /api/quran/surahs

Retrieve list of all Surahs.

**Query Parameters**: None

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number": 1,
      "name": "الفاتحة",
      "nameTransliteration": "Al-Fatihah",
      "nameTranslation": "The Opening",
      "revelationType": "Meccan",
      "numberOfAyahs": 7,
      "numberOfWords": 29
    }
  ],
  "total": 114
}
```

---

### GET /api/quran/surah/:number

Get specific Surah details with all verses.

**Path Parameters**:

- `number` (integer): Surah number (1-114)

**Query Parameters**:

- `translations` (string, optional): Comma-separated translation IDs
  - Example: `kanzul_iman_urdu,sahih_international`
- `tafsir` (string, optional): Tafsir ID
- `audio` (string, optional): Qari ID for audio URLs

**Example Request**:

```
GET /api/quran/surah/1?translations=kanzul_iman_urdu,sahih_international&audio=abdulbasit
```

**Response**:

```json
{
  "success": true,
  "data": {
    "surah": {
      "id": 1,
      "number": 1,
      "name": "الفاتحة",
      "nameTransliteration": "Al-Fatihah",
      "nameTranslation": "The Opening",
      "revelationType": "Meccan",
      "numberOfAyahs": 7
    },
    "verses": [
      {
        "id": 1,
        "verseNumber": 1,
        "verseKey": "1:1",
        "numberInQuran": 1,
        "textUthmani": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        "textIndopak": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
        "juzNumber": 1,
        "pageNumber": 1,
        "sajdah": null,
        "translations": [
          {
            "translationId": "kanzul_iman_urdu",
            "language": "ur",
            "name": "Kanzul Iman",
            "text": "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے"
          },
          {
            "translationId": "sahih_international",
            "language": "en",
            "name": "Sahih International",
            "text": "In the name of Allah, the Entirely Merciful, the Especially Merciful."
          }
        ],
        "audio": {
          "url": "https://cdn.example.com/audio/abdulbasit/001001.mp3",
          "duration": 5.2
        }
      }
    ]
  }
}
```

---

### GET /api/quran/verses

Get verses by range or filter.

**Query Parameters**:

- `surah` (integer, required): Surah number
- `from` (integer, optional): Starting verse number (default: 1)
- `to` (integer, optional): Ending verse number (default: last verse)
- `page` (integer, optional): Mushaf page number
- `juz` (integer, optional): Juz number (1-30)
- `translations` (string, optional): Comma-separated translation IDs
- `limit` (integer, optional): Results per page (default: 20, max: 100)
- `offset` (integer, optional): Pagination offset

**Example Request**:

```
GET /api/quran/verses?surah=2&from=255&to=255&translations=kanzul_iman_urdu
```

**Response**:

```json
{
  "success": true,
  "data": {
    "verses": [
      {
        "id": 255,
        "surahNumber": 2,
        "verseNumber": 255,
        "verseKey": "2:255",
        "textUthmani": "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ...",
        "translations": [...]
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

---

### GET /api/quran/verse/:verseKey

Get a single verse by verse key.

**Path Parameters**:

- `verseKey` (string): Verse key in format "surah:ayah" (e.g., "2:255")

**Query Parameters**: Same as /api/quran/verses

**Response**: Single verse object

---

### GET /api/quran/page/:pageNumber

Get all verses on a specific Mushaf page.

**Path Parameters**:

- `pageNumber` (integer): Page number (1-604)

**Query Parameters**: Same as /api/quran/verses

**Response**:

```json
{
  "success": true,
  "data": {
    "pageNumber": 1,
    "verses": [...],
    "surahsOnPage": [
      { "number": 1, "name": "الفاتحة" }
    ]
  }
}
```

---

### GET /api/quran/juz/:juzNumber

Get all verses in a Juz.

**Path Parameters**:

- `juzNumber` (integer): Juz number (1-30)

**Query Parameters**: Same as /api/quran/verses

**Response**: Similar to page endpoint

---

### GET /api/quran/random

Get a random verse.

**Query Parameters**:

- `translations` (string, optional): Translation IDs
- `exclude` (string, optional): Comma-separated verse keys to exclude

**Response**: Single verse object

---

## 📝 Translation Endpoints

### GET /api/translations

Get list of available translations.

**Query Parameters**:

- `language` (string, optional): Filter by language code (en, ur, ar, fr)
- `active` (boolean, optional): Filter by active status

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "translationId": "kanzul_iman_urdu",
      "name": "Kanzul Iman",
      "author": "Imam Ahmed Raza Khan",
      "language": "urdu",
      "languageDirection": "RTL",
      "description": "Authentic Sunni translation...",
      "isActive": true
    }
  ]
}
```

---

### GET /api/translations/:translationId/verse/:verseKey

Get translation for a specific verse.

**Response**:

```json
{
  "success": true,
  "data": {
    "verse": {...},
    "translation": {
      "translationId": "kanzul_iman_urdu",
      "text": "...",
      "footnotes": "..."
    }
  }
}
```

---

## 📚 Tafsir Endpoints

### GET /api/tafsir/sources

Get list of available Tafsir sources.

**Query Parameters**:

- `language` (string, optional): Filter by language
- `madhab` (string, optional): Filter by madhab (SUNNI)
- `school` (string, optional): Filter by aqeedah school (ASH_ARI, MATURIDI)

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "tafsirId": "siratul_jinan",
      "name": "Siraat-ul-Jinan",
      "author": "Mufti Muhammad Amjad Ali A'zami",
      "language": "urdu",
      "madhab": "SUNNI",
      "school": "ASH_ARI",
      "description": "...",
      "isActive": true
    }
  ]
}
```

---

### GET /api/tafsir/:tafsirId/verse/:verseKey

Get Tafsir for a specific verse.

**Path Parameters**:

- `tafsirId` (string): Tafsir source ID
- `verseKey` (string): Verse key (e.g., "2:255")

**Response**:

```json
{
  "success": true,
  "data": {
    "verse": {...},
    "tafsir": {
      "tafsirId": "siratul_jinan",
      "text": "تفسیر کا متن یہاں ہے...",
      "footnotes": "...",
      "references": {
        "quranVerses": ["3:19", "5:3"],
        "hadiths": ["Bukhari 1"],
        "scholars": ["Imam Ghazali"]
      }
    },
    "relatedVerses": [...]
  }
}
```

---

## 🔤 Word-by-Word Endpoints

### GET /api/quran/word-by-word/:verseKey

Get word-by-word breakdown of a verse.

**Path Parameters**:

- `verseKey` (string): Verse key

**Query Parameters**:

- `languages` (string, optional): Comma-separated language codes for translations

**Response**:

```json
{
  "success": true,
  "data": {
    "verse": {...},
    "words": [
      {
        "position": 1,
        "arabic": "بِسْمِ",
        "transliteration": "bismi",
        "translation": {
          "en": "In the name",
          "ur": "نام کے ساتھ"
        },
        "root": "س م و",
        "grammar": "preposition + noun",
        "audioUrl": "https://cdn.example.com/words/001001001.mp3"
      }
    ]
  }
}
```

---

## 🔍 Search Endpoints

### POST /api/quran/search

Search Quran verses.

**Request Body**:

```json
{
  "query": "parents",
  "type": "semantic", // or "keyword", "exact"
  "language": "en",
  "translations": ["kanzul_iman_urdu"],
  "filters": {
    "surahs": [2, 17],
    "juzs": [1, 2],
    "revelationType": "Medinan"
  },
  "page": 1,
  "limit": 20
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "verse": {...},
        "relevanceScore": 0.95,
        "matchedIn": "translation", // or "arabic", "both"
        "highlightedText": "...be kind to <mark>parents</mark>...",
        "context": {
          "before": [...],
          "after": [...]
        }
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    },
    "queryTime": 0.045 // in seconds
  }
}
```

---

### GET /api/quran/topics

Get thematic categories.

**Query Parameters**:

- `category` (string, optional): Filter by category slug
- `language` (string, optional): Language for names

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "parents",
      "slug": "rights-of-parents",
      "name": "Rights of Parents",
      "nameArabic": "حقوق الوالدين",
      "nameUrdu": "والدین کے حقوق",
      "description": "...",
      "verseCount": 8,
      "relatedTopics": ["kindness", "family"]
    }
  ]
}
```

---

### GET /api/quran/topics/:slug/verses

Get verses for a specific topic.

**Path Parameters**:

- `slug` (string): Topic slug

**Query Parameters**: Similar to verse endpoints

**Response**:

```json
{
  "success": true,
  "data": {
    "topic": {...},
    "verses": [
      {
        "verse": {...},
        "relevanceScore": 0.98,
        "contextNote": "Direct command for kindness"
      }
    ]
  }
}
```

---

## 🎵 Audio Endpoints

### GET /api/audio/qaris

Get list of available Qaris.

**Query Parameters**:

- `style` (string, optional): Filter by recitation style (MURATTAL, MUJAWWAD)
- `active` (boolean, optional): Filter by active status

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "qariId": "abdulbasit_murattal",
      "name": "Abdul Basit Abdul Samad",
      "nameArabic": "عبد الباسط عبد الصمد",
      "style": "MURATTAL",
      "country": "Egypt",
      "biography": "...",
      "imageUrl": "https://...",
      "isActive": true
    }
  ]
}
```

---

### GET /api/audio/:qariId/surah/:surahNumber

Get audio URL for entire Surah.

**Path Parameters**:

- `qariId` (string): Qari identifier
- `surahNumber` (integer): Surah number

**Query Parameters**:

- `bitrate` (integer, optional): Audio quality (64, 128, 192)

**Response**:

```json
{
  "success": true,
  "data": {
    "qari": {...},
    "surah": {...},
    "audio": {
      "url": "https://cdn.example.com/audio/abdulbasit/001.mp3",
      "format": "mp3",
      "bitrate": 128,
      "duration": 125.5,
      "fileSize": 2048000
    },
    "timestamps": [
      {
        "verseNumber": 1,
        "startTime": 0.0,
        "endTime": 5.2
      }
    ]
  }
}
```

---

### GET /api/audio/:qariId/verse/:verseKey

Get audio URL for specific verse.

**Response**:

```json
{
  "success": true,
  "data": {
    "verse": {...},
    "audio": {
      "url": "https://cdn.example.com/audio/abdulbasit/002255.mp3",
      "duration": 143.8,
      "format": "mp3"
    }
  }
}
```

---

## 📘 Tajweed Endpoints

### GET /api/tajweed/rules

Get list of Tajweed rules.

**Query Parameters**:

- `category` (string, optional): Filter by category
- `language` (string, optional): Language for descriptions

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "ghunnah",
      "code": "ghunnah",
      "name": "Ghunnah",
      "nameArabic": "الغنة",
      "description": "Nasal sound for 2 counts...",
      "category": "NOON_RULES",
      "colorCode": "#AADAFF",
      "examples": ["من", "عن"],
      "audioExampleUrl": "https://...",
      "videoExampleUrl": "https://..."
    }
  ]
}
```

---

### GET /api/tajweed/verse/:verseKey

Get Tajweed rules applied to a verse.

**Response**:

```json
{
  "success": true,
  "data": {
    "verse": {...},
    "tajweedMarkers": [
      {
        "rule": {
          "code": "ikhfa",
          "name": "Ikhfa",
          "colorCode": "#FFAAAA"
        },
        "startPosition": 10,
        "endPosition": 15,
        "affectedText": "من ك"
      }
    ]
  }
}
```

---

## 🕌 Islamic Tools Endpoints

### GET /api/tools/prayer-times

Calculate prayer times for a location.

**Query Parameters**:

- `lat` (float, required): Latitude
- `lng` (float, required): Longitude
- `date` (string, optional): Date in YYYY-MM-DD format (default: today)
- `method` (string, optional): Calculation method
  - `ISNA` (Islamic Society of North America)
  - `MWL` (Muslim World League)
  - `EGYPT` (Egyptian General Authority)
  - `KARACHI` (University of Islamic Sciences, Karachi)
  - `JAFARI` (Shia Ithna-Ashari)
- `school` (string, optional): Madhab for Asr (HANAFI, SHAFI)

**Example Request**:

```
GET /api/tools/prayer-times?lat=40.7128&lng=-74.0060&method=ISNA&school=HANAFI
```

**Response**:

```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": 40.7128,
      "longitude": -74.006,
      "city": "New York",
      "country": "USA",
      "timezone": "America/New_York"
    },
    "date": "2026-01-28",
    "method": "ISNA",
    "times": {
      "fajr": "05:45",
      "sunrise": "07:15",
      "dhuhr": "12:20",
      "asr": "15:10",
      "maghrib": "17:25",
      "isha": "18:50",
      "midnight": "00:20",
      "lastThird": "02:47"
    },
    "nextPrayer": {
      "name": "Maghrib",
      "time": "17:25",
      "remainingMinutes": 125
    }
  }
}
```

---

### GET /api/tools/qibla

Calculate Qibla direction.

**Query Parameters**:

- `lat` (float, required): Latitude
- `lng` (float, required): Longitude

**Response**:

```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": 40.7128,
      "longitude": -74.006
    },
    "qibla": {
      "direction": 58.48, // degrees from North
      "distance": 11058.5 // km to Kaaba
    },
    "kaaba": {
      "latitude": 21.4225,
      "longitude": 39.8262
    }
  }
}
```

---

### GET /api/tools/hijri-calendar

Get Hijri date for Gregorian date.

**Query Parameters**:

- `date` (string, optional): Gregorian date (YYYY-MM-DD), default: today

**Response**:

```json
{
  "success": true,
  "data": {
    "gregorian": {
      "date": "2026-01-28",
      "year": 2026,
      "month": 1,
      "day": 28
    },
    "hijri": {
      "date": "1447-07-09",
      "year": 1447,
      "month": {
        "number": 7,
        "name": "Rajab",
        "nameArabic": "رَجَب"
      },
      "day": 9,
      "weekday": {
        "name": "Wednesday",
        "nameArabic": "الأربعاء"
      }
    },
    "islamicEvents": ["Isra and Mi'raj (27th Rajab)"]
  }
}
```

---

## 👤 User Endpoints (Authenticated)

### GET /api/user/profile

Get current user profile.

**Headers**: `Authorization: Bearer <token>`

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "image": "https://...",
    "createdAt": "2026-01-01T00:00:00Z"
  }
}
```

---

### GET /api/user/preferences

Get user preferences.

**Response**:

```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "fontSize": 18,
    "arabicFont": "uthmani",
    "readingMode": "split",
    "defaultTranslations": ["kanzul_iman_urdu", "sahih_international"],
    "defaultTafsir": "siratul_jinan",
    "defaultQari": "abdulbasit",
    "showTajweed": true,
    "enableNotifications": true
  }
}
```

---

### PATCH /api/user/preferences

Update user preferences.

**Request Body**:

```json
{
  "theme": "light",
  "fontSize": 20,
  "defaultTranslations": ["kanzul_iman_urdu"]
}
```

**Response**: Updated preferences object

---

### GET /api/user/bookmarks

Get user's bookmarks.

**Query Parameters**:

- `page` (integer, optional): Page number
- `limit` (integer, optional): Results per page
- `tags` (string, optional): Filter by tags

**Response**:

```json
{
  "success": true,
  "data": {
    "bookmarks": [
      {
        "id": 123,
        "verse": {...},
        "note": "Important verse about prayer",
        "tags": ["prayer", "important"],
        "createdAt": "2026-01-25T10:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

---

### POST /api/user/bookmarks

Create a bookmark.

**Request Body**:

```json
{
  "verseKey": "2:255",
  "note": "Ayatul Kursi - for protection",
  "tags": ["protection", "memorization"]
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": 124,
    "verseKey": "2:255",
    "createdAt": "2026-01-28T12:00:00Z"
  }
}
```

---

### DELETE /api/user/bookmarks/:id

Delete a bookmark.

**Response**:

```json
{
  "success": true,
  "message": "Bookmark deleted successfully"
}
```

---

### GET /api/user/notes

Get user's notes on verses.

**Response**: Similar to bookmarks

---

### POST /api/user/notes

Create a note.

**Request Body**:

```json
{
  "verseKey": "2:255",
  "title": "Ayatul Kursi Study",
  "content": "This verse describes the majesty of Allah...",
  "tags": ["study", "notes"],
  "isPrivate": true
}
```

---

### GET /api/user/reading-history

Get reading history.

**Response**:

```json
{
  "success": true,
  "data": {
    "lastRead": {
      "surahNumber": 2,
      "verseNumber": 100,
      "timestamp": "2026-01-28T11:30:00Z"
    },
    "statistics": {
      "totalVersesRead": 1523,
      "totalTimeSpent": 45600, // seconds
      "currentStreak": 7, // days
      "longestStreak": 30
    },
    "recentSurahs": [
      {
        "surahNumber": 2,
        "lastRead": "2026-01-28T11:30:00Z"
      }
    ]
  }
}
```

---

### POST /api/user/reading-history

Update reading position.

**Request Body**:

```json
{
  "surahNumber": 2,
  "verseNumber": 150
}
```

---

## 🕋 Aqeedah Endpoints

### GET /api/aqeedah/categories

Get Aqeedah categories.

**Query Parameters**:

- `school` (string, optional): Filter by school (ASH_ARI, MATURIDI)
- `language` (string, optional): Language preference

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "tawheed",
      "slug": "tawheed",
      "name": "Tawheed (Oneness of Allah)",
      "nameArabic": "التوحيد",
      "nameUrdu": "توحید",
      "description": "...",
      "school": "ASH_ARI",
      "topicCount": 15,
      "children": [
        {
          "slug": "attributes-of-allah",
          "name": "Attributes of Allah"
        }
      ]
    }
  ]
}
```

---

### GET /api/aqeedah/topics/:slug

Get specific Aqeedah topic.

**Response**:

```json
{
  "success": true,
  "data": {
    "slug": "tawheed",
    "title": "Tawheed - The Oneness of Allah",
    "content": "<markdown or HTML content>",
    "quranReferences": [
      {
        "verseKey": "112:1",
        "verse": {...},
        "context": "Say, He is Allah, [who is] One"
      }
    ],
    "hadithReferences": [
      "Sahih Bukhari 7372"
    ],
    "scholarReferences": [
      "Imam Abu Hanifa - Al-Fiqh Al-Akbar",
      "Imam Al-Ash'ari - Al-Ibanah"
    ],
    "relatedTopics": [
      {
        "slug": "attributes-of-allah",
        "title": "Attributes of Allah"
      }
    ]
  }
}
```

---

## ⚠️ Error Responses

All API endpoints follow a consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "VERSE_NOT_FOUND",
    "message": "The requested verse was not found",
    "details": {
      "verseKey": "999:1"
    }
  },
  "timestamp": "2026-01-28T12:00:00Z"
}
```

### Common Error Codes

| Code                  | HTTP Status | Description                     |
| --------------------- | ----------- | ------------------------------- |
| `INVALID_REQUEST`     | 400         | Invalid request parameters      |
| `UNAUTHORIZED`        | 401         | Authentication required         |
| `FORBIDDEN`           | 403         | Access denied                   |
| `NOT_FOUND`           | 404         | Resource not found              |
| `RATE_LIMIT_EXCEEDED` | 429         | Too many requests               |
| `SERVER_ERROR`        | 500         | Internal server error           |
| `SERVICE_UNAVAILABLE` | 503         | Service temporarily unavailable |

---

## 🚦 Rate Limiting

### Limits by User Type

| User Type     | Requests per Minute | Requests per Hour |
| ------------- | ------------------- | ----------------- |
| Guest         | 60                  | 1,000             |
| Authenticated | 120                 | 5,000             |
| Premium       | 300                 | 15,000            |

### Rate Limit Headers

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 115
X-RateLimit-Reset: 1643371200
```

---

## 📊 Pagination

Standard pagination format for list endpoints:

**Query Parameters**:

- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)

**Response Format**:

```json
{
  "data": [...],
  "pagination": {
    "total": 250,
    "page": 1,
    "limit": 20,
    "totalPages": 13,
    "hasMore": true
  }
}
```

---

## 🔄 Caching Headers

Endpoints include appropriate caching headers:

```
Cache-Control: public, max-age=86400
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 28 Jan 2026 12:00:00 GMT
```

- **Quran text**: Long-term cache (1 year)
- **Translations/Tafsir**: Daily refresh
- **User data**: No cache
- **Audio URLs**: 1 hour cache

---

## 📱 WebSocket API (Future)

### Real-time Features

**Connection**: `wss://api.quran.example.com/ws`

**Events**:

- `verse:highlight` - Synchronized audio playback
- `group:join` - Join study group
- `group:message` - Group chat message
- `reading:sync` - Sync reading position across devices

---

## 🔌 API SDKs

### JavaScript/TypeScript

```typescript
import { QuranAPI } from "@quran/sdk";

const api = new QuranAPI({
  apiKey: "your-api-key",
  baseURL: "https://api.quran.example.com",
});

// Get verse
const verse = await api.getVerse("2:255", {
  translations: ["kanzul_iman_urdu"],
  audio: "abdulbasit",
});

// Search
const results = await api.search({
  query: "parents",
  type: "semantic",
});
```

### Python

```python
from quran_sdk import QuranAPI

api = QuranAPI(api_key='your-api-key')

# Get Surah
surah = api.get_surah(1, translations=['kanzul_iman_urdu'])

# Get prayer times
times = api.get_prayer_times(lat=40.7128, lng=-74.0060)
```

---

## 📝 Best Practices

1. **Use appropriate translations**: Always include Sunni-authenticated translations
2. **Respect rate limits**: Implement exponential backoff
3. **Cache responses**: Cache static content locally
4. **Handle errors gracefully**: Implement proper error handling
5. **Secure API keys**: Never expose keys in client-side code
6. **Use pagination**: For large datasets
7. **Include user context**: Send user preferences for personalized responses

---

## 🔗 Related Documentation

- [System Architecture](./SYSTEM_ARCHITECTURE.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Authentication Guide](./AUTH_GUIDE.md)
- [Rate Limiting Policy](./RATE_LIMITING.md)

---

**API Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**Support**: api-support@quran.example.com
