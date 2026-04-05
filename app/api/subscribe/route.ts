import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { Subscriber } from '@/models/Subscriber';

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  await connectDb();
  await Subscriber.updateOne({ email: email.toLowerCase().trim() }, { email: email.toLowerCase().trim() }, { upsert: true });
  return NextResponse.json({ ok: true });
}
