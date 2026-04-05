import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { formatDate, getPostUrl } from '@/lib/utils';
import { SocialShare } from '@/components/blog/SocialShare';

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await connectDb();
  const post = await Post.findOne({ slug: params.slug }).lean();
  if (!post) {
    return { title: 'Post not found' };
  }
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: getPostUrl(post.slug),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  await connectDb();
  const post = await Post.findOne({ slug: params.slug }).lean();
  if (!post) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <article className="space-y-8 rounded-[2rem] border border-slate-200/10 bg-white/95 p-8 shadow-gold sm:p-10">
        <div className="space-y-3 text-slate-700">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">{post.category}</p>
          <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">{post.title}</h1>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{formatDate(post.createdAt)}</p>
        </div>
        {post.image ? <img src={post.image} alt={post.title} className="w-full rounded-[2rem] object-cover" /> : null}
        <div className="space-y-6 text-slate-700">
          <p>{post.excerpt}</p>
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-8">{paragraph}</p>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">{tag}</span>
            ))}
          </div>
          <SocialShare title={post.title} slug={post.slug} excerpt={post.excerpt} />
        </div>
      </article>
    </div>
  );
}
