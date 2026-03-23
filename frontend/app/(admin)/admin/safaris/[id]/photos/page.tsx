"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SafariPhotosPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const [safari, setSafari] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [coverUrl, setCoverUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/safaris`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((all: any[]) => {
        const found = all.find((s) => s.id === id || s.slug === id);
        if (found) {
          setSafari(found);
          setCoverUrl(found.cover_image ?? "");
          setGalleryUrls(Array.isArray(found.gallery) ? found.gallery : []);
        }
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [id, router, token]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/safaris/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          cover_image: coverUrl.trim() || null,
          gallery: galleryUrls.filter(Boolean),
        }),
      });
      if (res.ok) showToast("Photos saved!");
      else showToast("Save failed — check the URLs", false);
    } catch {
      showToast("Network error", false);
    } finally {
      setSaving(false);
    }
  };

  const addGalleryUrl = () => {
    const url = newUrl.trim();
    if (!url || galleryUrls.includes(url)) return;
    setGalleryUrls((prev) => [...prev, url]);
    setNewUrl("");
  };

  const removeGallery = (url: string) => {
    setGalleryUrls((prev) => prev.filter((u) => u !== url));
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...galleryUrls];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setGalleryUrls(next);
  };

  const moveDown = (i: number) => {
    if (i === galleryUrls.length - 1) return;
    const next = [...galleryUrls];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setGalleryUrls(next);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading…</div>;
  if (!safari) return <div className="flex items-center justify-center h-64 text-gray-500">Safari not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/safaris" className="text-sm text-teal-DEFAULT hover:underline">← Safaris</Link>
          <h1 className="font-display text-2xl font-bold mt-1">{safari.name}</h1>
          <p className="text-gray-400 text-sm">Photo manager</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="bg-teal-DEFAULT text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-600 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : "Save Photos"}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 text-sm text-blue-800 leading-relaxed">
        <strong>How to add photos:</strong> Upload your photo to{" "}
        <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Cloudinary (free)</a>,
        Google Drive (set sharing to "Anyone with link"), or any image hosting.
        Copy the direct image URL and paste it below.
        For Cloudinary, use the URL ending in <code className="bg-blue-100 px-1 rounded">.jpg</code> or <code className="bg-blue-100 px-1 rounded">.webp</code>.
      </div>

      {/* Cover image */}
      <section className="mb-8">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Cover Image</h2>
        <p className="text-gray-500 text-xs mb-3">This is the main photo shown on the safari card and at the top of the detail page. Use a landscape photo, minimum 1200×800px.</p>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/... or https://drive.google.com/..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
          />
        </div>
        {coverUrl && (
          <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={coverUrl}
              alt="Cover preview"
              fill
              className="object-cover"
              unoptimized
              onError={() => showToast("Cover image URL could not be loaded — check the URL", false)}
            />
          </div>
        )}
        {!coverUrl && (
          <div className="h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No cover image yet — paste a URL above</p>
          </div>
        )}
      </section>

      {/* Gallery */}
      <section>
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3">Gallery Photos</h2>
        <p className="text-gray-500 text-xs mb-3">These appear in the gallery section of the safari detail page. Add 6–12 photos: game drives, camp, landscape, wildlife close-ups. First photo shows first.</p>

        {/* Add URL input */}
        <div className="flex gap-2 mb-5">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGalleryUrl()}
            placeholder="Paste image URL and press Add"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
          />
          <button
            onClick={addGalleryUrl}
            disabled={!newUrl.trim()}
            className="bg-teal-DEFAULT text-white px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-teal-600 transition-colors"
          >
            Add
          </button>
        </div>

        {galleryUrls.length === 0 ? (
          <div className="h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No gallery photos yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {galleryUrls.map((url, i) => (
              <div key={url} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-2">
                {/* Thumbnail */}
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" unoptimized />
                </div>
                {/* URL */}
                <p className="flex-1 text-xs text-gray-500 truncate min-w-0">{url}</p>
                {/* Controls */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 disabled:opacity-30 text-gray-500 text-xs"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(i)}
                    disabled={i === galleryUrls.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 disabled:opacity-30 text-gray-500 text-xs"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeGallery(url)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-500 text-xs"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-3">{galleryUrls.length} photo{galleryUrls.length !== 1 ? "s" : ""} in gallery</p>
      </section>

      {/* Save button at bottom too */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="bg-teal-DEFAULT text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-600 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : "Save Photos"}
        </button>
      </div>
    </div>
  );
}
