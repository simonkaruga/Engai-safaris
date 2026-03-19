import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0D7A5F",
          50: "#E6F4F0",
          100: "#C0E4D9",
          500: "#0D7A5F",
          600: "#0A6550",
          700: "#084F3E",
        },
        gold: {
          DEFAULT: "#C8860A",
          50: "#FDF3E0",
          100: "#F9E0A8",
          500: "#C8860A",
          600: "#A86E08",
        },
        maasai: {
          DEFAULT: "#C0392B",
          500: "#C0392B",
          600: "#A93226",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
