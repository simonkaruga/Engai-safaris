"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  { value: "travel-tips", label: "Travel Tips" },
  { value: "wildlife", label: "Wildlife" },
  { value: "destinations", label: "Destinations" },
  { value: "culture", label: "Culture" },
  { value: "guides", label: "Guides" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setSlugManual(true);
  };

  const submit = async (publish: boolean) => {
    if (!title.trim()) {
      showToast("Title is required.", false);
      return;
    }
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, string | boolean | null | undefined> = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        category: category || null,
        excerpt: excerpt.trim() || null,
        content: body.trim() || null,
        cover_image: coverImage.trim() || null,
        is_published: publish,
      };
      if (publish && publishedAt) {
        payload.published_at = new Date(publishedAt).toISOString();
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(publish ? "Post published!" : "Draft saved.");
        setTimeout(() => router.push("/admin/blog"), 800);
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.detail || "Failed to save post.", false);
      }
    } catch {
      showToast("Network error.", false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/blog" className="text-sm text-teal-DEFAULT hover:underline">
            ← Blog Posts
          </Link>
          <h1 className="font-display text-2xl font-bold mt-1">New Blog Post</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => submit(false)}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => submit(true)}
            disabled={saving}
            className="bg-teal-DEFAULT text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 disabled:opacity-50 transition-colors"
          >
            {saving ? "Publishing…" : "Publish Now"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. The Best Time to Visit the Maasai Mara"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
          />
          {/* Slug preview */}
          <div className="mt-3">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
              Slug (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 shrink-0">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="auto-generated-from-title"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
              />
              {slugManual && (
                <button
                  onClick={() => { setSlugManual(false); setSlug(slugify(title)); }}
                  className="text-xs text-gray-400 hover:text-gray-600 shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT bg-white"
          >
            <option value="">— Select a category —</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Excerpt
            <span className="ml-2 text-gray-400 font-normal normal-case">
              ({excerpt.length}/160 characters)
            </span>
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 160))}
            rows={3}
            placeholder="A short summary shown in blog listings and SEO descriptions. Keep it under 160 characters."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            {160 - excerpt.length} characters remaining
          </p>
        </div>

        {/* Body */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Body (Markdown / Plain Text)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={18}
            placeholder="Write your post content here. Markdown is supported: **bold**, _italic_, ## Heading, - list item, [Link](https://...)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT resize-y"
          />
        </div>

        {/* Cover Image */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://res.cloudinary.com/... or any image URL"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
          />
          {coverImage && (
            <div className="mt-3 relative h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {/* Admin-only URL preview — domain unknown at build time, img is intentional */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  showToast("Cover image URL could not be loaded.", false);
                }}
              />
            </div>
          )}
          {!coverImage && (
            <div className="mt-3 h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-400 text-xs">No cover image — paste a URL above</p>
            </div>
          )}
        </div>

        {/* Publish settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Publish Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Published</p>
                <p className="text-xs text-gray-500">Toggle to control visibility on the public site.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isPublished ? "bg-teal-DEFAULT" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    isPublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Published Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
              />
              <p className="text-xs text-gray-400 mt-1">
                Leave blank to use the current time when publishing.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="flex justify-end gap-3 pb-4">
          <button
            onClick={() => submit(false)}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => submit(true)}
            disabled={saving}
            className="bg-teal-DEFAULT text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 disabled:opacity-50 transition-colors"
          >
            {saving ? "Publishing…" : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
