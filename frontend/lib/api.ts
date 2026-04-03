import type { Destination, Guide, SafariList, SafariDetail, Review, ReviewCreate, BlogPost, EnquiryCreate, EnquiryOut } from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://engai-safaris-production.up.railway.app";

async function get<T>(path: string, revalidate: number | "no-store" = 3600): Promise<T> {
  const opts: RequestInit =
    revalidate === "no-store"
      ? { cache: "no-store" }
      : { next: { revalidate } };
  try {
    const res = await fetch(`${BASE}/api${path}`, opts);
    if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
    return res.json();
  } catch (err) {
    console.error(`[API] GET ${path} failed:`, err);
    throw err;
  }
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

export const submitReview = (data: ReviewCreate) => post<Review>("/reviews", data);

// Blog
export const getBlogPosts = (category?: string, page = 1) =>
  get<BlogPost[]>(`/blog?page=${page}${category ? `&category=${category}` : ""}`, "no-store");

export const getBlogPost = (slug: string) => get<BlogPost>(`/blog/${slug}`, "no-store");

// Bookings
export const previewPrice = (safari_slug: string, travel_date: string, pax: number) =>
  post<{
    safari_name: string; duration_days: number; pax: number; season: string;
    multiplier: number; base_usd_pp: number; total_usd: number; total_kes: number;
    deposit_kes: number; balance_kes: number; deposit_pct: number; installments_ok: boolean;
  }>("/bookings/preview", { safari_slug, travel_date, pax });

export const createBooking = (data: {
  safari_slug: string; travel_date: string; pax: number;
  customer_name: string; customer_email: string; customer_phone: string;
  customer_country?: string; celebration?: string; special_requests?: string; promo_code?: string;
}) => post<{ reference: string; redirect_url: string; order_tracking_id: string; deposit_kes: number; total_kes: number; }>("/bookings", data);

// Availability
export const getSafariAvailability = (slug: string, month: string) =>
  get<import("@/types/api").AvailabilityDay[]>(`/safaris/${slug}/availability?month=${month}`, 0);

// Enquiry
export const createEnquiry = (data: EnquiryCreate) => post<EnquiryOut>("/enquiries", data);

// AI Planner
export const askAIPlanner = (conversation: Array<{ role: string; content: string }>) =>
  post<{ reply: string }>("/ai-planner", { conversation });

// Currency — server-side cached rates (12h TTL)
export const getExchangeRates = () =>
  get<{ base: string; currencies: string[]; rates: Record<string, number> }>("/currency/rates", 0);
