# UI/UX Design System - Quranic Web Application

## 🎨 Design Philosophy

The design system for this Quranic Web Application embodies **spirituality, simplicity, and accessibility**, creating a serene and focused reading experience that honors the sanctity of the Holy Quran.

### Core Principles

1. **Simplicity**: Clean, uncluttered interfaces that don't distract from the Quran
2. **Reverence**: Respectful treatment of Islamic content
3. **Accessibility**: WCAG 2.1 AA compliant for all users
4. **Responsiveness**: Seamless experience across all devices
5. **Performance**: Fast, lightweight, and optimized
6. **Authenticity**: Adhering to Sunni Islamic aesthetics and values

---

## 🎭 Brand Identity

### Color Palette

#### Primary Colors

```css
:root {
  /* Islamic Green - Primary brand color */
  --color-primary-50: #e8f5e9;
  --color-primary-100: #c8e6c9;
  --color-primary-200: #a5d6a7;
  --color-primary-300: #81c784;
  --color-primary-400: #66bb6a;
  --color-primary-500: #0d7c66; /* Main */
  --color-primary-600: #0a6b56;
  --color-primary-700: #085a47;
  --color-primary-800: #054a39;
  --color-primary-900: #03392b;

  /* Gold - Accent for emphasis */
  --color-accent-50: #fff8e1;
  --color-accent-100: #ffecb3;
  --color-accent-200: #ffe082;
  --color-accent-300: #ffd54f;
  --color-accent-400: #ffca28;
  --color-accent-500: #d4af37; /* Main Gold */
  --color-accent-600: #b8942e;
  --color-accent-700: #9c7a25;
  --color-accent-800: #80601c;
  --color-accent-900: #644613;
}
```

#### Neutral Colors

```css
:root {
  /* Light Mode */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #eeeeee;
  --color-neutral-300: #e0e0e0;
  --color-neutral-400: #bdbdbd;
  --color-neutral-500: #9e9e9e;
  --color-neutral-600: #757575;
  --color-neutral-700: #616161;
  --color-neutral-800: #424242;
  --color-neutral-900: #212121;

  /* Dark Mode */
  --color-dark-bg: #0f1419;
  --color-dark-surface: #1a1f29;
  --color-dark-border: #2d3748;
  --color-dark-text: #e2e8f0;
}
```

#### Semantic Colors

```css
:root {
  /* Success */
  --color-success-500: #10b981;
  --color-success-600: #059669;

  /* Warning */
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;

  /* Error */
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;

  /* Info */
  --color-info-500: #3b82f6;
  --color-info-600: #2563eb;
}
```

#### Tajweed Colors (for Quran highlighting)

```css
:root {
  /* Noon Sakinah / Tanween Rules */
  --tajweed-ikhfa: #aadaff; /* Light blue */
  --tajweed-iqlab: #ff9999; /* Light red */
  --tajweed-idgham: #33cc66; /* Light green */
  --tajweed-izhar: #ffe0a3; /* Light yellow */

  /* Meem Sakinah Rules */
  --tajweed-ikhfa-shafawi: #d4c4fb; /* Light purple */
  --tajweed-idgham-mithlayn: #b8e6b8; /* Light green */

  /* Qalqalah */
  --tajweed-qalqalah: #ffb3e6; /* Light pink */

  /* Madd (Elongation) */
  --tajweed-madd-2: #ffd700; /* Gold - 2 counts */
  --tajweed-madd-4: #ffa500; /* Orange - 4 counts */
  --tajweed-madd-6: #ff6347; /* Red - 6 counts */

  /* Special Letters */
  --tajweed-silent: #c0c0c0; /* Gray - silent letters */
  --tajweed-laam-shamsiyyah: #ffe5cc; /* Peach */
  --tajweed-hamzatul-wasl: #e6e6fa; /* Lavender */
}
```

### Typography

#### Font Families

