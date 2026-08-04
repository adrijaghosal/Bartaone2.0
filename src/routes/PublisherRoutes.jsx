import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Spinner from '../components/common/Spinner';

// Lazy load publisher pages
const PublisherDashboard = lazy(() => import('../pages/publisher/PublisherDashboard'));
const PublisherArticles = lazy(() => import('../pages/publisher/PublisherArticles'));
const PublisherAnalytics = lazy(() => import('../pages/publisher/PublisherAnalytics'));
const PublisherSubscribers = lazy(() => import('../pages/publisher/PublisherSubscribers'));
const PublisherEarnings = lazy(() => import('../pages/publisher/PublisherEarnings'));
const CreateArticle = lazy(() => import('../pages/publisher/CreateArticle'));
const EditArticle = lazy(() => import('../pages/publisher/EditArticle'));
const PublisherSettings = lazy(() => import('../pages/publisher/PublisherSettings'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <Spinner size="lg" color="terracotta" />
      <p className="text-warmBeige-400 mt-4">Loading...</p>
    </div>
  </div>
);

const PublisherRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherDashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/articles" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherArticles />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherAnalytics />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/subscribers" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherSubscribers />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/earnings" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherEarnings />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/create-article" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout showSidebar={false}>
              <CreateArticle />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/edit-article/:id" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout showSidebar={false}>
              <EditArticle />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute allowedRoles={['publisher']}>
            <Layout>
              <PublisherSettings />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/publisher/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublisherRoutes;