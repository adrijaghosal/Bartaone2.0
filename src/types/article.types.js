/**
 * Article related TypeScript type definitions
 */

// Article status enum
export const ArticleStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  REJECTED: 'rejected',
  REVIEWED: 'reviewed',
};

// Article type enum
export const ArticleType = {
  NEWS: 'news',
  BLOG: 'blog',
  OPINION: 'opinion',
  REVIEW: 'review',
  TUTORIAL: 'tutorial',
  INTERVIEW: 'interview',
  CASE_STUDY: 'case_study',
  RESEARCH: 'research',
};

// Article schema
export const ArticleSchema = {
  id: 'string',
  title: 'string',
  excerpt: 'string',
  content: 'string',
  coverImage: 'string',
  category: 'string',
  tags: 'array',
  status: 'string',
  type: 'string',
  author: 'object',
  publisher: 'object',
  publishedAt: 'string',
  scheduledAt: 'string',
  updatedAt: 'string',
  createdAt: 'string',
  views: 'number',
  likes: 'number',
  comments: 'number',
  shares: 'number',
  bookmarks: 'number',
  readTime: 'number',
  isLiked: 'boolean',
  isBookmarked: 'boolean',
  isFeatured: 'boolean',
  isTrending: 'boolean',
  isExclusive: 'boolean',
  isPremium: 'boolean',
  aiScore: 'number',
  sentiment: 'string',
  seo: 'object',
  metadata: 'object',
};

// Article author schema
export const ArticleAuthorSchema = {
  id: 'string',
  name: 'string',
  avatar: 'string',
  bio: 'string',
  verified: 'boolean',
  followers: 'number',
  articles: 'number',
  socialLinks: 'object',
};

// Article publisher schema
export const ArticlePublisherSchema = {
  id: 'string',
  name: 'string',
  logo: 'string',
  verified: 'boolean',
  followers: 'number',
};

// Article comment schema
export const ArticleCommentSchema = {
  id: 'string',
  articleId: 'string',
  author: 'object',
  content: 'string',
  parentId: 'string',
  likes: 'number',
  dislikes: 'number',
  replies: 'array',
  status: 'string',
  reported: 'boolean',
  isEdited: 'boolean',
  sentiment: 'string',
  createdAt: 'string',
  updatedAt: 'string',
};

// Article reaction schema
export const ArticleReactionSchema = {
  id: 'string',
  articleId: 'string',
  userId: 'string',
  type: 'string', // 'like', 'love', 'laugh', 'wow', 'sad', 'angry'
  createdAt: 'string',
};

// Article bookmark schema
export const ArticleBookmarkSchema = {
  id: 'string',
  articleId: 'string',
  userId: 'string',
  folderId: 'string',
  note: 'string',
  createdAt: 'string',
};

// Article bookmark folder schema
export const ArticleBookmarkFolderSchema = {
  id: 'string',
  name: 'string',
  description: 'string',
  userId: 'string',
  count: 'number',
  createdAt: 'string',
  updatedAt: 'string',
};

// Article category schema
export const ArticleCategorySchema = {
  id: 'string',
  name: 'string',
  slug: 'string',
  description: 'string',
  icon: 'string',
  count: 'number',
  parentId: 'string',
};

// Article tag schema
export const ArticleTagSchema = {
  id: 'string',
  name: 'string',
  slug: 'string',
  count: 'number',
};

// Article SEO schema
export const ArticleSEOSchema = {
  title: 'string',
  description: 'string',
  keywords: 'array',
  ogImage: 'string',
  ogTitle: 'string',
  ogDescription: 'string',
  twitterCard: 'string',
  twitterTitle: 'string',
  twitterDescription: 'string',
  canonical: 'string',
  robots: 'string',
};

// Article filter schema
export const ArticleFilterSchema = {
  category: 'string',
  tags: 'array',
  status: 'string',
  type: 'string',
  author: 'string',
  publisher: 'string',
  dateFrom: 'string',
  dateTo: 'string',
  sort: 'string',
  order: 'string',
  limit: 'number',
  page: 'number',
  search: 'string',
};

// Article response schema
export const ArticleResponseSchema = {
  articles: 'array',
  total: 'number',
  page: 'number',
  limit: 'number',
  totalPages: 'number',
  hasMore: 'boolean',
  filters: 'object',
};

// Article stats schema
export const ArticleStatsSchema = {
  totalViews: 'number',
  totalLikes: 'number',
  totalComments: 'number',
  totalShares: 'number',
  totalBookmarks: 'number',
  engagementRate: 'number',
  averageReadTime: 'number',
  viewsByDay: 'array',
  likesByDay: 'array',
  commentsByDay: 'array',
};

// Type definitions as JSDoc comments for IDE support

/**
 * @typedef {Object} Article
 * @property {string} id - Article unique identifier
 * @property {string} title - Article title
 * @property {string} excerpt - Article excerpt/summary
 * @property {string} content - Article content
 * @property {string} coverImage - Cover image URL
 * @property {string} category - Article category
 * @property {string[]} tags - Article tags
 * @property {string} status - Article status (draft, published, scheduled, archived, pending, rejected)
 * @property {string} type - Article type (news, blog, opinion, review, tutorial, interview, case_study, research)
 * @property {ArticleAuthor} author - Article author
 * @property {ArticlePublisher} publisher - Article publisher
 * @property {string} publishedAt - Publication date
 * @property {string} scheduledAt - Scheduled publication date
 * @property {string} updatedAt - Last update date
 * @property {string} createdAt - Creation date
 * @property {number} views - View count
 * @property {number} likes - Like count
 * @property {number} comments - Comment count
 * @property {number} shares - Share count
 * @property {number} bookmarks - Bookmark count
 * @property {number} readTime - Estimated reading time in minutes
 * @property {boolean} isLiked - Whether the current user liked the article
 * @property {boolean} isBookmarked - Whether the current user bookmarked the article
 * @property {boolean} isFeatured - Whether the article is featured
 * @property {boolean} isTrending - Whether the article is trending
 * @property {boolean} isExclusive - Whether the article is exclusive
 * @property {boolean} isPremium - Whether the article is premium
 * @property {number} aiScore - AI relevance score
 * @property {string} sentiment - Article sentiment (positive, neutral, negative)
 * @property {ArticleSEO} seo - SEO metadata
 * @property {Object} metadata - Additional metadata
 */

