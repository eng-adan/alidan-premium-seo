import * as React from 'react';
import type { SEOConfig } from '../types';

type Metadata = {
  title?: string | { default?: string; template?: string };
  description?: string;
  keywords?: string | string[];
  authors?: Array<{ name: string; url?: string }>;
  robots?: string;
  alternates?: {
    canonical?: string;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{ url: string }>;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
    site?: string;
    creator?: string;
  };
};

interface SEOHeadAppRouterProps {
  config: SEOConfig;
  defaultTitle?: string;
  defaultDescription?: string;
  siteName?: string;
  siteUrl?: string;
}

export function generateSEOMetadata({
  config,
  defaultTitle = 'My Website',
  defaultDescription = 'Welcome to my website',
  siteName = 'My Website',
  siteUrl = '',
}: SEOHeadAppRouterProps): Metadata {
  const title = config.title || defaultTitle;
  const description = config.description || defaultDescription;
  const canonical = config.canonical || '';
  const robots = config.robots || (config.noindex ? 'noindex' : 'index') + (config.nofollow ? ',nofollow' : ',follow');

  const ogTitle = config.ogTitle || title;
  const ogDescription = config.ogDescription || description;
  const ogImage = config.ogImage || '';
  const ogType = config.ogType || 'website';
  const ogUrl = config.ogUrl || canonical || '';

  const twitterCard = config.twitterCard || 'summary_large_image';
  const twitterTitle = config.twitterTitle || ogTitle;
  const twitterDescription = config.twitterDescription || ogDescription;
  const twitterImage = config.twitterImage || ogImage;

  const metadata: Metadata = {
    title,
    description,
    keywords: config.keywords,
    authors: config.author ? [{ name: config.author }] : undefined,
    robots: robots,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: config.ogSiteName || siteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: ogType as any,
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
      site: config.twitterSite,
      creator: config.twitterCreator,
    },
  };

  return metadata;
}

export function StructuredData({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : data),
      }}
    />
  );
}

