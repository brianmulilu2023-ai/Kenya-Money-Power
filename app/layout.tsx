import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config';
import { NavBar } from '@/components/shared/NavBar';
import { Footer } from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.siteUrl,
    images: [{ url: `${siteConfig.siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <div className="min-h-screen bg-white text-slate-900">
          <NavBar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
