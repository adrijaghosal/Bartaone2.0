import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiCalendar,
  FiTrendingUp,
  FiClock,
  FiStar,
  FiZap,
  FiSettings,
  FiSliders
} from 'react-icons/fi';
import { useArticles } from '../../hooks/useArticles';
import { useAuth } from '../../hooks/useAuth';
import NewsFeed from '../../components/reader/feeds/NewsFeed';
import PersonalizedFeed from '../../components/ai/PersonalizedFeed';
import CategoryFilter from '../../components/reader/feeds/CategoryFilter';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';

const FeedPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getArticles, loading } = useArticles();

  const [viewMode, setViewMode] = useState('personalized');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');
  const [showFilters, setShowFilters] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [feedArticles, setFeedArticles] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(false);

  const viewModes = [
    { id: 'personalized', label: 'AI Personalized', icon: <FiZap /> },
    { id: 'latest', label: 'Latest', icon: <FiClock /> },
    { id: 'trending', label: 'Trending', icon: <FiTrendingUp /> },
    { id: 'top', label: 'Top Rated', icon: <FiStar /> },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'views', label: 'Most Views' },
    { value: 'likes', label: 'Most Liked' },
  ];

  useEffect(() => {
    fetchFeed();
  }, [viewMode, selectedCategory, sortBy]);

  const fetchFeed = async () => {
    if (viewMode === 'personalized') return;

    setLoadingFeed(true);
    try {
      const params = {
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        sort: sortBy,
        limit: 20,
      };
      
      if (viewMode === 'trending') {
        // Fetch trending
        const data = await getArticles({ ...params, trending: true });
        setFeedArticles(data.articles || []);
      } else if (viewMode === 'top') {
        // Fetch top rated
        const data = await getArticles({ ...params, topRated: true });
        setFeedArticles(data.articles || []);
      } else {
        const data = await getArticles(params);
        setFeedArticles(data.articles || []);
      }
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to load feed',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setLoadingFeed(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category, sort: sortBy });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setSearchParams({ category: selectedCategory, sort });
  };

  const handleRefresh = () => {
    fetchFeed();
    setToastData({
      message: 'Feed refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="space-y-6">
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
            {viewMode === 'personalized' ? (
              <>
                <FiZap className="text-yellow-400" />
                AI Personalized Feed
              </>
            ) : (
              <>
                {viewMode === 'latest' && <FiClock className="text-terracotta-400" />}
                {viewMode === 'trending' && <FiTrendingUp className="text-terracotta-400" />}
                {viewMode === 'top' && <FiStar className="text-yellow-400" />}
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Feed
              </>
            )}
            <Badge variant="glass" size="sm">
              {viewMode === 'personalized' ? 'AI Curated' : 'All Articles'}
            </Badge>
          </h1>
          <p className="text-sm text-warmBeige-400 mt-1">
            {viewMode === 'personalized' 
              ? 'Curated just for you based on your reading habits'
              : `Showing ${viewMode} articles${selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}`
            }
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            icon={<FiSliders />}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => toggleViewMode(mode.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${viewMode === mode.id 
                ? 'bg-terracotta-500 text-white' 
                : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
              }
            `}
          >
            {mode.icon}
            {mode.label}
          </button>
        ))}
      </div>

      {/* Filters Section */}
      {showFilters && (
        <Card variant="glass" padding="md" className="animate-slideDown">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-warmBeige-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 rounded-lg bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Feed Content */}
      {viewMode === 'personalized' ? (
        <PersonalizedFeed 
          showRecommendations={true}
          showSummary={true}
        />
      ) : (
        <NewsFeed 
          initialCategory={selectedCategory}
          showFeatured={viewMode === 'latest'}
          showFilters={false}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default FeedPage;