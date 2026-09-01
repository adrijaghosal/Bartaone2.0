// src/components/notifications/NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  FiBell, 
  FiBellOff, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle, 
  FiMessageCircle,
  FiHeart,
  FiUsers,
  FiZap
} from "react-icons/fi";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuth } from "../../hooks/useAuth";
import NotificationList from "./NotificationList";
import Badge from "../common/Badge";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const { user } = useAuth();

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animation for new notifications
  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark notifications as read when opening
      markAllAsRead();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <FiHeart className="text-red-400" />;
      case 'comment':
        return <FiMessageCircle className="text-blue-400" />;
      case 'follow':
        return <FiUsers className="text-green-400" />;
      case 'mention':
        return <FiAtSign className="text-purple-400" />;
      case 'alert':
        return <FiAlertCircle className="text-yellow-400" />;
      default:
        return <FiBell className="text-gray-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'border-red-500/20 bg-red-500/10';
      case 'comment':
        return 'border-blue-500/20 bg-blue-500/10';
      case 'follow':
        return 'border-green-500/20 bg-green-500/10';
      case 'mention':
        return 'border-purple-500/20 bg-purple-500/10';
      case 'alert':
        return 'border-yellow-500/20 bg-yellow-500/10';
      default:
        return 'border-gray-500/20 bg-gray-500/10';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-full transition-all duration-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
        aria-label="Notifications"
      >
        <FiBell 
          className={`w-6 h-6 transition-transform duration-300 ${
            isAnimating ? 'animate-bounce-slow' : ''
          } ${isOpen ? 'text-terracotta-400' : 'text-warmBeige-100'}`}
        />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <Badge 
            variant="solid"
            className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5 animate-pulse-slow"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-[600px] bg-navy-900/95 backdrop-blur-xl border border-warmBeige-500/10 rounded-2xl shadow-2xl shadow-navy-950/50 overflow-hidden animate-slide-down z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-warmBeige-500/10">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-warmBeige-100">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="solid" className="bg-terracotta-500 text-white text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-warmBeige-500 hover:text-terracotta-400 transition-colors duration-200"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/5 transition-colors duration-200"
              >
                <FiXCircle className="w-4 h-4 text-warmBeige-500" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto max-h-[480px] custom-scrollbar">
            {loading ? (
              // Loading skeleton
              <div className="p-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-navy-700"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-navy-700 rounded w-3/4"></div>
                      <div className="h-3 bg-navy-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mb-4">
                  <FiBellOff className="w-8 h-8 text-warmBeige-500/50" />
                </div>
                <h4 className="text-lg font-medium text-warmBeige-100 mb-2">No notifications</h4>
                <p className="text-sm text-warmBeige-500/70">
                  When you get notifications, they'll appear here
                </p>
              </div>
            ) : (
              // Notification items
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-warmBeige-500/5 hover:bg-white/5 transition-colors duration-200 ${
                    !notification.read ? 'bg-terracotta-500/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full border ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-warmBeige-100">
                        <span className="font-medium">{notification.sender?.name || 'Someone'}</span>
                        {' '}
                        <span className="text-warmBeige-400">{notification.message}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-warmBeige-500/70">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                        {!notification.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500"></span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action button */}
                    {notification.actionUrl && (
                      <button
                        onClick={() => window.location.href = notification.actionUrl}
                        className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors duration-200"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-warmBeige-500/10 text-center">
              <button
                onClick={() => {/* Navigate to notifications page */}}
                className="text-sm text-warmBeige-500 hover:text-terracotta-400 transition-colors duration-200"
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;