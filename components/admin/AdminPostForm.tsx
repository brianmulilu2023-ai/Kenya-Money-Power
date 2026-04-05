'use client';
import { useEffect, useState } from 'react';
import { slugify } from '@/lib/utils';

interface AdminPostFormProps {
  post?: any;
  categories: { _id: string; name: string }[];
}

export function AdminPostForm({ post, categories }: AdminPostFormProps) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [category, setCategory] = useState(post?.category ?? categories[0]?.name ?? '');
  const [tags, setTags] = useState((post?.tags ?? []).join(', '));
  const [image, setImage] = useState(post?.image ?? '');
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Saving...');
    const body = {
      id: post?.id,
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
      image,
      featured,
    };
    const method = post?.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Post saved successfully.');
      window.location.reload();
    } else {
      setMessage(data.error || 'Save failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200/10 bg-white/90 p-6 shadow-gold">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Slug</span>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-900">Excerpt</span>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-900">Content</span>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
      </label>
      <div className="grid gap-4 lg:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold">
            {categories.map((item) => (
              <option key={item._id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Tags</span>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="comma-separated" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-900">Featured image URL</span>
          <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" />
        </label>
      </div>
      <label className="flex items-center gap-3 text-sm text-slate-900">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 accent-gold" />
        Mark as featured post
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400">
          Save Post
        </button>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </div>
    </form>
  );
}
