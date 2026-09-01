import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import articleService from '../services/articleService';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

// Create Context
const ArticleContext = createContext();

// Custom hook
export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

// Article Provider
export const ArticleProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  // Get articles with filters
  const getArticles = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getArticles(params);
      setArticles(data.articles || []);
      setTotalCount(data.total || 0);
      setHasMore(data.hasMore || false);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single article
  const getArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getArticle(id);
      setArticle(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create article
  const createArticle = useCallback(async (articleData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.createArticle(articleData);
      setArticles(prev => [data, ...prev]);
      showNotification('Article created successfully!', 'success');
      return data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  // Update article
  const updateArticle = useCallback(async (id, articleData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.updateArticle(id, articleData);
      setArticles(prev => prev.map(a => a.id === id ? data : a));
      if (article?.id === id) {
        setArticle(data);
      }
      showNotification('Article updated successfully!', 'success');
      return data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [article, showNotification]);

  // Delete article
  const deleteArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await articleService.deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
      if (article?.id === id) {
        setArticle(null);
      }
      showNotification('Article deleted successfully', 'info');
      return { success: true };
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [article, showNotification]);

  // Get drafts
  const getDrafts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getDrafts(params);
      setDrafts(data.drafts || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Publish article
  const publishArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.publishArticle(id);
      setArticles(prev => prev.map(a => a.id === id ? data : a));
      if (article?.id === id) {
        setArticle(data);
      }
      showNotification('Article published successfully! 🎉', 'success');
      return data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [article, showNotification]);

  // Save as draft
  const saveDraft = useCallback(async (articleData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.saveDraft(articleData);
      setDrafts(prev => [data, ...prev]);
      showNotification('Draft saved successfully!', 'success');
      return data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  // Like article
  const likeArticle = useCallback(async (id) => {
    try {
      const data = await articleService.likeArticle(id);
      setArticles(prev => prev.map(a => a.id === id ? data : a));
      if (article?.id === id) {
        setArticle(data);
      }
      return data;
    } catch (err) {
      console.error('Failed to like article:', err);
      throw err;
    }
  }, [article]);

  // Bookmark article
  const bookmarkArticle = useCallback(async (id) => {
    try {
      const data = await articleService.bookmarkArticle(id);
      setArticles(prev => prev.map(a => a.id === id ? data : a));
      if (article?.id === id) {
        setArticle(data);
      }
      // Update bookmarks
      const isBookmarked = data.isBookmarked;
      if (isBookmarked) {
        setBookmarks(prev => [data, ...prev]);
      } else {
        setBookmarks(prev => prev.filter(b => b.id !== id));
      }
      showNotification(isBookmarked ? 'Bookmarked! 📌' : 'Bookmark removed', 'info');
      return data;
    } catch (err) {
      console.error('Failed to bookmark article:', err);
      throw err;
    }
  }, [article, showNotification]);

  // Get bookmarks
  const getBookmarks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getBookmarks(params);
      setBookmarks(data.bookmarks || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get categories
  const getCategories = useCallback(async () => {
    try {
      const data = await articleService.getCategories();
      setCategories(data);
      return data;
    } catch (err) {
      console.error('Failed to get categories:', err);
      throw err;
    }
  }, []);

  // Get tags
  const getTags = useCallback(async () => {
    try {
      const data = await articleService.getTags();
      setTags(data);
      return data;
    } catch (err) {
      console.error('Failed to get tags:', err);
      throw err;
    }
  }, []);

  // Get trending articles
  const getTrending = useCallback(async (params = {}) => {
    try {
      const data = await articleService.getTrending(params);
      setTrendingArticles(data);
      return data;
    } catch (err) {
      console.error('Failed to get trending articles:', err);
      throw err;
    }
  }, []);

  // Get recommended articles
  const getRecommended = useCallback(async (params = {}) => {
    try {
      const data = await articleService.getRecommended(params);
      setRecommendedArticles(data);
      return data;
    } catch (err) {
      console.error('Failed to get recommended articles:', err);
      throw err;
    }
  }, []);

  // Search articles
  const searchArticles = useCallback(async (query, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.searchArticles(query, params);
      setArticles(data.articles || []);
      setTotalCount(data.total || 0);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh articles
  const refreshArticles = useCallback(async () => {
    await getArticles({ refresh: true });
  }, [getArticles]);

  // Get publisher articles
  const getPublisherArticles = useCallback(async (publisherId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getPublisherArticles(publisherId, params);
      setArticles(data.articles || []);
      setTotalCount(data.total || 0);
      setHasMore(data.hasMore || false);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get related articles
  const getRelatedArticles = useCallback(async (params = {}) => {
    try {
      const data = await articleService.getRelatedArticles(params);
      return data;
    } catch (err) {
      console.error('Failed to get related articles:', err);
      throw err;
    }
  }, []);

  const value = {
    articles,
    article,
    drafts,
    bookmarks,
    loading,
    error,
    totalCount,
    hasMore,
    categories,
    tags,
    trendingArticles,
    recommendedArticles,
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getDrafts,
    publishArticle,
    saveDraft,
    likeArticle,
    bookmarkArticle,
    getBookmarks,
    getCategories,
    getTags,
    getTrending,
    getRecommended,
    searchArticles,
    refreshArticles,
    getPublisherArticles,
    getRelatedArticles,
    setError,
  };

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;