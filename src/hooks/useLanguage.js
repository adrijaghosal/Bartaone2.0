// src/hooks/useLanguage.js
import { useLanguage as useLanguageContext } from '../contexts/LanguageContext';

/**
 * Custom hook for language functionality
 * Re-exports useLanguage from LanguageContext for easier imports
 */
export const useLanguage = () => {
  return useLanguageContext();
};

export default useLanguage;