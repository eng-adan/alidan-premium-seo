import { RobotsConfig } from '../types';

export function generateRobotsTxt(config: RobotsConfig | RobotsConfig[]): string {
  const configs = Array.isArray(config) ? config : [config];
  
  const rules = configs.map((cfg) => {
    const userAgent = cfg.userAgent || '*';
    const lines: string[] = [`User-agent: ${userAgent}`];
    
    if (cfg.allow && cfg.allow.length > 0) {
      cfg.allow.forEach((path) => lines.push(`Allow: ${path}`));
    }
    
    if (cfg.disallow && cfg.disallow.length > 0) {
      cfg.disallow.forEach((path) => lines.push(`Disallow: ${path}`));
    }
    
    if (cfg.crawlDelay !== undefined) {
      lines.push(`Crawl-delay: ${cfg.crawlDelay}`);
    }
    
    return lines.join('\n');
  });
  
  const sitemaps: string[] = [];
  configs.forEach((cfg) => {
    if (cfg.sitemap) {
      sitemaps.push(...cfg.sitemap);
    }
  });
  
  const sitemapLines = sitemaps.length > 0
    ? sitemaps.map((sitemap) => `Sitemap: ${sitemap}`).join('\n')
    : '';
  
  return [...rules, sitemapLines].filter(Boolean).join('\n\n');
}

