"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { SafariList } from "@/types/api";
import { useCurrency } from "@/context/CurrencyContext";
import { formatPrice } from "@/lib/currency";
import { useLanguage } from "@/context/LanguageContext";



interface Props {
  safari: SafariList;
}

export default function SafariFeaturedCard({ safari }: Props) {
  const { currency, rates } = useCurrency();
  const { t } = useLanguage();
  const priceUSD = safari.price_usd_2pax;

  return (
    <Link
      href={`/safaris/${safari.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 min-h-[380px]"
    >
      {/* Background image */}
      {safari.cover_image && (
        <Image
          src={safari.cover_image}
          alt={`${safari.name} — Kenya safari package`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px"
          priority
        />
      )}

      {/* Gradient overlays — top for badges, bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30" />



      {/* Top badges */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {safari.category && (
          <span className="bg-teal-DEFAULT text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {safari.category}
          </span>
        )}
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {safari.duration_days} day{safari.duration_days > 1 ? "s" : ""}
        </span>
      </div>

      {/* Content — sits on gradient at bottom */}
      <div className="relative z-10 p-5 md:p-6">
        <h3 className="font-display text-white font-bold text-xl md:text-2xl leading-tight mb-1 group-hover:text-gold-DEFAULT transition-colors">
          {safari.name}
        </h3>

        {safari.tagline && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{safari.tagline}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            {priceUSD ? (
              <>
                <p className="text-white/70 text-xs mb-1.5 font-medium">{t("booking.from")} · {t("booking.perPerson")}</p>
                <div className="inline-flex items-baseline gap-1 bg-gold-DEFAULT px-3 py-1.5 rounded-xl shadow-gold">
                  <span className="text-white font-bold text-2xl leading-none">
                    {formatPrice(priceUSD / 2, currency, rates)}
                  </span>
                  <span className="text-white/80 text-xs font-medium">{t("booking.perPersonShort")}</span>
                </div>
              </>
            ) : null}
          </div>

          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm hover:bg-teal-DEFAULT text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors group-hover:bg-teal-DEFAULT">
            {t("booking.viewDetails")}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
