import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import ArticleCard from '../articles/ArticleCard';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import { FiFilter, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';

const PublisherArticles = ({ 
  publisherId,
  limit = 10,
  showFilters = true,
  className = '',
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  
  const { getPublisherArticles, getCategories } = useArticles();
  const [categories, setCategories] = useState([]);

  const fetchArticles = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const data = await getPublisherArticles({
        publisherId,
        page: currentPage,
        limit,
        sort: sortBy,
        category: filterCategory,
      });
      
      if (reset) {
        setArticles(data.articles);
      } else {
        setArticles(prev => [...prev, ...data.articles]);
      }
      
      setHasMore(data.hasMore);
      setPage(currentPage + 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [publisherId, page, limit, sortBy, filterCategory, getPublisherArticles]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(publisherId);
      setCategories(data || []);
    };
    fetchCategories();
  }, [publisherId, getCategories]);

  useEffect(() => {
    fetchArticles(true);
  }, [publisherId, sortBy, filterCategory]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchArticles(false);
    }
  };

  const handleRefresh = () => {
    fetchArticles(true);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  if (loading && articles.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="150px" height="24px" />
          <Skeleton variant="button" width="100px" height="40px" />
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
          {[...Array(4)].map((_, i) => (
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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-warmBeige-100">
            Articles ({articles.length})
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          {showFilters && categories.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="views">Most Views</option>
            <option value="likes">Most Liked</option>
            <option value="oldest">Oldest</option>
          </select>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            {viewMode === 'grid' ? <FiList size={18} /> : <FiGrid size={18} />}
          </button>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <EmptyState
          title="No articles published yet"
          description="This publisher hasn't published any articles yet."
          icon="📝"
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'space-y-4'
        }>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant={viewMode === 'grid' ? 'standard' : 'horizontal'}
              showActions={false}
              className="bg-navy-800/30 border-warmBeige-500/5"
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </Button>
        </div>
      )}

      {/* End of Content */}
      {!hasMore && articles.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-warmBeige-500">
            All articles loaded
          </p>
        </div>
      )}
    </div>
  );
};

export default PublisherArticles;