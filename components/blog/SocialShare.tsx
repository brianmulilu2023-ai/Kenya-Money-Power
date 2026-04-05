'use client';

import { useMemo } from 'react';

interface SocialShareProps {
  title: string;
  slug: string;
  excerpt: string;
}

export function SocialShare({ title, slug, excerpt }: SocialShareProps) {
  const shareUrl = useMemo(() => `${window.location.origin}/blog/${slug}`, [slug]);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedExcerpt = encodeURIComponent(excerpt);

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-3xl border border-slate-200/60 bg-slate-950 px-4 py-4 text-center text-sm font-medium text-white transition hover:border-gold hover:bg-slate-900"
      >
        Share on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-3xl border border-slate-200/60 bg-slate-950 px-4 py-4 text-center text-sm font-medium text-white transition hover:border-gold hover:bg-slate-900"
      >
        Share on LinkedIn
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-3xl border border-slate-200/60 bg-slate-950 px-4 py-4 text-center text-sm font-medium text-white transition hover:border-gold hover:bg-slate-900"
      >
        Share on Facebook
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-3xl border border-slate-200/60 bg-slate-950 px-4 py-4 text-center text-sm font-medium text-white transition hover:border-gold hover:bg-slate-900"
      >
        Share on WhatsApp
      </a>
    </div>
  );
}
