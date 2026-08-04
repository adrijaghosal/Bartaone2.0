import React, { useState, useEffect } from 'react';
import { FiBookmark, FiBookmark as FiBookmarkFilled } from 'react-icons/fi';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../common/Toast';

const BookmarkButton = ({ 
  articleId,
  variant = 'default', // 'default', 'icon', 'text'
  size = 'md',
  className = '',
  onToggle,
  showToast = true,
}) => {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark, loading } = useBookmarks();
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    setIsBookmarkedState(isBookmarked(articleId));
  }, [articleId, isBookmarked]);

  const handleToggle = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!user) {
      if (showToast) {
        setToastData({
          message: 'Please login to bookmark articles',
          type: 'warning'
        });
        setShowToastMessage(true);
      }
      return;
    }

    try {
      await toggleBookmark(articleId);
      const newState = !isBookmarkedState;
      setIsBookmarkedState(newState);
      
      if (onToggle) {
        onToggle(newState);
      }

      if (showToast) {
        setToastData({
          message: newState ? 'Article bookmarked! 📌' : 'Bookmark removed',
          type: newState ? 'success' : 'info'
        });
        setShowToastMessage(true);
      }
    } catch (error) {
      setToastData({
        message: 'Failed to bookmark article',
        type: 'error'
      });
      setShowToastMessage(true);
    }
  };

  const sizes = {
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };

  const variants = {
    default: `
      rounded-xl transition-all duration-300
      ${isBookmarkedState 
        ? 'bg-terracotta-500/20 text-terracotta-400 hover:bg-terracotta-500/30' 
        : 'bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 border border-warmBeige-500/20'
      }
    `,
    icon: `
      rounded-full transition-all duration-300
      ${isBookmarkedState 
        ? 'bg-terracotta-500 text-white hover:bg-terracotta-600' 
        : 'bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10'
      }
    `,
    text: `
      transition-all duration-300 font-medium
      ${isBookmarkedState 
        ? 'text-terracotta-400 hover:text-terracotta-300' 
        : 'text-warmBeige-400 hover:text-terracotta-400'
      }
    `,
  };

  const renderIcon = () => {
    if (isBookmarkedState) {
      return <FiBookmarkFilled size={size === 'sm' ? 14 : size === 'lg' ? 22 : 18} />;
    }
    return <FiBookmark size={size === 'sm' ? 14 : size === 'lg' ? 22 : 18} />;
  };

  const renderText = () => {
    if (variant === 'icon') return null;
    return (
      <span>
        {isBookmarkedState ? 'Bookmarked' : 'Bookmark'}
      </span>
    );
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`
          flex items-center gap-2
          ${sizes[size]}
          ${variants[variant]}
          ${loading ? 'opacity-50 cursor-wait' : ''}
          ${className}
        `}
        aria-label={isBookmarkedState ? 'Remove bookmark' : 'Add bookmark'}
      >
        {renderIcon()}
        {renderText()}
        {loading && (
          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
      </button>

      {showToastMessage && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToastMessage(false)}
          duration={3000}
        />
      )}
    </>
  );
};

export default BookmarkButton;