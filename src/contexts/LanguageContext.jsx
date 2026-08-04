import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Create Context
const LanguageContext = createContext();

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [direction, setDirection] = useState('ltr');

  // Supported languages
  const languages = {
    en: { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      direction: 'ltr',
      flag: '🇬🇧',
    },
    es: { 
      code: 'es', 
      name: 'Spanish', 
      nativeName: 'Español',
      direction: 'ltr',
      flag: '🇪🇸',
    },
    fr: { 
      code: 'fr', 
      name: 'French', 
      nativeName: 'Français',
      direction: 'ltr',
      flag: '🇫🇷',
    },
    de: { 
      code: 'de', 
      name: 'German', 
      nativeName: 'Deutsch',
      direction: 'ltr',
      flag: '🇩🇪',
    },
    it: { 
      code: 'it', 
      name: 'Italian', 
      nativeName: 'Italiano',
      direction: 'ltr',
      flag: '🇮🇹',
    },
    pt: { 
      code: 'pt', 
      name: 'Portuguese', 
      nativeName: 'Português',
      direction: 'ltr',
      flag: '🇵🇹',
    },
    ru: { 
      code: 'ru', 
      name: 'Russian', 
      nativeName: 'Русский',
      direction: 'ltr',
      flag: '🇷🇺',
    },
    zh: { 
      code: 'zh', 
      name: 'Chinese', 
      nativeName: '中文',
      direction: 'ltr',
      flag: '🇨🇳',
    },
    ja: { 
      code: 'ja', 
      name: 'Japanese', 
      nativeName: '日本語',
      direction: 'ltr',
      flag: '🇯🇵',
    },
    ko: { 
      code: 'ko', 
      name: 'Korean', 
      nativeName: '한국어',
      direction: 'ltr',
      flag: '🇰🇷',
    },
    ar: { 
      code: 'ar', 
      name: 'Arabic', 
      nativeName: 'العربية',
      direction: 'rtl',
      flag: '🇸🇦',
    },
    hi: { 
      code: 'hi', 
      name: 'Hindi', 
      nativeName: 'हिन्दी',
      direction: 'ltr',
      flag: '🇮🇳',
    },
  };

  // Load translations
  useEffect(() => {
    loadTranslations(language);
    // Update document direction
    document.documentElement.dir = languages[language]?.direction || 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const loadTranslations = async (lang) => {
    setLoading(true);
    setError(null);
    try {
      // Try to load from API first
      const response = await fetch(`/api/translations/${lang}`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
        setAvailableLanguages(Object.values(languages));
        setDirection(languages[lang]?.direction || 'ltr');
        return;
      }
      
      // Fallback to local translations
      const module = await import(`../locales/${lang}.json`);
      setTranslations(module.default);
      setAvailableLanguages(Object.values(languages));
      setDirection(languages[lang]?.direction || 'ltr');
    } catch (err) {
      console.error('Failed to load translations:', err);
      // Fallback to English
      if (lang !== 'en') {
        try {
          const module = await import(`../locales/en.json`);
          setTranslations(module.default);
        } catch (fallbackErr) {
          setTranslations({});
        }
      } else {
        setTranslations({});
      }
      setError('Failed to load translations');
    } finally {
      setLoading(false);
    }
  };

  // Change language
  const changeLanguage = useCallback((langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  }, []);

  // Get translated text
  const t = useCallback((key, params = {}) => {
    let text = translations[key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
      text = text.replace(`{{${param}}}`, params[param]);
    });
    
    return text;
  }, [translations]);

  // Get language info
  const getLanguageInfo = useCallback((langCode) => {
    return languages[langCode] || null;
  }, []);

  // Get current language info
  const currentLanguage = getLanguageInfo(language);

  const value = {
    language,
    setLanguage: changeLanguage,
    translations,
    loading,
    error,
    availableLanguages: Object.values(languages),
    direction,
    currentLanguage,
    t,
    getLanguageInfo,
    changeLanguage,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;