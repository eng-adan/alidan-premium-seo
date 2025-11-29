import { SEOConfig, SEOAnalysis, SEOIssue, ReadabilityAnalysis, KeywordAnalysis, SEOIssueSeverity } from '../types';

export function analyzeSEO(config: SEOConfig, content?: string): SEOAnalysis {
  const issues: SEOIssue[] = [];
  let score = 100;

  // Title analysis
  const titleIssues = analyzeTitle(config.title || '');
  issues.push(...titleIssues);
  score -= titleIssues.filter(i => i.severity === 'error').length * 10;
  score -= titleIssues.filter(i => i.severity === 'warning').length * 5;

  // Description analysis
  const descriptionIssues = analyzeDescription(config.description || '');
  issues.push(...descriptionIssues);
  score -= descriptionIssues.filter(i => i.severity === 'error').length * 10;
  score -= descriptionIssues.filter(i => i.severity === 'warning').length * 5;

  // Canonical URL check
  if (!config.canonical) {
    issues.push({
      id: 'missing-canonical',
      message: 'Missing canonical URL',
      severity: 'warning',
      fix: 'Add a canonical URL to prevent duplicate content issues',
    });
    score -= 5;
  }

  // Open Graph image check
  if (!config.ogImage) {
    issues.push({
      id: 'missing-og-image',
      message: 'Missing Open Graph image',
      severity: 'warning',
      fix: 'Add an Open Graph image (recommended: 1200x630px) for better social media sharing',
    });
    score -= 5;
  }

  // Structured data check
  if (!config.structuredData) {
    issues.push({
      id: 'missing-structured-data',
      message: 'No structured data found',
      severity: 'warning',
      fix: 'Add structured data (Schema.org) to help search engines understand your content',
    });
    score -= 5;
  }

  // Keyword analysis
  let keywordAnalysis: KeywordAnalysis | undefined;
  if (config.focusKeyword) {
    keywordAnalysis = analyzeFocusKeyword(config, content || '');
    issues.push(...keywordAnalysis.issues);
    score -= keywordAnalysis.issues.filter(i => i.severity === 'error').length * 10;
    score -= keywordAnalysis.issues.filter(i => i.severity === 'warning').length * 5;
  } else {
    issues.push({
      id: 'no-focus-keyword',
      message: 'No focus keyword set',
      severity: 'warning',
      fix: 'Set a focus keyword to optimize your content for specific search terms',
    });
    score -= 5;
  }

  // Readability analysis
  let readability: ReadabilityAnalysis | undefined;
  if (content) {
    readability = analyzeReadability(content);
    issues.push(...readability.issues);
    score -= readability.issues.filter(i => i.severity === 'error').length * 5;
    score -= readability.issues.filter(i => i.severity === 'warning').length * 2;
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return {
    score: Math.round(score),
    issues,
    readability,
    keywordAnalysis,
  };
}

function analyzeTitle(title: string): SEOIssue[] {
  const issues: SEOIssue[] = [];

  if (!title || title.trim().length === 0) {
    issues.push({
      id: 'title-empty',
      message: 'Title is empty',
      severity: 'error',
      fix: 'Add a descriptive title (30-60 characters recommended)',
    });
    return issues;
  }

  const length = title.length;
  if (length < 30) {
    issues.push({
      id: 'title-too-short',
      message: `Title is too short (${length} characters). Aim for 30-60 characters.`,
      severity: 'warning',
      fix: 'Expand your title to be more descriptive',
    });
  } else if (length > 60) {
    issues.push({
      id: 'title-too-long',
      message: `Title is too long (${length} characters). Keep it under 60 characters.`,
      severity: 'warning',
      fix: 'Shorten your title to avoid truncation in search results',
    });
  }

  // Check for title at start
  if (title.includes('|')) {
    const parts = title.split('|');
    if (parts.length > 2) {
      issues.push({
        id: 'title-too-many-separators',
        message: 'Title has too many separators',
        severity: 'warning',
        fix: 'Use a single separator (|) in your title',
      });
    }
  }

  return issues;
}

function analyzeDescription(description: string): SEOIssue[] {
  const issues: SEOIssue[] = [];

  if (!description || description.trim().length === 0) {
    issues.push({
      id: 'description-empty',
      message: 'Meta description is empty',
      severity: 'error',
      fix: 'Add a compelling meta description (120-160 characters recommended)',
    });
    return issues;
  }

  const length = description.length;
  if (length < 120) {
    issues.push({
      id: 'description-too-short',
      message: `Meta description is too short (${length} characters). Aim for 120-160 characters.`,
      severity: 'warning',
      fix: 'Expand your description to be more compelling and informative',
    });
  } else if (length > 160) {
    issues.push({
      id: 'description-too-long',
      message: `Meta description is too long (${length} characters). Keep it under 160 characters.`,
      severity: 'warning',
      fix: 'Shorten your description to avoid truncation in search results',
    });
  }

  return issues;
}

function analyzeFocusKeyword(config: SEOConfig, content: string): KeywordAnalysis {
  const focusKeyword = config.focusKeyword || '';
  const keywordLower = focusKeyword.toLowerCase();
  const contentLower = content.toLowerCase();
  const titleLower = (config.title || '').toLowerCase();
  const descriptionLower = (config.description || '').toLowerCase();
  const slugLower = (config.slug || '').toLowerCase();

  const issues: SEOIssue[] = [];
  const keywordCount = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

  // Check keyword in title
  const keywordInTitle = titleLower.includes(keywordLower);
  if (!keywordInTitle) {
    issues.push({
      id: 'keyword-not-in-title',
      message: `Focus keyword "${focusKeyword}" not found in title`,
      severity: 'error',
      fix: `Include your focus keyword in the title`,
    });
  }

  // Check keyword in description
  const keywordInDescription = descriptionLower.includes(keywordLower);
  if (!keywordInDescription) {
    issues.push({
      id: 'keyword-not-in-description',
      message: `Focus keyword "${focusKeyword}" not found in meta description`,
      severity: 'warning',
      fix: `Include your focus keyword in the meta description`,
    });
  }

  // Check keyword in URL/slug
  const keywordInUrl = slugLower.includes(keywordLower.replace(/\s+/g, '-'));
  if (!keywordInUrl && config.slug) {
    issues.push({
      id: 'keyword-not-in-url',
      message: `Focus keyword "${focusKeyword}" not found in URL`,
      severity: 'warning',
      fix: `Include your focus keyword in the URL slug`,
    });
  }

  // Check keyword in first paragraph
  const firstParagraph = content.split('\n\n')[0] || content.split('.')[0];
  const keywordInFirstParagraph = firstParagraph.toLowerCase().includes(keywordLower);
  if (!keywordInFirstParagraph && content.length > 0) {
    issues.push({
      id: 'keyword-not-in-first-paragraph',
      message: `Focus keyword "${focusKeyword}" not found in first paragraph`,
      severity: 'warning',
      fix: `Include your focus keyword in the first paragraph of your content`,
    });
  }

  // Check keyword density
  if (keywordDensity < 0.5) {
    issues.push({
      id: 'keyword-density-too-low',
      message: `Keyword density is too low (${keywordDensity.toFixed(2)}%). Aim for 0.5-2.5%.`,
      severity: 'warning',
      fix: `Use your focus keyword more naturally throughout the content`,
    });
  } else if (keywordDensity > 2.5) {
    issues.push({
      id: 'keyword-density-too-high',
      message: `Keyword density is too high (${keywordDensity.toFixed(2)}%). Keep it under 2.5% to avoid keyword stuffing.`,
      severity: 'error',
      fix: `Reduce keyword usage to make content more natural`,
    });
  }

  // Check keyword count
  if (keywordCount === 0 && content.length > 0) {
    issues.push({
      id: 'keyword-not-found',
      message: `Focus keyword "${focusKeyword}" not found in content`,
      severity: 'error',
      fix: `Use your focus keyword in the content`,
    });
  } else if (keywordCount < 3 && content.length > 200) {
    issues.push({
      id: 'keyword-count-low',
      message: `Focus keyword appears only ${keywordCount} time(s). Use it more naturally.`,
      severity: 'warning',
      fix: `Use your focus keyword a few more times throughout the content`,
    });
  }

  return {
    focusKeyword,
    keywordDensity: Math.round(keywordDensity * 100) / 100,
    keywordInTitle,
    keywordInDescription,
    keywordInUrl,
    keywordInFirstParagraph,
    keywordInContent: keywordCount > 0,
    keywordCount,
    issues,
  };
}

function analyzeReadability(content: string): ReadabilityAnalysis {
  const issues: SEOIssue[] = [];
  
  // Basic text analysis
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const sentenceCount = sentences.length;
  const wordCount = words.length;
  const paragraphCount = paragraphs.length;
  
  const averageSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const averageWordsPerParagraph = paragraphCount > 0 ? wordCount / paragraphCount : 0;
  
  // Calculate Flesch Reading Ease (simplified)
  // Formula: 206.835 - (1.015 × ASL) - (84.6 × ASW)
  // ASL = Average Sentence Length, ASW = Average Syllables per Word
  // Simplified version using word length as proxy for syllables
  const averageSyllablesPerWord = words.reduce((sum, word) => {
    const syllables = Math.max(1, Math.floor(word.length / 3));
    return sum + syllables;
  }, 0) / wordCount;
  
  const fleschReadingEase = sentenceCount > 0 && wordCount > 0
    ? 206.835 - (1.015 * averageSentenceLength) - (84.6 * averageSyllablesPerWord)
    : 0;
  
  // Readability scoring
  let readabilityScore = 100;
  
  // Check sentence length
  if (averageSentenceLength > 20) {
    issues.push({
      id: 'sentence-too-long',
      message: `Average sentence length is ${averageSentenceLength.toFixed(1)} words. Aim for 15-20 words.`,
      severity: 'warning',
      fix: 'Break up long sentences into shorter, clearer ones',
    });
    readabilityScore -= 10;
  } else if (averageSentenceLength < 10 && wordCount > 100) {
    issues.push({
      id: 'sentence-too-short',
      message: `Average sentence length is ${averageSentenceLength.toFixed(1)} words. Vary sentence length for better flow.`,
      severity: 'warning',
      fix: 'Combine some short sentences for better readability',
    });
    readabilityScore -= 5;
  }
  
  // Check paragraph length
  if (averageWordsPerParagraph > 150) {
    issues.push({
      id: 'paragraph-too-long',
      message: `Average paragraph length is ${averageWordsPerParagraph.toFixed(0)} words. Aim for 100-150 words.`,
      severity: 'warning',
      fix: 'Break up long paragraphs into shorter ones',
    });
    readabilityScore -= 10;
  }
  
  // Check Flesch Reading Ease
  if (fleschReadingEase < 30) {
    issues.push({
      id: 'readability-very-difficult',
      message: `Content is very difficult to read (Flesch score: ${fleschReadingEase.toFixed(1)}). Aim for 60-70.`,
      severity: 'error',
      fix: 'Simplify your language and use shorter sentences',
    });
    readabilityScore -= 20;
  } else if (fleschReadingEase < 50) {
    issues.push({
      id: 'readability-difficult',
      message: `Content is difficult to read (Flesch score: ${fleschReadingEase.toFixed(1)}). Aim for 60-70.`,
      severity: 'warning',
      fix: 'Simplify your language and use shorter sentences',
    });
    readabilityScore -= 10;
  }
  
  // Check for subheadings
  const hasSubheadings = /^#{2,6}\s+/m.test(content);
  if (!hasSubheadings && wordCount > 300) {
    issues.push({
      id: 'no-subheadings',
      message: 'No subheadings found. Use H2-H6 tags to structure your content.',
      severity: 'warning',
      fix: 'Add subheadings to break up your content and improve readability',
    });
    readabilityScore -= 5;
  }
  
  // Check content length
  if (wordCount < 300) {
    issues.push({
      id: 'content-too-short',
      message: `Content is too short (${wordCount} words). Aim for at least 300 words for better SEO.`,
      severity: 'warning',
      fix: 'Expand your content to provide more value to readers',
    });
    readabilityScore -= 10;
  }
  
  readabilityScore = Math.max(0, Math.min(100, readabilityScore));
  
  return {
    score: Math.round(readabilityScore),
    issues,
    fleschReadingEase: Math.round(fleschReadingEase * 10) / 10,
    averageSentenceLength: Math.round(averageSentenceLength * 10) / 10,
    paragraphCount,
    sentenceCount,
  };
}

export function getSEOScoreColor(score: number): 'green' | 'orange' | 'red' {
  if (score >= 80) return 'green';
  if (score >= 50) return 'orange';
  return 'red';
}

export function getSEOScoreLabel(score: number): string {
  if (score >= 80) return 'Good';
  if (score >= 50) return 'Needs improvement';
  return 'Poor';
}

