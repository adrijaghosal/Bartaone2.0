import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { token, user }
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      
      if (token) {
        apiUtils.setAuthToken(token);
        localStorage.setItem('authToken', token);
      }
      
      return { token, user };
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Register user
   * @param {Object} userData - { name, email, password, role }
   * @returns {Promise<Object>} - { token, user }
   */
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;
      
      if (token) {
        apiUtils.setAuthToken(token);
        localStorage.setItem('authToken', token);
      }
      
      return { token, user };
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiUtils.removeAuthToken();
      localStorage.removeItem('authToken');
      localStorage.removeItem('rememberMe');
    }
  },

  /**
   * Get current user
   * @returns {Promise<Object>} - User object
   */
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - { name, bio, location, website, twitter, github }
   * @returns {Promise<Object>} - Updated user
   */
  async updateProfile(profileData) {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, profileData);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Update user role
   * @param {string} role - 'reader' or 'publisher'
   * @returns {Promise<Object>} - Updated user
   */
  async updateRole(role) {
    try {
      const response = await axios.put(`${API_URL}/auth/role`, { role });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Reset password (send reset email)
   * @param {string} email
   * @returns {Promise<void>}
   */
  async resetPassword(email) {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { email });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Confirm reset password
   * @param {string} token - Reset token
   * @param {string} newPassword
   * @returns {Promise<void>}
   */
  async confirmResetPassword(token, newPassword) {
    try {
      await axios.post(`${API_URL}/auth/reset-password/confirm`, { token, newPassword });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Verify email
   * @param {string} token - Verification token
   * @returns {Promise<void>}
   */
  async verifyEmail(token) {
    try {
      await axios.post(`${API_URL}/auth/verify-email`, { token });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Resend verification email
   * @param {string} email
   * @returns {Promise<void>}
   */
  async resendVerification(email) {
    try {
      await axios.post(`${API_URL}/auth/resend-verification`, { email });
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Refresh token
   * @returns {Promise<string>} - New token
   */
  async refreshToken() {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh-token`);
      const { token } = response.data;
      
      if (token) {
        apiUtils.setAuthToken(token);
        localStorage.setItem('authToken', token);
      }
      
      return token;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Change password
   * @param {Object} data - { currentPassword, newPassword }
   * @returns {Promise<void>}
   */
  async changePassword(data) {
    try {
      await axios.post(`${API_URL}/auth/change-password`, data);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Social login
   * @param {string} provider - 'google', 'github', 'twitter'
   * @param {string} token - OAuth token
   * @returns {Promise<Object>} - { token, user }
   */
  async socialLogin(provider, token) {
    try {
      const response = await axios.post(`${API_URL}/auth/social/${provider}`, { token });
      const { token: authToken, user } = response.data;
      
      if (authToken) {
        apiUtils.setAuthToken(authToken);
        localStorage.setItem('authToken', authToken);
      }
      
      return { token: authToken, user };
    } catch (error) {
      throw errorHandler.handle(error);
    }
  },

  /**
   * Check if token is valid
   * @returns {Promise<boolean>}
   */
  async checkToken() {
    try {
      await axios.get(`${API_URL}/auth/check-token`);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;