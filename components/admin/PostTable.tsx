'use client';
import { useState } from 'react';

interface PostTableProps {
  posts: any[];
}

export function PostTable({ posts }: PostTableProps) {
  const [deletedId, setDeletedId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return;
    setDeletedId(id);
    const res = await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    }
    setDeletedId(null);
  }

  return (
    <div className="rounded-3xl border border-slate-200/10 bg-white/90 p-6 shadow-gold">
      <h3 className="text-lg font-semibold text-slate-950">Manage posts</h3>
      <div className="mt-4 space-y-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="border-b border-slate-200/80 text-slate-900">
            <tr>
              <th className="py-3 pr-4">Title</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Featured</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="py-4 pr-4 font-semibold text-slate-900">{post.title}</td>
                <td className="py-4 pr-4">{post.category}</td>
                <td className="py-4 pr-4">{post.featured ? 'Yes' : 'No'}</td>
                <td className="py-4 pr-4">
                  <button type="button" onClick={() => handleDelete(post._id)} disabled={deletedId === post._id} className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
