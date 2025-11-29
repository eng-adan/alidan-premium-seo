import type { SitemapItem } from '../types';

export default function sitemap(): any {
  const sitemapItems: SitemapItem[] = [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const baseUrl = 'https://example.com';
  
  return sitemapItems.map((item) => ({
    url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    lastModified: item.lastModified ? new Date(item.lastModified) : new Date(),
    changeFrequency: item.changeFrequency || 'weekly',
    priority: item.priority || 0.5,
  }));
}
