export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
  nofollow?: boolean;
  // Advanced SEO features
  focusKeyword?: string;
  content?: string;
  slug?: string;
}

export type SEOIssueSeverity = 'good' | 'warning' | 'error';

export interface SEOIssue {
  id: string;
  message: string;
  severity: SEOIssueSeverity;
  fix?: string;
}

export interface SEOAnalysis {
  score: number; // 0-100
  issues: SEOIssue[];
  readability?: ReadabilityAnalysis;
  keywordAnalysis?: KeywordAnalysis;
}

export interface ReadabilityAnalysis {
  score: number; // 0-100
  issues: SEOIssue[];
  fleschReadingEase?: number;
  averageSentenceLength?: number;
  paragraphCount?: number;
  sentenceCount?: number;
}

export interface KeywordAnalysis {
  focusKeyword: string;
  keywordDensity: number; // percentage
  keywordInTitle: boolean;
  keywordInDescription: boolean;
  keywordInUrl: boolean;
  keywordInFirstParagraph: boolean;
  keywordInContent: boolean;
  keywordCount: number;
  issues: SEOIssue[];
}

export interface SitemapItem {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface RobotsConfig {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
  sitemap?: string[];
}

