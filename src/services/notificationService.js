import axios from 'axios';
import { apiUtils } from '../utils/apiUtils';
import { errorHandler } from '../utils/errorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class NotificationService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  /**
   * Get notifications
   * @param {Object} params - { page, limit, unreadOnly, type }
   * @returns {Promise<Object>} - { notifications, unreadCount, total }
   */
  async getNotifications(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/notifications`, { params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Mark notification as read
   * @param {string} notificationId
   * @returns {Promise<void>}
   */
  async markAsRead(notificationId) {
    try {
      await axios.patch(`${API_URL}/notifications/${notificationId}/read`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Mark all notifications as read
   * @returns {Promise<void>}
   */
  async markAllAsRead() {
    try {
      await axios.patch(`${API_URL}/notifications/read-all`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Delete notification
   * @param {string} notificationId
   * @returns {Promise<void>}
   */
  async deleteNotification(notificationId) {
    try {
      await axios.delete(`${API_URL}/notifications/${notificationId}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Get notification preferences
   * @returns {Promise<Object>} - Preferences object
   */
  async getPreferences() {
    try {
      const response = await axios.get(`${API_URL}/notifications/preferences`);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Update notification preferences
   * @param {Object} preferences - Updated preferences
   * @returns {Promise<Object>} - Updated preferences
   */
  async updatePreferences(preferences) {
    try {
      const response = await axios.put(`${API_URL}/notifications/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Connect to WebSocket for real-time notifications
   * @returns {WebSocket} - WebSocket connection
   */
  connectWebSocket() {
    const token = localStorage.getItem('authToken');
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
    
    if (!token) {
      console.error('No auth token found for WebSocket connection');
      return null;
    }

    try {
      this.socket = new WebSocket(`${wsUrl}/notifications?token=${token}`);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return this.socket;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      return null;
    }
  }

  /**
   * Handle WebSocket reconnection
   */
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      setTimeout(() => {
        console.log(`Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        this.connectWebSocket();
      }, delay);
    } else {
      console.error('Max WebSocket reconnection attempts reached');
    }
  }

  /**
   * Disconnect WebSocket
   */
  disconnectWebSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Send notification event
   * @param {Object} data - { type, message, data }
   */
  sendNotification(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected, cannot send notification');
    }
  }

  /**
   * Get unread count
   * @returns {Promise<number>} - Unread count
   */
  async getUnreadCount() {
    try {
      const response = await axios.get(`${API_URL}/notifications/unread-count`);
      return response.data.count;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Register device for push notifications
   * @param {Object} device - { token, platform }
   * @returns {Promise<void>}
   */
  async registerDevice(device) {
    try {
      await axios.post(`${API_URL}/notifications/devices`, device);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Unregister device for push notifications
   * @param {string} token - Device token
   * @returns {Promise<void>}
   */
  async unregisterDevice(token) {
    try {
      await axios.delete(`${API_URL}/notifications/devices/${token}`);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
}

export default new NotificationService();