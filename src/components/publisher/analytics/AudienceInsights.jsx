import React, { useState } from 'react';
import {
  FiUsers,
  FiUserPlus,
  FiUserMinus,
  FiUserCheck,
  FiMapPin,
  FiGlobe,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiDownload,
  FiFilter,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';

const AudienceInsights = ({ 
  audience = {}, 
  timeRange = '30d',
  detailed = false,
  className = '',
}) => {
  const [viewType, setViewType] = useState('overview');

  const {
    totalFollowers = 0,
    newFollowers = 0,
    lostFollowers = 0,
    followerGrowth = 0,
    engagementRate = 0,
    avgReadTime = 0,
    topLocations = [],
    topDevices = [],
    topReferrers = [],
    followerTrend = [],
    demographics = {},
    activeHours = [],
    returningRate = 0,
    subscriberRate = 0,
  } = audience;

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

  if (!audience || Object.keys(audience).length === 0) {
    return (
      <Card variant="glass" padding="lg" className={className}>
        <Skeleton variant="title" width="150px" height="24px" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="80px" />
          ))}
        </div>
        <Skeleton variant="card" height="150px" className="mt-4" />
      </Card>
    );
  }

  return (
    <Card variant="glass" padding="lg" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiUsers className="text-terracotta-400" size={20} />
          <h3 className="text-lg font-semibold text-warmBeige-100">Audience Insights</h3>
          <Badge variant="glass" size="sm">
            {totalFollowers} followers
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

      {/* Follower Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Total Followers</p>
          <p className="text-xl font-bold text-warmBeige-100">{formatNumber(totalFollowers)}</p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-xs text-warmBeige-400">New Followers</p>
          <p className="text-xl font-bold text-green-400">+{formatNumber(newFollowers)}</p>
          <p className="text-xs text-warmBeige-400">{timeRange}</p>
        </div>
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-warmBeige-400">Lost Followers</p>
          <p className="text-xl font-bold text-red-400">-{formatNumber(lostFollowers)}</p>
          <p className="text-xs text-warmBeige-400">{timeRange}</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Growth Rate</p>
          <p className={`text-xl font-bold ${getChangeColor(followerGrowth)}`}>
            {followerGrowth > 0 ? '+' : ''}{followerGrowth}%
          </p>
          <p className="text-xs text-warmBeige-400">vs previous period</p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiTarget className="text-terracotta-400" size={14} />
            <span className="text-xs text-warmBeige-400">Engagement Rate</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{engagementRate}%</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiClock className="text-blue-400" size={14} />
            <span className="text-xs text-warmBeige-400">Avg. Read Time</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{avgReadTime}m</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiUserCheck className="text-green-400" size={14} />
            <span className="text-xs text-warmBeige-400">Returning Rate</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{returningRate}%</p>
        </div>
      </div>

      {/* Follower Trend Chart */}
      {followerTrend && followerTrend.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Follower Growth Trend</h4>
          <div className="h-32 flex items-end gap-1">
            {followerTrend.slice(-30).map((day, index) => {
              const max = Math.max(...followerTrend.map(d => d.value), 1);
              const height = (day.value / max) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full rounded-t-lg bg-green-500/70 hover:bg-green-500 transition-all"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-warmBeige-500 mt-1">
                    {day.label?.substring(0, 3)}
                  </span>
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-800/95 px-2 py-1 rounded text-xs text-warmBeige-100">
                    {day.value}
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
          {/* Top Locations */}
          {topLocations && topLocations.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3 flex items-center gap-2">
                <FiMapPin className="text-terracotta-400" size={14} />
                Top Locations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topLocations.slice(0, 6).map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-navy-800/30">
                    <div className="flex items-center gap-2">
                      <FiGlobe className="text-warmBeige-400" size={14} />
                      <span className="text-sm text-warmBeige-100">{location.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-terracotta-500 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-warmBeige-400">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Devices */}
          {topDevices && topDevices.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Device Distribution</h4>
              <div className="flex gap-3 flex-wrap">
                {topDevices.map((device, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                    <span className="text-sm text-warmBeige-100">{device.name}</span>
                    <Badge variant="glass" size="xs">{device.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Referrers */}
          {topReferrers && topReferrers.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Top Referrers</h4>
              <div className="space-y-2">
                {topReferrers.slice(0, 5).map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-navy-800/30">
                    <span className="text-sm text-warmBeige-100">{referrer.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-warmBeige-400">{referrer.visits} visits</span>
                      <Badge variant="glass" size="xs">{referrer.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Hours */}
          {activeHours && activeHours.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Peak Active Hours</h4>
              <div className="grid grid-cols-6 gap-1">
                {activeHours.map((hour, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-full rounded-lg bg-terracotta-500/70 transition-all"
                      style={{ 
                        height: `${(hour.value / (Math.max(...activeHours.map(h => h.value)) || 1)) * 60}px`,
                        minHeight: '10px'
                      }}
                    />
                    <span className="text-[10px] text-warmBeige-500">{hour.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriber Rate */}
          <div className="pt-4 border-t border-warmBeige-500/10">
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <div>
                <p className="text-sm text-warmBeige-400">Subscriber Conversion Rate</p>
                <p className="text-2xl font-bold text-warmBeige-100">{subscriberRate}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-warmBeige-400">Total Subscribers</p>
                <p className="text-xl font-bold text-warmBeige-100">
                  {formatNumber(totalFollowers * (subscriberRate / 100))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AudienceInsights;