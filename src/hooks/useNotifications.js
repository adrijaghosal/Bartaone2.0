import { useNotification } from '../contexts/NotificationContext';
import { useState, useCallback } from 'react';

/**
 * Custom hook for notifications
 */
export const useNotifications = () => {
  const notificationContext = useNotification();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationContext.getNotifications(params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notificationContext]);

  const markAsRead = useCallback(async (notificationId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationContext.markAsRead(notificationId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notificationContext]);

  const markAllAsRead = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationContext.markAllAsRead();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notificationContext]);

  const deleteNotification = useCallback(async (notificationId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationContext.deleteNotification(notificationId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notificationContext]);

  const updatePreferences = useCallback(async (preferences) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notificationContext.updatePreferences(preferences);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notificationContext]);

  const refreshNotifications = useCallback(async () => {
    try {
      const result = await notificationContext.refreshNotifications();
      return result;
    } catch (err) {
      console.error('Failed to refresh notifications:', err);
      throw err;
    }
  }, [notificationContext]);

  return {
    ...notificationContext,
    loading: notificationContext.loading || loading,
    error: notificationContext.error || error,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
    refreshNotifications,
    toggleSound: notificationContext.toggleSound,
    setError: notificationContext.setError,
  };
};

export default useNotifications;