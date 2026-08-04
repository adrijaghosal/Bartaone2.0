import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with SSR support
 */
export const useLocalStorage = (key, initialValue) => {
  // Get initial value
  const getStoredValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Update value
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove value
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Check if key exists
  const exists = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(key) !== null;
  }, [key]);

  // Get all keys
  const getKeys = useCallback(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      return Object.keys(window.localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }, []);

  // Clear all
  const clear = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.clear();
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, [initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    exists,
    getKeys,
    clear,
  };
};

export default useLocalStorage;