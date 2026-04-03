"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { MPesaLogo, VisaLogo, MastercardLogo } from "@/components/ui/PaymentLogos";
import NewsletterForm from "@/components/ui/NewsletterForm";
import SafariFeaturedCard from "@/components/safari/SafariFeaturedCard";
import SafariFeaturedCardSkeleton from "@/components/safari/SafariFeaturedCardSkeleton";
import type { Review, Guide, SafariList } from "@/types/api";

const DESTINATIONS = [
  { name: "Masai Mara", tag: "Big Five · Great Migration", img: "/images/destinations/masai-mara.png", href: "/destinations/masai-mara" },
  { name: "Amboseli", tag: "Elephants · Kilimanjaro Views", img: "/images/destinations/nairobi.jpg", href: "/destinations/amboseli" },
  { name: "Lake Naivasha", tag: "Flamingos · Hell's Gate", img: "/images/destinations/lake-naivasha.png", href: "/destinations/lake-naivasha" },
  { name: "Samburu", tag: "Rare species · Remote wilderness", img: "/images/destinations/samburu.jpg", href: "/destinations/samburu" },
  { name: "Lake Nakuru", tag: "Rhinos · Flamingo lake", img: "/images/destinations/lake-nakuru.jpg", href: "/destinations/lake-nakuru" },
];

const BIG_FIVE = [
  { name: "Lion", swahili: "Simba", desc: "Africa's apex predator. Best spotted at dawn during their morning hunt in the golden Mara grass.", park: "Masai Mara", icon: "🦁", color: "from-amber-900/80", img: "/images/destinations/masai-mara.png" },
  { name: "Elephant", swahili: "Tembo", desc: "The largest land animal on Earth. Amboseli's herds roam beneath the snows of Kilimanjaro.", park: "Amboseli", icon: "🐘", color: "from-stone-900/80", img: "/images/destinations/nairobi.jpg" },
  { name: "Leopard", swahili: "Chui", desc: "The most elusive of the five. A master of camouflage — often spotted draped over an acacia branch.", park: "Masai Mara", icon: "🐆", color: "from-yellow-900/80", img: "/images/destinations/samburu.jpg" },
  { name: "Buffalo", swahili: "Nyati", desc: "Unpredictable and formidable. Massive herds of thousands thunder across the Mara plains.", park: "Masai Mara", icon: "🐃", color: "from-gray-900/80", img: "/images/destinations/lake-naivasha.png" },
  { name: "Rhino", swahili: "Kifaru", desc: "Critically endangered and magnificent. Ol Pejeta is home to the last northern white rhinos on Earth.", park: "Ol Pejeta", icon: "🦏", color: "from-teal-900/80", img: "/images/destinations/lake-nakuru.jpg" },
];

interface Props {
  reviews: Review[];
  safaris: SafariList[];
  featuredGuide: Guide | null;
  avgRating: string;
  reviewCount: number;
}

export default function HomePageSections({ reviews, safaris, featuredGuide, avgRating, reviewCount }: Props) {
  const { t } = useLanguage();

  const FEATURES = [
    { titleKey: "home.f1Title" as const, descKey: "home.f1Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" /></svg> },
    { titleKey: "home.f2Title" as const, descKey: "home.f2Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> },
    { titleKey: "home.f3Title" as const, descKey: "home.f3Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
    { titleKey: "home.f4Title" as const, descKey: "home.f4Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg> },
    { titleKey: "home.f5Title" as const, descKey: "home.f5Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3M6.75 12H9m-2.25 3.75H9" /></svg> },
    { titleKey: "home.f6Title" as const, descKey: "home.f6Desc" as const, icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> },
  ];

  return (
    <>
      {/* Social Proof Strip */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold-DEFAULT" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {avgRating}/5 · {reviewCount}+ {t("home.trustedBy").split(" ").slice(2).join(" ")}
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t("home.bigFiveEvery")}
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
              {t("home.kenyaTRA")}
            </span>
            <span className="hidden sm:block text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {t("home.noFees")}
            </span>
          </div>
        </div>
      </section>

      {/* Trust Credentials */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-7">{t("home.trustedBy")}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-teal-50 border border-teal-100 rounded-full">
              <svg className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
              </svg>
              <span className="text-xs font-semibold text-teal-800">{t("home.tra")}</span>
            </div>
            <a href="https://g.page/r/engaisafaris/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-sm transition-all">
              <svg viewBox="0 0 48 48" className="w-4 h-4 flex-shrink-0">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.6 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.6-1.8 14.5-5l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.6 41.5 15.3 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.7-4.8 6.2l6.7 5.5C42.2 36.4 46 30.7 46 24c0-1.3-.2-2.7-.5-4z"/>
              </svg>
              <span className="text-xs font-semibold text-gray-700">{t("home.tra").startsWith("TRA") ? "4.9★ Google" : "4.9★ Google"}</span>
            </a>
            <a href="https://www.tripadvisor.com/engaisafaris" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-sm transition-all">
              <svg viewBox="0 0 60 60" className="w-4 h-4 flex-shrink-0">
                <circle cx="15" cy="35" r="10" fill="#34E0A1"/><circle cx="45" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="30" cy="20" r="8" fill="#fff" stroke="#34E0A1" strokeWidth="2"/>
                <path d="M5 25 Q15 10 30 12 Q45 10 55 25" stroke="#34E0A1" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="35" r="4" fill="#fff"/><circle cx="45" cy="35" r="4" fill="#fff"/>
              </svg>
              <span className="text-xs font-semibold text-gray-700">5.0 TripAdvisor</span>
            </a>
            <a href="https://www.safaribookings.com/engaisafaris" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-4 h-4 rounded-full bg-[#E07B00] flex items-center justify-center flex-shrink-0"><span className="text-white text-[8px] font-bold leading-none">SB</span></div>
              <span className="text-xs font-semibold text-gray-700">{t("home.topOperator")}</span>
            </a>
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 flex flex-col">
                <div className="flex-1 bg-[#006600]" /><div className="flex-1 bg-[#cc0000]" /><div className="flex-1 bg-black" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{t("home.kenyaOwned")}</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full">
              <svg className="w-4 h-4 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">{t("home.noFees")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Safaris */}
      <section className="section max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow text-teal-DEFAULT mb-3">{t("home.featuredEyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t("home.featuredTitle")}</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">{t("home.featuredDesc")}</p>
        </div>
        {safaris.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safaris.map((safari, i) => (
              <SafariFeaturedCard key={safari.id} safari={safari} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SafariFeaturedCardSkeleton key={i} />)}
          </div>
        )}
        <div className="text-center mt-10">
          <Link href="/safaris" className="inline-flex items-center gap-2 border-2 border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all">
            {t("home.viewAllSafaris")}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Destinations Strip */}
      <section className="bg-stone-50 border-t border-stone-200 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
          <p className="eyebrow text-teal-DEFAULT mb-3">{t("home.destEyebrow")}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">{t("home.destTitle")}</h2>
        </div>
        <div className="flex gap-4 px-4 md:px-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {DESTINATIONS.map((dest) => (
            <Link key={dest.name} href={dest.href} className="flex-shrink-0 w-[75vw] sm:w-72 md:w-64 h-80 rounded-2xl overflow-hidden relative group snap-start hover-lift">
              <Image src={dest.img} alt={`${dest.name} — ${dest.tag}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="256px" />
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
            <p className="eyebrow text-teal-200 mb-3">{t("home.whyEyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg">
              {t("home.whyTitle1")}<br />{t("home.whyTitle2")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {FEATURES.map((f) => (
              <div key={f.titleKey} className="bg-gray-950 p-8 group hover:bg-gray-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 flex items-center justify-center text-teal-200 mb-5 group-hover:bg-teal-DEFAULT/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{t(f.titleKey)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(f.descKey)}</p>
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
              <p className="eyebrow text-teal-DEFAULT mb-3">{t("home.reviewsEyebrow")}</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">{t("home.reviewsTitle")}</h2>
            </div>
            <Link href="/reviews" className="text-teal-DEFAULT text-sm font-semibold hover:underline flex-shrink-0">
              {t("home.reviewsReadAll").replace("{n}", String(reviewCount))}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-gold-DEFAULT" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <svg className="w-7 h-7 text-teal-100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                {review.title && <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">{review.title}</h4>}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 flex-1 mb-5">{review.body}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {review.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.author_name}</p>
                    {review.author_country && <p className="text-xs text-gray-400">{review.author_country}</p>}
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
              <div>
                <p className="eyebrow text-teal-DEFAULT mb-4">{t("home.guideEyebrow")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {t("home.guideMeet")} {featuredGuide.name.split(" ")[0]},<br />
                  <span className="italic text-gradient-gold">{t("home.guideTitle2")}</span>
                </h2>
                {featuredGuide.title && <p className="text-teal-DEFAULT font-semibold text-sm mb-4">{featuredGuide.title}</p>}
                {featuredGuide.bio && <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-4">{featuredGuide.bio}</p>}
                <div className="flex flex-wrap gap-6 mb-8">
                  {featuredGuide.years_exp && <div><p className="font-display font-bold text-3xl text-gray-900">{featuredGuide.years_exp}</p><p className="text-gray-400 text-xs uppercase tracking-wider">{t("home.guideYearsExp")}</p></div>}
                  {featuredGuide.avg_rating && <div><p className="font-display font-bold text-3xl text-gold-DEFAULT">{featuredGuide.avg_rating}★</p><p className="text-gray-400 text-xs uppercase tracking-wider">{t("home.guideRating")}</p></div>}
                  {featuredGuide.review_count > 0 && <div><p className="font-display font-bold text-3xl text-gray-900">{featuredGuide.review_count}</p><p className="text-gray-400 text-xs uppercase tracking-wider">{t("home.guideReviews")}</p></div>}
                </div>
                <div className="flex gap-3">
                  <Link href={`/guides/${featuredGuide.slug}`} className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-teal hover:-translate-y-0.5">
                    {t("home.guideViewProfile")}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <Link href="/guides" className="inline-flex items-center gap-2 border border-gray-200 hover:border-teal-DEFAULT text-gray-600 hover:text-teal-DEFAULT px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                    {t("home.guideAllGuides")}
                  </Link>
                </div>
              </div>
              <div className="relative flex items-end justify-center">
                <div className="relative w-72 h-96">
                  {featuredGuide.photo_url ? (
                    <Image src={featuredGuide.photo_url} alt={featuredGuide.name} fill className="object-cover rounded-2xl shadow-2xl" sizes="288px" />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center shadow-2xl">
                      <span className="font-display font-bold text-8xl text-white/30">{featuredGuide.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("")}</span>
                    </div>
                  )}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-card border border-gray-100 max-w-[180px]">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{featuredGuide.name}</p>
                    <p className="text-teal-DEFAULT text-xs mt-0.5">{featuredGuide.home_region ?? "Kenya"}</p>
                    {featuredGuide.languages && featuredGuide.languages.length > 0 && (
                      <p className="text-gray-400 text-xs mt-1">{featuredGuide.languages.slice(0, 2).join(" · ")}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Big Five */}
      <section className="bg-gray-950 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow text-teal-200 mb-4">{t("home.bigFiveEyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              {t("home.bigFiveTitle")} <span className="italic text-gradient-gold">{t("home.bigFiveItalic")}</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto leading-relaxed">{t("home.bigFiveDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {BIG_FIVE.map((animal) => (
              <div key={animal.name} className="group relative rounded-2xl overflow-hidden bg-gray-800 h-80 flex flex-col justify-end cursor-pointer">
                <Image src={animal.img} alt={animal.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
                <div className={`absolute inset-0 bg-gradient-to-t ${animal.color} via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <span className="text-2xl mb-1 block">{animal.icon}</span>
                  <p className="text-white font-display font-bold text-xl leading-tight">{animal.name}</p>
                  <p className="text-gold-DEFAULT text-xs font-semibold tracking-wider mb-2">{animal.swahili}</p>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-3 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">{animal.desc}</p>
                  <span className="inline-flex items-center gap-1 bg-teal-DEFAULT/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {animal.park}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/safaris" className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
              {t("home.bigFiveCta")}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wildlife ID Showcase */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-gray-950 py-24 px-4 md:px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold-DEFAULT blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-teal-DEFAULT blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/20 border border-gold-DEFAULT/30 text-gold-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                {t("home.widBadge")}
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                {t("home.widTitle1")}<br /><span className="italic text-gradient-gold">{t("home.widTitle2")}</span>
              </h2>
              <p className="text-teal-200 text-lg leading-relaxed mb-6">{t("home.widDesc")}</p>
              <ul className="space-y-3 mb-8">
                {([t("home.widF1"), t("home.widF2"), t("home.widF3"), t("home.widF4")] as string[]).map((point) => (
                  <li key={point} className="flex items-start gap-3 text-teal-100 text-sm">
                    <svg className="w-5 h-5 text-gold-DEFAULT flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href="/wildlife-id" className="inline-flex items-center gap-2 bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-gold">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>
                {t("home.widCta")}
              </Link>
            </div>
            {/* Mock result card — kept in EN as it's a UI demo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gold-DEFAULT/10 rounded-3xl blur-xl" />
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-52 bg-gray-900">
                  <Image src="/images/destinations/masai-mara.png" alt="Lion identified by AI" fill className="object-cover" sizes="600px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div><p className="text-white font-display font-bold text-2xl">Lion</p><p className="text-white/70 text-xs italic">Panthera leo</p></div>
                    <div className="text-right"><div className="bg-teal-DEFAULT text-white text-sm font-bold px-3 py-1 rounded-lg">Simba</div><p className="text-white/50 text-[10px] mt-0.5">Swahili</p></div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gold-DEFAULT font-semibold italic text-sm mb-3">&ldquo;Africa&apos;s apex predator, king of the savanna&rdquo;</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-center"><p className="text-gray-400 text-[10px] uppercase tracking-wide">Conservation</p><p className="text-yellow-700 font-bold text-sm mt-0.5">VU · Vulnerable</p></div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center"><p className="text-gray-400 text-[10px] uppercase tracking-wide">Danger level</p><p className="text-red-700 font-bold text-sm mt-0.5">High</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Masai Mara", "Amboseli", "Tsavo"].map(park => (
                      <span key={park} className="bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">{park}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-gold-DEFAULT text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">AI Identified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-stone-50 border-t border-stone-200 py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 text-teal-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            {t("home.nlBadge")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t("home.nlTitle")}</h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">{t("home.nlDesc")}</p>
          <NewsletterForm />
          <p className="text-gray-400 text-xs mt-3">{t("home.nlNoSpam")}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-teal-900 py-28 px-4 md:px-6">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-900/90 to-gray-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-200 mb-4">{t("home.ctaEyebrow")}</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {t("home.ctaTitle1")}
              <span className="italic text-gradient-gold block">{t("home.ctaTitle2")}</span>
            </h2>
            <p className="text-teal-100/80 text-lg mb-10 max-w-md leading-relaxed">{t("home.ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/plan-my-safari" className="inline-flex items-center justify-center gap-2 bg-gold-DEFAULT hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-gold hover:-translate-y-0.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                {t("home.ctaPlanAi")}
              </Link>
              <Link href="/safaris" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all">
                {t("home.ctaBrowse")}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6">
          {[
            { n: "10+", label: t("home.ctaDestStat") },
            { n: `${avgRating}★`, label: t("home.ctaRatingStat") },
            { n: "4h", label: t("home.ctaRespStat") },
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
