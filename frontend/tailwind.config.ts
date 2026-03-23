import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Acacia Green — fresh, vibrant, bright safari morning light
        teal: {
          DEFAULT: "#1B7A60",
          50:  "#E8F5F0",
          100: "#C2E5D8",
          200: "#87CEAD",
          500: "#1B7A60",
          600: "#167055",
          700: "#10594A",
          900: "#073530",
          vivid: "#22C896",
        },
        // Savanna Sunburst — warm African noon gold
        gold: {
          DEFAULT: "#F5A623",
          50:  "#FFFBEB",
          100: "#FEF0C7",
          200: "#FBD97A",
          500: "#F5A623",
          600: "#D4880C",
          900: "#7A4B05",
        },
        // Flame Lily — Kenya's national flower, warm accessible red
        maasai: {
          DEFAULT: "#E5432E",
          500: "#E5432E",
          600: "#C43826",
        },
        // Dark anchor — deep forest shadow
        obsidian: {
          DEFAULT: "#0F1C17",
          light: "#1A2E26",
        },
        // Savanna Ivory — warm linen backgrounds, feels African not clinical
        stone: {
          50:  "#FDFAF5",
          100: "#F7F1E5",
          200: "#ECDFCA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "slide-in-right": "slideInRight 0.5s ease-out both",
        "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-teal":     "linear-gradient(135deg, #1B7A60 0%, #107050 100%)",
        "gradient-malachite":"linear-gradient(135deg, #1B7A60 0%, #22C896 50%, #1B7A60 100%)",
        "gradient-obsidian": "linear-gradient(135deg, #0F1C17 0%, #1A2E26 100%)",
        "gradient-amber":    "linear-gradient(135deg, #F5A623 0%, #FBD97A 50%, #F5A623 100%)",
      },
      boxShadow: {
        "teal":      "0 4px 24px -4px rgba(27, 122, 96, 0.35)",
        "gold":      "0 4px 24px -4px rgba(245, 166, 35, 0.35)",
        "obsidian":  "0 8px 32px -4px rgba(15, 28, 23, 0.45)",
        "card":      "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "card-hover":"0 4px 6px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
