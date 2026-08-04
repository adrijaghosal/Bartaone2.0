import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSettings,
  FiUser,
  FiBell,
  FiGlobe,
  FiMoon,
  FiSun,
  FiMonitor,
  FiLock,
  FiShield,
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
  FiSave,
  FiX,
  FiChevronRight,
  FiRefreshCw,
  FiInfo,
  FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNotifications } from '../../hooks/useNotifications';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Toast from '../../components/common/Toast';
import Skeleton from '../../components/common/Skeleton';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, loading } = useAuth();
  const { theme, toggleTheme, setTheme, primaryColor, setPrimaryColor, fontSize, setFontSize } = useTheme();
  const { language, changeLanguage, availableLanguages, currentLanguage } = useLanguage();
  const { preferences, updatePreferences, toggleSound } = useNotifications();

  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    github: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        twitter: user.twitter || '',
        github: user.github || '',
      });
    }
  }, [user, isAuthenticated]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'appearance', label: 'Appearance', icon: <FiMonitor /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'language', label: 'Language', icon: <FiGlobe /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <FiShield /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setToastData({
        message: 'Profile updated successfully!',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to update profile',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setToastData({
      message: `Theme changed to ${newTheme}`,
      type: 'success'
    });
    setShowToast(true);
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    setToastData({
      message: `Primary color changed to ${color}`,
      type: 'success'
    });
    setShowToast(true);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    setToastData({
      message: `Font size changed to ${size}`,
      type: 'success'
    });
    setShowToast(true);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setToastData({
      message: `Language changed to ${availableLanguages.find(l => l.code === langCode)?.name}`,
      type: 'success'
    });
    setShowToast(true);
  };

  const handleNotificationToggle = async (key) => {
    try {
      await updatePreferences({
        ...preferences,
        [key]: !preferences?.[key]
      });
      setToastData({
        message: `Notification ${preferences?.[key] ? 'disabled' : 'enabled'}`,
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: 'Failed to update preferences',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const colorOptions = [
    { value: 'terracotta', label: 'Terracotta' },
    { value: 'navy', label: 'Navy' },
    { value: 'beige', label: 'Beige' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
    { value: 'pink', label: 'Pink' },
    { value: 'orange', label: 'Orange' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'X-Large' },
  ];

  const notificationCategories = [
    { key: 'likes', label: 'Likes', icon: <FiHeart />, description: 'When someone likes your content' },
    { key: 'comments', label: 'Comments', icon: <FiMessageSquare />, description: 'When someone comments on your content' },
    { key: 'follows', label: 'Follows', icon: <FiUserPlus />, description: 'When someone follows you' },
    { key: 'bookmarks', label: 'Bookmarks', icon: <FiBookmark />, description: 'When someone bookmarks your content' },
    { key: 'shares', label: 'Shares', icon: <FiShare2 />, description: 'When someone shares your content' },
    { key: 'awards', label: 'Achievements', icon: <FiAward />, description: 'When you earn achievements' },
    { key: 'trending', label: 'Trending', icon: <FiTrendingUp />, description: 'Trending content updates' },
    { key: 'system', label: 'System', icon: <FiZap />, description: 'System notifications' },
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton variant="title" width="200px" height="32px" />
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="button" width="100px" height="40px" />
          ))}
        </div>
        <Skeleton variant="card" height="400px" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
          <FiSettings className="text-terracotta-400" />
          Settings
        </h1>
        <p className="text-warmBeige-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? 'bg-terracotta-500 text-white' 
                : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Profile Settings</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled
                />
              </div>

              <Input
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                multiline
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
                <Input
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@username"
                />
                <Input
                  label="GitHub"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="username"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  icon={<FiSave />}
                  loading={isSaving}
                  disabled={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Theme</h2>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`
                    p-4 rounded-xl text-center transition-all
                    ${theme === 'dark' 
                      ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                      : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                    }
                  `}
                >
                  <FiMoon className={`mx-auto mb-2 ${theme === 'dark' ? 'text-terracotta-400' : 'text-warmBeige-400'}`} size={24} />
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>Dark</p>
                </button>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`
                    p-4 rounded-xl text-center transition-all
                    ${theme === 'light' 
                      ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                      : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                    }
                  `}
                >
                  <FiSun className={`mx-auto mb-2 ${theme === 'light' ? 'text-terracotta-400' : 'text-warmBeige-400'}`} size={24} />
                  <p className={`text-sm font-medium ${theme === 'light' ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>Light</p>
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`
                    p-4 rounded-xl text-center transition-all
                    ${theme === 'system' 
                      ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                      : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                    }
                  `}
                >
                  <FiMonitor className={`mx-auto mb-2 ${theme === 'system' ? 'text-terracotta-400' : 'text-warmBeige-400'}`} size={24} />
                  <p className={`text-sm font-medium ${theme === 'system' ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>System</p>
                </button>
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Primary Color</h2>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange(color.value)}
                    className={`
                      p-3 rounded-xl text-center transition-all
                      ${primaryColor === color.value 
                        ? 'ring-2 ring-terracotta-500 ring-offset-2 ring-offset-navy-900' 
                        : 'hover:scale-105'
                      }
                    `}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full mx-auto mb-1 border-2 ${primaryColor === color.value ? 'border-terracotta-500' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value === 'terracotta' ? '#E8835F' : 
                               color.value === 'navy' ? '#2A5B8F' : 
                               color.value === 'beige' ? '#E6B473' : 
                               color.value === 'blue' ? '#4A90D9' : 
                               color.value === 'green' ? '#4CAF50' : 
                               color.value === 'purple' ? '#7B61FF' : 
                               color.value === 'pink' ? '#E67E9A' : 
                               color.value === 'orange' ? '#F5A623' : '#E8835F' }}
                    />
                    <p className="text-xs text-warmBeige-400">{color.label}</p>
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Font Size</h2>
              <div className="grid grid-cols-4 gap-3">
                {fontSizeOptions.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleFontSizeChange(size.value)}
                    className={`
                      p-4 rounded-xl text-center transition-all
                      ${fontSize === size.value 
                        ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                        : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    <p className={`font-medium ${size.value === 'small' ? 'text-sm' : size.value === 'medium' ? 'text-base' : size.value === 'large' ? 'text-lg' : 'text-xl'}`}>
                      Aa
                    </p>
                    <p className={`text-sm mt-1 ${fontSize === size.value ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>
                      {size.label}
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notificationCategories.map((category) => (
                  <div
                    key={category.key}
                    className={`
                      flex items-center justify-between p-3 rounded-xl cursor-pointer
                      ${preferences?.[category.key] 
                        ? 'bg-terracotta-500/5 border-terracotta-500/20' 
                        : 'bg-navy-800/30 border-warmBeige-500/10'}
                      border transition-all duration-300 hover:border-terracotta-500/30
                    `}
                    onClick={() => handleNotificationToggle(category.key)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${preferences?.[category.key] ? 'text-terracotta-400' : 'text-warmBeige-500'}`}>
                        {category.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warmBeige-100">{category.label}</p>
                        <p className="text-xs text-warmBeige-400">{category.description}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-all ${preferences?.[category.key] ? 'bg-terracotta-500' : 'bg-navy-700'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${preferences?.[category.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-warmBeige-500/10">
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                  <div>
                    <p className="text-sm font-medium text-warmBeige-100">Sound Alerts</p>
                    <p className="text-xs text-warmBeige-400">Play sound for notifications</p>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`w-10 h-6 rounded-full transition-all ${preferences?.sound ? 'bg-terracotta-500' : 'bg-navy-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${preferences?.sound ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Language Tab */}
        {activeTab === 'language' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Language Preferences</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl transition-all
                      ${language === lang.code 
                        ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                        : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium ${language === lang.code ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>
                        {lang.name}
                      </p>
                      <p className="text-xs text-warmBeige-500">{lang.nativeName}</p>
                    </div>
                    {language === lang.code && (
                      <Badge variant="primary" size="sm">Active</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Privacy Settings</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                  <div>
                    <p className="text-sm font-medium text-warmBeige-100">Profile Visibility</p>
                    <p className="text-xs text-warmBeige-400">Make your profile visible to everyone</p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-terracotta-500 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                  <div>
                    <p className="text-sm font-medium text-warmBeige-100">Show Reading Activity</p>
                    <p className="text-xs text-warmBeige-400">Show what you're reading to others</p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-navy-700 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                  <div>
                    <p className="text-sm font-medium text-warmBeige-100">Email Preferences</p>
                    <p className="text-xs text-warmBeige-400">Receive email updates and newsletters</p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-terracotta-500 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-4" />
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Security</h2>
              <div className="space-y-3">
                <Button variant="outline" fullWidth icon={<FiLock />}>
                  Change Password
                </Button>
                <Button variant="outline" fullWidth icon={<FiShield />}>
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" fullWidth icon={<FiRefreshCw />}>
                  Active Sessions
                </Button>
              </div>
            </Card>

            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-bold text-warmBeige-100 mb-4">Danger Zone</h2>
              <div className="space-y-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-400">Delete Account</p>
                    <p className="text-xs text-warmBeige-400">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="danger" size="sm">Delete Account</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;