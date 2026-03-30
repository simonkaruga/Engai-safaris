"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category?: string;
  is_published: boolean;
  published_at?: string;
}

const FILTER_TABS = ["all", "published", "drafts"];

const CATEGORY_COLORS: Record<string, string> = {
  "travel-tips": "bg-blue-100 text-blue-700",
  wildlife: "bg-green-100 text-green-700",
  destinations: "bg-teal-100 text-teal-700",
  culture: "bg-purple-100 text-purple-700",
  guides: "bg-orange-100 text-orange-700",
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

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

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const isPublished = (post: BlogPost) => !!post.is_published;

  const togglePublished = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ is_published: !current }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, is_published: !current, published_at: !current ? new Date().toISOString() : null }
              : p
          )
        );
        showToast(!current ? "Post published." : "Post unpublished.");
      } else {
        showToast("Failed to update status.", false);
      }
    } catch {
      showToast("Network error.", false);
    } finally {
      setTogglingId(null);
    }
  };

  const deletePost = async (id: string, title: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    setConfirmDeleteId(null);
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok || res.status === 204) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showToast("Post deleted.");
      } else {
        showToast("Failed to delete post.", false);
      }
    } catch {
      showToast("Network error.", false);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = (() => {
    if (filter === "published") return posts.filter(isPublished);
    if (filter === "drafts") return posts.filter((p) => !isPublished(p));
    return posts;
  })();

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Blog Posts</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog/new"
            className="bg-teal-DEFAULT text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors"
          >
            + New Post
          </Link>
          <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const count =
            tab === "all"
              ? posts.length
              : tab === "published"
              ? posts.filter(isPublished).length
              : posts.filter((p) => !isPublished(p)).length;
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
          <div className="text-center text-gray-500 py-12">
            <p className="mb-4">No blog posts found.</p>
            <Link
              href="/admin/blog/new"
              className="bg-teal-DEFAULT text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Published Date</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium max-w-[260px]">
                    <span className="truncate block">{p.title}</span>
                    <span className="text-xs text-gray-400 font-mono truncate block">{p.slug}</span>
                  </td>
                  <td className="px-5 py-3">
                    {p.category ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${CATEGORY_COLORS[p.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {p.category.replace("-", " ")}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => togglePublished(p.id, !!p.is_published)}
                      disabled={togglingId === p.id}
                      title={isPublished(p) ? "Click to unpublish" : "Click to publish"}
                      aria-label={isPublished(p) ? "Unpublish post" : "Publish post"}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-50 ${
                        isPublished(p)
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      {togglingId === p.id ? "..." : isPublished(p) ? "published" : "draft"}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/blog/${p.id}/edit`}
                        className="text-xs font-semibold text-teal-DEFAULT hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(p.id, p.title)}
                        disabled={deletingId === p.id}
                        className={`text-xs font-semibold disabled:opacity-50 transition-colors ${
                          confirmDeleteId === p.id
                            ? "text-white bg-red-500 px-2 py-0.5 rounded"
                            : "text-red-500 hover:text-red-700"
                        }`}
                      >
                        {deletingId === p.id ? "Deleting..." : confirmDeleteId === p.id ? "Confirm?" : "Delete"}
                      </button>
                    </div>
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
