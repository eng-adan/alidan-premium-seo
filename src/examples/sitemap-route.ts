import { generateSitemap } from '../utils/sitemap';
import type { SitemapItem } from '../types';

export default function handler(req: any, res: any) {
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
  const sitemap = generateSitemap(sitemapItems, baseUrl);

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
