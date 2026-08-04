/**
 * Notification related TypeScript type definitions
 */

// Notification type enum
export const NotificationType = {
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
  SUBSCRIPTION: 'subscription',
  PAYMENT: 'payment',
  REPORT: 'report',
  VERIFICATION: 'verification',
};

// Notification priority enum
export const NotificationPriority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Notification channel enum
export const NotificationChannel = {
  IN_APP: 'in_app',
  EMAIL: 'email',
  PUSH: 'push',
  SMS: 'sms',
  WEBHOOK: 'webhook',
};

// Notification status enum
export const NotificationStatus = {
  READ: 'read',
  UNREAD: 'unread',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  SENT: 'sent',
  PENDING: 'pending',
  FAILED: 'failed',
  DELIVERED: 'delivered',
};

// Notification schema
export const NotificationSchema = {
  id: 'string',
  userId: 'string',
  type: 'string',
  priority: 'string',
  title: 'string',
  message: 'string',
  body: 'string',
  icon: 'string',
  image: 'string',
  link: 'string',
  read: 'boolean',
  readAt: 'string',
  deliveredAt: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  metadata: 'object',
  actions: 'array',
  sender: 'object',
  channel: 'string',
  status: 'string',
};

// Notification preference schema
export const NotificationPreferenceSchema = {
  push: 'boolean',
  email: 'boolean',
  inApp: 'boolean',
  sound: 'boolean',
  frequency: 'string',
  quietHours: 'object',
  categories: 'object',
  priority: 'object',
  digest: 'object',
  marketing: 'boolean',
  system: 'boolean',
};

// Notification quiet hours schema
export const NotificationQuietHoursSchema = {
  enabled: 'boolean',
  start: 'string',
  end: 'string',
  timezone: 'string',
  days: 'array',
};

// Notification category preference schema
export const NotificationCategoryPreferenceSchema = {
  likes: 'boolean',
  comments: 'boolean',
  follows: 'boolean',
  mentions: 'boolean',
  shares: 'boolean',
  bookmarks: 'boolean',
  awards: 'boolean',
  trending: 'boolean',
  system: 'boolean',
  emailDigest: 'boolean',
  weeklySummary: 'boolean',
};

// Notification priority preference schema
export const NotificationPriorityPreferenceSchema = {
  high: 'boolean',
  medium: 'boolean',
  low: 'boolean',
};

// Notification digest preference schema
export const NotificationDigestPreferenceSchema = {
  enabled: 'boolean',
  frequency: 'string',
  day: 'string',
  time: 'string',
  includeCategories: 'array',
};

// Notification action schema
export const NotificationActionSchema = {
  label: 'string',
  action: 'string',
  url: 'string',
  icon: 'string',
  variant: 'string',
};

// Notification sender schema
export const NotificationSenderSchema = {
  id: 'string',
  name: 'string',
  avatar: 'string',
  type: 'string',
};

// Notification metadata schema
export const NotificationMetadataSchema = {
  sourceId: 'string',
  sourceType: 'string',
  sourceUrl: 'string',
  entityId: 'string',
  entityType: 'string',
  entityUrl: 'string',
  referenceId: 'string',
  referenceType: 'string',
  referenceUrl: 'string',
  additionalData: 'object',
};

// Notification filter schema
export const NotificationFilterSchema = {
  type: 'string',
  priority: 'string',
  status: 'string',
  channel: 'string',
  dateFrom: 'string',
  dateTo: 'string',
  read: 'boolean',
  search: 'string',
  limit: 'number',
  page: 'number',
  sort: 'string',
  order: 'string',
};

// Notification response schema
export const NotificationResponseSchema = {
  notifications: 'array',
  unreadCount: 'number',
  total: 'number',
  page: 'number',
  limit: 'number',
  totalPages: 'number',
  hasMore: 'boolean',
};

// Notification stats schema
export const NotificationStatsSchema = {
  total: 'number',
  unread: 'number',
  read: 'number',
  archived: 'number',
  byType: 'object',
  byPriority: 'object',
  byChannel: 'object',
  lastWeek: 'array',
  lastMonth: 'array',
};

// Type definitions as JSDoc comments

/**
 * @typedef {Object} Notification
 * @property {string} id - Notification ID
 * @property {string} userId - User ID
 * @property {string} type - Notification type
 * @property {string} priority - Notification priority (high, medium, low)
 * @property {string} title - Notification title
 * @property {string} message - Notification message
 * @property {string} body - Notification body content
 * @property {string} icon - Notification icon URL
 * @property {string} image - Notification image URL
 * @property {string} link - Notification link URL
 * @property {boolean} read - Whether notification is read
 * @property {string} readAt - Read timestamp
 * @property {string} deliveredAt - Delivery timestamp
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {NotificationMetadata} metadata - Notification metadata
 * @property {NotificationAction[]} actions - Notification actions
 * @property {NotificationSender} sender - Notification sender
 * @property {string} channel - Notification channel
 * @property {string} status - Notification status
 */

