import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const aiService = {
  /**
   * Get personalized feed
   * @param {Object} params - { limit, topic, refresh }
   * @returns {Promise<Object>} - { articles, personalizationScore, version }
   */
  async getPersonalizedFeed(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/personalized-feed`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get feed preferences
   * @returns {Promise<Object>} - User preferences
   */
  async getFeedPreferences() {
    try {
      const response = await axios.get(`${API_URL}/ai/preferences`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update feed preferences
   * @param {Object} preferences - Updated preferences
   * @returns {Promise<Object>} - Updated preferences
   */
  async updateFeedPreferences(preferences) {
    try {
      const response = await axios.put(`${API_URL}/ai/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get trending topics
   * @param {Object} params - { limit, category }
   * @returns {Promise<Array>} - Trending topics
   */
  async getTrendingTopics(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/trending-topics`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get reading history
   * @param {number} limit - Number of items
   * @returns {Promise<Array>} - Reading history
   */
  async getReadingHistory(limit = 10) {
    try {
      const response = await axios.get(`${API_URL}/ai/reading-history`, { 
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Refresh feed
   * @returns {Promise<Object>} - Updated feed
   */
  async refreshFeed() {
    try {
      const response = await axios.post(`${API_URL}/ai/refresh-feed`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Personalize feed
   * @returns {Promise<Object>} - Personalization results
   */
  async personalizeFeed() {
    try {
      const response = await axios.post(`${API_URL}/ai/personalize`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get content suggestions
   * @param {Object} params - { limit, category }
   * @returns {Promise<Array>} - Content suggestions
   */
  async getContentSuggestions(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/content-suggestions`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get audience insights
   * @param {Object} params - { timeRange }
   * @returns {Promise<Object>} - Audience insights
   */
  async getAudienceInsights(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/audience-insights`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Refresh suggestions
   * @returns {Promise<Array>} - Updated suggestions
   */
  async refreshSuggestions() {
    try {
      const response = await axios.post(`${API_URL}/ai/refresh-suggestions`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Generate article summary
   * @param {string} articleId - Article ID
   * @param {Object} params - { length, format }
   * @returns {Promise<Object>} - Summary
   */
  async generateSummary(articleId, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/summary/${articleId}`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Analyze sentiment
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} - Sentiment analysis
   */
  async analyzeSentiment(text) {
    try {
      const response = await axios.post(`${API_URL}/ai/sentiment`, { text });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get content recommendations for publisher
   * @param {Object} params - { articleId, topic, audience }
   * @returns {Promise<Array>} - Recommendations
   */
  async getPublisherRecommendations(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/publisher-recommendations`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Generate SEO suggestions
   * @param {Object} data - { title, content, keywords }
   * @returns {Promise<Object>} - SEO suggestions
   */
  async generateSEOSuggestions(data) {
    try {
      const response = await axios.post(`${API_URL}/ai/seo-suggestions`, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get content performance insights
   * @param {Object} params - { timeRange, category }
   * @returns {Promise<Object>} - Performance insights
   */
  async getPerformanceInsights(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/performance-insights`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get trending keywords
   * @param {Object} params - { limit, category }
   * @returns {Promise<Array>} - Trending keywords
   */
  async getTrendingKeywords(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/ai/trending-keywords`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
};

export default aiService;