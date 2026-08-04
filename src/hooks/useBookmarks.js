import { useState, useCallback } from 'react';
import { useArticles } from './useArticles';
import { useAuth } from './useAuth';

/**
 * Custom hook for bookmarks management
 */
export const useBookmarks = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    bookmarks, 
    bookmarkArticle, 
    getBookmarks, 
    loading, 
    error 
  } = useArticles();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const isBookmarked = useCallback((articleId) => {
    if (!bookmarks) return false;
    return bookmarks.some(b => b.id === articleId || b.articleId === articleId);
  }, [bookmarks]);

  const toggleBookmark = useCallback(async (articleId) => {
    if (!isAuthenticated) {
      throw new Error('Please login to bookmark articles');
    }

    setLocalLoading(true);
    setLocalError(null);
    try {
      const result = await bookmarkArticle(articleId);
      return result;
    } catch (err) {
      setLocalError(err.message);
      throw err;
    } finally {
      setLocalLoading(false);
    }
  }, [bookmarkArticle, isAuthenticated]);

  const getBookmarksByFolder = useCallback(async (folderId) => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      const result = await getBookmarks({ folderId });
      return result;
    } catch (err) {
      setLocalError(err.message);
      throw err;
    } finally {
      setLocalLoading(false);
    }
  }, [getBookmarks]);

  const getBookmarkCount = useCallback(() => {
    return bookmarks?.length || 0;
  }, [bookmarks]);

  const getBookmarksByCategory = useCallback((category) => {
    if (!bookmarks) return [];
    return bookmarks.filter(b => b.category === category);
  }, [bookmarks]);

  const getRecentBookmarks = useCallback((limit = 5) => {
    if (!bookmarks) return [];
    return [...bookmarks]
      .sort((a, b) => new Date(b.bookmarkedAt || b.createdAt) - new Date(a.bookmarkedAt || a.createdAt))
      .slice(0, limit);
  }, [bookmarks]);

  const searchBookmarks = useCallback((query) => {
    if (!bookmarks || !query) return bookmarks || [];
    const searchTerm = query.toLowerCase();
    return bookmarks.filter(b => 
      b.title?.toLowerCase().includes(searchTerm) ||
      b.excerpt?.toLowerCase().includes(searchTerm) ||
      b.author?.name?.toLowerCase().includes(searchTerm) ||
      b.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [bookmarks]);

  return {
    bookmarks,
    loading: loading || localLoading,
    error: error || localError,
    isBookmarked,
    toggleBookmark,
    getBookmarksByFolder,
    getBookmarkCount,
    getBookmarksByCategory,
    getRecentBookmarks,
    searchBookmarks,
    refreshBookmarks: getBookmarks,
  };
};

export default useBookmarks;