```css
@import url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&display=swap");

:root {
  /* Arabic Fonts */
  --font-arabic-uthmani: "UthmanicHafs", "Amiri", "Traditional Arabic", serif;
  --font-arabic-indopak: "IndoPak", "Noori Nastaliq", "Alvi Nastaleeq", serif;
  --font-arabic-modern: "Scheherazade New", "Amiri", "Arial", sans-serif;

  /* Interface Fonts */
  --font-sans:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", sans-serif;
  --font-serif: "Georgia", "Times New Roman", serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;

  /* Urdu Font */
  --font-urdu:
    "Jameel Noori Nastaleeq", "Alvi Nastaleeq", "Noori Nastaliq", serif;
}
```

#### Font Sizes (Responsive)

```css
:root {
  /* Base: 16px = 1rem */

  /* Arabic Text (Quran) */
  --text-quran-xs: clamp(1.25rem, 2vw, 1.5rem); /* 20-24px */
  --text-quran-sm: clamp(1.5rem, 2.5vw, 1.875rem); /* 24-30px */
  --text-quran-base: clamp(1.875rem, 3vw, 2.25rem); /* 30-36px */
  --text-quran-lg: clamp(2.25rem, 4vw, 3rem); /* 36-48px */
  --text-quran-xl: clamp(3rem, 5vw, 4rem); /* 48-64px */

  /* Interface Text */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
}
```

#### Line Heights

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  --leading-quran: 2.5; /* Extra spacing for Quranic text */
}
```

---

## 📐 Spacing System

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
}
```

---

## 🔲 Layout Components

### Container Widths

```css
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--space-4);
}

.container-sm {
  max-width: 640px;
}
.container-md {
  max-width: 768px;
}
.container-lg {
  max-width: 1024px;
}
.container-xl {
  max-width: 1280px;
}
.container-2xl {
  max-width: 1536px;
}

/* Quran Reader - Optimized for readability */
.container-quran {
  max-width: 900px;
}
```

### Grid System

```css
.grid-layout {
  display: grid;
  gap: var(--space-6);
}

/* Common Layouts */
.layout-split {
  grid-template-columns: 1fr 1fr;
}

.layout-sidebar {
  grid-template-columns: 250px 1fr;
}

.layout-holy-quran {
  grid-template-columns: 2fr 1fr; /* Quran text + Translation */
}

@media (max-width: 768px) {
  .layout-split,
  .layout-sidebar,
  .layout-holy-quran {
    grid-template-columns: 1fr;
  }
}
```

---

## 🧩 UI Components

### 1. Navigation Bar

```tsx
// Header Component
<header
  className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm 
                   border-b border-neutral-200 dark:bg-dark-surface 
                   dark:border-dark-border"
>
  <div className="container-xl">
    <nav className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 bg-primary-500 rounded-lg 
                        flex items-center justify-center"
        >
          <span className="text-white text-xl font-arabic-modern">ق</span>
        </div>
        <span
          className="text-xl font-semibold text-neutral-900 
                         dark:text-dark-text"
        >
          القرآن الكريم
        </span>
      </div>

      {/* Main Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/" className="nav-link">
          الرئيسية
        </a>
        <a href="/surahs" className="nav-link">
          السور
        </a>
        <a href="/search" className="nav-link">
          البحث
        </a>
        <a href="/aqeedah" className="nav-link">
          العقيدة
        </a>
        <a href="/tajweed" className="nav-link">
          التجويد
        </a>
        <a href="/tools" className="nav-link">
          أدوات
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="icon-button" aria-label="Search">
          <SearchIcon />
        </button>
        <button className="icon-button" aria-label="Bookmarks">
          <BookmarkIcon />
        </button>
        <button className="icon-button" aria-label="Settings">
          <SettingsIcon />
        </button>
        <ThemeToggle />
      </div>
    </nav>
  </div>
</header>
```

**Styles**:

```css
.nav-link {
  @apply text-neutral-700 hover:text-primary-500 
         transition-colors duration-200
         font-medium text-base;
}

.icon-button {
  @apply w-10 h-10 flex items-center justify-center 
         rounded-lg hover:bg-neutral-100 
         dark:hover:bg-dark-border
         transition-colors duration-200;
}
```

---

### 2. Surah Card

```tsx
<div className="surah-card group">
  <div className="flex items-center gap-4">
    {/* Surah Number Badge */}
    <div className="surah-badge">
      <span className="text-sm font-semibold">1</span>
    </div>

    {/* Surah Info */}
    <div className="flex-1">
      <h3 className="surah-name-arabic">الفاتحة</h3>
      <p className="surah-name-transliteration">Al-Fatihah</p>
      <p className="surah-meta">
        <span>Meccan</span>
        <span>•</span>
        <span>7 verses</span>
      </p>
    </div>

    {/* Arabic Name */}
    <div className="text-right">
      <p className="text-3xl font-arabic-uthmani text-primary-500">
        سُورَةُ الفَاتِحَة
      </p>
    </div>
  </div>
</div>
```

**Styles**:

```css
.surah-card {
  @apply p-6 bg-white dark:bg-dark-surface 
         rounded-xl border border-neutral-200 
         dark:border-dark-border
         hover:border-primary-300 dark:hover:border-primary-700
         hover:shadow-lg transition-all duration-300
         cursor-pointer;
}

.surah-badge {
  @apply w-12 h-12 rounded-full bg-primary-50 
         dark:bg-primary-900/20
         flex items-center justify-center
         text-primary-600 dark:text-primary-400
         font-mono shrink-0;
}

.surah-name-arabic {
  @apply text-xl font-arabic-modern font-semibold 
         text-neutral-900 dark:text-dark-text;
}

.surah-name-transliteration {
  @apply text-sm text-neutral-600 dark:text-neutral-400 
         font-medium mt-1;
}

.surah-meta {
  @apply text-xs text-neutral-500 dark:text-neutral-500 
         flex items-center gap-2 mt-1;
}
```

---

### 3. Verse Display (Mushaf Mode)

```tsx
<div className="verse-container">
  {/* Verse Number */}
  <div className="verse-number-badge">
    <span>١</span>
  </div>

  {/* Arabic Text */}
  <div className="verse-arabic" dir="rtl" lang="ar">
    <span className="bismillah">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
  </div>

  {/* Translations */}
  <div className="verse-translations">
    <div className="translation" dir="rtl">
      <span className="translation-label">کنز الایمان:</span>
      <p className="translation-text font-urdu">
        شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے
      </p>
    </div>

    <div className="translation">
      <span className="translation-label">English:</span>
      <p className="translation-text">
        In the name of Allah, the Entirely Merciful, the Especially Merciful.
      </p>
    </div>
  </div>

  {/* Actions */}
  <div className="verse-actions">
    <button className="action-btn" title="Play Audio">
      <PlayIcon />
    </button>
    <button className="action-btn" title="Bookmark">
      <BookmarkIcon />
    </button>
    <button className="action-btn" title="Share">
      <ShareIcon />
    </button>
    <button className="action-btn" title="Tafsir">
      <BookOpenIcon />
    </button>
  </div>
</div>
```

**Styles**:

```css
.verse-container {
  @apply relative p-6 mb-4
         bg-gradient-to-br from-white to-neutral-50
         dark:from-dark-surface dark:to-dark-bg
         rounded-2xl border-l-4 border-primary-500
         hover:shadow-xl transition-shadow duration-300;
}

.verse-number-badge {
  @apply absolute -top-3 right-6
         w-8 h-8 rounded-full
         bg-primary-500 text-white
         flex items-center justify-center
         text-sm font-arabic-modern font-semibold
         shadow-md;
}

.verse-arabic {
  @apply text-quran-base font-arabic-uthmani
         leading-quran text-neutral-900 
         dark:text-dark-text
         mb-6 text-right
         selection:bg-accent-200;
}

.verse-translations {
  @apply space-y-4 border-t border-neutral-200 
         dark:border-dark-border pt-4;
}

.translation {
  @apply space-y-2;
}

.translation-label {
  @apply inline-block px-2 py-1 text-xs font-semibold
         bg-primary-100 dark:bg-primary-900/30
         text-primary-700 dark:text-primary-400
         rounded;
}

.translation-text {
  @apply text-base leading-relaxed 
         text-neutral-700 dark:text-neutral-300;
}

.verse-actions {
  @apply flex gap-2 mt-4 pt-4 
         border-t border-neutral-200 dark:border-dark-border;
}

.action-btn {
  @apply p-2 rounded-lg
         hover:bg-primary-50 dark:hover:bg-primary-900/20
         text-neutral-600 dark:text-neutral-400
         hover:text-primary-600 dark:hover:text-primary-400
         transition-colors duration-200;
}
```

