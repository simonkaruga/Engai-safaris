"use client";

import { useState, type ReactNode } from "react";
import SafariCard from "@/components/safari/SafariCard";
import SafariFeaturedCard from "@/components/safari/SafariFeaturedCard";
import Image from "next/image";
import Link from "next/link";
import type { SafariList } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";

import type { TranslationKey } from "@/lib/i18n";

interface Category {
  value: string;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  icon: ReactNode;
}

const CATEGORIES: Category[] = [
  {
    value: "",
    labelKey: "safaris.allSafaris",
    descKey: "safaris.allSafarisDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    value: "classic",
    labelKey: "safaris.classic",
    descKey: "safaris.classicDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: "luxury",
    labelKey: "safaris.luxury",
    descKey: "safaris.luxuryDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    value: "adventures",
    labelKey: "safaris.adventures",
    descKey: "safaris.adventuresDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    value: "cultural",
    labelKey: "safaris.cultural",
    descKey: "safaris.culturalDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    value: "photography",
    labelKey: "safaris.photography",
    descKey: "safaris.photographyDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    value: "corporate",
    labelKey: "safaris.corporate",
    descKey: "safaris.corporateDesc",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const CATEGORY_ACCENT: Record<string, string> = {
  "":            "bg-teal-DEFAULT text-white border-teal-DEFAULT",
  classic:       "bg-teal-DEFAULT text-white border-teal-DEFAULT",
  luxury:        "bg-gold-DEFAULT text-white border-gold-DEFAULT",
  adventures:    "bg-maasai-DEFAULT text-white border-maasai-DEFAULT",
  cultural:      "bg-purple-600 text-white border-purple-600",
  photography:   "bg-gray-900 text-white border-gray-900",
  corporate:     "bg-gray-700 text-white border-gray-700",
};

interface Props {
  safaris: SafariList[];
  initialCategory: string;
}

export default function SafarisContent({ safaris, initialCategory }: Props) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredSafaris = activeCategory
    ? safaris.filter((s) => s.category === activeCategory)
    : safaris;

  const isFiltered = Boolean(activeCategory);
  const activeCat = CATEGORIES.find((c) => c.value === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-950 pt-36 pb-20 px-4 md:px-6 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0">
          <Image src="/images/safaris/3-day-masai-mara.png" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/40" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-300 mb-4">{t("safaris.subtitle")}</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Kenya Safari<br />
              <span className="italic text-gradient-gold">Packages.</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl">
              {t("safaris.subtext")}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        {/* Category filter */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Browse by type</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? CATEGORY_ACCENT[cat.value]
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600 transition-colors"}>
                    {cat.icon}
                  </span>
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>

          {/* Active category description */}
          {activeCat && activeCat.value && (
            <div className="mt-5 flex items-center gap-3">
              <div className={`w-1 h-6 rounded-full ${CATEGORY_ACCENT[activeCat.value].split(" ")[0]}`} />
              <p className="text-gray-500 text-sm">
                {t("safaris.showing")} <span className="font-semibold text-gray-800">{t(activeCat.labelKey)}</span> safaris
                {filteredSafaris.length > 0 && (
                  <> · <span className="text-teal-DEFAULT font-semibold">{filteredSafaris.length} {t("safaris.packages")}</span></>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Safari grid */}
        {filteredSafaris.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg mb-4">{t("safaris.noneYet")}</p>
            <button
              onClick={() => setActiveCategory("")}
              className="text-teal-DEFAULT font-semibold hover:underline text-sm"
            >
              {t("safaris.viewAll")}
            </button>
          </div>
        ) : isFiltered ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSafaris.map((safari) => (
              <SafariCard key={safari.id} safari={safari} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSafaris.map((safari) => (
              <SafariFeaturedCard key={safari.id} safari={safari} />
            ))}
            {filteredSafaris.length === 1 && (
              <div className="md:col-span-2 lg:col-span-2" />
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-stone-50 border-t border-stone-200 py-16 px-4 md:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
            {t("safaris.readyToBook")}
          </h2>
          <Link
            href="/plan-my-safari"
            className="inline-flex items-center gap-2 bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-teal hover:-translate-y-0.5"
          >
            {t("safaris.planWithAi")}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
