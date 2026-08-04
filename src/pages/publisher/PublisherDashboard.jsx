import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiFileText,
  FiUsers,
  FiEye,
  FiDollarSign,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiBell,
  FiStar,
  FiPlusCircle,
  FiSettings,
  FiRefreshCw,
  FiMoreHorizontal
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useArticles } from '../../hooks/useArticles';
import DashboardOverview from '../../components/publisher/dashboard/DashboardOverview';
import StatsCard from '../../components/publisher/dashboard/StatsCard';
import RevenueChart from '../../components/publisher/dashboard/RevenueChart';
import PerformanceMetrics from '../../components/publisher/dashboard/PerformanceMetrics';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';

const PublisherDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getArticles, loading: articlesLoading } = useArticles();
  const { getDashboardStats, loading: statsLoading } = useAnalytics();

  const [stats, setStats] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'publisher') {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user, timeRange]);

  const fetchDashboardData = async () => {
    try {
      const [statsData, articlesData] = await Promise.all([
        getDashboardStats(timeRange),
        getArticles({ limit: 5, sort: 'latest' })
      ]);
      setStats(statsData);
      setRecentArticles(articlesData.articles || []);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to load dashboard',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setIsRefreshing(false);
    setToastData({
      message: 'Dashboard refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const quickActions = [
    { label: 'Write Article', icon: <FiPlusCircle />, href: '/publisher/create-article', color: 'terracotta' },
    { label: 'View Analytics', icon: <FiBarChart2 />, href: '/publisher/analytics', color: 'blue' },
    { label: 'Manage Subscribers', icon: <FiUsers />, href: '/publisher/subscribers', color: 'green' },
    { label: 'Settings', icon: <FiSettings />, href: '/publisher/settings', color: 'gray' },
  ];

  if (statsLoading && !stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="150px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" height="300px" className="lg:col-span-2" />
          <Skeleton variant="card" height="300px" />
        </div>
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
            <FiBarChart2 className="text-terracotta-400" />
            Publisher Dashboard
            <Badge variant="glass" size="sm">
              {user?.name?.split(' ')[0] || 'Publisher'}
            </Badge>
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Welcome back! Here's what's happening with your content
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Views"
          value={stats?.totalViews || 0}
          change={stats?.viewsChange || 0}
          icon={<FiEye />}
          color="terracotta"
        />
        <StatsCard
          title="Total Articles"
          value={stats?.totalArticles || 0}
          change={stats?.articlesChange || 0}
          icon={<FiFileText />}
          color="blue"
        />
        <StatsCard
          title="Followers"
          value={stats?.totalFollowers || 0}
          change={stats?.followersChange || 0}
          icon={<FiUsers />}
          color="green"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats?.totalRevenue || 0}`}
          change={stats?.revenueChange || 0}
          icon={<FiDollarSign />}
          color="yellow"
          isCurrency
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart 
            data={stats?.revenueData || []} 
            timeRange={timeRange}
          />
        </div>
        <div className="lg:col-span-1">
          <PerformanceMetrics 
            metrics={stats?.metrics || {}}
            timeRange={timeRange}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.href)}
            className={`
              p-4 rounded-xl text-center transition-all
              bg-navy-800/30 border border-warmBeige-500/10
              hover:border-${action.color}-500/30 hover:bg-${action.color}-500/5
              hover:shadow-lg hover:shadow-${action.color}-500/5
            `}
          >
            <div className={`text-${action.color}-400 text-2xl mb-2`}>
              {action.icon}
            </div>
            <p className="text-sm font-medium text-warmBeige-100">{action.label}</p>
          </button>
        ))}
      </div>

      {/* Recent Articles & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiFileText className="text-terracotta-400" />
              Recent Articles
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/publisher/articles')}
            >
              View All
              <FiArrowRight className="ml-1" size={14} />
            </Button>
          </div>
          <div className="space-y-3">
            {recentArticles.length === 0 ? (
              <p className="text-warmBeige-400 text-sm text-center py-4">
                No articles published yet
              </p>
            ) : (
              recentArticles.map((article) => (
                <div 
                  key={article.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warmBeige-100 truncate">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                      <span>{article.views || 0} views</span>
                      <span>•</span>
                      <span>{article.likes || 0} likes</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="glass" size="sm">
                    {article.status || 'Published'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Notifications */}
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiBell className="text-terracotta-400" />
              Recent Activity
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/publisher/analytics')}
            >
              View All
              <FiArrowRight className="ml-1" size={14} />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                <FiUsers size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-warmBeige-100">New follower: @tech_reader</p>
                <p className="text-xs text-warmBeige-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FiEye size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-warmBeige-100">Article hit 1,000 views: "The Future of AI"</p>
                <p className="text-xs text-warmBeige-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <FiAward size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-warmBeige-100">Earned "Top Publisher" badge</p>
                <p className="text-xs text-warmBeige-400">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips Section */}
      <Card variant="glass" padding="lg" className="bg-gradient-to-br from-terracotta-500/10 to-navy-800/30 border-terracotta-500/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-xl bg-terracotta-500/20 text-terracotta-400">
            <FiStar size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-warmBeige-100">Pro Tip</h4>
            <p className="text-sm text-warmBeige-400 mt-1">
              {stats?.totalArticles === 0 
                ? 'Start publishing your first article to grow your audience!'
                : stats?.totalViews < 100 
                  ? 'Try sharing your articles on social media to increase visibility.'
                  : 'Great job! Keep publishing consistently to build your audience.'
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublisherDashboard;