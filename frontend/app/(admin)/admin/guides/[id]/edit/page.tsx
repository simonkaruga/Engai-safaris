"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Guide {
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

export default function GuideEditorPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${API}/api/admin/guides`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then((all: Guide[]) => {
        const found = all.find(g => g.id === id || g.slug === id);
        if (found) setGuide(found);
        else router.push("/admin/guides");
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [id, token, API, router]);

  const set = useCallback(<K extends keyof Guide>(key: K, value: Guide[K]) => {
    setGuide(prev => prev ? { ...prev, [key]: value } : prev);
  }, []);

  const csvToList = (raw: string) => raw.split(",").map(s => s.trim()).filter(Boolean);

  const save = async () => {
    if (!guide) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/guides/${guide.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          slug: guide.slug,
          name: guide.name,
          title: guide.title || null,
          bio: guide.bio || null,
          photo_url: guide.photo_url || null,
          languages: guide.languages?.length ? guide.languages : null,
          specialities: guide.specialities?.length ? guide.specialities : null,
          certifications: guide.certifications?.length ? guide.certifications : null,
          years_exp: guide.years_exp ? Number(guide.years_exp) : null,
          home_region: guide.home_region || null,
          fun_fact: guide.fun_fact || null,
          is_featured: guide.is_featured,
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

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "guides");
      const res = await fetch(`${API}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      set("photo_url", url);
      showToast("Photo uploaded!");
    } catch {
      showToast("Upload failed.", false);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!guide) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Link href="/admin/guides" className="text-sm text-teal-DEFAULT hover:underline">← All Guides</Link>
          <h1 className="font-display text-2xl font-bold mt-1">{guide.name}</h1>
          <p className="text-gray-400 text-xs font-mono mt-0.5">{guide.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => set("is_featured", !guide.is_featured)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              guide.is_featured ? "bg-gold-DEFAULT text-white border-gold-DEFAULT" : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {guide.is_featured ? "★ Featured" : "☆ Not Featured"}
          </button>
          <button onClick={save} disabled={saving}
            className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-5 py-2 rounded-xl font-semibold text-sm disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Photo */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Profile Photo</p>
          <div className="flex items-center gap-5">
            {guide.photo_url ? (
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image src={guide.photo_url} alt={guide.name} fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-2xl shrink-0">
                {guide.name[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1 space-y-2">
              <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors ${uploading ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" : "border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-50"}`}>
                {uploading ? "Uploading..." : "Upload photo"}
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadPhoto(f); e.target.value = ""; }} />
              </label>
              <input value={guide.photo_url ?? ""} onChange={e => set("photo_url", e.target.value)}
                placeholder="Or paste photo URL" className={inp} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name">
            <input value={guide.name} onChange={e => set("name", e.target.value)} className={inp} />
          </Field>
          <Field label="Title / Role">
            <input value={guide.title ?? ""} onChange={e => set("title", e.target.value)}
              placeholder="Senior Safari Guide" className={inp} />
          </Field>
          <Field label="Home Region">
            <input value={guide.home_region ?? ""} onChange={e => set("home_region", e.target.value)}
              placeholder="Nairobi" className={inp} />
          </Field>
          <Field label="Years Experience">
            <input type="number" min={0} max={60} value={guide.years_exp ?? ""}
              onChange={e => set("years_exp", e.target.value ? Number(e.target.value) : null)} className={inp} />
          </Field>
        </div>

        <Field label="Bio">
          <textarea rows={5} value={guide.bio ?? ""} onChange={e => set("bio", e.target.value)}
            className={inp + " resize-y"} placeholder="Guide biography..." />
        </Field>

        <Field label="Fun Fact">
          <input value={guide.fun_fact ?? ""} onChange={e => set("fun_fact", e.target.value)}
            placeholder="Can identify 300+ bird species by call alone" className={inp} />
        </Field>

        <Field label="Languages" hint="Comma-separated">
          <input value={(guide.languages ?? []).join(", ")}
            onChange={e => set("languages", csvToList(e.target.value))}
            placeholder="English, Swahili, Maa" className={inp} />
        </Field>

        <Field label="Specialities" hint="Comma-separated">
          <input value={(guide.specialities ?? []).join(", ")}
            onChange={e => set("specialities", csvToList(e.target.value))}
            placeholder="Masai Mara, Big Five, Photography" className={inp} />
        </Field>

        <Field label="Certifications" hint="Comma-separated">
          <input value={(guide.certifications ?? []).join(", ")}
            onChange={e => set("certifications", csvToList(e.target.value))}
            placeholder="TRA Certified, First Aid, Wilderness" className={inp} />
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
