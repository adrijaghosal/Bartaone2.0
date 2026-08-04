import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const articleService = {
  /**
   * Get articles with filters
   * @param {Object} params - { page, limit, category, sort, search, status, authorId }
   * @returns {Promise<Object>} - { articles, total, hasMore }
   */
  async getArticles(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get single article by ID
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Article object
   */
  async getArticle(id) {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Create new article
   * @param {Object} articleData - { title, excerpt, content, coverImage, category, tags, status }
   * @returns {Promise<Object>} - Created article
   */
  async createArticle(articleData) {
    try {
      const response = await axios.post(`${API_URL}/articles`, articleData);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update article
   * @param {string} id - Article ID
   * @param {Object} articleData - Updated article data
   * @returns {Promise<Object>} - Updated article
   */
  async updateArticle(id, articleData) {
    try {
      const response = await axios.put(`${API_URL}/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Delete article
   * @param {string} id - Article ID
   * @returns {Promise<void>}
   */
  async deleteArticle(id) {
    try {
      await axios.delete(`${API_URL}/articles/${id}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get drafts
   * @param {Object} params - { page, limit }
   * @returns {Promise<Object>} - { drafts, total }
   */
  async getDrafts(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/drafts`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Publish article
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Published article
   */
  async publishArticle(id) {
    try {
      const response = await axios.post(`${API_URL}/articles/${id}/publish`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Save as draft
   * @param {Object} draftData - Draft data
   * @returns {Promise<Object>} - Saved draft
   */
  async saveDraft(draftData) {
    try {
      const response = await axios.post(`${API_URL}/articles/drafts`, draftData);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Like/unlike article
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Updated article
   */
  async likeArticle(id) {
    try {
      const response = await axios.post(`${API_URL}/articles/${id}/like`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Bookmark/unbookmark article
   * @param {string} id - Article ID
   * @returns {Promise<Object>} - Updated article
   */
  async bookmarkArticle(id) {
    try {
      const response = await axios.post(`${API_URL}/articles/${id}/bookmark`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get bookmarks
   * @param {Object} params - { page, limit, folderId }
   * @returns {Promise<Object>} - { bookmarks, total }
   */
  async getBookmarks(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/bookmarks`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get categories
   * @returns {Promise<Array>} - List of categories
   */
  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/articles/categories`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get tags
   * @returns {Promise<Array>} - List of tags
   */
  async getTags() {
    try {
      const response = await axios.get(`${API_URL}/articles/tags`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get trending articles
   * @param {Object} params - { limit, timeRange }
   * @returns {Promise<Array>} - List of trending articles
   */
  async getTrending(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/trending`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get recommended articles (AI-based)
   * @param {Object} params - { limit, userId }
   * @returns {Promise<Array>} - List of recommended articles
   */
  async getRecommended(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/recommended`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Search articles
   * @param {string} query - Search query
   * @param {Object} params - { page, limit, sort, type }
   * @returns {Promise<Object>} - { articles, total }
   */
  async searchArticles(query, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/search`, { 
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get articles by publisher
   * @param {string} publisherId - Publisher ID
   * @param {Object} params - { page, limit, sort }
   * @returns {Promise<Object>} - { articles, total }
   */
  async getPublisherArticles(publisherId, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/publisher/${publisherId}`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get related articles
   * @param {Object} params - { articleId, category, tags, limit }
   * @returns {Promise<Array>} - List of related articles
   */
  async getRelatedArticles(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/articles/related`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update article status
   * @param {string} id - Article ID
   * @param {string} status - 'published', 'draft', 'scheduled', 'archived'
   * @returns {Promise<Object>} - Updated article
   */
  async updateStatus(id, status) {
    try {
      const response = await axios.patch(`${API_URL}/articles/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Duplicate article
   * @param {string} id - Article ID to duplicate
   * @returns {Promise<Object>} - Duplicated article
   */
  async duplicateArticle(id) {
    try {
      const response = await axios.post(`${API_URL}/articles/${id}/duplicate`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Upload article cover image
   * @param {File} file - Image file
   * @returns {Promise<string>} - Uploaded image URL
   */
  async uploadCoverImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${API_URL}/articles/upload-cover`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.url;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },
};

export default articleService;