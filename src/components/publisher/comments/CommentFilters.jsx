import React from 'react';
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiMessageSquare,
  FiFlag,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiUser
} from 'react-icons/fi';
import Badge from '../../common/Badge';
import Button from '../../common/Button';

const CommentFilters = ({
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  filterStatus = 'all',
  onFilterStatusChange,
  filterType = 'all',
  onFilterTypeChange,
  sortBy = 'latest',
  onSortChange,
  className = '',
}) => {
  const statusFilters = [
    { value: 'all', label: 'All', icon: <FiMessageSquare size={14} /> },
    { value: 'pending', label: 'Pending', icon: <FiClock size={14} />, count: '12' },
    { value: 'approved', label: 'Approved', icon: <FiCheckCircle size={14} /> },
    { value: 'rejected', label: 'Rejected', icon: <FiXCircle size={14} /> },
    { value: 'flagged', label: 'Flagged', icon: <FiFlag size={14} />, count: '3' },
    { value: 'spam', label: 'Spam', icon: <FiFlag size={14} /> },
  ];

  const typeFilters = [
    { value: 'all', label: 'All Types' },
    { value: 'comment', label: 'Comments' },
    { value: 'reply', label: 'Replies' },
    { value: 'verified', label: 'Verified Users' },
    { value: 'new', label: 'New Users' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First', icon: <FiTrendingDown size={14} /> },
    { value: 'oldest', label: 'Oldest First', icon: <FiTrendingUp size={14} /> },
    { value: 'popular', label: 'Most Liked', icon: <FiStar size={14} /> },
    { value: 'controversial', label: 'Most Disliked', icon: <FiFlag size={14} /> },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500" />
          <input
            type="text"
            placeholder="Search comments, authors, or content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearchSubmit && onSearchSubmit()}
            className="
              w-full pl-10 pr-4 py-2.5
              bg-navy-800/50 border border-warmBeige-500/20
              rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
              focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
              transition-all duration-300
            "
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSearchSubmit && onSearchSubmit()}
          icon={<FiSearch size={16} />}
        >
          Search
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-warmBeige-400 mr-1">Status:</span>
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterStatusChange(filter.value)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all
              ${filterStatus === filter.value 
                ? 'bg-terracotta-500 text-white' 
                : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 border border-warmBeige-500/10'
              }
            `}
          >
            {filter.icon}
            {filter.label}
            {filter.count && (
              <Badge 
                variant={filterStatus === filter.value ? 'glass' : 'glass'} 
                size="xs"
              >
                {filter.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Type Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-warmBeige-400 mr-1">Type:</span>
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterTypeChange(filter.value)}
              className={`
                px-3 py-1 rounded-lg text-xs font-medium transition-all
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

        <div className="flex items-center gap-2">
          <FiFilter className="text-warmBeige-500" size={14} />
          <span className="text-xs text-warmBeige-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
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

      {/* Active Filters */}
      {(filterStatus !== 'all' || filterType !== 'all' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-warmBeige-500/10">
          <span className="text-xs text-warmBeige-400">Active filters:</span>
          {filterStatus !== 'all' && (
            <Badge 
              variant="glass" 
              size="sm" 
              className="flex items-center gap-1 cursor-pointer hover:bg-red-500/10"
              onClick={() => onFilterStatusChange('all')}
            >
              Status: {filterStatus}
              <span className="text-warmBeige-500">✕</span>
            </Badge>
          )}
          {filterType !== 'all' && (
            <Badge 
              variant="glass" 
              size="sm" 
              className="flex items-center gap-1 cursor-pointer hover:bg-red-500/10"
              onClick={() => onFilterTypeChange('all')}
            >
              Type: {filterType}
              <span className="text-warmBeige-500">✕</span>
            </Badge>
          )}
          {searchQuery && (
            <Badge 
              variant="glass" 
              size="sm" 
              className="flex items-center gap-1 cursor-pointer hover:bg-red-500/10"
              onClick={() => onSearchChange('')}
            >
              Search: {searchQuery}
              <span className="text-warmBeige-500">✕</span>
            </Badge>
          )}
          <button
            onClick={() => {
              onFilterStatusChange('all');
              onFilterTypeChange('all');
              onSearchChange('');
            }}
            className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentFilters;