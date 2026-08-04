import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useArticles } from '../../hooks/useArticles';
import ArticleEditor from '../../components/publisher/articles/ArticleEditor';
import Toast from '../../components/common/Toast';
import Skeleton from '../../components/common/Skeleton';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getArticle, updateArticle, loading, error } = useArticles();

  const [article, setArticle] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'publisher') {
      navigate('/login');
      return;
    }
    fetchArticle();
  }, [isAuthenticated, user, id, navigate]);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setToastData({
        message: error,
        type: 'error'
      });
      setShowToast(true);
    }
  }, [error]);

  const handleSave = async (articleData) => {
    try {
      await updateArticle(id, articleData);
      setToastData({
        message: 'Article updated successfully! ✅',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to update article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton variant="card" height="60px" />
        <Skeleton variant="title" height="48px" />
        <Skeleton variant="card" height="400px" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Article Not Found</h2>
        <p className="text-warmBeige-400 mb-6">The article you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/publisher/articles')}
          className="text-terracotta-400 hover:text-terracotta-300 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}

      <ArticleEditor 
        mode="edit" 
        initialData={article}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
};

export default EditArticle;