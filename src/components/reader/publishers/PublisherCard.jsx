// src/components/reader/publishers/PublisherCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiCheckCircle } from 'react-icons/fi';
import Card from '../../common/Card';
import Avatar from '../../common/Avatar';

const PublisherCard = ({ publisher, variant = 'compact' }) => {
  const {
    id,
    name,
    logo,
    verified = false,
    followerCount = 0,
    articleCount = 0,
  } = publisher || {};

  if (variant === 'compact') {
    return (
      <Link to={`/publisher/${id}`} className="block group">
        <Card variant="glass" padding="sm" className="hover:border-terracotta-500/30 transition-all duration-300" hover>
          <div className="flex items-center gap-3">
            <Avatar src={logo} alt={name} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-warmBeige-100 truncate">{name || 'Unknown Publisher'}</span>
                {verified && <FiCheckCircle className="text-blue-400 flex-shrink-0" size={14} />}
              </div>
              <div className="flex items-center gap-3 text-xs text-warmBeige-500">
                <span className="flex items-center gap-1">
                  <FiUsers size={12} />
                  {followerCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <FiFileText size={12} />
                  {articleCount}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/publisher/${id}`} className="block group">
      <Card variant="glass" padding="md" className="text-center hover:border-terracotta-500/30 transition-all duration-300" hover>
        <div className="flex flex-col items-center">
          <Avatar src={logo} alt={name} size="lg" />
          <div className="flex items-center gap-1.5 mt-2">
            <h3 className="text-base font-bold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors">
              {name || 'Unknown Publisher'}
            </h3>
            {verified && <FiCheckCircle className="text-blue-400" size={16} />}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-warmBeige-500">
            <span className="flex items-center gap-1">
              <FiUsers size={14} />
              {followerCount.toLocaleString()} followers
            </span>
            <span className="flex items-center gap-1">
              <FiFileText size={14} />
              {articleCount} articles
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PublisherCard;
