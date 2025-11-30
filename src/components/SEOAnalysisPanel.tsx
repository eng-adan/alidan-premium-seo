'use client';

import * as React from 'react';
import type { SEOAnalysis, SEOIssue, SEOIssueSeverity } from '../types';
import { getSEOScoreColor, getSEOScoreLabel } from '../utils/seo-analysis';

export interface SEOAnalysisPanelProps {
  analysis: SEOAnalysis;
  className?: string;
}

export const SEOAnalysisPanel: React.FC<SEOAnalysisPanelProps> = ({ analysis, className = '' }) => {
  const scoreColor = getSEOScoreColor(analysis.score);
  const scoreLabel = getSEOScoreLabel(analysis.score);

  const issuesBySeverity = {
    error: analysis.issues.filter(i => i.severity === 'error'),
    warning: analysis.issues.filter(i => i.severity === 'warning'),
    good: analysis.issues.filter(i => i.severity === 'good'),
  };

  return (
    <div className={`seo-analysis-panel ${className}`}>
      {/* Score Circle */}
      <div className={`seo-score-circle seo-score-${scoreColor}`}>
        <div className="seo-score-value">{analysis.score}</div>
        <div className="seo-score-label">{scoreLabel}</div>
      </div>

      {/* Issues List */}
      <div className="seo-issues">
        {issuesBySeverity.error.length > 0 && (
          <div className="seo-issues-section seo-issues-errors">
            <h3 className="seo-issues-title">
              Errors ({issuesBySeverity.error.length})
            </h3>
            <ul className="seo-issues-list">
              {issuesBySeverity.error.map((issue) => (
                <SEOIssueItem key={issue.id} issue={issue} />
              ))}
            </ul>
          </div>
        )}

        {issuesBySeverity.warning.length > 0 && (
          <div className="seo-issues-section seo-issues-warnings">
            <h3 className="seo-issues-title">
              Warnings ({issuesBySeverity.warning.length})
            </h3>
            <ul className="seo-issues-list">
              {issuesBySeverity.warning.map((issue) => (
                <SEOIssueItem key={issue.id} issue={issue} />
              ))}
            </ul>
          </div>
        )}

        {issuesBySeverity.good.length > 0 && (
          <div className="seo-issues-section seo-issues-good">
            <h3 className="seo-issues-title">
              Good ({issuesBySeverity.good.length})
            </h3>
            <ul className="seo-issues-list">
              {issuesBySeverity.good.map((issue) => (
                <SEOIssueItem key={issue.id} issue={issue} />
              ))}
            </ul>
          </div>
        )}

        {analysis.issues.length === 0 && (
          <div className="seo-no-issues">
            <p>No SEO issues found. Great job! 🎉</p>
          </div>
        )}
      </div>

      {/* Readability Section */}
      {analysis.readability && (
        <div className="seo-readability">
          <h3 className="seo-section-title">Readability</h3>
          <div className={`seo-readability-score seo-score-${getSEOScoreColor(analysis.readability.score)}`}>
            Score: {analysis.readability.score}/100
          </div>
          {analysis.readability.fleschReadingEase && (
            <div className="seo-readability-details">
              <p>Flesch Reading Ease: {analysis.readability.fleschReadingEase}</p>
              <p>Average Sentence Length: {analysis.readability.averageSentenceLength} words</p>
              <p>Paragraphs: {analysis.readability.paragraphCount}</p>
              <p>Sentences: {analysis.readability.sentenceCount}</p>
            </div>
          )}
        </div>
      )}

      {/* Keyword Analysis Section */}
      {analysis.keywordAnalysis && (
        <div className="seo-keyword-analysis">
          <h3 className="seo-section-title">Focus Keyword: {analysis.keywordAnalysis.focusKeyword}</h3>
          <div className="seo-keyword-details">
            <div className="seo-keyword-metric">
              <span className="seo-keyword-label">Keyword Density:</span>
              <span className="seo-keyword-value">{analysis.keywordAnalysis.keywordDensity}%</span>
            </div>
            <div className="seo-keyword-metric">
              <span className="seo-keyword-label">Keyword Count:</span>
              <span className="seo-keyword-value">{analysis.keywordAnalysis.keywordCount}</span>
            </div>
            <div className="seo-keyword-checks">
              <div className={`seo-keyword-check ${analysis.keywordAnalysis.keywordInTitle ? 'check-pass' : 'check-fail'}`}>
                {analysis.keywordAnalysis.keywordInTitle ? '✓' : '✗'} In Title
              </div>
              <div className={`seo-keyword-check ${analysis.keywordAnalysis.keywordInDescription ? 'check-pass' : 'check-fail'}`}>
                {analysis.keywordAnalysis.keywordInDescription ? '✓' : '✗'} In Description
              </div>
              <div className={`seo-keyword-check ${analysis.keywordAnalysis.keywordInUrl ? 'check-pass' : 'check-fail'}`}>
                {analysis.keywordAnalysis.keywordInUrl ? '✓' : '✗'} In URL
              </div>
              <div className={`seo-keyword-check ${analysis.keywordAnalysis.keywordInFirstParagraph ? 'check-pass' : 'check-fail'}`}>
                {analysis.keywordAnalysis.keywordInFirstParagraph ? '✓' : '✗'} In First Paragraph
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SEOIssueItemProps {
  issue: SEOIssue;
  key?: string;
}

const SEOIssueItem = ({ issue }: SEOIssueItemProps) => {
  const icon = issue.severity === 'error' ? '✗' : issue.severity === 'warning' ? '⚠' : '✓';
  const className = `seo-issue seo-issue-${issue.severity}`;

  return (
    <li className={className}>
      <span className="seo-issue-icon">{icon}</span>
      <div className="seo-issue-content">
        <p className="seo-issue-message">{issue.message}</p>
        {issue.fix && (
          <p className="seo-issue-fix">
            <strong>Fix:</strong> {issue.fix}
          </p>
        )}
      </div>
    </li>
  );
};

