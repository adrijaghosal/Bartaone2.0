import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import FeedCard from './FeedCard';
import CategoryFilter from './CategoryFilter';
import FeaturedArticles from './FeaturedArticles';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import { FiRefreshCw, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { useArticles } from '../../hooks/useArticles';

const NewsFeed = ({ 
  initialCategory = 'all',
  showFeatured = true,
  showFilters = true,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'popular', 'trending'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const {
    articles,
    loading,
    error,
    hasMore,
    fetchArticles,
    loadMore,
    refreshArticles,
    totalCount,
  } = useArticles();

  // Fetch articles on category or sort change
  useEffect(() => {
    fetchArticles({
      category: selectedCategory,
      sort: sortBy,
      limit: 10,
    });
  }, [selectedCategory, sortBy, fetchArticles]);

  // Infinite scroll
  const lastArticleRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleRefresh = useCallback(async () => {
    await refreshArticles();
  }, [refreshArticles]);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  // Loading skeletons
  if (loading && articles.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showFeatured && (
          <div className="mb-6">
            <Skeleton variant="card" height="300px" />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="100px" height="40px" />
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height={viewMode === 'grid' ? '280px' : '150px'} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Failed to load articles: {error}</p>
        <Button onClick={handleRefresh} icon={<FiRefreshCw />}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Featured Articles */}
      {showFeatured && articles.length > 0 && (
        <div className="mb-6">
          <FeaturedArticles articles={articles.slice(0, 3)} />
        </div>
      )}

      {/* Filters Section */}
      {showFilters && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 hover:bg-navy-700/50 transition-all"
              >
                <FiFilter size={18} />
                <span className="text-sm capitalize">{sortBy}</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl shadow-2xl animate-slideDown z-20">
                  {['latest', 'popular', 'trending', 'oldest'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        handleSortChange(option);
                        setShowFilterDropdown(false);
                      }}
                      className={`
                        w-full px-4 py-2.5 text-left text-sm transition-all
                        ${sortBy === option 
                          ? 'bg-terracotta-500/20 text-terracotta-400' 
                          : 'text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100'
                        }
                      `}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Toggle */}
            <button
              onClick={toggleViewMode}
              className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              {viewMode === 'grid' ? <FiList size={20} /> : <FiGrid size={20} />}
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Article Count */}
      {articles.length > 0 && (
        <div className="flex items-center justify-between text-sm text-warmBeige-400">
          <span>Showing {articles.length} of {totalCount} articles</span>
          <span className="hidden md:inline">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      )}

      {/* Articles Grid/List */}
      {articles.length === 0 && !loading ? (
        <EmptyState
          title="No articles found"
          description="Try adjusting your filters or check back later for new content."
          icon="📰"
          action={
            <Button onClick={() => {
              setSelectedCategory('all');
              setSortBy('latest');
            }}>
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {articles.map((article, index) => (
            <div
              key={article.id}
              ref={index === articles.length - 1 ? lastArticleRef : null}
            >
              <FeedCard 
                article={article} 
                variant={viewMode === 'grid' ? 'card' : 'horizontal'}
              />
            </div>
          ))}
        </div>
      )}

      {/* Loading More */}
      {loading && articles.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-3 text-warmBeige-400">
            <div className="w-5 h-5 border-2 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading more articles...</span>
          </div>
        </div>
      )}

      {/* End of Content */}
      {!hasMore && articles.length > 0 && (
        <div className="text-center py-8">
          <p className="text-warmBeige-500 text-sm">You've reached the end of the feed</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;