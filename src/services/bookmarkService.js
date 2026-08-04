import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const bookmarkService = {
  /**
   * Get all bookmarks
   * @param {Object} params - { page, limit, folderId, sort }
   * @returns {Promise<Object>} - { bookmarks, total, folders }
   */
  async getBookmarks(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get bookmarks by folder
   * @param {string} folderId - Folder ID
   * @param {Object} params - { page, limit }
   * @returns {Promise<Object>} - { bookmarks, total }
   */
  async getBookmarksByFolder(folderId, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/folders/${folderId}`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Add bookmark
   * @param {string} articleId - Article ID
   * @param {string} folderId - Folder ID (optional)
   * @returns {Promise<Object>} - Bookmark object
   */
  async addBookmark(articleId, folderId = null) {
    try {
      const response = await axios.post(`${API_URL}/bookmarks`, { articleId, folderId });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Remove bookmark
   * @param {string} bookmarkId - Bookmark ID
   * @returns {Promise<void>}
   */
  async removeBookmark(bookmarkId) {
    try {
      await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Create folder
   * @param {string} name - Folder name
   * @param {string} description - Folder description (optional)
   * @returns {Promise<Object>} - Folder object
   */
  async createFolder(name, description = '') {
    try {
      const response = await axios.post(`${API_URL}/bookmarks/folders`, { name, description });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update folder
   * @param {string} folderId - Folder ID
   * @param {Object} data - { name, description }
   * @returns {Promise<Object>} - Updated folder
   */
  async updateFolder(folderId, data) {
    try {
      const response = await axios.put(`${API_URL}/bookmarks/folders/${folderId}`, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Delete folder
   * @param {string} folderId - Folder ID
   * @returns {Promise<void>}
   */
  async deleteFolder(folderId) {
    try {
      await axios.delete(`${API_URL}/bookmarks/folders/${folderId}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Move bookmark to folder
   * @param {string} bookmarkId - Bookmark ID
   * @param {string} folderId - Folder ID
   * @returns {Promise<Object>} - Updated bookmark
   */
  async moveBookmark(bookmarkId, folderId) {
    try {
      const response = await axios.patch(`${API_URL}/bookmarks/${bookmarkId}/move`, { folderId });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get all folders
   * @returns {Promise<Array>} - List of folders
   */
  async getFolders() {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/folders`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Search bookmarks
   * @param {string} query - Search query
   * @param {Object} params - { folderId, limit }
   * @returns {Promise<Array>} - Search results
   */
  async searchBookmarks(query, params = {}) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/search`, { 
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get bookmark count
   * @param {string} folderId - Folder ID (optional)
   * @returns {Promise<number>} - Bookmark count
   */
  async getBookmarkCount(folderId = null) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/count`, { 
        params: { folderId }
      });
      return response.data.count;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get folder count
   * @returns {Promise<number>} - Folder count
   */
  async getFolderCount() {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/folders/count`);
      return response.data.count;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Bulk delete bookmarks
   * @param {Array} bookmarkIds - Array of bookmark IDs
   * @returns {Promise<void>}
   */
  async bulkDelete(bookmarkIds) {
    try {
      await axios.post(`${API_URL}/bookmarks/bulk-delete`, { bookmarkIds });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Bulk move bookmarks
   * @param {Array} bookmarkIds - Array of bookmark IDs
   * @param {string} folderId - Folder ID
   * @returns {Promise<void>}
   */
  async bulkMove(bookmarkIds, folderId) {
    try {
      await axios.post(`${API_URL}/bookmarks/bulk-move`, { bookmarkIds, folderId });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Export bookmarks
   * @param {Object} params - { format, folderId }
   * @returns {Promise<string>} - Exported data
   */
  async exportBookmarks(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/export`, { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Import bookmarks
   * @param {File} file - Import file
   * @param {string} folderId - Folder ID
   * @returns {Promise<Object>} - Import results
   */
  async importBookmarks(file, folderId = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folderId) formData.append('folderId', folderId);
      
      const response = await axios.post(`${API_URL}/bookmarks/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Check if article is bookmarked
   * @param {string} articleId - Article ID
   * @returns {Promise<boolean>} - Bookmarked status
   */
  async isBookmarked(articleId) {
    try {
      const response = await axios.get(`${API_URL}/bookmarks/check/${articleId}`);
      return response.data.isBookmarked;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
};

export default bookmarkService;