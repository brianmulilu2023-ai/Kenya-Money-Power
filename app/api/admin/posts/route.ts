import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { verifyToken } from '@/lib/auth';
import { slugify } from '@/lib/utils';

function requireAuth() {
  const token = cookies().get('kenya-token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }
  verifyToken(token);
}

export async function GET() {
  try {
    requireAuth();
    await connectDb();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    requireAuth();
    const body = await req.json();
    await connectDb();
    const post = await Post.create({
      ...body,
      slug: slugify(body.slug || body.title),
      updatedAt: new Date(),
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    requireAuth();
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }
    await connectDb();
    const update = {
      ...body,
      slug: slugify(body.slug || body.title),
      updatedAt: new Date(),
    };
    delete update.id;
    const post = await Post.findByIdAndUpdate(body.id, update, { new: true }).lean();
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    requireAuth();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }
    await connectDb();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
