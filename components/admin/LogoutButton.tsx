'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button onClick={logout} className="rounded-3xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-red-500 hover:text-red-600">
      Sign out
    </button>
  );
}
