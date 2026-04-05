import Link from 'next/link';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { Category } from '@/models/Category';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PostCard } from '@/components/blog/PostCard';

async function getData() {
  await connectDb();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(12).lean();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return { posts, categories };
}

export default async function BlogPage() {
  const { posts, categories } = await getData();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-8">
          <SectionHeader title="Blog" description="Deep analysis across Money & Power, Market Watch, The Numbers Game, and Insights." />
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} category={post.category} image={post.image} createdAt={post.createdAt.toISOString()} tags={post.tags} />
            ))}
          </div>
        </div>
        <aside className="space-y-8">
          <div className="rounded-3xl border border-slate-200/10 bg-white/90 p-6 shadow-gold">
            <h2 className="text-lg font-semibold text-slate-950">Categories</h2>
            <div className="mt-5 space-y-3">
              {categories.map((category) => (
                <Link key={category.slug} href={`/blog/category/${category.slug}`} className="block rounded-3xl border border-slate-200/80 px-4 py-3 text-sm text-slate-700 transition hover:border-gold hover:bg-slate-50">
                  {category.name}
                </Link>
              ))}
            </div>
            <Link href="/search" className="mt-6 inline-flex items-center justify-center rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
              Search posts
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
