'use client';

import { useState, useCallback, useMemo } from 'react';
import type { SEOConfig, SEOAnalysis } from '../types';
import { analyzeSEO } from '../utils/seo-analysis';

interface UseSEOReturn {
  seoConfig: SEOConfig;
  updateSEO: (config: Partial<SEOConfig>) => void;
  setSEO: (config: SEOConfig) => void;
  resetSEO: () => void;
  analysis: SEOAnalysis;
  analyze: () => SEOAnalysis;
}

const defaultConfig: SEOConfig = {};

export function useSEO(initialConfig?: SEOConfig): UseSEOReturn {
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(initialConfig || defaultConfig);

  const updateSEO = useCallback((config: Partial<SEOConfig>) => {
    setSeoConfig((prev: SEOConfig) => ({ ...prev, ...config }));
  }, []);

  const setSEO = useCallback((config: SEOConfig) => {
    setSeoConfig(config);
  }, []);

  const resetSEO = useCallback(() => {
    setSeoConfig(defaultConfig);
  }, []);

  const analysis = useMemo(() => {
    return analyzeSEO(seoConfig, seoConfig.content);
  }, [seoConfig]);

  const analyze = useCallback(() => {
    return analyzeSEO(seoConfig, seoConfig.content);
  }, [seoConfig]);

  return {
    seoConfig,
    updateSEO,
    setSEO,
    resetSEO,
    analysis,
    analyze,
  };
}

