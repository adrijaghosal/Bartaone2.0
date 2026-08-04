import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiTrendingUp, 
  FiCalendar, 
  FiClock, 
  FiAward,
  FiStar,
  FiFire,
  FiTarget,
  FiBookOpen,
  FiCheckCircle,
  FiCircle,
  FiChevronRight,
  FiInfo
} from 'react-icons/fi';
import { useStreak } from '../../hooks/useStreak';
import { useAuth } from '../../hooks/useAuth';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import Toast from '../common/Toast';

const StreakTracker = ({ 
  showMilestones = true,
  showCalendar = true,
  showStats = true,
  className = '',
}) => {
  const { user } = useAuth();
  const { 
    streak,
    loading,
    error,
    getStreak,
    getStreakHistory,
    checkIn,
    milestones,
    getNextMilestone,
    getStreakStats
  } = useStreak();

  const [streakData, setStreakData] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [nextMilestone, setNextMilestone] = useState(null);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  useEffect(() => {
    const fetchStreakData = async () => {
      if (!user) return;
      
      try {
        const data = await getStreak();
        setStreakData(data);
        setCheckedInToday(data?.checkedInToday || false);
        
        const historyData = await getStreakHistory(30);
        setHistory(historyData);
        
        const statsData = await getStreakStats();
        setStats(statsData);
        
        const milestone = await getNextMilestone();
        setNextMilestone(milestone);
      } catch (error) {
        console.error('Failed to fetch streak data:', error);
      }
    };

    fetchStreakData();
  }, [user, getStreak, getStreakHistory, getStreakStats, getNextMilestone]);

  const handleCheckIn = async () => {
    if (checkedInToday) {
      setToastData({
        message: 'You already checked in today! 🔥',
        type: 'info'
      });
      setShowToast(true);
      return;
    }

    setIsCheckingIn(true);
    try {
      const result = await checkIn();
      setStreakData(result);
      setCheckedInToday(true);
      
      // Refresh history
      const historyData = await getStreakHistory(30);
      setHistory(historyData);
      
      const statsData = await getStreakStats();
      setStats(statsData);
      
      const milestone = await getNextMilestone();
      setNextMilestone(milestone);

      setToastData({
        message: result.milestoneReached 
          ? `🎉 Amazing! You reached a ${result.milestone} day milestone!`
          : `🔥 Streak extended to ${result.currentStreak} days!`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to check in',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Format days for display
  const formatDays = (days) => {
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  // Get color based on streak length
  const getStreakColor = (days) => {
    if (days >= 100) return 'from-purple-500 to-pink-500';
    if (days >= 50) return 'from-blue-500 to-purple-500';
    if (days >= 30) return 'from-green-500 to-teal-500';
    if (days >= 14) return 'from-yellow-500 to-orange-500';
    if (days >= 7) return 'from-orange-500 to-red-500';
    return 'from-terracotta-400 to-orange-500';
  };

  // Get emoji based on streak length
  const getStreakEmoji = (days) => {
    if (days >= 100) return '🏆';
    if (days >= 50) return '⭐';
    if (days >= 30) return '🔥';
    if (days >= 14) return '💪';
    if (days >= 7) return '📈';
    return '📖';
  };

  // Get milestone label
  const getMilestoneLabel = (days) => {
    if (days >= 365) return 'Year Anniversary! 🎉';
    if (days >= 100) return 'Century Streak! 🏆';
    if (days >= 50) return 'Half Century! ⭐';
    if (days >= 30) return 'Monthly Master! 🔥';
    if (days >= 14) return 'Two Weeks! 💪';
    if (days >= 7) return 'Weekly Warrior! 📈';
    return 'Keep Going! 📖';
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton variant="card" height="180px" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" />
          ))}
        </div>
        <Skeleton variant="card" height="200px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <Card variant="glass" padding="lg" className="text-center">
        <div className="text-4xl mb-3">🔒</div>
        <h3 className="text-lg font-semibold text-warmBeige-100 mb-2">
          Sign in to track your reading streak
        </h3>
        <p className="text-warmBeige-400 text-sm mb-4">
          Keep your reading habit going and earn achievements
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/login'}>
          Sign In
        </Button>
      </Card>
    );
  }

  const currentStreak = streakData?.currentStreak || 0;
  const bestStreak = streakData?.bestStreak || 0;
  const totalReads = streakData?.totalReads || 0;
  const streakColor = getStreakColor(currentStreak);
  const streakEmoji = getStreakEmoji(currentStreak);

  return (
    <div className={`space-y-6 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      {/* Main Streak Card */}
      <Card variant="gradient" padding="lg" className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${streakColor} opacity-10`} />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Streak Icon */}
            <div className="flex-shrink-0">
              <div className={`
                w-24 h-24 rounded-3xl flex items-center justify-center text-5xl
                bg-gradient-to-br ${streakColor}
                shadow-2xl shadow-terracotta-500/25
                animate-pulse-slow
              `}>
                {streakEmoji}
              </div>
            </div>

            {/* Streak Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl md:text-3xl font-bold text-warmBeige-100">
                  {currentStreak} Day Streak
                </h2>
                <Badge variant="glass" size="md" className="animate-bounce-slow">
                  <FiFire className="text-orange-400" />
                  {streakEmoji}
                </Badge>
              </div>

              <p className="text-warmBeige-300">
                {currentStreak === 0 
                  ? 'Start your reading streak today! 📚'
                  : `You're on fire! Keep reading to maintain your streak. ${getMilestoneLabel(currentStreak)}`
                }
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-warmBeige-400">
                  <FiStar className="text-yellow-400" />
                  <span>Best: <span className="text-warmBeige-100 font-semibold">{bestStreak}</span> days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-warmBeige-400">
                  <FiBookOpen className="text-terracotta-400" />
                  <span>Read: <span className="text-warmBeige-100 font-semibold">{totalReads}</span> articles</span>
                </div>
                {nextMilestone && (
                  <div className="flex items-center gap-2 text-sm text-warmBeige-400">
                    <FiTarget className="text-green-400" />
                    <span>Next: <span className="text-warmBeige-100 font-semibold">{nextMilestone.days}</span> days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Check-in Button */}
            <div className="flex-shrink-0">
              <Button
                variant={checkedInToday ? 'outline' : 'primary'}
                size="lg"
                onClick={handleCheckIn}
                disabled={isCheckingIn || checkedInToday}
                loading={isCheckingIn}
                icon={checkedInToday ? <FiCheckCircle /> : <FiFire />}
                className={`
                  min-w-[140px]
                  ${checkedInToday ? 'border-green-500 text-green-400' : ''}
                  transition-all duration-300
                `}
              >
                {checkedInToday ? 'Checked In ✅' : 'Check In 🔥'}
              </Button>
              {checkedInToday && (
                <p className="text-xs text-warmBeige-500 text-center mt-2">
                  Come back tomorrow for more!
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      {showStats && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-2xl font-bold text-terracotta-400">
              {stats.daysActive || 0}
            </div>
            <p className="text-xs text-warmBeige-400 mt-1">Days Active</p>
          </Card>
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-2xl font-bold text-warmBeige-100">
              {stats.articlesRead || 0}
            </div>
            <p className="text-xs text-warmBeige-400 mt-1">Articles Read</p>
          </Card>
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {stats.achievements || 0}
            </div>
            <p className="text-xs text-warmBeige-400 mt-1">Achievements</p>
          </Card>
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {stats.readingTime || 0}h
            </div>
            <p className="text-xs text-warmBeige-400 mt-1">Reading Time</p>
          </Card>
        </div>
      )}

      {/* Milestones */}
      {showMilestones && milestones && milestones.length > 0 && (
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiAward className="text-yellow-400" />
              Milestones
            </h3>
            <span className="text-sm text-warmBeige-400">
              {milestones.filter(m => m.unlocked).length} / {milestones.length} unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`
                  p-3 rounded-xl transition-all duration-300
                  ${milestone.unlocked 
                    ? 'bg-terracotta-500/10 border border-terracotta-500/30' 
                    : 'bg-navy-800/30 border border-warmBeige-500/10 opacity-50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {milestone.unlocked ? milestone.emoji : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${milestone.unlocked ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-warmBeige-400">
                      {milestone.unlocked 
                        ? `Unlocked at ${milestone.days} days` 
                        : `${milestone.days} days needed`
                      }
                    </p>
                  </div>
                  {milestone.unlocked && (
                    <Badge variant="success" size="xs">
                      <FiCheckCircle size={10} />
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Calendar View */}
      {showCalendar && history.length > 0 && (
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
              <FiCalendar className="text-terracotta-400" />
              Reading Calendar
            </h3>
            <span className="text-sm text-warmBeige-400">
              Last 30 days
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs text-warmBeige-500 font-medium py-1">
                {day}
              </div>
            ))}
            {history.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-200
                  ${day.read 
                    ? 'bg-terracotta-500/30 text-warmBeige-100 hover:bg-terracotta-500/50 cursor-default' 
                    : 'bg-navy-800/30 text-warmBeige-600'
                  }
                  ${day.today ? 'ring-2 ring-terracotta-500 ring-offset-2 ring-offset-navy-900' : ''}
                `}
                title={day.date}
              >
                {day.day}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-warmBeige-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-terracotta-500/30" />
              <span>Read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-navy-800/30 border border-warmBeige-500/10" />
              <span>Not read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-terracotta-500 ring-2 ring-terracotta-500 ring-offset-2 ring-offset-navy-900" />
              <span>Today</span>
            </div>
          </div>
        </Card>
      )}

      {/* Streak Tips */}
      <Card variant="glass" padding="lg">
        <div className="flex items-start gap-3">
          <FiInfo className="text-terracotta-400 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="text-sm font-medium text-warmBeige-100 mb-1">
              Streak Tips
            </h4>
            <ul className="text-sm text-warmBeige-400 space-y-1">
              <li>• Read at least one article daily to maintain your streak</li>
              <li>• Check in every day to earn achievement badges</li>
              <li>• The longer your streak, the more rewards you'll unlock</li>
              {currentStreak > 0 && (
                <li className="text-terracotta-400 font-medium">
                  • You're on a {currentStreak}-day streak! Keep it going! 🔥
                </li>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StreakTracker;