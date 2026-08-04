import React from 'react';
import { 
  FiCheckCircle, 
  FiClock, 
  FiFileText, 
  FiAlertCircle,
  FiArchive,
  FiEye
} from 'react-icons/fi';
import Badge from '../../common/Badge';

const ArticleStatus = ({ status, size = 'md', showIcon = true, className = '' }) => {
  const statusConfig = {
    published: {
      label: 'Published',
      variant: 'success',
      icon: <FiCheckCircle />,
      description: 'Visible to all readers'
    },
    draft: {
      label: 'Draft',
      variant: 'warning',
      icon: <FiFileText />,
      description: 'In progress, not visible'
    },
    scheduled: {
      label: 'Scheduled',
      variant: 'info',
      icon: <FiClock />,
      description: 'Will be published automatically'
    },
    archived: {
      label: 'Archived',
      variant: 'glass',
      icon: <FiArchive />,
      description: 'Hidden from public view'
    },
    pending: {
      label: 'Pending Review',
      variant: 'warning',
      icon: <FiAlertCircle />,
      description: 'Awaiting approval'
    },
    reviewed: {
      label: 'Under Review',
      variant: 'info',
      icon: <FiEye />,
      description: 'Currently being reviewed'
    },
  };

  const config = statusConfig[status] || statusConfig.draft;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  };

  return (
    <Badge
      variant={config.variant}
      size={size}
      className={`${sizeClasses[size]} ${className}`}
      icon={showIcon ? config.icon : null}
    >
      {config.label}
    </Badge>
  );
};

// Extended status with tooltip
export const ArticleStatusWithTooltip = ({ status, className = '' }) => {
  const statusConfig = {
    published: { label: 'Published', color: 'text-green-400', bg: 'bg-green-500/10' },
    draft: { label: 'Draft', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    scheduled: { label: 'Scheduled', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    archived: { label: 'Archived', color: 'text-gray-400', bg: 'bg-gray-500/10' },
    pending: { label: 'Pending Review', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <div className={`relative inline-block group ${className}`}>
      <div className={`
        flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        ${config.color} ${config.bg}
        cursor-help
      `}>
        <div className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text-', 'bg-')}`} />
        {config.label}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-lg px-3 py-1.5 text-xs text-warmBeige-300 whitespace-nowrap shadow-xl">
          {status === 'published' && 'Article is live and visible to readers'}
          {status === 'draft' && 'Article is in draft mode, not visible'}
          {status === 'scheduled' && 'Article will be published automatically'}
          {status === 'archived' && 'Article is archived and hidden'}
          {status === 'pending' && 'Article is awaiting review'}
        </div>
      </div>
    </div>
  );
};

// Status timeline component
export const ArticleStatusTimeline = ({ history = [], className = '' }) => {
  if (history.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-xs font-medium text-warmBeige-400">Status History</h4>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="relative flex flex-col items-center">
              <div className={`
                w-2 h-2 rounded-full mt-1.5
                ${index === 0 ? 'bg-terracotta-500' : 'bg-warmBeige-500'}
              `} />
              {index < history.length - 1 && (
                <div className="w-px h-6 bg-warmBeige-500/20" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <ArticleStatus status={item.status} size="sm" />
                <span className="text-xs text-warmBeige-400">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              {item.note && (
                <p className="text-xs text-warmBeige-400 mt-0.5">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleStatus;