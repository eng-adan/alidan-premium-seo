import { SitemapItem } from '../types';

export function generateSitemap(items: SitemapItem[], baseUrl: string): string {
  const urls = items.map((item) => {
    const url = item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`;
    const lastMod = item.lastModified
      ? new Date(item.lastModified).toISOString()
      : new Date().toISOString();
    const changeFreq = item.changeFrequency || 'weekly';
    const priority = item.priority !== undefined ? item.priority : 0.5;

    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapIndex(sitemapUrls: string[]): string {
  const sitemaps = sitemapUrls.map((url) => {
    return `  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join('\n')}
</sitemapindex>`;
}

