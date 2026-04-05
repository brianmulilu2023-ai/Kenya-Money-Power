'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Signing in...');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const body = await res.json();
      setMessage(body.error || 'Unable to sign in');
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200/10 bg-white/95 p-10 shadow-gold">
        <h1 className="text-4xl font-semibold text-slate-950">Admin sign in</h1>
        <p className="mt-3 text-slate-600">Secure access to content management for Kenya Money & Power.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
          </label>
          <button type="submit" className="w-full rounded-3xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400">
            Sign in
          </button>
        </form>
        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
      </div>
    </div>
  );
}
