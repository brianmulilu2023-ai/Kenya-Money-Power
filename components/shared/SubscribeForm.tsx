'use client';
import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Saving...');
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setEmail('');
      setStatus('Subscribed successfully.');
    } else {
      const body = await res.json();
      setStatus(body.error || 'Subscription failed.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/10 bg-slate-950/90 p-6 shadow-gold sm:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-gold">Stay updated</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Subscribe for new reports and insights.</h2>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-3xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-white outline-none transition focus:border-gold"
          required
        />
        <button type="submit" className="rounded-3xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-400">
          Subscribe
        </button>
      </div>
      {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
    </form>
  );
}
