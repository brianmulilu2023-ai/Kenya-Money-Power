'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  if (authenticated === null) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white">Checking admin session…</div>;
  }

  return <>{children}</>;
}
