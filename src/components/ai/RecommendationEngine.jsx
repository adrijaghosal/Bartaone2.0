import React, { useState, useEffect } from 'react';
import {
  FiSparkles,
  FiTrendingUp,
  FiUser,
  FiThumbsUp,
  FiThumbsDown,
  FiInfo,
  FiChevronRight,
  FiBookmark,
  FiEye,
  FiHeart,
  FiShare2,
  FiZap,
  FiBrain,
  FiTarget,
  FiAward,
  FiStar
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import ProgressBar from '../../common/ProgressBar';
import ArticleCard from '../articles/ArticleCard';

const RecommendationEngine = ({ 
  articles = [],
  onFeedback,
  className = '',
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationReason, setRecommendationReason] = useState({});
  const [showReason, setShowReason] = useState(null);

  useEffect(() => {
    if (articles.length > 0) {
      // Generate recommendations with reasons
      const recommendationsWithReasons = articles.slice(0, 6).map(article => ({
        ...article,
        reason: getRecommendationReason(article),
        confidence: Math.floor(Math.random() * 30 + 70) // Simulated confidence score
      }));
      setRecommendations(recommendationsWithReasons);
    }
  }, [articles]);

  const getRecommendationReason = (article) => {
    const reasons = [
      { type: 'interest', label: 'Based on your interests', icon: <FiUser /> },
      { type: 'trending', label: 'Trending in your network', icon: <FiTrendingUp /> },
      { type: 'similar', label: 'Similar to articles you liked', icon: <FiThumbsUp /> },
      { type: 'popular', label: 'Popular among readers like you', icon: <FiStar /> },
      { type: 'new', label: 'New from publishers you follow', icon: <FiZap /> },
      { type: 'related', label: 'Related to your recent reading', icon: <FiEye /> },
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const handleFeedback = (articleId, type) => {
    if (onFeedback) {
      onFeedback(articleId, type);
    }
    // Update local state
    setRecommendations(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, userFeedback: type }
          : article
      )
    );
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-terracotta-500/20">
            <FiBrain className="text-terracotta-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              AI Recommendations
              <Badge variant="glass" size="sm">Powered by AI</Badge>
            </h3>
            <p className="text-sm text-warmBeige-400">
              Curated just for you based on your reading behavior
            </p>
          </div>
        </div>
        <Badge variant="glass" size="sm" className="flex items-center gap-1">
          <FiSparkles className="text-yellow-400" />
          {recommendations.length} recommendations
        </Badge>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((article) => (
          <div key={article.id} className="relative group">
            <ArticleCard
              article={article}
              variant="standard"
              showActions={false}
              className="hover:border-terracotta-500/30"
            />

            {/* AI Recommendation Badge */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <Badge 
                variant="glass" 
                size="sm"
                className="backdrop-blur-lg flex items-center gap-1"
              >
                <FiSparkles className="text-yellow-400" size={12} />
                AI Pick
              </Badge>
              <Badge 
                variant="glass" 
                size="sm"
                className="backdrop-blur-lg"
              >
                {article.confidence}% match
              </Badge>
            </div>

            {/* Reason Badge */}
            <div 
              className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
              onMouseEnter={() => setShowReason(article.id)}
              onMouseLeave={() => setShowReason(null)}
            >
              <Badge 
                variant="glass" 
                size="sm"
                className="backdrop-blur-lg flex items-center gap-1 cursor-help"
              >
                {article.reason?.icon}
                {article.reason?.label}
                <FiInfo size={12} />
              </Badge>
            </div>

            {/* Feedback Buttons */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 p-1 bg-navy-900/95 backdrop-blur-xl rounded-xl border border-warmBeige-500/10 shadow-xl">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFeedback(article.id, 'like');
                  }}
                  className={`
                    p-1.5 rounded-lg transition-all
                    ${article.userFeedback === 'like' 
                      ? 'text-green-400 bg-green-500/20' 
                      : 'text-warmBeige-400 hover:text-green-400 hover:bg-green-500/10'
                    }
                  `}
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
                  className={`
                    p-1.5 rounded-lg transition-all
                    ${article.userFeedback === 'dislike' 
                      ? 'text-red-400 bg-red-500/20' 
                      : 'text-warmBeige-400 hover:text-red-400 hover:bg-red-500/10'
                    }
                  `}
                  title="Not interested"
                >
                  <FiThumbsDown size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Save for later
                  }}
                  className="p-1.5 rounded-lg text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all"
                  title="Save for later"
                >
                  <FiBookmark size={14} />
                </button>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-700 rounded-b-xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-terracotta-400 to-terracotta-500 rounded-b-xl transition-all duration-1000"
                style={{ width: `${article.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
        <div className="p-2 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiTarget className="text-terracotta-400" size={14} />
            <span className="text-xs text-warmBeige-400">Personalization</span>
          </div>
          <p className="text-sm font-semibold text-warmBeige-100">85%</p>
        </div>
        <div className="p-2 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiAward className="text-yellow-400" size={14} />
            <span className="text-xs text-warmBeige-400">Accuracy</span>
          </div>
          <p className="text-sm font-semibold text-warmBeige-100">92%</p>
        </div>
        <div className="p-2 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-green-400" size={14} />
            <span className="text-xs text-warmBeige-400">Engagement</span>
          </div>
          <p className="text-sm font-semibold text-warmBeige-100">78%</p>
        </div>
        <div className="p-2 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2">
            <FiZap className="text-blue-400" size={14} />
            <span className="text-xs text-warmBeige-400">Freshness</span>
          </div>
          <p className="text-sm font-semibold text-warmBeige-100">94%</p>
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="text-xs text-warmBeige-500 text-center">
        Help us improve your recommendations by liking or disliking articles
      </div>
    </div>
  );
};

export default RecommendationEngine;