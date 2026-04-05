'use client';

import { useState } from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { SectionHeader } from '@/components/shared/SectionHeader';

interface SearchResult {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  image: string;
  createdAt: string;
  tags: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Use the search box to find posts.');

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setMessage('Searching...');
    const res = await fetch(`/api/posts?search=${encodeURIComponent(query)}`);
    const posts = await res.json();
    setResults(posts || []);
    setMessage(posts.length ? '' : 'No posts found.');
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <SectionHeader title="Search" description="Search Kenya Money & Power for stories, data, and ideas." />
      <div className="mt-8 rounded-3xl border border-slate-200/10 bg-white/95 p-6 shadow-gold sm:p-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for market themes, policy, or analysis"
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-5 py-4 text-slate-900 outline-none transition focus:border-gold"
          />
          <button type="submit" className="rounded-3xl bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400">
            Search
          </button>
        </form>
      </div>
      <div className="mt-10">
        {loading ? (
          <p className="text-slate-600">Searching …</p>
        ) : results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((post) => (
              <PostCard key={post._id} title={post.title} excerpt={post.excerpt} slug={post.slug} category={post.category} image={post.image} createdAt={post.createdAt} tags={post.tags} />
            ))}
          </div>
        ) : (
          <p className="text-slate-600">{message}</p>
        )}
      </div>
    </div>
  );
}
