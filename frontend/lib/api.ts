import type { Destination, Guide, SafariList, SafariDetail, Review, BlogPost, EnquiryCreate, EnquiryOut } from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function get<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// Safaris
export const getSafaris = (params?: { category?: string; destination_slug?: string }) =>
  get<SafariList[]>(`/safaris${params?.category ? `?category=${params.category}` : ""}`);

export const getFeaturedSafaris = () => get<SafariList[]>("/safaris/featured");

export const getSafari = (slug: string) => get<SafariDetail>(`/safaris/${slug}`);

// Destinations
export const getDestinations = () => get<Destination[]>("/destinations", 300);
export const getDestination = (slug: string) => get<Destination>(`/destinations/${slug}`);

// Guides
export const getGuides = () => get<Guide[]>("/guides");
export const getGuide = (slug: string) => get<Guide>(`/guides/${slug}`);

// Reviews
export const getReviews = (featured = false) =>
  get<Review[]>(`/reviews${featured ? "?featured=1" : ""}`);

// Blog
export const getBlogPosts = (category?: string, page = 1) =>
  get<BlogPost[]>(`/blog?page=${page}${category ? `&category=${category}` : ""}`);

export const getBlogPost = (slug: string) => get<BlogPost>(`/blog/${slug}`, 86400);

// Availability
export const getSafariAvailability = (slug: string, month: string) =>
  get<import("@/types/api").AvailabilityDay[]>(`/safaris/${slug}/availability?month=${month}`, 0);

// Enquiry
export const createEnquiry = (data: EnquiryCreate) => post<EnquiryOut>("/enquiries", data);

// AI Planner
export const askAIPlanner = (conversation: Array<{ role: string; content: string }>) =>
  post<{ reply: string }>("/ai-planner", { conversation });
