import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiMoreVertical,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useArticles } from '../../hooks/useArticles';
import ArticleManager from '../../components/publisher/articles/ArticleManager';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';

const PublisherArticles = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getArticles, deleteArticle, duplicateArticle, loading, error } = useArticles();

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

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiFileText className="text-terracotta-400" />
            My Articles
            <Badge variant="glass" size="sm">
              Manage your content
            </Badge>
          </h1>
          <p className="text-warmBeige-400 mt-1">
            Create, edit, and manage all your articles
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/publisher/create-article')}
          icon={<FiPlus />}
        >
          Write Article
        </Button>
      </div>

      {/* Article Manager */}
      <ArticleManager />
    </div>
  );
};

export default PublisherArticles;