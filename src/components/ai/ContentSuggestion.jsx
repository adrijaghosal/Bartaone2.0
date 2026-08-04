import React, { useState, useEffect } from 'react';
import {
  FiLightbulb,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiTarget,
  FiBarChart2,
  FiMessageSquare,
  FiHeart,
  FiEye,
  FiZap,
  FiSparkles,
  FiChevronRight,
  FiRefreshCw,
  FiInfo,
  FiAlertCircle
} from 'react-icons/fi';
import { useAI } from '../../../hooks/useAI';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';
import Toast from '../../common/Toast';
import ProgressBar from '../../common/ProgressBar';

const ContentSuggestion = ({ 
  className = '',
  onSelectTopic,
}) => {
  const { user } = useAuth();
  const {
    getContentSuggestions,
    getTrendingTopics,
    getAudienceInsights,
    loading,
    error,
    refreshSuggestions
  } = useAI();

  const [suggestions, setSuggestions] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [audienceInsights, setAudienceInsights] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchSuggestions();
    fetchTrendingTopics();
    fetchAudienceInsights();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await getContentSuggestions();
      setSuggestions(data);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to get content suggestions',
        type: 'error'
      });
      setShowToast(true);
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

  const fetchAudienceInsights = async () => {
    try {
      const data = await getAudienceInsights();
      setAudienceInsights(data);
    } catch (err) {
      console.error('Failed to fetch audience insights:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshSuggestions();
      await fetchSuggestions();
      setToastData({
        message: 'Suggestions refreshed! ✨',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to refresh suggestions',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion.id);
    if (onSelectTopic) {
      onSelectTopic(suggestion.topic);
    }
  };

  // Loading skeleton
  if (loading && suggestions.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton variant="title" width="200px" height="28px" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="150px" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-yellow-500/20">
            <FiLightbulb className="text-yellow-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              AI Content Suggestions
              <Badge variant="glass" size="sm">Beta</Badge>
            </h3>
            <p className="text-sm text-warmBeige-400">
              Discover what your audience wants to read next
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className={`p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <FiRefreshCw size={18} />
        </button>
      </div>

      {/* Audience Insights */}
      {audienceInsights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <p className="text-xs text-warmBeige-400">Audience Interest</p>
            <p className="text-lg font-bold text-warmBeige-100">{audienceInsights.interestScore}%</p>
            <ProgressBar value={audienceInsights.interestScore} max={100} height="3px" className="mt-1" />
          </div>
          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <p className="text-xs text-warmBeige-400">Content Gap</p>
            <p className="text-lg font-bold text-warmBeige-100">{audienceInsights.contentGap}</p>
            <p className="text-xs text-warmBeige-400">Topics to cover</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <p className="text-xs text-warmBeige-400">Engagement Potential</p>
            <p className="text-lg font-bold text-green-400">{audienceInsights.engagementPotential}%</p>
            <p className="text-xs text-warmBeige-400">High potential topics</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <p className="text-xs text-warmBeige-400">Trending Now</p>
            <p className="text-lg font-bold text-terracotta-400">#{audienceInsights.topTrend}</p>
            <p className="text-xs text-warmBeige-400">{audienceInsights.trendingScore}% growth</p>
          </div>
        </div>
      )}

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            variant="glass"
            padding="md"
            className={`
              hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5 transition-all cursor-pointer
              ${selectedSuggestion === suggestion.id ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
            `}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-2xl">
                {suggestion.emoji || '📝'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-warmBeige-100">
                    {suggestion.title}
                  </h4>
                  <Badge variant="glass" size="xs">{suggestion.confidence}% match</Badge>
                </div>
                <p className="text-sm text-warmBeige-400 line-clamp-2">
                  {suggestion.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Badge variant="glass" size="sm">
                    <FiTrendingUp size={12} /> {suggestion.trendScore}
                  </Badge>
                  <Badge variant="glass" size="sm">
                    <FiUsers size={12} /> {suggestion.audienceSize}
                  </Badge>
                  <Badge variant="glass" size="sm">
                    <FiMessageSquare size={12} /> {suggestion.engagement}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-warmBeige-400">
                  <span>Difficulty: {suggestion.difficulty}/5</span>
                  <span>•</span>
                  <span>Time: {suggestion.estimatedTime}m</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trending Topics */}
      {trendingTopics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
          <div className="flex items-center gap-2 mb-3">
            <FiZap className="text-terracotta-400" size={16} />
            <h4 className="text-sm font-medium text-warmBeige-300">Trending Topics in Your Niche</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.slice(0, 8).map((topic) => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic && onSelectTopic(topic.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-terracotta-400 hover:border-terracotta-500/30 transition-all text-sm"
              >
                {topic.emoji}
                {topic.name}
                <Badge variant="glass" size="xs">{topic.count}</Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Tips */}
      <div className="p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/20">
        <div className="flex items-start gap-2">
          <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={14} />
          <div>
            <p className="text-sm text-warmBeige-300">
              <span className="font-medium text-warmBeige-100">AI Tip:</span> 
              {suggestions.length > 0 
                ? ` Based on your audience's reading patterns, topics related to "${suggestions[0]?.topic}" have the highest engagement potential.`
                : ' Start publishing content to get personalized suggestions.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSuggestion;