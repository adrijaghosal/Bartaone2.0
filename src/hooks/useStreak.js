import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { streakService } from '../services/streakService';

/**
 * Custom hook for reading streak management
 */
export const useStreak = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [streak, setStreak] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getStreak();
    }
  }, [isAuthenticated]);

  const getStreak = useCallback(async () => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await streakService.getStreak();
      setStreak(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getStreakHistory = useCallback(async (days = 30) => {
    if (!isAuthenticated) return [];
    
    setLoading(true);
    setError(null);
    try {
      const data = await streakService.getHistory(days);
      setHistory(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const checkIn = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('Please login to check in');
    }

    setLoading(true);
    setError(null);
    try {
      const result = await streakService.checkIn();
      setStreak(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getStreakStats = useCallback(async () => {
    if (!isAuthenticated) return null;
    
    setLoading(true);
    setError(null);
    try {
      const data = await streakService.getStats();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getNextMilestone = useCallback(async () => {
    if (!isAuthenticated) return null;
    
    try {
      const data = await streakService.getNextMilestone();
      return data;
    } catch (err) {
      console.error('Failed to get next milestone:', err);
      throw err;
    }
  }, [isAuthenticated]);

  const getMilestones = useCallback(async () => {
    if (!isAuthenticated) return [];
    
    try {
      const data = await streakService.getMilestones();
      return data;
    } catch (err) {
      console.error('Failed to get milestones:', err);
      throw err;
    }
  }, [isAuthenticated]);

  const resetStreak = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('Please login to reset streak');
    }

    setLoading(true);
    setError(null);
    try {
      const result = await streakService.resetStreak();
      setStreak(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return {
    streak,
    history,
    loading,
    error,
    getStreak,
    getStreakHistory,
    checkIn,
    getStreakStats,
    getNextMilestone,
    getMilestones,
    resetStreak,
    currentStreak: streak?.currentStreak || 0,
    bestStreak: streak?.bestStreak || 0,
    checkedInToday: streak?.checkedInToday || false,
    totalReads: streak?.totalReads || 0,
  };
};

export default useStreak;