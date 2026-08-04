import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiX,
  FiFilter,
  FiGrid,
  FiList,
  FiClock,
  FiTrendingUp,
  FiStar,
  FiRefreshCw,
  FiArrowLeft
} from 'react-icons/fi';
import { useArticles } from '../../hooks/useArticles';
import { useDebounce } from '../../hooks/useDebounce';
import ArticleCard from '../../components/articles/ArticleCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import EmptyState from '../../components/common/EmptyState';
import Toast from '../../components/common/Toast';
import Card from '../../components/common/Card';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchArticles, loading, error } = useArticles();

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else if (query === '') {
      setResults([]);
      setTotalResults(0);
    }
  }, [debouncedQuery, sortBy, filterType]);

  const performSearch = async (searchQuery) => {
    try {
      const params = {
        query: searchQuery,
        sort: sortBy,
        type: filterType === 'all' ? undefined : filterType,
        limit: 20,
      };
      const data = await searchArticles(searchQuery, params);
      setResults(data.articles || []);
      setTotalResults(data.total || 0);
      setSearchParams({ q: searchQuery });
    } catch (err) {
      setToastData({
        message: err.message || 'Search failed',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setTotalResults(0);
    setSearchParams({});
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'views', label: 'Most Views' },
    { value: 'likes', label: 'Most Liked' },
  ];

  const typeFilters = [
    { value: 'all', label: 'All' },
    { value: 'article', label: 'Articles' },
    { value: 'publisher', label: 'Publishers' },
    { value: 'author', label: 'Authors' },
    { value: 'tag', label: 'Tags' },
  ];

  const renderResults = () => {
    if (loading) {
      return (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
          : 'space-y-4'
        }>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height={viewMode === 'grid' ? '280px' : '150px'} />
          ))}
        </div>
      );
    }

    if (results.length === 0 && query) {
      return (
        <EmptyState
          title="No results found"
          description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
          icon="🔍"
          action={
            <Button variant="outline" onClick={handleClear}>
              Clear Search
            </Button>
          }
        />
      );
    }

    return (
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
        : 'space-y-4'
      }>
        {results.map((result) => (
          <ArticleCard
            key={result.id}
            article={result}
            variant={viewMode === 'grid' ? 'standard' : 'horizontal'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      {/* Search Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-warmBeige-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, publishers, topics..."
            className="
              w-full pl-12 pr-12 py-3.5
              bg-navy-800/50 border border-warmBeige-500/20
              rounded-2xl text-warmBeige-100 placeholder-warmBeige-500/50
              focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
              transition-all duration-300
              text-lg
            "
            autoFocus
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-warmBeige-500 hover:text-warmBeige-100 transition-colors"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Search Stats & Filters */}
      {query && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="glass" size="md">
                {totalResults} results
              </Badge>
              <span className="text-sm text-warmBeige-400">
                for "{query}"
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={<FiRefreshCw />}
                onClick={() => performSearch(query)}
              />
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
              >
                <FiList size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <Card variant="glass" padding="md">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-warmBeige-400">Type:</span>
                {typeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterType(filter.value)}
                    className={`
                      px-3 py-1 rounded-lg text-sm font-medium transition-all
                      ${filterType === filter.value 
                        ? 'bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30' 
                        : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <FiFilter className="text-warmBeige-500" size={14} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
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

          {/* Results */}
          {renderResults()}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Search BartaOne</h2>
          <p className="text-warmBeige-400">
            Find articles, publishers, and topics that interest you
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Technology', 'Business', 'Science', 'Health', 'Politics', 'Entertainment'].map((topic) => (
              <button
                key={topic}
                onClick={() => setQuery(topic)}
                className="px-4 py-2 rounded-full bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 border border-warmBeige-500/10 transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;