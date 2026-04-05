import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/search', label: 'Search' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/admin/login', label: 'Admin' },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/5 bg-black/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Kenya Money & Power
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
