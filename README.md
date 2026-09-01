# Bartaone 2.0

A modern, AI-powered content platform with role-based user system (Publishers & Readers), personalized recommendations, and real-time notifications. Built with React, Vite, Tailwind CSS, and Redux.

## Project Overview

Bartaone 2.0 is a comprehensive content management and discovery platform featuring:
- **Role-Based Access**: Publisher and Reader roles with dedicated interfaces
- **AI Features**: Personalized feed, content recommendations, and AI summaries
- **Real-Time Notifications**: Event-driven notification system
- **Analytics**: Publisher analytics and engagement tracking
- **Internationalization**: Multi-language support
- **Modern UI**: Responsive design with Tailwind CSS

---

## Project Structure

```
Bartaone2.0/
├── public/                     # Static assets
├── src/
│   ├── api/                   # API endpoints and axios configuration
│   │   ├── articleApi.js      # Article API calls
│   │   ├── authApi.js         # Authentication API
│   │   ├── axiosConfig.js     # Axios instance configuration
│   │   ├── notificationApi.js # Notification API calls
│   │   ├── publisherApi.js    # Publisher-specific API
│   │   └── readerApi.js       # Reader-specific API
│   │
│   ├── assets/                # Images, fonts, and other media files
│   │
│   ├── components/            # Reusable React components
│   │   ├── ai/               # AI-powered components
│   │   │   ├── AISummary.jsx
│   │   │   ├── ContentSuggestion.jsx
│   │   │   ├── PersonalizedFeed.jsx
│   │   │   └── RecommendationEngine.jsx
│   │   │
│   │   ├── auth/             # Authentication-related components
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── RoleSelection.jsx
│   │   │
│   │   ├── common/           # Shared/common UI components
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Tabs.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── notifications/    # Notification components
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── NotificationItem.jsx
│   │   │   ├── NotificationList.jsx
│   │   │   └── NotificationPreferences.jsx
│   │   │
│   │   └── publisher/        # Publisher-specific components
│   │       ├── analytics/    # Analytics dashboard
│   │       ├── articles/     # Article management
│   │       ├── comments/     # Comment management
│   │       ├── dashboard/    # Publisher dashboard
│   │       └── subscribers/  # Subscriber management
│   │
│   ├── config/               # Configuration files
│   │   ├── apiConfig.js      # API configuration
│   │   ├── colors.js         # Color palette
│   │   ├── constants.js      # App-wide constants
│   │   ├── languages.js      # Supported languages
│   │   └── theme.js          # Theme configuration
│   │
│   ├── contexts/             # React Context API
│   │   ├── ArticleContext.jsx
│   │   ├── AuthContext.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAnalytics.js   # Analytics hook
│   │   ├── useArticles.js    # Article management hook
│   │   ├── useAuth.js        # Authentication hook
│   │   ├── useBookmarks.js   # Bookmarking hook
│   │   ├── useDebounce.js    # Debounce utility hook
│   │   ├── useInfiniteScroll.js # Infinite scroll hook
│   │   ├── useLocalStorage.js   # Local storage hook
│   │   ├── useNotifications.js  # Notifications hook
│   │   ├── usePublishers.js  # Publisher data hook
│   │   └── useStreak.js      # User streak hook
│   │
│   ├── locales/              # i18n localization files
│   │   └── en.json           # English translations
│   │
│   ├── pages/                # Page components (route-level)
│   │   ├── auth/             # Auth pages
│   │   ├── publisher/        # Publisher pages
│   │   └── reader/           # Reader pages
│   │
│   ├── routes/               # Route configuration
│   │   ├── AdminRoutes.jsx
│   │   ├── AppRoutes.jsx
│   │   ├── PublisherRoutes.jsx
│   │   └── ReaderRoutes.jsx
│   │
│   ├── services/             # Business logic services
│   │   ├── aiService.js      # AI features service
│   │   ├── analyticsService.js
│   │   ├── articleService.js
│   │   ├── authService.js
│   │   ├── bookmarkService.js
│   │   ├── notificationService.js
│   │   ├── publisherService.js
│   │   └── streakService.js
│   │
│   ├── store/                # Redux state management
│   │   ├── rootReducer.js
│   │   ├── store.js
│   │   └── slices/           # Redux slices (feature slices)
│   │
│   ├── styles/               # Global styles
│   │   └── tailwind.css      # Tailwind CSS imports
│   │
│   ├── types/                # Type definitions / constants
│   │   ├── article.types.js
│   │   ├── notification.types.js
│   │   ├── publisher.types.js
│   │   └── user.types.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── apiUtils.js       # API helper functions
│   │   ├── constants.js      # Local constants
│   │   ├── dateUtils.js      # Date manipulation
│   │   ├── errorHandler.js   # Error handling utilities
│   │   ├── formatters.js     # Data formatting
│   │   ├── helpers.js        # General helpers
│   │   ├── stringUtils.js    # String manipulation
│   │   ├── translationUtils.js
│   │   └── validators.js     # Form/data validators
│   │
│   ├── App.jsx               # Root application component
│   ├── index.css             # Global CSS
│   └── main.jsx              # Application entry point
│
├── eslint.config.js          # ESLint configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite build configuration
├── README.md                 # This file
└── index.html                # HTML entry point

```

---

## Folder Descriptions

| Folder | Purpose |
|--------|---------|
| `api/` | All API endpoint definitions and axios configuration |
| `components/` | Reusable React components organized by feature/purpose |
| `config/` | Centralized configuration settings |
| `contexts/` | React Context providers for state management |
| `hooks/` | Custom React hooks for shared logic |
| `locales/` | Translation files for i18n support |
| `pages/` | Page-level components corresponding to routes |
| `routes/` | Route configuration files for different user roles |
| `services/` | Business logic and API abstraction layer |
| `store/` | Redux store configuration and slices |
| `styles/` | Global stylesheets |
| `types/` | Type definitions and constants |
| `utils/` | Helper functions and utilities |

---

## Key Features

- **Multi-role System**: Admin, Publisher, and Reader roles with role-specific UI
- **AI Integration**: Content recommendations, summaries, and personalized feeds
- **Real-time Notifications**: Event-driven notification system
- **Analytics Dashboard**: Publisher performance metrics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Internationalization**: Multi-language support
- **State Management**: Redux for complex state
- **Protected Routes**: Authentication-based route protection

---

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **HTTP Client**: Axios
- **Localization**: i18n
- **Linting**: ESLint

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```
