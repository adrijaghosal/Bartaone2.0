// src/components/articles/ArticleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark, FiHeart, FiMessageSquare, FiEye, FiClock } from 'react-icons/fi';
import Card from '../common/Card';
import Badge from '../common/Badge';

const ArticleCard = ({ 
  article, 
  variant = 'standard',
  className = '',
  onClick,
}) => {
  const {
    id,
    title,
    excerpt,
    coverImage,
    category,
    tags = [],
    author,
    publisher,
    publishedAt,
    readTime,
    views = 0,
    likes = 0,
    comments = 0,
    isBookmarked = false,
    isFeatured = false,
    isPremium = false,
  } = article || {};

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'horizontal':
        return 'flex flex-row gap-4';
      case 'compact':
        return 'flex flex-row gap-3 p-3';
      default:
        return '';
    }
  };

  return (
    <Link to={`/article/${id}`} onClick={onClick} className="block group">
      <Card 
        variant="glass" 
        padding={variant === 'compact' ? 'sm' : 'md'}
        className={`${getVariantClasses()} ${className} hover:border-terracotta-500/30 transition-all duration-300`}
        hover
      >
        {coverImage && variant !== 'compact' && (
          <div className={`relative overflow-hidden ${variant === 'horizontal' ? 'w-1/3 flex-shrink-0' : 'w-full'}`}>
            <img
              src={coverImage}
              alt={title || 'Article'}
              className={`w-full ${variant === 'horizontal' ? 'h-full object-cover' : 'h-48 object-cover'} transition-transform duration-300 group-hover:scale-105`}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/0A1628/7795B1?text=No+Image';
              }}
            />
            {isFeatured && (
              <Badge variant="solid" className="absolute top-2 left-2 bg-yellow-500 text-black">
                Featured
              </Badge>
            )}
            {isPremium && (
              <Badge variant="solid" className="absolute top-2 right-2 bg-purple-500 text-white">
                Premium
              </Badge>
            )}
          </div>
        )}

        <div className={`flex-1 ${variant === 'compact' ? 'flex items-center gap-3' : 'space-y-2'}`}>
          {category && (
            <Badge variant="glass" size="sm">
              {category}
            </Badge>
          )}

          <h3 className={`font-bold text-warmBeige-100 ${variant === 'compact' ? 'text-sm' : 'text-lg'} line-clamp-2 group-hover:text-terracotta-400 transition-colors`}>
            {title || 'Untitled Article'}
          </h3>

          {excerpt && variant !== 'compact' && (
            <p className="text-sm text-warmBeige-400 line-clamp-2">
              {excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-warmBeige-500">
            {author && (
              <span className="text-warmBeige-300">{author.name || 'Unknown Author'}</span>
            )}
            {publisher && !author && (
              <span className="text-warmBeige-300">{publisher.name}</span>
            )}
            {publishedAt && (
              <span className="flex items-center gap-1">
                <FiClock size={12} />
                {formatDate(publishedAt)}
              </span>
            )}
            {readTime && (
              <span>{readTime} min read</span>
            )}
          </div>

          {variant !== 'compact' && (
            <div className="flex items-center gap-4 text-xs text-warmBeige-500">
              {views > 0 && (
                <span className="flex items-center gap-1">
                  <FiEye size={14} />
                  {views}
                </span>
              )}
              {likes > 0 && (
                <span className="flex items-center gap-1">
                  <FiHeart size={14} />
                  {likes}
                </span>
              )}
              {comments > 0 && (
                <span className="flex items-center gap-1">
                  <FiMessageSquare size={14} />
                  {comments}
                </span>
              )}
            </div>
          )}
        </div>

        {variant === 'compact' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex-shrink-0 p-1.5 rounded-lg text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all"
          >
            <FiBookmark size={16} className={isBookmarked ? 'fill-terracotta-400 text-terracotta-400' : ''} />
          </button>
        )}
      </Card>
    </Link>
  );
};

export default ArticleCard;
