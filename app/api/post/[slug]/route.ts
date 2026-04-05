import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await connectDb();
  const post = await Post.findOne({ slug: params.slug }).lean();
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}
