import { Suspense } from "react";
import { getFeaturedSafaris, getReviews, getGuides } from "@/lib/api";
import SafariFeaturedCard from "@/components/safari/SafariFeaturedCard";
import SafariFeaturedCardSkeleton from "@/components/safari/SafariFeaturedCardSkeleton";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import Image from "next/image";
import { MPesaLogo, VisaLogo, MastercardLogo } from "@/components/ui/PaymentLogos";
import NewsletterForm from "@/components/ui/NewsletterForm";

export const dynamic = "force-dynamic";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
    title: "Transparent Pricing",
    desc: "Every price on every page. No hidden fees. No 'contact us for a quote'. What you see is exactly what you pay.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Instant Booking",
    desc: "Book online 24/7. M-Pesa STK push or Visa/Mastercard. Confirmation in seconds, not days.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Expert Guides",
    desc: "TRA-certified naturalists with 10+ years in Kenya's parks. Full profiles, certifications and guest reviews visible.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "AI Safari Planner",
    desc: "Tell Engai your dates, budget and dream moments. Get a personalised itinerary in under 2 minutes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3M6.75 12H9m-2.25 3.75H9" />
      </svg>
    ),
    title: "Lipa Polepole",
    desc: "Pay in 4 monthly M-Pesa instalments. A world-class Mara safari from KES 43,750 / month.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Kenya-Owned",
    desc: "Local knowledge, local prices. No international agent markup of 30–300%. More of your money funds conservation.",
  },
];

const DESTINATIONS = [
  { name: "Masai Mara", tag: "Big Five · Great Migration", img: "/images/destinations/masai-mara.png", href: "/destinations/masai-mara" },
  { name: "Amboseli", tag: "Elephants · Kilimanjaro Views", img: "/images/destinations/nairobi.jpg", href: "/destinations/amboseli" },
  { name: "Lake Naivasha", tag: "Flamingos · Hell's Gate", img: "/images/destinations/lake-naivasha.png", href: "/destinations/lake-naivasha" },
  { name: "Samburu", tag: "Rare species · Remote wilderness", img: "/images/destinations/samburu.jpg", href: "/destinations/samburu" },
  { name: "Lake Nakuru", tag: "Rhinos · Flamingo lake", img: "/images/destinations/lake-nakuru.jpg", href: "/destinations/lake-nakuru" },
];

function FeaturedSafarisGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SafariFeaturedCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function FeaturedSafarisGrid() {
  const safaris = await getFeaturedSafaris().catch(() => [] as import("@/types/api").SafariList[]);

  if (safaris.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {safaris.map((safari) => (
        <SafariFeaturedCard key={safari.id} safari={safari} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const [reviews, guides] = await Promise.all([
    getReviews(true).catch(() => [] as import("@/types/api").Review[]),
    getGuides().catch(() => [] as import("@/types/api").Guide[]),
  ]);
  const featuredGuide = guides.find((g) => g.is_featured) ?? guides[0] ?? null;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "4.9";
  const reviewCount = reviews.length || 312;

  return (
    <>
      <SchemaOrg
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["TravelAgency", "LocalBusiness"],
              "@id": "https://www.engaisafaris.com/#organization",
              name: "Engai Safaris",
              alternateName: "Engai Safaris Kenya",
              url: "https://www.engaisafaris.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.engaisafaris.com/images/logo.png",
                width: 200,
                height: 200,
              },
              image: "https://www.engaisafaris.com/images/hero.png",
              description: "Kenya's first technology-native safari company. Transparent pricing, instant booking, real guides. Masai Mara, Amboseli, Naivasha & beyond.",
              telephone: "+254797033513",
              email: "hello@engaisafaris.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.286389,
                longitude: 36.817223,
              },
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
              priceRange: "$$",
              currenciesAccepted: "KES, USD",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "06:00",
                closes: "22:00",
              },
              sameAs: [
                "https://instagram.com/engaisafaris",
                "https://tiktok.com/@engaisafaris",
                "https://youtube.com/@engaisafaris",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: avgRating,
                reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative -mt-16 min-h-screen flex items-center overflow-hidden bg-gray-950">
        {/* Cinematic video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
          {/* Fallback image shown while video loads or if unsupported */}
        </video>
        {/* Gradient overlay — heavier left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 pt-32 pb-24">
          <div className="max-w-2xl">
            {/* Eyebrow badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-sm text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT flex-shrink-0" />
                En-KAI · Supreme Sky God of the Maasai
              </div>
              <div className="inline-flex items-center gap-1.5 bg-teal-DEFAULT/90 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Kenya&apos;s First AI Safari Platform
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white leading-[0.92] mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Where the Sky
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-gradient-gold">
                Meets the Wild
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-xl">
              Elephant herds under Kilimanjaro at dawn. Lions at 6am in the Mara.
              Transparent pricing, real guides, instant booking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/safaris"
                className="inline-flex items-center justify-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-teal hover:-translate-y-0.5"
              >
                Browse Safaris
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/plan-my-safari"
                className="inline-flex items-center justify-center gap-2 glass-dark hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all"
              >
                <svg className="w-4 h-4 text-gold-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI Safari Planner
              </Link>
            </div>
          </div>
        </div>

        {/* Floating stats — desktop only */}
        <div className="absolute bottom-10 right-6 md:right-12 hidden lg:grid grid-cols-3 gap-px glass-dark rounded-2xl overflow-hidden">
          {[
            { value: `${avgRating}★`, label: "Avg rating" },
            { value: `${reviewCount}+`, label: "Happy guests" },
            { value: "10+", label: "Destinations" },
          ].map(({ value, label }) => (
            <div key={label} className="px-6 py-4 text-center">
              <p className="font-display font-bold text-xl text-white">{value}</p>
              <p className="text-xs text-white/55 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold-DEFAULT" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {avgRating}/5 · {reviewCount}+ verified reviews
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Big Five in every itinerary
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-2">
              <MPesaLogo className="h-5" />
              <VisaLogo className="h-5" />
              <MastercardLogo className="h-5" />
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
              </svg>
              Kenya-owned &amp; TRA Licensed
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              No hidden fees — ever
            </span>
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* Google Reviews */}
            <a
              href="https://g.page/r/engaisafaris/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:border-gray-300 hover:shadow-card transition-all"
            >
              <svg viewBox="0 0 48 48" className="w-7 h-7 flex-shrink-0">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.6 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.6-1.8 14.5-5l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.6 41.5 15.3 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.7-4.8 6.2l6.7 5.5C42.2 36.4 46 30.7 46 24c0-1.3-.2-2.7-.5-4z"/>
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">4.9 on Google</p>
              </div>
            </a>

            {/* TripAdvisor */}
            <a
              href="https://www.tripadvisor.com/engaisafaris"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:border-gray-300 hover:shadow-card transition-all"
            >
              <svg viewBox="0 0 60 60" className="w-7 h-7 flex-shrink-0">
                <circle cx="15" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="45" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="30" cy="20" r="8" fill="#fff" stroke="#34E0A1" strokeWidth="2"/>
                <path d="M5 25 Q15 10 30 12 Q45 10 55 25" stroke="#34E0A1" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="35" r="4" fill="#fff"/>
                <circle cx="45" cy="35" r="4" fill="#fff"/>
              </svg>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-3 h-3 rounded-full bg-[#34E0A1]" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">5.0 on TripAdvisor</p>
              </div>
            </a>

            {/* SafariBookings */}
            <a
              href="https://www.safaribookings.com/engaisafaris"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:border-gray-300 hover:shadow-card transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#E07B00] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">SB</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-[#E07B00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">Top Operator 2025</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Credentials */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mb-8">Why guests trust Engai</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* TRA Licensed */}
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-100 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">TRA Class A Licensed</p>
                <p className="text-[10px] text-gray-400">Tourism Regulatory Authority</p>
              </div>
            </div>
            {/* Google 4.9 */}
            <a href="https://g.page/r/engaisafaris/review" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all">
              <svg viewBox="0 0 48 48" className="w-7 h-7 flex-shrink-0">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.6 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.6-1.8 14.5-5l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.6 41.5 15.3 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.7-4.8 6.2l6.7 5.5C42.2 36.4 46 30.7 46 24c0-1.3-.2-2.7-.5-4z"/>
              </svg>
              <div>
                <p className="text-xs font-bold text-gray-800">4.9★ Google Reviews</p>
                <p className="text-[10px] text-gray-400">Verified guest reviews</p>
              </div>
            </a>
            {/* TripAdvisor 5.0 */}
            <a href="https://www.tripadvisor.com/engaisafaris" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all">
              <svg viewBox="0 0 60 60" className="w-7 h-7 flex-shrink-0">
                <circle cx="15" cy="35" r="10" fill="#34E0A1"/><circle cx="45" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="30" cy="20" r="8" fill="#fff" stroke="#34E0A1" strokeWidth="2"/>
                <path d="M5 25 Q15 10 30 12 Q45 10 55 25" stroke="#34E0A1" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="35" r="4" fill="#fff"/><circle cx="45" cy="35" r="4" fill="#fff"/>
              </svg>
              <div>
                <p className="text-xs font-bold text-gray-800">5.0 TripAdvisor</p>
                <p className="text-[10px] text-gray-400">Certificate of Excellence</p>
              </div>
            </a>
            {/* SafariBookings */}
            <a href="https://www.safaribookings.com/engaisafaris" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-7 h-7 rounded-full bg-[#E07B00] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">SB</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">SafariBookings</p>
                <p className="text-[10px] text-gray-400">Top Operator 2025</p>
              </div>
            </a>
            {/* Kenya-owned */}
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-100 rounded-xl">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                {/* Kenya flag colours */}
                <div className="w-full h-1/3 bg-[#006600]" />
                <div className="w-full h-1/3 bg-[#cc0000]" />
                <div className="w-full h-1/3 bg-black" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Kenya-Owned &amp; Operated</p>
                <p className="text-[10px] text-gray-400">No international markup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Safaris */}
      <section className="section max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow text-teal-DEFAULT mb-3">Curated packages</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Featured Safaris
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Every price shown is the real price. No "contact us for a quote" — just transparent, instant booking.
          </p>
        </div>

        <Suspense fallback={<FeaturedSafarisGridSkeleton />}>
          <FeaturedSafarisGrid />
        </Suspense>

        <div className="text-center mt-10">
          <Link
            href="/safaris"
            className="inline-flex items-center gap-2 border-2 border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
          >
            View All Safari Packages
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Destinations Strip */}
      <section className="bg-stone-50 border-t border-stone-200 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
          <p className="eyebrow text-teal-DEFAULT mb-3">Where we take you</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
            Kenya's Iconic Destinations
          </h2>
        </div>
        <div className="flex gap-4 px-4 md:px-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.name}
              href={dest.href}
              className="flex-shrink-0 w-[75vw] sm:w-72 md:w-64 h-80 rounded-2xl overflow-hidden relative group snap-start hover-lift"
            >
              <Image
                src={dest.img}
                alt={`${dest.name} — ${dest.tag}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display font-bold text-white text-xl mb-1">{dest.name}</h3>
                <p className="text-white/65 text-xs">{dest.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Engai */}
      <section className="bg-gray-950 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="eyebrow text-teal-200 mb-3">The Engai difference</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg">
              Built differently.<br />For you.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-gray-950 p-8 group hover:bg-gray-900 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 flex items-center justify-center text-teal-200 mb-5 group-hover:bg-teal-DEFAULT/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="section max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow text-teal-DEFAULT mb-3">Guest stories</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
                What Our Guests Say
              </h2>
            </div>
            <Link href="/reviews" className="text-teal-DEFAULT text-sm font-semibold hover:underline flex-shrink-0">
              Read all {reviewCount}+ reviews →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-gold-DEFAULT" : "text-gray-200"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-display text-6xl text-teal-100 leading-none -mb-4 -mt-2 select-none">"</p>
                {review.title && (
                  <h4 className="font-semibold text-gray-900 mb-2 text-base">{review.title}</h4>
                )}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 mb-5">{review.body}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-teal-DEFAULT flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {review.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.author_name}</p>
                    {review.author_country && (
                      <p className="text-xs text-gray-400">{review.author_country}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Guide */}
      {featuredGuide && (
        <section className="bg-stone-50 border-t border-stone-200 py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text side */}
              <div>
                <p className="eyebrow text-teal-DEFAULT mb-4">Know who takes you</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Meet {featuredGuide.name.split(" ")[0]},<br />
                  <span className="italic text-gradient-gold">Your Guide</span>
                </h2>
                {featuredGuide.title && (
                  <p className="text-teal-DEFAULT font-semibold text-sm mb-4">{featuredGuide.title}</p>
                )}
                {featuredGuide.bio && (
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-4">
                    {featuredGuide.bio}
                  </p>
                )}

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {featuredGuide.years_exp && (
                    <div>
                      <p className="font-display font-bold text-3xl text-gray-900">{featuredGuide.years_exp}</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">Years exp.</p>
                    </div>
                  )}
                  {featuredGuide.avg_rating && (
                    <div>
                      <p className="font-display font-bold text-3xl text-gold-DEFAULT">{featuredGuide.avg_rating}★</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">Guest rating</p>
                    </div>
                  )}
                  {featuredGuide.review_count > 0 && (
                    <div>
                      <p className="font-display font-bold text-3xl text-gray-900">{featuredGuide.review_count}</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">Reviews</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/guides/${featuredGuide.slug}`}
                    className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-teal hover:-translate-y-0.5"
                  >
                    View Full Profile
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-teal-DEFAULT text-gray-600 hover:text-teal-DEFAULT px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  >
                    All Guides
                  </Link>
                </div>
              </div>

              {/* Photo side */}
              <div className="relative flex items-end justify-center">
                <div className="relative w-72 h-96">
                  {featuredGuide.photo_url ? (
                    <Image
                      src={featuredGuide.photo_url}
                      alt={featuredGuide.name}
                      fill
                      className="object-cover rounded-2xl shadow-2xl"
                      sizes="288px"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center shadow-2xl">
                      <span className="font-display font-bold text-8xl text-white/30">
                        {featuredGuide.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  {/* Name card overlay */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-card border border-gray-100 max-w-[180px]">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{featuredGuide.name}</p>
                    <p className="text-teal-DEFAULT text-xs mt-0.5">{featuredGuide.home_region ?? "Kenya"}</p>
                    {featuredGuide.languages && (featuredGuide.languages as string[]).length > 0 && (
                      <p className="text-gray-400 text-xs mt-1">{(featuredGuide.languages as string[]).slice(0,2).join(" · ")}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Meet The Big Five */}
      <section className="bg-gray-950 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow text-teal-200 mb-4">Kenya's iconic wildlife</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Meet the <span className="italic text-gradient-gold">Big Five</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Five animals that define the African safari. Our guides know exactly where and when to find each one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              {
                name: "Lion",
                swahili: "Simba",
                desc: "Africa's apex predator. Best spotted at dawn during their morning hunt in the golden Mara grass.",
                park: "Masai Mara",
                icon: "🦁",
                color: "from-amber-900/80",
                img: "/images/destinations/masai-mara.png",
              },
              {
                name: "Elephant",
                swahili: "Tembo",
                desc: "The largest land animal on Earth. Amboseli's herds roam beneath the snows of Kilimanjaro.",
                park: "Amboseli",
                icon: "🐘",
                color: "from-stone-900/80",
                img: "/images/destinations/nairobi.jpg",
              },
              {
                name: "Leopard",
                swahili: "Chui",
                desc: "The most elusive of the five. A master of camouflage — often spotted draped over an acacia branch.",
                park: "Masai Mara",
                icon: "🐆",
                color: "from-yellow-900/80",
                img: "/images/destinations/samburu.jpg",
              },
              {
                name: "Buffalo",
                swahili: "Nyati",
                desc: "Unpredictable and formidable. Massive herds of thousands thunder across the Mara plains.",
                park: "Masai Mara",
                icon: "🐃",
                color: "from-gray-900/80",
                img: "/images/destinations/lake-naivasha.png",
              },
              {
                name: "Rhino",
                swahili: "Kifaru",
                desc: "Critically endangered and magnificent. Ol Pejeta is home to the last northern white rhinos on Earth.",
                park: "Ol Pejeta",
                icon: "🦏",
                color: "from-teal-900/80",
                img: "/images/destinations/lake-nakuru.jpg",
              },
            ].map((animal) => (
              <div
                key={animal.name}
                className="group relative rounded-2xl overflow-hidden bg-gray-800 h-80 flex flex-col justify-end cursor-pointer"
              >
                {/* Background image */}
                <Image
                  src={animal.img}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                {/* Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${animal.color} via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-5">
                  <span className="text-2xl mb-1 block">{animal.icon}</span>
                  <p className="text-white font-display font-bold text-xl leading-tight">{animal.name}</p>
                  <p className="text-gold-DEFAULT text-xs font-semibold tracking-wider mb-2">{animal.swahili}</p>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-3 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    {animal.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 bg-teal-DEFAULT/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {animal.park}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/safaris"
              className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
            >
              See Big Five Safari Packages
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wildlife Id Showcase */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-gray-950 py-24 px-4 md:px-6 overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold-DEFAULT blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-teal-DEFAULT blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/20 border border-gold-DEFAULT/30 text-gold-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                No other Kenya operator has this
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Point. Shoot.<br />
                <span className="italic text-gradient-gold">Instantly identify.</span>
              </h2>
              <p className="text-teal-200 text-lg leading-relaxed mb-6">
                On safari and don&apos;t know what you&apos;re looking at? Our AI Wildlife Identifier tells you the species, Swahili name, fun facts, conservation status — in seconds.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Works with any photo — even blurry wildlife shots",
                  "Species name, scientific name, Swahili name",
                  "Conservation status & danger level",
                  "Best Kenya parks to see that animal",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-teal-100 text-sm">
                    <svg className="w-5 h-5 text-gold-DEFAULT flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/wildlife-id"
                className="inline-flex items-center gap-2 bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-gold"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                Try Wildlife ID Free
              </Link>
            </div>

            {/* Right — mock result card */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gold-DEFAULT/10 rounded-3xl blur-xl" />
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Photo */}
                <div className="relative h-52 bg-gray-900">
                  <Image
                    src="/images/destinations/masai-mara.png"
                    alt="Lion identified by AI"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-display font-bold text-2xl">Lion</p>
                      <p className="text-white/70 text-xs italic">Panthera leo</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-teal-DEFAULT text-white text-sm font-bold px-3 py-1 rounded-lg">Simba</div>
                      <p className="text-white/50 text-[10px] mt-0.5">Swahili</p>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-gold-DEFAULT font-semibold italic text-sm mb-3">&ldquo;Africa&apos;s apex predator — king of the savanna&rdquo;</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-center">
                      <p className="text-gray-400 text-[10px] uppercase tracking-wide">Conservation</p>
                      <p className="text-yellow-700 font-bold text-sm mt-0.5">VU · Vulnerable</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                      <p className="text-gray-400 text-[10px] uppercase tracking-wide">Danger level</p>
                      <p className="text-red-700 font-bold text-sm mt-0.5">High</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Masai Mara", "Amboseli", "Tsavo"].map(park => (
                      <span key={park} className="bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">{park}</span>
                    ))}
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-gold-DEFAULT text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  AI Identified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-stone-50 border-t border-stone-200 py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 text-teal-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Free Kenya Safari Guide
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get the insider guide — free
          </h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            Best time to visit each park, packing list, wildlife tips and exclusive deals. Used by 4,000+ travellers planning Kenya safaris.
          </p>
          <NewsletterForm />
          <p className="text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime. Sent to 4,000+ safari planners.</p>
        </div>
      </section>

      {/* Final Cta */}
      <section className="relative overflow-hidden bg-teal-900 py-28 px-4 md:px-6">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-900/90 to-gray-950/80" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-200 mb-4">Your safari starts here</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ready for Your
              <span className="italic text-gradient-gold block">Safari?</span>
            </h2>
            <p className="text-teal-100/80 text-lg mb-10 max-w-md leading-relaxed">
              Let Engai AI plan your perfect Kenya itinerary in 2 minutes — or browse our curated packages and book instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/plan-my-safari"
                className="inline-flex items-center justify-center gap-2 bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-gold hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Plan with AI
              </Link>
              <Link
                href="/safaris"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all"
              >
                Browse Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative right side stat */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6">
          {[
            { n: "10+", label: "Destinations" },
            { n: `${avgRating}★`, label: "Guest Rating" },
            { n: "4h", label: "Avg response" },
          ].map(({ n, label }) => (
            <div key={label} className="text-right">
              <p className="font-display font-bold text-4xl text-white/90">{n}</p>
              <p className="text-teal-300/70 text-xs tracking-wider uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
