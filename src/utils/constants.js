// Application constants
export const APP_NAME = 'BartaOne';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'AI-powered multilingual news platform';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  ARTICLES: {
    BASE: '/articles',
    DRAFTS: '/articles/drafts',
    BOOKMARKS: '/articles/bookmarks',
    CATEGORIES: '/articles/categories',
    TAGS: '/articles/tags',
    TRENDING: '/articles/trending',
    RECOMMENDED: '/articles/recommended',
    SEARCH: '/articles/search',
    RELATED: '/articles/related',
  },
  PUBLISHERS: {
    BASE: '/publishers',
    FOLLOW: '/publishers/follow',
    SUBSCRIBERS: '/publishers/subscribers',
    ANALYTICS: '/publishers/analytics',
    EARNINGS: '/publishers/earnings',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    PREFERENCES: '/notifications/preferences',
    DEVICES: '/notifications/devices',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PERFORMANCE: '/analytics/performance',
    AUDIENCE: '/analytics/audience',
    REVENUE: '/analytics/revenue',
    EXPORT: '/analytics/export',
  },
  AI: {
    PERSONALIZED_FEED: '/ai/personalized-feed',
    PREFERENCES: '/ai/preferences',
    TRENDING_TOPICS: '/ai/trending-topics',
    CONTENT_SUGGESTIONS: '/ai/content-suggestions',
    SUMMARY: '/ai/summary',
    SENTIMENT: '/ai/sentiment',
  },
};

// User roles
export const USER_ROLES = {
  READER: 'reader',
  PUBLISHER: 'publisher',
  ADMIN: 'admin',
};

// Article statuses
export const ARTICLE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

// Notification types
export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  FOLLOW: 'follow',
  MENTION: 'mention',
  SHARE: 'share',
  BOOKMARK: 'bookmark',
  AWARD: 'award',
  TRENDING: 'trending',
  SYSTEM: 'system',
  EMAIL: 'email',
  REMINDER: 'reminder',
  ANNOUNCEMENT: 'announcement',
};

// Notification priorities
export const NOTIFICATION_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Categories
export const CATEGORIES = [
  'Technology',
  'Business',
  'Science',
  'Health',
  'Politics',
  'Entertainment',
  'Sports',
  'World News',
  'Education',
  'Environment',
  'Design',
  'Travel',
  'Food',
  'Lifestyle',
  'Fashion',
  'Gaming',
  'Music',
  'Film',
  'Books',
  'Art',
];

// Languages
export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', direction: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', direction: 'ltr' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', direction: 'ltr' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', direction: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
};

// Theme colors
export const THEME_COLORS = {
  terracotta: {
    primary: '#E8835F',
    primaryDark: '#D66F4A',
    primaryLight: '#F39B7F',
  },
  navy: {
    primary: '#2A5B8F',
    primaryDark: '#224A75',
    primaryLight: '#5078A0',
  },
  beige: {
    primary: '#E6B473',
    primaryDark: '#CD944D',
    primaryLight: '#F0D2AB',
  },
  blue: {
    primary: '#4A90D9',
    primaryDark: '#357ABD',
    primaryLight: '#6BA8E0',
  },
  green: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#66BB6A',
  },
  purple: {
    primary: '#7B61FF',
    primaryDark: '#5E44D9',
    primaryLight: '#9B83FF',
  },
  pink: {
    primary: '#E67E9A',
    primaryDark: '#D45A7A',
    primaryLight: '#EDA0B6',
  },
  orange: {
    primary: '#F5A623',
    primaryDark: '#D4891A',
    primaryLight: '#F7B84A',
  },
};

// Date formats
export const DATE_FORMATS = {
  FULL: 'MMMM d, yyyy',
  SHORT: 'MMM d, yyyy',
  TIME: 'h:mm a',
  DATETIME: 'MMMM d, yyyy h:mm a',
  ISO: 'yyyy-MM-dd',
  TIME_AGO: 'timeAgo',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Toast durations
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
};

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES: 5,
};

// Streak milestones
export const STREAK_MILESTONES = [
  { days: 7, label: 'Weekly Warrior', emoji: '📈' },
  { days: 14, label: 'Two Weeks!', emoji: '💪' },
  { days: 30, label: 'Monthly Master', emoji: '🔥' },
  { days: 50, label: 'Half Century!', emoji: '⭐' },
  { days: 100, label: 'Century Streak!', emoji: '🏆' },
  { days: 365, label: 'Year Anniversary!', emoji: '🎉' },
];

// Regex patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  USERNAME: /^[a-zA-Z0-9_.]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  SLUG: /^[a-z0-9-]+$/,
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER: 'Something went wrong. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! 🎉',
  LOGOUT: 'Logged out successfully.',
  REGISTER: 'Account created successfully! 🎉',
  VERIFY_EMAIL: 'Email verified successfully! ✅',
  RESET_PASSWORD: 'Password reset successfully! ✅',
  UPDATE_PROFILE: 'Profile updated successfully! ✅',
  CREATE_ARTICLE: 'Article published successfully! 🎉',
  UPDATE_ARTICLE: 'Article updated successfully! ✅',
  DELETE_ARTICLE: 'Article deleted successfully.',
  SAVE_DRAFT: 'Draft saved successfully! ✅',
  PUBLISH_ARTICLE: 'Article published successfully! 🎉',
  BOOKMARK: 'Bookmarked! 📌',
  UNBOOKMARK: 'Bookmark removed.',
  FOLLOW: 'Now following! 🎉',
  UNFOLLOW: 'Unfollowed successfully.',
  LIKE: 'Liked! ❤️',
  UNLIKE: 'Unliked.',
  COMMENT: 'Comment added! 💬',
  DELETE_COMMENT: 'Comment deleted.',
  REPORT: 'Reported. We will review it shortly.',
  SUBSCRIBE: 'Subscribed! 🎉',
  UNSUBSCRIBE: 'Unsubscribed.',
  SEND_EMAIL: 'Email sent successfully! 📧',
  EXPORT: 'Export started! Your file will be downloaded shortly.',
};

export default {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_ENDPOINTS,
  USER_ROLES,
  ARTICLE_STATUS,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  CATEGORIES,
  LANGUAGES,
  THEME_COLORS,
  DATE_FORMATS,
  PAGINATION,
  TOAST_DURATION,
  FILE_UPLOAD,
  STREAK_MILESTONES,
  REGEX,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};