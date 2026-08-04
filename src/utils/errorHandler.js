import { ERROR_MESSAGES, HTTP_STATUS } from './constants';

/**
 * Error handler class
 */
export class ErrorHandler {
  static instance = null;

  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Handle error
   */
  handle(error) {
    // Log error
    console.error('Error:', error);

    // Get error message
    const message = this.getErrorMessage(error);
    
    // Get error code
    const code = this.getErrorCode(error);
    
    // Get error details
    const details = this.getErrorDetails(error);

    // Create error object
    const errorObject = {
      message,
      code,
      details,
      original: error,
      timestamp: new Date().toISOString(),
    };

    // Trigger error callback
    this.onError(errorObject);

    return errorObject;
  }

  /**
   * Get error message
   */
  getErrorMessage(error) {
    if (error.response) {
      // Server error response
      const data = error.response.data;
      if (data.message) return data.message;
      if (data.error) return data.error;
      
      // Handle different status codes
      switch (error.response.status) {
        case HTTP_STATUS.BAD_REQUEST:
          return ERROR_MESSAGES.VALIDATION;
        case HTTP_STATUS.UNAUTHORIZED:
          return ERROR_MESSAGES.UNAUTHORIZED;
        case HTTP_STATUS.FORBIDDEN:
          return ERROR_MESSAGES.FORBIDDEN;
        case HTTP_STATUS.NOT_FOUND:
          return ERROR_MESSAGES.NOT_FOUND;
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          return ERROR_MESSAGES.RATE_LIMIT;
        case HTTP_STATUS.INTERNAL_ERROR:
          return ERROR_MESSAGES.SERVER;
        default:
          return data.message || ERROR_MESSAGES.SERVER;
      }
    }

    if (error.request) {
      // Network error
      return ERROR_MESSAGES.NETWORK;
    }

    // Client error
    return error.message || ERROR_MESSAGES.SERVER;
  }

  /**
   * Get error code
   */
  getErrorCode(error) {
    if (error.response) {
      return error.response.status;
    }
    if (error.code) {
      return error.code;
    }
    if (error.request) {
      return 'NETWORK_ERROR';
    }
    return 'CLIENT_ERROR';
  }

  /**
   * Get error details
   */
  getErrorDetails(error) {
    const details = {};
    
    if (error.response) {
      details.status = error.response.status;
      details.statusText = error.response.statusText;
      details.data = error.response.data;
    }

    if (error.request) {
      details.request = {
        method: error.request.method,
        url: error.request.url,
        headers: error.request.headers,
      };
    }

    if (error.config) {
      details.config = {
        method: error.config.method,
        url: error.config.url,
        data: error.config.data,
        params: error.config.params,
      };
    }

    return details;
  }

  /**
   * On error callback
   */
  onError(error) {
    // Can be overridden or extended
    // Example: send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      // e.g., Sentry, LogRocket, etc.
    }
  }

  /**
   * Create validation error
   */
  createValidationError(errors) {
    return {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create API error
   */
  createApiError(message, code = 'API_ERROR') {
    return {
      message,
      code,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create network error
   */
  createNetworkError() {
    return {
      message: ERROR_MESSAGES.NETWORK,
      code: 'NETWORK_ERROR',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create unauthorized error
   */
  createUnauthorizedError() {
    return {
      message: ERROR_MESSAGES.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create forbidden error
   */
  createForbiddenError() {
    return {
      message: ERROR_MESSAGES.FORBIDDEN,
      code: 'FORBIDDEN',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create not found error
   */
  createNotFoundError() {
    return {
      message: ERROR_MESSAGES.NOT_FOUND,
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create server error
   */
  createServerError() {
    return {
      message: ERROR_MESSAGES.SERVER,
      code: 'SERVER_ERROR',
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

export default errorHandler;