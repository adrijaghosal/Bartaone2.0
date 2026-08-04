import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiDownload,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiStar,
  FiAward,
  FiBarChart2,
  FiSend
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useSubscribers } from '../../hooks/useSubscribers';
import SubscriberList from '../../components/publisher/subscribers/SubscriberList';
import SubscriberAnalytics from '../../components/publisher/subscribers/SubscriberAnalytics';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';

const PublisherSubscribers = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getSubscribers, loading, error } = useSubscribers();

  const [activeTab, setActiveTab] = useState('list');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'publisher') {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      setToastData({
        message: error,
        type: 'error'
      });
      setShowToast(true);
    }
  }, [error]);

  const tabs = [
    { id: 'list', label: 'Subscribers', icon: <FiUsers /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 /> },
  ];

  return (
    <div className="space-y-6">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiUsers className="text-terracotta-400" />
            Subscribers
            <Badge variant="glass" size="sm">
              Manage your audience
            </Badge>
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Grow and manage your subscriber base
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => window.location.href = '/publisher/subscribers?action=send' }
            icon={<FiSend />}
          >
            Send Newsletter
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
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
      {activeTab === 'list' && <SubscriberList />}
      {activeTab === 'analytics' && <SubscriberAnalytics />}
    </div>
  );
};

export default PublisherSubscribers;