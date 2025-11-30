// Components
export { SEOHead } from './components/SEOHead';
export { generateSEOMetadata, StructuredData } from './components/SEOHeadAppRouter';
export { SEOAnalysisPanel } from './components/SEOAnalysisPanel';

// Hooks
export { useSEO } from './hooks/useSEO';

// Utilities
export * from './utils/sitemap';
export * from './utils/robots';
export * from './utils/structured-data';
export * from './utils/seo-analysis';
export * from './utils/best-practices';

// Types
export * from './types';

// Default export for convenience
import { SEOHead } from './components/SEOHead';
import { generateSEOMetadata, StructuredData } from './components/SEOHeadAppRouter';
import { SEOAnalysisPanel } from './components/SEOAnalysisPanel';
import { useSEO } from './hooks/useSEO';
import { analyzeSEO, getSEOScoreColor, getSEOScoreLabel } from './utils/seo-analysis';
import { validateBestPractices, getBestPracticesScore } from './utils/best-practices';
import { generateSitemap, generateSitemapIndex } from './utils/sitemap';
import { generateRobotsTxt } from './utils/robots';
import {
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  generateWebSiteSchema,
} from './utils/structured-data';

const AlidanPremiumSEO = {
  // Components
  SEOHead,
  generateSEOMetadata,
  StructuredData,
  SEOAnalysisPanel,
  
  // Hooks
  useSEO,
  
  // Analysis
  analyzeSEO,
  getSEOScoreColor,
  getSEOScoreLabel,
  
  // Best Practices
  validateBestPractices,
  getBestPracticesScore,
  
  // Sitemap
  generateSitemap,
  generateSitemapIndex,
  
  // Robots
  generateRobotsTxt,
  
  // Structured Data
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  generateWebSiteSchema,
};

export default AlidanPremiumSEO;

