// src/components/reader/streaks/StreakBadge.jsx
import React from 'react';
import { FiZap } from 'react-icons/fi';
import Badge from '../../common/Badge';

const StreakBadge = ({ 
  streak = 0,
  variant = 'compact',
  size = 'md',
  className = '',
}) => {
  if (streak === 0) {
    return null;
  }

  const getStreakEmoji = () => {
    if (streak >= 100) return '🔥';
    if (streak >= 50) return '⚡';
    if (streak >= 30) return '🌟';
    if (streak >= 14) return '💪';
    if (streak >= 7) return '📚';
    return '📖';
  };

  const getStreakColor = () => {
    if (streak >= 100) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (streak >= 50) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (streak >= 30) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (streak >= 14) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (streak >= 7) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-terracotta-500/20 text-terracotta-400 border-terracotta-500/30';
  };

  if (variant === 'compact') {
    return (
      <Badge 
        variant="glass" 
        size={size}
        className={`${getStreakColor()} ${className}`}
      >
        <FiZap size={size === 'sm' ? 12 : 14} className="mr-1" />
        {streak} day{streak > 1 ? 's' : ''}
      </Badge>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getStreakColor()} ${className}`}>
      <span className="text-xl">{getStreakEmoji()}</span>
      <div>
        <div className="text-sm font-bold">{streak} Day Streak</div>
        <div className="text-xs opacity-80">Keep reading daily!</div>
      </div>
    </div>
  );
};

export default StreakBadge;
