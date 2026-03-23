// Auto-generated types matching FastAPI schemas

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  country: string;
  region: string | null;
  cover_image: string | null;
  gallery: string[];
  best_months: string[] | null;
  highlights: string[] | null;
  wildlife_list: string[] | null;
  latitude: number | null;
  longitude: number | null;
  peak_fee_usd: number | null;
  low_fee_usd: number | null;
  meta_title: string | null;
  meta_desc: string | null;
}

export interface Guide {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  languages: string[] | null;
  specialities: string[] | null;
  certifications: string[] | null;
  years_exp: number | null;
  home_region: string | null;
  fun_fact: string | null;
  is_featured: boolean;
  review_count: number;
  avg_rating: number | null;
}

export interface ItineraryDay {
  day_number: number;
  title: string;
  description: string | null;
  meals: Record<string, string> | null;
  accommodation: string | null;
  accommodation_type: string | null;
  activities: string[] | null;
  distance_km: number | null;
  drive_hours: number | null;
  image: string | null;
}

export interface SafariList {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  category: string | null;
  duration_days: number;
  price_usd_2pax: number | null;
  price_kes_2pax: number | null;
  cover_image: string | null;
  is_featured: boolean;
  is_shared: boolean;
}

export interface SafariDetail extends SafariList {
  description: string | null;
  group_size_max: number;
  price_usd_solo: number | null;
  price_usd_4pax: number | null;
  price_usd_6pax: number | null;
  price_kes_solo: number | null;
  price_kes_4pax: number | null;
  price_kes_6pax: number | null;
  deposit_pct: number;
  installments_ok: boolean;
  video_url: string | null;
  gallery: string[];
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  what_to_bring: string[] | null;
  cancellation_policy: string | null;
  meta_title: string | null;
  meta_desc: string | null;
  itinerary_days: ItineraryDay[];
  difficulty: string | null;
  has_beach_extension: boolean;
  beach_extension_days: number | null;
  beach_extension_price_usd: number | null;
  beach_extension_price_kes: number | null;
  beach_extension_desc: string | null;
}

export interface ReviewCreate {
  author_name: string;
  author_country?: string;
  rating: number;
  guide_rating?: number;
  value_rating?: number;
  title?: string;
  body: string;
  trip_month?: string;
}

export interface Review {
  id: string;
  author_name: string;
  author_country: string | null;
  rating: number;
  guide_rating: number | null;
  value_rating: number | null;
  title: string | null;
  body: string;
  trip_month: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface AvailabilityDay {
  date: string;
  status: "available" | "blocked" | "full";
  spots_left: number | null;
  note: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  read_time_min: number | null;
  published_at: string | null;
}

export interface EnquiryCreate {
  safari_id?: string;
  source?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_country?: string;
  travel_date_from?: string;
  travel_date_to?: string;
  flexibility?: string;
  group_size?: number;
  group_type?: string;
  budget_usd?: string;
  interests?: string[];
  dietary_req?: string[];
  medical_notes?: string;
  celebration?: string;
  special_requests?: string;
  ai_conversation?: Array<{ role: string; content: string }>;
}

export interface EnquiryOut {
  id: string;
  reference: string;
  status: string;
  customer_name: string;
  customer_email: string;
  created_at: string;
}

export interface PricingMatrix {
  solo: { usd: number | null; kes: number | null };
  "2pax": { usd: number | null; kes: number | null };
  "4pax": { usd: number | null; kes: number | null };
  "6pax": { usd: number | null; kes: number | null };
}
