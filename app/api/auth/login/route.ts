import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import { User } from '@/models/User';
import { createToken, hashPassword, verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  await connectDb();

  let user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword || adminEmail !== email.toLowerCase().trim() || adminPassword !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const passwordHash = hashPassword(password);
    user = await User.create({ email: adminEmail, passwordHash });
  }

  const isValid = verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createToken({ email: user.email });
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: 'kenya-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
