import { SEOConfig } from '../types';

export interface BestPracticeCheck {
  id: string;
  name: string;
  passed: boolean;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export function validateBestPractices(config: SEOConfig): BestPracticeCheck[] {
  const checks: BestPracticeCheck[] = [];

  // Title checks
  if (!config.title || config.title.trim().length === 0) {
    checks.push({
      id: 'title-missing',
      name: 'Page Title',
      passed: false,
      message: 'Page title is required',
      priority: 'high',
    });
  } else {
    const titleLength = config.title.length;
    if (titleLength < 30) {
      checks.push({
        id: 'title-too-short',
        name: 'Title Length',
        passed: false,
        message: `Title is too short (${titleLength} chars). Recommended: 30-60 characters.`,
        priority: 'high',
      });
    } else if (titleLength > 60) {
      checks.push({
        id: 'title-too-long',
        name: 'Title Length',
        passed: false,
        message: `Title is too long (${titleLength} chars). Recommended: 30-60 characters.`,
        priority: 'medium',
      });
    } else {
      checks.push({
        id: 'title-optimal',
        name: 'Title Length',
        passed: true,
        message: `Title length is optimal (${titleLength} characters)`,
        priority: 'high',
      });
    }

    // Check if title starts with focus keyword
    if (config.focusKeyword && !config.title.toLowerCase().includes(config.focusKeyword.toLowerCase())) {
      checks.push({
        id: 'title-no-keyword',
        name: 'Title Keyword',
        passed: false,
        message: 'Focus keyword not found in title',
        priority: 'high',
      });
    }
  }

  // Description checks
  if (!config.description || config.description.trim().length === 0) {
    checks.push({
      id: 'description-missing',
      name: 'Meta Description',
      passed: false,
      message: 'Meta description is required',
      priority: 'high',
    });
  } else {
    const descLength = config.description.length;
    if (descLength < 120) {
      checks.push({
        id: 'description-too-short',
        name: 'Description Length',
        passed: false,
        message: `Description is too short (${descLength} chars). Recommended: 120-160 characters.`,
        priority: 'high',
      });
    } else if (descLength > 160) {
      checks.push({
        id: 'description-too-long',
        name: 'Description Length',
        passed: false,
        message: `Description is too long (${descLength} chars). Recommended: 120-160 characters.`,
        priority: 'medium',
      });
    } else {
      checks.push({
        id: 'description-optimal',
        name: 'Description Length',
        passed: true,
        message: `Description length is optimal (${descLength} characters)`,
        priority: 'high',
      });
    }

    // Check if description includes focus keyword
    if (config.focusKeyword && !config.description.toLowerCase().includes(config.focusKeyword.toLowerCase())) {
      checks.push({
        id: 'description-no-keyword',
        name: 'Description Keyword',
        passed: false,
        message: 'Focus keyword not found in meta description',
        priority: 'medium',
      });
    }
  }

  // Canonical URL check
  if (!config.canonical) {
    checks.push({
      id: 'canonical-missing',
      name: 'Canonical URL',
      passed: false,
      message: 'Canonical URL is recommended to prevent duplicate content',
      priority: 'medium',
    });
  } else {
    checks.push({
      id: 'canonical-present',
      name: 'Canonical URL',
      passed: true,
      message: 'Canonical URL is set',
      priority: 'medium',
    });
  }

  // Open Graph image check
  if (!config.ogImage) {
    checks.push({
      id: 'og-image-missing',
      name: 'Open Graph Image',
      passed: false,
      message: 'Open Graph image is recommended for better social media sharing (1200x630px)',
      priority: 'medium',
    });
  } else {
    checks.push({
      id: 'og-image-present',
      name: 'Open Graph Image',
      passed: true,
      message: 'Open Graph image is set',
      priority: 'medium',
    });
  }

  // Structured data check
  if (!config.structuredData) {
    checks.push({
      id: 'structured-data-missing',
      name: 'Structured Data',
      passed: false,
      message: 'Structured data (Schema.org) helps search engines understand your content',
      priority: 'low',
    });
  } else {
    checks.push({
      id: 'structured-data-present',
      name: 'Structured Data',
      passed: true,
      message: 'Structured data is present',
      priority: 'low',
    });
  }

  // Focus keyword check
  if (!config.focusKeyword) {
    checks.push({
      id: 'focus-keyword-missing',
      name: 'Focus Keyword',
      passed: false,
      message: 'Setting a focus keyword helps optimize content for specific search terms',
      priority: 'medium',
    });
  } else {
    checks.push({
      id: 'focus-keyword-present',
      name: 'Focus Keyword',
      passed: true,
      message: `Focus keyword is set: "${config.focusKeyword}"`,
      priority: 'medium',
    });
  }

  // Robots meta tag check
  if (config.noindex) {
    checks.push({
      id: 'noindex-set',
      name: 'Indexing',
      passed: false,
      message: 'Page is set to noindex - search engines will not index this page',
      priority: 'high',
    });
  } else {
    checks.push({
      id: 'indexable',
      name: 'Indexing',
      passed: true,
      message: 'Page is indexable by search engines',
      priority: 'high',
    });
  }

  return checks;
}

export function getBestPracticesScore(checks: BestPracticeCheck[]): number {
  if (checks.length === 0) return 0;

  const weights = {
    high: 3,
    medium: 2,
    low: 1,
  };

  let totalWeight = 0;
  let passedWeight = 0;

  checks.forEach((check) => {
    const weight = weights[check.priority];
    totalWeight += weight;
    if (check.passed) {
      passedWeight += weight;
    }
  });

  return totalWeight > 0 ? Math.round((passedWeight / totalWeight) * 100) : 0;
}

