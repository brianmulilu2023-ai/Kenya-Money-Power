import { siteConfig } from './config';

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getPostUrl(slug: string) {
  return `${siteConfig.siteUrl}/blog/${slug}`;
}
