import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { analyticsService } from '../services/analyticsService';

/**
 * Custom hook for analytics
 */
export const useAnalytics = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDashboardStats = useCallback(async (timeRange = '30d') => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getDashboardStats(timeRange);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getPerformanceMetrics = useCallback(async (params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getPerformanceMetrics(params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getAudienceData = useCallback(async (params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getAudienceData(params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getRevenueData = useCallback(async (params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getRevenueData(params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getArticleAnalytics = useCallback(async (articleId, params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getArticleAnalytics(articleId, params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getPublisherAnalytics = useCallback(async (params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getPublisherAnalytics(params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const exportData = useCallback(async (params = {}) => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.exportData(params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getRealTimeStats = useCallback(async () => {
    if (!isAuthenticated) return null;
    
    try {
      const data = await analyticsService.getRealTimeStats();
      return data;
    } catch (err) {
      console.error('Failed to get real-time stats:', err);
      throw err;
    }
  }, [isAuthenticated]);

  const getTopArticles = useCallback(async (params = {}) => {
    if (!isAuthenticated) return [];
    
    try {
      const data = await analyticsService.getTopArticles(params);
      return data;
    } catch (err) {
      console.error('Failed to get top articles:', err);
      throw err;
    }
  }, [isAuthenticated]);

  const getRecentActivity = useCallback(async (limit = 10) => {
    if (!isAuthenticated) return [];
    
    try {
      const data = await analyticsService.getRecentActivity(limit);
      return data;
    } catch (err) {
      console.error('Failed to get recent activity:', err);
      throw err;
    }
  }, [isAuthenticated]);

  const getNotifications = useCallback(async (limit = 10) => {
    if (!isAuthenticated) return [];
    
    try {
      const data = await analyticsService.getNotifications(limit);
      return data;
    } catch (err) {
      console.error('Failed to get notifications:', err);
      throw err;
    }
  }, [isAuthenticated]);

  return {
    loading,
    error,
    getDashboardStats,
    getPerformanceMetrics,
    getAudienceData,
    getRevenueData,
    getArticleAnalytics,
    getPublisherAnalytics,
    exportData,
    getRealTimeStats,
    getTopArticles,
    getRecentActivity,
    getNotifications,
  };
};

export default useAnalytics;