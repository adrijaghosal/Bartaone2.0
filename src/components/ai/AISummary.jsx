// src/components/ai/AISummary.jsx
import React, { useState } from 'react';
import { FiSparkles, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';

const AISummary = ({ articles = [], onViewAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (articles.length === 0) {
    return null;
  }

  const summary = articles.length === 1 
    ? `AI Summary: ${articles[0].title || 'Article'} - ${articles[0].excerpt || 'Read more about this topic.'}`
    : `AI Summary: ${articles.length} articles on similar topics. ${articles.map(a => a.title).join(', ')}`;

  return (
    <Card variant="gradient" padding="md" className="border-terracotta-500/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-terracotta-500/20 flex items-center justify-center">
          <FiSparkles className="text-terracotta-400" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-warmBeige-100">AI Summary</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-terracotta-500/20 text-terracotta-400">Powered by AI</span>
          </div>
          <p className={`text-sm text-warmBeige-400 mt-1 ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {summary}
          </p>
          {articles.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors mt-1 flex items-center gap-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
              {isExpanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </button>
          )}
        </div>
        {onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="flex-shrink-0"
          >
            View all
            <FiArrowRight className="ml-1" size={14} />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AISummary;
