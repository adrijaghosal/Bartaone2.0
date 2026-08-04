import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import Card from '../../common/Card';

const StatsCard = ({ 
  title, 
  value, 
  change = 0, 
  icon, 
  color = 'terracotta',
  isCurrency = false,
  subtitle = '',
  className = '',
}) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const changeIcon = isPositive ? FiTrendingUp : FiTrendingDown;

  const colorClasses = {
    terracotta: 'bg-terracotta-500/20 text-terracotta-400',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/20 text-purple-400',
    pink: 'bg-pink-500/20 text-pink-400',
    red: 'bg-red-500/20 text-red-400',
  };

  const getColorClass = () => {
    return colorClasses[color] || colorClasses.terracotta;
  };

  // Format large numbers
  const formatValue = (val) => {
    if (isCurrency && typeof val === 'string') {
      return val;
    }
    if (typeof val === 'string') {
      return val;
    }
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    return val;
  };

  return (
    <Card variant="glass" padding="lg" className={`relative overflow-hidden group ${className}`}>
      {/* Background Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${getColorClass()} opacity-5 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-warmBeige-400">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-warmBeige-100 mt-1">
              {formatValue(value)}
            </p>
            {subtitle && (
              <p className="text-xs text-warmBeige-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`
            p-2.5 rounded-xl flex-shrink-0
            ${getColorClass()}
            transition-transform duration-300 group-hover:scale-110
          `}>
            <div className="w-5 h-5">
              {icon}
            </div>
          </div>
        </div>

        {change !== 0 && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-warmBeige-500/10">
            <span className={`flex items-center gap-1 text-xs font-medium ${changeColor}`}>
              <changeIcon size={14} />
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-warmBeige-500">vs previous period</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;