/**
 * Publisher related TypeScript type definitions
 */

// Publisher status enum
export const PublisherStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Publisher tier enum
export const PublisherTier = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
};

// Publisher schema
export const PublisherSchema = {
  id: 'string',
  userId: 'string',
  name: 'string',
  logo: 'string',
  coverImage: 'string',
  tagline: 'string',
  bio: 'string',
  location: 'string',
  website: 'string',
  socialLinks: 'object',
  categories: 'array',
  status: 'string',
  tier: 'string',
  verified: 'boolean',
  followers: 'number',
  articleCount: 'number',
  totalViews: 'number',
  totalLikes: 'number',
  totalComments: 'number',
  totalShares: 'number',
  engagementRate: 'number',
  joinedAt: 'string',
  updatedAt: 'string',
  paymentEmail: 'string',
  payoutSettings: 'object',
  analytics: 'object',
  metrics: 'object',
};

// Publisher stats schema
export const PublisherStatsSchema = {
  totalViews: 'number',
  totalArticles: 'number',
  totalFollowers: 'number',
  totalRevenue: 'number',
  viewsChange: 'number',
  articlesChange: 'number',
  followersChange: 'number',
  revenueChange: 'number',
  engagementRate: 'number',
  averageReadTime: 'number',
  viewsByDay: 'array',
  revenueData: 'array',
  topArticles: 'array',
  categories: 'array',
  followerGrowth: 'array',
};

// Publisher analytics schema
export const PublisherAnalyticsSchema = {
  overview: 'object',
  performance: 'object',
  audience: 'object',
  revenue: 'object',
  engagement: 'object',
  subscribers: 'object',
  topContent: 'array',
  trends: 'object',
  insights: 'array',
};

// Publisher subscriber schema
export const PublisherSubscriberSchema = {
  id: 'string',
  publisherId: 'string',
  userId: 'string',
  user: 'object',
  status: 'string',
  tier: 'string',
  subscribedAt: 'string',
  lastActive: 'string',
  engagementRate: 'number',
  articlesRead: 'number',
  totalVisits: 'number',
  preferences: 'array',
  source: 'string',
  notes: 'string',
};

// Publisher subscriber analytics schema
export const PublisherSubscriberAnalyticsSchema = {
  totalSubscribers: 'number',
  subscriberGrowth: 'number',
  newSubscribers: 'number',
  churnedSubscribers: 'number',
  activeSubscribers: 'number',
  engagementRate: 'number',
  retentionRate: 'number',
  conversionRate: 'number',
  subscriberTrend: 'array',
  sourceData: 'array',
  tierData: 'array',
  engagementData: 'array',
  weeklyActivity: 'array',
  topSegments: 'array',
  emailOpenRate: 'number',
  emailClickRate: 'number',
  lifetimeValue: 'number',
};

// Publisher earnings schema
export const PublisherEarningsSchema = {
  totalRevenue: 'number',
  revenueChange: 'number',
  subscriptionRevenue: 'number',
  adRevenue: 'number',
  tipRevenue: 'number',
  totalSubscribers: 'number',
  subscriberGrowth: 'number',
  avgRevenuePerUser: 'number',
  revenueData: 'array',
  revenueByCategory: 'array',
  topEarningArticles: 'array',
  paymentMethods: 'array',
  monthlyTrend: 'array',
  projectedRevenue: 'number',
  conversionRate: 'number',
  churnRate: 'number',
  lifetimeValue: 'number',
};

// Publisher payout settings schema
export const PublisherPayoutSettingsSchema = {
  method: 'string',
  accountNumber: 'string',
  routingNumber: 'string',
  email: 'string',
  minimumPayout: 'number',
  currency: 'string',
  schedule: 'string',
};

// Publisher social links schema
export const PublisherSocialLinksSchema = {
  website: 'string',
  twitter: 'string',
  facebook: 'string',
  instagram: 'string',
  youtube: 'string',
  linkedin: 'string',
  github: 'string',
  discord: 'string',
  tiktok: 'string',
  threads: 'string',
};

// Type definitions as JSDoc comments

/**
 * @typedef {Object} Publisher
 * @property {string} id - Publisher ID
 * @property {string} userId - User ID
 * @property {string} name - Publisher name
 * @property {string} logo - Logo URL
 * @property {string} coverImage - Cover image URL
 * @property {string} tagline - Publisher tagline
 * @property {string} bio - Publisher biography
 * @property {string} location - Publisher location
 * @property {string} website - Publisher website
 * @property {PublisherSocialLinks} socialLinks - Social media links
 * @property {string[]} categories - Publisher categories
 * @property {string} status - Publisher status (active, inactive, suspended, pending, approved, rejected)
 * @property {string} tier - Publisher tier (free, premium, enterprise)
 * @property {boolean} verified - Whether the publisher is verified
 * @property {number} followers - Follower count
 * @property {number} articleCount - Article count
 * @property {number} totalViews - Total views
 * @property {number} totalLikes - Total likes
 * @property {number} totalComments - Total comments
 * @property {number} totalShares - Total shares
 * @property {number} engagementRate - Engagement rate percentage
 * @property {string} joinedAt - Join date
 * @property {string} updatedAt - Last update date
 * @property {string} paymentEmail - Payment email
 * @property {PublisherPayoutSettings} payoutSettings - Payout settings
 * @property {Object} analytics - Analytics data
 * @property {Object} metrics - Performance metrics
 */

