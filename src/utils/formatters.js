import { DATE_FORMATS } from './constants';
import { format, formatDistanceToNow, formatRelative } from 'date-fns';

/**
 * Format number with commas
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined) return '$0';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format date
 */
export const formatDate = (date, formatStr = DATE_FORMATS.FULL) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return format(d, formatStr);
};

/**
 * Format time
 */
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return format(d, DATE_FORMATS.TIME);
};

/**
 * Format date time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return format(d, DATE_FORMATS.DATETIME);
};

/**
 * Format time ago
 */
export const formatTimeAgo = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return formatDistanceToNow(d, { addSuffix: true });
};

/**
 * Format relative date
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return formatRelative(d, new Date());
};

/**
 * Format compact number (K, M, B)
 */
export const formatCompactNumber = (num) => {
  if (num === null || num === undefined) return '0';
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(num);
};

/**
 * Format list of items
 */
export const formatList = (items, conjunction = 'and') => {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, ${conjunction} ${items[items.length - 1]}`;
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const groups = match.slice(1).filter(Boolean);
    if (groups.length === 1) return groups[0];
    if (groups.length === 2) return `(${groups[0]}) ${groups[1]}`;
    if (groups.length === 3) return `(${groups[0]}) ${groups[1]}-${groups[2]}`;
  }
  return phone;
};

/**
 * Format reading time
 */
export const formatReadTime = (minutes) => {
  if (!minutes || minutes < 1) return '< 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};

/**
 * Format duration
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};

/**
 * Format word count
 */
export const formatWordCount = (words) => {
  if (!words) return '0 words';
  return `${formatNumber(words)} words`;
};

/**
 * Format character count
 */
export const formatCharCount = (chars) => {
  if (!chars) return '0 characters';
  return `${formatNumber(chars)} characters`;
};

/**
 * Format title case
 */
export const formatTitleCase = (str) => {
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
 * Format ordinal number
 */
export const formatOrdinal = (num) => {
  if (num === null || num === undefined) return '';
  const n = Number(num);
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

/**
 * Format to slug
 */
export const formatToSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Format truncate
 */
export const formatTruncate = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
};

/**
 * Format HTML to plain text
 */
export const formatHtmlToPlain = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Format JSON pretty
 */
export const formatJsonPretty = (obj) => {
  if (!obj) return '';
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
};

export default {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatFileSize,
  formatDate,
  formatTime,
  formatDateTime,
  formatTimeAgo,
  formatRelativeDate,
  formatCompactNumber,
  formatList,
  formatPhone,
  formatReadTime,
  formatDuration,
  formatWordCount,
  formatCharCount,
  formatTitleCase,
  formatOrdinal,
  formatToSlug,
  formatTruncate,
  formatHtmlToPlain,
  formatJsonPretty,
};