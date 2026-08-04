/**
 * Language configuration for BartaOne
 * Includes translations, locale settings, and internationalization utilities
 */

export const languages = {
  // Available languages
  available: [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      direction: 'ltr',
      locale: 'en-US',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: 'hh:mm a',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'USD',
        currencySymbol: '$',
      },
      translation: {
        common: {
          welcome: 'Welcome',
          signIn: 'Sign In',
          signUp: 'Sign Up',
          logout: 'Logout',
          profile: 'Profile',
          settings: 'Settings',
          save: 'Save',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
          view: 'View',
          search: 'Search',
          filter: 'Filter',
          sort: 'Sort',
          loading: 'Loading...',
          error: 'Error',
          success: 'Success',
          warning: 'Warning',
          info: 'Info',
          yes: 'Yes',
          no: 'No',
          ok: 'OK',
          close: 'Close',
          back: 'Back',
          next: 'Next',
          continue: 'Continue',
          done: 'Done',
          today: 'Today',
          yesterday: 'Yesterday',
          tomorrow: 'Tomorrow',
          now: 'Now',
          later: 'Later',
          never: 'Never',
          all: 'All',
          none: 'None',
          more: 'More',
          less: 'Less',
          show: 'Show',
          hide: 'Hide',
          expand: 'Expand',
          collapse: 'Collapse',
          fullscreen: 'Fullscreen',
          exit: 'Exit',
          copy: 'Copy',
          paste: 'Paste',
          cut: 'Cut',
          undo: 'Undo',
          redo: 'Redo',
          refresh: 'Refresh',
          retry: 'Retry',
          submit: 'Submit',
          reset: 'Reset',
          clear: 'Clear',
          confirm: 'Confirm',
          decline: 'Decline',
          accept: 'Accept',
          reject: 'Reject',
          approve: 'Approve',
          deny: 'Deny',
          enable: 'Enable',
          disable: 'Disable',
          add: 'Add',
          remove: 'Remove',
          create: 'Create',
          update: 'Update',
          publish: 'Publish',
          unpublish: 'Unpublish',
          archive: 'Archive',
          restore: 'Restore',
          duplicate: 'Duplicate',
          share: 'Share',
          report: 'Report',
          bookmark: 'Bookmark',
          unbookmark: 'Unbookmark',
          like: 'Like',
          unlike: 'Unlike',
          follow: 'Follow',
          unfollow: 'Unfollow',
          subscribe: 'Subscribe',
          unsubscribe: 'Unsubscribe',
          comment: 'Comment',
          reply: 'Reply',
          mention: 'Mention',
          tag: 'Tag',
        },
        auth: {
          welcomeBack: 'Welcome Back',
          signInToContinue: 'Sign in to continue to BartaOne',
          createAccount: 'Create Account',
          joinBartaOne: 'Join BartaOne and start your journey',
          email: 'Email Address',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          rememberMe: 'Remember me',
          forgotPassword: 'Forgot password?',
          resetPassword: 'Reset Password',
          sendResetLink: 'Send Reset Link',
          checkEmail: 'Check Your Email',
          resetLinkSent: 'We\'ve sent a password reset link to',
          backToLogin: 'Back to Login',
          noAccount: 'Don\'t have an account?',
          haveAccount: 'Already have an account?',
          signUp: 'Sign up',
          signIn: 'Sign in',
          fullName: 'Full Name',
          accountType: 'Account Type',
          reader: 'Reader',
          publisher: 'Publisher',
          discoverContent: 'Discover content',
          publishContent: 'Publish content',
          agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
          verifyEmail: 'Verify Your Email',
          verificationSent: 'We\'ve sent a verification link to',
          resendVerification: 'Resend Verification Email',
          emailVerified: 'Email Verified!',
          verificationFailed: 'Verification Failed',
          accountCreated: 'Account created successfully!',
          welcomeToBartaOne: 'Welcome to BartaOne!',
          chooseRole: 'Choose Your Role',
          selectRoleDescription: 'Select how you want to use BartaOne',
          skipForNow: 'Skip for now',
        },
        navigation: {
          home: 'Home',
          feed: 'Feed',
          bookmarks: 'Bookmarks',
          search: 'Search',
          profile: 'Profile',
          settings: 'Settings',
          dashboard: 'Dashboard',
          articles: 'Articles',
          analytics: 'Analytics',
          subscribers: 'Subscribers',
          earnings: 'Earnings',
          createArticle: 'Create Article',
          editArticle: 'Edit Article',
          publisherSettings: 'Publisher Settings',
          admin: 'Admin',
          users: 'Users',
          publishers: 'Publishers',
          moderation: 'Moderation',
          reports: 'Reports',
        },
        articles: {
          published: 'Published',
          draft: 'Draft',
          scheduled: 'Scheduled',
          archived: 'Archived',
          pendingReview: 'Pending Review',
          rejected: 'Rejected',
          underReview: 'Under Review',
          featured: 'Featured',
          trending: 'Trending',
          exclusive: 'Exclusive',
          premium: 'Premium',
          readTime: 'min read',
          views: 'views',
          likes: 'likes',
          comments: 'comments',
          shares: 'shares',
          bookmarks: 'bookmarks',
          noArticles: 'No articles found',
          writeArticle: 'Write Article',
          manageArticles: 'Manage Articles',
          articleManager: 'Article Manager',
          title: 'Title',
          excerpt: 'Excerpt',
          content: 'Content',
          coverImage: 'Cover Image',
          category: 'Category',
          tags: 'Tags',
          status: 'Status',
          type: 'Type',
          author: 'Author',
          publisher: 'Publisher',
          publishedAt: 'Published At',
          updatedAt: 'Updated At',
          scheduledAt: 'Scheduled At',
          seoTitle: 'SEO Title',
          seoDescription: 'SEO Description',
          seoKeywords: 'SEO Keywords',
          preview: 'Preview',
          saveDraft: 'Save Draft',
          publishNow: 'Publish Now',
          schedule: 'Schedule',
          edit: 'Edit Article',
          delete: 'Delete Article',
          duplicate: 'Duplicate Article',
          viewArticle: 'View Article',
          backToArticles: 'Back to Articles',
          selectCategory: 'Select category...',
          addTag: 'Add tag...',
          noDrafts: 'No drafts saved',
          noPublished: 'No published articles',
          noScheduled: 'No scheduled articles',
          noArchived: 'No archived articles',
        },
        publisher: {
          dashboard: 'Publisher Dashboard',
          welcomeBack: 'Welcome back,',
          totalViews: 'Total Views',
          totalArticles: 'Total Articles',
          followers: 'Followers',
          revenue: 'Revenue',
          overview: 'Overview',
          performance: 'Performance',
          audience: 'Audience',
          subscribers: 'Subscribers',
          earnings: 'Earnings',
          analytics: 'Analytics',
          quickActions: 'Quick Actions',
          writeArticle: 'Write Article',
          viewAnalytics: 'View Analytics',
          manageSubscribers: 'Manage Subscribers',
          settings: 'Settings',
          recentArticles: 'Recent Articles',
          recentActivity: 'Recent Activity',
          noArticlesYet: 'No articles published yet',
          noActivity: 'No recent activity',
          proTip: 'Pro Tip',
          startPublishing: 'Start publishing your first article to grow your audience!',
          shareArticles: 'Try sharing your articles on social media to increase visibility.',
          keepPublishing: 'Great job! Keep publishing consistently to build your audience.',
        },
        bookmarks: {
          myBookmarks: 'My Bookmarks',
          noBookmarks: 'No bookmarks yet',
          startSaving: 'Start saving your favorite articles to read later.',
          browseArticles: 'Browse Articles',
          folders: 'Folders',
          createFolder: 'Create Folder',
          deleteFolder: 'Delete Folder',
          folderName: 'Folder Name',
          folderDescription: 'Folder Description',
          moveToFolder: 'Move to Folder',
          removeBookmark: 'Remove Bookmark',
          searchBookmarks: 'Search bookmarks...',
          sortBy: 'Sort by',
          latest: 'Latest',
          oldest: 'Oldest',
          title: 'Title',
          viewGrid: 'Grid View',
          viewList: 'List View',
          selectAll: 'Select All',
          deselectAll: 'Deselect All',
          selected: 'selected',
          deleteSelected: 'Delete Selected',
          noMatchingBookmarks: 'No matching bookmarks',
        },
        streak: {
          readingStreak: 'Reading Streak',
          dayStreak: 'Day Streak',
          bestStreak: 'Best',
          daysActive: 'Days Active',
          articlesRead: 'Articles Read',
          achievements: 'Achievements',
          readingTime: 'Reading Time',
          checkIn: 'Check In',
          checkedIn: 'Checked In',
          checkInToday: 'Check in today to maintain your streak!',
          comeBackTomorrow: 'Come back tomorrow for more!',
          milestones: 'Milestones',
          unlocked: 'Unlocked',
          needed: 'needed',
          streakTips: 'Streak Tips',
          readDaily: 'Read at least one article daily to maintain your streak',
          checkInDaily: 'Check in every day to earn achievement badges',
          longerStreak: 'The longer your streak, the more rewards you\'ll unlock',
          keepGoing: 'Keep going!',
          amazingProgress: 'Amazing progress!',
        },
        notifications: {
          notifications: 'Notifications',
          noNotifications: 'No notifications',
          allCaughtUp: 'You\'re all caught up!',
          markAllRead: 'Mark all as read',
          preferences: 'Preferences',
          deliveryMethods: 'Delivery Methods',
          pushNotifications: 'Push Notifications',
          emailNotifications: 'Email Notifications',
          inAppNotifications: 'In-App Notifications',
          soundAlerts: 'Sound Alerts',
          frequency: 'Frequency',
          instant: 'Instant',
          hourly: 'Hourly',
          daily: 'Daily',
          weekly: 'Weekly',
          quietHours: 'Quiet Hours',
          startTime: 'Start Time',
          endTime: 'End Time',
          categories: 'Categories',
          priorityLevels: 'Priority Levels',
          highPriority: 'High Priority',
          mediumPriority: 'Medium Priority',
          lowPriority: 'Low Priority',
          savePreferences: 'Save Preferences',
        },
        errors: {
          networkError: 'Network error. Please check your connection.',
          unauthorized: 'Please login to continue.',
          forbidden: 'You do not have permission to perform this action.',
          notFound: 'Resource not found.',
          serverError: 'Something went wrong. Please try again later.',
          validationError: 'Please check your input and try again.',
          rateLimit: 'Too many requests. Please try again later.',
          timeout: 'Request timed out. Please try again.',
          unknownError: 'An unknown error occurred.',
        },
      },
    },
    // Spanish
    es: {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      direction: 'ltr',
      locale: 'es-ES',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: '.',
        currency: 'EUR',
        currencySymbol: '€',
      },
      // Translation would be loaded from JSON file
      translation: {},
    },
    // French
    fr: {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      direction: 'ltr',
      locale: 'fr-FR',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: ' ',
        currency: 'EUR',
        currencySymbol: '€',
      },
      translation: {},
    },
    // German
    de: {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      direction: 'ltr',
      locale: 'de-DE',
      dateFormat: 'dd.MM.yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: '.',
        currency: 'EUR',
        currencySymbol: '€',
      },
      translation: {},
    },
    // Italian
    it: {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      direction: 'ltr',
      locale: 'it-IT',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: '.',
        currency: 'EUR',
        currencySymbol: '€',
      },
      translation: {},
    },
    // Portuguese
    pt: {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      direction: 'ltr',
      locale: 'pt-PT',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: '.',
        currency: 'EUR',
        currencySymbol: '€',
      },
      translation: {},
    },
    // Russian
    ru: {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      direction: 'ltr',
      locale: 'ru-RU',
      dateFormat: 'dd.MM.yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: ',',
        thousand: ' ',
        currency: 'RUB',
        currencySymbol: '₽',
      },
      translation: {},
    },
    // Chinese
    zh: {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      direction: 'ltr',
      locale: 'zh-CN',
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'CNY',
        currencySymbol: '¥',
      },
      translation: {},
    },
    // Japanese
    ja: {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      direction: 'ltr',
      locale: 'ja-JP',
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'JPY',
        currencySymbol: '¥',
      },
      translation: {},
    },
    // Korean
    ko: {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      direction: 'ltr',
      locale: 'ko-KR',
      dateFormat: 'yyyy.MM.dd',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'KRW',
        currencySymbol: '₩',
      },
      translation: {},
    },
    // Arabic
    ar: {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl',
      locale: 'ar-SA',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'SAR',
        currencySymbol: '﷼',
      },
      translation: {},
    },
    // Hindi
    hi: {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      direction: 'ltr',
      locale: 'hi-IN',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      numberFormat: {
        decimal: '.',
        thousand: ',',
        currency: 'INR',
        currencySymbol: '₹',
      },
      translation: {},
    },
  ],
};

