import React, { useState } from 'react';
import { FiFolder, FiTrash2, FiEdit2, FiMoreVertical, FiBookmark } from 'react-icons/fi';
import Badge from '../common/Badge';
import { useBookmarks } from '../../hooks/useBookmarks';

const BookmarkFolder = ({ 
  folder, 
  onClick, 
  onDelete,
  onEdit,
  variant = 'default', // 'default', 'compact', 'minimal'
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { getBookmarkCountByFolder } = useBookmarks();

  const {
    id,
    name,
    description,
    color = '#E8835F',
    icon = '📁',
    createdAt,
  } = folder;

  const count = getBookmarkCountByFolder(id);

  // Default Card
  if (variant === 'default') {
    return (
      <div
        className={`
          relative group cursor-pointer
          p-4 rounded-2xl
          bg-gradient-to-br from-navy-800/50 to-navy-900/50
          border border-warmBeige-500/10
          hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
          transition-all duration-300 hover:-translate-y-1
          ${className}
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Folder Icon */}
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>

        {/* Folder Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
            {name}
          </h4>
          {description && (
            <p className="text-xs text-warmBeige-400 line-clamp-1 mt-0.5">
              {description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-warmBeige-400">
              {count} {count === 1 ? 'article' : 'articles'}
            </span>
            {createdAt && (
              <span className="text-xs text-warmBeige-500">
                • Created {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEdit) onEdit(id);
              }}
              className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiEdit2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onDelete) onDelete(id);
              }}
              className="p-1.5 rounded-lg text-warmBeige-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>

        {/* Count Badge */}
        <Badge 
          variant="glass" 
          size="sm"
          className="absolute bottom-3 right-3"
        >
          {count}
        </Badge>
      </div>
    );
  }

  // Compact Card
  if (variant === 'compact') {
    return (
      <div
        className={`
          flex items-center gap-3 p-3 rounded-xl
          bg-navy-800/30 hover:bg-navy-800/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          transition-all duration-300 cursor-pointer group
          ${className}
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-warmBeige-100 group-hover:text-terracotta-400 transition-colors truncate">
            {name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-warmBeige-400">
            <span>{count} articles</span>
          </div>
        </div>
        <Badge variant="glass" size="sm">
          {count}
        </Badge>
      </div>
    );
  }

  // Minimal Card
  if (variant === 'minimal') {
    return (
      <button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-navy-800/30 hover:bg-navy-800/50
          border border-warmBeige-500/10 hover:border-terracotta-500/30
          transition-all duration-300 group
          ${className}
        `}
        onClick={onClick}
      >
        <FiFolder className="text-terracotta-400" size={16} />
        <span className="text-sm text-warmBeige-100 group-hover:text-terracotta-400 transition-colors">
          {name}
        </span>
        <Badge variant="glass" size="xs">
          {count}
        </Badge>
      </button>
    );
  }

  return null;
};

export default BookmarkFolder;