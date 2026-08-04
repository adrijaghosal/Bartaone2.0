import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiEye, 
  FiUsers, 
  FiDollarSign,
  FiFileText,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Skeleton from '../../common/Skeleton';
import Toast from '../../common/Toast';
import EngagementMetrics from './EngagementMetrics';
import AudienceInsights from './AudienceInsights';
import RevenueAnalytics from './RevenueAnalytics';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

const AnalyticsDashboard = ({ className = '' }) => {
  const { user } = useAuth();
  const { 
    getAnalyticsOverview,
    getPerformanceMetrics,
    getAudienceData,
    getRevenueData,
    loading,
    error,
    exportData
  } = useAnalytics();

  const [timeRange, setTimeRange] = useState('30d');
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  const [overview, setOverview] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [audience, setAudience] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: 'custom', label: 'Custom' },
  ];

  const tabs = [
    { value: 'overview', label: 'Overview', icon: <FiBarChart2 /> },
    { value: 'engagement', label: 'Engagement', icon: <FiActivity /> },
    { value: 'audience', label: 'Audience', icon: <FiUsers /> },
    { value: 'revenue', label: 'Revenue', icon: <FiDollarSign /> },
  ];

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      const [overviewData, metricsData, audienceData, revenueData] = await Promise.all([
        getAnalyticsOverview({ start: dateRange.start, end: dateRange.end }),
        getPerformanceMetrics({ start: dateRange.start, end: dateRange.end }),
        getAudienceData({ start: dateRange.start, end: dateRange.end }),
        getRevenueData({ start: dateRange.start, end: dateRange.end }),
      ]);
      
      setOverview(overviewData);
      setMetrics(metricsData);
      setAudience(audienceData);
      setRevenue(revenueData);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to fetch analytics data',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    if (range === 'custom') {
      // Open custom date picker
    } else {
      const days = parseInt(range);
      setDateRange({
        start: subDays(new Date(), days),
        end: new Date()
      });
    }
  };

  const handleExport = async (format = 'csv') => {
    setIsExporting(true);
    try {
      const data = await exportData({
        format,
        start: dateRange.start,
        end: dateRange.end,
        type: activeTab
      });
      
      // Create download link
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_${format(new Date(), 'yyyy-MM-dd')}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setToastData({
        message: 'Analytics data exported successfully!',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to export data',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsExporting(false);
    }
  };

  // Loading skeleton
  if (loading && !overview) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="150px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" />
          ))}
        </div>
        <Skeleton variant="card" height="300px" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" height="300px" />
          <Skeleton variant="card" height="300px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Unable to Load Analytics</h2>
        <p className="text-warmBeige-400 mb-6">{error}</p>
        <Button onClick={fetchAnalyticsData} icon={<FiRefreshCw />}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiBarChart2 className="text-terracotta-400" />
            Analytics Dashboard
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Track your performance and audience insights
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Time Range Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => handleTimeRangeChange(range.value)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${timeRange === range.value 
                    ? 'bg-terracotta-500 text-white' 
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Date Range Display */}
          {timeRange === 'custom' && (
            <div className="flex items-center gap-2 text-sm text-warmBeige-400">
              <input
                type="date"
                value={format(dateRange.start, 'yyyy-MM-dd')}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
                className="px-3 py-1.5 rounded-lg bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100"
              />
              <span>to</span>
              <input
                type="date"
                value={format(dateRange.end, 'yyyy-MM-dd')}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
                className="px-3 py-1.5 rounded-lg bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100"
              />
            </div>
          )}

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            loading={isExporting}
            icon={<FiDownload />}
          >
            Export
          </Button>

          {/* Refresh Button */}
          <button
            onClick={fetchAnalyticsData}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Total Views</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                {overview?.totalViews?.toLocaleString() || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-medium ${overview?.viewsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {overview?.viewsChange >= 0 ? '↑' : '↓'} {Math.abs(overview?.viewsChange || 0)}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <FiEye size={24} />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Total Articles</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                {overview?.totalArticles || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-medium ${overview?.articlesChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {overview?.articlesChange >= 0 ? '↑' : '↓'} {Math.abs(overview?.articlesChange || 0)}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-terracotta-500/20 text-terracotta-400">
              <FiFileText size={24} />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Total Followers</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                {overview?.totalFollowers?.toLocaleString() || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-medium ${overview?.followersChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {overview?.followersChange >= 0 ? '↑' : '↓'} {Math.abs(overview?.followersChange || 0)}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
              <FiUsers size={24} />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Revenue</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                ${overview?.totalRevenue?.toLocaleString() || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-medium ${overview?.revenueChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {overview?.revenueChange >= 0 ? '↑' : '↓'} {Math.abs(overview?.revenueChange || 0)}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400">
              <FiDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
              ${activeTab === tab.value 
                ? 'bg-terracotta-500 text-white' 
                : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-2">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="glass" padding="lg">
                <h3 className="text-lg font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
                  <FiTrendingUp className="text-terracotta-400" />
                  Performance Trend
                </h3>
                <div className="h-64 flex items-end gap-2">
                  {overview?.trendData?.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-lg bg-terracotta-500/70 hover:bg-terracotta-500 transition-all"
                        style={{ height: `${(item.value / (overview?.maxValue || 1)) * 100}%` }}
                      />
                      <span className="text-xs text-warmBeige-400 mt-1">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="glass" padding="lg">
                <h3 className="text-lg font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
                  <FiPieChart className="text-terracotta-400" />
                  Category Distribution
                </h3>
                <div className="space-y-3">
                  {overview?.categoryData?.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warmBeige-400">{category.name}</span>
                        <span className="text-warmBeige-100">{category.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-navy-700 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full rounded-full bg-terracotta-500"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementMetrics metrics={metrics} timeRange={timeRange} />
              <AudienceInsights audience={audience} timeRange={timeRange} />
            </div>
          </div>
        )}

        {activeTab === 'engagement' && (
          <EngagementMetrics metrics={metrics} timeRange={timeRange} detailed />
        )}

        {activeTab === 'audience' && (
          <AudienceInsights audience={audience} timeRange={timeRange} detailed />
        )}

        {activeTab === 'revenue' && (
          <RevenueAnalytics revenue={revenue} timeRange={timeRange} detailed />
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;