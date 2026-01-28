/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#0D7C66",
          600: "#0A6B56",
          700: "#085A47",
          800: "#054A39",
          900: "#03392B",
        },
        accent: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#D4AF37",
          600: "#B8942E",
          700: "#9C7A25",
          800: "#80601C",
          900: "#644613",
        },
        dark: {
          bg: "#0F1419",
          surface: "#1A1F29",
          border: "#2D3748",
          text: "#E2E8F0",
        },
        tajweed: {
          ikhfa: "#AADAFF",
          iqlab: "#FF9999",
          idgham: "#33CC66",
          izhar: "#FFE0A3",
          ikhfaShafawi: "#D4C4FB",
          idghamMithlayn: "#B8E6B8",
          qalqalah: "#FFB3E6",
          madd2: "#FFD700",
          madd4: "#FFA500",
          madd6: "#FF6347",
          silent: "#C0C0C0",
          laamShamsiyyah: "#FFE5CC",
          hamzatulWasl: "#E6E6FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: {
          uthmani: ["var(--font-uthmani)", "Amiri", "serif"],
          indopak: ["var(--font-indopak)", "Noori Nastaliq", "serif"],
          modern: ["Scheherazade New", "Amiri", "serif"],
        },
        urdu: ["Jameel Noori Nastaleeq", "Alvi Nastaleeq", "serif"],
      },
      fontSize: {
        "quran-xs": "clamp(1.25rem, 2vw, 1.5rem)",
        "quran-sm": "clamp(1.5rem, 2.5vw, 1.875rem)",
        "quran-base": "clamp(1.875rem, 3vw, 2.25rem)",
        "quran-lg": "clamp(2.25rem, 4vw, 3rem)",
        "quran-xl": "clamp(3rem, 5vw, 4rem)",
      },
      lineHeight: {
        quran: "2.5",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgb(0 0 0 / 0.1)",
        glow: "0 0 20px rgba(13, 124, 102, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "verse-reveal": "verseReveal 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        verseReveal: {
          from: {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
