import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { useState, useCallback } from 'react';

/**
 * Custom hook for authentication
 * Provides access to auth state and methods
 */
export const useAuth = () => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithRedirect = useCallback(async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.login(email, password, rememberMe);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const registerWithRedirect = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.register(userData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const logoutWithRedirect = useCallback(async () => {
    setLoading(true);
    try {
      await auth.logout();
      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.updateProfile(profileData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const updateUserRole = useCallback(async (role) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.updateUserRole(role);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const resetPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.resetPassword(email);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const confirmResetPassword = useCallback(async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const result = await auth.confirmResetPassword(token, newPassword);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return {
    // State from context
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading || loading,
    error: auth.error || error,
    permissions: auth.permissions,
    
    // Auth methods
    login: loginWithRedirect,
    register: registerWithRedirect,
    logout: logoutWithRedirect,
    updateProfile,
    updateUserRole,
    resetPassword,
    confirmResetPassword,
    hasPermission: auth.hasPermission,
    hasRole: auth.hasRole,
    refreshToken: auth.refreshToken,
    setError: auth.setError,
    
    // Utility
    isPublisher: auth.user?.role === 'publisher',
    isReader: auth.user?.role === 'reader',
    isAdmin: auth.user?.role === 'admin',
  };
};

export default useAuth;