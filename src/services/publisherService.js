import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const publisherService = {
  /**
   * Get all publishers
   * @param {Object} params - { page, limit, sort, search }
   * @returns {Promise<Object>} - { publishers, total }
   */
  async getPublishers(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get single publisher by ID
   * @param {string} id - Publisher ID
   * @returns {Promise<Object>} - Publisher object
   */
  async getPublisher(id) {
    try {
      const response = await axios.get(`${API_URL}/publishers/${id}`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update publisher profile
   * @param {Object} data - { tagline, categories, socialLinks, paymentEmail, payoutSettings }
   * @returns {Promise<Object>} - Updated publisher
   */
  async updateProfile(data) {
    try {
      const response = await axios.put(`${API_URL}/publishers/profile`, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get publisher stats
   * @param {string} publisherId - Publisher ID
   * @returns {Promise<Object>} - Stats object
   */
  async getStats(publisherId) {
    try {
      const response = await axios.get(`${API_URL}/publishers/${publisherId}/stats`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Follow publisher
   * @param {string} publisherId - Publisher ID
   * @returns {Promise<Object>} - Updated publisher
   */
  async followPublisher(publisherId) {
    try {
      const response = await axios.post(`${API_URL}/publishers/${publisherId}/follow`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Unfollow publisher
   * @param {string} publisherId - Publisher ID
   * @returns {Promise<Object>} - Updated publisher
   */
  async unfollowPublisher(publisherId) {
    try {
      const response = await axios.delete(`${API_URL}/publishers/${publisherId}/follow`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get following list
   * @returns {Promise<Array>} - List of followed publishers
   */
  async getFollowing() {
    try {
      const response = await axios.get(`${API_URL}/publishers/following`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get publisher articles
   * @param {string} publisherId - Publisher ID
   * @param {Object} params - { page, limit, status, sort }
   * @returns {Promise<Object>} - { articles, total }
   */
  async getArticles(publisherId, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/${publisherId}/articles`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get publisher analytics
   * @param {Object} params - { timeRange, startDate, endDate }
   * @returns {Promise<Object>} - Analytics data
   */
  async getAnalytics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/analytics`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get subscribers
   * @param {Object} params - { page, limit, status, sort, search }
   * @returns {Promise<Object>} - { subscribers, total }
   */
  async getSubscribers(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/subscribers`, { params });
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
      const response = await axios.get(`${API_URL}/publishers/subscribers/analytics`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update subscriber status
   * @param {string} subscriberId - Subscriber ID
   * @param {string} status - 'active' or 'inactive'
   * @returns {Promise<Object>} - Updated subscriber
   */
  async updateSubscriberStatus(subscriberId, status) {
    try {
      const response = await axios.patch(`${API_URL}/publishers/subscribers/${subscriberId}`, { status });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Remove subscriber
   * @param {string} subscriberId - Subscriber ID
   * @returns {Promise<void>}
   */
  async removeSubscriber(subscriberId) {
    try {
      await axios.delete(`${API_URL}/publishers/subscribers/${subscriberId}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Export subscribers
   * @param {Object} params - { status, format }
   * @returns {Promise<string>} - CSV data
   */
  async exportSubscribers(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/subscribers/export`, { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Send bulk email to subscribers
   * @param {Object} data - { subject, body, subscriberIds }
   * @returns {Promise<void>}
   */
  async sendBulkEmail(data) {
    try {
      await axios.post(`${API_URL}/publishers/subscribers/email`, data);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get earnings data
   * @param {Object} params - { timeRange }
   * @returns {Promise<Object>} - Earnings data
   */
  async getEarnings(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/earnings`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get payment methods
   * @returns {Promise<Array>} - Payment methods
   */
  async getPaymentMethods() {
    try {
      const response = await axios.get(`${API_URL}/publishers/payment-methods`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update payment method
   * @param {Object} data - { method, accountNumber, routingNumber }
   * @returns {Promise<Object>} - Updated payment method
   */
  async updatePaymentMethod(data) {
    try {
      const response = await axios.put(`${API_URL}/publishers/payment-methods`, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Request payout
   * @param {Object} data - { amount, method }
   * @returns {Promise<Object>} - Payout request
   */
  async requestPayout(data) {
    try {
      const response = await axios.post(`${API_URL}/publishers/payout`, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get payout history
   * @param {Object} params - { page, limit }
   * @returns {Promise<Object>} - Payout history
   */
  async getPayoutHistory(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/publishers/payout/history`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },
};

export default publisherService;