import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkList from '../../components/reader/bookmarks/BookmarkList';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import Toast from '../../components/common/Toast';
import { FiBookmark, FiFolderPlus } from 'react-icons/fi';

const BookmarksPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { getBookmarks, loading, error, bookmarks } = useBookmarks();

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookmarks();
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      await getBookmarks();
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to load bookmarks',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  if (loading && !bookmarks.length) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton variant="title" width="200px" height="32px" />
        <Skeleton variant="card" height="60px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" />
          ))}
        </div>
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
      <BookmarkList />
    </div>
  );
};

export default BookmarksPage;