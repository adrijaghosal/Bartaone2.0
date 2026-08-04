import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';
import Spinner from '../components/common/Spinner';

// Lazy load admin pages (to be implemented)
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminPublishers = lazy(() => import('../pages/admin/AdminPublishers'));
const AdminArticles = lazy(() => import('../pages/admin/AdminArticles'));
const AdminAnalytics = lazy(() => import('../pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <Spinner size="lg" color="terracotta" />
      <p className="text-warmBeige-400 mt-4">Loading...</p>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminUsers />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/publishers" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminPublishers />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/articles" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminArticles />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminAnalytics />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminSettings />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;