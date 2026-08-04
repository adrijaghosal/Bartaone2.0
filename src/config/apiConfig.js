/**
 * API configuration for BartaOne
 * Includes endpoints, headers, timeouts, and environment settings
 */

// Environment variables
const ENV = import.meta.env;

export const apiConfig = {
  // Base URLs
  baseURL: ENV.VITE_API_URL || 'http://localhost:3000/api',
  wsURL: ENV.VITE_WS_URL || 'ws://localhost:3000',
  cdnURL: ENV.VITE_CDN_URL || 'https://cdn.bartaone.com',

  // Timeouts
  timeout: 30000,
  uploadTimeout: 60000,
  downloadTimeout: 120000,

  // Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': '2.0.0',
    'X-Platform': 'web',
  },

  // Auth
  auth: {
    tokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
    rememberMeKey: 'rememberMe',
    tokenExpiryBuffer: 300, // 5 minutes
  },

  // Retry
  retry: {
    maxAttempts: 3,
    delay: 1000,
    backoff: 2,
    statusCodes: [408, 429, 500, 502, 503, 504],
  },

  // Cache
  cache: {
    enabled: true,
    maxAge: 300, // 5 minutes
    maxSize: 100,
    endpoints: {
      '/articles': 300,
      '/articles/trending': 600,
      '/articles/categories': 3600,
      '/articles/tags': 3600,
      '/publishers': 600,
      '/publishers/analytics': 300,
      '/notifications': 60,
      '/streak': 60,
      '/ai/preferences': 300,
    },
  },

  // Rate limiting
  rateLimit: {
    enabled: true,
    maxRequests: 60,
    window: 60000, // 1 minute
  },

  // WebSocket
  websocket: {
    reconnectAttempts: 5,
    reconnectDelay: 3000,
    maxReconnectDelay: 30000,
    heartbeatInterval: 30000,
  },

  // File upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    acceptedTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ],
    chunkSize: 1024 * 1024, // 1MB
  },

  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
    defaultPage: 1,
  },

  // Search
  search: {
    debounceDelay: 500,
    minQueryLength: 2,
    maxResults: 100,
  },

  // Analytics
  analytics: {
    enabled: true,
    sampleRate: 1.0,
    batchSize: 10,
    flushInterval: 5000,
  },

  // Error handling
  errorHandling: {
    showToast: true,
    logErrors: true,
    reportErrors: ENV.VITE_REPORT_ERRORS === 'true',
    sentryDSN: ENV.VITE_SENTRY_DSN,
  },

  // Environment
  environment: {
    isProduction: ENV.MODE === 'production',
    isDevelopment: ENV.MODE === 'development',
    isTest: ENV.MODE === 'test',
    isStaging: ENV.MODE === 'staging',
  },

  // Features
  features: {
    aiPersonalization: ENV.VITE_FEATURE_AI === 'true',
    realTimeNotifications: ENV.VITE_FEATURE_WEBSOCKET !== 'false',
    socialLogin: ENV.VITE_FEATURE_SOCIAL_LOGIN !== 'false',
    fileUpload: ENV.VITE_FEATURE_UPLOAD !== 'false',
    analytics: ENV.VITE_FEATURE_ANALYTICS !== 'false',
    exportData: ENV.VITE_FEATURE_EXPORT !== 'false',
    multiLanguage: ENV.VITE_FEATURE_MULTI_LANGUAGE !== 'false',
    darkMode: ENV.VITE_FEATURE_DARK_MODE !== 'false',
    readingStreak: ENV.VITE_FEATURE_STREAK !== 'false',
    aiContentSuggestions: ENV.VITE_FEATURE_AI_SUGGESTIONS !== 'false',
  },

  // API Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      me: '/auth/me',
      refreshToken: '/auth/refresh-token',
      resetPassword: '/auth/reset-password',
      confirmResetPassword: '/auth/reset-password/confirm',
      verifyEmail: '/auth/verify-email',
      resendVerification: '/auth/resend-verification',
      changePassword: '/auth/change-password',
      socialLogin: '/auth/social',
    },
    articles: {
      base: '/articles',
      drafts: '/articles/drafts',
      publish: '/articles/publish',
      bookmark: '/articles/bookmark',
      like: '/articles/like',
      categories: '/articles/categories',
      tags: '/articles/tags',
      trending: '/articles/trending',
      recommended: '/articles/recommended',
      search: '/articles/search',
      related: '/articles/related',
      stats: '/articles/stats',
      uploadCover: '/articles/upload-cover',
    },
    publishers: {
      base: '/publishers',
      profile: '/publishers/profile',
      stats: '/publishers/stats',
      followers: '/publishers/followers',
      following: '/publishers/following',
      subscribers: '/publishers/subscribers',
      analytics: '/publishers/analytics',
      earnings: '/publishers/earnings',
      payout: '/publishers/payout',
      paymentMethods: '/publishers/payment-methods',
      articles: '/publishers/articles',
    },
    notifications: {
      base: '/notifications',
      preferences: '/notifications/preferences',
      devices: '/notifications/devices',
      stats: '/notifications/stats',
      markRead: '/notifications/mark-read',
      markAllRead: '/notifications/mark-all-read',
    },
    analytics: {
      dashboard: '/analytics/dashboard',
      performance: '/analytics/performance',
      audience: '/analytics/audience',
      revenue: '/analytics/revenue',
      engagement: '/analytics/engagement',
      export: '/analytics/export',
      realtime: '/analytics/realtime',
      activity: '/analytics/activity',
      topArticles: '/analytics/top-articles',
    },
    ai: {
      personalizedFeed: '/ai/personalized-feed',
      preferences: '/ai/preferences',
      trendingTopics: '/ai/trending-topics',
      readingHistory: '/ai/reading-history',
      contentSuggestions: '/ai/content-suggestions',
      audienceInsights: '/ai/audience-insights',
      summary: '/ai/summary',
      sentiment: '/ai/sentiment',
      refreshFeed: '/ai/refresh-feed',
      personalize: '/ai/personalize',
      seoSuggestions: '/ai/seo-suggestions',
      performanceInsights: '/ai/performance-insights',
      trendingKeywords: '/ai/trending-keywords',
    },
    streak: {
      base: '/streak',
      history: '/streak/history',
      checkin: '/streak/checkin',
      stats: '/streak/stats',
      milestones: '/streak/milestones',
      leaderboard: '/streak/leaderboard',
      readingLog: '/streak/reading-log',
    },
    bookmarks: {
      base: '/bookmarks',
      folders: '/bookmarks/folders',
      search: '/bookmarks/search',
      export: '/bookmarks/export',
      import: '/bookmarks/import',
      bulkDelete: '/bookmarks/bulk-delete',
      bulkMove: '/bookmarks/bulk-move',
    },
    users: {
      base: '/users',
      profile: '/users/profile',
      preferences: '/users/preferences',
      activity: '/users/activity',
      sessions: '/users/sessions',
      history: '/users/history',
    },
    admin: {
      base: '/admin',
      users: '/admin/users',
      publishers: '/admin/publishers',
      articles: '/admin/articles',
      analytics: '/admin/analytics',
      settings: '/admin/settings',
      moderation: '/admin/moderation',
      reports: '/admin/reports',
    },
    uploads: {
      base: '/uploads',
      images: '/uploads/images',
      files: '/uploads/files',
      avatars: '/uploads/avatars',
      covers: '/uploads/covers',
    },
  },
};

