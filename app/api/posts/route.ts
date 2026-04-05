import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export async function GET(req: Request) {
  await connectDb();
  const url = new URL(req.url);
  const search = url.searchParams.get('search') ?? '';
  const category = url.searchParams.get('category');
  const tag = url.searchParams.get('tag');
  const featured = url.searchParams.get('featured');

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }
  if (category) {
    filter.category = category;
  }
  if (tag) {
    filter.tags = tag;
  }
  if (featured === 'true') {
    filter.featured = true;
  }

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}
