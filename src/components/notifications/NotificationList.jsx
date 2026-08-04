import React, { useState } from 'react';
import {
  FiCheckAll,
  FiRefreshCw,
  FiSettings,
  FiBellOff,
  FiClock,
  FiFilter,
  FiX,
  FiChevronRight,
  FiMail,
  FiMessageSquare,
  FiHeart,
  FiUserPlus,
  FiStar,
  FiTrendingUp,
  FiBookmark,
  FiShare2,
  FiAward,
  FiZap,
  FiAtSign
} from 'react-icons/fi';
import NotificationItem from './NotificationItem';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';

const NotificationList = ({
  notifications = [],
  loading = false,
  unreadCount = 0,
  onMarkAllRead,
  onRefresh,
  isRefreshing = false,
  onNotificationClick,
  onOpenPreferences,
  error = null,
  className = '',
}) => {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'like', label: 'Likes' },
    { value: 'comment', label: 'Comments' },
    { value: 'follow', label: 'Follows' },
    { value: 'system', label: 'System' },
  ];

  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };

  const filteredNotifications = getFilteredNotifications();

  // Group notifications by date
  const groupNotificationsByDate = (notifs) => {
    const groups = {};
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifs.forEach(notification => {
      const date = new Date(notification.createdAt);
      let groupKey = 'Older';
      
      if (date >= today) {
        groupKey = 'Today';
      } else if (date >= yesterday) {
        groupKey = 'Yesterday';
      } else if (date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) {
        groupKey = 'This Week';
      } else {
        groupKey = 'Older';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notification);
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  if (loading) {
    return (
      <div className={`
        bg-navy-900/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-2xl shadow-2xl overflow-hidden
        ${className}
      `}>
        <div className="p-4 border-b border-warmBeige-500/10">
          <Skeleton variant="title" width="200px" height="24px" />
        </div>
        <div className="p-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="card" height="70px" className="m-2" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`
        bg-navy-900/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-2xl shadow-2xl overflow-hidden
        ${className}
      `}>
        <div className="p-6 text-center">
          <div className="text-4xl mb-3">🔔</div>
          <p className="text-warmBeige-400 mb-3">Failed to load notifications</p>
          <Button onClick={onRefresh} icon={<FiRefreshCw />} size="sm">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-navy-900/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-2xl shadow-2xl overflow-hidden
      ${className}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-warmBeige-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-warmBeige-100">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="danger" size="sm">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                title="Mark all as read"
              >
                <FiCheckAll size={18} />
              </button>
            )}
            <button
              onClick={onRefresh}
              className={`p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh"
            >
              <FiRefreshCw size={18} />
            </button>
            <button
              onClick={onOpenPreferences}
              className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
              title="Settings"
            >
              <FiSettings size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-3 py-1 rounded-lg text-xs font-medium transition-all
                ${filter === option.value 
                  ? 'bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30' 
                  : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
          icon="🔔"
          className="py-8"
        />
      ) : filteredNotifications.length === 0 ? (
        <div className="p-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-warmBeige-400">No {filter} notifications</p>
          <button
            onClick={() => setFilter('all')}
            className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors mt-2"
          >
            View all notifications
          </button>
        </div>
      ) : (
        <div className="max-h-[480px] overflow-y-auto">
          {Object.entries(groupedNotifications).map(([group, items]) => (
            <div key={group}>
              <div className="px-4 py-2 bg-navy-800/30">
                <span className="text-xs font-medium text-warmBeige-500">{group}</span>
              </div>
              {items.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => onNotificationClick(notification)}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-warmBeige-500/10 flex items-center justify-between">
        <span className="text-xs text-warmBeige-500">
          {notifications.length} notifications
        </span>
        <button
          onClick={onOpenPreferences}
          className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1"
        >
          Manage preferences
          <FiChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default NotificationList;