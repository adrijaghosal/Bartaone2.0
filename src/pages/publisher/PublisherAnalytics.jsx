import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiUsers,
  FiDollarSign,
  FiFileText,
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiPieChart,
  FiActivity,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useAnalytics } from '../../hooks/useAnalytics';
import AnalyticsDashboard from '../../components/publisher/analytics/AnalyticsDashboard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';

const PublisherAnalytics = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { loading, error } = useAnalytics();

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

      <AnalyticsDashboard />
    </div>
  );
};

export default PublisherAnalytics;