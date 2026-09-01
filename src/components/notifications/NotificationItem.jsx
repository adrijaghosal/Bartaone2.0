import React, { useState } from 'react';
import {
  FiHeart,
  FiMessageSquare,
  FiUserPlus,
  FiStar,
  FiTrendingUp,
  FiClock,
  FiBookmark,
  FiShare2,
  FiAward,
  FiZap,
  FiMail,
  FiAtSign,
  FiCheck,
  FiX,
  FiEye,
  FiBell,
  FiUser,
  FiCalendar
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";

const NotificationItem = ({ 
  notification, 
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    type,
    title,
    message,
    read,
    createdAt,
    link,
    sender,
    image,
    priority = 'normal',
    actions = [],
    metadata = {},
  } = notification;

  // Get icon based on notification type
  const getIcon = () => {
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
      reminder: <FiClock />,
      anniversary: <FiCalendar />,
    };
    return icons[type] || <FiBell />;
  };

  // Get color based on notification type
  const getColor = () => {
    const colors = {
      like: 'text-pink-400 bg-pink-500/20',
      comment: 'text-yellow-400 bg-yellow-500/20',
      follow: 'text-green-400 bg-green-500/20',
      mention: 'text-purple-400 bg-purple-500/20',
      share: 'text-blue-400 bg-blue-500/20',
      bookmark: 'text-terracotta-400 bg-terracotta-500/20',
      award: 'text-yellow-400 bg-yellow-500/20',
      trending: 'text-orange-400 bg-orange-500/20',
      system: 'text-cyan-400 bg-cyan-500/20',
      email: 'text-blue-400 bg-blue-500/20',
      reminder: 'text-indigo-400 bg-indigo-500/20',
    };
    return colors[type] || 'text-warmBeige-400 bg-navy-700/50';
  };

  // Get priority indicator
  const getPriorityIndicator = () => {
    if (priority === 'high') {
      return <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />;
    }
    if (priority === 'medium') {
      return <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />;
    }
    return <div className="w-1.5 h-1.5 rounded-full bg-green-500" />;
  };

  const Icon = getIcon();
  const color = getColor();

  return (
    <div
      className={`
        relative flex items-start gap-3 p-3 
        transition-all duration-300 cursor-pointer
        ${read ? 'bg-transparent' : 'bg-terracotta-500/5'}
        ${isHovered ? 'bg-navy-800/50' : ''}
        hover:bg-navy-800/50
        border-b border-warmBeige-500/5 last:border-b-0
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unread Indicator */}
      {!read && (
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
      )}

      {/* Avatar or Icon */}
      <div className="flex-shrink-0">
        {sender?.avatar ? (
          <Avatar 
            src={sender.avatar} 
            alt={sender.name || 'User'} 
            size="md"
            status={sender.status}
          />
        ) : (
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${color}
          `}>
            <div className="w-5 h-5">
              {Icon}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-warmBeige-100">
                {title}
              </p>
              {!read && (
                <Badge variant="glass" size="xs">New</Badge>
              )}
              {priority === 'high' && (
                <Badge variant="danger" size="xs">Urgent</Badge>
              )}
            </div>

            {/* Message */}
            <p className="text-sm text-warmBeige-400 line-clamp-2">
              {message}
            </p>

            {/* Metadata */}
            {metadata && Object.keys(metadata).length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {metadata.category && (
                  <Badge variant="glass" size="xs">
                    {metadata.category}
                  </Badge>
                )}
                {metadata.tags && metadata.tags.map((tag, index) => (
                  <Badge key={index} variant="glass" size="xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick && action.onClick(notification);
                    }}
                    className={`
                      px-3 py-1 rounded-lg text-xs font-medium transition-all
                      ${action.variant === 'primary' 
                        ? 'bg-terracotta-500 text-white hover:bg-terracotta-600' 
                        : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time & Status */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs text-warmBeige-500 whitespace-nowrap">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
            {read && (
              <FiCheck className="text-warmBeige-500" size={12} />
            )}
            {getPriorityIndicator()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;