// Language utilities
export const languageUtils = {
  /**
   * Get language by code
   */
  getLanguage: (code) => {
    return languages.available.find(l => l.code === code);
  },

  /**
   * Get current language
   */
  getCurrentLanguage: () => {
    const code = localStorage.getItem('language') || 'en';
    return languages.available.find(l => l.code === code) || languages.available[0];
  },

  /**
   * Get translation
   */
  getTranslation: (key, locale = 'en') => {
    const lang = languageUtils.getLanguage(locale);
    if (!lang) return key;
    
    const parts = key.split('.');
    let translation = lang.translation;
    for (const part of parts) {
      if (translation && typeof translation === 'object' && part in translation) {
        translation = translation[part];
      } else {
        return key;
      }
    }
    return translation || key;
  },

  /**
   * Get all available languages
   */
  getAvailableLanguages: () => {
    return languages.available;
  },

  /**
   * Check if language is RTL
   */
  isRTL: (code) => {
    const lang = languageUtils.getLanguage(code);
    return lang ? lang.direction === 'rtl' : false;
  },

  /**
   * Get direction for language
   */
  getDirection: (code) => {
    const lang = languageUtils.getLanguage(code);
    return lang ? lang.direction : 'ltr';
  },

  /**
   * Format number
   */
  formatNumber: (num, locale = 'en-US') => {
    return new Intl.NumberFormat(locale).format(num);
  },

  /**
   * Format currency
   */
  formatCurrency: (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  /**
   * Format date
   */
  formatDate: (date, options = {}, locale = 'en-US') => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(locale, options).format(d);
  },

  /**
   * Format time
   */
  formatTime: (date, locale = 'en-US') => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  },

  /**
   * Format relative time
   */
  formatRelativeTime: (date, locale = 'en-US') => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    
    if (diff < 60) return rtf.format(-diff, 'second');
    if (diff < 3600) return rtf.format(-Math.floor(diff / 60), 'minute');
    if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), 'hour');
    if (diff < 604800) return rtf.format(-Math.floor(diff / 86400), 'day');
    if (diff < 2592000) return rtf.format(-Math.floor(diff / 604800), 'week');
    if (diff < 31536000) return rtf.format(-Math.floor(diff / 2592000), 'month');
    return rtf.format(-Math.floor(diff / 31536000), 'year');
  },

  /**
   * Interpolate translation
   */
  interpolate: (text, params = {}) => {
    if (!text) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  },

  /**
   * Translate with interpolation
   */
  translate: (key, params = {}, locale = 'en') => {
    const text = languageUtils.getTranslation(key, locale);
    return languageUtils.interpolate(text, params);
  },
};

export default {
  languages,
  languageUtils,
};