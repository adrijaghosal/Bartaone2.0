import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const streakService = {
  /**
   * Get current streak
   * @returns {Promise<Object>} - { currentStreak, bestStreak, checkedInToday, totalReads }
   */
  async getStreak() {
    try {
      const response = await axios.get(`${API_URL}/streak`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get streak history
   * @param {number} days - Number of days to fetch
   * @returns {Promise<Array>} - History data
   */
  async getHistory(days = 30) {
    try {
      const response = await axios.get(`${API_URL}/streak/history`, { 
        params: { days }
      });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Check in (extend streak)
   * @returns {Promise<Object>} - Updated streak data
   */
  async checkIn() {
    try {
      const response = await axios.post(`${API_URL}/streak/checkin`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get streak stats
   * @returns {Promise<Object>} - { daysActive, articlesRead, achievements, readingTime }
   */
  async getStats() {
    try {
      const response = await axios.get(`${API_URL}/streak/stats`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get next milestone
   * @returns {Promise<Object>} - { days, label, reward }
   */
  async getNextMilestone() {
    try {
      const response = await axios.get(`${API_URL}/streak/milestones/next`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get all milestones
   * @returns {Promise<Array>} - List of milestones
   */
  async getMilestones() {
    try {
      const response = await axios.get(`${API_URL}/streak/milestones`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Reset streak (admin only)
   * @returns {Promise<Object>} - Reset confirmation
   */
  async resetStreak() {
    try {
      const response = await axios.post(`${API_URL}/streak/reset`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get leaderboard
   * @param {Object} params - { limit, timeRange }
   * @returns {Promise<Array>} - Leaderboard data
   */
  async getLeaderboard(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/streak/leaderboard`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Claim achievement
   * @param {string} milestoneId - Milestone ID
   * @returns {Promise<Object>} - Achievement data
   */
  async claimAchievement(milestoneId) {
    try {
      const response = await axios.post(`${API_URL}/streak/milestones/${milestoneId}/claim`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Get reading log
   * @param {Object} params - { startDate, endDate }
   * @returns {Promise<Array>} - Reading log data
   */
  async getReadingLog(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/streak/reading-log`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Log article read
   * @param {string} articleId - Article ID
   * @returns {Promise<Object>} - Updated streak data
   */
  async logRead(articleId) {
    try {
      const response = await axios.post(`${API_URL}/streak/read`, { articleId });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
};

export default streakService;