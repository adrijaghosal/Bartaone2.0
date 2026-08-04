/**
 * Translation utilities
 */
export class TranslationUtils {
  static instance = null;

  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!TranslationUtils.instance) {
      TranslationUtils.instance = new TranslationUtils();
    }
    return TranslationUtils.instance;
  }

  constructor() {
    this.translations = {};
    this.currentLocale = 'en';
    this.fallbackLocale = 'en';
    this.loadedLocales = new Set();
  }

  /**
   * Set current locale
   */
  setLocale(locale) {
    this.currentLocale = locale;
    document.documentElement.lang = locale;
    localStorage.setItem('language', locale);
  }

  /**
   * Get current locale
   */
  getLocale() {
    return this.currentLocale;
  }

  /**
   * Load translations
   */
  async loadTranslations(locale) {
    if (this.loadedLocales.has(locale)) {
      return this.translations[locale];
    }

    try {
      const response = await fetch(`/locales/${locale}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${locale}`);
      }
      const translations = await response.json();
      this.translations[locale] = translations;
      this.loadedLocales.add(locale);
      return translations;
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English
      if (locale !== 'en') {
        return this.loadTranslations('en');
      }
      return {};
    }
  }

  /**
   * Get translation
   */
  t(key, params = {}) {
    const translation = this.getTranslation(key);
    return this.interpolate(translation, params);
  }

  /**
   * Get translation with fallback
   */
  getTranslation(key) {
    // Try current locale
    const currentTranslations = this.translations[this.currentLocale];
    if (currentTranslations && currentTranslations[key]) {
      return currentTranslations[key];
    }

    // Try fallback locale
    const fallbackTranslations = this.translations[this.fallbackLocale];
    if (fallbackTranslations && fallbackTranslations[key]) {
      return fallbackTranslations[key];
    }

    // Return key as fallback
    return key;
  }

  /**
   * Interpolate translation
   */
  interpolate(text, params) {
    if (!text) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Get plural translation
   */
  tPlural(key, count, params = {}) {
    const translations = this.getTranslation(key);
    if (typeof translations === 'object') {
      const pluralKey = this.getPluralKey(count);
      const text = translations[pluralKey] || translations['other'] || key;
      return this.interpolate(text, { ...params, count });
    }
    return this.interpolate(translations, { ...params, count });
  }

  /**
   * Get plural key
   */
  getPluralKey(count) {
    // Simple English plural rules
    if (count === 0) return 'zero';
    if (count === 1) return 'one';
    if (count === 2) return 'two';
    if (count > 2 && count < 5) return 'few';
    return 'other';
  }

  /**
   * Format number
   */
  formatNumber(num, locale = null) {
    const l = locale || this.currentLocale;
    return new Intl.NumberFormat(l).format(num);
  }

  /**
   * Format currency
   */
  formatCurrency(amount, currency = 'USD', locale = null) {
    const l = locale || this.currentLocale;
    return new Intl.NumberFormat(l, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Format date
   */
  formatDate(date, options = {}, locale = null) {
    const l = locale || this.currentLocale;
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(l, options).format(d);
  }

  /**
   * Format relative time
   */
  formatRelativeTime(date, locale = null) {
    const l = locale || this.currentLocale;
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(l, { numeric: 'auto' });
    
    if (diff < 60) return rtf.format(-diff, 'second');
    if (diff < 3600) return rtf.format(-Math.floor(diff / 60), 'minute');
    if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), 'hour');
    if (diff < 604800) return rtf.format(-Math.floor(diff / 86400), 'day');
    if (diff < 2592000) return rtf.format(-Math.floor(diff / 604800), 'week');
    if (diff < 31536000) return rtf.format(-Math.floor(diff / 2592000), 'month');
    return rtf.format(-Math.floor(diff / 31536000), 'year');
  }

  /**
   * Check if direction is RTL
   */
  isRTL(locale = null) {
    const l = locale || this.currentLocale;
    const rtlLocales = ['ar', 'he', 'fa', 'ur', 'yi'];
    return rtlLocales.includes(l);
  }

  /**
   * Get direction
   */
  getDirection(locale = null) {
    return this.isRTL(locale) ? 'rtl' : 'ltr';
  }

  /**
   * Set document direction
   */
  setDocumentDirection(locale = null) {
    const direction = this.getDirection(locale);
    document.documentElement.dir = direction;
    return direction;
  }

  /**
   * Get available locales
   */
  getAvailableLocales() {
    return ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'];
  }

  /**
   * Get locale display name
   */
  getLocaleDisplayName(locale, displayLocale = null) {
    const l = displayLocale || this.currentLocale;
    try {
      return new Intl.DisplayNames([l], { type: 'language' }).of(locale);
    } catch {
      return locale;
    }
  }

  /**
   * Get translations for component
   */
  getComponentTranslations(componentName) {
    const key = `components.${componentName}`;
    return this.getTranslation(key) || {};
  }

  /**
   * Get translations for page
   */
  getPageTranslations(pageName) {
    const key = `pages.${pageName}`;
    return this.getTranslation(key) || {};
  }

  /**
   * Get translations for common
   */
  getCommonTranslations() {
    return this.getTranslation('common') || {};
  }

  /**
   * Get translations for validation
   */
  getValidationTranslations() {
    return this.getTranslation('validation') || {};
  }

  /**
   * Translate validation error
   */
  tValidation(key, params = {}) {
    const translations = this.getValidationTranslations();
    const text = translations[key] || key;
    return this.interpolate(text, params);
  }

  /**
   * Get translations for notifications
   */
  getNotificationTranslations() {
    return this.getTranslation('notifications') || {};
  }

  /**
   * Translate notification
   */
  tNotification(key, params = {}) {
    const translations = this.getNotificationTranslations();
    const text = translations[key] || key;
    return this.interpolate(text, params);
  }
}

// Export singleton instance
export const translationUtils = TranslationUtils.getInstance();

export default translationUtils;