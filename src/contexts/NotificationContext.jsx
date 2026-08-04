import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuth } from './AuthContext';

// Create Context
const NotificationContext = createContext();

// Custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const audioRef = useRef(null);

  // Initialize notification service
  useEffect(() => {
    if (isAuthenticated && user) {
      initializeNotifications();
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, user]);

  const initializeNotifications = async () => {
    try {
      setLoading(true);
      // Fetch initial notifications
      const data = await notificationService.getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      
      // Get preferences
      const prefs = await notificationService.getPreferences();
      setPreferences(prefs);
      
      // Connect to WebSocket
      connectSocket();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const connectSocket = () => {
    try {
      const ws = notificationService.connectWebSocket();
      setSocket(ws);
      setIsConnected(true);

      ws.on('notification', (data) => {
        handleNewNotification(data);
      });

      ws.on('read', (data) => {
        handleNotificationRead(data);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      });

      ws.on('disconnect', () => {
        setIsConnected(false);
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (!isConnected) {
            connectSocket();
          }
        }, 5000);
      });
    } catch (err) {
      console.error('Failed to connect WebSocket:', err);
    }
  };

  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Play sound
    if (soundEnabled && preferences?.sound) {
      playNotificationSound();
    }
    
    // Show browser notification
    if (preferences?.browser && 'Notification' in window) {
      showBrowserNotification(notification);
    }
  };

  const handleNotificationRead = (data) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === data.id ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const playNotificationSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/notification-sound.mp3');
      }
      audioRef.current.play();
    } catch (err) {
      console.error('Failed to play notification sound:', err);
    }
  };

  const showBrowserNotification = (notification) => {
    try {
      const title = notification.title || 'New Notification';
      const options = {
        body: notification.message || '',
        icon: notification.icon || '/icon-192.png',
        tag: notification.id,
        data: notification.link,
      };
      
      const browserNotif = new Notification(title, options);
      browserNotif.onclick = () => {
        window.focus();
        if (notification.link) {
          window.location.href = notification.link;
        }
        browserNotif.close();
      };
    } catch (err) {
      console.error('Failed to show browser notification:', err);
    }
  };

  // Get notifications
  const getNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getNotifications(params);
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      throw err;
    }
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      throw err;
    }
  }, []);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (err) {
      console.error('Failed to delete notification:', err);
      throw err;
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(async (newPreferences) => {
    try {
      const updated = await notificationService.updatePreferences(newPreferences);
      setPreferences(updated);
      return updated;
    } catch (err) {
      console.error('Failed to update preferences:', err);
      throw err;
    }
  }, []);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await getNotifications();
  }, [getNotifications]);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    preferences,
    soundEnabled,
    isConnected,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
    toggleSound,
    refreshNotifications,
    setError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;