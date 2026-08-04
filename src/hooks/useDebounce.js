import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for debouncing values
 */
export const useDebounce = (value, delay = 500, callback = null) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const callbackRef = useRef(callback);

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      if (callbackRef.current) {
        callbackRef.current(value);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for debouncing functions
 */
export const useDebouncedCallback = (callback, delay = 500) => {
  const [isPending, setIsPending] = useState(false);
  const timerRef = useRef(null);

  const debouncedFn = useCallback((...args) => {
    setIsPending(true);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
      setIsPending(false);
      timerRef.current = null;
    }, delay);
  }, [callback, delay]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    debouncedFn,
    isPending,
    cancel: () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        setIsPending(false);
      }
    },
  };
};

/**
 * Custom hook for debouncing with immediate execution
 */
export const useDebounceImmediate = (callback, delay = 500, immediate = false) => {
  const timerRef = useRef(null);
  const immediateRef = useRef(immediate);

  const debouncedFn = useCallback((...args) => {
    if (immediateRef.current) {
      callback(...args);
      immediateRef.current = false;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
      timerRef.current = null;
    }, delay);
  }, [callback, delay]);

  // Reset immediate flag
  const resetImmediate = useCallback(() => {
    immediateRef.current = immediate;
  }, [immediate]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    debouncedFn,
    resetImmediate,
    cancel: () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    },
  };
};

export default useDebounce;