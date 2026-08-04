import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../common/Spinner';

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login',
  requireAuth = true 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="text-center">
          <Spinner size="lg" color="terracotta" />
          <p className="text-warmBeige-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user is authenticated but not allowed
  if (isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'publisher') {
      return <Navigate to="/publisher/dashboard" replace />;
    }
    if (user?.role === 'reader') {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // If user is authenticated and allowed, render children
  return children;
};

// Higher-order component for role-based access
export const withRoleProtection = (Component, allowedRoles = []) => {
  return function RoleProtectedComponent(props) {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950">
          <Spinner size="lg" color="terracotta" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      if (user?.role === 'publisher') {
        return <Navigate to="/publisher/dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
};

// Component for rendering different content based on role
export const RoleBasedContent = ({ 
  children, 
  roles = [],
  fallback = null,
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return fallback;
  }

  return children;
};

// Permission-based component
export const PermissionGate = ({ 
  children, 
  permissions = [],
  fallback = null,
}) => {
  const { user, hasPermission } = useAuth();

  if (!user || !hasPermission(permissions)) {
    return fallback;
  }

  return children;
};

export default ProtectedRoute;