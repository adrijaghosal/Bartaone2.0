import { useArticles as useArticlesContext } from '../contexts/ArticleContext';
import { useState, useCallback } from 'react';

/**
 * Custom hook for article management
 */
export const useArticles = () => {
  const articleContext = useArticlesContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getArticles = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.getArticles(params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const getArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.getArticle(id);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const createArticle = useCallback(async (articleData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.createArticle(articleData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const updateArticle = useCallback(async (id, articleData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.updateArticle(id, articleData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const deleteArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.deleteArticle(id);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const getDrafts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.getDrafts(params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const publishArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.publishArticle(id);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const saveDraft = useCallback(async (articleData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.saveDraft(articleData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const likeArticle = useCallback(async (id) => {
    try {
      const result = await articleContext.likeArticle(id);
      return result;
    } catch (err) {
      console.error('Failed to like article:', err);
      throw err;
    }
  }, [articleContext]);

  const bookmarkArticle = useCallback(async (id) => {
    try {
      const result = await articleContext.bookmarkArticle(id);
      return result;
    } catch (err) {
      console.error('Failed to bookmark article:', err);
      throw err;
    }
  }, [articleContext]);

  const getBookmarks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.getBookmarks(params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const getCategories = useCallback(async () => {
    try {
      const result = await articleContext.getCategories();
      return result;
    } catch (err) {
      console.error('Failed to get categories:', err);
      throw err;
    }
  }, [articleContext]);

  const getTags = useCallback(async () => {
    try {
      const result = await articleContext.getTags();
      return result;
    } catch (err) {
      console.error('Failed to get tags:', err);
      throw err;
    }
  }, [articleContext]);

  const getTrending = useCallback(async (params = {}) => {
    try {
      const result = await articleContext.getTrending(params);
      return result;
    } catch (err) {
      console.error('Failed to get trending articles:', err);
      throw err;
    }
  }, [articleContext]);

  const getRecommended = useCallback(async (params = {}) => {
    try {
      const result = await articleContext.getRecommended(params);
      return result;
    } catch (err) {
      console.error('Failed to get recommended articles:', err);
      throw err;
    }
  }, [articleContext]);

  const searchArticles = useCallback(async (query, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.searchArticles(query, params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const refreshArticles = useCallback(async () => {
    try {
      const result = await articleContext.refreshArticles();
      return result;
    } catch (err) {
      console.error('Failed to refresh articles:', err);
      throw err;
    }
  }, [articleContext]);

  const getPublisherArticles = useCallback(async (publisherId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await articleContext.getPublisherArticles(publisherId, params);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [articleContext]);

  const getRelatedArticles = useCallback(async (params = {}) => {
    try {
      const result = await articleContext.getRelatedArticles(params);
      return result;
    } catch (err) {
      console.error('Failed to get related articles:', err);
      throw err;
    }
  }, [articleContext]);

  return {
    ...articleContext,
    loading: articleContext.loading || loading,
    error: articleContext.error || error,
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
    setError: articleContext.setError,
  };
};

export default useArticles;