---

### 4. Audio Player

```tsx
<div className="audio-player">
  <div className="flex items-center gap-4">
    {/* Play/Pause Button */}
    <button className="play-button">
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>

    {/* Verse Info */}
    <div className="flex-1">
      <p className="audio-verse-info">Surah Al-Fatihah - Verse 1</p>
      <p className="audio-qari-info">Abdul Basit Abdul Samad</p>
    </div>

    {/* Progress Bar */}
    <div className="audio-progress">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        className="progress-slider"
      />
      <div className="time-display">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>

    {/* Controls */}
    <div className="audio-controls">
      <button className="control-btn">
        <SkipBackIcon />
      </button>
      <button className="control-btn">
        <RepeatIcon />
      </button>
      <button className="control-btn">
        <SkipForwardIcon />
      </button>
    </div>

    {/* Volume */}
    <div className="volume-control">
      <VolumeIcon />
      <input type="range" min="0" max="100" className="volume-slider" />
    </div>
  </div>
</div>
```

**Styles**:

```css
.audio-player {
  @apply fixed bottom-0 left-0 right-0 z-40
         bg-white/95 dark:bg-dark-surface/95
         backdrop-blur-lg
         border-t border-neutral-200 dark:border-dark-border
         p-4 shadow-2xl;
}

.play-button {
  @apply w-12 h-12 rounded-full
         bg-primary-500 hover:bg-primary-600
         text-white flex items-center justify-center
         transition-colors duration-200;
}

.audio-verse-info {
  @apply text-sm font-semibold text-neutral-900 
         dark:text-dark-text;
}

.audio-qari-info {
  @apply text-xs text-neutral-600 dark:text-neutral-400;
}

.audio-progress {
  @apply flex-1 max-w-md;
}

.progress-slider {
  @apply w-full h-1 rounded-full
         bg-neutral-200 dark:bg-dark-border
         appearance-none cursor-pointer;
}

.progress-slider::-webkit-slider-thumb {
  @apply appearance-none w-3 h-3 rounded-full
         bg-primary-500 cursor-pointer;
}

.time-display {
  @apply flex justify-between text-xs 
         text-neutral-600 dark:text-neutral-400 mt-1;
}

.control-btn {
  @apply p-2 rounded-lg
         hover:bg-neutral-100 dark:hover:bg-dark-border
         text-neutral-600 dark:text-neutral-400
         transition-colors duration-200;
}
```

---

### 5. Search Interface

