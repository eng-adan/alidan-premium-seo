/**
 * Type declarations for Next.js (peer dependency)
 * These are stubs to allow compilation when Next.js types aren't installed
 */

declare module 'next' {
  export interface Metadata {
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
  }
  
  export = any;
}

declare module 'next/head' {
  import * as React from 'react';
  
  interface HeadProps {
    children?: React.ReactNode;
  }
  
  const Head: React.ComponentType<HeadProps>;
  export default Head;
}

declare module 'next/metadata' {
  export interface Metadata {
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
  }
}

