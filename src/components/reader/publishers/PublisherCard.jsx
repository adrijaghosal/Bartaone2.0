import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiFileText, 
  FiEye, 
  FiStar,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import FollowButton from './FollowButton';
import { formatDistanceToNow } from 'date-fns';

const PublisherCard = ({ 
  publisher,
  variant = 'standard', // 'standard', 'compact', 'featured'
  showFollow = true,
  className = '',
  onClick,
}) => {
  const {
    id,
    name,
    logo,
    avatar,
    tagline,
    bio,
    verified,
    premium,
    followerCount,
    articleCount,
    totalViews,
    joinedAt,
    categories,
    trending,
    coverImage,
  } = publisher;

  // Standard Card
  if (variant === 'standard') {
    return (
      <Link 
        to={`/publisher/${id}`}
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
        {coverImage && (
          <div className="h-24 overflow-hidden">
            <img 
              src={coverImage} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={`p-6 ${coverImage ? '-mt-12' : ''}`}>
          <div className="flex items-start gap-4">
            <Avatar 
              src={logo || avatar} 
              alt={name}
              size="lg"
              className={`${coverImage ? 'border-2 border-navy-900' : ''}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
                  {name}
                </h3>
                {verified && (
                  <Badge variant="success" size="xs">✓</Badge>
                )}
                {premium && (
                  <Badge variant="glass" size="xs">Premium</Badge>
                )}
                {trending && (
                  <Badge variant="warning" size="xs">
                    <FiTrendingUp size={10} />
                  </Badge>
                )}
              </div>
              {tagline && (
                <p className="text-sm text-warmBeige-400 line-clamp-1">
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {bio && (
            <p className="text-sm text-warmBeige-400 line-clamp-2 mt-3">
              {bio}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-warmBeige-500/10">
            <div className="flex items-center gap-1 text-sm text-warmBeige-400">
              <FiUsers size={14} />
              <span>{followerCount || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-warmBeige-400">
              <FiFileText size={14} />
              <span>{articleCount || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-warmBeige-400">
              <FiEye size={14} />
              <span>{totalViews || 0}</span>
            </div>
            {joinedAt && (
              <div className="flex items-center gap-1 text-sm text-warmBeige-400">
                <FiClock size={14} />
                <span>{formatDistanceToNow(new Date(joinedAt), { addSuffix: true })}</span>
              </div>
            )}
          </div>

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="glass" size="xs">
                  {category}
                </Badge>
              ))}
              {categories.length > 3 && (
                <Badge variant="glass" size="xs">
                  +{categories.length - 3}
                </Badge>
              )}
            </div>
          )}

          {showFollow && (
            <div className="mt-4 pt-4 border-t border-warmBeige-500/10">
              <FollowButton publisherId={id} size="sm" fullWidth />
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Compact Card
  if (variant === 'compact') {
    return (
      <Link
        to={`/publisher/${id}`}
        className={`
          flex items-center gap-3 p-3 rounded-xl
          bg-navy-800/30 hover:bg-navy-800/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          transition-all duration-300 group
          ${className}
        `}
        onClick={onClick}
      >
        <Avatar src={logo || avatar} alt={name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-medium text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
              {name}
            </h4>
            {verified && <Badge variant="success" size="xs">✓</Badge>}
          </div>
          {tagline && (
            <p className="text-xs text-warmBeige-400 truncate">{tagline}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-warmBeige-400 mt-1">
            <span>{followerCount || 0} followers</span>
            <span>•</span>
            <span>{articleCount || 0} articles</span>
          </div>
        </div>
        {showFollow && <FollowButton publisherId={id} size="sm" />}
      </Link>
    );
  }

  // Featured Card
  if (variant === 'featured') {
    return (
      <Link
        to={`/publisher/${id}`}
        className={`
          block group relative rounded-3xl overflow-hidden
          ${className}
        `}
        onClick={onClick}
      >
        <div className="relative h-64 md:h-80">
          {coverImage ? (
            <>
              <img 
                src={coverImage} 
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta-500/30 to-navy-800/50 flex items-center justify-center">
              <span className="text-6xl opacity-30">📰</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start gap-4">
              <Avatar 
                src={logo || avatar} 
                alt={name}
                size="lg"
                className="border-2 border-white/20"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-terracotta-400 transition-colors">
                    {name}
                  </h3>
                  {verified && <Badge variant="success" size="sm">✓</Badge>}
                  {premium && <Badge variant="glass" size="sm">Premium</Badge>}
                </div>
                {tagline && (
                  <p className="text-warmBeige-300 text-sm line-clamp-1">{tagline}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-warmBeige-400">
                  <span>{followerCount || 0} followers</span>
                  <span>•</span>
                  <span>{articleCount || 0} articles</span>
                  <span>•</span>
                  <span>{totalViews || 0} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default PublisherCard;