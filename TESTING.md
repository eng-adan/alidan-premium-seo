# Testing Guide

## Local Testing Before Publishing

### Method 1: Using npm link (Recommended)

This allows you to test the package in a real Next.js project before publishing.

#### Step 1: Build the package

```bash
npm run build
```

#### Step 2: Create a link

In the plugin directory (`/Users/dev/Development/plugins`):

```bash
npm link
```

#### Step 3: Link in your test project

In your Next.js test project:

```bash
npm link alidan-premium-seo
```

#### Step 4: Test the package

Create a test Next.js project if you don't have one:

```bash
npx create-next-app@latest test-seo-plugin --typescript
cd test-seo-plugin
npm link alidan-premium-seo
```

Then use it in your test project:

```typescript
// app/page.tsx
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'Test Page',
    description: 'Testing the SEO plugin',
    canonical: 'https://example.com',
  },
});

export default function Home() {
  return <div>Test Page</div>;
}
```

#### Step 5: Unlink when done

In your test project:
```bash
npm unlink alidan-premium-seo
```

In the plugin directory:
```bash
npm unlink
```

### Method 2: Using local file path

In your test Next.js project's `package.json`:

```json
{
  "dependencies": {
    "alidan-premium-seo": "file:../plugins"
  }
}
```

Then run:
```bash
npm install
```

### Method 3: Using yarn link

```bash
# In plugin directory
yarn link

# In test project
yarn link alidan-premium-seo
```

## Testing Checklist

- [ ] Build completes without errors
- [ ] TypeScript types are generated correctly
- [ ] All exports are available
- [ ] App Router metadata generation works
- [ ] Pages Router SEOHead component works
- [ ] SEO analysis functions work
- [ ] Structured data generators work
- [ ] Sitemap generation works
- [ ] Robots.txt generation works
- [ ] CSS styles load correctly
- [ ] No console errors in browser
- [ ] Meta tags appear in page source
- [ ] Open Graph tags work
- [ ] Twitter Cards work

## Quick Test Script

Create a simple test file to verify exports:

```typescript
// test-imports.ts
import {
  SEOHead,
  generateSEOMetadata,
  StructuredData,
  SEOAnalysisPanel,
  useSEO,
  analyzeSEO,
  validateBestPractices,
  generateSitemap,
  generateRobotsTxt,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from 'alidan-premium-seo';

console.log('All imports successful!');
```

Run with:
```bash
npx tsx test-imports.ts
```


