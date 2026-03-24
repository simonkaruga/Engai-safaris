import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CookieBanner from "@/components/layout/CookieBanner";
import CookieConsent from "@/components/ui/CookieConsent";
import LiveChat from "@/components/layout/LiveChat";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "../public/fonts/playfair-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/playfair-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/playfair-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/playfair-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.engaisafaris.com"),
  title: { default: "Engai Safaris Kenya | Where the Sky Meets the Wild", template: "%s | Engai Safaris Kenya" },
  description: "Kenya's first technology-native safari company. Transparent pricing, instant booking, real guides. Masai Mara, Amboseli, Naivasha & beyond.",
  alternates: { canonical: "https://www.engaisafaris.com" },
  openGraph: {
    siteName: "Engai Safaris",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "engai-safaris-google-site-verify",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <LanguageProvider>
        <CurrencyProvider>
          {/* Skip to main content — WCAG 2.1 requirement */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal-DEFAULT focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="pt-16">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <CookieConsent />
          <LiveChat />
        </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