```tsx
<div className="search-container">
  <div className="search-box">
    <SearchIcon className="search-icon" />
    <input
      type="text"
      placeholder="Search Quran..."
      className="search-input"
      dir="auto"
    />
    <button className="search-filter-btn">
      <FilterIcon />
    </button>
  </div>

  {/* Advanced Filters */}
  <div className="search-filters">
    <div className="filter-group">
      <label>Search Type:</label>
      <select className="filter-select">
        <option value="semantic">Semantic</option>
        <option value="keyword">Keyword</option>
        <option value="exact">Exact Match</option>
      </select>
    </div>

    <div className="filter-group">
      <label>Translation:</label>
      <select className="filter-select" multiple>
        <option value="kanzul_iman">Kanzul Iman</option>
        <option value="sahih_int">Sahih International</option>
      </select>
    </div>

    <div className="filter-group">
      <label>Revelation Type:</label>
      <div className="radio-group">
        <label>
          <input type="radio" name="revelation" value="all" />
          All
        </label>
        <label>
          <input type="radio" name="revelation" value="meccan" />
          Meccan
        </label>
        <label>
          <input type="radio" name="revelation" value="medinan" />
          Medinan
        </label>
      </div>
    </div>
  </div>

  {/* Search Results */}
  <div className="search-results">
    <p className="results-count">Found 15 results in 0.045s</p>

    <div className="result-item">
      <div className="result-meta">
        <span className="surah-reference">Surah Al-Isra (17:23)</span>
        <span className="relevance-score">95% match</span>
      </div>
      <p className="result-text" dir="rtl">
        وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوٓا۟ إِلَّآ إِيَّاهُ وَبِٱلْوَٰلِدَيْنِ
        إِحْسَـٰنًا
      </p>
      <p className="result-translation">
        And your Lord has decreed that you worship none but Him. And that you be
        dutiful to your <mark>parents</mark>...
      </p>
    </div>
  </div>
</div>
```

---

### 6. Tajweed Learning Module

```tsx
<div className="tajweed-module">
  <div className="tajweed-verse" dir="rtl">
    <span className="word" data-rule="idgham">
      مِنْ
    </span>
    <span className="word" data-rule="ghunnah">
      نُورٍ
    </span>
  </div>

  <div className="tajweed-legend">
    <div className="legend-item">
      <span
        className="legend-color"
        style="background: var(--tajweed-idgham)"
      ></span>
      <span>Idgham</span>
    </div>
    <div className="legend-item">
      <span
        className="legend-color"
        style="background: var(--tajweed-ghunnah)"
      ></span>
      <span>Ghunnah</span>
    </div>
  </div>

  <div className="tajweed-explanation">
    <h4>Rule: Idgham with Ghunnah</h4>
    <p>When Noon Sakinah or Tanween is followed by certain letters...</p>
    <button className="audio-example-btn">
      <PlayIcon /> Hear Example
    </button>
  </div>
</div>
```

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */

/* Extra Small Devices (phones, 0-639px) */
@media (min-width: 0px) {
  /* Base styles */
}

/* Small Devices (landscape phones, 640px+) */
@media (min-width: 640px) {
  .container {
    padding-inline: var(--space-6);
  }
}

/* Medium Devices (tablets, 768px+) */
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
  .verse-arabic {
    font-size: var(--text-quran-base);
  }
}

/* Large Devices (desktops, 1024px+) */
@media (min-width: 1024px) {
  .layout-holy-quran {
    grid-template-columns: 2fr 1fr;
  }
}

/* Extra Large Devices (large desktops, 1280px+) */
@media (min-width: 1280px) {
  .verse-arabic {
    font-size: var(--text-quran-lg);
  }
}
```

---

## ♿ Accessibility Features

### 1. Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
<button
  className="action-btn"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Action
</button>
```

### 2. ARIA Labels

```tsx
<nav aria-label="Main navigation">
  <button aria-label="Play verse audio" aria-pressed={isPlaying}>
    <PlayIcon aria-hidden="true" />
  </button>
</nav>
```

### 3. Focus Management

```css
/* Focus indicators */
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary-500;
}

/* Skip to content link */
.skip-to-content {
  @apply absolute -top-full left-0 
         bg-primary-500 text-white px-4 py-2
         focus:top-0 z-50;
}
```

### 4. Screen Reader Support

```tsx
<div className="verse-container" role="article" aria-labelledby="verse-1-1">
  <h3 id="verse-1-1" className="sr-only">
    Surah Al-Fatihah, Verse 1
  </h3>
  <div className="verse-arabic" aria-label="Arabic text">
    ...
  </div>
  <div className="verse-translations" aria-label="Translations">
    ...
  </div>
</div>

/* Screen reader only class */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden
         clip-[rect(0,0,0,0)] whitespace-nowrap border-0;
}
```

---

## 🌓 Dark Mode Implementation

```tsx
// Theme Toggle Component
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
```

