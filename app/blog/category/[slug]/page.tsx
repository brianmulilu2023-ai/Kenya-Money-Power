import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDb } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Post } from '@/models/Post';
import { PostCard } from '@/components/blog/PostCard';
import { SectionHeader } from '@/components/shared/SectionHeader';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  await connectDb();
  const categories = await Category.find().lean();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: Params) {
  await connectDb();
  const category = await Category.findOne({ slug: params.slug }).lean();
  if (!category) {
    return notFound();
  }
  const posts = await Post.find({ category: category.name }).sort({ createdAt: -1 }).lean();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <SectionHeader title={category.name} description={`Curated stories from ${category.name}.`} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.slug} title={post.title} excerpt={post.excerpt} slug={post.slug} category={post.category} image={post.image} createdAt={post.createdAt.toISOString()} tags={post.tags} />
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200/10 bg-white/90 p-10 text-slate-700 shadow-gold">No posts available for this category yet.</div>
        )}
      </div>
      <div className="mt-8">
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-white">
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
