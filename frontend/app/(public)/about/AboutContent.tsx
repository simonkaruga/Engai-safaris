"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const VALUE_ICONS = [
  (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
];

const MILESTONES = [
  { year: "2023", event: "Engai Safaris founded in Nairobi" },
  { year: "2024", event: "First 100 guests. 4.9★ average maintained." },
  { year: "2025", event: "AI safari planner launched. Instant booking enabled." },
  { year: "2026", event: "10+ destinations. 6 certified guides. Growing." },
];

export default function AboutContent() {
  const { t } = useLanguage();

  const VALUES = [
    { icon: VALUE_ICONS[0], titleKey: "about.transparency" as const, descKey: "about.transparencyDesc" as const },
    { icon: VALUE_ICONS[1], titleKey: "about.kenyaFirst" as const, descKey: "about.kenyaFirstDesc" as const },
    { icon: VALUE_ICONS[2], titleKey: "about.honestExpertise" as const, descKey: "about.honestExpertiseDesc" as const },
    { icon: VALUE_ICONS[3], titleKey: "about.techNative" as const, descKey: "about.techNativeDesc" as const },
  ];

  const STATS = [
    { value: "4.9★", labelKey: "about.avgRating" as const },
    { value: "312+", labelKey: "about.safarisCompleted" as const },
    { value: "6",    labelKey: "about.certGuides" as const },
    { value: "10+",  labelKey: "about.destinations" as const },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-stone-100 overflow-hidden pt-20 pb-24 px-4 md:px-6 border-b border-stone-100">
        <div className="absolute inset-0 opacity-[0.05]">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="eyebrow text-teal-DEFAULT mb-4">{t("about.ourStory")}</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-[0.92] mb-6">
              {t("about.builtBy").split(".")[0]}.<br />
              <span className="italic text-gradient-gold">{t("about.builtBy").split(". ")[1]}</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed max-w-xl">
              {t("about.story")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 rounded-2xl overflow-hidden mt-16 max-w-2xl">
            {STATS.map(({ value, labelKey }) => (
              <div key={labelKey} className="bg-white px-6 py-5 text-center">
                <p className="font-display font-bold text-2xl text-gray-900">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{t(labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-teal-DEFAULT mb-4">{t("about.theName")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Engai.<br />
              <span className="text-teal-DEFAULT">{t("about.nameExplain")}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Engai is the supreme sky deity of the Maasai people, the divine force governing
              rain, life, cattle, and the land. The Maasai are the original custodians of the
              Great Rift Valley, the plains of the Mara, the slopes of Kilimanjaro.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              When a guest learns what the name means, they never forget it.
              The name is the mission: to connect the world to the most extraordinary
              landscape on earth, with the respect it deserves.
            </p>
          </div>

          {/* Quote block */}
          <div className="bg-gray-950 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-6 left-8 font-display text-9xl text-teal-DEFAULT/10 leading-none select-none">&quot;</div>
            <blockquote className="relative z-10">
              <p className="font-display text-2xl text-white leading-relaxed italic mb-6">
                Where the Sky Meets the Wild.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                No tourism brand on earth had claimed the name Engai. A name with ten thousand years
                of meaning behind it, spoken by warriors who walked these plains before the first
                tourist arrived. We chose it deliberately. We carry it carefully.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* The Problem We Solved */}
      <section className="bg-stone-50 border-y border-stone-200 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow text-teal-DEFAULT mb-4">Why we exist</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The problem we solved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                problem: "\"Contact us for a quote\"",
                solution: "We show you the price. Every safari. Every page. No forms, no waiting, no negotiation.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
              },
              {
                problem: "30–300% international markup",
                solution: "We sell direct, at Kenyan prices. No middlemen. No London offices adding margin for doing nothing.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
              },
              {
                problem: "Anonymous drivers",
                solution: "You see your guide's full profile: photo, bio, certifications, 14 years of experience, before you book.",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
              },
            ].map(({ problem, solution, icon }) => (
              <div key={problem} className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-DEFAULT mb-5">{icon}</div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">The old way</p>
                <p className="font-display font-bold text-gray-400 text-xl mb-5 line-through decoration-maasai-DEFAULT decoration-2">
                  {problem}
                </p>
                <p className="text-xs font-semibold text-teal-DEFAULT uppercase tracking-wider mb-3">The Engai way</p>
                <p className="text-gray-700 text-sm leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-950 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="eyebrow text-teal-200 mb-4">{t("about.ourValues")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg">
              {t("about.valuesTagline")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {VALUES.map((v) => (
              <div key={v.titleKey} className="bg-gray-950 p-8 group hover:bg-gray-900 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 flex items-center justify-center text-teal-300 mb-5 group-hover:bg-teal-DEFAULT/20 transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{t(v.titleKey)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow text-teal-DEFAULT mb-4">Our journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              From idea to<br />East Africa&apos;s most<br />honest operator.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              We started with a simple conviction: Kenya&apos;s safari industry was built for
              the benefit of foreign intermediaries, not Kenyan guides or informed travellers.
              We are fixing that, one transparent booking at a time.
            </p>
          </div>

          <div className="space-y-0">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-DEFAULT flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {year.slice(2)}
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-px flex-1 bg-teal-DEFAULT/20 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-teal-DEFAULT mb-1 uppercase tracking-wider">{year}</p>
                  <p className="text-gray-700 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-teal-DEFAULT py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/destinations/masai-mara.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-DEFAULT via-teal-DEFAULT/95 to-teal-900/80" />

        <div className="relative max-w-7xl mx-auto text-center">
          <p className="eyebrow text-teal-100 mb-4">{t("about.mission")}</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl mx-auto">
            {t("about.missionText")}
          </h2>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Year 1: Own Kenya. Year 2: Own East Africa. Year 3–5: Own the continent.
            We are not being modest. We are being accurate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/safaris"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-DEFAULT hover:bg-teal-50 font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              {t("about.browseSafaris")}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Meet Our Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
