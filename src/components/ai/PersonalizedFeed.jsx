import React, { useState, useEffect, useCallback } from 'react';
import {
  FiSparkles,
  FiTrendingUp,
  FiClock,
  FiUser,
  FiThumbsUp,
  FiThumbsDown,
  FiRefreshCw,
  FiFilter,
  FiSettings,
  FiStar,
  FiBookmark,
  FiEye,
  FiHeart,
  FiShare2,
  FiInfo,
  FiChevronRight,
  FiChevronLeft,
  FiZap,
  FiBrain,
  FiBarChart2
} from 'react-icons/fi';
import { useAI } from '../../../hooks/useAI';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';
import Toast from '../../common/Toast';
import ArticleCard from '../articles/ArticleCard';
import AISummary from './AISummary';
import RecommendationEngine from './RecommendationEngine';

const PersonalizedFeed = ({ 
  className = '',
  showRecommendations = true,
  showSummary = true,
}) => {
  const { user } = useAuth();
  const {
    getPersonalizedFeed,
    getFeedPreferences,
    updateFeedPreferences,
    getTrendingTopics,
    getReadingHistory,
    loading,
    error,
    refreshFeed,
    personalizeFeed
  } = useAI();

  const [feed, setFeed] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showPreferences, setShowPreferences] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [personalizationScore, setPersonalizationScore] = useState(0);
  const [feedVersion, setFeedVersion] = useState(1);

  useEffect(() => {
    fetchFeed();
    fetchPreferences();
    fetchTrendingTopics();
    fetchReadingHistory();
  }, []);

  const fetchFeed = async () => {
    try {
      const data = await getPersonalizedFeed({
        limit: 20,
        topic: selectedTopic === 'all' ? undefined : selectedTopic,
      });
      setFeed(data.articles || []);
      setPersonalizationScore(data.personalizationScore || 85);
      setFeedVersion(data.version || 1);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to load personalized feed',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const fetchPreferences = async () => {
    try {
      const data = await getFeedPreferences();
      setPreferences(data);
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
    }
  };

  const fetchTrendingTopics = async () => {
    try {
      const data = await getTrendingTopics();
      setTrendingTopics(data);
    } catch (err) {
      console.error('Failed to fetch trending topics:', err);
    }
  };

  const fetchReadingHistory = async () => {
    try {
      const data = await getReadingHistory(10);
      setReadingHistory(data);
    } catch (err) {
      console.error('Failed to fetch reading history:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshFeed();
      await fetchFeed();
      setToastData({
        message: 'Feed refreshed with new personalized content! ✨',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to refresh feed',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePersonalize = async () => {
    try {
      await personalizeFeed();
      await fetchFeed();
      setToastData({
        message: 'Feed personalized based on your interests! 🎯',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to personalize feed',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleFeedback = async (articleId, type) => {
    try {
      // Send feedback to AI model
      await updateFeedPreferences({
        articleId,
        feedback: type,
        action: 'feedback'
      });
      
      // Update local feed to reflect feedback
      setFeed(prev => prev.map(article => 
        article.id === articleId 
          ? { ...article, userFeedback: type }
          : article
      ));
      
      setToastData({
        message: `Thanks for your feedback! We'll improve your recommendations.`,
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: 'Failed to submit feedback',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    fetchFeed();
  };

  // Loading skeleton
  if (loading && feed.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="120px" height="40px" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} variant="button" width="100px" height="32px" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height="280px" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Unable to Load Your Feed</h2>
        <p className="text-warmBeige-400 mb-6">{error}</p>
        <Button onClick={handleRefresh} icon={<FiRefreshCw />}>
          Try Again
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
          duration={4000}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
              <FiSparkles className="text-terracotta-400" />
              Your AI-Powered Feed
            </h1>
            <Badge variant="glass" size="md" className="flex items-center gap-1">
              <FiBrain size={14} />
              v{feedVersion}
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-warmBeige-400">
              Personalized just for you
            </p>
            <div className="flex items-center gap-1">
              <FiBarChart2 className="text-terracotta-400" size={14} />
              <span className="text-sm text-warmBeige-300">{personalizationScore}% match</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePersonalize}
            icon={<FiZap />}
          >
            Personalize
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreferences(!showPreferences)}
            icon={<FiSettings />}
          />
          <button
            onClick={handleRefresh}
            className={`
              p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 
              text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all
              ${isRefreshing ? 'animate-spin' : ''}
            `}
          >
            <FiRefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* AI Summary Section */}
      {showSummary && feed.length > 0 && (
        <AISummary 
          articles={feed.slice(0, 5)}
          className="mb-2"
        />
      )}

      {/* Trending Topics */}
      {trendingTopics.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-terracotta-400" size={18} />
              <h3 className="text-sm font-medium text-warmBeige-300">Trending Topics</h3>
            </div>
            <span className="text-xs text-warmBeige-500">Based on your interests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTopicSelect('all')}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${selectedTopic === 'all' 
                  ? 'bg-terracotta-500 text-white' 
                  : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 border border-warmBeige-500/10'
                }
              `}
            >
              All
            </button>
            {trendingTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`
                  flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${selectedTopic === topic.id 
                    ? 'bg-terracotta-500 text-white' 
                    : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 border border-warmBeige-500/10'
                  }
                `}
              >
                {topic.emoji}
                {topic.name}
                <Badge variant="glass" size="xs">{topic.count}</Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {showRecommendations && feed.length > 0 && (
        <RecommendationEngine 
          articles={feed}
          onFeedback={handleFeedback}
        />
      )}

      {/* Feed Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-warmBeige-400">
              Showing {feed.length} personalized articles
            </span>
            <Badge variant="glass" size="sm">
              AI Curated
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
            >
              <FiTrendingUp size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
            >
              <FiClock size={16} />
            </button>
          </div>
        </div>

        {feed.length === 0 ? (
          <EmptyState
            title="No articles in your feed"
            description="Start reading and engaging with content to personalize your feed."
            icon="📚"
            action={
              <Button variant="primary" onClick={handleRefresh}>
                Refresh Feed
              </Button>
            }
          />
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
          }>
            {feed.map((article) => (
              <div key={article.id} className="relative group">
                <ArticleCard
                  article={article}
                  variant={viewMode === 'grid' ? 'standard' : 'horizontal'}
                  showActions={true}
                  className="hover:border-terracotta-500/30"
                />
                
                {/* AI Feedback Buttons */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 p-1 bg-navy-900/95 backdrop-blur-xl rounded-xl border border-warmBeige-500/10 shadow-xl">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFeedback(article.id, 'like');
                      }}
                      className="p-1.5 rounded-lg text-warmBeige-400 hover:text-green-400 hover:bg-green-500/10 transition-all"
                      title="I like this recommendation"
                    >
                      <FiThumbsUp size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFeedback(article.id, 'dislike');
                      }}
                      className="p-1.5 rounded-lg text-warmBeige-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Not interested"
                    >
                      <FiThumbsDown size={14} />
                    </button>
                  </div>
                </div>

                {/* AI Recommendation Badge */}
                {article.aiScore > 80 && (
                  <Badge 
                    variant="glass" 
                    size="xs"
                    className="absolute bottom-3 right-3 backdrop-blur-lg"
                  >
                    <FiSparkles className="text-yellow-400" size={10} />
                    {article.aiScore}% match
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading History */}
      {readingHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-warmBeige-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiClock className="text-terracotta-400" size={18} />
              <h3 className="text-sm font-medium text-warmBeige-300">Your Reading History</h3>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {readingHistory.slice(0, 6).map((item) => (
              <div 
                key={item.id}
                className="flex-shrink-0 w-48 p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10 hover:border-terracotta-500/30 transition-all cursor-pointer"
                onClick={() => window.location.href = `/article/${item.id}`}
              >
                <p className="text-sm text-warmBeige-100 line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-warmBeige-400">
                  <span>{item.readTime}m read</span>
                  <span>•</span>
                  <span>{new Date(item.readAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeed;