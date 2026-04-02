"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SafariFull {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: string | null;
  duration_days: number;
  group_size_max: number;
  price_usd_solo: number | null;
  price_usd_2pax: number | null;
  price_usd_4pax: number | null;
  price_usd_6pax: number | null;
  price_kes_solo: number | null;
  price_kes_2pax: number | null;
  price_kes_4pax: number | null;
  price_kes_6pax: number | null;
  wholesale_usd: number | null;
  deposit_pct: number;
  installments_ok: boolean;
  difficulty: string | null;
  peak_multiplier: number | null;
  low_multiplier: number | null;
  is_shared: boolean;
  has_beach_extension: boolean;
  beach_extension_days: number | null;
  beach_extension_price_usd: number | null;
  beach_extension_price_kes: number | null;
  beach_extension_desc: string | null;
  // Cost tracking (admin only)
  cost_park_fees_usd: number | null;
  cost_accommodation_usd: number | null;
  cost_vehicle_usd: number | null;
  cost_insurance_usd: number | null;
  cost_evac_usd: number | null;
  cover_image: string | null;
  video_url: string | null;
  gallery: string[];
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  cancellation_policy: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_desc: string | null;
}

const CATEGORIES = ["classic", "luxury", "adventures", "cultural", "photography", "corporate"];
const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT bg-white";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function SafariEditorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  const [safari, setSafari] = useState<SafariFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [tab, setTab] = useState<"basic" | "pricing" | "content" | "media" | "seo">("basic");

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${API}/api/admin/safaris`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then((all: SafariFull[]) => {
        const found = all.find(s => s.id === id || s.slug === id);
        if (found) setSafari({ ...found, gallery: found.gallery ?? [] });
        else router.push("/admin/safaris");
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [id, token, API, router]);

  const set = useCallback(<K extends keyof SafariFull>(key: K, value: SafariFull[K]) => {
    setSafari(prev => prev ? { ...prev, [key]: value } : prev);
  }, []);

  const save = async () => {
    if (!safari) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/safaris/${safari.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: safari.name,
          tagline: safari.tagline || null,
          description: safari.description || null,
          category: safari.category || null,
          duration_days: Number(safari.duration_days),
          group_size_max: Number(safari.group_size_max),
          price_usd_solo: safari.price_usd_solo ? Number(safari.price_usd_solo) : null,
          price_usd_2pax: safari.price_usd_2pax ? Number(safari.price_usd_2pax) : null,
          price_usd_4pax: safari.price_usd_4pax ? Number(safari.price_usd_4pax) : null,
          price_usd_6pax: safari.price_usd_6pax ? Number(safari.price_usd_6pax) : null,
          price_kes_solo: safari.price_kes_solo ? Number(safari.price_kes_solo) : null,
          price_kes_2pax: safari.price_kes_2pax ? Number(safari.price_kes_2pax) : null,
          price_kes_4pax: safari.price_kes_4pax ? Number(safari.price_kes_4pax) : null,
          price_kes_6pax: safari.price_kes_6pax ? Number(safari.price_kes_6pax) : null,
          wholesale_usd: safari.wholesale_usd ? Number(safari.wholesale_usd) : null,
          cost_park_fees_usd: safari.cost_park_fees_usd ? Number(safari.cost_park_fees_usd) : null,
          cost_accommodation_usd: safari.cost_accommodation_usd ? Number(safari.cost_accommodation_usd) : null,
          cost_vehicle_usd: safari.cost_vehicle_usd ? Number(safari.cost_vehicle_usd) : null,
          cost_insurance_usd: safari.cost_insurance_usd ? Number(safari.cost_insurance_usd) : null,
          cost_evac_usd: safari.cost_evac_usd ? Number(safari.cost_evac_usd) : null,
          peak_multiplier: safari.peak_multiplier ? Number(safari.peak_multiplier) : null,
          low_multiplier: safari.low_multiplier ? Number(safari.low_multiplier) : null,
          difficulty: safari.difficulty || null,
          is_shared: safari.is_shared,
          deposit_pct: Number(safari.deposit_pct),
          installments_ok: safari.installments_ok,
          cover_image: safari.cover_image || null,
          video_url: safari.video_url || null,
          gallery: safari.gallery,
          highlights: safari.highlights?.length ? safari.highlights : null,
          inclusions: safari.inclusions?.length ? safari.inclusions : null,
          exclusions: safari.exclusions?.length ? safari.exclusions : null,
          cancellation_policy: safari.cancellation_policy || null,
          is_active: safari.is_active,
          is_featured: safari.is_featured,
          sort_order: Number(safari.sort_order),
          meta_title: safari.meta_title || null,
          meta_desc: safari.meta_desc || null,
        }),
      });
      if (res.ok) showToast("Saved!");
      else showToast("Save failed.", false);
    } catch {
      showToast("Network error.", false);
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, target: "cover" | "gallery") => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "safaris");
      const res = await fetch(`${API}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      if (target === "cover") {
        set("cover_image", url);
        showToast("Cover image uploaded!");
      } else {
        setSafari(prev => prev ? { ...prev, gallery: [...prev.gallery, url] } : prev);
        showToast("Photo added to gallery!");
      }
    } catch {
      showToast("Upload failed. Check Cloudinary config.", false);
    } finally {
      setUploading(false);
    }
  };

  const editList = (key: "highlights" | "inclusions" | "exclusions", raw: string) => {
    const items = raw.split("\n").map(s => s.trim()).filter(Boolean);
    set(key, items.length ? items : null);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!safari) return null;

  const TABS = [
    { key: "basic" as const, label: "Basic Info" },
    { key: "pricing" as const, label: "Pricing" },
    { key: "content" as const, label: "Content" },
    { key: "media" as const, label: "Photos & Video" },
    { key: "seo" as const, label: "SEO" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Link href="/admin/safaris" className="text-sm text-teal-DEFAULT hover:underline">← All Safaris</Link>
          <h1 className="font-display text-2xl font-bold mt-1">{safari.name}</h1>
          <p className="text-gray-400 text-xs font-mono mt-0.5">{safari.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/safaris/${safari.slug}`} target="_blank" rel="noopener noreferrer"
            className="text-xs border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50">
            Preview ↗
          </Link>
          <button onClick={save} disabled={saving}
            className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-5 py-2 rounded-xl font-semibold text-sm disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Status toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { label: "Active (visible on site)", key: "is_active" as const },
          { label: "Featured (homepage)", key: "is_featured" as const },
          { label: "Lipa Polepole (instalments)", key: "installments_ok" as const },
        ]).map(({ label, key }) => (
          <button key={key} onClick={() => set(key, !safari[key])}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              safari[key] ? "bg-teal-DEFAULT text-white border-teal-DEFAULT" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}>
            {safari[key] ? "✓" : "○"} {label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-gray-200 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === t.key ? "border-teal-DEFAULT text-teal-DEFAULT" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-5">

        {/* BASIC INFO */}
        {tab === "basic" && <>
          <Field label="Safari Name">
            <input value={safari.name} onChange={e => set("name", e.target.value)} className={inp} />
          </Field>
          <Field label="Tagline" hint="Short punchy line shown on cards and listings">
            <input value={safari.tagline ?? ""} onChange={e => set("tagline", e.target.value)}
              className={inp} placeholder="e.g. The ultimate Mara experience" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select value={safari.category ?? ""} onChange={e => set("category", e.target.value)} className={inp}>
                <option value="">None</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Duration (days)">
              <input type="number" min={1} max={30} value={safari.duration_days}
                onChange={e => set("duration_days", Number(e.target.value))} className={inp} />
            </Field>
            <Field label="Max Group Size">
              <input type="number" min={1} max={20} value={safari.group_size_max}
                onChange={e => set("group_size_max", Number(e.target.value))} className={inp} />
            </Field>
            <Field label="Sort Order" hint="Lower number = appears first in listings">
              <input type="number" value={safari.sort_order}
                onChange={e => set("sort_order", Number(e.target.value))} className={inp} />
            </Field>
            <Field label="Difficulty" hint="Shown on safari detail page">
              <select value={safari.difficulty ?? ""} onChange={e => set("difficulty", e.target.value || null)} className={inp}>
                <option value="">Not set</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </Field>
          </div>
        </>}

        {/* PRICING */}
        {tab === "pricing" && <>
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm text-teal-800">
            Prices are the <strong>total for the whole group</strong>. The website divides by group size to show the per-person rate.
          </div>

          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">USD Prices</p>
          <div className="grid grid-cols-2 gap-4">
            {([
              { label: "Solo (1 person)", key: "price_usd_solo" as const },
              { label: "2 People", key: "price_usd_2pax" as const },
              { label: "4 People", key: "price_usd_4pax" as const },
              { label: "6 People", key: "price_usd_6pax" as const },
            ]).map(({ label, key }) => (
              <Field key={key} label={label}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                  <input type="number" min={0} value={safari[key] ?? ""}
                    onChange={e => set(key, e.target.value ? Number(e.target.value) : null)}
                    className={inp + " pl-7"} placeholder="0" />
                </div>
              </Field>
            ))}
          </div>

          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">KES Prices</p>
          <div className="grid grid-cols-2 gap-4">
            {([
              { label: "Solo (1 person)", key: "price_kes_solo" as const },
              { label: "2 People", key: "price_kes_2pax" as const },
              { label: "4 People", key: "price_kes_4pax" as const },
              { label: "6 People", key: "price_kes_6pax" as const },
            ]).map(({ label, key }) => (
              <Field key={key} label={label}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">KES</span>
                  <input type="number" min={0} value={safari[key] ?? ""}
                    onChange={e => set(key, e.target.value ? Number(e.target.value) : null)}
                    className={inp + " pl-12"} placeholder="0" />
                </div>
              </Field>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <Field label="Wholesale USD (agent price)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                <input type="number" min={0} value={safari.wholesale_usd ?? ""}
                  onChange={e => set("wholesale_usd", e.target.value ? Number(e.target.value) : null)}
                  className={inp + " pl-7"} placeholder="0" />
              </div>
            </Field>
            <Field label="Deposit %" hint="Percentage required to confirm booking">
              <input type="number" min={10} max={100} value={safari.deposit_pct}
                onChange={e => set("deposit_pct", Number(e.target.value))} className={inp} />
            </Field>
          </div>

          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Seasonal Multipliers</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Peak Season Multiplier" hint="Jul–Oct Great Migration. Default: 1.35 (+35%)">
              <input type="number" min={1} max={3} step={0.05} value={safari.peak_multiplier ?? 1.35}
                onChange={e => set("peak_multiplier", Number(e.target.value))} className={inp} />
            </Field>
            <Field label="Low Season Multiplier" hint="Apr–May long rains. Default: 0.75 (−25%)">
              <input type="number" min={0.5} max={1} step={0.05} value={safari.low_multiplier ?? 0.75}
                onChange={e => set("low_multiplier", Number(e.target.value))} className={inp} />
            </Field>
          </div>

          {/* Cost Breakdown — admin only */}
          <div className="mt-4 border border-amber-200 bg-amber-50 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Cost Breakdown (Admin Only — Not Shown to Customers)</p>
              <p className="text-xs text-amber-700 mt-1">
                Enter your actual costs per person (based on 4pax group). The margin calculator below will update live.
                KWS park fees 2024/25: Mara $80/day · Amboseli $90/day · Nakuru $60/day · Hell&apos;s Gate $26 · Mt Kenya $52/day.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {([
                { label: "Park Fees (per person)", key: "cost_park_fees_usd" as const, hint: "Total KWS fees per person for all parks visited" },
                { label: "Accommodation (per person/night)", key: "cost_accommodation_usd" as const, hint: "Your net/contract rate per person per night" },
                { label: "Vehicle Hire (per day total)", key: "cost_vehicle_usd" as const, hint: "Full vehicle cost per day — divided by group size in margin calc" },
                { label: "Insurance (per person/trip)", key: "cost_insurance_usd" as const, hint: "Vehicle + passenger liability insurance share per person" },
                { label: "AMREF Evacuation (per person)", key: "cost_evac_usd" as const, hint: "AMREF emergency evacuation cover per person" },
              ]).map(({ label, key, hint }) => (
                <Field key={key} label={label} hint={hint}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm font-medium">$</span>
                    <input type="number" min={0} value={safari[key] ?? ""}
                      onChange={e => set(key, e.target.value ? Number(e.target.value) : null)}
                      className="w-full border border-amber-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white pl-7" placeholder="0" />
                  </div>
                </Field>
              ))}
            </div>

            {/* Live margin calculator */}
            {(() => {
              const parkFees = safari.cost_park_fees_usd ?? 0;
              const accPerNight = safari.cost_accommodation_usd ?? 0;
              const vehiclePerDay = safari.cost_vehicle_usd ?? 0;
              const insurance = safari.cost_insurance_usd ?? 0;
              const evac = safari.cost_evac_usd ?? 0;
              const nights = Math.max(0, safari.duration_days - 1);
              const groups: { label: string; size: number; price: number | null }[] = [
                { label: "Solo", size: 1, price: safari.price_usd_solo },
                { label: "2 Pax", size: 2, price: safari.price_usd_2pax },
                { label: "4 Pax", size: 4, price: safari.price_usd_4pax },
                { label: "6 Pax", size: 6, price: safari.price_usd_6pax },
              ];
              return (
                <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
                  <div className="px-4 py-3 bg-amber-100 border-b border-amber-200">
                    <p className="text-xs font-bold text-amber-900">Estimated Margin by Group Size</p>
                    <p className="text-xs text-amber-700 mt-0.5">Cost = park fees + (accommodation x {nights} nights) + (vehicle / group size x {safari.duration_days} days) + insurance + evac</p>
                  </div>
                  <div className="divide-y divide-amber-100">
                    {groups.map(({ label, size, price }) => {
                      if (!price) return null;
                      const costPP = parkFees + (accPerNight * nights) + ((vehiclePerDay * safari.duration_days) / size) + insurance + evac;
                      const margin = price > 0 ? Math.round(((price - costPP) / price) * 100) : 0;
                      const color = margin >= 25 ? "text-green-700 bg-green-50" : margin >= 10 ? "text-amber-700 bg-amber-50" : "text-red-700 bg-red-50";
                      return (
                        <div key={label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                          <span className="text-gray-600 font-medium w-16">{label}</span>
                          <span className="text-gray-500 tabular-nums">${price}/pp · cost ~${Math.round(costPP)}/pp</span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold tabular-nums ${color}`}>
                            {margin}% margin
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </>}

        {/* CONTENT */}
        {tab === "content" && <>
          <Field label="Description" hint="Full safari description shown on the detail page">
            <textarea rows={6} value={safari.description ?? ""}
              onChange={e => set("description", e.target.value)}
              className={inp + " resize-y"} placeholder="Describe the safari experience in detail..." />
          </Field>
          <Field label="Highlights" hint="One item per line. Shown as green tick items on the page.">
            <textarea rows={6} value={(safari.highlights ?? []).join("\n")}
              onChange={e => editList("highlights", e.target.value)}
              className={inp + " resize-y font-mono text-xs"}
              placeholder={"3 full days of game drives in the Mara\nProfessional TRA-certified guide\nAll park fees included\nFull board accommodation"} />
          </Field>
          <Field label="Inclusions" hint="One item per line. What is included in the price.">
            <textarea rows={6} value={(safari.inclusions ?? []).join("\n")}
              onChange={e => editList("inclusions", e.target.value)}
              className={inp + " resize-y font-mono text-xs"}
              placeholder={"4x4 Land Cruiser with pop-up roof\nAll meals (full board)\nPark entry and conservation fees\nAirport transfers"} />
          </Field>
          <Field label="Exclusions" hint="One item per line. What is NOT included.">
            <textarea rows={5} value={(safari.exclusions ?? []).join("\n")}
              onChange={e => editList("exclusions", e.target.value)}
              className={inp + " resize-y font-mono text-xs"}
              placeholder={"International flights\nTravel insurance\nTips and gratuities\nPersonal items"} />
          </Field>
          <Field label="Cancellation Policy">
            <textarea rows={3} value={safari.cancellation_policy ?? ""}
              onChange={e => set("cancellation_policy", e.target.value)}
              className={inp + " resize-y"} placeholder="e.g. Free cancellation up to 30 days before departure..." />
          </Field>
        </>}

        {/* MEDIA */}
        {tab === "media" && <>
          {/* Cover Image */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Cover Image</p>
              <p className="text-xs text-gray-400">Main photo shown on safari cards and the hero section of the detail page.</p>
            </div>

            <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" : "border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-50"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {uploading ? "Uploading..." : "Upload from your computer"}
              <input type="file" accept="image/*" className="hidden" disabled={uploading}
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, "cover"); e.target.value = ""; }} />
            </label>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or paste a URL</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <input value={safari.cover_image ?? ""} onChange={e => set("cover_image", e.target.value)}
              placeholder="https://res.cloudinary.com/... or any image URL" className={inp} />

            {safari.cover_image && (
              <div className="relative h-52 rounded-xl overflow-hidden bg-gray-100">
                <Image src={safari.cover_image} alt="Cover preview" fill className="object-cover" unoptimized />
                <button onClick={() => set("cover_image", null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold transition-colors">
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Video */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Video</p>
              <p className="text-xs text-gray-400">YouTube link or direct MP4 URL. Shown on the safari detail page.</p>
            </div>
            <input value={safari.video_url ?? ""} onChange={e => set("video_url", e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://res.cloudinary.com/....mp4" className={inp} />
          </div>

          {/* Gallery */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Gallery ({safari.gallery.length} photos)</p>
              <p className="text-xs text-gray-400">These appear in the gallery section of the safari detail page. Aim for 6-12 photos.</p>
            </div>

            <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" : "border-gray-300 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {uploading ? "Uploading..." : "Upload photo to gallery"}
              <input type="file" accept="image/*" className="hidden" disabled={uploading}
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, "gallery"); e.target.value = ""; }} />
            </label>

            <div className="flex gap-2">
              <input value={newGalleryUrl} onChange={e => setNewGalleryUrl(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); const url = newGalleryUrl.trim(); if (url && safari) { set("gallery", [...safari.gallery, url]); setNewGalleryUrl(""); } } }}
                placeholder="Or paste image URL and press Add" className={inp + " flex-1"} />
              <button
                onClick={() => { const url = newGalleryUrl.trim(); if (url && safari) { set("gallery", [...safari.gallery, url]); setNewGalleryUrl(""); } }}
                disabled={!newGalleryUrl.trim()}
                className="px-4 py-2.5 bg-teal-DEFAULT text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-teal-600 transition-colors flex-shrink-0">
                Add
              </button>
            </div>

            {safari.gallery.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">No gallery photos yet</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {safari.gallery.map((url, i) => (
                  <div key={url + i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" unoptimized />
                    <button onClick={() => set("gallery", safari.gallery.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                    <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>}

        {/* SEO */}
        {tab === "seo" && <>
          <Field label="Meta Title" hint="Shown in Google search results. Keep under 60 characters.">
            <input value={safari.meta_title ?? ""} onChange={e => set("meta_title", e.target.value)}
              className={inp} placeholder={`${safari.name} | Engai Safaris Kenya`} />
            <p className="text-xs mt-1 font-medium" style={{ color: (safari.meta_title ?? "").length > 60 ? "#ef4444" : "#9ca3af" }}>
              {(safari.meta_title ?? "").length}/60 characters
            </p>
          </Field>
          <Field label="Meta Description" hint="Shown under the title in Google. Keep under 160 characters.">
            <textarea rows={3} value={safari.meta_desc ?? ""} onChange={e => set("meta_desc", e.target.value)}
              className={inp + " resize-none"} placeholder="Book this safari with Engai Safaris..." />
            <p className="text-xs mt-1 font-medium" style={{ color: (safari.meta_desc ?? "").length > 160 ? "#ef4444" : "#9ca3af" }}>
              {(safari.meta_desc ?? "").length}/160 characters
            </p>
          </Field>
        </>}

      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        <button onClick={save} disabled={saving}
          className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-bold text-sm disabled:opacity-60 transition-colors">
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
