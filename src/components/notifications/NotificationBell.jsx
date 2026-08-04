import React, { useState, useEffect, useRef } from 'react';
import { 
  FiBell, 
  FiBellOff, 
  FiCheck, 
  FiX, 
  FiSettings,
  FiMail,
  FiMessageSquare,
  FiHeart,
  FiUserPlus,
  FiStar,
  FiTrendingUp,
  FiClock,
  FiBookmark,
  FiShare2,
  FiAward,
  FiZap
} from 'react-icons/fi';
import { useNotifications } from '../../../hooks/useNotifications';
import { useAuth } from '../../../hooks/useAuth';
import NotificationList from './NotificationList';
import NotificationPreferences from './NotificationPreferences';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = ({ 
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const { user } = useAuth();
  const {
    notifications,
    unreadCount,
    loading,
    markAllAsRead,
    getNotifications,
    refreshNotifications,
    error
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      refreshNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, refreshNotifications]);

  // Show new notification popup
  useEffect(() => {
    if (notifications.length > 0 && !loading) {
      const latest = notifications[0];
      if (latest && !latest.read && !latest.seen) {
        setNewNotification(latest);
        setTimeout(() => setNewNotification(null), 5000);
      }
    }
  }, [notifications, loading]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      getNotifications();
    }
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshNotifications();
    setIsRefreshing(false);
  };

  const handleNotificationClick = (notification) => {
    setIsOpen(false);
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  // Get notification type icon
  const getNotificationTypeIcon = (type) => {
    const icons = {
      like: <FiHeart />,
      comment: <FiMessageSquare />,
      follow: <FiUserPlus />,
      mention: <FiAtSign />,
      share: <FiShare2 />,
      bookmark: <FiBookmark />,
      award: <FiAward />,
      trending: <FiTrendingUp />,
      system: <FiZap />,
      email: <FiMail />,
    };
    return icons[type] || <FiBell />;
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="relative inline-block" ref={bellRef}>
        {/* Bell Button */}
        <button
          onClick={handleToggle}
          className={`
            relative flex items-center justify-center
            rounded-xl
            bg-navy-800/50 border border-warmBeige-500/20
            hover:bg-navy-700/50 hover:border-terracotta-500/30
            transition-all duration-300
            ${sizeClasses[size]}
            ${className}
          `}
          aria-label="Notifications"
        >
          <FiBell size={iconSizes[size]} className="text-warmBeige-400 hover:text-warmBeige-100" />
          
          {/* Unread Badge */}
          {showBadge && unreadCount > 0 && (
            <Badge
              variant="danger"
              size="xs"
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center animate-pulse"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </button>

        {/* New Notification Popup */}
        {newNotification && (
          <div className="absolute top-full right-0 mt-2 w-80 animate-slideDown z-50">
            <div className="p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/30 backdrop-blur-lg">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-terracotta-500/20">
                  {getNotificationTypeIcon(newNotification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-warmBeige-100 truncate">
                    {newNotification.title}
                  </p>
                  <p className="text-xs text-warmBeige-400 truncate">
                    {newNotification.message}
                  </p>
                </div>
                <button
                  onClick={() => setNewNotification(null)}
                  className="p-1 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-[400px] max-h-[600px] overflow-hidden z-50"
          >
            <NotificationList
              notifications={notifications}
              loading={loading}
              unreadCount={unreadCount}
              onMarkAllRead={handleMarkAllRead}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              onNotificationClick={handleNotificationClick}
              onOpenPreferences={() => setShowPreferences(true)}
              error={error}
            />
          </div>
        )}
      </div>

      {/* Preferences Modal */}
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        title="Notification Preferences"
        size="lg"
      >
        <NotificationPreferences onClose={() => setShowPreferences(false)} />
      </Modal>
    </>
  );
};

// FiAtSign component for mentions
const FiAtSign = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

export default NotificationBell;