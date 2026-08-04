import React, { useState, useEffect, useRef } from 'react';
import { FiBookOpen } from 'react-icons/fi';

const ReadingProgress = ({ 
  targetRef,
  color = 'terracotta',
  height = 4,
  showPercentage = true,
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef?.current) return;

      const element = targetRef.current;
      const rect = element.getBoundingClientRect();
      const totalHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll percentage
      const scrolled = window.scrollY - rect.top;
      const maxScroll = totalHeight - windowHeight;
      
      if (maxScroll > 0) {
        const percentage = Math.min(Math.max((scrolled / maxScroll) * 100, 0), 100);
        setProgress(percentage);
        setIsVisible(percentage > 1 && percentage < 100);
      }
    };

    // Track reading time
    const startTracking = () => {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
        intervalRef.current = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setReadingTime(elapsed);
        }, 1000);
      }
    };

    // Stop tracking when user leaves
    const stopTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking();
      } else {
        startTracking();
      }
    };

    // Handle scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start tracking
    startTracking();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTracking();
    };
  }, [targetRef]);

  const colorClasses = {
    terracotta: 'bg-terracotta-500',
    navy: 'bg-navy-500',
    beige: 'bg-warmBeige-500',
    white: 'bg-white',
    gradient: 'bg-gradient-to-r from-terracotta-400 via-orange-500 to-terracotta-600',
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <>
      {/* Progress Bar */}
      <div 
        className={`
          fixed top-16 left-0 right-0 z-40
          bg-navy-800/20 backdrop-blur-sm
          transition-all duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${className}
        `}
        style={{ height: `${height}px` }}
      >
        <div 
          className={`h-full ${colorClasses[color]} transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        >
          {showPercentage && (
            <div className="absolute right-0 -top-6 text-xs font-medium text-warmBeige-400">
              {Math.round(progress)}%
            </div>
          )}
        </div>
      </div>

      {/* Reading Stats Floating Badge */}
      {isVisible && (
        <div className="fixed bottom-24 left-4 z-30 md:bottom-24 md:left-6 animate-fadeIn">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-navy-900/95 backdrop-blur-xl border border-warmBeige-500/20 shadow-2xl">
            <FiBookOpen className="text-terracotta-400" size={14} />
            <span className="text-xs font-medium text-warmBeige-300">
              {formatTime(readingTime)}
            </span>
            <span className="text-warmBeige-500">•</span>
            <span className="text-xs text-warmBeige-400">
              {Math.round(progress)}% read
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingProgress;