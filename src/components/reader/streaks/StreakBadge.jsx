import React, { useState, useEffect } from 'react';
import { 
  FiFire, 
  FiStar, 
  FiAward, 
  FiTrendingUp,
  FiClock,
  FiBookOpen,
  FiTarget,
  FiInfo
} from 'react-icons/fi';
import { useStreak } from '../../hooks/useStreak';
import Badge from '../common/Badge';
import Tooltip from '../common/Tooltip';

const StreakBadge = ({ 
  variant = 'default', // 'default', 'compact', 'minimal', 'icon'
  size = 'md',
  showLabel = true,
  showTooltip = true,
  className = '',
  onClick,
}) => {
  const { streak, getStreak, loading } = useStreak();
  const [streakData, setStreakData] = useState(null);

  useEffect(() => {
    const fetchStreak = async () => {
      const data = await getStreak();
      setStreakData(data);
    };
    fetchStreak();
  }, [getStreak]);

  const currentStreak = streakData?.currentStreak || 0;
  const bestStreak = streakData?.bestStreak || 0;
  const checkedInToday = streakData?.checkedInToday || false;

  // Get color based on streak length
  const getStreakColor = (days) => {
    if (days >= 100) return 'from-purple-500 to-pink-500';
    if (days >= 50) return 'from-blue-500 to-purple-500';
    if (days >= 30) return 'from-green-500 to-teal-500';
    if (days >= 14) return 'from-yellow-500 to-orange-500';
    if (days >= 7) return 'from-orange-500 to-red-500';
    if (days >= 1) return 'from-terracotta-400 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  // Get emoji based on streak length
  const getStreakEmoji = (days) => {
    if (days >= 100) return '🏆';
    if (days >= 50) return '⭐';
    if (days >= 30) return '🔥';
    if (days >= 14) return '💪';
    if (days >= 7) return '📈';
    if (days >= 1) return '📖';
    return '⚡';
  };

  // Get status message
  const getStatusMessage = () => {
    if (currentStreak === 0) return 'Start your streak today!';
    if (checkedInToday) return `🔥 ${currentStreak} day streak!`;
    return `${currentStreak} day streak - check in today!`;
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  // Default Badge
  if (variant === 'default') {
    return (
      <div 
        className={`
          inline-flex items-center
          rounded-full
          bg-gradient-to-r ${getStreakColor(currentStreak)}
          text-white font-medium
          shadow-lg shadow-terracotta-500/20
          transition-all duration-300 hover:scale-105
          ${sizeClasses[size]}
          ${className}
        `}
        onClick={onClick}
      >
        <span className="mr-1">{getStreakEmoji(currentStreak)}</span>
        {showLabel && (
          <span>
            {currentStreak} Day Streak
          </span>
        )}
        {!showLabel && currentStreak > 0 && (
          <span>{currentStreak}</span>
        )}
      </div>
    );
  }

  // Compact Badge
  if (variant === 'compact') {
    return (
      <div 
        className={`
          flex items-center gap-2
          px-3 py-1.5 rounded-full
          bg-navy-800/50 border border-warmBeige-500/20
          hover:border-terracotta-500/30
          transition-all duration-300 cursor-pointer
          ${className}
        `}
        onClick={onClick}
      >
        <div className={`
          w-6 h-6 rounded-full flex items-center justify-center text-xs
          bg-gradient-to-r ${getStreakColor(currentStreak)}
          ${currentStreak > 0 ? 'animate-pulse-slow' : ''}
        `}>
          {getStreakEmoji(currentStreak)}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-warmBeige-100">
            {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
          </span>
          <span className="text-xs text-warmBeige-400">
            {checkedInToday ? '✅ Checked in' : 'Check in now'}
          </span>
        </div>
      </div>
    );
  }

  // Minimal Badge
  if (variant === 'minimal') {
    return (
      <div 
        className={`
          inline-flex items-center gap-1.5
          text-warmBeige-400 hover:text-warmBeige-100
          transition-colors duration-300
          ${className}
        `}
        onClick={onClick}
      >
        <FiFire 
          className={`
            ${currentStreak > 0 ? 'text-orange-400' : ''}
            transition-colors duration-300
          `}
          size={iconSizes[size]}
        />
        {showLabel && currentStreak > 0 && (
          <span className="text-sm font-medium">
            {currentStreak}
          </span>
        )}
        {showLabel && currentStreak === 0 && (
          <span className="text-sm">Start</span>
        )}
      </div>
    );
  }

  // Icon Only
  if (variant === 'icon') {
    return (
      <div 
        className={`
          relative inline-flex items-center justify-center
          rounded-full
          transition-all duration-300
          ${currentStreak > 0 ? 'cursor-pointer hover:scale-110' : 'opacity-50'}
          ${className}
        `}
        onClick={onClick}
      >
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center text-xl
          bg-gradient-to-r ${getStreakColor(currentStreak)}
          shadow-lg shadow-terracotta-500/20
          animate-pulse-slow
        `}>
          {getStreakEmoji(currentStreak)}
        </div>
        
        {/* Streak Count Badge */}
        {currentStreak > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-navy-900 border border-terracotta-500 flex items-center justify-center">
            <span className="text-xs font-bold text-terracotta-400">
              {currentStreak}
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

// Tooltip component for streak information
const StreakTooltip = ({ children }) => {
  const { streak, getStreak } = useStreak();
  const [streakData, setStreakData] = useState(null);

  useEffect(() => {
    const fetchStreak = async () => {
      const data = await getStreak();
      setStreakData(data);
    };
    fetchStreak();
  }, [getStreak]);

  const currentStreak = streakData?.currentStreak || 0;
  const bestStreak = streakData?.bestStreak || 0;
  const checkedInToday = streakData?.checkedInToday || false;

  const tooltipContent = (
    <div className="p-3 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <FiFire className="text-orange-400" size={18} />
        <span className="font-semibold text-warmBeige-100">
          Reading Streak
        </span>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-warmBeige-300">
          <span>Current Streak</span>
          <span className="font-medium text-warmBeige-100">{currentStreak} days</span>
        </div>
        <div className="flex justify-between text-warmBeige-300">
          <span>Best Streak</span>
          <span className="font-medium text-warmBeige-100">{bestStreak} days</span>
        </div>
        <div className="flex justify-between text-warmBeige-300">
          <span>Today</span>
          <span className={checkedInToday ? 'text-green-400' : 'text-yellow-400'}>
            {checkedInToday ? '✅ Checked in' : '⚡ Check in now'}
          </span>
        </div>
        {currentStreak > 0 && (
          <div className="mt-2 pt-2 border-t border-warmBeige-500/10 text-xs text-warmBeige-400">
            {getStreakEmoji(currentStreak)} {currentStreak >= 30 ? 'Amazing progress!' : 'Keep going!'}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl shadow-2xl">
          {tooltipContent}
        </div>
      </div>
    </div>
  );
};

export default StreakBadge;