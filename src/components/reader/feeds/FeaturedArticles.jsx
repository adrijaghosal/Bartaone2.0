import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiClock,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import { formatDistanceToNow } from 'date-fns';

const FeaturedArticles = ({ 
  articles = [], 
  autoPlay = true,
  interval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoPlay || articles.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex, articles.length]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-warmBeige-400">
        No featured articles available
      </div>
    );
  }

  const featured = articles[0];
  const remainingArticles = articles.slice(1, 4);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Featured Article - Full Width Hero */}
      <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 border border-warmBeige-500/10">
        {/* Background Image with Overlay */}
        <div className="relative h-80 md:h-96 lg:h-[420px] overflow-hidden">
          {featured.coverImage ? (
            <>
              <img 
                src={featured.coverImage} 
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta-500/30 to-navy-800/50 flex items-center justify-center">
              <span className="text-6xl opacity-30">📰</span>
            </div>
          )}
          
          {/* Featured Badge */}
          <Badge 
            variant="glass" 
            size="md"
            className="absolute top-6 left-6 z-10 backdrop-blur-lg"
            icon={<FiStar className="text-yellow-400" />}
          >
            Featured
          </Badge>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="primary" size="sm">{featured.category}</Badge>
                {featured.trending && (
                  <Badge variant="warning" size="sm" icon={<FiTrendingUp size={12} />}>
                    Trending
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-sm text-warmBeige-400">
                  <FiClock size={14} />
                  {formatDistanceToNow(new Date(featured.publishedAt), { addSuffix: true })}
                </span>
              </div>

              <Link to={`/article/${featured.id}`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white hover:text-terracotta-400 transition-colors line-clamp-2">
                  {featured.title}
                </h2>
              </Link>

              <p className="text-warmBeige-300 mt-2 line-clamp-2 text-sm md:text-base">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <Avatar 
                  src={featured.author?.avatar} 
                  alt={featured.author?.name}
                  size="sm"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {featured.author?.name}
                  </p>
                  <p className="text-xs text-warmBeige-400">
                    {featured.publisher?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {articles.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-900/80 backdrop-blur-sm text-white hover:bg-terracotta-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy-900/80 backdrop-blur-sm text-white hover:bg-terracotta-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {articles.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${index === currentIndex 
                    ? 'w-8 h-2 bg-terracotta-500' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* Secondary Featured Articles - Grid */}
      {remainingArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {remainingArticles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group p-4 rounded-2xl bg-navy-800/50 border border-warmBeige-500/10 hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary" size="sm">{article.category}</Badge>
                    {article.trending && (
                      <Badge variant="warning" size="sm">🔥</Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-warmBeige-400 mt-1 line-clamp-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar 
                      src={article.author?.avatar} 
                      alt={article.author?.name}
                      size="xs"
                    />
                    <span className="text-xs text-warmBeige-400">
                      {article.author?.name}
                    </span>
                    <span className="text-warmBeige-500">•</span>
                    <span className="text-xs text-warmBeige-400">
                      {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                {article.coverImage && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Article Counter */}
      {articles.length > 1 && (
        <div className="text-center text-sm text-warmBeige-500">
          {currentIndex + 1} of {articles.length}
        </div>
      )}
    </div>
  );
};

export default FeaturedArticles;