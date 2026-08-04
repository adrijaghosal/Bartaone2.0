import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiGlobe, 
  FiMail, 
  FiMapPin, 
  FiCalendar,
  FiUsers,
  FiFileText,
  FiEye,
  FiHeart,
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLink,
  FiEdit2,
  FiSettings,
  FiMoreHorizontal,
  FiStar,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { usePublishers } from '../../hooks/usePublishers';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Tabs from '../common/Tabs';
import FollowButton from './FollowButton';
import PublisherArticles from './PublisherArticles';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import Card from '../common/Card';
import Toast from '../common/Toast';

const PublisherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPublisher, loading, error } = usePublishers();
  
  const [publisher, setPublisher] = useState(null);
  const [activeTab, setActiveTab] = useState('articles');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    const fetchPublisher = async () => {
      const data = await getPublisher(id);
      if (data) {
        setPublisher(data);
      }
    };
    fetchPublisher();
  }, [id, getPublisher]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToastMessage('Profile link copied!');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to copy link');
      setToastType('error');
      setShowToast(true);
    }
    setShowShareMenu(false);
  };

  const isOwnProfile = user?.id === publisher?.userId || user?.role === 'admin';

  const tabs = [
    {
      label: 'Articles',
      value: 'articles',
      icon: <FiFileText />,
      count: publisher?.articleCount || 0,
    },
    {
      label: 'About',
      value: 'about',
      icon: <FiUsers />,
    },
    {
      label: 'Stats',
      value: 'stats',
      icon: <FiTrendingUp />,
    },
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton variant="card" height="200px" />
        <Skeleton variant="title" width="300px" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !publisher) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Publisher Not Found</h2>
        <p className="text-warmBeige-400 mb-6">The publisher you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} variant="primary">
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-warmBeige-400 hover:text-warmBeige-100 transition-colors mb-6 group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Publisher Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 border border-warmBeige-500/10 mb-8">
        {/* Cover Image */}
        {publisher.coverImage && (
          <div className="h-48 md:h-64 lg:h-80 w-full overflow-hidden">
            <img 
              src={publisher.coverImage} 
              alt={publisher.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Profile Info */}
        <div className={`
          px-6 md:px-8 lg:px-10 pb-8
          ${publisher.coverImage ? '-mt-16 md:-mt-20' : 'pt-8'}
        `}>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar 
                src={publisher.logo || publisher.avatar} 
                alt={publisher.name}
                size="xl"
                className="border-4 border-navy-900 shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-warmBeige-100">
                  {publisher.name}
                </h1>
                {publisher.verified && (
                  <Badge variant="success" size="md" className="mt-1">
                    ✓ Verified
                  </Badge>
                )}
                {publisher.premium && (
                  <Badge variant="glass" size="md" className="mt-1">
                    Premium
                  </Badge>
                )}
              </div>

              {publisher.tagline && (
                <p className="text-warmBeige-300 text-lg mb-3">
                  {publisher.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-warmBeige-400">
                <span className="flex items-center gap-1">
                  <FiUsers size={16} />
                  {publisher.followerCount || 0} followers
                </span>
                <span className="flex items-center gap-1">
                  <FiFileText size={16} />
                  {publisher.articleCount || 0} articles
                </span>
                <span className="flex items-center gap-1">
                  <FiEye size={16} />
                  {publisher.totalViews || 0} total views
                </span>
                <span className="flex items-center gap-1">
                  <FiCalendar size={16} />
                  Joined {format(new Date(publisher.joinedAt || Date.now()), 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
              {isOwnProfile ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/publisher/settings')}
                    icon={<FiSettings />}
                  >
                    Manage Profile
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/publisher/create-article')}
                    icon={<FiEdit2 />}
                  >
                    Write Article
                  </Button>
                </>
              ) : (
                <>
                  <FollowButton publisherId={id} size="md" />
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      icon={<FiShare2 />}
                    />
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 p-2 bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl shadow-2xl min-w-[180px] animate-slideDown z-50">
                        <button
                          onClick={handleShare}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all"
                        >
                          <FiLink />
                          Copy Link
                        </button>
                        {publisher.twitter && (
                          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all">
                            <FiTwitter className="text-blue-400" />
                            Twitter
                          </button>
                        )}
                        {publisher.facebook && (
                          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all">
                            <FiFacebook className="text-blue-600" />
                            Facebook
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      {publisher.socialLinks && Object.values(publisher.socialLinks).some(link => link) && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm text-warmBeige-400">Connect:</span>
          {publisher.socialLinks.website && (
            <a
              href={publisher.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all"
            >
              <FiGlobe size={18} />
            </a>
          )}
          {publisher.socialLinks.twitter && (
            <a
              href={publisher.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
            >
              <FiTwitter size={18} />
            </a>
          )}
          {publisher.socialLinks.facebook && (
            <a
              href={publisher.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-blue-600 hover:bg-blue-500/10 transition-all"
            >
              <FiFacebook size={18} />
            </a>
          )}
          {publisher.socialLinks.instagram && (
            <a
              href={publisher.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all"
            >
              <FiInstagram size={18} />
            </a>
          )}
          {publisher.socialLinks.youtube && (
            <a
              href={publisher.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FiYoutube size={18} />
            </a>
          )}
          {publisher.email && (
            <a
              href={`mailto:${publisher.email}`}
              className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all"
            >
              <FiMail size={18} />
            </a>
          )}
        </div>
      )}

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        defaultTab={0}
        onChange={(index) => setActiveTab(tabs[index].value)}
        variant="default"
        className="mb-6"
      />

      {/* Tab Content */}
      <div>
        {activeTab === 'articles' && (
          <PublisherArticles publisherId={id} />
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-semibold text-warmBeige-100 mb-3">
                About {publisher.name}
              </h3>
              <p className="text-warmBeige-300 leading-relaxed">
                {publisher.bio || 'No bio available.'}
              </p>
            </Card>

            {publisher.location && (
              <Card variant="glass" padding="lg">
                <h4 className="text-sm font-medium text-warmBeige-400 mb-2">
                  Location
                </h4>
                <p className="text-warmBeige-100 flex items-center gap-2">
                  <FiMapPin className="text-terracotta-400" />
                  {publisher.location}
                </p>
              </Card>
            )}

            <Card variant="glass" padding="lg">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-3">
                Publisher Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-warmBeige-400">Joined</p>
                  <p className="text-warmBeige-100">
                    {format(new Date(publisher.joinedAt || Date.now()), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-warmBeige-400">Total Articles</p>
                  <p className="text-warmBeige-100">{publisher.articleCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-warmBeige-400">Total Followers</p>
                  <p className="text-warmBeige-100">{publisher.followerCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-warmBeige-400">Total Views</p>
                  <p className="text-warmBeige-100">{publisher.totalViews || 0}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-3xl font-bold text-terracotta-400">
                  {publisher.totalViews || 0}
                </div>
                <p className="text-sm text-warmBeige-400 mt-1">Total Views</p>
              </Card>
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-3xl font-bold text-warmBeige-100">
                  {publisher.followerCount || 0}
                </div>
                <p className="text-sm text-warmBeige-400 mt-1">Followers</p>
              </Card>
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-3xl font-bold text-warmBeige-100">
                  {publisher.articleCount || 0}
                </div>
                <p className="text-sm text-warmBeige-400 mt-1">Articles</p>
              </Card>
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-3xl font-bold text-warmBeige-100">
                  {publisher.engagementRate || 0}%
                </div>
                <p className="text-sm text-warmBeige-400 mt-1">Engagement Rate</p>
              </Card>
            </div>

            {/* Weekly Stats */}
            <Card variant="glass" padding="lg">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-4">
                Weekly Performance
              </h4>
              <div className="space-y-3">
                {publisher.weeklyStats?.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-warmBeige-400 w-24">
                      {day.day}
                    </span>
                    <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-terracotta-400 to-terracotta-500 rounded-full"
                        style={{ width: `${day.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-warmBeige-100 w-12">
                      {day.views}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Articles */}
            <Card variant="glass" padding="lg">
              <h4 className="text-sm font-medium text-warmBeige-400 mb-4">
                Top Performing Articles
              </h4>
              <div className="space-y-3">
                {publisher.topArticles?.slice(0, 5).map((article, index) => (
                  <Link
                    key={index}
                    to={`/article/${article.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-700/50 transition-all group"
                  >
                    <span className="text-sm font-bold text-warmBeige-500 w-6">
                      #{index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{article.likes} likes</span>
                      </div>
                    </div>
                    <Badge variant="glass" size="sm">
                      {article.views || 0} views
                    </Badge>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherProfile;