import Link from 'next/link';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { Category } from '@/models/Category';
import { siteConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { PostCard } from '@/components/blog/PostCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SubscribeForm } from '@/components/shared/SubscribeForm';

async function getContent() {
  await connectDb();
  const featuredPosts = await Post.find({ featured: true }).sort({ createdAt: -1 }).limit(3).lean();
  const latestPosts = await Post.find().sort({ createdAt: -1 }).limit(6).lean();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return { featuredPosts, latestPosts, categories };
}

export default async function HomePage() {
  const { featuredPosts, latestPosts, categories } = await getContent();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200/10 bg-slate-950/95 px-6 py-14 text-white shadow-gold sm:px-10 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">{siteConfig.title}</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Where money meets politics—and data drives decisions.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
              Follow expert analysis on policy, markets, and financial strategy through sharp reporting, charts, and actionable insights designed for leaders, investors, and change-makers.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/blog" className="inline-flex items-center justify-center rounded-3xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400">
                Explore the blog
              </Link>
              <Link href="/work-with-me" className="inline-flex items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-gold hover:bg-white/10">
                Work with me
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 transition hover:border-gold">
                <p className="text-xs uppercase tracking-[0.35em] text-gold">{post.category}</p>
                <h2 className="mt-4 text-xl font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">{post.excerpt}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-slate-500">Read article →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeader title="Latest stories" description="Fresh reporting from Money & Power." />
          <div className="grid gap-6 sm:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} category={post.category} image={post.image} createdAt={post.createdAt.toISOString()} tags={post.tags} />
            ))}
          </div>
        </div>
        <aside className="space-y-10">
          <div className="rounded-3xl border border-slate-200/10 bg-white/90 p-6 shadow-gold">
            <h2 className="text-lg font-semibold text-slate-950">Featured categories</h2>
            <div className="mt-6 grid gap-4">
              {categories.map((category) => (
                <Link key={category.slug} href={`/blog/category/${category.slug}`} className="rounded-3xl border border-slate-200/80 bg-slate-950/95 px-4 py-5 text-white transition hover:border-gold">
                  <p className="font-semibold">{category.name}</p>
                  <p className="mt-2 text-sm text-slate-400">Explore politics, markets and data-led reporting.</p>
                </Link>
              ))}
            </div>
          </div>
          <SubscribeForm />
        </aside>
      </section>
    </div>
  );
}
