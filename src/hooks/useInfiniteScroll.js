import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for infinite scrolling
 */
export const useInfiniteScroll = ({
  loading = false,
  hasMore = true,
  onLoadMore = null,
  threshold = 200,
  rootMargin = '0px 0px 200px 0px',
  enabled = true,
  dependency = null,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  // Intersection Observer callback
  const handleIntersection = useCallback((entries) => {
    const entry = entries[0];
    setIsIntersecting(entry.isIntersecting);
    
    if (entry.isIntersecting && !loading && hasMore && onLoadMore && enabled) {
      onLoadMore();
    }
  }, [loading, hasMore, onLoadMore, enabled]);

  // Set up observer
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const options = {
      root: null,
      rootMargin,
      threshold: threshold / 100,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, rootMargin, threshold, handleIntersection]);

  // Cleanup on dependency change
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [dependency]);

  // Manual load more
  const loadMore = useCallback(() => {
    if (!loading && hasMore && onLoadMore && enabled) {
      onLoadMore();
    }
  }, [loading, hasMore, onLoadMore, enabled]);

  // Reset observer
  const reset = useCallback(() => {
    if (observerRef.current && targetRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(targetRef.current);
    }
  }, []);

  // Disconnect observer
  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  return {
    targetRef,
    isIntersecting,
    loadMore,
    reset,
    disconnect,
  };
};

/**
 * Custom hook for pagination with infinite scroll
 */
export const usePaginationWithScroll = ({
  fetchData = null,
  pageSize = 10,
  initialPage = 1,
  enabled = true,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const loadMore = useCallback(async () => {
    if (!enabled || !fetchData || loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const result = await fetchData({
        page,
        limit: pageSize,
      });
      
      setData(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setTotal(result.total);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load more data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, pageSize, enabled, loading, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
    setTotal(0);
  }, [initialPage]);

  const refresh = useCallback(async () => {
    reset();
    await loadMore();
  }, [reset, loadMore]);

  const infiniteScroll = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
    enabled,
  });

  return {
    data,
    loading,
    hasMore,
    error,
    total,
    page,
    loadMore,
    reset,
    refresh,
    infiniteScroll,
    setData,
    setLoading,
    setError,
  };
};

export default useInfiniteScroll;