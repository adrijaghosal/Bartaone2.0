/**
 * User related TypeScript type definitions
 */

// User role enum
export const UserRole = {
  READER: 'reader',
  PUBLISHER: 'publisher',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

// User status enum
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  PENDING_VERIFICATION: 'pending_verification',
  VERIFIED: 'verified',
};

// User preference schema
export const UserPreferenceSchema = {
  theme: 'string',
  language: 'string',
  fontSize: 'string',
  primaryColor: 'string',
  reducedMotion: 'boolean',
  highContrast: 'boolean',
  notifications: 'object',
  privacy: 'object',
  accessibility: 'object',
};

// User schema
export const UserSchema = {
  id: 'string',
  name: 'string',
  email: 'string',
  avatar: 'string',
  role: 'string',
  status: 'string',
  bio: 'string',
  location: 'string',
  website: 'string',
  socialLinks: 'object',
  preferences: 'object',
  permissions: 'array',
  lastLogin: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  emailVerified: 'boolean',
  twoFactorEnabled: 'boolean',
  streakCount: 'number',
  totalReads: 'number',
  totalLikes: 'number',
  totalComments: 'number',
  totalBookmarks: 'number',
  totalFollowers: 'number',
  totalFollowing: 'number',
};

// User profile schema
export const UserProfileSchema = {
  name: 'string',
  bio: 'string',
  location: 'string',
  website: 'string',
  avatar: 'string',
  socialLinks: 'object',
  preferences: 'object',
};

// User notification preference schema
export const UserNotificationPreferenceSchema = {
  push: 'boolean',
  email: 'boolean',
  inApp: 'boolean',
  sound: 'boolean',
  frequency: 'string',
  quietHours: 'object',
  categories: 'object',
  priority: 'object',
};

// User privacy setting schema
export const UserPrivacySettingSchema = {
  profileVisibility: 'string',
  showReadingActivity: 'boolean',
  showEmail: 'boolean',
  showLocation: 'boolean',
  allowFollows: 'boolean',
  allowMessages: 'boolean',
  allowComments: 'boolean',
  dataSharing: 'boolean',
  analytics: 'boolean',
};

// User activity schema
export const UserActivitySchema = {
  id: 'string',
  userId: 'string',
  type: 'string',
  action: 'string',
  target: 'string',
  metadata: 'object',
  timestamp: 'string',
};

// User session schema
export const UserSessionSchema = {
  id: 'string',
  userId: 'string',
  token: 'string',
  device: 'string',
  browser: 'string',
  os: 'string',
  ip: 'string',
  location: 'string',
  lastActivity: 'string',
  createdAt: 'string',
  expiresAt: 'string',
  isActive: 'boolean',
};

// User login history schema
export const UserLoginHistorySchema = {
  id: 'string',
  userId: 'string',
  timestamp: 'string',
  ip: 'string',
  device: 'string',
  browser: 'string',
  os: 'string',
  location: 'string',
  success: 'boolean',
  method: 'string',
};

// User change password schema
export const UserChangePasswordSchema = {
  currentPassword: 'string',
  newPassword: 'string',
  confirmPassword: 'string',
};

// User reset password schema
export const UserResetPasswordSchema = {
  email: 'string',
  token: 'string',
  newPassword: 'string',
};

// User verification schema
export const UserVerificationSchema = {
  email: 'string',
  token: 'string',
  type: 'string',
  expiresAt: 'string',
  verified: 'boolean',
};

// Type definitions as JSDoc comments

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User full name
 * @property {string} email - User email
 * @property {string} avatar - Avatar URL
 * @property {string} role - User role (reader, publisher, admin, super_admin)
 * @property {string} status - User status (active, inactive, suspended, banned, pending_verification, verified)
 * @property {string} bio - User biography
 * @property {string} location - User location
 * @property {string} website - User website
 * @property {Object} socialLinks - Social media links
 * @property {UserPreferences} preferences - User preferences
 * @property {string[]} permissions - User permissions
 * @property {string} lastLogin - Last login timestamp
 * @property {string} createdAt - Account creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {boolean} emailVerified - Whether email is verified
 * @property {boolean} twoFactorEnabled - Whether 2FA is enabled
 * @property {number} streakCount - Reading streak count
 * @property {number} totalReads - Total articles read
 * @property {number} totalLikes - Total likes given
 * @property {number} totalComments - Total comments made
 * @property {number} totalBookmarks - Total bookmarks
 * @property {number} totalFollowers - Total followers
 * @property {number} totalFollowing - Total following
 */

