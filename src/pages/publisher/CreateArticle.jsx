import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useArticles } from '../../hooks/useArticles';
import ArticleEditor from '../../components/publisher/articles/ArticleEditor';
import Toast from '../../components/common/Toast';

const CreateArticle = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createArticle, loading, error } = useArticles();

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

  const handleSave = async (articleData) => {
    try {
      await createArticle(articleData);
      setToastData({
        message: 'Article created successfully! 🎉',
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => {
        navigate('/publisher/articles');
      }, 1500);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to create article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

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
        mode="create" 
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
};

export default CreateArticle;