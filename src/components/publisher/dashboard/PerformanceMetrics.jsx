import React, { useState } from 'react';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiUsers, 
  FiEye, 
  FiHeart,
  FiMessageSquare,
  FiClock,
  FiBarChart2,
  FiAward,
  FiTarget,
  FiInfo
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import ProgressBar from '../../common/ProgressBar';
import { formatPercentage } from '../../../utils/formatters';

const PerformanceMetrics = ({ 
  metrics = {}, 
  timeRange = '7d',
  className = '',
}) => {
  const [expanded, setExpanded] = useState(false);

  const {
    engagementRate = 0,
    bounceRate = 0,
    avgReadTime = 0,
    totalLikes = 0,
    totalComments = 0,
    totalShares = 0,
    subscriberGrowth = 0,
    viewToSubscriberRate = 0,
    topPerformingCategory = 'General',
    peakHour = '14:00',
  } = metrics;

  const isPositive = (value) => value >= 0;

  const metricsData = [
    {
      label: 'Engagement Rate',
      value: engagementRate,
      suffix: '%',
      icon: <FiTrendingUp />,
      color: 'terracotta',
      description: 'Interactions per view',
    },
    {
      label: 'Bounce Rate',
      value: bounceRate,
      suffix: '%',
      icon: <FiTrendingDown />,
      color: 'red',
      description: 'Articles read less than 30s',
      inverse: true,
    },
    {
      label: 'Avg. Read Time',
      value: avgReadTime,
      suffix: 'm',
      icon: <FiClock />,
      color: 'blue',
      description: 'Average reading duration',
    },
    {
      label: 'Likes',
      value: totalLikes,
      icon: <FiHeart />,
      color: 'pink',
      description: 'Total likes received',
    },
    {
      label: 'Comments',
      value: totalComments,
      icon: <FiMessageSquare />,
      color: 'yellow',
      description: 'Total comments received',
    },
    {
      label: 'Shares',
      value: totalShares,
      icon: <FiTrendingUp />,
      color: 'green',
      description: 'Total shares across platforms',
    },
  ];

  const getMetricColor = (value, color) => {
    const colors = {
      terracotta: 'text-terracotta-400 bg-terracotta-500/10',
      red: 'text-red-400 bg-red-500/10',
      blue: 'text-blue-400 bg-blue-500/10',
      pink: 'text-pink-400 bg-pink-500/10',
      yellow: 'text-yellow-400 bg-yellow-500/10',
      green: 'text-green-400 bg-green-500/10',
      purple: 'text-purple-400 bg-purple-500/10',
    };
    return colors[color] || colors.terracotta;
  };

  const getStatusColor = (value, inverse = false) => {
    if (inverse) {
      return value < 30 ? 'text-green-400' : value < 60 ? 'text-yellow-400' : 'text-red-400';
    }
    return value > 70 ? 'text-green-400' : value > 40 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <Card variant="glass" padding="lg" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
          <FiBarChart2 className="text-terracotta-400" />
          Performance Metrics
        </h3>
        <Badge variant="glass" size="sm">
          {timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-warmBeige-400">Engagement</span>
            <FiTarget className="text-terracotta-400" size={14} />
          </div>
          <p className="text-xl font-bold text-warmBeige-100 mt-1">
            {formatPercentage(engagementRate)}
          </p>
          <div className="mt-1">
            <ProgressBar 
              value={engagementRate} 
              max={100} 
              color="terracotta"
              height="4px"
            />
          </div>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-warmBeige-400">Growth</span>
            <FiUsers className="text-green-400" size={14} />
          </div>
          <p className="text-xl font-bold text-warmBeige-100 mt-1">
            {isPositive(subscriberGrowth) ? '+' : ''}{subscriberGrowth}%
          </p>
          <div className="mt-1">
            <ProgressBar 
              value={Math.min(Math.abs(subscriberGrowth), 100)} 
              max={100} 
              color={isPositive(subscriberGrowth) ? 'green' : 'red'}
              height="4px"
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-2">
        {metricsData.slice(0, expanded ? undefined : 4).map((metric, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all group"
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
              ${getMetricColor(metric.value, metric.color)}
            `}>
              {metric.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warmBeige-400">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${getStatusColor(metric.value, metric.inverse)}`}>
                    {metric.value}{metric.suffix || ''}
                  </span>
                </div>
              </div>
              <p className="text-xs text-warmBeige-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Expand */}
      {metricsData.length > 4 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-2 text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors"
        >
          {expanded ? 'Show Less' : `Show ${metricsData.length - 4} More Metrics`}
        </button>
      )}

      {/* Additional Insights */}
      <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-xl bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Top Category</p>
            <p className="text-sm font-semibold text-warmBeige-100 mt-1">
              {topPerformingCategory}
            </p>
          </div>
          <div className="text-center p-2 rounded-xl bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Peak Hour</p>
            <p className="text-sm font-semibold text-warmBeige-100 mt-1">
              {peakHour}
            </p>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-3 p-2.5 rounded-xl bg-terracotta-500/10 border border-terracotta-500/20">
        <div className="flex items-start gap-2">
          <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={14} />
          <p className="text-xs text-warmBeige-400">
            {engagementRate > 50 
              ? 'Great engagement! Your content is resonating well with readers.'
              : 'Try adding more visual content to increase engagement rates.'
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMetrics;