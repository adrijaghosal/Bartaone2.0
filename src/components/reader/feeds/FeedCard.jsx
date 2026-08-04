import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBookmark, 
  FiMessageSquare, 
  FiShare2, 
  FiHeart,
  FiClock,
  FiEye,
  FiTrendingUp
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBookmarks } from '../../hooks/useBookmarks';

const FeedCard = ({ 
  article, 
  variant = 'card', // 'card' or 'horizontal'
  featured = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes || 0);

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
  } = article;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    } else {
      navigator.clipboard.writeText(window.location.href + `/article/${id}`);
      // Show toast notification
    }
  };

  const CardContent = () => (
    <div className="flex flex-col h-full">
      {/* Category and Trending Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="primary" size="sm">{category}</Badge>
          {trending && (
            <Badge variant="warning" size="sm" icon={<FiTrendingUp size={12} />}>
              Trending
            </Badge>
          )}
          {featured && (
            <Badge variant="glass" size="sm">Featured</Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-warmBeige-400">
          <FiClock size={12} />
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-warmBeige-100 line-clamp-2 hover:text-terracotta-400 transition-colors mb-2">
        {title}
      </h3>

      {/* Excerpt */}
      {variant === 'card' && (
        <p className="text-warmBeige-400 text-sm line-clamp-2 flex-1 mb-3">
          {excerpt}
        </p>
      )}

      {/* Cover Image */}
      {coverImage && variant === 'card' && (
        <div className="relative -mx-6 -mt-2 mb-3 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
        </div>
      )}

      {/* Horizontal Layout Image */}
      {coverImage && variant === 'horizontal' && (
        <div className="flex-shrink-0 w-40 h-full overflow-hidden">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Author & Publisher Info */}
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-warmBeige-500/10">
        <Avatar 
          src={author?.avatar} 
          alt={author?.name}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-warmBeige-100 truncate">
            {author?.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-warmBeige-400">
            <span>{publisher?.name}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-warmBeige-500/10">
        <div className="flex items-center gap-4 text-sm text-warmBeige-400">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-all ${liked ? 'text-red-400' : 'hover:text-red-400'}`}
          >
            <FiHeart className={liked ? 'fill-red-400' : ''} size={16} />
            <span>{likesCount}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-warmBeige-100 transition-all">
            <FiMessageSquare size={16} />
            <span>{comments || 0}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-warmBeige-100 transition-all">
            <FiEye size={16} />
            <span>{views || 0}</span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-lg transition-all ${isBookmarked(id) ? 'text-terracotta-400 bg-terracotta-500/20' : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'}`}
          >
            <FiBookmark size={16} className={isBookmarked(id) ? 'fill-terracotta-400' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiShare2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/article/${id}`}
        className={`
          flex gap-4 p-4 rounded-2xl
          bg-gradient-to-br from-navy-800/50 to-navy-900/50
          border border-warmBeige-500/10
          hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
          transition-all duration-300
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {coverImage && (
          <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">{category}</Badge>
            {trending && (
              <Badge variant="warning" size="sm" icon={<FiTrendingUp size={12} />}>
                Trending
              </Badge>
            )}
          </div>
          <h3 className="text-base font-semibold text-warmBeige-100 line-clamp-2 hover:text-terracotta-400 transition-colors">
            {title}
          </h3>
          <p className="text-warmBeige-400 text-sm line-clamp-1 mt-1">{excerpt}</p>
          <div className="flex items-center gap-3 mt-2">
            <Avatar src={author?.avatar} alt={author?.name} size="xs" />
            <span className="text-sm text-warmBeige-400">{author?.name}</span>
            <span className="text-warmBeige-500">•</span>
            <span className="text-sm text-warmBeige-400">{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/article/${id}`}
      className={`
        block p-6 rounded-2xl h-full
        bg-gradient-to-br from-navy-800/50 to-navy-900/50
        border border-warmBeige-500/10
        hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
        transition-all duration-300 transform hover:-translate-y-1
        ${featured ? 'border-terracotta-500/30 shadow-lg shadow-terracotta-500/10' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent />
    </Link>
  );
};

export default FeedCard;