import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { Category } from '@/models/Category';
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
    const categories = await Category.find().sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    requireAuth();
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }
    await connectDb();
    const category = await Category.create({
      name: body.name.trim(),
      slug: slugify(body.name),
      description: body.description || '',
    });
    return NextResponse.json(category);
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
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }
    await connectDb();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
