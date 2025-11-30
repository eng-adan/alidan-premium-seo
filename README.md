<div align="center">

# Next.js SEO Plugin

**A complete SEO toolkit for Next.js applications**

[![npm version](https://img.shields.io/npm/v/alidan-premium-seo.svg)](https://www.npmjs.com/package/alidan-premium-seo)
[![npm downloads](https://img.shields.io/npm/dm/alidan-premium-seo.svg)](https://www.npmjs.com/package/alidan-premium-seo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## What is this?

`alidan-premium-seo` is a SEO package for Next.js that handles meta tags, Open Graph, Twitter Cards, structured data, sitemaps, and includes real-time SEO analysis. Works with both App Router and Pages Router.

---

## Purpose

Managing SEO in Next.js applications is tedious. You need to:
- Write meta tags for every page
- Set up Open Graph tags for social sharing
- Add Twitter Card metadata
- Generate structured data (Schema.org) for rich snippets
- Create and maintain sitemaps
- Configure robots.txt
- Validate SEO best practices
- Track keyword usage and density

Doing this manually means repeating boilerplate code, making mistakes, and spending hours on tasks that should be automated. This package handles all of it with a simple API.

---

## Features

**Meta Tags Management**
- Title, description, keywords, author tags
- Automatic character counting and validation
- Canonical URL handling
- Robots directives (noindex, nofollow)

**Social Media Optimization**
- Open Graph tags for Facebook, LinkedIn, etc.
- Twitter Card support (summary, large image)
- Automatic fallbacks and defaults

**Structured Data**
- Schema.org JSON-LD generation
- Article, Product, Organization, Breadcrumb, Website schemas
- Type-safe schema builders

**Technical SEO**
- Dynamic sitemap generation (App Router & Pages Router)
- Programmatic robots.txt creation
- Support for both Next.js routing systems

**SEO Analysis**
- Real-time SEO scoring (0-100)
- Keyword density tracking
- Readability analysis (Flesch Reading Ease)
- Automatic issue detection with actionable fixes
- Best practices validation

**Developer Experience**
- Full TypeScript support
- Works with App Router and Pages Router
- Zero configuration required
- Lightweight with no runtime overhead

---

## Why use this instead of manual work?

### Problem 1: Repetitive Boilerplate

**Manual approach:**
```typescript
// You write this for every page
<Head>
  <title>Page Title</title>
  <meta name="description" content="Description" />
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Description" />
  <meta property="og:image" content="https://..." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />
  <meta name="twitter:description" content="Description" />
  <link rel="canonical" href="https://..." />
  {/* ... 20+ more lines */}
</Head>
```

**With this package:**
```typescript
<SEOHead config={{ title: 'Page Title', description: 'Description' }} />
```

One line instead of 20+. The package generates all meta tags automatically.

### Problem 2: Easy to Make Mistakes

**Manual issues:**
- Forget to add Open Graph tags → poor social sharing
- Missing canonical URLs → duplicate content penalties
- Wrong meta tag format → search engines ignore them
- Inconsistent formatting across pages

**How this package helps:**
- Validates all inputs
- Ensures correct meta tag structure
- Provides sensible defaults
- Consistent output across all pages

### Problem 3: No SEO Feedback

**Manual approach:**
- Write content, publish, hope it's optimized
- No way to know if title is too long
- No keyword density tracking
- No readability checks
- Find issues after publishing

**How this package helps:**
- Real-time SEO analysis as you type
- Instant feedback on title length, description length
- Keyword density calculations
- Readability scoring
- Issue detection before publishing

### Problem 4: Structured Data is Complex

**Manual approach:**
```typescript
// Writing Schema.org JSON-LD manually
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Description",
  "image": "https://...",
  "datePublished": "2024-01-01",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Publisher",
    "url": "https://..."
  }
})}
</script>
```

Easy to make syntax errors, forget required fields, or use wrong schema types.

**With this package:**
```typescript
const schema = generateArticleSchema({
  headline: 'Article Title',
  description: 'Description',
  image: 'https://...',
  datePublished: '2024-01-01',
  author: { name: 'Author Name' },
  publisher: { name: 'Publisher', url: 'https://...' },
});
```

Type-safe, validated, and guaranteed to be correct.

### Problem 5: Sitemap Maintenance

**Manual approach:**
- Create XML sitemap file
- Update it every time you add/remove pages
- Manually set priorities and change frequencies
- Easy to forget or make errors

**How this package helps:**
- Generate sitemaps programmatically
- Pull from your routes automatically
- Type-safe configuration
- Works with dynamic routes

### Problem 6: Time Consuming

**Manual SEO setup per page:**
- Write meta tags: 5-10 minutes
- Add Open Graph: 5 minutes
- Create structured data: 10-15 minutes
- Validate everything: 5 minutes
- **Total: 25-30 minutes per page**

**With this package:**
- Configure SEO: 1-2 minutes
- Analysis feedback: instant
- **Total: 1-2 minutes per page**

Saves 20+ minutes per page. For a site with 50 pages, that's 16+ hours saved.

### Problem 7: No Type Safety

**Manual approach:**
- Typos in meta tag names
- Wrong property values
- Missing required fields
- Runtime errors discovered later

**How this package helps:**
- Full TypeScript support
- Compile-time error checking
- Autocomplete for all options
- Type-safe schema generation

---

## How it works

The package provides a unified API for all SEO needs:

1. **Configuration**: Pass your SEO data once
2. **Generation**: Automatically creates all meta tags, structured data, etc.
3. **Analysis**: Real-time feedback on SEO quality
4. **Validation**: Ensures everything follows best practices

You focus on your content, the package handles the technical SEO details.

---

## Installation

```bash
npm install alidan-premium-seo
```

Requires Next.js 13+ and React 18+.

---

## Quick Start

### App Router

```typescript
// app/page.tsx
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'Home Page - My Website',
    description: 'Welcome to my website',
    canonical: 'https://mywebsite.com',
    ogImage: 'https://mywebsite.com/og-image.jpg',
  },
  siteName: 'My Website',
  siteUrl: 'https://mywebsite.com',
});

export default function HomePage() {
  return <main>Welcome</main>;
}
```

### Pages Router

```typescript
// pages/index.tsx
import { SEOHead } from 'alidan-premium-seo';

export default function HomePage() {
  return (
    <>
      <SEOHead
        config={{
          title: 'Home Page - My Website',
          description: 'Welcome to my website',
          canonical: 'https://mywebsite.com',
          ogImage: 'https://mywebsite.com/og-image.jpg',
        }}
        siteName="My Website"
        siteUrl="https://mywebsite.com"
      />
      <main>Welcome</main>
    </>
  );
}
```

---

## Examples

### Blog Post with Structured Data

```typescript
// app/blog/[slug]/page.tsx
import { generateSEOMetadata, StructuredData, generateArticleSchema } from 'alidan-premium-seo';

async function getPost(slug: string) {
  // Your data fetching
  return {
    title: 'How to Build Better SEO',
    excerpt: 'Learn the secrets of great SEO...',
    image: 'https://example.com/post-image.jpg',
    author: { name: 'John Doe' },
    publishedAt: '2024-01-15',
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return generateSEOMetadata({
    config: {
      title: `${post.title} - My Blog`,
      description: post.excerpt,
      canonical: `https://mywebsite.com/blog/${params.slug}`,
      ogImage: post.image,
      ogType: 'article',
    },
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: { name: post.author.name },
    publisher: { name: 'My Blog', url: 'https://mywebsite.com' },
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </article>
    </>
  );
}
```

### E-commerce Product Page

```typescript
// app/products/[id]/page.tsx
import { generateSEOMetadata, StructuredData, generateProductSchema } from 'alidan-premium-seo';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return generateSEOMetadata({
    config: {
      title: `${product.name} - $${product.price} | My Store`,
      description: product.description,
      canonical: `https://mystore.com/products/${params.id}`,
      ogImage: product.images[0],
      ogType: 'product',
    },
  });
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.images,
    brand: product.brand,
    offers: {
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <div>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
      </div>
    </>
  );
}
```

### SEO Form with Analysis

```typescript
// components/SEOForm.tsx
'use client';

import { useState } from 'react';
import { useSEO, SEOAnalysisPanel } from 'alidan-premium-seo';
import 'alidan-premium-seo/dist/styles/seo-analysis.css';

export default function SEOForm() {
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: '',
    description: '',
    focusKeyword: '',
  });

  const [content, setContent] = useState('');

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2>SEO Settings</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label>
            Page Title ({seoConfig.title?.length || 0} / 60)
          </label>
          <input
            type="text"
            value={seoConfig.title || ''}
            onChange={(e) => updateSEO({ title: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            Meta Description ({seoConfig.description?.length || 0} / 160)
          </label>
          <textarea
            value={seoConfig.description || ''}
            onChange={(e) => updateSEO({ description: e.target.value })}
            rows={3}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Focus Keyword</label>
          <input
            type="text"
            value={seoConfig.focusKeyword || ''}
            onChange={(e) => updateSEO({ focusKeyword: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              updateSEO({ content: e.target.value });
            }}
            rows={10}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
      </div>

      <div style={{ width: '350px' }}>
        <SEOAnalysisPanel analysis={analysis} />
      </div>
    </div>
  );
}
```

### Sitemap (App Router)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mywebsite.com';
  const posts = await fetchPosts();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
```

### Robots.txt (App Router)

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://mywebsite.com/sitemap.xml',
  };
}
```

---

## SEO Analysis

The package includes real-time SEO analysis. Use the `useSEO` hook to get instant feedback:

```typescript
import { useSEO, SEOAnalysisPanel } from 'alidan-premium-seo';
import 'alidan-premium-seo/dist/styles/seo-analysis.css';

