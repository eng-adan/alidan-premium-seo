// Example: Custom SEO Form Component
// This is a reference implementation - you'll need to adapt it to your needs

import * as React from 'react';
import { useState } from 'react';
import { useSEO, SEOAnalysisPanel } from '../index';
import type { SEOConfig } from '../types';
import '../styles/seo-analysis.css';

interface SEOFormProps {
  initialData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    focusKeyword?: string;
  };
  onSave?: (data: SEOConfig & { content?: string }) => void;
  onCancel?: () => void;
}

export default function SEOForm({ initialData, onSave, onCancel }: SEOFormProps) {
  const { seoConfig, updateSEO, analysis } = useSEO({
    title: initialData?.title || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || [],
    canonical: initialData?.canonical || '',
    ogImage: initialData?.ogImage || '',
    focusKeyword: initialData?.focusKeyword || '',
  });

  const [content, setContent] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...seoConfig,
        content,
      });
    }
  };

  return (
    <div className="seo-form-container">
      <div className="seo-form-main">
        <h2>SEO Settings</h2>

        {/* Basic Meta Tags */}
        <section className="form-section">
          <h3>Basic Meta Tags</h3>
          
          <div className="form-group">
            <label>
              Page Title
              <span className="char-count">
                {seoConfig.title?.length || 0} / 60
              </span>
            </label>
            <input
              type="text"
              value={seoConfig.title || ''}
              onChange={(e) => updateSEO({ title: e.target.value })}
              placeholder="Enter page title..."
              maxLength={60}
            />
            {seoConfig.title && seoConfig.title.length > 60 && (
              <span className="error">Title is too long (max 60 characters)</span>
            )}
          </div>

          <div className="form-group">
            <label>
              Meta Description
              <span className="char-count">
                {seoConfig.description?.length || 0} / 160
              </span>
            </label>
            <textarea
              value={seoConfig.description || ''}
              onChange={(e) => updateSEO({ description: e.target.value })}
              placeholder="Enter meta description..."
              maxLength={160}
              rows={3}
            />
            {seoConfig.description && 
             (seoConfig.description.length < 120 || seoConfig.description.length > 160) && (
              <span className="warning">
                Description should be 120-160 characters
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Keywords (comma-separated)</label>
            <input
              type="text"
              value={seoConfig.keywords?.join(', ') || ''}
              onChange={(e) => {
                const keywords = e.target.value
                  .split(',')
                  .map(k => k.trim())
                  .filter(k => k.length > 0);
                updateSEO({ keywords });
              }}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div className="form-group">
            <label>Focus Keyword</label>
            <input
              type="text"
              value={seoConfig.focusKeyword || ''}
              onChange={(e) => updateSEO({ focusKeyword: e.target.value })}
              placeholder="Primary keyword to optimize for"
            />
          </div>
        </section>

        {/* Open Graph */}
        <section className="form-section">
          <h3>Open Graph (Social Media)</h3>
          
          <div className="form-group">
            <label>OG Title</label>
            <input
              type="text"
              value={seoConfig.ogTitle || seoConfig.title || ''}
              onChange={(e) => updateSEO({ ogTitle: e.target.value })}
              placeholder="Defaults to page title"
            />
          </div>

          <div className="form-group">
            <label>OG Description</label>
            <textarea
              value={seoConfig.ogDescription || seoConfig.description || ''}
              onChange={(e) => updateSEO({ ogDescription: e.target.value })}
              placeholder="Defaults to meta description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>OG Image URL</label>
            <input
              type="url"
              value={seoConfig.ogImage || ''}
              onChange={(e) => updateSEO({ ogImage: e.target.value })}
              placeholder="https://example.com/image.jpg (1200x630px recommended)"
            />
          </div>

          <div className="form-group">
            <label>OG Type</label>
            <select
              value={seoConfig.ogType || 'website'}
              onChange={(e) => updateSEO({ ogType: e.target.value })}
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
            </select>
          </div>
        </section>

        {/* Twitter Card */}
        <section className="form-section">
          <h3>Twitter Card</h3>
          
          <div className="form-group">
            <label>Card Type</label>
            <select
              value={seoConfig.twitterCard || 'summary_large_image'}
              onChange={(e) => updateSEO({ 
                twitterCard: e.target.value as SEOConfig['twitterCard']
              })}
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
            </select>
          </div>

          <div className="form-group">
            <label>Twitter Image URL</label>
            <input
              type="url"
              value={seoConfig.twitterImage || seoConfig.ogImage || ''}
              onChange={(e) => updateSEO({ twitterImage: e.target.value })}
              placeholder="Defaults to OG image"
            />
          </div>
        </section>

        {/* Additional Settings */}
        <section className="form-section">
          <h3>Additional Settings</h3>
          
          <div className="form-group">
            <label>Canonical URL</label>
            <input
              type="url"
              value={seoConfig.canonical || ''}
              onChange={(e) => updateSEO({ canonical: e.target.value })}
              placeholder="https://example.com/page"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={seoConfig.noindex || false}
                onChange={(e) => updateSEO({ noindex: e.target.checked })}
              />
              Noindex (prevent search engines from indexing)
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={seoConfig.nofollow || false}
                onChange={(e) => updateSEO({ nofollow: e.target.checked })}
              />
              Nofollow (prevent search engines from following links)
            </label>
          </div>
        </section>

        {/* Content for Analysis */}
        <section className="form-section">
          <h3>Page Content (for SEO Analysis)</h3>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                updateSEO({ content: e.target.value });
              }}
              placeholder="Enter page content for SEO analysis..."
              rows={10}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
          <button type="button" onClick={handleSave} className="btn-save">
            Save SEO Settings
          </button>
        </div>
      </div>

      {/* SEO Analysis Panel */}
      <div className="seo-form-sidebar">
        <SEOAnalysisPanel analysis={analysis} />
      </div>
    </div>
  );
}