```css
/* Dark mode styles */
.dark {
  color-scheme: dark;
}

.dark .verse-container {
  @apply bg-gradient-to-br from-dark-surface to-dark-bg;
}

.dark .surah-card {
  @apply bg-dark-surface border-dark-border;
}
```

---

## 🎭 Animation & Transitions

```css
/* Smooth transitions */
* {
  @apply transition-colors duration-200;
}

/* Page transitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Verse reveal animation */
@keyframes verseReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.verse-container {
  animation: verseReveal 0.4s ease-out;
  animation-fill-mode: both;
}

.verse-container:nth-child(1) {
  animation-delay: 0.05s;
}
.verse-container:nth-child(2) {
  animation-delay: 0.1s;
}
.verse-container:nth-child(3) {
  animation-delay: 0.15s;
}
```

---

## 📐 Icon System

Use Heroicons or Lucide React for consistent iconography:

```tsx
import {
  BookOpenIcon,
  PlayIcon,
  BookmarkIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

// Filled variants for active states
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
```

---

## 🎯 Component Library

### Button Variants

```tsx
// Primary Button
<button className="btn btn-primary">
  Continue Reading
</button>

// Secondary Button
<button className="btn btn-secondary">
  View Tafsir
</button>

// Ghost Button
<button className="btn btn-ghost">
  Cancel
</button>

// Icon Button
<button className="btn btn-icon">
  <PlayIcon />
</button>
```

```css
.btn {
  @apply px-4 py-2 rounded-lg font-medium
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600
         text-white focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-neutral-200 hover:bg-neutral-300
         dark:bg-dark-border dark:hover:bg-neutral-700
         text-neutral-900 dark:text-dark-text
         focus:ring-neutral-500;
}

.btn-ghost {
  @apply bg-transparent hover:bg-neutral-100
         dark:hover:bg-dark-border
         text-neutral-700 dark:text-neutral-300;
}

.btn-icon {
  @apply w-10 h-10 p-0 flex items-center justify-center;
}
```

---

## 📲 Progressive Web App (PWA) Design

### Install Prompt

```tsx
<div className="pwa-install-banner">
  <div className="flex items-center gap-4">
    <div className="pwa-icon">
      <MobileIcon />
    </div>
    <div className="flex-1">
      <h4>Install Quran App</h4>
      <p>Access offline and get a native app experience</p>
    </div>
    <button className="btn btn-primary">Install</button>
  </div>
</div>
```

### Offline Indicator

```tsx
<div className="offline-indicator">
  <WifiOffIcon />
  <span>You're offline. Viewing cached content.</span>
</div>
```

---

## 🌍 RTL (Right-to-Left) Support

```css
/* RTL-aware utilities */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .verse-container {
  border-left: none;
  border-right: 4px solid var(--color-primary-500);
}

/* Logical properties for RTL support */
.sidebar {
  padding-inline-start: var(--space-6);
  margin-inline-end: var(--space-4);
}
```

---

## 📊 Performance Optimization

### Image Optimization

```tsx
import Image from "next/image";

<Image
  src="/images/quran-mushaf.jpg"
  alt="Quran Mushaf"
  width={800}
  height={600}
  priority={false}
  loading="lazy"
  placeholder="blur"
/>;
```

### Font Optimization

```tsx
import localFont from "next/font/local";

const uthmaniFont = localFont({
  src: "./fonts/UthmanicHafs.woff2",
  variable: "--font-uthmani",
  display: "swap",
  preload: true,
  fallback: ["Amiri", "serif"],
});
```

---

## ✅ Design Checklist

- [ ] Mobile-first responsive design
- [ ] Dark mode support
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] RTL language support
- [ ] Touch-friendly (min 44x44px targets)
- [ ] Fast loading (<2s LCP)
- [ ] Smooth animations (60fps)
- [ ] Consistent spacing system
- [ ] Semantic HTML
- [ ] Print-friendly styles
- [ ] Offline capability (PWA)

---

This design system ensures a beautiful, accessible, and performant Quranic web application that honors the sacred nature of the content while providing an excellent user experience.
