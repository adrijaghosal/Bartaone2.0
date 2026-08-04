import React, { useState } from 'react';
import { 
  FiMail, 
  FiCalendar, 
  FiClock, 
  FiUserCheck,
  FiUserX,
  FiStar,
  FiTrendingUp,
  FiTrendingDown,
  FiMoreVertical,
  FiSend,
  FiTrash2,
  FiTag,
  FiAward,
  FiMessageCircle
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../../common/Avatar';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Card from '../../common/Card';
import ProgressBar from '../../common/ProgressBar';

const SubscriberCard = ({ 
  subscriber,
  variant = 'default',
  selected = false,
  onSelect,
  onStatusUpdate,
  onDelete,
  isSelectionMode = false,
  className = '',
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    name,
    email,
    avatar,
    status = 'active',
    joinedAt,
    lastActive,
    engagementRate = 0,
    articlesRead = 0,
    totalVisits = 0,
    preferences = [],
    tier = 'free', // 'free', 'premium'
    source = 'organic',
    notes = '',
  } = subscriber;

  const getStatusBadge = () => {
    const statusMap = {
      active: { variant: 'success', label: 'Active' },
      inactive: { variant: 'danger', label: 'Inactive' },
      new: { variant: 'info', label: 'New' },
      premium: { variant: 'glass', label: '⭐ Premium' },
    };
    return statusMap[status] || statusMap.active;
  };

  const getTierBadge = () => {
    if (tier === 'premium') {
      return <Badge variant="glass" size="sm">⭐ Premium</Badge>;
    }
    return <Badge variant="glass" size="sm">Free</Badge>;
  };

  const getEngagementColor = () => {
    if (engagementRate >= 70) return 'text-green-400';
    if (engagementRate >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEngagementIcon = () => {
    if (engagementRate >= 70) return <FiTrendingUp className="text-green-400" />;
    if (engagementRate >= 40) return <FiTrendingUp className="text-yellow-400" />;
    return <FiTrendingDown className="text-red-400" />;
  };

  const statusBadge = getStatusBadge();

  // Default Card
  if (variant === 'default') {
    return (
      <Card 
        variant="glass" 
        padding="md"
        className={`
          hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
          transition-all duration-300 relative
          ${selected ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
          ${isSelectionMode ? 'cursor-pointer' : ''}
          ${className}
        `}
        onClick={() => isSelectionMode && onSelect && onSelect()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowMenu(false);
        }}
      >
        {isSelectionMode && (
          <div className="absolute top-3 left-3 z-10">
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${selected 
                ? 'bg-terracotta-500 border-terracotta-500' 
                : 'border-warmBeige-500/30 bg-navy-800/80'
              }
            `}>
              {selected && (
                <FiUserCheck className="text-white" size={12} />
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <Avatar 
            src={avatar} 
            alt={name} 
            size="lg"
            className="mb-3"
            status={status === 'active' ? 'online' : 'offline'}
          />

          {/* Name */}
          <h4 className="text-lg font-semibold text-warmBeige-100">
            {name}
          </h4>

          {/* Email */}
          <div className="flex items-center gap-1 text-sm text-warmBeige-400 mb-2">
            <FiMail size={14} />
            <span>{email}</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
            <Badge variant={statusBadge.variant} size="sm">
              {statusBadge.label}
            </Badge>
            {getTierBadge()}
            {source === 'organic' && (
              <Badge variant="glass" size="sm">🌱 Organic</Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 w-full mb-3 pt-3 border-t border-warmBeige-500/10">
            <div>
              <p className="text-xs text-warmBeige-400">Articles</p>
              <p className="text-sm font-semibold text-warmBeige-100">{articlesRead}</p>
            </div>
            <div>
              <p className="text-xs text-warmBeige-400">Visits</p>
              <p className="text-sm font-semibold text-warmBeige-100">{totalVisits}</p>
            </div>
            <div>
              <p className="text-xs text-warmBeige-400">Engagement</p>
              <div className="flex items-center justify-center gap-1">
                {getEngagementIcon()}
                <span className={`text-sm font-semibold ${getEngagementColor()}`}>
                  {engagementRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="w-full mb-3">
            <ProgressBar 
              value={engagementRate} 
              max={100} 
              color={engagementRate >= 70 ? 'green' : engagementRate >= 40 ? 'yellow' : 'red'}
              height="4px"
            />
          </div>

          {/* Preferences */}
          {preferences && preferences.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3 justify-center">
              {preferences.slice(0, 3).map((pref, index) => (
                <Badge key={index} variant="glass" size="xs">
                  {pref}
                </Badge>
              ))}
              {preferences.length > 3 && (
                <Badge variant="glass" size="xs">+{preferences.length - 3}</Badge>
              )}
            </div>
          )}

          {/* Joined Info */}
          <div className="flex items-center gap-2 text-xs text-warmBeige-400">
            <FiCalendar size={12} />
            <span>Joined {formatDistanceToNow(new Date(joinedAt), { addSuffix: true })}</span>
          </div>
          {lastActive && (
            <div className="flex items-center gap-2 text-xs text-warmBeige-400 mt-0.5">
              <FiClock size={12} />
              <span>Active {formatDistanceToNow(new Date(lastActive), { addSuffix: true })}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-warmBeige-500/10 w-full">
            <Button
              variant="ghost"
              size="sm"
              icon={<FiSend />}
              onClick={(e) => {
                e.stopPropagation();
                // Open email compose
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={status === 'active' ? <FiUserX /> : <FiUserCheck />}
              onClick={(e) => {
                e.stopPropagation();
                onStatusUpdate && onStatusUpdate(id, status === 'active' ? 'inactive' : 'active');
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<FiTrash2 className="text-red-400" />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
            />
          </div>
        </div>
      </Card>
    );
  }

  // Compact Card (List View)
  if (variant === 'compact') {
    return (
      <Card 
        variant="glass" 
        padding="sm"
        className={`
          hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
          transition-all duration-300 relative
          ${selected ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
          ${isSelectionMode ? 'cursor-pointer' : ''}
          ${className}
        `}
        onClick={() => isSelectionMode && onSelect && onSelect()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowMenu(false);
        }}
      >
        {isSelectionMode && (
          <div className="absolute top-2 left-2 z-10">
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${selected 
                ? 'bg-terracotta-500 border-terracotta-500' 
                : 'border-warmBeige-500/30 bg-navy-800/80'
              }
            `}>
              {selected && (
                <FiUserCheck className="text-white" size={12} />
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Avatar 
            src={avatar} 
            alt={name} 
            size="md"
            status={status === 'active' ? 'online' : 'offline'}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-warmBeige-100">
                {name}
              </h4>
              <Badge variant={statusBadge.variant} size="xs">
                {statusBadge.label}
              </Badge>
              {getTierBadge()}
            </div>
            <div className="flex items-center gap-3 text-sm text-warmBeige-400">
              <span>{email}</span>
              <span>•</span>
              <span>{articlesRead} articles read</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {getEngagementIcon()}
                <span className={getEngagementColor()}>{engagementRate}%</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-warmBeige-400">
              <span>Joined {formatDistanceToNow(new Date(joinedAt), { addSuffix: true })}</span>
              {lastActive && (
                <>
                  <span>•</span>
                  <span>Last active {formatDistanceToNow(new Date(lastActive), { addSuffix: true })}</span>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              icon={<FiSend />}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={status === 'active' ? <FiUserX /> : <FiUserCheck />}
              onClick={(e) => {
                e.stopPropagation();
                onStatusUpdate && onStatusUpdate(id, status === 'active' ? 'inactive' : 'active');
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<FiTrash2 className="text-red-400" />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
            />
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

export default SubscriberCard;