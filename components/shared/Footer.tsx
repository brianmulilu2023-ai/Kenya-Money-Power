import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/5 bg-black px-4 py-10 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>Kenya Money & Power — Where money meets politics, and data drives decisions.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/work-with-me" className="transition hover:text-white">
            Work With Me
          </Link>
          <Link href="/blog" className="transition hover:text-white">
            Blog
          </Link>
          <a href="https://wa.me/" className="transition hover:text-white">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
