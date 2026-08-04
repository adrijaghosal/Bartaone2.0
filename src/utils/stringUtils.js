/**
 * Truncate string
 */
export const truncate = (str, length = 100, suffix = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + suffix;
};

/**
 * Capitalize string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize each word
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => capitalize(word)).join(' ');
};

/**
 * Convert to camel case
 */
export const toCamelCase = (str) => {
  if (!str) return '';
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, char => char.toLowerCase());
};

/**
 * Convert to snake case
 */
export const toSnakeCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
};

/**
 * Convert to kebab case
 */
export const toKebabCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
};

/**
 * Convert to constant case
 */
export const toConstantCase = (str) => {
  if (!str) return '';
  return toSnakeCase(str).toUpperCase();
};

/**
 * Convert to title case
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'into', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'with'];
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !smallWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
};

/**
 * Convert to sentence case
 */
export const toSentenceCase = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Count words
 */
export const countWords = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

/**
 * Count characters
 */
export const countChars = (str, countSpaces = true) => {
  if (!str) return 0;
  if (countSpaces) return str.length;
  return str.replace(/\s/g, '').length;
};

/**
 * Count sentences
 */
export const countSentences = (str) => {
  if (!str) return 0;
  return str.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
};

/**
 * Count paragraphs
 */
export const countParagraphs = (str) => {
  if (!str) return 0;
  return str.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
};

/**
 * Extract hashtags
 */
export const extractHashtags = (str) => {
  if (!str) return [];
  const matches = str.match(/#\w+/g);
  return matches ? [...new Set(matches)] : [];
};

/**
 * Extract mentions
 */
export const extractMentions = (str) => {
  if (!str) return [];
  const matches = str.match(/@\w+/g);
  return matches ? [...new Set(matches)] : [];
};

/**
 * Extract URLs
 */
export const extractUrls = (str) => {
  if (!str) return [];
  const matches = str.match(/(https?:\/\/[^\s]+)/g);
  return matches || [];
};

/**
 * Extract emails
 */
export const extractEmails = (str) => {
  if (!str) return [];
  const matches = str.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
  return matches || [];
};

/**
 * Slugify string
 */
export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Reverse string
 */
export const reverse = (str) => {
  if (!str) return '';
  return str.split('').reverse().join('');
};

/**
 * Check if string contains only letters
 */
export const isAlpha = (str) => {
  if (!str) return false;
  return /^[a-zA-Z]+$/.test(str);
};

/**
 * Check if string contains only numbers
 */
export const isNumeric = (str) => {
  if (!str) return false;
  return /^\d+$/.test(str);
};

/**
 * Check if string contains only alphanumeric
 */
export const isAlphanumeric = (str) => {
  if (!str) return false;
  return /^[a-zA-Z0-9]+$/.test(str);
};

/**
 * Check if string is email
 */
export const isEmail = (str) => {
  if (!str) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

/**
 * Check if string is URL
 */
export const isUrl = (str) => {
  if (!str) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is phone
 */
export const isPhone = (str) => {
  if (!str) return false;
  return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(str);
};

/**
 * Check if string is date
 */
export const isDate = (str) => {
  if (!str) return false;
  const date = new Date(str);
  return !isNaN(date.getTime());
};

/**
 * Check if string is JSON
 */
export const isJson = (str) => {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Escape HTML
 */
export const escapeHtml = (str) => {
  if (!str) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, char => map[char]);
};

/**
 * Unescape HTML
 */
export const unescapeHtml = (str) => {
  if (!str) return '';
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, char => map[char]);
};

/**
 * Remove HTML tags
 */
export const stripHtml = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

/**
 * Truncate HTML safely
 */
export const truncateHtml = (html, length = 100, suffix = '...') => {
  if (!html) return '';
  const text = stripHtml(html);
  if (text.length <= length) return html;
  return truncate(text, length, suffix);
};

/**
 * Get first sentence
 */
export const getFirstSentence = (str) => {
  if (!str) return '';
  const match = str.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : str;
};

export default {
  truncate,
  capitalize,
  capitalizeWords,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  toTitleCase,
  toSentenceCase,
  countWords,
  countChars,
  countSentences,
  countParagraphs,
  extractHashtags,
  extractMentions,
  extractUrls,
  extractEmails,
  slugify,
  reverse,
  isAlpha,
  isNumeric,
  isAlphanumeric,
  isEmail,
  isUrl,
  isPhone,
  isDate,
  isJson,
  escapeHtml,
  unescapeHtml,
  stripHtml,
  truncateHtml,
  getFirstSentence,
};