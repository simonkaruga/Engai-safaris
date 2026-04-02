import { getGuides } from "@/lib/api";
import GuidesContent from "./GuidesContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Safari Guides",
  description: "Meet the Engai Safaris guides, TRA-certified naturalists with 7–14 years field experience. Full profiles, certifications and guest reviews before you book.",
  alternates: { canonical: "https://www.engaisafaris.com/guides" },
};

export default async function GuidesPage() {
  const guides = await getGuides().catch(() => []);
  return <GuidesContent guides={guides} />;
}