// API configuration utilities
export const apiUtils = {
  /**
   * Get endpoint URL
   */
  getEndpoint: (path) => {
    const parts = path.split('.');
    let endpoint = apiConfig.endpoints;
    for (const part of parts) {
      if (endpoint && typeof endpoint === 'object' && part in endpoint) {
        endpoint = endpoint[part];
      } else {
        return null;
      }
    }
    return typeof endpoint === 'string' ? endpoint : null;
  },

  /**
   * Build full URL
   */
  buildUrl: (path, params = {}) => {
    const endpoint = apiUtils.getEndpoint(path);
    if (!endpoint) return null;
    let url = `${apiConfig.baseURL}${endpoint}`;
    
    // Add query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  },

  /**
   * Get cache TTL for endpoint
   */
  getCacheTTL: (path) => {
    const endpoint = apiUtils.getEndpoint(path);
    if (!endpoint) return null;
    return apiConfig.cache.endpoints[endpoint] || apiConfig.cache.maxAge;
  },

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled: (feature) => {
    return apiConfig.features[feature] === true;
  },

  /**
   * Get environment
   */
  getEnvironment: () => {
    return apiConfig.environment;
  },

  /**
   * Check if in production
   */
  isProduction: () => {
    return apiConfig.environment.isProduction;
  },

  /**
   * Check if in development
   */
  isDevelopment: () => {
    return apiConfig.environment.isDevelopment;
  },

  /**
   * Get auth token key
   */
  getTokenKey: () => {
    return apiConfig.auth.tokenKey;
  },

  /**
   * Get auth token
   */
  getToken: () => {
    return localStorage.getItem(apiConfig.auth.tokenKey);
  },

  /**
   * Set auth token
   */
  setToken: (token) => {
    localStorage.setItem(apiConfig.auth.tokenKey, token);
  },

  /**
   * Remove auth token
   */
  removeToken: () => {
    localStorage.removeItem(apiConfig.auth.tokenKey);
  },
};

export default {
  apiConfig,
  apiUtils,
};