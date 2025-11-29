import * as React from 'react';
import Head from 'next/head';
import type { SEOConfig } from '../types';

interface SEOHeadProps {
  config: SEOConfig;
  defaultTitle?: string;
  defaultDescription?: string;
  siteName?: string;
  siteUrl?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  config,
  defaultTitle = 'My Website',
  defaultDescription = 'Welcome to my website',
  siteName = 'My Website',
  siteUrl = '',
}) => {
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

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {config.keywords && config.keywords.length > 0 && (
        <meta name="keywords" content={config.keywords.join(', ')} />
      )}
      {config.author && <meta name="author" content={config.author} />}
      <meta name="robots" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {config.ogSiteName && <meta property="og:site_name" content={config.ogSiteName} />}
      {!config.ogSiteName && siteName && <meta property="og:site_name" content={siteName} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {config.twitterSite && <meta name="twitter:site" content={config.twitterSite} />}
      {config.twitterCreator && <meta name="twitter:creator" content={config.twitterCreator} />}

      {config.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(config.structuredData)
                ? config.structuredData
                : config.structuredData
            ),
          }}
        />
      )}
    </Head>
  );
};

