import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const analyticsService = {
  /**
   * Get dashboard stats
   * @param {string} timeRange - '7d', '30d', '90d'
   * @returns {Promise<Object>} - Dashboard stats
   */
  async getDashboardStats(timeRange = '30d') {
    try {
      const response = await axios.get(`${API_URL}/analytics/dashboard`, { 
        params: { timeRange }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get performance metrics
   * @param {Object} params - { timeRange, startDate, endDate }
   * @returns {Promise<Object>} - Performance metrics
   */
  async getPerformanceMetrics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/performance`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get audience data
   * @param {Object} params - { timeRange, startDate, endDate }
   * @returns {Promise<Object>} - Audience data
   */
  async getAudienceData(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/audience`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get revenue data
   * @param {Object} params - { timeRange, startDate, endDate }
   * @returns {Promise<Object>} - Revenue data
   */
  async getRevenueData(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/revenue`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get article analytics
   * @param {string} articleId - Article ID
   * @param {Object} params - { timeRange }
   * @returns {Promise<Object>} - Article analytics
   */
  async getArticleAnalytics(articleId, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/articles/${articleId}`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get publisher analytics
   * @param {Object} params - { timeRange, startDate, endDate }
   * @returns {Promise<Object>} - Publisher analytics
   */
  async getPublisherAnalytics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/publisher`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Export analytics data
   * @param {Object} params - { format, startDate, endDate, type }
   * @returns {Promise<string>} - Exported data
   */
  async exportData(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/export`, { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get real-time stats
   * @returns {Promise<Object>} - Real-time stats
   */
  async getRealTimeStats() {
    try {
      const response = await axios.get(`${API_URL}/analytics/realtime`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get top articles
   * @param {Object} params - { limit, timeRange, sortBy }
   * @returns {Promise<Array>} - Top articles
   */
  async getTopArticles(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/top-articles`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get recent activity
   * @param {number} limit - Number of activities
   * @returns {Promise<Array>} - Recent activities
   */
  async getRecentActivity(limit = 10) {
    try {
      const response = await axios.get(`${API_URL}/analytics/activity`, { 
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get notifications
   * @param {number} limit - Number of notifications
   * @returns {Promise<Array>} - Notifications
   */
  async getNotifications(limit = 10) {
    try {
      const response = await axios.get(`${API_URL}/analytics/notifications`, { 
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Track event
   * @param {Object} event - { type, data, timestamp }
   * @returns {Promise<void>}
   */
  async trackEvent(event) {
    try {
      await axios.post(`${API_URL}/analytics/track`, event);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  },

  /**
   * Get engagement metrics
   * @param {Object} params - { timeRange, articleId }
   * @returns {Promise<Object>} - Engagement metrics
   */
  async getEngagementMetrics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/engagement`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get subscriber analytics
   * @param {Object} params - { timeRange }
   * @returns {Promise<Object>} - Subscriber analytics
   */
  async getSubscriberAnalytics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/analytics/subscribers`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
};

export default analyticsService;