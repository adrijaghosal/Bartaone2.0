import { useState, useCallback } from 'react';
import { useArticles } from './useArticles';
import { useAuth } from './useAuth';
import { publisherService } from '../services/publisherService';

/**
 * Custom hook for publisher management
 */
export const usePublishers = () => {
  const { user, isAuthenticated } = useAuth();
  const { getPublisherArticles } = useArticles();
  
  const [publishers, setPublishers] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPublishers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await publisherService.getPublishers(params);
      setPublishers(data.publishers || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublisher = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await publisherService.getPublisher(id);
      setPublisher(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const followPublisher = useCallback(async (publisherId) => {
    if (!isAuthenticated) {
      throw new Error('Please login to follow publishers');
    }

    setLoading(true);
    setError(null);
    try {
      const result = await publisherService.followPublisher(publisherId);
      setFollowing(prev => [...prev, publisherId]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const unfollowPublisher = useCallback(async (publisherId) => {
    if (!isAuthenticated) {
      throw new Error('Please login to unfollow publishers');
    }

    setLoading(true);
    setError(null);
    try {
      const result = await publisherService.unfollowPublisher(publisherId);
      setFollowing(prev => prev.filter(id => id !== publisherId));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const isFollowing = useCallback((publisherId) => {
    return following.includes(publisherId);
  }, [following]);

  const getFollowing = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await publisherService.getFollowing();
      setFollowing(data.map(p => p.id));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublisherStats = useCallback(async (publisherId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await publisherService.getPublisherStats(publisherId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePublisherProfile = useCallback(async (data) => {
    if (!isAuthenticated) {
      throw new Error('Please login to update profile');
    }

    setLoading(true);
    setError(null);
    try {
      const result = await publisherService.updateProfile(data);
      setPublisher(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getPublisherArticles = useCallback(async (publisherId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await publisherService.getArticles(publisherId, params);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    publishers,
    publisher,
    following,
    loading,
    error,
    getPublishers,
    getPublisher,
    followPublisher,
    unfollowPublisher,
    isFollowing,
    getFollowing,
    getPublisherStats,
    updatePublisherProfile,
    getPublisherArticles,
    isPublisher: user?.role === 'publisher',
  };
};

export default usePublishers;