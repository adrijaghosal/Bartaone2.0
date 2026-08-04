import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  FiMoreHorizontal
} from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useAnalytics } from '../../../hooks/useAnalytics';
import StatsCard from './StatsCard';
import RevenueChart from './RevenueChart';
import PerformanceMetrics from './PerformanceMetrics';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';
import Avatar from '../../common/Avatar';
import { format, formatDistanceToNow } from 'date-fns';

const DashboardOverview = ({ className = '' }) => {
  const { user } = useAuth();
  const { 
    getDashboardStats,
    getRecentActivity,
    getTopArticles,
    getNotifications,
    loading,
    error
  } = useAnalytics();

  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [timeRange, setTimeRange] = useState('7d'); // '7d', '30d', '90d'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activityData, articlesData, notifsData] = await Promise.all([
          getDashboardStats(timeRange),
          getRecentActivity(5),
          getTopArticles(5),
          getNotifications(5)
        ]);
        
        setStats(statsData);
        setRecentActivity(activityData);
        setTopArticles(articlesData);
        setNotifications(notifsData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, [timeRange, getDashboardStats, getRecentActivity, getTopArticles, getNotifications]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Loading state
  if (loading && !stats) {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton variant="card" height="300px" className="lg:col-span-2" />
          <Skeleton variant="card" height="300px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Failed to load dashboard: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100">
            Welcome back, {user?.name?.split(' ')[0] || 'Publisher'}! 👋
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Here's what's happening with your content today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
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
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.location.href = '/publisher/create-article'}
            icon={<FiFileText />}
          >
            Write Article
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Activity & Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiActivity className="text-terracotta-400" />
              Recent Activity
            </h3>
            <Link 
              to="/publisher/analytics" 
              className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-warmBeige-400 text-sm text-center py-4">
                No recent activity
              </p>
            ) : (
              recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all"
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${activity.type === 'view' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${activity.type === 'like' ? 'bg-red-500/20 text-red-400' : ''}
                    ${activity.type === 'follow' ? 'bg-green-500/20 text-green-400' : ''}
                    ${activity.type === 'comment' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${activity.type === 'subscribe' ? 'bg-purple-500/20 text-purple-400' : ''}
                  `}>
                    {activity.icon || '📊'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-warmBeige-100">
                      {activity.message}
                    </p>
                    <p className="text-xs text-warmBeige-400">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  {activity.articleId && (
                    <Link 
                      to={`/article/${activity.articleId}`}
                      className="text-warmBeige-500 hover:text-warmBeige-100 transition-colors"
                    >
                      <FiArrowRight size={16} />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Top Articles */}
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiBarChart2 className="text-terracotta-400" />
              Top Articles
            </h3>
            <Link 
              to="/publisher/articles" 
              className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {topArticles.length === 0 ? (
              <p className="text-warmBeige-400 text-sm text-center py-4">
                No articles published yet
              </p>
            ) : (
              topArticles.map((article, index) => (
                <Link
                  key={index}
                  to={`/article/${article.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30 hover:bg-navy-800/50 transition-all group"
                >
                  <span className="text-sm font-bold text-warmBeige-500 w-6">
                    #{index + 1}
                  </span>
                  {article.coverImage && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={article.coverImage} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                      <span>{article.views || 0} views</span>
                      <span>•</span>
                      <span>{article.likes || 0} likes</span>
                      <span>•</span>
                      <span>{article.comments || 0} comments</span>
                    </div>
                  </div>
                  <Badge variant="glass" size="sm">
                    {article.views || 0}
                  </Badge>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notifications */}
        <Card variant="glass" padding="lg" className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiBell className="text-terracotta-400" />
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <Badge variant="danger" size="sm">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              )}
            </h3>
            <button className="text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors">
              Mark all read
            </button>
          </div>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-warmBeige-400 text-sm text-center py-4">
                No notifications
              </p>
            ) : (
              notifications.map((notification, index) => (
                <div 
                  key={index}
                  className={`
                    flex items-start gap-3 p-3 rounded-xl transition-all
                    ${notification.read 
                      ? 'bg-navy-800/30' 
                      : 'bg-terracotta-500/10 border border-terracotta-500/20'
                    }
                  `}
                >
                  <div className="text-2xl flex-shrink-0">
                    {notification.emoji || '📌'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-warmBeige-100">
                      {notification.message}
                    </p>
                    <p className="text-xs text-warmBeige-400">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-terracotta-500 flex-shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card variant="glass" padding="lg">
          <h3 className="text-lg font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
            <FiStar className="text-yellow-400" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => window.location.href = '/publisher/create-article'}
              icon={<FiFileText />}
            >
              Write New Article
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/publisher/analytics'}
              icon={<FiBarChart2 />}
            >
              View Analytics
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/publisher/subscribers'}
              icon={<FiUsers />}
            >
              Manage Subscribers
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => window.location.href = '/publisher/settings'}
              icon={<FiCalendar />}
            >
              Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;