/**
 * @typedef {Object} PublisherStats
 * @property {number} totalViews - Total views
 * @property {number} totalArticles - Total articles
 * @property {number} totalFollowers - Total followers
 * @property {number} totalRevenue - Total revenue
 * @property {number} viewsChange - Views change percentage
 * @property {number} articlesChange - Articles change percentage
 * @property {number} followersChange - Followers change percentage
 * @property {number} revenueChange - Revenue change percentage
 * @property {number} engagementRate - Engagement rate percentage
 * @property {number} averageReadTime - Average read time in minutes
 * @property {Object[]} viewsByDay - Views by day
 * @property {Object[]} revenueData - Revenue data
 * @property {Object[]} topArticles - Top articles
 * @property {Object[]} categories - Categories data
 * @property {Object[]} followerGrowth - Follower growth data
 */

/**
 * @typedef {Object} PublisherAnalytics
 * @property {Object} overview - Overview metrics
 * @property {Object} performance - Performance metrics
 * @property {Object} audience - Audience metrics
 * @property {Object} revenue - Revenue metrics
 * @property {Object} engagement - Engagement metrics
 * @property {Object} subscribers - Subscriber metrics
 * @property {Object[]} topContent - Top content
 * @property {Object} trends - Trends data
 * @property {string[]} insights - Key insights
 */

/**
 * @typedef {Object} PublisherSubscriber
 * @property {string} id - Subscriber ID
 * @property {string} publisherId - Publisher ID
 * @property {string} userId - User ID
 * @property {User} user - User object
 * @property {string} status - Subscriber status
 * @property {string} tier - Subscriber tier
 * @property {string} subscribedAt - Subscription date
 * @property {string} lastActive - Last active date
 * @property {number} engagementRate - Engagement rate percentage
 * @property {number} articlesRead - Articles read count
 * @property {number} totalVisits - Total visits
 * @property {string[]} preferences - Subscription preferences
 * @property {string} source - Acquisition source
 * @property {string} notes - Notes
 */

/**
 * @typedef {Object} PublisherSubscriberAnalytics
 * @property {number} totalSubscribers - Total subscribers
 * @property {number} subscriberGrowth - Subscriber growth percentage
 * @property {number} newSubscribers - New subscribers
 * @property {number} churnedSubscribers - Churned subscribers
 * @property {number} activeSubscribers - Active subscribers
 * @property {number} engagementRate - Engagement rate percentage
 * @property {number} retentionRate - Retention rate percentage
 * @property {number} conversionRate - Conversion rate percentage
 * @property {Object[]} subscriberTrend - Subscriber trend data
 * @property {Object[]} sourceData - Source distribution data
 * @property {Object[]} tierData - Tier distribution data
 * @property {Object[]} engagementData - Engagement data
 * @property {Object[]} weeklyActivity - Weekly activity data
 * @property {Object[]} topSegments - Top audience segments
 * @property {number} emailOpenRate - Email open rate percentage
 * @property {number} emailClickRate - Email click rate percentage
 * @property {number} lifetimeValue - Lifetime value in currency
 */

/**
 * @typedef {Object} PublisherEarnings
 * @property {number} totalRevenue - Total revenue
 * @property {number} revenueChange - Revenue change percentage
 * @property {number} subscriptionRevenue - Subscription revenue
 * @property {number} adRevenue - Ad revenue
 * @property {number} tipRevenue - Tip revenue
 * @property {number} totalSubscribers - Total subscribers
 * @property {number} subscriberGrowth - Subscriber growth percentage
 * @property {number} avgRevenuePerUser - Average revenue per user
 * @property {Object[]} revenueData - Revenue data
 * @property {Object[]} revenueByCategory - Revenue by category
 * @property {Object[]} topEarningArticles - Top earning articles
 * @property {Object[]} paymentMethods - Payment methods
 * @property {Object[]} monthlyTrend - Monthly trend data
 * @property {number} projectedRevenue - Projected revenue
 * @property {number} conversionRate - Conversion rate percentage
 * @property {number} churnRate - Churn rate percentage
 * @property {number} lifetimeValue - Lifetime value
 */

/**
 * @typedef {Object} PublisherPayoutSettings
 * @property {string} method - Payout method (bank, paypal, stripe)
 * @property {string} accountNumber - Account number
 * @property {string} routingNumber - Routing number
 * @property {string} email - Payout email
 * @property {number} minimumPayout - Minimum payout amount
 * @property {string} currency - Currency
 * @property {string} schedule - Payout schedule
 */

/**
 * @typedef {Object} PublisherSocialLinks
 * @property {string} website - Website URL
 * @property {string} twitter - Twitter handle
 * @property {string} facebook - Facebook URL
 * @property {string} instagram - Instagram handle
 * @property {string} youtube - YouTube URL
 * @property {string} linkedin - LinkedIn URL
 * @property {string} github - GitHub handle
 * @property {string} discord - Discord invite
 * @property {string} tiktok - TikTok handle
 * @property {string} threads - Threads handle
 */

export default {
  PublisherStatus,
  PublisherTier,
  PublisherSchema,
  PublisherStatsSchema,
  PublisherAnalyticsSchema,
  PublisherSubscriberSchema,
  PublisherSubscriberAnalyticsSchema,
  PublisherEarningsSchema,
  PublisherPayoutSettingsSchema,
  PublisherSocialLinksSchema,
};