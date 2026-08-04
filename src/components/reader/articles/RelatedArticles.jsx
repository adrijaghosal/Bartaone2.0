import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiEye } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useArticles } from '../../hooks/useArticles';
import ArticleCard from './ArticleCard';
import Skeleton from '../common/Skeleton';
import Button from '../common/Button';
import Badge from '../common/Badge';

const RelatedArticles = ({ 
  articleId, 
  category, 
  tags = [],
  limit = 4,
  showTitle = true,
  className = '',
}) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getRelatedArticles } = useArticles();

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const articles = await getRelatedArticles({
          articleId,
          category,
          tags,
          limit,
        });
        setRelatedArticles(articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchRelated();
    }
  }, [articleId, category, tags, limit, getRelatedArticles]);

  if (loading) {
    return (
      <div className={`mt-8 ${className}`}>
        <Skeleton variant="title" width="200px" height="28px" className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(limit)].map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" />
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className={`mt-8 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-warmBeige-100">
            Related Articles
          </h3>
          <Link 
            to={`/feed?category=${category}`}
            className="flex items-center gap-1 text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors"
          >
            View all
            <FiArrowRight size={16} />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedArticles.slice(0, limit).map((article) => (
          <ArticleCard 
            key={article.id}
            article={article}
            variant="horizontal"
            showActions={false}
            className="bg-navy-800/30 border-warmBeige-500/5"
          />
        ))}
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 8).map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${tag}`}
                className="px-3 py-1.5 rounded-full bg-navy-800/50 text-warmBeige-400 text-xs hover:text-terracotta-400 hover:bg-terracotta-500/20 transition-all border border-warmBeige-500/10"
              >
                #{tag}
              </Link>
            ))}
            {tags.length > 8 && (
              <button className="px-3 py-1.5 rounded-full text-warmBeige-400 text-xs hover:text-warmBeige-100 transition-all">
                +{tags.length - 8} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* You might also like */}
      {relatedArticles.length > 2 && (
        <div className="mt-6 p-4 rounded-2xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📚</span>
            <h4 className="text-sm font-medium text-warmBeige-200">
              You might also like
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedArticles.slice(0, 4).map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group p-3 rounded-xl bg-navy-800/50 hover:bg-navy-700/50 transition-all border border-warmBeige-500/5 hover:border-terracotta-500/20"
              >
                {article.coverImage && (
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <h5 className="text-sm font-medium text-warmBeige-100 group-hover:text-terracotta-400 transition-colors line-clamp-2">
                  {article.title}
                </h5>
                <div className="flex items-center gap-2 mt-1 text-xs text-warmBeige-400">
                  <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiEye size={10} /> {article.views || 0}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;