// Example 1: App Router - Static Page
// File: app/about/page.tsx
/*
import { generateSEOMetadata } from 'alidan-premium-seo';

export const metadata = generateSEOMetadata({
  config: {
    title: 'About Us - My Website',
    description: 'Learn more about our company and mission',
    canonical: 'https://example.com/about',
    ogImage: 'https://example.com/images/about-og.jpg',
  },
  siteName: 'My Website',
  siteUrl: 'https://example.com',
});

export default function AboutPage() {
  return <div>About Us</div>;
}
*/

// Example 2: App Router - Dynamic Page with Structured Data
// File: app/blog/[slug]/page.tsx
/*
import { generateSEOMetadata, StructuredData, generateArticleSchema } from 'alidan-premium-seo';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return generateSEOMetadata({
    config: {
      title: `${post.title} - My Blog`,
      description: post.excerpt,
      canonical: `https://example.com/blog/${params.slug}`,
      ogImage: post.featuredImage,
      ogType: 'article',
      keywords: post.tags,
    },
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      name: 'My Blog',
      url: 'https://example.com',
    },
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
*/

// Example 3: Pages Router - Basic Usage
// File: pages/index.tsx
/*
import { SEOHead } from 'alidan-premium-seo';

export default function HomePage() {
  return (
    <>
      <SEOHead
        config={{
          title: 'Home - My Website',
          description: 'Welcome to my website',
          canonical: 'https://example.com',
          ogImage: 'https://example.com/og-image.jpg',
        }}
        siteName="My Website"
        siteUrl="https://example.com"
      />
      <main>
        <h1>Welcome</h1>
      </main>
    </>
  );
}
*/

// Example 4: Pages Router - Dynamic with Hook
// File: pages/products/[id].tsx
/*
import { SEOHead, useSEO } from 'alidan-premium-seo';

export default function ProductPage({ product }: { product: any }) {
  const { seoConfig } = useSEO({
    title: `${product.name} - My Store`,
    description: product.description,
    canonical: `https://example.com/products/${product.id}`,
    ogImage: product.image,
    ogType: 'product',
  });

  return (
    <>
      <SEOHead config={seoConfig} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}
*/

// Example 5: E-commerce Product with Schema
// File: pages/products/[id].tsx
/*
import { StructuredData, generateProductSchema, generateBreadcrumbSchema } from 'alidan-premium-seo';

export default function ProductPage({ product }: { product: any }) {
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.images,
    brand: product.brand,
    offers: {
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Products', url: 'https://example.com/products' },
      { name: product.category, url: `https://example.com/products/${product.category}` },
      { name: product.name, url: `https://example.com/products/${product.id}` },
    ],
  });

  return (
    <>
      <StructuredData data={[productSchema, breadcrumbSchema]} />
      <div>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
      </div>
    </>
  );
}
*/
