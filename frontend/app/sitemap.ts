import { MetadataRoute } from "next";
import { getSafaris, getDestinations, getBlogPosts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.engaisafaris.com";

  const [safaris, destinations, posts] = await Promise.all([
    getSafaris().catch(() => []),
    getDestinations().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/safaris`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/group-safaris`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/plan-my-safari`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/wildlife-calendar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/health-vaccinations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/wildlife-id`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  return [
    ...staticRoutes,
    ...safaris.map((s) => ({ url: `${base}/safaris/${s.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 })),
    ...destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.published_at ? new Date(p.published_at) : new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