/**
 * @typedef {Object} UserPreferences
 * @property {string} theme - Theme preference (dark/light/system)
 * @property {string} language - Language preference
 * @property {string} fontSize - Font size preference
 * @property {string} primaryColor - Primary color preference
 * @property {boolean} reducedMotion - Reduced motion preference
 * @property {boolean} highContrast - High contrast preference
 * @property {UserNotificationPreferences} notifications - Notification preferences
 * @property {UserPrivacySettings} privacy - Privacy settings
 * @property {Object} accessibility - Accessibility settings
 */

/**
 * @typedef {Object} UserNotificationPreferences
 * @property {boolean} push - Push notifications enabled
 * @property {boolean} email - Email notifications enabled
 * @property {boolean} inApp - In-app notifications enabled
 * @property {boolean} sound - Sound notifications enabled
 * @property {string} frequency - Notification frequency (instant, hourly, daily, weekly)
 * @property {Object} quietHours - Quiet hours settings
 * @property {Object} categories - Category preferences
 * @property {Object} priority - Priority preferences
 */

/**
 * @typedef {Object} UserPrivacySettings
 * @property {string} profileVisibility - Profile visibility setting
 * @property {boolean} showReadingActivity - Whether to show reading activity
 * @property {boolean} showEmail - Whether to show email
 * @property {boolean} showLocation - Whether to show location
 * @property {boolean} allowFollows - Whether to allow follows
 * @property {boolean} allowMessages - Whether to allow messages
 * @property {boolean} allowComments - Whether to allow comments
 * @property {boolean} dataSharing - Whether to allow data sharing
 * @property {boolean} analytics - Whether to allow analytics tracking
 */

/**
 * @typedef {Object} UserActivity
 * @property {string} id - Activity ID
 * @property {string} userId - User ID
 * @property {string} type - Activity type
 * @property {string} action - Activity action
 * @property {string} target - Activity target
 * @property {Object} metadata - Activity metadata
 * @property {string} timestamp - Activity timestamp
 */

/**
 * @typedef {Object} UserSession
 * @property {string} id - Session ID
 * @property {string} userId - User ID
 * @property {string} token - Session token
 * @property {string} device - Device name
 * @property {string} browser - Browser name
 * @property {string} os - Operating system
 * @property {string} ip - IP address
 * @property {string} location - Location
 * @property {string} lastActivity - Last activity timestamp
 * @property {string} createdAt - Session creation timestamp
 * @property {string} expiresAt - Session expiration timestamp
 * @property {boolean} isActive - Whether session is active
 */

/**
 * @typedef {Object} UserLoginHistory
 * @property {string} id - Login history ID
 * @property {string} userId - User ID
 * @property {string} timestamp - Login timestamp
 * @property {string} ip - IP address
 * @property {string} device - Device name
 * @property {string} browser - Browser name
 * @property {string} os - Operating system
 * @property {string} location - Location
 * @property {boolean} success - Whether login was successful
 * @property {string} method - Login method (email, social, token)
 */

/**
 * @typedef {Object} UserChangePassword
 * @property {string} currentPassword - Current password
 * @property {string} newPassword - New password
 * @property {string} confirmPassword - Confirmed new password
 */

/**
 * @typedef {Object} UserResetPassword
 * @property {string} email - User email
 * @property {string} token - Reset token
 * @property {string} newPassword - New password
 */

/**
 * @typedef {Object} UserVerification
 * @property {string} email - User email
 * @property {string} token - Verification token
 * @property {string} type - Verification type
 * @property {string} expiresAt - Expiration timestamp
 * @property {boolean} verified - Whether verified
 */

export default {
  UserRole,
  UserStatus,
  UserPreferenceSchema,
  UserSchema,
  UserProfileSchema,
  UserNotificationPreferenceSchema,
  UserPrivacySettingSchema,
  UserActivitySchema,
  UserSessionSchema,
  UserLoginHistorySchema,
  UserChangePasswordSchema,
  UserResetPasswordSchema,
  UserVerificationSchema,
};