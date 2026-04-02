"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  cover_image: string | null;
  gallery: string[];
  best_months: string[] | null;
  highlights: string[] | null;
  wildlife_list: string[] | null;
  peak_fee_usd: number | null;
  low_fee_usd: number | null;
  is_active: boolean;
  meta_title: string | null;
  meta_desc: string | null;
}

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

export default function DestinationEditorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  const [dest, setDest] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${API}/api/admin/destinations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then((all: Destination[]) => {
        const found = all.find(d => d.id === id || d.slug === id);
        if (found) setDest({ ...found, gallery: found.gallery ?? [] });
        else router.push("/admin/destinations");
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [id, token, API, router]);

  const set = useCallback(<K extends keyof Destination>(key: K, value: Destination[K]) => {
    setDest(prev => prev ? { ...prev, [key]: value } : prev);
  }, []);

  const editList = (key: "highlights" | "wildlife_list" | "best_months", raw: string) => {
    const items = raw.split("\n").map(s => s.trim()).filter(Boolean);
    set(key, items.length ? items : null);
  };

  const save = async () => {
    if (!dest) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/destinations/${dest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: dest.name,
          tagline: dest.tagline || null,
          description: dest.description || null,
          cover_image: dest.cover_image || null,
          gallery: dest.gallery,
          best_months: dest.best_months?.length ? dest.best_months : null,
          highlights: dest.highlights?.length ? dest.highlights : null,
          wildlife_list: dest.wildlife_list?.length ? dest.wildlife_list : null,
          peak_fee_usd: dest.peak_fee_usd ? Number(dest.peak_fee_usd) : null,
          low_fee_usd: dest.low_fee_usd ? Number(dest.low_fee_usd) : null,
          is_active: dest.is_active,
          meta_title: dest.meta_title || null,
          meta_desc: dest.meta_desc || null,
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
      formData.append("folder", "destinations");
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
        setDest(prev => prev ? { ...prev, gallery: [...prev.gallery, url] } : prev);
        showToast("Photo added to gallery!");
      }
    } catch {
      showToast("Upload failed.", false);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!dest) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Link href="/admin/destinations" className="text-sm text-teal-DEFAULT hover:underline">← All Destinations</Link>
          <h1 className="font-display text-2xl font-bold mt-1">{dest.name}</h1>
          <p className="text-gray-400 text-xs font-mono mt-0.5">{dest.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => set("is_active", !dest.is_active)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              dest.is_active ? "bg-teal-DEFAULT text-white border-teal-DEFAULT" : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {dest.is_active ? "✓ Active" : "○ Inactive"}
          </button>
          <button onClick={save} disabled={saving}
            className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-5 py-2 rounded-xl font-semibold text-sm disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <Field label="Name">
          <input value={dest.name} onChange={e => set("name", e.target.value)} className={inp} />
        </Field>
        <Field label="Tagline">
          <input value={dest.tagline ?? ""} onChange={e => set("tagline", e.target.value)} className={inp} placeholder="e.g. Kenya's greatest wildlife spectacle" />
        </Field>
        <Field label="Description">
          <textarea rows={5} value={dest.description ?? ""} onChange={e => set("description", e.target.value)} className={inp + " resize-y"} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Peak Season Fee (USD/person/day)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" min={0} value={dest.peak_fee_usd ?? ""}
                onChange={e => set("peak_fee_usd", e.target.value ? Number(e.target.value) : null)}
                className={inp + " pl-7"} placeholder="0" />
            </div>
          </Field>
          <Field label="Low Season Fee (USD/person/day)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" min={0} value={dest.low_fee_usd ?? ""}
                onChange={e => set("low_fee_usd", e.target.value ? Number(e.target.value) : null)}
                className={inp + " pl-7"} placeholder="0" />
            </div>
          </Field>
        </div>

        <Field label="Best Months" hint="One month per line, e.g. July">
          <textarea rows={4} value={(dest.best_months ?? []).join("\n")}
            onChange={e => editList("best_months", e.target.value)}
            className={inp + " resize-y font-mono text-xs"} placeholder={"July\nAugust\nSeptember\nOctober"} />
        </Field>

        <Field label="Highlights" hint="One item per line">
          <textarea rows={5} value={(dest.highlights ?? []).join("\n")}
            onChange={e => editList("highlights", e.target.value)}
            className={inp + " resize-y font-mono text-xs"} placeholder={"Great Migration crossing\nBig Five sightings\nMaasai cultural visits"} />
        </Field>

        <Field label="Wildlife List" hint="One animal per line">
          <textarea rows={5} value={(dest.wildlife_list ?? []).join("\n")}
            onChange={e => editList("wildlife_list", e.target.value)}
            className={inp + " resize-y font-mono text-xs"} placeholder={"Lion\nElephant\nLeopard\nCheetah\nWildebeest"} />
        </Field>

        {/* Cover Image */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Cover Image</p>
          <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" : "border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-50"}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {uploading ? "Uploading..." : "Upload from computer"}
            <input type="file" accept="image/*" className="hidden" disabled={uploading}
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, "cover"); e.target.value = ""; }} />
          </label>
          <input value={dest.cover_image ?? ""} onChange={e => set("cover_image", e.target.value)}
            placeholder="Or paste image URL" className={inp} />
          {dest.cover_image && (
            <div className="relative h-52 rounded-xl overflow-hidden bg-gray-100">
              <Image src={dest.cover_image} alt="Cover" fill className="object-cover" unoptimized />
              <button onClick={() => set("cover_image", null)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">✕</button>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Gallery ({dest.gallery.length} photos)</p>
          <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" : "border-gray-300 text-gray-600 hover:border-teal-DEFAULT hover:text-teal-DEFAULT"}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {uploading ? "Uploading..." : "Upload photo"}
            <input type="file" accept="image/*" className="hidden" disabled={uploading}
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, "gallery"); e.target.value = ""; }} />
          </label>
          <div className="flex gap-2">
            <input value={newGalleryUrl} onChange={e => setNewGalleryUrl(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); const url = newGalleryUrl.trim(); if (url) { set("gallery", [...dest.gallery, url]); setNewGalleryUrl(""); } } }}
              placeholder="Or paste URL and press Add" className={inp + " flex-1"} />
            <button onClick={() => { const url = newGalleryUrl.trim(); if (url) { set("gallery", [...dest.gallery, url]); setNewGalleryUrl(""); } }}
              disabled={!newGalleryUrl.trim()}
              className="px-4 py-2.5 bg-teal-DEFAULT text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-teal-600 transition-colors flex-shrink-0">
              Add
            </button>
          </div>
          {dest.gallery.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">No gallery photos yet</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {dest.gallery.map((url, i) => (
                <div key={url + i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" unoptimized />
                  <button onClick={() => set("gallery", dest.gallery.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO */}
        <Field label="Meta Title" hint="Keep under 60 characters">
          <input value={dest.meta_title ?? ""} onChange={e => set("meta_title", e.target.value)}
            className={inp} placeholder={`${dest.name} Safari | Engai Safaris Kenya`} />
          <p className="text-xs mt-1 font-medium" style={{ color: (dest.meta_title ?? "").length > 60 ? "#ef4444" : "#9ca3af" }}>
            {(dest.meta_title ?? "").length}/60
          </p>
        </Field>
        <Field label="Meta Description" hint="Keep under 160 characters">
          <textarea rows={3} value={dest.meta_desc ?? ""} onChange={e => set("meta_desc", e.target.value)}
            className={inp + " resize-none"} />
          <p className="text-xs mt-1 font-medium" style={{ color: (dest.meta_desc ?? "").length > 160 ? "#ef4444" : "#9ca3af" }}>
            {(dest.meta_desc ?? "").length}/160
          </p>
        </Field>
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
