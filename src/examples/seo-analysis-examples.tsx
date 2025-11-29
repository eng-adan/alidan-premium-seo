// Example 1: Using useSEO hook with analysis
// File: components/BlogEditor.tsx
/*
import { useState } from 'react';
import { useSEO, SEOAnalysisPanel } from 'alidan-premium-seo';
import 'alidan-premium-seo/dist/styles/seo-analysis.css';

export default function BlogEditor() {
  const [content, setContent] = useState('');
  
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: 'My Blog Post',
    description: 'A great blog post about Next.js',
    focusKeyword: 'nextjs seo',
    content: content,
    slug: 'my-blog-post',
    canonical: 'https://example.com/blog/my-blog-post',
    ogImage: 'https://example.com/images/blog-post.jpg',
  });

  return (
    <div>
      <div className="editor">
        <input
          value={seoConfig.title}
          onChange={(e) => updateSEO({ title: e.target.value })}
          placeholder="Page Title"
        />
        <textarea
          value={seoConfig.description}
          onChange={(e) => updateSEO({ description: e.target.value })}
          placeholder="Meta Description"
        />
        <input
          value={seoConfig.focusKeyword || ''}
          onChange={(e) => updateSEO({ focusKeyword: e.target.value })}
          placeholder="Focus Keyword"
        />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            updateSEO({ content: e.target.value });
          }}
          placeholder="Page Content"
        />
      </div>
      
      <div className="seo-analysis">
        <SEOAnalysisPanel analysis={analysis} />
      </div>
    </div>
  );
}
*/

// Example 2: Manual SEO Analysis
// File: utils/seo-checker.ts
/*
import { analyzeSEO, validateBestPractices, getBestPracticesScore } from 'alidan-premium-seo';
import type { SEOConfig } from 'alidan-premium-seo';

function checkSEOBeforePublish(config: SEOConfig, content: string) {
  const analysis = analyzeSEO(config, content);
  
  console.log(`SEO Score: ${analysis.score}/100`);
  console.log(`Issues Found: ${analysis.issues.length}`);
  
  const bestPractices = validateBestPractices(config);
  const score = getBestPracticesScore(bestPractices);
  
  console.log(`Best Practices Score: ${score}/100`);
  
  analysis.issues.forEach(issue => {
    console.log(`${issue.severity.toUpperCase()}: ${issue.message}`);
    if (issue.fix) {
      console.log(`  Fix: ${issue.fix}`);
    }
  });
  
  if (analysis.keywordAnalysis) {
    const ka = analysis.keywordAnalysis;
    console.log(`Focus Keyword: ${ka.focusKeyword}`);
    console.log(`Keyword Density: ${ka.keywordDensity}%`);
    console.log(`Keyword Count: ${ka.keywordCount}`);
    console.log(`In Title: ${ka.keywordInTitle}`);
    console.log(`In Description: ${ka.keywordInDescription}`);
    console.log(`In URL: ${ka.keywordInUrl}`);
  }
  
  if (analysis.readability) {
    const r = analysis.readability;
    console.log(`Readability Score: ${r.score}/100`);
    console.log(`Flesch Reading Ease: ${r.fleschReadingEase}`);
    console.log(`Avg Sentence Length: ${r.averageSentenceLength} words`);
  }
  
  return analysis.score >= 80;
}
*/

// Example 3: Real-time SEO feedback in editor
// File: components/ContentEditor.tsx
/*
import { useSEO, SEOAnalysisPanel, getSEOScoreColor } from 'alidan-premium-seo';

export default function ContentEditor() {
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: '',
    description: '',
    focusKeyword: '',
    content: '',
  });
  
  const scoreColor = getSEOScoreColor(analysis.score);
  
  return (
    <div className="editor-layout">
      <div className="editor-main">
        <input
          className="title-input"
          value={seoConfig.title || ''}
          onChange={(e) => updateSEO({ title: e.target.value })}
          placeholder="Enter page title..."
        />
        <div className={`title-length ${seoConfig.title && seoConfig.title.length > 60 ? 'warning' : ''}`}>
          {seoConfig.title?.length || 0} / 60 characters
        </div>
        
        <textarea
          className="description-input"
          value={seoConfig.description || ''}
          onChange={(e) => updateSEO({ description: e.target.value })}
          placeholder="Enter meta description..."
        />
        <div className={`description-length ${seoConfig.description && (seoConfig.description.length < 120 || seoConfig.description.length > 160) ? 'warning' : ''}`}>
          {seoConfig.description?.length || 0} / 120-160 characters
        </div>
        
        <input
          className="keyword-input"
          value={seoConfig.focusKeyword || ''}
          onChange={(e) => updateSEO({ focusKeyword: e.target.value })}
          placeholder="Enter focus keyword..."
        />
      </div>
      
      <div className="seo-sidebar">
        <div className={`seo-score-badge seo-score-${scoreColor}`}>
          <div className="score-value">{analysis.score}</div>
          <div className="score-label">SEO Score</div>
        </div>
        
        <SEOAnalysisPanel analysis={analysis} />
      </div>
    </div>
  );
}
*/
