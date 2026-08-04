import React, { useState, useEffect } from 'react';
import {
  FiBell,
  FiMail,
  FiMessageSquare,
  FiHeart,
  FiUserPlus,
  FiStar,
  FiTrendingUp,
  FiBookmark,
  FiShare2,
  FiAward,
  FiZap,
  FiAtSign,
  FiCheck,
  FiX,
  FiSettings,
  FiSliders,
  FiMoon,
  FiSun,
  FiClock,
  FiCalendar,
  FiSave
} from 'react-icons/fi';
import { useNotifications } from '../../../hooks/useNotifications';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Toast from '../../common/Toast';

const NotificationPreferences = ({ 
  onClose,
  className = '',
}) => {
  const { user } = useAuth();
  const {
    getPreferences,
    updatePreferences,
    loading,
    error
  } = useNotifications();

  const [preferences, setPreferences] = useState({
    push: true,
    email: true,
    inApp: true,
    sound: true,
    frequency: 'instant',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
    categories: {
      likes: true,
      comments: true,
      follows: true,
      mentions: true,
      shares: true,
      bookmarks: true,
      awards: true,
      trending: true,
      system: true,
      emailDigest: true,
      weeklySummary: true,
    },
    priority: {
      high: true,
      medium: true,
      low: true,
    },
  });

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const data = await getPreferences();
      if (data) {
        setPreferences(data);
      }
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
    }
  };

  const handleToggle = (key) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setPreferences(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: !prev[parent][child]
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const handlePriorityToggle = (priority) => {
    setPreferences(prev => ({
      ...prev,
      priority: {
        ...prev.priority,
        [priority]: !prev.priority[priority]
      }
    }));
  };

  const handleFrequencyChange = (frequency) => {
    setPreferences(prev => ({
      ...prev,
      frequency
    }));
  };

  const handleQuietHoursToggle = () => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled: !prev.quietHours.enabled
      }
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePreferences(preferences);
      setToastData({
        message: 'Preferences saved successfully!',
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to save preferences',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const categoryOptions = [
    { key: 'likes', label: 'Likes', icon: <FiHeart />, description: 'When someone likes your content' },
    { key: 'comments', label: 'Comments', icon: <FiMessageSquare />, description: 'When someone comments on your content' },
    { key: 'follows', label: 'Follows', icon: <FiUserPlus />, description: 'When someone follows you' },
    { key: 'mentions', label: 'Mentions', icon: <FiAtSign />, description: 'When someone mentions you' },
    { key: 'shares', label: 'Shares', icon: <FiShare2 />, description: 'When someone shares your content' },
    { key: 'bookmarks', label: 'Bookmarks', icon: <FiBookmark />, description: 'When someone bookmarks your content' },
    { key: 'awards', label: 'Awards', icon: <FiAward />, description: 'When you receive achievements' },
    { key: 'trending', label: 'Trending', icon: <FiTrendingUp />, description: 'Trending content updates' },
    { key: 'system', label: 'System', icon: <FiZap />, description: 'System notifications' },
    { key: 'emailDigest', label: 'Email Digest', icon: <FiMail />, description: 'Daily or weekly email summaries' },
    { key: 'weeklySummary', label: 'Weekly Summary', icon: <FiCalendar />, description: 'Weekly performance summary' },
  ];

  const priorityOptions = [
    { key: 'high', label: 'High Priority', description: 'Urgent and important notifications' },
    { key: 'medium', label: 'Medium Priority', description: 'Important but not urgent' },
    { key: 'low', label: 'Low Priority', description: 'Informational updates' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Delivery Methods */}
      <Card variant="glass" padding="lg">
        <h4 className="text-sm font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
          <FiBell className="text-terracotta-400" />
          Delivery Methods
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div 
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer
              ${preferences.push ? 'bg-terracotta-500/10 border-terracotta-500/30' : 'bg-navy-800/30 border-warmBeige-500/10'}
              border transition-all duration-300
            `}
            onClick={() => handleToggle('push')}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${preferences.push ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400'}`}>
                <FiBell />
              </div>
              <div>
                <p className="text-sm font-medium text-warmBeige-100">Push Notifications</p>
                <p className="text-xs text-warmBeige-400">Real-time alerts on your device</p>
              </div>
            </div>
            {preferences.push ? <FiCheck className="text-terracotta-400" /> : <FiX className="text-warmBeige-500" />}
          </div>

          <div 
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer
              ${preferences.email ? 'bg-terracotta-500/10 border-terracotta-500/30' : 'bg-navy-800/30 border-warmBeige-500/10'}
              border transition-all duration-300
            `}
            onClick={() => handleToggle('email')}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${preferences.email ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400'}`}>
                <FiMail />
              </div>
              <div>
                <p className="text-sm font-medium text-warmBeige-100">Email Notifications</p>
                <p className="text-xs text-warmBeige-400">Receive notifications via email</p>
              </div>
            </div>
            {preferences.email ? <FiCheck className="text-terracotta-400" /> : <FiX className="text-warmBeige-500" />}
          </div>

          <div 
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer
              ${preferences.inApp ? 'bg-terracotta-500/10 border-terracotta-500/30' : 'bg-navy-800/30 border-warmBeige-500/10'}
              border transition-all duration-300
            `}
            onClick={() => handleToggle('inApp')}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${preferences.inApp ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400'}`}>
                <FiMessageSquare />
              </div>
              <div>
                <p className="text-sm font-medium text-warmBeige-100">In-App Notifications</p>
                <p className="text-xs text-warmBeige-400">Notifications within the app</p>
              </div>
            </div>
            {preferences.inApp ? <FiCheck className="text-terracotta-400" /> : <FiX className="text-warmBeige-500" />}
          </div>

          <div 
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer
              ${preferences.sound ? 'bg-terracotta-500/10 border-terracotta-500/30' : 'bg-navy-800/30 border-warmBeige-500/10'}
              border transition-all duration-300
            `}
            onClick={() => handleToggle('sound')}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${preferences.sound ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400'}`}>
                <FiBell />
              </div>
              <div>
                <p className="text-sm font-medium text-warmBeige-100">Sound Alerts</p>
                <p className="text-xs text-warmBeige-400">Play sound for notifications</p>
              </div>
            </div>
            {preferences.sound ? <FiCheck className="text-terracotta-400" /> : <FiX className="text-warmBeige-500" />}
          </div>
        </div>
      </Card>

      {/* Frequency */}
      <Card variant="glass" padding="lg">
        <h4 className="text-sm font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
          <FiClock className="text-terracotta-400" />
          Notification Frequency
        </h4>
        <div className="flex flex-wrap gap-2">
          {['instant', 'hourly', 'daily', 'weekly'].map((freq) => (
            <button
              key={freq}
              onClick={() => handleFrequencyChange(freq)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${preferences.frequency === freq 
                  ? 'bg-terracotta-500 text-white' 
                  : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 border border-warmBeige-500/10'
                }
              `}
            >
              {freq.charAt(0).toUpperCase() + freq.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Quiet Hours */}
      <Card variant="glass" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-warmBeige-100 flex items-center gap-2">
            <FiMoon className="text-terracotta-400" />
            Quiet Hours
          </h4>
          <button
            onClick={handleQuietHoursToggle}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${preferences.quietHours.enabled 
                ? 'bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30' 
                : 'bg-navy-800/50 text-warmBeige-400 border border-warmBeige-500/10'
              }
            `}
          >
            {preferences.quietHours.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        {preferences.quietHours.enabled && (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-warmBeige-400 block mb-1">Start Time</label>
              <input
                type="time"
                value={preferences.quietHours.start}
                onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-warmBeige-400 block mb-1">End Time</label>
              <input
                type="time"
                value={preferences.quietHours.end}
                onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Categories */}
      <Card variant="glass" padding="lg">
        <h4 className="text-sm font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
          <FiSliders className="text-terracotta-400" />
          Notification Categories
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {categoryOptions.map((category) => (
            <div
              key={category.key}
              className={`
                flex items-center justify-between p-3 rounded-xl cursor-pointer
                ${preferences.categories[category.key] 
                  ? 'bg-terracotta-500/5 border-terracotta-500/20' 
                  : 'bg-navy-800/30 border-warmBeige-500/10'}
                border transition-all duration-300 hover:border-terracotta-500/30
              `}
              onClick={() => handleCategoryToggle(category.key)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${preferences.categories[category.key] ? 'text-terracotta-400' : 'text-warmBeige-500'}`}>
                  {category.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-warmBeige-100">{category.label}</p>
                  <p className="text-xs text-warmBeige-400">{category.description}</p>
                </div>
              </div>
              {preferences.categories[category.key] ? 
                <FiCheck className="text-terracotta-400" size={18} /> : 
                <div className="w-5 h-5 rounded border-2 border-warmBeige-500/30" />
              }
            </div>
          ))}
        </div>
      </Card>

      {/* Priority Levels */}
      <Card variant="glass" padding="lg">
        <h4 className="text-sm font-semibold text-warmBeige-100 mb-4 flex items-center gap-2">
          <FiZap className="text-terracotta-400" />
          Priority Levels
        </h4>
        <div className="space-y-2">
          {priorityOptions.map((priority) => (
            <div
              key={priority.key}
              className={`
                flex items-center justify-between p-3 rounded-xl cursor-pointer
                ${preferences.priority[priority.key] 
                  ? 'bg-terracotta-500/5 border-terracotta-500/20' 
                  : 'bg-navy-800/30 border-warmBeige-500/10'}
                border transition-all duration-300
              `}
              onClick={() => handlePriorityToggle(priority.key)}
            >
              <div>
                <p className="text-sm font-medium text-warmBeige-100">{priority.label}</p>
                <p className="text-xs text-warmBeige-400">{priority.description}</p>
              </div>
              {preferences.priority[priority.key] ? 
                <FiCheck className="text-terracotta-400" size={18} /> : 
                <div className="w-5 h-5 rounded border-2 border-warmBeige-500/30" />
              }
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={onClose}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          loading={isSaving}
          disabled={isSaving}
          icon={<FiSave />}
          fullWidth
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;