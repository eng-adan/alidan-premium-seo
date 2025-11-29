export interface OrganizationSchema {
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

export interface ArticleSchema {
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: OrganizationSchema;
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export interface ProductSchema {
  name: string;
  description?: string;
  image?: string | string[];
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
}

export function generateOrganizationSchema(org: OrganizationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    ...(org.url && { url: org.url }),
    ...(org.logo && { logo: org.logo }),
    ...(org.sameAs && org.sameAs.length > 0 && { sameAs: org.sameAs }),
    ...(org.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...org.contactPoint,
      },
    }),
  };
}

export function generateArticleSchema(article: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    ...(article.description && { description: article.description }),
    ...(article.image && { image: Array.isArray(article.image) ? article.image : [article.image] }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.author && {
      author: {
        '@type': 'Person',
        name: article.author.name,
        ...(article.author.url && { url: article.author.url }),
      },
    }),
    ...(article.publisher && {
      publisher: generateOrganizationSchema(article.publisher),
    }),
  };
}

export function generateBreadcrumbSchema(breadcrumb: BreadcrumbSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product: ProductSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(product.description && { description: product.description }),
    ...(product.image && { image: Array.isArray(product.image) ? product.image : [product.image] }),
    ...(product.brand && { brand: product.brand }),
    ...(product.offers && {
      offers: {
        '@type': 'Offer',
        price: product.offers.price,
        priceCurrency: product.offers.priceCurrency,
        ...(product.offers.availability && { availability: product.offers.availability }),
      },
    }),
  };
}

export function generateWebSiteSchema(siteName: string, siteUrl: string, searchUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

