import React, { useState } from 'react';
import {
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiBookmark,
  FiUserPlus,
  FiActivity,
  FiBarChart2,
  FiDownload,
  FiFilter
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';

const EngagementMetrics = ({ 
  metrics = {}, 
  timeRange = '30d',
  detailed = false,
  className = '',
}) => {
  const [metricType, setMetricType] = useState('all');
  const [viewMode, setViewMode] = useState('chart');

  const {
    totalLikes = 0,
    totalComments = 0,
    totalShares = 0,
    totalBookmarks = 0,
    totalViews = 0,
    totalFollowers = 0,
    likesChange = 0,
    commentsChange = 0,
    sharesChange = 0,
    engagementRate = 0,
    engagementRateChange = 0,
    avgReadTime = 0,
    avgReadTimeChange = 0,
    dailyData = [],
    topArticles = [],
    engagementByDay = [],
  } = metrics;

  const engagementMetrics = [
    {
      label: 'Likes',
      value: totalLikes,
      change: likesChange,
      icon: <FiHeart />,
      color: 'pink',
      description: 'Total likes received',
    },
    {
      label: 'Comments',
      value: totalComments,
      change: commentsChange,
      icon: <FiMessageSquare />,
      color: 'yellow',
      description: 'Total comments received',
    },
    {
      label: 'Shares',
      value: totalShares,
      change: sharesChange,
      icon: <FiShare2 />,
      color: 'green',
      description: 'Total shares across platforms',
    },
    {
      label: 'Bookmarks',
      value: totalBookmarks,
      change: 0,
      icon: <FiBookmark />,
      color: 'terracotta',
      description: 'Total bookmarks saved',
    },
  ];

  const getColorClass = (color) => {
    const colors = {
      pink: 'bg-pink-500/20 text-pink-400',
      yellow: 'bg-yellow-500/20 text-yellow-400',
      green: 'bg-green-500/20 text-green-400',
      terracotta: 'bg-terracotta-500/20 text-terracotta-400',
      blue: 'bg-blue-500/20 text-blue-400',
      purple: 'bg-purple-500/20 text-purple-400',
    };
    return colors[color] || colors.terracotta;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-warmBeige-400';
  };

  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <Card variant="glass" padding="lg" className={className}>
        <Skeleton variant="title" width="150px" height="24px" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="80px" />
          ))}
        </div>
        <Skeleton variant="card" height="200px" className="mt-4" />
      </Card>
    );
  }

  return (
    <Card variant="glass" padding="lg" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiActivity className="text-terracotta-400" size={20} />
          <h3 className="text-lg font-semibold text-warmBeige-100">Engagement Metrics</h3>
          <Badge variant="glass" size="sm">
            {engagementRate}% rate
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<FiFilter />}
          >
            Filter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<FiDownload />}
          />
        </div>
      </div>

      {/* Engagement Rate Overview */}
      <div className="p-4 rounded-xl bg-navy-800/30 border border-warmBeige-500/10 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-warmBeige-400">Engagement Rate</p>
            <p className="text-3xl font-bold text-warmBeige-100">{engagementRate}%</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${getChangeColor(engagementRateChange)}`}>
              {engagementRateChange > 0 ? '↑' : '↓'} {Math.abs(engagementRateChange)}%
            </span>
            <Badge variant="glass" size="sm">vs previous</Badge>
          </div>
        </div>
        <div className="mt-2 w-full h-2 bg-navy-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-terracotta-400 to-terracotta-500 rounded-full"
            style={{ width: `${Math.min(engagementRate, 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-warmBeige-400">
          <span>Avg. Read Time: {avgReadTime}m</span>
          <span>•</span>
          <span>Change: {avgReadTimeChange > 0 ? '+' : ''}{avgReadTimeChange}%</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {engagementMetrics.map((metric, index) => (
          <div 
            key={index}
            className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10"
          >
            <div className="flex items-center justify-between">
              <span className={`p-1.5 rounded-lg ${getColorClass(metric.color)}`}>
                {metric.icon}
              </span>
              {metric.change !== 0 && (
                <span className={`text-xs font-medium ${getChangeColor(metric.change)}`}>
                  {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                </span>
              )}
            </div>
            <p className="text-xl font-bold text-warmBeige-100 mt-2">
              {metric.value.toLocaleString()}
            </p>
            <p className="text-xs text-warmBeige-400">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Engagement Trend Chart */}
      {dailyData && dailyData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Daily Engagement Trend</h4>
          <div className="h-32 flex items-end gap-1">
            {dailyData.slice(-30).map((day, index) => {
              const height = (day.engagement / (dailyData.reduce((max, d) => Math.max(max, d.engagement), 0) || 1)) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full rounded-t-lg bg-terracotta-500/70 hover:bg-terracotta-500 transition-all"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-warmBeige-500 mt-1">
                    {day.label?.substring(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Performing Articles */}
      {detailed && topArticles && topArticles.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Top Performing Articles</h4>
          <div className="space-y-2">
            {topArticles.slice(0, 5).map((article, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-2 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all"
              >
                <span className="text-sm font-bold text-warmBeige-500 w-6">#{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-warmBeige-100 truncate">{article.title}</p>
                  <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                    <span>{article.views} views</span>
                    <span>•</span>
                    <span>{article.likes} likes</span>
                    <span>•</span>
                    <span>{article.comments} comments</span>
                  </div>
                </div>
                <Badge variant="glass" size="sm">
                  {article.engagementRate}% engagement
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement by Day of Week */}
      {detailed && engagementByDay && engagementByDay.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Engagement by Day</h4>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              const data = engagementByDay.find(d => d.day === index) || { engagement: 0 };
              const max = Math.max(...engagementByDay.map(d => d.engagement), 1);
              const percentage = (data.engagement / max) * 100;
              
              return (
                <div key={index} className="text-center">
                  <div 
                    className="w-full rounded-lg bg-terracotta-500/70 transition-all"
                    style={{ 
                      height: `${Math.max(percentage, 10)}px`,
                      minHeight: '10px'
                    }}
                  />
                  <span className="text-xs text-warmBeige-500">{day}</span>
                  <p className="text-xs font-medium text-warmBeige-100">{data.engagement}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EngagementMetrics;