import { redirect } from "next/navigation";

// Experiences are not yet live — redirect to safaris to avoid empty pages in the sitemap.
// When experiences are built, replace this with the real page.
export default function ExperiencePage({ params }: { params: { slug: string } }) {
  redirect(`/safaris`);
}
