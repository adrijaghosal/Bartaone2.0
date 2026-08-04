import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ArticleProvider } from './contexts/ArticleContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Spinner from './components/common/Spinner';
import { initializeStore } from './store/store';
import { apiUtils } from './utils/apiUtils';
import { translationUtils } from './utils/translationUtils';
import { themeUtils } from './config/theme';
import { colors } from './config/colors';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/reader/HomePage'));
const FeedPage = lazy(() => import('./pages/reader/FeedPage'));
const ArticlePage = lazy(() => import('./pages/reader/ArticlePage'));
const PublisherPage = lazy(() => import('./pages/reader/PublisherPage'));
const BookmarksPage = lazy(() => import('./pages/reader/BookmarksPage'));
const SearchPage = lazy(() => import('./pages/reader/SearchPage'));
const ProfilePage = lazy(() => import('./pages/reader/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/reader/SettingsPage'));

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const ForgotPasswordPage = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('./components/auth/ResetPassword'));
const RoleSelectionPage = lazy(() => import('./components/auth/RoleSelection'));

const PublisherDashboard = lazy(() => import('./pages/publisher/PublisherDashboard'));
const PublisherArticles = lazy(() => import('./pages/publisher/PublisherArticles'));
const PublisherAnalytics = lazy(() => import('./pages/publisher/PublisherAnalytics'));
const PublisherSubscribers = lazy(() => import('./pages/publisher/PublisherSubscribers'));
const PublisherEarnings = lazy(() => import('./pages/publisher/PublisherEarnings'));
const CreateArticle = lazy(() => import('./pages/publisher/CreateArticle'));
const EditArticle = lazy(() => import('./pages/publisher/EditArticle'));
const PublisherSettings = lazy(() => import('./pages/publisher/PublisherSettings'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-navy-950">
    <div className="text-center">
      <Spinner size="lg" color="terracotta" />
      <p className="text-warmBeige-400 mt-4 animate-pulse">Loading...</p>
    </div>
  </div>
);

// Error boundary fallback
const ErrorFallback = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-navy-950 p-4">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">😅</div>
      <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Something went wrong</h2>
      <p className="text-warmBeige-400 mb-6">We're sorry, but something went wrong. Please try again later.</p>
      <p className="text-sm text-warmBeige-500 bg-navy-800/50 p-3 rounded-xl mb-4">
        {error?.message || 'Unknown error'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 rounded-xl bg-terracotta-500 text-white hover:bg-terracotta-600 transition-all"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// Main App component
function App() {
  // Initialize app on mount
  useEffect(() => {
    // Initialize store
    initializeStore();
    
    // Set auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      apiUtils.setAuthToken(token);
    }
    
    // Set language
    const savedLanguage = localStorage.getItem('language') || 'en';
    translationUtils.setLocale(savedLanguage);
    translationUtils.setDocumentDirection(savedLanguage);
    
    // Set theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    // Set font size
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    document.documentElement.style.fontSize = themeUtils.getFontSize(savedFontSize) || '16px';
    
    // Set primary color
    const savedColor = localStorage.getItem('primaryColor') || 'terracotta';
    const colorValue = colors[savedColor]?.[500] || colors.terracotta[500];
    document.documentElement.style.setProperty('--color-primary', colorValue);
    
    // Set reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    // Register service worker (if supported)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.warn('Service worker registration failed:', err));
    }
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<PageLoader />} persistor={persistor}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NotificationProvider>
                <ArticleProvider>
                  <Router>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        {/* Public Auth Routes */}
                        <Route path="/login" element={
                          <Layout showSidebar={false}>
                            <LoginPage />
                          </Layout>
                        } />
                        <Route path="/register" element={
                          <Layout showSidebar={false}>
                            <RegisterPage />
                          </Layout>
                        } />
                        <Route path="/verify-email" element={
                          <Layout showSidebar={false}>
                            <VerifyEmailPage />
                          </Layout>
                        } />
                        <Route path="/forgot-password" element={
                          <Layout showSidebar={false}>
                            <ForgotPasswordPage />
                          </Layout>
                        } />
                        <Route path="/reset-password/:token" element={
                          <Layout showSidebar={false}>
                            <ResetPasswordPage />
                          </Layout>
                        } />
                        <Route path="/role-selection" element={
                          <ProtectedRoute>
                            <Layout showSidebar={false}>
                              <RoleSelectionPage />
                            </Layout>
                          </ProtectedRoute>
                        } />

                        {/* Reader Routes */}
                        <Route path="/" element={
                          <Layout>
                            <HomePage />
                          </Layout>
                        } />
                        <Route path="/feed" element={
                          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
                            <Layout>
                              <FeedPage />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/article/:id" element={
                          <Layout>
                            <ArticlePage />
                          </Layout>
                        } />
                        <Route path="/publisher/:id" element={
                          <Layout>
                            <PublisherPage />
                          </Layout>
                        } />
                        <Route path="/bookmarks" element={
                          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
                            <Layout>
                              <BookmarksPage />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/search" element={
                          <Layout>
                            <SearchPage />
                          </Layout>
                        } />
                        <Route path="/profile" element={
                          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
                            <Layout>
                              <ProfilePage />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
                            <Layout>
                              <SettingsPage />
                            </Layout>
                          </ProtectedRoute>
                        } />

                        {/* Publisher Routes */}
                        <Route path="/publisher/dashboard" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherDashboard />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/articles" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherArticles />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/analytics" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherAnalytics />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/subscribers" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherSubscribers />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/earnings" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherEarnings />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/create-article" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout showSidebar={false}>
                              <CreateArticle />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/edit-article/:id" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout showSidebar={false}>
                              <EditArticle />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        <Route path="/publisher/settings" element={
                          <ProtectedRoute allowedRoles={['publisher']}>
                            <Layout>
                              <PublisherSettings />
                            </Layout>
                          </ProtectedRoute>
                        } />

                        {/* 404 Redirect */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </Router>
                </ArticleProvider>
              </NotificationProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;