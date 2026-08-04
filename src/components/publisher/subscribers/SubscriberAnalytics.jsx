import React, { useState } from 'react';
import {
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiClock,
  FiDownload,
  FiFilter,
  FiPieChart,
  FiBarChart2,
  FiAward,
  FiTarget,
  FiStar,
  FiUserPlus,
  FiUserMinus,
  FiMail,
  FiMessageCircle,
  FiHeart
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';
import { format, formatDistanceToNow } from 'date-fns';

const SubscriberAnalytics = ({ 
  analytics = {}, 
  timeRange = '30d',
  detailed = false,
  className = '',
}) => {
  const [viewType, setViewType] = useState('overview');

  const {
    totalSubscribers = 0,
    subscriberGrowth = 0,
    newSubscribers = 0,
    churnedSubscribers = 0,
    activeSubscribers = 0,
    engagementRate = 0,
    avgReadTime = 0,
    retentionRate = 0,
    conversionRate = 0,
    subscriberTrend = [],
    sourceData = [],
    tierData = [],
    engagementData = [],
    weeklyActivity = [],
    topSegments = [],
    emailOpenRate = 0,
    emailClickRate = 0,
    lifetimeValue = 0,
  } = analytics;

  const getChangeColor = (value) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-warmBeige-400';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  if (!analytics || Object.keys(analytics).length === 0) {
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
          <FiUsers className="text-terracotta-400" size={20} />
          <h3 className="text-lg font-semibold text-warmBeige-100">Subscriber Analytics</h3>
          <Badge variant="glass" size="sm">
            {formatNumber(totalSubscribers)} total
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<FiFilter />}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<FiDownload />}
          />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Total Subscribers</p>
          <p className="text-xl font-bold text-warmBeige-100">{formatNumber(totalSubscribers)}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className={`text-xs font-medium ${getChangeColor(subscriberGrowth)}`}>
              {subscriberGrowth > 0 ? '↑' : '↓'} {Math.abs(subscriberGrowth)}%
            </span>
            <span className="text-xs text-warmBeige-500">vs previous</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-xs text-warmBeige-400">Active</p>
          <p className="text-xl font-bold text-green-400">{formatNumber(activeSubscribers)}</p>
          <p className="text-xs text-warmBeige-400">{((activeSubscribers / totalSubscribers) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-warmBeige-400">New</p>
          <p className="text-xl font-bold text-blue-400">+{formatNumber(newSubscribers)}</p>
          <p className="text-xs text-warmBeige-400">This {timeRange}</p>
        </div>
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-warmBeige-400">Churned</p>
          <p className="text-xl font-bold text-red-400">-{formatNumber(churnedSubscribers)}</p>
          <p className="text-xs text-warmBeige-400">This {timeRange}</p>
        </div>
      </div>

      {/* Retention Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiTarget className="text-terracotta-400" size={14} />
            <span className="text-xs text-warmBeige-400">Retention Rate</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{retentionRate}%</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiAward className="text-yellow-400" size={14} />
            <span className="text-xs text-warmBeige-400">Conversion Rate</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{conversionRate}%</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiStar className="text-green-400" size={14} />
            <span className="text-xs text-warmBeige-400">Lifetime Value</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">${lifetimeValue}</p>
        </div>
      </div>

      {/* Subscriber Trend Chart */}
      {subscriberTrend && subscriberTrend.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Subscriber Growth Trend</h4>
          <div className="h-32 flex items-end gap-1">
            {subscriberTrend.slice(-30).map((day, index) => {
              const max = Math.max(...subscriberTrend.map(d => d.value), 1);
              const height = (day.value / max) * 100;
              const isPositive = day.value >= 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${isPositive ? 'bg-green-500/70 hover:bg-green-500' : 'bg-red-500/70 hover:bg-red-500'}`}
                    style={{ height: `${Math.abs(height)}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-warmBeige-500 mt-1">
                    {day.label?.substring(0, 3)}
                  </span>
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-800/95 px-2 py-1 rounded text-xs text-warmBeige-100 whitespace-nowrap">
                    {isPositive ? '+' : ''}{day.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Insights */}
      {detailed && (
        <div className="mt-4 space-y-4">
          {/* Email Performance */}
          <div className="pt-4 border-t border-warmBeige-500/10">
            <h4 className="text-sm font-medium text-warmBeige-400 mb-3 flex items-center gap-2">
              <FiMail className="text-terracotta-400" size={14} />
              Email Performance
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-navy-800/30">
                <p className="text-xs text-warmBeige-400">Open Rate</p>
                <p className="text-xl font-bold text-warmBeige-100">{emailOpenRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-800/30">
                <p className="text-xs text-warmBeige-400">Click Rate</p>
                <p className="text-xl font-bold text-warmBeige-100">{emailClickRate}%</p>
              </div>
            </div>
          </div>

          {/* Source Distribution */}
          {sourceData && sourceData.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3 flex items-center gap-2">
                <FiPieChart className="text-terracotta-400" size={14} />
                Acquisition Sources
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-navy-800/30">
                    <span className="text-sm text-warmBeige-100">{source.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-terracotta-500 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-warmBeige-400">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tier Distribution */}
          {tierData && tierData.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Subscriber Tiers</h4>
              <div className="flex gap-3 flex-wrap">
                {tierData.map((tier, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                    <span className="text-sm text-warmBeige-100">{tier.name}</span>
                    <Badge variant="glass" size="xs">{tier.percentage}%</Badge>
                    <span className="text-xs text-warmBeige-400">({tier.count})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Activity */}
          {weeklyActivity && weeklyActivity.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Weekly Activity</h4>
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                  const data = weeklyActivity.find(d => d.day === index) || { activity: 0 };
                  const max = Math.max(...weeklyActivity.map(d => d.activity), 1);
                  const height = (data.activity / max) * 40;
                  
                  return (
                    <div key={index} className="text-center">
                      <div 
                        className="w-full rounded-lg bg-terracotta-500/70 transition-all"
                        style={{ 
                          height: `${Math.max(height, 10)}px`,
                          minHeight: '10px'
                        }}
                      />
                      <span className="text-[10px] text-warmBeige-500">{day}</span>
                      <p className="text-xs font-medium text-warmBeige-100">{data.activity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Top Segments */}
          {topSegments && topSegments.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Top Audience Segments</h4>
              <div className="space-y-2">
                {topSegments.slice(0, 5).map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-navy-800/30">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-warmBeige-100">{segment.name}</span>
                      <Badge variant="glass" size="xs">{segment.count} subscribers</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-warmBeige-400">{segment.percentage}%</span>
                      <div className="w-16 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-terracotta-500 rounded-full"
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Overview */}
          <div className="pt-4 border-t border-warmBeige-500/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-terracotta-500/20 to-navy-800/30 border border-terracotta-500/20">
                <p className="text-sm text-warmBeige-400">Avg. Engagement Rate</p>
                <p className="text-2xl font-bold text-warmBeige-100">{engagementRate}%</p>
                <p className="text-xs text-warmBeige-400">{activeSubscribers} active subscribers</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                <p className="text-sm text-warmBeige-400">Avg. Read Time</p>
                <p className="text-2xl font-bold text-warmBeige-100">{avgReadTime}m</p>
                <p className="text-xs text-warmBeige-400">Across all subscribers</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SubscriberAnalytics;