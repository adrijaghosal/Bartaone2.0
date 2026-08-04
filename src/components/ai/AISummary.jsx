import React, { useState, useEffect } from 'react';
import {
  FiSparkles,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiBookmark,
  FiShare2,
  FiZap,
  FiBrain,
  FiBarChart2,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiRefreshCw
} from 'react-icons/fi';
import { useAI } from '../../../hooks/useAI';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Skeleton from '../../common/Skeleton';
import ProgressBar from '../../common/ProgressBar';

const AISummary = ({ 
  articles = [],
  className = '',
  onViewAll,
}) => {
  const [summary, setSummary] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articles.length > 0) {
      generateSummary();
    }
  }, [articles]);

  const generateSummary = async () => {
    setLoading(true);
    try {
      // Simulate AI summary generation
      const generatedSummary = {
        totalArticles: articles.length,
        topTopics: getTopTopics(articles),
        sentiment: getOverallSentiment(articles),
        engagementScore: calculateEngagement(articles),
        readingTime: Math.ceil(articles.reduce((acc, a) => acc + (a.readTime || 3), 0) / 3),
        keyInsights: generateInsights(articles),
        trendingKeywords: extractKeywords(articles),
        audienceMatch: Math.floor(Math.random() * 30 + 70),
      };
      setSummary(generatedSummary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopTopics = (articles) => {
    const topics = {};
    articles.forEach(article => {
      const category = article.category || 'General';
      topics[category] = (topics[category] || 0) + 1;
    });
    return Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  };

  const getOverallSentiment = (articles) => {
    const sentiments = articles.map(a => a.sentiment || 'neutral');
    const positive = sentiments.filter(s => s === 'positive').length;
    const negative = sentiments.filter(s => s === 'negative').length;
    const neutral = sentiments.filter(s => s === 'neutral').length;
    return { positive, negative, neutral };
  };

  const calculateEngagement = (articles) => {
    const total = articles.reduce((acc, a) => 
      acc + (a.likes || 0) + (a.comments || 0) + (a.shares || 0), 0
    );
    return Math.min(Math.round(total / articles.length / 10), 100);
  };

  const generateInsights = (articles) => {
    const insights = [];
    if (articles.length > 5) {
      insights.push('High volume of content published recently');
    }
    const avgEngagement = articles.reduce((acc, a) => acc + (a.likes || 0), 0) / articles.length;
    if (avgEngagement > 50) {
      insights.push('Strong audience engagement across articles');
    }
    const categories = new Set(articles.map(a => a.category));
    if (categories.size > 3) {
      insights.push('Diverse content topics covering multiple categories');
    }
    return insights;
  };

  const extractKeywords = (articles) => {
    const keywords = {};
    articles.forEach(article => {
      (article.tags || []).forEach(tag => {
        keywords[tag] = (keywords[tag] || 0) + 1;
      });
    });
    return Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword]) => keyword);
  };

  if (loading) {
    return (
      <Card variant="glass" padding="md" className={className}>
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" height="40px" width="40px" />
          <div className="flex-1">
            <Skeleton variant="title" width="200px" height="20px" />
            <Skeleton variant="text" width="300px" height="16px" />
          </div>
        </div>
      </Card>
    );
  }

  if (!summary || articles.length === 0) {
    return null;
  }

  return (
    <Card variant="glass" padding="md" className={`relative overflow-hidden ${className}`}>
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-terracotta-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-terracotta-500/20 to-purple-500/20">
              <FiBrain className="text-terracotta-400" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-warmBeige-100">AI-Powered Summary</h4>
                <Badge variant="glass" size="xs" className="flex items-center gap-1">
                  <FiSparkles className="text-yellow-400" size={10} />
                  {summary.totalArticles} articles analyzed
                </Badge>
              </div>
              <p className="text-xs text-warmBeige-400">
                Quick overview of your content performance
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Articles</p>
            <p className="text-sm font-bold text-warmBeige-100">{summary.totalArticles}</p>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Read Time</p>
            <p className="text-sm font-bold text-warmBeige-100">{summary.readingTime}m</p>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Topics</p>
            <p className="text-sm font-bold text-warmBeige-100">{summary.topTopics.length}</p>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Engagement</p>
            <p className="text-sm font-bold text-green-400">{summary.engagementScore}%</p>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Sentiment</p>
            <p className="text-sm font-bold text-warmBeige-100">
              {summary.sentiment.positive > summary.sentiment.negative ? '😊' : '😐'}
            </p>
          </div>
          <div className="text-center p-1.5 rounded-lg bg-navy-800/30">
            <p className="text-xs text-warmBeige-400">Audience Match</p>
            <p className="text-sm font-bold text-terracotta-400">{summary.audienceMatch}%</p>
          </div>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-warmBeige-500/10 space-y-3">
            {/* Top Topics */}
            <div>
              <p className="text-xs text-warmBeige-400 mb-1.5">Top Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {summary.topTopics.map((topic, index) => (
                  <Badge key={index} variant="glass" size="sm">
                    {topic.name} ({topic.count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Trending Keywords */}
            {summary.trendingKeywords.length > 0 && (
              <div>
                <p className="text-xs text-warmBeige-400 mb-1.5">Trending Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {summary.trendingKeywords.slice(0, 8).map((keyword, index) => (
                    <Badge key={index} variant="glass" size="sm" className="text-terracotta-400">
                      #{keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Key Insights */}
            {summary.keyInsights.length > 0 && (
              <div>
                <p className="text-xs text-warmBeige-400 mb-1.5">Key Insights</p>
                <ul className="space-y-1">
                  {summary.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-warmBeige-300">
                      <span className="text-terracotta-400">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Audience Match Progress */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-warmBeige-400">Audience Match</span>
                <span className="text-warmBeige-100">{summary.audienceMatch}%</span>
              </div>
              <ProgressBar 
                value={summary.audienceMatch} 
                max={100} 
                color="terracotta"
                height="4px"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        {onViewAll && (
          <div className="mt-3 pt-2 border-t border-warmBeige-500/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAll}
              className="w-full text-xs"
            >
              View Full Analysis
              <FiChevronRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AISummary;