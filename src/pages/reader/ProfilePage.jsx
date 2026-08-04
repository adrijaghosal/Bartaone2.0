import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiUserCheck,
  FiBookmark,
  FiHeart,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiStar
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useArticles } from '../../hooks/useArticles';
import { useStreak } from '../../hooks/useStreak';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Toast from '../../components/common/Toast';
import Skeleton from '../../components/common/Skeleton';

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile, logout, loading } = useAuth();
  const { getArticles } = useArticles();
  const { streak } = useStreak();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    github: '',
  });
  const [stats, setStats] = useState({
    articlesRead: 0,
    bookmarksCount: 0,
    likesGiven: 0,
    following: 0,
    followers: 0,
    readingTime: 0,
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
    fetchStats();
  }, [user, isAuthenticated]);

  const fetchStats = async () => {
    try {
      // Fetch user stats
      const articles = await getArticles({ authorId: user?.id, limit: 100 });
      setStats({
        articlesRead: articles?.total || 0,
        bookmarksCount: 0, // Would come from bookmarks service
        likesGiven: 0, // Would come from likes service
        following: 0, // Would come from following service
        followers: 0, // Would come from followers service
        readingTime: streak?.totalReads || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
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
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setToastData({
        message: 'Failed to logout',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton variant="card" height="200px" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" />
          ))}
        </div>
        <Skeleton variant="card" height="300px" />
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

      {/* Profile Header */}
      <Card variant="gradient" padding="lg" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar 
              src={user?.avatar} 
              alt={user?.name} 
              size="xl"
              className="border-4 border-navy-900 shadow-2xl"
            />
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-terracotta-500 text-white hover:bg-terracotta-600 transition-all">
              <FiCamera size={14} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100">
                {user?.name}
              </h1>
              {user?.verified && (
                <Badge variant="success" size="sm">✓ Verified</Badge>
              )}
              <Badge variant="glass" size="sm">
                {user?.role === 'publisher' ? '📰 Publisher' : '📚 Reader'}
              </Badge>
            </div>
            <p className="text-warmBeige-400">{user?.email}</p>
            {user?.bio && (
              <p className="text-warmBeige-300 mt-2 max-w-lg">{user.bio}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-warmBeige-400">
              <span className="flex items-center gap-1">
                <FiCalendar size={14} />
                Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
              {user?.location && (
                <span className="flex items-center gap-1">
                  📍 {user.location}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                icon={<FiEdit2 />}
              >
                Edit Profile
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => navigate('/settings')}
              icon={<FiSettings />}
            />
            <Button
              variant="danger"
              onClick={handleLogout}
              icon={<FiLogOut />}
            >
              Logout
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-2xl font-bold text-terracotta-400">
            {stats.articlesRead}
          </div>
          <p className="text-sm text-warmBeige-400">Articles Read</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {streak?.currentStreak || 0}🔥
          </div>
          <p className="text-sm text-warmBeige-400">Day Streak</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {stats.bookmarksCount}
          </div>
          <p className="text-sm text-warmBeige-400">Bookmarks</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {stats.readingTime}h
          </div>
          <p className="text-sm text-warmBeige-400">Reading Time</p>
        </Card>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <Card variant="glass" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-warmBeige-100">Edit Profile</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={<FiSave />}
                loading={loading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Recent Activity */}
      <Card variant="glass" padding="lg">
        <h2 className="text-lg font-bold text-warmBeige-100 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-terracotta-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 flex items-center justify-center text-terracotta-400">
              <FiBookmark size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-warmBeige-100">Bookmarked "The Future of AI"</p>
              <p className="text-xs text-warmBeige-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
              <FiHeart size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-warmBeige-100">Liked "10 Tips for Better Writing"</p>
              <p className="text-xs text-warmBeige-400">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
              <FiStar size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-warmBeige-100">Earned "7-Day Streak" achievement</p>
              <p className="text-xs text-warmBeige-400">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;