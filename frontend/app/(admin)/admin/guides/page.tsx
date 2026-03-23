"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Guide {
  id: string;
  slug: string;
  name: string;
  title?: string;
  bio?: string;
  photo_url?: string;
  languages?: string[];
  specialities?: string[];
  years_exp?: number;
  home_region?: string;
  fun_fact?: string;
  is_featured: boolean;
  avg_rating?: number;
}

const EMPTY_FORM = {
  slug: "", name: "", title: "", bio: "", photo_url: "",
  languages: "", specialities: "", years_exp: "",
  home_region: "", fun_fact: "", is_featured: false,
};

export default function AdminGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${api}/api/admin/guides`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setGuides)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token, api]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
        name: form.name.trim(),
        title: form.title || null,
        bio: form.bio || null,
        photo_url: form.photo_url || null,
        languages: form.languages ? form.languages.split(",").map((s) => s.trim()).filter(Boolean) : null,
        specialities: form.specialities ? form.specialities.split(",").map((s) => s.trim()).filter(Boolean) : null,
        years_exp: form.years_exp ? parseInt(form.years_exp) : null,
        home_region: form.home_region || null,
        fun_fact: form.fun_fact || null,
        is_featured: form.is_featured,
      };
      const res = await fetch(`${api}/api/admin/guides`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? "Failed to create guide");
      }
      const created = await res.json();
      setGuides((prev) => [...prev, created]);
      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return "—";
    const full = Math.floor(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Guides</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowForm(!showForm); setError(""); }}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Guide"}
          </button>
          <Link href="/admin/dashboard" className="text-sm text-teal-600 hover:underline">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* ── Add Guide Form ── */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-gray-900 text-lg mb-2">New Guide Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Slug * (URL identifier)</label>
              <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="james-mwangi"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Title / Role</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Senior Safari Guide"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Home Region</label>
              <input value={form.home_region} onChange={(e) => setForm({ ...form, home_region: e.target.value })}
                placeholder="Nairobi"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Years Experience</label>
              <input type="number" min={0} max={60} value={form.years_exp} onChange={(e) => setForm({ ...form, years_exp: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Photo URL</label>
              <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Languages (comma-separated)</label>
              <input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })}
                placeholder="English, Swahili, Maa"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Specialities (comma-separated)</label>
              <input value={form.specialities} onChange={(e) => setForm({ ...form, specialities: e.target.value })}
                placeholder="Masai Mara, Big Five, Photography"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Brief guide biography — background, experience, what makes them special..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Fun Fact</label>
              <input value={form.fun_fact} onChange={(e) => setForm({ ...form, fun_fact: e.target.value })}
                placeholder="Can identify 300+ bird species by call alone"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="is_featured" checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4 accent-teal-600" />
              <label htmlFor="is_featured" className="text-sm text-gray-700">Feature on homepage</label>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-60">
              {saving ? "Saving…" : "Create Guide"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setError(""); }}
              className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2 rounded-lg border border-gray-200">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ── Guide List ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {guides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-3">No guides yet.</p>
            <button onClick={() => setShowForm(true)}
              className="text-teal-600 font-semibold text-sm hover:underline">
              Add your first real guide →
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Photo</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Specialities</th>
                <th className="px-5 py-3 text-left">Languages</th>
                <th className="px-5 py-3 text-left">Rating</th>
                <th className="px-5 py-3 text-center">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guides.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    {g.photo_url ? (
                      <img src={g.photo_url} alt={g.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                        {g.name[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{g.name}</p>
                    {g.title && <p className="text-xs text-gray-400">{g.title}</p>}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {Array.isArray(g.specialities) ? g.specialities.join(", ") : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {Array.isArray(g.languages) ? g.languages.join(", ") : "—"}
                  </td>
                  <td className="px-5 py-3 text-yellow-500 text-sm">{renderStars(g.avg_rating)}</td>
                  <td className="px-5 py-3 text-center">
                    {g.is_featured ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" title="Featured on homepage" />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-200" title="Not featured" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