/**
 * @typedef {Object} ArticleAuthor
 * @property {string} id - Author ID
 * @property {string} name - Author name
 * @property {string} avatar - Avatar URL
 * @property {string} bio - Author biography
 * @property {boolean} verified - Whether the author is verified
 * @property {number} followers - Follower count
 * @property {number} articles - Article count
 * @property {Object} socialLinks - Social media links
 */

/**
 * @typedef {Object} ArticlePublisher
 * @property {string} id - Publisher ID
 * @property {string} name - Publisher name
 * @property {string} logo - Logo URL
 * @property {boolean} verified - Whether the publisher is verified
 * @property {number} followers - Follower count
 */

/**
 * @typedef {Object} ArticleComment
 * @property {string} id - Comment ID
 * @property {string} articleId - Article ID
 * @property {ArticleAuthor} author - Comment author
 * @property {string} content - Comment content
 * @property {string} parentId - Parent comment ID
 * @property {number} likes - Like count
 * @property {number} dislikes - Dislike count
 * @property {ArticleComment[]} replies - Reply comments
 * @property {string} status - Comment status
 * @property {boolean} reported - Whether the comment is reported
 * @property {boolean} isEdited - Whether the comment is edited
 * @property {string} sentiment - Comment sentiment
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {Object} ArticleBookmark
 * @property {string} id - Bookmark ID
 * @property {string} articleId - Article ID
 * @property {string} userId - User ID
 * @property {string} folderId - Folder ID
 * @property {string} note - Bookmark note
 * @property {string} createdAt - Creation date
 */

/**
 * @typedef {Object} ArticleBookmarkFolder
 * @property {string} id - Folder ID
 * @property {string} name - Folder name
 * @property {string} description - Folder description
 * @property {string} userId - User ID
 * @property {number} count - Bookmark count
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {Object} ArticleCategory
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {string} slug - Category slug
 * @property {string} description - Category description
 * @property {string} icon - Category icon
 * @property {number} count - Article count
 * @property {string} parentId - Parent category ID
 */

/**
 * @typedef {Object} ArticleTag
 * @property {string} id - Tag ID
 * @property {string} name - Tag name
 * @property {string} slug - Tag slug
 * @property {number} count - Article count
 */

/**
 * @typedef {Object} ArticleSEO
 * @property {string} title - SEO title
 * @property {string} description - SEO description
 * @property {string[]} keywords - SEO keywords
 * @property {string} ogImage - Open Graph image URL
 * @property {string} ogTitle - Open Graph title
 * @property {string} ogDescription - Open Graph description
 * @property {string} twitterCard - Twitter card type
 * @property {string} twitterTitle - Twitter title
 * @property {string} twitterDescription - Twitter description
 * @property {string} canonical - Canonical URL
 * @property {string} robots - Robots meta tag
 */

/**
 * @typedef {Object} ArticleFilter
 * @property {string} category - Filter by category
 * @property {string[]} tags - Filter by tags
 * @property {string} status - Filter by status
 * @property {string} type - Filter by type
 * @property {string} author - Filter by author
 * @property {string} publisher - Filter by publisher
 * @property {string} dateFrom - Filter by date from
 * @property {string} dateTo - Filter by date to
 * @property {string} sort - Sort field
 * @property {string} order - Sort order (asc/desc)
 * @property {number} limit - Results per page
 * @property {number} page - Page number
 * @property {string} search - Search query
 */

/**
 * @typedef {Object} ArticleResponse
 * @property {Article[]} articles - List of articles
 * @property {number} total - Total count
 * @property {number} page - Current page
 * @property {number} limit - Results per page
 * @property {number} totalPages - Total pages
 * @property {boolean} hasMore - Whether there are more results
 * @property {ArticleFilter} filters - Applied filters
 */

/**
 * @typedef {Object} ArticleStats
 * @property {number} totalViews - Total views
 * @property {number} totalLikes - Total likes
 * @property {number} totalComments - Total comments
 * @property {number} totalShares - Total shares
 * @property {number} totalBookmarks - Total bookmarks
 * @property {number} engagementRate - Engagement rate percentage
 * @property {number} averageReadTime - Average read time in minutes
 * @property {Object[]} viewsByDay - Views by day
 * @property {Object[]} likesByDay - Likes by day
 * @property {Object[]} commentsByDay - Comments by day
 */

export default {
  ArticleStatus,
  ArticleType,
  ArticleSchema,
  ArticleAuthorSchema,
  ArticlePublisherSchema,
  ArticleCommentSchema,
  ArticleReactionSchema,
  ArticleBookmarkSchema,
  ArticleBookmarkFolderSchema,
  ArticleCategorySchema,
  ArticleTagSchema,
  ArticleSEOSchema,
  ArticleFilterSchema,
  ArticleResponseSchema,
  ArticleStatsSchema,
};