import { generateRobotsTxt } from '../utils/robots';
import type { RobotsConfig } from '../types';

export default function handler(req: any, res: any) {
  const baseUrl = 'https://example.com';
    
  const config: RobotsConfig = {
    userAgent: '*',
    allow: ['/'],
    disallow: ['/api/', '/admin/', '/_next/'],
    sitemap: [`${baseUrl}/sitemap.xml`],
  };

  const robotsTxt = generateRobotsTxt(config);

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robotsTxt);
}
