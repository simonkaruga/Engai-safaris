import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Engai Safaris",
  description: "The story behind Kenya's first technology-native safari company. Local knowledge, transparent pricing, real guides.",
  alternates: { canonical: "https://www.engaisafaris.com/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
