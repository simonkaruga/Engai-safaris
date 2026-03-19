import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CookieBanner from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.engaisafaris.com"),
  title: { default: "Engai Safaris Kenya | Where the Sky Meets the Wild", template: "%s | Engai Safaris Kenya" },
  description: "Kenya's first technology-native safari company. Transparent pricing, instant booking, real guides. Masai Mara, Amboseli, Naivasha & beyond.",
  openGraph: {
    siteName: "Engai Safaris",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
