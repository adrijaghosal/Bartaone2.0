import { REGEX } from './constants';

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) return false;
  return REGEX.EMAIL.test(email.trim());
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) return false;
  return REGEX.PASSWORD.test(password);
};

/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name) return false;
  return name.trim().length >= 2 && name.trim().length <= 50;
};

/**
 * Validate username
 */
export const validateUsername = (username) => {
  if (!username) return false;
  return REGEX.USERNAME.test(username);
};

/**
 * Validate URL
 */
export const validateUrl = (url) => {
  if (!url) return true; // Optional field
  return REGEX.URL.test(url.trim());
};

/**
 * Validate phone
 */
export const validatePhone = (phone) => {
  if (!phone) return true; // Optional field
  return REGEX.PHONE.test(phone.trim());
};

/**
 * Validate slug
 */
export const validateSlug = (slug) => {
  if (!slug) return false;
  return REGEX.SLUG.test(slug);
};

/**
 * Validate alphanumeric
 */
export const validateAlphanumeric = (text) => {
  if (!text) return false;
  return REGEX.ALPHANUMERIC.test(text);
};

/**
 * Validate required
 */
export const validateRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Validate min length
 */
export const validateMinLength = (value, min) => {
  if (!value) return false;
  return String(value).length >= min;
};

/**
 * Validate max length
 */
export const validateMaxLength = (value, max) => {
  if (!value) return true;
  return String(value).length <= max;
};

/**
 * Validate range
 */
export const validateRange = (value, min, max) => {
  if (value === null || value === undefined) return false;
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Validate number
 */
export const validateNumber = (value) => {
  if (value === null || value === undefined) return false;
  return !isNaN(Number(value));
};

/**
 * Validate integer
 */
export const validateInteger = (value) => {
  if (value === null || value === undefined) return false;
  return Number.isInteger(Number(value));
};

/**
 * Validate date
 */
export const validateDate = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * Validate future date
 */
export const validateFutureDate = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime()) && d > new Date();
};

/**
 * Validate past date
 */
export const validatePastDate = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime()) && d < new Date();
};

/**
 * Validate min date
 */
export const validateMinDate = (date, minDate) => {
  if (!date) return false;
  const d = new Date(date);
  const min = new Date(minDate);
  return !isNaN(d.getTime()) && d >= min;
};

/**
 * Validate max date
 */
export const validateMaxDate = (date, maxDate) => {
  if (!date) return false;
  const d = new Date(date);
  const max = new Date(maxDate);
  return !isNaN(d.getTime()) && d <= max;
};

/**
 * Validate file type
 */
export const validateFileType = (file, acceptedTypes) => {
  if (!file) return false;
  return acceptedTypes.includes(file.type);
};

/**
 * Validate file size
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) return false;
  return file.size <= maxSize;
};

/**
 * Validate image dimensions
 */
export const validateImageDimensions = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(false);
      return;
    }
    const img = new Image();
    img.onload = () => {
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validate mime type
 */
export const validateMimeType = (file, allowedMimeTypes) => {
  if (!file) return false;
  return allowedMimeTypes.includes(file.type);
};

/**
 * Validate extension
 */
export const validateExtension = (file, allowedExtensions) => {
  if (!file) return false;
  const extension = file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension);
};

/**
 * Validate object schema
 */
export const validateSchema = (data, schema) => {
  const errors = {};
  Object.keys(schema).forEach(key => {
    const validators = schema[key];
    const value = data[key];
    const errorsForKey = [];
    
    if (Array.isArray(validators)) {
      validators.forEach(validator => {
        if (typeof validator === 'function') {
          const result = validator(value);
          if (result !== true && typeof result === 'string') {
            errorsForKey.push(result);
          } else if (result !== true) {
            errorsForKey.push(`Invalid value for ${key}`);
          }
        }
      });
    } else if (typeof validators === 'function') {
      const result = validators(value);
      if (result !== true && typeof result === 'string') {
        errorsForKey.push(result);
      } else if (result !== true) {
        errorsForKey.push(`Invalid value for ${key}`);
      }
    }
    
    if (errorsForKey.length > 0) {
      errors[key] = errorsForKey;
    }
  });
  return errors;
};

/**
 * Validate email with detailed error
 */
export const validateEmailDetailed = (email) => {
  if (!email) return { valid: false, message: 'Email is required' };
  if (email.trim().length === 0) return { valid: false, message: 'Email is required' };
  if (!REGEX.EMAIL.test(email.trim())) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  return { valid: true, message: 'Email is valid' };
};

/**
 * Validate password with detailed error
 */
export const validatePasswordDetailed = (password) => {
  if (!password) return { valid: false, message: 'Password is required' };
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!password.match(/[a-z]/)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!password.match(/[A-Z]/)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!password.match(/\d/)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  if (!password.match(/[@$!%*?&]/)) {
    return { valid: false, message: 'Password must contain at least one special character (@$!%*?&)' };
  }
  return { valid: true, message: 'Password is valid' };
};

/**
 * Validate name with detailed error
 */
export const validateNameDetailed = (name) => {
  if (!name) return { valid: false, message: 'Name is required' };
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  if (trimmed.length > 50) {
    return { valid: false, message: 'Name must be less than 50 characters' };
  }
  if (trimmed.length === 0) return { valid: false, message: 'Name is required' };
  return { valid: true, message: 'Name is valid' };
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateUsername,
  validateUrl,
  validatePhone,
  validateSlug,
  validateAlphanumeric,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateRange,
  validateNumber,
  validateInteger,
  validateDate,
  validateFutureDate,
  validatePastDate,
  validateMinDate,
  validateMaxDate,
  validateFileType,
  validateFileSize,
  validateImageDimensions,
  validateMimeType,
  validateExtension,
  validateSchema,
  validateEmailDetailed,
  validatePasswordDetailed,
  validateNameDetailed,
};