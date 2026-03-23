"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FILTER_TABS = ["all", "published", "drafts"];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setPosts)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const togglePublished = async (id: string, currentPublishedAt: string | null) => {
    const body = currentPublishedAt
      ? { published_at: null }
      : { published_at: new Date().toISOString() };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, published_at: body.published_at } : p
        )
      );
    }
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const isPublished = (post: any) => !!post.published_at;

  const filtered = (() => {
    if (filter === "published") return posts.filter(isPublished);
    if (filter === "drafts") return posts.filter((p) => !isPublished(p));
    return posts;
  })();

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const count = tab === "all" ? posts.length : tab === "published" ? posts.filter(isPublished).length : posts.filter((p) => !isPublished(p)).length;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === tab ? "bg-teal-DEFAULT text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab} {count > 0 && <span className="ml-1">({count})</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No blog posts found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Author</th>
                <th className="px-5 py-3 text-left">Published At</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium max-w-[240px] truncate">{p.title}</td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{p.category ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{p.author ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isPublished(p) ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {isPublished(p) ? "published" : "draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 flex items-center gap-3">
                    <button
                      onClick={() => togglePublished(p.id, p.published_at)}
                      className="text-xs text-teal-DEFAULT hover:underline font-semibold"
                    >
                      {isPublished(p) ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deletePost(p.id, p.title)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
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
