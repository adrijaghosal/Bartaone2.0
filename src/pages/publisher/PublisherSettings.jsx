import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSettings,
  FiUser,
  FiBriefcase,
  FiGlobe,
  FiMail,
  FiLock,
  FiShield,
  FiSave,
  FiX,
  FiCamera,
  FiLink,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiGithub,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { usePublishers } from '../../hooks/usePublishers';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Toast from '../../components/common/Toast';
import Skeleton from '../../components/common/Skeleton';
import Avatar from '../../components/common/Avatar';

const PublisherSettings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, loading } = useAuth();
  const { updatePublisherProfile, getPublisher, loading: publisherLoading } = usePublishers();

  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [publisherData, setPublisherData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    tagline: '',
    location: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    github: '',
    categories: [],
    paymentEmail: '',
    payoutSettings: {
      method: 'bank',
      accountNumber: '',
      routingNumber: '',
    }
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'publisher') {
      navigate('/login');
      return;
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        twitter: user.twitter || '',
        github: user.github || '',
      }));
    }
    fetchPublisherData();
  }, [user, isAuthenticated]);

  const fetchPublisherData = async () => {
    try {
      const data = await getPublisher(user?.id);
      setPublisherData(data);
      if (data) {
        setFormData(prev => ({
          ...prev,
          tagline: data.tagline || '',
          categories: data.categories || [],
          paymentEmail: data.paymentEmail || '',
          payoutSettings: data.payoutSettings || { method: 'bank', accountNumber: '', routingNumber: '' },
          facebook: data.socialLinks?.facebook || '',
          instagram: data.socialLinks?.instagram || '',
          youtube: data.socialLinks?.youtube || '',
        }));
      }
    } catch (error) {
      console.error('Failed to fetch publisher data:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'branding', label: 'Branding', icon: <FiBriefcase /> },
    { id: 'social', label: 'Social Links', icon: <FiGlobe /> },
    { id: 'payout', label: 'Payout Settings', icon: <FiLock /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Update user profile
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        twitter: formData.twitter,
        github: formData.github,
      });

      // Update publisher profile
      await updatePublisherProfile({
        tagline: formData.tagline,
        categories: formData.categories,
        paymentEmail: formData.paymentEmail,
        payoutSettings: formData.payoutSettings,
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube,
        }
      });

      setToastData({
        message: 'Settings updated successfully! ✅',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to update settings',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    'Technology', 'Business', 'Science', 'Health', 'Politics',
    'Entertainment', 'Sports', 'World News', 'Education', 'Environment',
    'Design', 'Travel', 'Food', 'Lifestyle', 'Fashion'
  ];

  const categoryColors = {
    Technology: 'blue',
    Business: 'green',
    Science: 'purple',
    Health: 'pink',
    Politics: 'red',
    Entertainment: 'yellow',
    Sports: 'orange',
    'World News': 'indigo',
    Education: 'teal',
    Environment: 'emerald',
    Design: 'violet',
    Travel: 'cyan',
    Food: 'rose',
    Lifestyle: 'amber',
    Fashion: 'fuchsia',
  };

  if (loading || publisherLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton variant="title" width="200px" height="32px" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
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
          Publisher Settings
        </h1>
        <p className="text-warmBeige-400 mt-1">Manage your publisher profile and preferences</p>
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
      <form onSubmit={handleSubmit}>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card variant="glass" padding="lg" className="space-y-4">
            <div className="flex items-center gap-6">
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
              <div>
                <h3 className="text-xl font-bold text-warmBeige-100">{user?.name}</h3>
                <p className="text-warmBeige-400">{user?.email}</p>
                <Badge variant="glass" size="sm" className="mt-1">Publisher</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Display Name"
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
              placeholder="Tell readers about yourself"
              multiline
              rows={3}
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </Card>
        )}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <Card variant="glass" padding="lg" className="space-y-4">
            <Input
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Your publisher tagline (e.g., 'Tech news for the modern world')"
            />

            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://your-website.com"
              icon={<FiLink />}
            />

            <div>
              <label className="text-sm font-medium text-warmBeige-200 block mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        categories: prev.categories.includes(category)
                          ? prev.categories.filter(c => c !== category)
                          : [...prev.categories, category]
                      }));
                    }}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium transition-all
                      ${formData.categories.includes(category) 
                        ? `bg-${categoryColors[category]}-500/20 text-${categoryColors[category]}-400 border border-${categoryColors[category]}-500/30`
                        : 'bg-navy-800/50 text-warmBeige-400 border border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="text-xs text-warmBeige-400 mt-2">
                Select up to 5 categories that best describe your content
              </p>
            </div>
          </Card>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <Card variant="glass" padding="lg" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="@username"
                icon={<FiTwitter />}
              />
              <Input
                label="Facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="facebook.com/username"
                icon={<FiFacebook />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@username"
                icon={<FiInstagram />}
              />
              <Input
                label="YouTube"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="youtube.com/c/username"
                icon={<FiYoutube />}
              />
            </div>

            <Input
              label="GitHub"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="username"
              icon={<FiGithub />}
            />

            <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <div className="flex items-start gap-2">
                <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-warmBeige-400">
                  Social links will appear on your publisher profile page
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Payout Tab */}
        {activeTab === 'payout' && (
          <Card variant="glass" padding="lg" className="space-y-4">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-2">
                <FiInfo className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-warmBeige-400">
                  Payout settings are encrypted and secure. Your payment information is never shared.
                </p>
              </div>
            </div>

            <Input
              label="Payment Email"
              name="paymentEmail"
              type="email"
              value={formData.paymentEmail}
              onChange={handleChange}
              placeholder="payouts@example.com"
              icon={<FiMail />}
            />

            <div>
              <label className="text-sm font-medium text-warmBeige-200 block mb-2">
                Payout Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['bank', 'paypal', 'stripe'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        payoutSettings: {
                          ...prev.payoutSettings,
                          method
                        }
                      }));
                    }}
                    className={`
                      p-3 rounded-xl text-center transition-all
                      ${formData.payoutSettings.method === method 
                        ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                        : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    <p className={`text-sm font-medium ${formData.payoutSettings.method === method ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Account Number"
                name="payoutSettings.accountNumber"
                value={formData.payoutSettings.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                type="password"
                icon={<FiLock />}
              />
              <Input
                label="Routing Number"
                name="payoutSettings.routingNumber"
                value={formData.payoutSettings.routingNumber}
                onChange={handleChange}
                placeholder="Enter routing number"
                type="password"
                icon={<FiLock />}
              />
            </div>
          </Card>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            icon={<FiSave />}
            loading={isSaving}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/publisher/dashboard')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PublisherSettings;