function ContentEditor() {
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: 'My Page Title',
    description: 'My page description',
    focusKeyword: 'nextjs seo',
    content: 'Your page content here...',
  });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <input
          value={seoConfig.title}
          onChange={(e) => updateSEO({ title: e.target.value })}
        />
      </div>
      <SEOAnalysisPanel analysis={analysis} />
    </div>
  );
}
```

The analysis panel shows SEO score, issues, keyword density, and readability metrics.

---

## API Reference

### Components

#### `SEOHead` (Pages Router)

```typescript
import { SEOHead } from 'alidan-premium-seo';

<SEOHead
  config={{
    title: 'Page Title',
    description: 'Page description',
    canonical: 'https://example.com/page',
    ogImage: 'https://example.com/image.jpg',
    keywords: ['keyword1', 'keyword2'],
    focusKeyword: 'primary keyword',
    noindex: false,
    nofollow: false,
  }}
  siteName="My Website"
  siteUrl="https://example.com"
/>
```

#### `generateSEOMetadata` (App Router)

```typescript
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'Page Title',
    description: 'Page description',
    canonical: 'https://example.com/page',
    ogImage: 'https://example.com/image.jpg',
  },
  siteName: 'My Website',
  siteUrl: 'https://example.com',
});
```

#### `SEOAnalysisPanel`

```typescript
import { SEOAnalysisPanel } from 'alidan-premium-seo';

<SEOAnalysisPanel analysis={analysis} />
```

#### `StructuredData`

```typescript
import { StructuredData, generateArticleSchema } from 'alidan-premium-seo';

const schema = generateArticleSchema({
  headline: 'Article Title',
  description: 'Article description',
  image: 'https://example.com/image.jpg',
  datePublished: '2024-01-01',
  author: { name: 'Author Name' },
  publisher: { name: 'Site Name', url: 'https://example.com' },
});

<StructuredData data={schema} />
```

### Hooks

#### `useSEO`

```typescript
import { useSEO } from 'alidan-premium-seo';

const {
  seoConfig,      // Current SEO configuration
  updateSEO,      // Update SEO config (merges with existing)
  setSEO,         // Replace entire SEO config
  resetSEO,       // Reset to default
  analysis,       // Real-time SEO analysis
  analyze,        // Manual analysis function
} = useSEO({
  title: 'Initial Title',
  description: 'Initial Description',
  focusKeyword: 'keyword',
  content: 'Page content...',
});
```

### Utilities

#### `analyzeSEO`

```typescript
import { analyzeSEO } from 'alidan-premium-seo';

const analysis = analyzeSEO({
  title: 'My Page',
  description: 'Description',
  focusKeyword: 'keyword',
  content: 'Content text...',
});
```

#### `generateSitemap` (Pages Router)

```typescript
import { generateSitemap } from 'alidan-premium-seo';

const sitemap = generateSitemap(
  [
    { url: '/', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: '/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ],
  'https://example.com'
);
```

#### `generateRobotsTxt`

```typescript
import { generateRobotsTxt } from 'alidan-premium-seo';

const robotsTxt = generateRobotsTxt({
  userAgent: '*',
  allow: ['/'],
  disallow: ['/api/', '/admin/'],
  sitemap: ['https://example.com/sitemap.xml'],
});
```

### Schema Generators

```typescript
import {
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  generateWebSiteSchema,
} from 'alidan-premium-seo';

// Organization
const orgSchema = generateOrganizationSchema({
  name: 'My Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
});

// Article
const articleSchema = generateArticleSchema({
  headline: 'Article Title',
  description: 'Description',
  image: 'https://example.com/image.jpg',
  datePublished: '2024-01-01',
  author: { name: 'Author' },
  publisher: { name: 'Publisher', url: 'https://example.com' },
});

// Breadcrumb
const breadcrumbSchema = generateBreadcrumbSchema({
  items: [
    { name: 'Home', url: 'https://example.com' },
    { name: 'Category', url: 'https://example.com/category' },
  ],
});

// Product
const productSchema = generateProductSchema({
  name: 'Product Name',
  description: 'Product description',
  image: ['https://example.com/image1.jpg'],
  brand: 'Brand Name',
  offers: {
    price: '99.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
});
```

---

## Styling

Import the default styles for the SEO Analysis Panel:

```typescript
import 'alidan-premium-seo/dist/styles/seo-analysis.css';
```

You can customize the styles by overriding CSS variables or targeting component classes.

---

## TypeScript

Full TypeScript support is included. All types are exported:

```typescript
import type { SEOConfig, SEOAnalysis, SEOIssue } from 'alidan-premium-seo';
```

---

## Notes

- This package doesn't include form components. You'll need to create your own forms to collect SEO data.
- The SEO analysis works best when you provide both the SEO config and the page content.
- Always use absolute URLs for Open Graph images and canonical URLs.
- Validate structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results).

---

## Contributing

Contributions welcome. Open an issue or submit a PR.

---

## License

MIT

---

<div align="center">

Made by Adan Sarfraz

[Report Bug](https://github.com/eng-adan/alidan-premium-seo/issues) • [Request Feature](https://github.com/eng-adan/alidan-premium-seo/issues)

</div>
