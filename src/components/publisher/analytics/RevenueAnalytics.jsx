import React, { useState } from 'react';
import {
  FiDollarSign,
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
  FiUsers,
  FiFileText
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';

const RevenueAnalytics = ({ 
  revenue = {}, 
  timeRange = '30d',
  detailed = false,
  className = '',
}) => {
  const [viewType, setViewType] = useState('overview');

  const {
    totalRevenue = 0,
    revenueChange = 0,
    subscriptionRevenue = 0,
    adRevenue = 0,
    tipRevenue = 0,
    totalSubscribers = 0,
    subscriberGrowth = 0,
    avgRevenuePerUser = 0,
    revenueData = [],
    revenueByCategory = [],
    topEarningArticles = [],
    paymentMethods = [],
    monthlyTrend = [],
    projectedRevenue = 0,
    conversionRate = 0,
    churnRate = 0,
    lifetimeValue = 0,
  } = revenue;

  const getChangeColor = (value) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-warmBeige-400';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!revenue || Object.keys(revenue).length === 0) {
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
          <FiDollarSign className="text-terracotta-400" size={20} />
          <h3 className="text-lg font-semibold text-warmBeige-100">Revenue Analytics</h3>
          <Badge variant="glass" size="sm">
            {formatCurrency(totalRevenue)} total
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

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Total Revenue</p>
          <p className="text-xl font-bold text-warmBeige-100">{formatCurrency(totalRevenue)}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className={`text-xs font-medium ${getChangeColor(revenueChange)}`}>
              {revenueChange > 0 ? '↑' : '↓'} {Math.abs(revenueChange)}%
            </span>
            <span className="text-xs text-warmBeige-500">vs previous</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-warmBeige-400">Subscriptions</p>
          <p className="text-xl font-bold text-blue-400">{formatCurrency(subscriptionRevenue)}</p>
          <p className="text-xs text-warmBeige-400">{totalSubscribers} subscribers</p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-xs text-warmBeige-400">Ad Revenue</p>
          <p className="text-xl font-bold text-green-400">{formatCurrency(adRevenue)}</p>
          <p className="text-xs text-warmBeige-400">{((adRevenue / totalRevenue) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-warmBeige-400">Tips</p>
          <p className="text-xl font-bold text-yellow-400">{formatCurrency(tipRevenue)}</p>
          <p className="text-xs text-warmBeige-400">{((tipRevenue / totalRevenue) * 100).toFixed(0)}% of total</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiUsers className="text-terracotta-400" size={14} />
            <span className="text-xs text-warmBeige-400">Subscriber Growth</span>
          </div>
          <p className={`text-lg font-bold ${getChangeColor(subscriberGrowth)}`}>
            {subscriberGrowth > 0 ? '+' : ''}{subscriberGrowth}%
          </p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiTarget className="text-blue-400" size={14} />
            <span className="text-xs text-warmBeige-400">Conversion Rate</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{conversionRate}%</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiAward className="text-yellow-400" size={14} />
            <span className="text-xs text-warmBeige-400">Avg. Revenue Per User</span>
          </div>
          <p className="text-lg font-bold text-warmBeige-100">{formatCurrency(avgRevenuePerUser)}</p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      {revenueData && revenueData.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Revenue Trend</h4>
          <div className="h-40 flex items-end gap-1">
            {revenueData.slice(-30).map((day, index) => {
              const max = Math.max(...revenueData.map(d => d.value), 1);
              const height = (day.value / max) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full rounded-t-lg bg-terracotta-500/70 hover:bg-terracotta-500 transition-all"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-warmBeige-500 mt-1">
                    {day.label?.substring(0, 3)}
                  </span>
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-800/95 px-2 py-1 rounded text-xs text-warmBeige-100">
                    {formatCurrency(day.value)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Revenue Insights */}
      {detailed && (
        <div className="mt-4 space-y-4">
          {/* Revenue by Category */}
          {revenueByCategory && revenueByCategory.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3 flex items-center gap-2">
                <FiPieChart className="text-terracotta-400" size={14} />
                Revenue Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {revenueByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-navy-800/30">
                    <span className="text-sm text-warmBeige-100">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-terracotta-500 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-warmBeige-400">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Earning Articles */}
          {topEarningArticles && topEarningArticles.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3 flex items-center gap-2">
                <FiStar className="text-yellow-400" size={14} />
                Top Earning Articles
              </h4>
              <div className="space-y-2">
                {topEarningArticles.slice(0, 5).map((article, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all">
                    <span className="text-sm font-bold text-warmBeige-500 w-6">#{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-warmBeige-100 truncate">{article.title}</p>
                      <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{article.subscribers} subscribers</span>
                      </div>
                    </div>
                    <Badge variant="glass" size="sm">
                      {formatCurrency(article.revenue)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {paymentMethods && paymentMethods.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Payment Methods</h4>
              <div className="flex gap-3 flex-wrap">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                    <span className="text-sm text-warmBeige-100">{method.name}</span>
                    <Badge variant="glass" size="xs">{method.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Trend */}
          {monthlyTrend && monthlyTrend.length > 0 && (
            <div className="pt-4 border-t border-warmBeige-500/10">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Monthly Revenue Trend</h4>
              <div className="grid grid-cols-6 gap-2">
                {monthlyTrend.map((month, index) => (
                  <div key={index} className="text-center p-2 rounded-xl bg-navy-800/30">
                    <div 
                      className="w-full rounded-t-lg bg-terracotta-500/70"
                      style={{ 
                        height: `${(month.value / (Math.max(...monthlyTrend.map(m => m.value)) || 1)) * 40}px`,
                        minHeight: '10px'
                      }}
                    />
                    <span className="text-xs text-warmBeige-400">{month.label}</span>
                    <p className="text-xs font-medium text-warmBeige-100">{formatCurrency(month.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projections & Insights */}
          <div className="pt-4 border-t border-warmBeige-500/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-terracotta-500/20 to-navy-800/30 border border-terracotta-500/20">
                <p className="text-sm text-warmBeige-400">Projected Revenue</p>
                <p className="text-2xl font-bold text-warmBeige-100">{formatCurrency(projectedRevenue)}</p>
                <p className="text-xs text-warmBeige-400">Next 30 days</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warmBeige-400">Churn Rate</p>
                    <p className="text-2xl font-bold text-warmBeige-100">{churnRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-warmBeige-400">Lifetime Value</p>
                    <p className="text-2xl font-bold text-warmBeige-100">{formatCurrency(lifetimeValue)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RevenueAnalytics;