"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  avgRating: string;
  reviewCount: number;
}

export default function HeroSection({ avgRating, reviewCount }: Props) {
  const { t } = useLanguage();

  return (
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
              {t("hero.eyebrow")}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-teal-DEFAULT/90 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              {t("hero.badge")}
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white leading-[0.92] mb-6">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {t("hero.headline1")}
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic text-gradient-gold">
              {t("hero.headline2")}
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-xl">
            {t("hero.subtext")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/safaris"
              className="inline-flex items-center justify-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-teal hover:-translate-y-0.5"
            >
              {t("hero.browseSafaris")}
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
              {t("hero.aiPlanner")}
            </Link>
          </div>
        </div>
      </div>

      {/* Floating stats — desktop only */}
      <div className="absolute bottom-10 right-6 md:right-12 hidden lg:grid grid-cols-3 gap-px glass-dark rounded-2xl overflow-hidden">
        {[
          { value: `${avgRating}★`, label: t("hero.statRating") },
          { value: `${reviewCount}+`, label: t("hero.statGuests") },
          { value: "10+", label: t("hero.statDestinations") },
        ].map(({ value, label }) => (
          <div key={label} className="px-6 py-4 text-center">
            <p className="font-display font-bold text-xl text-white">{value}</p>
            <p className="text-xs text-white/55 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
        <span className="text-[10px] tracking-[0.2em] uppercase">{t("hero.scroll")}</span>
        <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
