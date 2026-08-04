import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBookmark, 
  FiHeart, 
  FiMessageSquare, 
  FiClock,
  FiEye,
  FiShare2,
  FiMoreHorizontal
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useAuth } from '../../hooks/useAuth';

const ArticleCard = ({ 
  article,
  variant = 'standard', // 'standard', 'compact', 'featured', 'horizontal'
  showActions = true,
  className = '',
  onClick,
}) => {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [liked, setLiked] = useState(article.isLiked || false);
  const [likesCount, setLikesCount] = useState(article.likes || 0);
  const [showOptions, setShowOptions] = useState(false);

  const {
    id,
    title,
    excerpt,
    coverImage,
    category,
    author,
    publisher,
    publishedAt,
    readTime,
    views,
    comments,
    trending,
    exclusive,
    premium,
  } = article;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleBookmark(id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href + `/article/${id}`,
      });
    }
  };

  // Standard Card (Default)
  if (variant === 'standard') {
    return (
      <Link 
        to={`/article/${id}`}
        className={`
          block group
          bg-gradient-to-br from-navy-800/50 to-navy-900/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          rounded-2xl overflow-hidden
          transition-all duration-300 hover:shadow-xl hover:shadow-terracotta-500/5 hover:-translate-y-1
          ${className}
        `}
        onClick={onClick}
      >
        {/* Cover Image */}
        {coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge variant="primary" size="sm">{category}</Badge>
              {trending && <Badge variant="warning" size="sm">🔥 Trending</Badge>}
              {exclusive && <Badge variant="glass" size="sm">Exclusive</Badge>}
              {premium && <Badge variant="success" size="sm">Premium</Badge>}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!coverImage && (
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" size="sm">{category}</Badge>
              {trending && <Badge variant="warning" size="sm">🔥</Badge>}
            </div>
          )}

          <h3 className="text-lg font-semibold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          <p className="text-warmBeige-400 text-sm line-clamp-2 mb-3">
            {excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar 
                src={author?.avatar} 
                alt={author?.name}
                size="sm"
              />
              <div>
                <p className="text-xs font-medium text-warmBeige-100 truncate max-w-[120px]">
                  {author?.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-warmBeige-400">
                  <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{readTime}m read</span>
                </div>
              </div>
            </div>

            {showActions && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleLike}
                  className={`p-1.5 rounded-lg transition-all ${liked ? 'text-red-400 bg-red-500/10' : 'text-warmBeige-400 hover:text-red-400 hover:bg-red-500/10'}`}
                >
                  <FiHeart className={liked ? 'fill-red-400' : ''} size={16} />
                </button>
                <button
                  onClick={handleBookmark}
                  className={`p-1.5 rounded-lg transition-all ${isBookmarked(id) ? 'text-terracotta-400 bg-terracotta-500/10' : 'text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10'}`}
                >
                  <FiBookmark className={isBookmarked(id) ? 'fill-terracotta-400' : ''} size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Compact Card
  if (variant === 'compact') {
    return (
      <Link 
        to={`/article/${id}`}
        className={`
          flex items-start gap-3 p-3 rounded-xl
          bg-navy-800/30 hover:bg-navy-800/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          transition-all duration-300 group
          ${className}
        `}
        onClick={onClick}
      >
        {coverImage && (
          <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="xs">{category}</Badge>
            {trending && <Badge variant="warning" size="xs">🔥</Badge>}
          </div>
          <h4 className="text-sm font-medium text-warmBeige-100 group-hover:text-terracotta-400 transition-colors line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-warmBeige-400">
            <span>{author?.name}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Featured Card (Large)
  if (variant === 'featured') {
    return (
      <Link 
        to={`/article/${id}`}
        className={`
          block group relative rounded-3xl overflow-hidden
          ${className}
        `}
        onClick={onClick}
      >
        <div className="relative h-96 lg:h-[500px]">
          {coverImage ? (
            <>
              <img 
                src={coverImage} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta-500/30 to-navy-800/50 flex items-center justify-center">
              <span className="text-6xl opacity-30">📰</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="primary" size="md">{category}</Badge>
              {trending && <Badge variant="warning" size="md">🔥 Trending</Badge>}
              {exclusive && <Badge variant="glass" size="md">Exclusive</Badge>}
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-white group-hover:text-terracotta-400 transition-colors line-clamp-2 mb-2">
              {title}
            </h2>
            <p className="text-warmBeige-300 line-clamp-2 mb-4 max-w-2xl">
              {excerpt}
            </p>
            <div className="flex items-center gap-4">
              <Avatar src={author?.avatar} alt={author?.name} size="md" />
              <div>
                <p className="text-sm font-medium text-white">{author?.name}</p>
                <div className="flex items-center gap-2 text-xs text-warmBeige-400">
                  <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Horizontal Card
  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/article/${id}`}
        className={`
          flex flex-col sm:flex-row gap-4 p-4 rounded-2xl
          bg-navy-800/30 hover:bg-navy-800/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          transition-all duration-300 group
          ${className}
        `}
        onClick={onClick}
      >
        {coverImage && (
          <div className="flex-shrink-0 sm:w-48 h-48 rounded-xl overflow-hidden">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="primary" size="sm">{category}</Badge>
            {trending && <Badge variant="warning" size="sm">🔥</Badge>}
          </div>
          <h3 className="text-lg font-semibold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-warmBeige-400 text-sm line-clamp-2 mb-3">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar src={author?.avatar} alt={author?.name} size="sm" />
              <span className="text-sm text-warmBeige-100">{author?.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-warmBeige-400">
              <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
              <span>•</span>
              <span>{readTime} min read</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiEye size={12} /> {views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default ArticleCard;