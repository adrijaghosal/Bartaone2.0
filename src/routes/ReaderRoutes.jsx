import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Spinner from '../components/common/Spinner';

// Lazy load reader pages
const HomePage = lazy(() => import('../pages/reader/HomePage'));
const FeedPage = lazy(() => import('../pages/reader/FeedPage'));
const ArticlePage = lazy(() => import('../pages/reader/ArticlePage'));
const PublisherPage = lazy(() => import('../pages/reader/PublisherPage'));
const BookmarksPage = lazy(() => import('../pages/reader/BookmarksPage'));
const SearchPage = lazy(() => import('../pages/reader/SearchPage'));
const ProfilePage = lazy(() => import('../pages/reader/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/reader/SettingsPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <Spinner size="lg" color="terracotta" />
      <p className="text-warmBeige-400 mt-4">Loading...</p>
    </div>
  </div>
);

const ReaderRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Reader Routes */}
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
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
        <Route path="/search" element={
          <Layout>
            <SearchPage />
          </Layout>
        } />

        {/* Protected Reader Routes */}
        <Route path="/feed" element={
          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
            <Layout>
              <FeedPage />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/bookmarks" element={
          <ProtectedRoute allowedRoles={['reader', 'publisher']}>
            <Layout>
              <BookmarksPage />
            </Layout>
          </ProtectedRoute>
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

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default ReaderRoutes;