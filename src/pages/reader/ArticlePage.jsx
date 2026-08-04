import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleDetail from '../../components/reader/articles/ArticleDetail';
import { useArticles } from '../../hooks/useArticles';
import { useAuth } from '../../hooks/useAuth';
import Skeleton from '../../components/common/Skeleton';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { FiArrowLeft, FiBookmark, FiHeart, FiShare2 } from 'react-icons/fi';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getArticle, loading, error } = useArticles();

  const [article, setArticle] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await getArticle(id);
      setArticle(data);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to load article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton variant="card" height="60px" />
        <Skeleton variant="title" height="48px" width="80%" />
        <div className="flex items-center gap-4">
          <Skeleton variant="avatar" height="50px" width="50px" />
          <div className="flex-1">
            <Skeleton variant="text" width="150px" height="20px" />
            <Skeleton variant="text" width="200px" height="16px" />
          </div>
        </div>
        <Skeleton variant="card" height="400px" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="text" height="20px" width={`${Math.random() * 40 + 60}%`} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Article Not Found</h2>
        <p className="text-warmBeige-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}
      <ArticleDetail article={article} />
    </div>
  );
};

export default ArticlePage;