/**
 * @typedef {Object} NotificationPreference
 * @property {boolean} push - Push notifications enabled
 * @property {boolean} email - Email notifications enabled
 * @property {boolean} inApp - In-app notifications enabled
 * @property {boolean} sound - Sound notifications enabled
 * @property {string} frequency - Notification frequency
 * @property {NotificationQuietHours} quietHours - Quiet hours settings
 * @property {NotificationCategoryPreference} categories - Category preferences
 * @property {NotificationPriorityPreference} priority - Priority preferences
 * @property {NotificationDigestPreference} digest - Digest preferences
 * @property {boolean} marketing - Marketing notifications enabled
 * @property {boolean} system - System notifications enabled
 */

/**
 * @typedef {Object} NotificationQuietHours
 * @property {boolean} enabled - Whether quiet hours are enabled
 * @property {string} start - Start time (HH:mm)
 * @property {string} end - End time (HH:mm)
 * @property {string} timezone - Timezone
 * @property {string[]} days - Days of the week
 */

/**
 * @typedef {Object} NotificationCategoryPreference
 * @property {boolean} likes - Likes notifications enabled
 * @property {boolean} comments - Comments notifications enabled
 * @property {boolean} follows - Follows notifications enabled
 * @property {boolean} mentions - Mentions notifications enabled
 * @property {boolean} shares - Shares notifications enabled
 * @property {boolean} bookmarks - Bookmarks notifications enabled
 * @property {boolean} awards - Awards notifications enabled
 * @property {boolean} trending - Trending notifications enabled
 * @property {boolean} system - System notifications enabled
 * @property {boolean} emailDigest - Email digest notifications enabled
 * @property {boolean} weeklySummary - Weekly summary notifications enabled
 */

/**
 * @typedef {Object} NotificationPriorityPreference
 * @property {boolean} high - High priority notifications enabled
 * @property {boolean} medium - Medium priority notifications enabled
 * @property {boolean} low - Low priority notifications enabled
 */

/**
 * @typedef {Object} NotificationDigestPreference
 * @property {boolean} enabled - Whether digest is enabled
 * @property {string} frequency - Digest frequency (daily, weekly, monthly)
 * @property {string} day - Digest day
 * @property {string} time - Digest time
 * @property {string[]} includeCategories - Categories to include
 */

/**
 * @typedef {Object} NotificationAction
 * @property {string} label - Action label
 * @property {string} action - Action type
 * @property {string} url - Action URL
 * @property {string} icon - Action icon
 * @property {string} variant - Action variant
 */

/**
 * @typedef {Object} NotificationSender
 * @property {string} id - Sender ID
 * @property {string} name - Sender name
 * @property {string} avatar - Sender avatar URL
 * @property {string} type - Sender type (user, system, publisher)
 */

/**
 * @typedef {Object} NotificationMetadata
 * @property {string} sourceId - Source ID
 * @property {string} sourceType - Source type
 * @property {string} sourceUrl - Source URL
 * @property {string} entityId - Entity ID
 * @property {string} entityType - Entity type
 * @property {string} entityUrl - Entity URL
 * @property {string} referenceId - Reference ID
 * @property {string} referenceType - Reference type
 * @property {string} referenceUrl - Reference URL
 * @property {Object} additionalData - Additional metadata
 */

/**
 * @typedef {Object} NotificationFilter
 * @property {string} type - Filter by type
 * @property {string} priority - Filter by priority
 * @property {string} status - Filter by status
 * @property {string} channel - Filter by channel
 * @property {string} dateFrom - Filter by date from
 * @property {string} dateTo - Filter by date to
 * @property {boolean} read - Filter by read status
 * @property {string} search - Search query
 * @property {number} limit - Results per page
 * @property {number} page - Page number
 * @property {string} sort - Sort field
 * @property {string} order - Sort order (asc/desc)
 */

/**
 * @typedef {Object} NotificationResponse
 * @property {Notification[]} notifications - List of notifications
 * @property {number} unreadCount - Unread count
 * @property {number} total - Total count
 * @property {number} page - Current page
 * @property {number} limit - Results per page
 * @property {number} totalPages - Total pages
 * @property {boolean} hasMore - Whether there are more results
 */

/**
 * @typedef {Object} NotificationStats
 * @property {number} total - Total notifications
 * @property {number} unread - Unread notifications
 * @property {number} read - Read notifications
 * @property {number} archived - Archived notifications
 * @property {Object} byType - Count by type
 * @property {Object} byPriority - Count by priority
 * @property {Object} byChannel - Count by channel
 * @property {Object[]} lastWeek - Last week stats
 * @property {Object[]} lastMonth - Last month stats
 */

export default {
  NotificationType,
  NotificationPriority,
  NotificationChannel,
  NotificationStatus,
  NotificationSchema,
  NotificationPreferenceSchema,
  NotificationQuietHoursSchema,
  NotificationCategoryPreferenceSchema,
  NotificationPriorityPreferenceSchema,
  NotificationDigestPreferenceSchema,
  NotificationActionSchema,
  NotificationSenderSchema,
  NotificationMetadataSchema,
  NotificationFilterSchema,
  NotificationResponseSchema,
  NotificationStatsSchema,
};