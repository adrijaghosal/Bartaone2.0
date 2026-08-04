import { PAGINATION } from './constants';

/**
 * Deep clone an object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone(obj[key]);
    });
    return clonedObj;
  }
  return obj;
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Generate random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate slug from string
 */
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Truncate text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Capitalize words
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
};

/**
 * Camel case to words
 */
export const camelToWords = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
};

/**
 * Get initial letters
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Pluralize word
 */
export const pluralize = (count, singular, plural = null) => {
  if (count === 1) return singular;
  return plural || singular + 's';
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim() === '';
  if (typeof obj === 'number') return false;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return !obj;
};

/**
 * Check if object is not empty
 */
export const isNotEmpty = (obj) => !isEmpty(obj);

/**
 * Get nested object value
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  if (!obj || !path) return defaultValue;
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  return current;
};

/**
 * Set nested object value
 */
export const setNestedValue = (obj, path, value) => {
  if (!obj || !path) return obj;
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[lastKey] = value;
  return obj;
};

/**
 * Remove null/undefined values
 */
export const removeEmpty = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const result = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleaned = removeEmpty(value);
        if (Object.keys(cleaned).length > 0) {
          result[key] = cleaned;
        }
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};

/**
 * Compare two objects
 */
export const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (obj1 === null || obj2 === null) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }
  return true;
};

/**
 * Get random item from array
 */
export const randomItem = (arr) => {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Shuffle array
 */
export const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Group array by key
 */
export const groupBy = (arr, key) => {
  if (!arr || !key) return {};
  return arr.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Sort array by key
 */
export const sortBy = (arr, key, order = 'asc') => {
  if (!arr || !key) return arr;
  const sorted = [...arr];
  sorted.sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key];
    const bValue = typeof key === 'function' ? key(b) : b[key];
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

/**
 * Paginate array
 */
export const paginate = (arr, page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) => {
  if (!arr) return { items: [], total: 0, page, limit, totalPages: 0 };
  const start = (page - 1) * limit;
  const end = page * limit;
  const items = arr.slice(start, end);
  const total = arr.length;
  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: end < total,
  };
};

/**
 * Chunk array
 */
export const chunkArray = (arr, size) => {
  if (!arr || !size) return [];
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/**
 * Get unique values
 */
export const uniqueValues = (arr) => {
  if (!arr) return [];
  return [...new Set(arr)];
};

/**
 * Intersection of arrays
 */
export const intersection = (arr1, arr2) => {
  if (!arr1 || !arr2) return [];
  return arr1.filter(value => arr2.includes(value));
};

/**
 * Difference of arrays
 */
export const difference = (arr1, arr2) => {
  if (!arr1) return [];
  if (!arr2) return arr1;
  return arr1.filter(value => !arr2.includes(value));
};

/**
 * Download file
 */
export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * Detect device type
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

/**
 * Detect browser
 */
export const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Opera')) return 'Opera';
  return 'Unknown';
};

/**
 * Detect OS
 */
export const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  return 'Unknown';
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scroll to element
 */
export const scrollToElement = (element, offset = 0) => {
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

/**
 * Get query parameters
 */
export const getQueryParams = (url = window.location.search) => {
  const params = new URLSearchParams(url);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Build query string
 */
export const buildQueryString = (params) => {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export default {
  deepClone,
  debounce,
  throttle,
  generateId,
  generateSlug,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  camelToWords,
  getInitials,
  pluralize,
  isEmpty,
  isNotEmpty,
  getNestedValue,
  setNestedValue,
  removeEmpty,
  isEqual,
  randomItem,
  shuffleArray,
  groupBy,
  sortBy,
  paginate,
  chunkArray,
  uniqueValues,
  intersection,
  difference,
  downloadFile,
  copyToClipboard,
  getDeviceType,
  getBrowser,
  getOS,
  isInViewport,
  scrollToElement,
  getQueryParams,
  buildQueryString,
};