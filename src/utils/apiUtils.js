import axios from 'axios';
import { API_ENDPOINTS, HTTP_STATUS } from './constants';
import errorHandler from './errorHandler';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * API utility class
 */
export class ApiUtils {
  static instance = null;

  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!ApiUtils.instance) {
      ApiUtils.instance = new ApiUtils();
    }
    return ApiUtils.instance;
  }

  constructor() {
    this.axiosInstance = null;
    this.pendingRequests = new Map();
    this.setupAxios();
  }

  /**
   * Setup axios instance
   */
  setupAxios() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for deduplication
        const requestId = this.generateRequestId(config);
        config.requestId = requestId;

        // Cancel duplicate pending requests
        if (this.pendingRequests.has(requestId)) {
          const cancelToken = this.pendingRequests.get(requestId);
          cancelToken.cancel('Duplicate request canceled');
        }

        // Create new cancel token
        const cancelTokenSource = axios.CancelToken.source();
        config.cancelToken = cancelTokenSource.token;
        this.pendingRequests.set(requestId, cancelTokenSource);

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log('API Request:', {
            method: config.method,
            url: config.url,
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Remove completed request from pending
        const requestId = response.config.requestId;
        if (requestId) {
          this.pendingRequests.delete(requestId);
        }

        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log('API Response:', {
            status: response.status,
            data: response.data,
          });
        }

        return response;
      },
      async (error) => {
        // Remove failed request from pending
        const requestId = error.config?.requestId;
        if (requestId) {
          this.pendingRequests.delete(requestId);
        }

        // Handle token refresh
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          const originalRequest = error.config;
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const newToken = await this.refreshToken();
              if (newToken) {
                this.setAuthToken(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.axiosInstance(originalRequest);
              }
            } catch (refreshError) {
              // Redirect to login on refresh failure
              localStorage.removeItem('authToken');
              window.location.href = '/login';
            }
          }
        }

        // Handle rate limiting
        if (error.response?.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
          const retryAfter = error.response.headers['retry-after'] || 5;
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return this.axiosInstance(error.config);
        }

        // Handle network errors
        if (!error.response) {
          errorHandler.handle(error);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Generate request ID for deduplication
   */
  generateRequestId(config) {
    const { method, url, params, data } = config;
    const paramsStr = params ? JSON.stringify(params) : '';
    const dataStr = data ? JSON.stringify(data) : '';
    return `${method}:${url}:${paramsStr}:${dataStr}`;
  }

  /**
   * Set auth token
   */
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
    if (this.axiosInstance) {
      this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  /**
   * Remove auth token
   */
  removeAuthToken() {
    localStorage.removeItem('authToken');
    if (this.axiosInstance) {
      delete this.axiosInstance.defaults.headers.common.Authorization;
    }
  }

  /**
   * Refresh token
   */
  async refreshToken() {
    try {
      const response = await this.axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      return response.data.token;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests() {
    for (const [id, cancelToken] of this.pendingRequests) {
      cancelToken.cancel('All requests canceled');
    }
    this.pendingRequests.clear();
  }

  /**
   * Cancel request by ID
   */
  cancelRequest(requestId) {
    if (this.pendingRequests.has(requestId)) {
      const cancelToken = this.pendingRequests.get(requestId);
      cancelToken.cancel('Request canceled');
      this.pendingRequests.delete(requestId);
    }
  }

  /**
   * Get axios instance
   */
  getAxios() {
    return this.axiosInstance;
  }

  /**
   * GET request
   */
  async get(url, params = {}, config = {}) {
    try {
      const response = await this.axiosInstance.get(url, { ...config, params });
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * POST request
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * PUT request
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * PATCH request
   */
  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * DELETE request
   */
  async delete(url, config = {}) {
    try {
      const response = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }

  /**
   * Upload file
   */
  async uploadFile(url, file, fieldName = 'file', onProgress) {
    const formData = new FormData();
    formData.append(fieldName, file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    };

    return this.post(url, formData, config);
  }

  /**
   * Download file
   */
  async downloadFile(url, filename, params = {}) {
    const config = {
      params,
      responseType: 'blob',
    };

    const response = await this.get(url, params, config);
    
    // Create download link
    const blob = new Blob([response], { type: response.type });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    return response;
  }

  /**
   * Get auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Check if token exists
   */
  hasAuthToken() {
    return !!this.getAuthToken();
  }

  /**
   * Get headers with auth
   */
  getAuthHeaders() {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Build query string
   */
  buildQueryString(params) {
    if (!params) return '';
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }
}

// Export singleton instance
export const apiUtils = ApiUtils.getInstance();

export default apiUtils;