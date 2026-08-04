import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ArticleProvider } from '../contexts/ArticleContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Spinner from '../components/common/Spinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/reader/HomePage'));
const FeedPage = lazy(() => import('../pages/reader/FeedPage'));
const ArticlePage = lazy(() => import('../pages/reader/ArticlePage'));
const PublisherPage = lazy(() => import('../pages/reader/PublisherPage'));
const BookmarksPage = lazy(() => import('../pages/reader/BookmarksPage'));
const SearchPage = lazy(() => import('../pages/reader/SearchPage'));
const ProfilePage = lazy(() => import('../pages/reader/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/reader/SettingsPage'));

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage'));
const ForgotPasswordPage = lazy(() => import('../components/auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('../components/auth/ResetPassword'));
const RoleSelectionPage = lazy(() => import('../components/auth/RoleSelection'));

const PublisherDashboard = lazy(() => import('../pages/publisher/PublisherDashboard'));
const PublisherArticles = lazy(() => import('../pages/publisher/PublisherArticles'));
const PublisherAnalytics = lazy(() => import('../pages/publisher/PublisherAnalytics'));
const PublisherSubscribers = lazy(() => import('../pages/publisher/PublisherSubscribers'));
const PublisherEarnings = lazy(() => import('../pages/publisher/PublisherEarnings'));
const CreateArticle = lazy(() => import('../pages/publisher/CreateArticle'));
const EditArticle = lazy(() => import('../pages/publisher/EditArticle'));
const PublisherSettings = lazy(() => import('../pages/publisher/PublisherSettings'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <Spinner size="lg" color="terracotta" />
      <p className="text-warmBeige-400 mt-4">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <ArticleProvider>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
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
              </ArticleProvider>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppRoutes;