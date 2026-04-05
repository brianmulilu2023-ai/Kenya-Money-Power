import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  image: string;
  createdAt: string;
  tags: string[];
}

export function PostCard({ title, excerpt, slug, category, image, createdAt, tags }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/10 bg-white/90 shadow-gold transition hover:-translate-y-1 hover:shadow-2xl">
      <Link href={`/blog/${slug}`} className="block overflow-hidden">
        <div className="h-56 bg-slate-900/5 object-cover transition duration-500 group-hover:scale-105">
          {image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">No image</div>}
        </div>
      </Link>
      <div className="space-y-4 p-6 sm:p-8">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gold">{category}</div>
        <Link href={`/blog/${slug}`} className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
          <p className="max-h-20 overflow-hidden text-slate-600">{excerpt}</p>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>{formatDate(createdAt)}</span>
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
