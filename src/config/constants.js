/**
 * Application constants configuration
 * Centralized constants for the entire application
 */

export const constants = {
  // Application
  app: {
    name: 'BartaOne',
    version: '2.0.0',
    description: 'AI-powered multilingual news platform',
    domain: 'bartaone.com',
    company: 'BartaOne Inc.',
    year: new Date().getFullYear(),
  },

  // Routes
  routes: {
    public: [
      '/',
      '/login',
      '/register',
      '/verify-email',
      '/forgot-password',
      '/reset-password',
      '/article/:id',
      '/publisher/:id',
      '/search',
    ],
    reader: [
      '/feed',
      '/bookmarks',
      '/profile',
      '/settings',
    ],
    publisher: [
      '/publisher/dashboard',
      '/publisher/articles',
      '/publisher/analytics',
      '/publisher/subscribers',
      '/publisher/earnings',
      '/publisher/create-article',
      '/publisher/edit-article/:id',
      '/publisher/settings',
    ],
    admin: [
      '/admin/dashboard',
      '/admin/users',
      '/admin/publishers',
      '/admin/articles',
      '/admin/analytics',
      '/admin/settings',
    ],
  },

  // User roles with hierarchy
  roles: {
    reader: { level: 0, label: 'Reader' },
    publisher: { level: 1, label: 'Publisher' },
    admin: { level: 2, label: 'Admin' },
    superAdmin: { level: 3, label: 'Super Admin' },
  },

  // Article statuses
  articleStatus: {
    draft: { label: 'Draft', color: 'warning' },
    published: { label: 'Published', color: 'success' },
    scheduled: { label: 'Scheduled', color: 'info' },
    archived: { label: 'Archived', color: 'gray' },
    pending: { label: 'Pending Review', color: 'warning' },
    rejected: { label: 'Rejected', color: 'danger' },
    reviewed: { label: 'Under Review', color: 'info' },
  },

  // Notification types with icons
  notificationTypes: {
    like: { label: 'Liked', icon: '❤️', color: 'danger' },
    comment: { label: 'Commented', icon: '💬', color: 'warning' },
    follow: { label: 'Followed', icon: '👤', color: 'success' },
    mention: { label: 'Mentioned', icon: '📌', color: 'info' },
    share: { label: 'Shared', icon: '📤', color: 'primary' },
    bookmark: { label: 'Bookmarked', icon: '🔖', color: 'terracotta' },
    award: { label: 'Awarded', icon: '🏆', color: 'success' },
    trending: { label: 'Trending', icon: '📈', color: 'warning' },
    system: { label: 'System', icon: '⚙️', color: 'info' },
    email: { label: 'Email', icon: '📧', color: 'primary' },
    reminder: { label: 'Reminder', icon: '⏰', color: 'warning' },
    announcement: { label: 'Announcement', icon: '📢', color: 'info' },
  },

  // Categories with icons
  categories: [
    { id: 'technology', label: 'Technology', icon: '💻', color: 'blue' },
    { id: 'business', label: 'Business', icon: '💼', color: 'green' },
    { id: 'science', label: 'Science', icon: '🔬', color: 'purple' },
    { id: 'health', label: 'Health', icon: '🏥', color: 'pink' },
    { id: 'politics', label: 'Politics', icon: '🏛️', color: 'red' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎭', color: 'yellow' },
    { id: 'sports', label: 'Sports', icon: '⚽', color: 'orange' },
    { id: 'world', label: 'World News', icon: '🌍', color: 'indigo' },
    { id: 'education', label: 'Education', icon: '📚', color: 'teal' },
    { id: 'environment', label: 'Environment', icon: '🌱', color: 'emerald' },
    { id: 'design', label: 'Design', icon: '🎨', color: 'violet' },
    { id: 'travel', label: 'Travel', icon: '✈️', color: 'cyan' },
    { id: 'food', label: 'Food', icon: '🍳', color: 'rose' },
    { id: 'lifestyle', label: 'Lifestyle', icon: '🌟', color: 'amber' },
    { id: 'fashion', label: 'Fashion', icon: '👗', color: 'fuchsia' },
    { id: 'gaming', label: 'Gaming', icon: '🎮', color: 'purple' },
    { id: 'music', label: 'Music', icon: '🎵', color: 'pink' },
    { id: 'film', label: 'Film', icon: '🎬', color: 'red' },
    { id: 'books', label: 'Books', icon: '📖', color: 'blue' },
    { id: 'art', label: 'Art', icon: '🖼️', color: 'purple' },
  ],

  // Languages
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', direction: 'ltr' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', direction: 'ltr' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', direction: 'ltr' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  ],

  // Theme colors
  themeColors: [
    { id: 'terracotta', label: 'Terracotta', color: '#E8835F' },
    { id: 'navy', label: 'Navy', color: '#2A5B8F' },
    { id: 'beige', label: 'Beige', color: '#E6B473' },
    { id: 'blue', label: 'Blue', color: '#4A90D9' },
    { id: 'green', label: 'Green', color: '#4CAF50' },
    { id: 'purple', label: 'Purple', color: '#7B61FF' },
    { id: 'pink', label: 'Pink', color: '#E67E9A' },
    { id: 'orange', label: 'Orange', color: '#F5A623' },
  ],

  // Font sizes
  fontSizes: [
    { id: 'small', label: 'Small', size: '14px' },
    { id: 'medium', label: 'Medium', size: '16px' },
    { id: 'large', label: 'Large', size: '18px' },
    { id: 'xlarge', label: 'X-Large', size: '20px' },
  ],

  // Streak milestones
  streakMilestones: [
    { days: 1, label: 'First Step', emoji: '🌱' },
    { days: 3, label: 'Getting Started', emoji: '📖' },
    { days: 7, label: 'Weekly Warrior', emoji: '📈' },
    { days: 14, label: 'Two Weeks!', emoji: '💪' },
    { days: 30, label: 'Monthly Master', emoji: '🔥' },
    { days: 50, label: 'Half Century!', emoji: '⭐' },
    { days: 100, label: 'Century Streak!', emoji: '🏆' },
    { days: 365, label: 'Year Anniversary!', emoji: '🎉' },
  ],

  // Social platforms
  socialPlatforms: [
    { id: 'twitter', label: 'Twitter', icon: '🐦', color: '#1DA1F2' },
    { id: 'facebook', label: 'Facebook', icon: '📘', color: '#1877F2' },
    { id: 'instagram', label: 'Instagram', icon: '📸', color: '#E4405F' },
    { id: 'youtube', label: 'YouTube', icon: '▶️', color: '#FF0000' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: '#0A66C2' },
    { id: 'github', label: 'GitHub', icon: '🐙', color: '#181717' },
    { id: 'discord', label: 'Discord', icon: '💬', color: '#5865F2' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵', color: '#000000' },
    { id: 'threads', label: 'Threads', icon: '🧵', color: '#000000' },
  ],

  // Payment methods
  paymentMethods: [
    { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { id: 'paypal', label: 'PayPal', icon: '💳' },
    { id: 'stripe', label: 'Stripe', icon: '⚡' },
    { id: 'crypto', label: 'Cryptocurrency', icon: '₿' },
  ],

  // File types
  fileTypes: {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    video: ['mp4', 'webm', 'mov', 'avi'],
    audio: ['mp3', 'wav', 'ogg', 'm4a'],
    document: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
    spreadsheet: ['xls', 'xlsx', 'csv'],
    presentation: ['ppt', 'pptx'],
    archive: ['zip', 'rar', '7z'],
  },

  // HTTP status codes
  httpStatus: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },

  // Error codes
  errorCodes: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    PERMISSION_ERROR: 'PERMISSION_ERROR',
    RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    CACHE_ERROR: 'CACHE_ERROR',
    PARSE_ERROR: 'PARSE_ERROR',
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
    pageSizes: [10, 20, 50, 100],
  },

  // Toast durations
  toastDurations: {
    short: 2000,
    medium: 4000,
    long: 6000,
    persistent: -1,
  },

  // Regex patterns
  regex: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    username: /^[a-zA-Z0-9_.]{3,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    slug: /^[a-z0-9-]+$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    isoDate: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
  },

  // Default values
  defaults: {
    avatar: '/images/default-avatar.png',
    coverImage: '/images/default-cover.jpg',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
    thumbnail: '/images/default-thumbnail.jpg',
  },

  // Meta tags
  meta: {
    title: 'BartaOne - AI-Powered Multilingual News Platform',
    description: 'Discover personalized news from publishers worldwide. AI-powered content discovery with multilingual support.',
    keywords: 'news, AI, multilingual, personalized, content, publishing, reader, publisher',
    author: 'BartaOne Inc.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image',
    twitterSite: '@bartaone',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN || '',
    amplitudeKey: import.meta.env.VITE_AMPLITUDE_KEY || '',
    hotjarId: import.meta.env.VITE_HOTJAR_ID || '',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  },
};

// Constants utilities
export const constantsUtils = {
  /**
   * Get constant value by path
   */
  get: (path) => {
    const parts = path.split('.');
    let value = constants;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }
    return value;
  },

  /**
   * Get category by ID
   */
  getCategory: (id) => {
    return constants.categories.find(c => c.id === id);
  },

  /**
   * Get language by code
   */
  getLanguage: (code) => {
    return constants.languages.find(l => l.code === code);
  },

  /**
   * Get role by name
   */
  getRole: (name) => {
    return constants.roles[name];
  },

  /**
   * Get article status by key
   */
  getArticleStatus: (key) => {
    return constants.articleStatus[key];
  },

  /**
   * Get notification type by key
   */
  getNotificationType: (key) => {
    return constants.notificationTypes[key];
  },

  /**
   * Get theme color by ID
   */
  getThemeColor: (id) => {
    return constants.themeColors.find(c => c.id === id);
  },

  /**
   * Get font size by ID
   */
  getFontSize: (id) => {
    return constants.fontSizes.find(f => f.id === id);
  },

  /**
   * Get streak milestone by days
   */
  getStreakMilestone: (days) => {
    return constants.streakMilestones.find(m => m.days === days);
  },

  /**
   * Get closest streak milestone
   */
  getClosestStreakMilestone: (days) => {
    return constants.streakMilestones
      .filter(m => m.days <= days)
      .reduce((prev, curr) => curr.days > prev.days ? curr : prev, constants.streakMilestones[0]);
  },

  /**
   * Get next streak milestone
   */
  getNextStreakMilestone: (days) => {
    return constants.streakMilestones.find(m => m.days > days);
  },

  /**
   * Get social platform by ID
   */
  getSocialPlatform: (id) => {
    return constants.socialPlatforms.find(p => p.id === id);
  },

  /**
   * Get payment method by ID
   */
  getPaymentMethod: (id) => {
    return constants.paymentMethods.find(p => p.id === id);
  },
};

export default {
  constants,
  constantsUtils,
};