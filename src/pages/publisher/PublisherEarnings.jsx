import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiClock,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiPieChart,
  FiBarChart2,
  FiAward,
  FiTarget,
  FiStar,
  FiUsers,
  FiFileText,
  FiCreditCard,
  FiWallet,
  FiArrowRight
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useAnalytics } from '../../hooks/useAnalytics';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';
import RevenueChart from '../../components/publisher/dashboard/RevenueChart';

const PublisherEarnings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getRevenueData, getDashboardStats, loading, error } = useAnalytics();

  const [revenueData, setRevenueData] = useState(null);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'publisher') {
      navigate('/login');
      return;
    }
    fetchEarningsData();
  }, [isAuthenticated, user, timeRange]);

  const fetchEarningsData = async () => {
    try {
      const [revenue, statsData] = await Promise.all([
        getRevenueData({ timeRange }),
        getDashboardStats(timeRange)
      ]);
      setRevenueData(revenue);
      setStats(statsData);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to load earnings data',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchEarningsData();
    setIsRefreshing(false);
    setToastData({
      message: 'Earnings data refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const handleExport = () => {
    setToastData({
      message: 'Export started! Your file will be downloaded shortly.',
      type: 'success'
    });
    setShowToast(true);
  };

  const earningsBreakdown = [
    { label: 'Subscriptions', value: '$2,450', percentage: 65, color: 'terracotta' },
    { label: 'Ad Revenue', value: '$850', percentage: 22, color: 'blue' },
    { label: 'Tips', value: '$500', percentage: 13, color: 'yellow' },
  ];

  if (loading && !revenueData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="150px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" />
          ))}
        </div>
        <Skeleton variant="card" height="300px" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiDollarSign className="text-terracotta-400" />
            Earnings
            <Badge variant="glass" size="sm">
              Track your revenue
            </Badge>
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Monitor your earnings and revenue streams
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${timeRange === range 
                    ? 'bg-terracotta-500 text-white' 
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <FiRefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Total Revenue</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                ${revenueData?.totalRevenue || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-medium text-green-400">
                  ↑ {revenueData?.revenueChange || 0}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-terracotta-500/20 text-terracotta-400">
              <FiDollarSign size={24} />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Subscribers</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                {stats?.totalFollowers || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-medium text-green-400">
                  ↑ {stats?.followersChange || 0}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
              <FiUsers size={24} />
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warmBeige-400">Avg. Revenue/User</p>
              <p className="text-2xl font-bold text-warmBeige-100">
                ${revenueData?.avgRevenuePerUser || 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-medium text-green-400">
                  ↑ {revenueData?.avgRevenueChange || 0}%
                </span>
                <span className="text-xs text-warmBeige-500">vs previous</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
              <FiTarget size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <RevenueChart 
        data={revenueData?.revenueData || []} 
        timeRange={timeRange}
      />

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" padding="lg">
          <h3 className="text-lg font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
            <FiPieChart className="text-terracotta-400" />
            Earnings Breakdown
          </h3>
          <div className="space-y-4">
            {earningsBreakdown.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-warmBeige-400">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-warmBeige-100">{item.value}</span>
                    <Badge variant="glass" size="xs">{item.percentage}%</Badge>
                  </div>
                </div>
                <div className="w-full h-2 bg-navy-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${item.color}-500 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="glass" padding="lg">
          <h3 className="text-lg font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
            <FiStar className="text-yellow-400" />
            Payout Information
          </h3>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmBeige-400">Available Balance</p>
                  <p className="text-2xl font-bold text-warmBeige-100">$1,240.50</p>
                </div>
                <Button variant="primary" size="sm">
                  Withdraw
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <p className="text-sm text-warmBeige-400">Next Payout</p>
              <p className="text-lg font-semibold text-warmBeige-100">February 15, 2025</p>
              <p className="text-xs text-warmBeige-400">Estimated: $340.00</p>
            </div>

            <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmBeige-400">Payment Method</p>
                  <p className="text-sm text-warmBeige-100 flex items-center gap-2">
                    <FiCreditCard />
                    •••• 4242
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PublisherEarnings;