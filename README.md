<div align="center">

# Next.js SEO Plugin

**Enterprise-grade SEO toolkit for Next.js applications**

[![npm version](https://img.shields.io/npm/v/alidan-premium-seo.svg)](https://www.npmjs.com/package/alidan-premium-seo)
[![npm downloads](https://img.shields.io/npm/dm/alidan-premium-seo.svg)](https://www.npmjs.com/package/alidan-premium-seo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## 🎯 Overview

Next.js SEO Plugin is a comprehensive, production-ready solution for managing search engine optimization in Next.js applications. Built with TypeScript and designed for both App Router and Pages Router, it provides everything you need to optimize your site for search engines and social media platforms.

Whether you're building a blog, e-commerce site, or corporate website, this plugin simplifies SEO management while providing powerful analysis tools to help you create content that ranks.

### Why Choose Next.js SEO Plugin?

- **🚀 Zero Configuration** - Works out of the box with sensible defaults
- **📊 Real-time Analysis** - Get instant SEO feedback as you write
- **🎨 Beautiful UI** - Professional analysis panel with actionable insights
- **🔒 Type-Safe** - Full TypeScript support with comprehensive type definitions
- **⚡ Performance** - Lightweight with zero runtime overhead
- **🔄 Framework Agnostic** - Works with both App Router and Pages Router
- **📱 Social Ready** - Optimized for Facebook, Twitter, LinkedIn, and more

---

## ✨ Features

### Core SEO Capabilities

| Feature | Description |
|---------|-------------|
| **Meta Tags** | Complete control over title, description, keywords, and author tags |
| **Open Graph** | Rich social media previews for Facebook, LinkedIn, and more |
| **Twitter Cards** | Optimized Twitter sharing with large image support |
| **Structured Data** | Schema.org JSON-LD for rich snippets and enhanced search results |
| **Canonical URLs** | Prevent duplicate content issues automatically |
| **Sitemap Generation** | Dynamic XML sitemap creation with priority and change frequency |
| **Robots.txt** | Programmatic robots.txt generation with flexible rules |

### Advanced Analysis Tools

| Tool | Benefit |
|------|---------|
| **SEO Scoring** | Real-time score (0-100) with traffic light indicators |
| **Keyword Analysis** | Track focus keyword density, placement, and optimization |
| **Readability Check** | Flesch Reading Ease scoring and content structure analysis |
| **Best Practices** | Automatic validation against SEO industry standards |
| **Issue Detection** | Color-coded issues with specific, actionable fixes |

---

## 📋 Requirements

- **Next.js** 13.0.0 or higher
- **React** 18.0.0 or higher
- **TypeScript** 5.0.0 or higher (recommended)

---

## 🚀 Installation

```bash
# npm
npm install alidan-premium-seo

# yarn
yarn add alidan-premium-seo

# pnpm
pnpm add alidan-premium-seo
```

---

## ⚡ Quick Start

### App Router (Next.js 13+)

```typescript
// app/page.tsx
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'Home Page - My Website',
    description: 'Welcome to my amazing website',
    canonical: 'https://example.com',
    ogImage: 'https://example.com/og-image.jpg',
  },
  siteName: 'My Website',
  siteUrl: 'https://example.com',
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
          description: 'Welcome to my amazing website',
          canonical: 'https://example.com',
          ogImage: 'https://example.com/og-image.jpg',
        }}
        siteName="My Website"
        siteUrl="https://example.com"
      />
      <main>Welcome</main>
    </>
  );
}
```

---

## 📖 Documentation

### Table of Contents

- [Basic Usage](#basic-usage)
- [Dynamic Pages](#dynamic-pages)
- [SEO Analysis](#seo-analysis)
- [Structured Data](#structured-data)
- [Sitemap & Robots](#sitemap--robots)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)

---

### Basic Usage

#### App Router

```typescript
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'Page Title',
    description: 'Page description for search engines',
    keywords: ['keyword1', 'keyword2'],
    canonical: 'https://example.com/page',
    ogImage: 'https://example.com/image.jpg',
    twitterCard: 'summary_large_image',
  },
});
```

#### Pages Router

```typescript
import { SEOHead } from 'alidan-premium-seo';

export default function Page() {
  return (
    <>
      <SEOHead
        config={{
          title: 'Page Title',
          description: 'Page description',
          canonical: 'https://example.com/page',
        }}
      />
      {/* Your content */}
    </>
  );
}
```

---

### Dynamic Pages

#### App Router

```typescript
// app/blog/[slug]/page.tsx
import { generateSEOMetadata } from 'alidan-premium-seo';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  return generateSEOMetadata({
    config: {
      title: `${post.title} - Blog`,
      description: post.excerpt,
      canonical: `https://example.com/blog/${params.slug}`,
      ogImage: post.image,
      ogType: 'article',
      focusKeyword: post.primaryKeyword,
    },
  });
}
```

#### Pages Router with Hook

```typescript
// pages/blog/[slug].tsx
import { SEOHead, useSEO } from 'alidan-premium-seo';

export default function BlogPost({ post }: { post: Post }) {
  const { seoConfig, updateSEO } = useSEO({
    title: `${post.title} - Blog`,
    description: post.excerpt,
    canonical: `https://example.com/blog/${post.slug}`,
    focusKeyword: post.primaryKeyword,
  });

  return (
    <>
      <SEOHead config={seoConfig} />
      <article>{/* Content */}</article>
    </>
  );
}
```

---

### SEO Analysis

Get real-time SEO feedback with our built-in analysis tools.

#### Using the Analysis Panel

```typescript
import { useSEO, SEOAnalysisPanel } from 'alidan-premium-seo';
import 'alidan-premium-seo/dist/styles/seo-analysis.css';

function ContentEditor() {
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: 'My Page',
    description: 'Page description',
    focusKeyword: 'nextjs seo',
    content: 'Your page content...',
  });

  return (
    <div className="editor-layout">
      <div className="editor">
        <input
          value={seoConfig.title}
          onChange={(e) => updateSEO({ title: e.target.value })}
        />
        {/* More inputs */}
      </div>
      <SEOAnalysisPanel analysis={analysis} />
    </div>
  );
}
```

#### Manual Analysis

```typescript
import { analyzeSEO } from 'alidan-premium-seo';

const analysis = analyzeSEO({
  title: 'My Page',
  description: 'Description',
  focusKeyword: 'keyword',
  content: 'Content text...',
});

console.log(`SEO Score: ${analysis.score}/100`);
analysis.issues.forEach(issue => {
  console.log(`${issue.severity}: ${issue.message}`);
  if (issue.fix) console.log(`  → ${issue.fix}`);
});
```

#### Analysis Features

- **Score Calculation**: 0-100 score based on multiple factors
- **Keyword Tracking**: Monitor focus keyword usage and density
- **Readability Metrics**: Flesch Reading Ease, sentence length, paragraph structure
- **Issue Detection**: Automatic identification of SEO problems
- **Actionable Fixes**: Specific recommendations for each issue

---

### Structured Data

Generate Schema.org structured data for rich snippets.

```typescript
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  StructuredData,
} from 'alidan-premium-seo';

// Article schema
const articleSchema = generateArticleSchema({
  headline: 'Article Title',
  description: 'Article description',
  image: 'https://example.com/image.jpg',
  datePublished: '2024-01-01',
  author: { name: 'Author Name' },
  publisher: { name: 'Site Name', url: 'https://example.com' },
});

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema({
  items: [
    { name: 'Home', url: 'https://example.com' },
    { name: 'Category', url: 'https://example.com/category' },
    { name: 'Page', url: 'https://example.com/page' },
  ],
});

// Use in component
<StructuredData data={[articleSchema, breadcrumbSchema]} />
```

Available schema generators:
- `generateOrganizationSchema()` - Organization information
- `generateArticleSchema()` - Blog posts and articles
- `generateBreadcrumbSchema()` - Navigation breadcrumbs
- `generateProductSchema()` - E-commerce products
- `generateWebSiteSchema()` - Website information

---

### Sitemap & Robots

#### Sitemap (App Router)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Add more routes
  ];
}
```

#### Sitemap (Pages Router)

```typescript
// pages/api/sitemap.xml.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap } from 'alidan-premium-seo';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = generateSitemap(
    [
      { url: '/', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      // Add more routes
    ],
    'https://example.com'
  );

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
```

#### Robots.txt (App Router)

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
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

#### Robots.txt (Pages Router)

```typescript
// pages/api/robots.txt.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateRobotsTxt } from 'alidan-premium-seo';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = generateRobotsTxt({
    userAgent: '*',
    allow: ['/'],
    disallow: ['/api/', '/admin/'],
    sitemap: ['https://example.com/sitemap.xml'],
  });

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robotsTxt);
}
```

---

## 📚 API Reference

### Components

#### `SEOHead`

React component for Pages Router that renders SEO meta tags.

```typescript
<SEOHead
  config={SEOConfig}
  defaultTitle?: string
  defaultDescription?: string
  siteName?: string
  siteUrl?: string
/>
```

#### `SEOAnalysisPanel`

Visual display of SEO analysis results.

```typescript
<SEOAnalysisPanel
  analysis={SEOAnalysis}
  className?: string
/>
```

#### `StructuredData`

Injects Schema.org structured data into the page.

```typescript
<StructuredData data={Record<string, any> | Record<string, any>[]} />
```

### Functions

#### `generateSEOMetadata(config, options?)`

Generates Next.js App Router metadata object.

```typescript
const metadata = generateSEOMetadata({
  config: SEOConfig,
  defaultTitle?: string,
  defaultDescription?: string,
  siteName?: string,
  siteUrl?: string,
});
```

#### `analyzeSEO(config, content?)`

Analyzes SEO configuration and returns detailed analysis.

```typescript
const analysis = analyzeSEO(config, content?);
// Returns: SEOAnalysis
```

#### `validateBestPractices(config)`

Validates configuration against SEO best practices.

```typescript
const checks = validateBestPractices(config);
// Returns: BestPracticeCheck[]
```

#### `generateSitemap(items, baseUrl)`

Generates XML sitemap string.

```typescript
const sitemap = generateSitemap(sitemapItems, 'https://example.com');
```

#### `generateRobotsTxt(config)`

Generates robots.txt content.

```typescript
const robotsTxt = generateRobotsTxt({
  userAgent: '*',
  allow: ['/'],
  disallow: ['/api/'],
});
```

### Hooks

#### `useSEO(initialConfig?)`

Manages SEO state with automatic analysis.

```typescript
const {
  seoConfig,
  updateSEO,
  setSEO,
  resetSEO,
  analysis,
  analyze,
} = useSEO(initialConfig);
```

### Type Definitions

```typescript
interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  focusKeyword?: string;
  content?: string;
  // ... more options
}

interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  readability?: ReadabilityAnalysis;
  keywordAnalysis?: KeywordAnalysis;
}
```

For complete type definitions, see the [TypeScript definitions](./src/types.ts).

---

## 🎓 Best Practices

### Title Optimization

- ✅ Keep titles between 30-60 characters
- ✅ Include your focus keyword near the beginning
- ✅ Make titles descriptive and compelling
- ❌ Avoid keyword stuffing
- ❌ Don't use generic titles like "Home" or "Page 1"

### Meta Descriptions

- ✅ Aim for 120-160 characters
- ✅ Include a call-to-action when appropriate
- ✅ Make descriptions unique for each page
- ✅ Include your focus keyword naturally

### Images

- ✅ Use high-quality images (1200x630px for Open Graph)
- ✅ Optimize images for web (WebP format recommended)
- ✅ Add descriptive alt text
- ✅ Use absolute URLs for social media images

### Structured Data

- ✅ Use appropriate schema types for your content
- ✅ Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results)
- ✅ Keep structured data accurate and up-to-date

### Content Quality

- ✅ Aim for Flesch Reading Ease score of 60-70
- ✅ Use subheadings to structure content
- ✅ Keep paragraphs under 150 words
- ✅ Maintain keyword density between 0.5-2.5%

### Technical SEO

- ✅ Always set canonical URLs
- ✅ Keep sitemaps updated
- ✅ Use proper robots.txt configuration
- ✅ Monitor SEO scores before publishing

---

## 🎨 Styling

The SEO Analysis Panel comes with default styles. Import them in your application:

```typescript
// In your app entry point or layout
import 'alidan-premium-seo/dist/styles/seo-analysis.css';
```

Or include in your global CSS:

```css
@import 'alidan-premium-seo/dist/styles/seo-analysis.css';
```

You can customize the styles by overriding the CSS variables or targeting the component classes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the Next.js community
- Built following industry best practices from Google and the SEO community
- Thanks to all contributors and users

---

<div align="center">

**Made with ❤️ by Adan Sarfraz**

[Report Bug](https://github.com/adan-sarfraz/alidan-premium-seo/issues) • [Request Feature](https://github.com/adan-sarfraz/alidan-premium-seo/issues) • [Documentation](https://github.com/adan-sarfraz/alidan-premium-seo#readme)

</div>
