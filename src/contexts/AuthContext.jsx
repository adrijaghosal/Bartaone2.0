import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { apiUtils } from '../utils/apiUtils';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            setPermissions(userData.permissions || []);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        setPermissions(userData.permissions || []);
        return { success: true, user: userData };
      }
      
      throw new Error('Invalid login response');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        
        const user = response.user || userData;
        setUser(user);
        setIsAuthenticated(true);
        setPermissions(user.permissions || []);
        return { success: true, user };
      }
      
      throw new Error('Invalid registration response');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('rememberMe');
      setUser(null);
      setIsAuthenticated(false);
      setPermissions([]);
      setLoading(false);
    }
  }, []);

  // Update user role
  const updateUserRole = useCallback(async (role) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateRole(role);
      setUser(updatedUser);
      setPermissions(updatedUser.permissions || []);
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update role';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      await authService.resetPassword(email);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to send reset email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirm reset password
  const confirmResetPassword = useCallback(async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await authService.confirmResetPassword(token, newPassword);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to reset password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check permission
  const hasPermission = useCallback((requiredPermissions) => {
    if (!Array.isArray(requiredPermissions)) {
      requiredPermissions = [requiredPermissions];
    }
    return requiredPermissions.some(p => permissions.includes(p));
  }, [permissions]);

  // Check role
  const hasRole = useCallback((roles) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    return roles.includes(user?.role);
  }, [user]);

  // Refresh token
  const refreshToken = useCallback(async () => {
    try {
      const newToken = await authService.refreshToken();
      if (newToken) {
        localStorage.setItem('authToken', newToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Token refresh failed:', err);
      return false;
    }
  }, []);

  // Value object to provide
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    permissions,
    login,
    register,
    logout,
    updateUserRole,
    updateProfile,
    resetPassword,
    confirmResetPassword,
    hasPermission,
    hasRole,
    refreshToken,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;